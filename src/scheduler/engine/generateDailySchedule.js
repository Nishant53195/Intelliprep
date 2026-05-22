import { db } from "../../database/dexie";

/**
 * Advanced V1.2 Single-Day Multi-Task Allocation Engine
 * Manages priority backlogs, strict midnight lockouts, and conditional runtime session extensions.
 */
export async function generateDailySchedule(userId, extensionBudget = 0, extensionTargetSlot = null) {
  const config = await db.onboarding_config.where("userId").equals(userId).first();
  if (!config) throw new Error("User onboarding configuration metadata map not found.");

  const studyHours = parseInt(config.dailyStudyTarget) || 6;
  const todayDate = new Date().toISOString().split("T")[0];

  // --- 1. RUNTIME EXTRA SESSION EXTENSION PASS ---
  if (extensionBudget > 0 && extensionTargetSlot) {
    return await appendExtensionTasks(userId, todayDate, extensionBudget, extensionTargetSlot, config);
  }

  // --- 2. AUTOMATED HISTORICAL RECOVERY PASS ---
  const historicalStaleTasks = await db.schedule_tasks
    .where("userId")
    .equals(userId)
    .filter(task => task.scheduledDate !== todayDate && task.status?.toUpperCase() === "PENDING")
    .toArray();

  if (historicalStaleTasks.length > 0) {
    for (const staleTask of historicalStaleTasks) {
      await db.schedule_tasks.update(staleTask.id, { status: "MISSED", closedAt: Date.now() });
      if (staleTask.subtasks) {
        for (const sub of staleTask.subtasks) {
          const prog = await db.subtopic_progress.where("subtopicId").equals(sub.subtopicId).first();
          if (!prog || prog.status?.toUpperCase() !== "COMPLETED") {
            await db.subtopic_progress.put({
              id: prog ? prog.id : `prog_node_${Date.now()}_${sub.subtopicId}`,
              subtopicId: sub.subtopicId, status: "missed", remainingMinutes: sub.duration, updatedAt: Date.now()
            });
          }
        }
      }
    }
  }

  // --- 3. STRICT MIDNIGHT LOCK GATE ---
  const concludedTodayLogs = await db.schedule_tasks
    .where("[userId+scheduledDate]")
    .equals([userId, todayDate])
    .filter(task => task.status?.toUpperCase() === "CLOSED" || task.status?.toUpperCase() === "MISSED")
    .toArray();

  if (concludedTodayLogs.length > 0) return [];

  // --- 4. RETRIEVAL PASS ---
  const existingActiveTasks = await db.schedule_tasks
    .where("[userId+scheduledDate]")
    .equals([userId, todayDate])
    .filter(task => task.status?.toUpperCase() === "PENDING" || task.status?.toUpperCase() === "COMPLETED")
    .toArray();

  if (existingActiveTasks.length > 0) return existingActiveTasks;

  // --- 5. INITIAL BUDGET ALLOCATIONS ---
  let revisionMinutes = studyHours >= 8 ? 75 : (studyHours === 7 ? 60 : 45);
  const practiceMinutes = 60;
  let maxOptionalMinutes = studyHours === 8 ? 120 : 90;

  let allocateOptionalToday = true;
  const historicOptionalLogs = await db.schedule_tasks
    .where("userId").equals(userId)
    .filter(task => task.type === "optional" && task.status?.toUpperCase() === "COMPLETED")
    .reverse().sortBy("completedAt");

  const distinctPastOptionalDates = [...new Set(historicOptionalLogs.map(t => t.scheduledDate))];
  if (distinctPastOptionalDates.length >= 2) {
    const diffDays = Math.ceil(Math.abs(new Date(distinctPastOptionalDates[0]) - new Date(distinctPastOptionalDates[1])) / (1000 * 60 * 60 * 24));
    if (diffDays === 1) allocateOptionalToday = false;
  }

  const optionalMinutesBudget = allocateOptionalToday ? maxOptionalMinutes : 0;
  const gsMinutesBudget = (studyHours * 60) - (revisionMinutes + practiceMinutes + optionalMinutesBudget);

  const finalDayTasks = [];

  // --- GS SLOT INITIALIZER ---
  if (gsMinutesBudget > 0) {
    const allocatedGs = await harvestSubtopics(userId, "gs", config.gsSequence, gsMinutesBudget);
    if (allocatedGs.length > 0) {
      finalDayTasks.push({
        id: `task_gs_${Date.now()}`, userId, type: "gs", scheduledDate: todayDate, status: "PENDING",
        estimatedMinutes: gsMinutesBudget, subtasks: allocatedGs, subjectName: allocatedGs[0].subjectName,
        topicName: allocatedGs[0].topicName, subtopicName: allocatedGs[0].subtopicName, subtopicId: allocatedGs[0].subtopicId, topicId: allocatedGs[0].topicId
      });
    }
  }

  // --- OPTIONAL SLOT INITIALIZER ---
  if (optionalMinutesBudget > 0) {
    const allocatedOpt = await harvestSubtopics(userId, "optional", config.optionalSequence, optionalMinutesBudget);
    if (allocatedOpt.length > 0) {
      finalDayTasks.push({
        id: `task_opt_${Date.now()}`, userId, type: "optional", scheduledDate: todayDate, status: "PENDING",
        estimatedMinutes: optionalMinutesBudget, subtasks: allocatedOpt, subjectName: allocatedOpt[0].subjectName,
        topicName: allocatedOpt[0].topicName, subtopicName: allocatedOpt[0].subtopicName, subtopicId: allocatedOpt[0].subtopicId, topicId: allocatedOpt[0].topicId
      });
    }
  }

  // --- FIXED CORE BLOCKS ---
  finalDayTasks.push({ id: `task_rev_${Date.now()}`, userId, type: "revision", scheduledDate: todayDate, status: "PENDING", estimatedMinutes: revisionMinutes, subjectName: "Revision Block", topicName: "Spaced Repetition Review", subtopicName: "Reviewing active retention items", subtasks: [] });
  finalDayTasks.push({ id: `task_prac_${Date.now()}`, userId, type: "practice", scheduledDate: todayDate, status: "PENDING", estimatedMinutes: practiceMinutes, subjectName: "Practice Suite", topicName: "MCQ / PYQ / Mains Logs", subtopicName: "Splitting evenly across compilation targets", subtasks: [] });

  await db.schedule_tasks.bulkPut(finalDayTasks);
  return finalDayTasks;
}

