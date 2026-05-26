import { db } from "../../database/dexie";
import dayjs from "dayjs";

/**
 * Utility helper to extract the active operational date string
 * Enforces the 5:00 AM day boundary rule layout adjustment.
 */
export function getActiveShiftDateString() {
  const currentHour = new Date().getHours();
  // If clock is between Midnight and 4:59 AM, roll back the processing anchor by 1 full day
  if (currentHour < 5) {
    return dayjs().subtract(1, "day").format("YYYY-MM-DD");
  }
  return dayjs().format("YYYY-MM-DD");
}

/**
 * Advanced Core Single-Day Multi-Task Allocation Engine
 * Bound strictly to a 5:00 AM Day-Roll Window for late-night safety.
 * Missed revisions automatically roll into historical backlogs parsed by the UI hub.
 */
export async function generateDailySchedule(userId, extensionBudget = 0, extensionTargetSlot = null) {
  return await db.transaction("rw", [db.onboarding_config, db.schedule_tasks, db.subjects, db.topics, db.subtopics, db.subtopic_progress, db.revisions], async () => {
    const config = await db.onboarding_config.where("userId").equals(userId).first();
    if (!config) throw new Error("User onboarding configuration metadata map not found.");

    const activeTargetHours = parseInt(config.dailyStudyTarget) || parseInt(config.studyHoursPerDay) || 6;
    const todayDate = getActiveShiftDateString();

    // --- 1. RUNTIME EXTRA SESSION EXTENSION PASS ---
    if (extensionBudget > 0 && extensionTargetSlot) {
      return await appendExtensionTasks(userId, todayDate, extensionBudget, extensionTargetSlot, config);
    }

    // --- 2. AUTOMATED HISTORICAL RECOVERY PASS ---
    const historicalStaleTasks = await db.schedule_tasks
      .where("userId")
      .equals(userId)
      .toArray();

    const staleItems = historicalStaleTasks.filter(
      task => task.scheduledDate !== todayDate && task.status?.toLowerCase() === "pending"
    );

    if (staleItems.length > 0) {
      for (const staleTask of staleItems) {
        await db.schedule_tasks.update(staleTask.id, { status: "missed", closedAt: Date.now() });
        
        if (staleTask.subtasks) {
          for (const sub of staleTask.subtasks) {
            if (staleTask.type === "revision") continue;

            const prog = await db.subtopic_progress.where("subtopicId").equals(sub.subtopicId).first();
            if (!prog) {
              await db.subtopic_progress.put({
                id: `prog_node_${Date.now()}_${sub.subtopicId}`,
                subtopicId: sub.subtopicId, 
                status: "missed", 
                remainingMinutes: parseInt(sub.duration) || 45, 
                updatedAt: Date.now()
              });
            } else if (prog.status?.toLowerCase() !== "completed" && prog.status?.toLowerCase() !== "chunked") {
              await db.subtopic_progress.update(prog.id, {
                status: "missed",
                remainingMinutes: parseInt(sub.duration) || 45,
                updatedAt: Date.now()
              });
            }
          }
        }
      }
    }

    // --- 3. STRICT 5:00 AM PROGRESSION BLOCK GATE ---
    const dailyLogs = await db.schedule_tasks.where("[userId+scheduledDate]").equals([userId, todayDate]).toArray();
    const isConcludedToday = dailyLogs.some(
      task => task.status?.toLowerCase() === "closed" || task.status?.toLowerCase() === "missed"
    );

    if (isConcludedToday) return [];

    // --- 4. RETRIEVAL PASS ---
    const existingActiveTasks = dailyLogs.filter(
      task => task.status?.toLowerCase() === "pending" || task.status?.toLowerCase() === "completed"
    );

    if (existingActiveTasks.length > 0) return existingActiveTasks;

    // --- 5. FIXED BUDGET ALLOCATIONS & PARSING ---
    let finalRevisionMinutes = activeTargetHours >= 8 ? 75 : (activeTargetHours === 7 ? 60 : 45);
    const practiceMinutes = 60;
    
    let baseOptionalMinutes = 90; 
    let weeklyOptionalCap = 360;   

    if (activeTargetHours === 7) {
      baseOptionalMinutes = 105;  
      weeklyOptionalCap = 420;     
    } else if (activeTargetHours === 8) {
      baseOptionalMinutes = 120;  
      weeklyOptionalCap = 480;     
    }

    const maxConsecutiveDays = 2; 
    let allocateOptionalToday = true;

    const historicOptionalLogs = historicalStaleTasks.filter(task => task.type === "optional");
    const startOfWeekTimestamp = Date.now() - (7 * 24 * 60 * 60 * 1000);
    const weeklyMinutesConsumed = historicOptionalLogs
      .filter(task => new Date(task.scheduledDate).getTime() >= startOfWeekTimestamp && task.status?.toLowerCase() === "completed")
      .reduce((sum, task) => sum + (task.estimatedMinutes || 0), 0);

    if (weeklyMinutesConsumed + baseOptionalMinutes > weeklyOptionalCap) {
      allocateOptionalToday = false;
    }

    if (allocateOptionalToday && historicOptionalLogs.length > 0) {
      const plannedDates = historicOptionalLogs.map(t => t.scheduledDate);
      let streakCount = 0;
      let checkDate = new Date(todayDate);
      
      for (let i = 0; i < maxConsecutiveDays; i++) {
        checkDate.setDate(checkDate.getDate() - 1);
        const isoString = checkDate.toISOString().split("T")[0];
        if (plannedDates.includes(isoString)) {
          streakCount++;
        } else {
          break;
        }
      }

      if (streakCount >= maxConsecutiveDays) {
        allocateOptionalToday = false;
      }
    }

    // --- 6. TARGET DISTRIBUTION CALCULATIONS ---
    let finalOptionalMinutes = allocateOptionalToday ? baseOptionalMinutes : 0;
    let finalGsMinutes = (activeTargetHours * 60) - (finalRevisionMinutes + practiceMinutes + finalOptionalMinutes);

    // --- 7. TASK PLACEMENT GENERATION PIPELINES ---
    const finalDayTasks = [];

    // A. GS HARVESTING
    if (finalGsMinutes > 0) {
      const allocatedGs = await harvestSubtopics(userId, "gs", config.gsSequence, finalGsMinutes);
      if (allocatedGs.length > 0) {
        finalDayTasks.push({
          id: `task_gs_${Date.now()}`, userId, type: "gs", scheduledDate: todayDate, status: "pending",
          estimatedMinutes: finalGsMinutes, subtasks: allocatedGs, subjectName: allocatedGs[0].subjectName,
          topicName: allocatedGs[0].topicName, subtopicName: allocatedGs[0].subtopicName, subtopicId: allocatedGs[0].subtopicId, topicId: allocatedGs[0].topicId
        });
      }
    }

    // B. OPTIONAL HARVESTING
    if (finalOptionalMinutes > 0) {
      const allocatedOpt = await harvestSubtopics(userId, "optional", config.optionalSequence, finalOptionalMinutes);
      if (allocatedOpt.length > 0) {
        finalDayTasks.push({
          id: `task_opt_${Date.now()}`, userId, type: "optional", scheduledDate: todayDate, status: "pending",
          estimatedMinutes: finalOptionalMinutes, subtasks: allocatedOpt, subjectName: allocatedOpt[0].subjectName,
          topicName: allocatedOpt[0].topicName, subtopicName: allocatedOpt[0].subtopicName, subtopicId: allocatedOpt[0].subtopicId, topicId: allocatedOpt[0].topicId
        });
      }
    }

    // C. REVISION CORES
    if (finalRevisionMinutes > 0) {
      const dueRevisionsToday = await db.revisions
        .where("dueDate")
        .equals(todayDate)
        .filter(r => r.status === "PENDING")
        .toArray();

      const formattedRevisionSubtasks = [];
      if (dueRevisionsToday.length > 0) {
        for (const rev of dueRevisionsToday) {
          let titleName = "Macro Subject Review";
          if (rev.subtopicId) {
            const stMeta = await db.subtopics.get(rev.subtopicId);
            titleName = stMeta ? stMeta.name : "Subtopic Review";
          }

          formattedRevisionSubtasks.push({
            revisionId: rev.id, subtopicId: rev.subtopicId || "", topicId: rev.topicId || "", subjectId: rev.subjectId || "",
            subtopicName: `[${rev.revisionStage}] ${titleName}`,
            duration: Math.round(finalRevisionMinutes / dueRevisionsToday.length) || 15,
            isFinalChunk: true
          });
        }
      }

      finalDayTasks.push({ 
        id: `task_rev_${Date.now()}`, userId, type: "revision", scheduledDate: todayDate, 
        status: dueRevisionsToday.length > 0 ? "pending" : "completed", 
        estimatedMinutes: finalRevisionMinutes, 
        subjectName: "Revision Block", 
        topicName: dueRevisionsToday.length > 0 ? "Spaced Repetition Due Today" : "Spaced Repetition Review", 
        subtopicName: dueRevisionsToday.length > 0 ? `${dueRevisionsToday.length} item(s) require review today.` : "Reviewing active retention items.", 
        subtasks: formattedRevisionSubtasks 
      });
    }
    
    // D. PRACTICE CORES
    finalDayTasks.push({ 
      id: `task_prac_${Date.now()}`, userId, type: "practice", scheduledDate: todayDate, status: "pending", 
      estimatedMinutes: practiceMinutes, subjectName: "Practice Suite", topicName: "MCQ / PYQ / Mains Logs", 
      subtopicName: "Splitting evenly across compilation targets", subtasks: [] 
    });

    await db.schedule_tasks.bulkPut(finalDayTasks);
    return finalDayTasks;
  });
}

// Keep harvestSubtopics exact...
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
            needed = parseInt(progress.remainingMinutes) || needed;
            currentPart = (parseInt(progress.completedChunksCount) || 1) + 1;
          } else if (progress.status?.toLowerCase() === "missed") {
            isRecovery = true;
          }
        }

        let formattedName = st.name;
        if (isRecovery) {
          formattedName = `[Recovery] ${st.name}`;
        } else if (currentPart > 1) {
          formattedName = `${st.name} - Part ${currentPart}`;
        }

        if (needed <= remainingMinutes) {
          output.push({ 
            subtopicId: st.id, topicId: topic.id, subjectId: sub?.id || "", subjectName: sub?.name || "Target Hub", 
            topicName: topic.name, subtopicName: formattedName, duration: needed, isFinalChunk: true, completedChunksCount: currentPart
          });
          remainingMinutes -= needed;
          if (remainingMinutes <= 0) return output;
        } else if (remainingMinutes >= 1) {
          if (!isRecovery && currentPart === 1) {
            formattedName = `${st.name} - Part 1`;
          }

          output.push({ 
            subtopicId: st.id, topicId: topic.id, subjectId: sub?.id || "", subjectName: sub?.name || "Target Hub", 
            topicName: topic.name, subtopicName: formattedName, duration: remainingMinutes, isFinalChunk: false, 
            nextRemainingMinutes: needed - remainingMinutes, completedChunksCount: currentPart 
          });
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

async function appendExtensionTasks(userId, todayDate, extraMinutes, slotType, config) {
  const activeTasks = await db.schedule_tasks.where("[userId+scheduledDate]").equals([userId, todayDate]).toArray();

  if (slotType === "GS" || slotType === "BOTH") {
    let minutesBudget = slotType === "BOTH" ? Math.round(extraMinutes / 2) : extraMinutes;
    let taskRow = activeTasks.find(t => t.type === "gs");
    if (taskRow) {
      const activeIds = (taskRow.subtasks || []).map(s => s.subtopicId);
      const appends = await harvestSubtopics(userId, "gs", config.gsSequence, minutesBudget, activeIds);
      if (appends.length > 0) {
        await db.schedule_tasks.update(taskRow.id, { 
          subtasks: [...taskRow.subtasks, ...appends], 
          estimatedMinutes: taskRow.estimatedMinutes + minutesBudget,
          status: "pending" 
        });
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
        await db.schedule_tasks.update(taskRow.id, { 
          subtasks: [...taskRow.subtasks, ...appends], 
          estimatedMinutes: taskRow.estimatedMinutes + minutesBudget,
          status: "pending" 
        });
      }
    }
  }

  window.dispatchEvent(new Event("syllabus-update"));
  return await db.schedule_tasks.where("[userId+scheduledDate]").equals([userId, todayDate]).toArray();
}