/**
 * Core Subtopic Harvester with Priority Backlog Matching
 */
async function harvestSubtopics(userId, slotType, sequences, timeBudget, excludedIds = []) {
  if (!sequences || sequences.length === 0) return [];
  let remainingMinutes = timeBudget;
  const output = [];

  for (const seq of sequences) {
    let sub = null;
    let topics = [];

    if (slotType === "gs") {
      sub = await db.subjects.where("name").equals(seq.name).first();
      if (!sub) continue;
      topics = await db.topics.where("subjectId").equals(sub.id).toArray();
    } else {
      const topRow = await db.topics.where("name").equals(seq.name).first();
      if (!topRow) continue;
      topics = [topRow];
      sub = await db.subjects.get(topRow.subjectId);
    }
    topics.sort((a, b) => (a.order || 0) - (b.order || 0));

    for (const topic of topics) {
      if (topic.status?.toUpperCase() === "COMPLETED") continue;
      const subtopics = await db.subtopics.where("topicId").equals(topic.id).toArray();
      subtopics.sort((a, b) => (a.order || 0) - (b.order || 0));

      for (const st of subtopics) {
        const progress = await db.subtopic_progress.where("subtopicId").equals(st.id).first();
        if (st.status?.toUpperCase() === "COMPLETED" || progress?.status?.toUpperCase() === "COMPLETED") continue;
        if (excludedIds.includes(st.id)) continue;

        let needed = parseInt(st.estimatedMinutes) || 45;
        let currentPart = 1;
        let isRecovery = false;

        if (progress) {
          if (progress.status === "chunked" && progress.remainingMinutes) {
            needed = progress.remainingMinutes;
            currentPart = (progress.completedChunksCount || 1) + 1;
          } else if (progress.status === "missed") {
            isRecovery = true;
          }
        }

        const formattedName = isRecovery ? `[Recovery] ${st.name}` : (currentPart > 1 ? `${st.name} - Part ${currentPart}` : st.name);

        if (needed <= remainingMinutes) {
          output.push({ subtopicId: st.id, topicId: topic.id, subjectId: sub?.id || "", subjectName: sub?.name || "Target Hub", topicName: topic.name, subtopicName: formattedName, duration: needed, isFinalChunk: true });
          remainingMinutes -= needed;
          if (remainingMinutes <= 0) return output;
        } else if (remainingMinutes >= 1) {
          output.push({ subtopicId: st.id, topicId: topic.id, subjectId: sub?.id || "", subjectName: sub?.name || "Target Hub", topicName: topic.name, subtopicName: formattedName, duration: remainingMinutes, isFinalChunk: false, nextRemainingMinutes: needed - remainingMinutes, completedChunksCount: currentPart });
          remainingMinutes = 0;
          return output;
        } else {
          return output;
        }
      }
    }
  }
  return output;
}

/**
 * Runtime Session Appender Engine
 */
async function appendExtensionTasks(userId, todayDate, extraMinutes, slotType, config) {
  const activeTasks = await db.schedule_tasks.where("[userId+scheduledDate]").equals([userId, todayDate]).toArray();

  if (slotType === "GS" || slotType === "BOTH") {
    let minutesBudget = slotType === "BOTH" ? Math.round(extraMinutes / 2) : extraMinutes;
    let taskRow = activeTasks.find(t => t.type === "gs");
    if (taskRow) {
      const activeIds = (taskRow.subtasks || []).map(s => s.subtopicId);
      const appends = await harvestSubtopics(userId, "gs", config.gsSequence, minutesBudget, activeIds);
      if (appends.length > 0) {
        await db.schedule_tasks.update(taskRow.id, { subtasks: [...taskRow.subtasks, ...appends], status: "PENDING" });
      }
    }
  }

  if (slotType === "OPTIONAL" || slotType === "BOTH") {
    let minutesBudget = slotType === "BOTH" ? Math.round(extraMinutes / 2) : extraMinutes;
    let taskRow = activeTasks.find(t => t.type === "optional");
    if (taskRow) {
      const activeIds = (taskRow.subtasks || []).map(s => s.subtopicId);
      const appends = await harvestSubtopics(userId, "optional", config.optionalSequence, minutesBudget, activeIds);
      if (appends.length > 0) {
        await db.schedule_tasks.update(taskRow.id, { subtasks: [...taskRow.subtasks, ...appends], status: "PENDING" });
      }
    }
  }

  window.dispatchEvent(new Event("syllabus-update"));
  return await db.schedule_tasks.where("[userId+scheduledDate]").equals([userId, todayDate]).toArray();
}