import { db } from "../../database/dexie";
import dayjs from "dayjs";
import { queueSpacedRepetition, checkAndQueueBigCycles } from "../../revision/engine/revisionEngine";
// IMPORT YOUR UNIFIED 5:00 AM DATE-SHIFT GENERATOR RULE
import { getActiveShiftDateString } from "../engine/generateDailySchedule";

/**
 * Advanced Chunk-Aware Completion Hook Service
 * FIXED: Implements strict sequential review cascades (D3 -> D10 -> D30) 
 * instead of generating them all simultaneously.
 * UPDATED: Receives recallQuality dynamically from the React interactive UI slider selection.
 * CRITICAL FIX: Bound to getActiveShiftDateString to protect against late-night boundary bugs.
 */
export async function completeTaskService(taskId, targetSubtopicId, targetTopicId, recallQuality = "Partial Recall (Medium)") {
  const taskRow = await db.schedule_tasks.get(taskId);
  if (!taskRow) return;

  const userId = taskRow.userId;
  
  // FIXED: Synchronized date matching variable to use the 5:00 AM shift rule tracker
  const todayStr = getActiveShiftDateString();

  // --- 1. EVALUATE REVISION CARD TIER PROGRESSION WITH SLIDER METRICS ---
  if (taskRow.type === "revision" || taskRow.slotType === "REVISION") {
    
    // Find the specific active pending revision record for this target subtopic
    const activeRevision = await db.revisions
      .where("subtopicId")
      .equals(targetSubtopicId || taskRow.subtopicId || "")
      .filter(r => r.status === "PENDING")
      .first();

    if (activeRevision) {
      // Mark current tracking tier finished and preserve the explicit recall score
      await db.revisions.update(activeRevision.id, {
        status: "COMPLETED",
        recallQuality: recallQuality,
        updatedAt: Date.now()
      });

      let nextStage = null;
      let daysToAdd = 0;

      // STAGED PROGRESSION PARSING SYSTEM: D3 -> D10 -> D30
      if (activeRevision.revisionStage === "D3") {
        nextStage = "D10";
        daysToAdd = 7; // Day 10 review step (7 days added to Day 3 base)
      } else if (activeRevision.revisionStage === "D10") {
        nextStage = "D30";
        daysToAdd = 20; // Day 30 review step (20 days added to Day 10 base)
      }

      // If Failed Recall is selected, hold back progress and repeat the stage tomorrow
      if (recallQuality.includes("Failed Recall") || recallQuality.includes("(Fail)")) {
        nextStage = activeRevision.revisionStage;
        daysToAdd = 1; // Reschedules for exactly tomorrow
      }

      if (nextStage && daysToAdd > 0) {
        // Guard check to protect against historical duplicate writes
        const duplicateCheck = await db.revisions
          .where("subtopicId")
          .equals(activeRevision.subtopicId)
          .filter(r => r.revisionStage === nextStage && r.status === "PENDING")
          .first();

        if (!duplicateCheck) {
          await db.revisions.put({
            id: `rev_${Date.now()}_${activeRevision.subtopicId}`,
            userId: activeRevision.userId,
            subjectId: activeRevision.subjectId || "",
            topicId: activeRevision.topicId || "",
            subtopicId: activeRevision.subtopicId,
            revisionStage: nextStage,
            status: "PENDING",
            dueDate: dayjs(todayStr).add(daysToAdd, "day").format("YYYY-MM-DD"),
            createdAt: Date.now()
          });
        }
      }
    }
    
    // Complete the task slot row for UI layout sync update
    await db.schedule_tasks.update(taskId, {
      status: "COMPLETED",
      completedAt: Date.now()
    });
    
    window.dispatchEvent(new Event("syllabus-update"));
    return;
  }

  // --- 2. STANDARD WORKSPACE CLOSURES (GS / OPTIONAL) ---
  if (targetSubtopicId) {
    const matchedSubtask = taskRow.subtasks?.find(st => st.subtopicId === targetSubtopicId);
    if (matchedSubtask) {
      await commitSubtopicStatusToDatabase(matchedSubtask, userId, todayStr);
    } else {
      await commitSubtopicStatusToDatabase({ subtopicId: targetSubtopicId, topicId: targetTopicId, isFinalChunk: true }, userId, todayStr);
    }
  } else {
    if (taskRow.subtasks && taskRow.subtasks.length > 0) {
      for (const subtask of taskRow.subtasks) {
        await commitSubtopicStatusToDatabase(subtask, userId, todayStr);
      }
    }
  }

  // --- 3. EVALUATION RULE: PROGRESS SLOT CARD SYNC CLOSURE ---
  const refetchedTaskRow = await db.schedule_tasks.get(taskId);
  if (refetchedTaskRow && refetchedTaskRow.subtasks && refetchedTaskRow.subtasks.length > 0) {
    const subtaskIds = refetchedTaskRow.subtasks.map(st => st.subtopicId);
    
    const progressRecords = await db.subtopic_progress
      .where("subtopicId")
      .anyOf(subtaskIds)
      .toArray();

    const areAllSlotTasksFinished = refetchedTaskRow.subtasks.every(st => {
      const prog = progressRecords.find(p => p.subtopicId === st.subtopicId);
      return prog && (prog.status?.toUpperCase() === "COMPLETED" || st.isFinalChunk === false);
    });

    if (areAllSlotTasksFinished) {
      await db.schedule_tasks.update(taskId, {
        status: "COMPLETED",
        completedAt: Date.now()
      });
    }
  } else {
    await db.schedule_tasks.update(taskId, {
      status: "COMPLETED",
      completedAt: Date.now()
    });
  }

  window.dispatchEvent(new Event("syllabus-update"));
}

/**
 * Writes completion markers directly to subtopic tables and seeds D3 milestones ONLY.
 */
async function commitSubtopicStatusToDatabase(subtask, userId, todayStr) {
  const { subtopicId, topicId, isFinalChunk, nextRemainingMinutes, completedChunksCount, subjectId } = subtask;
  
  const progressRecord = await db.subtopic_progress.where("subtopicId").equals(subtopicId).first();
  const recordId = progressRecord ? progressRecord.id : `prog_node_${Date.now()}_${subtopicId}`;

  const verifiedIsFinal = isFinalChunk !== undefined ? isFinalChunk : true;

  if (verifiedIsFinal) {
    await db.subtopic_progress.put({
      id: recordId,
      subtopicId,
      status: "COMPLETED",
      completedAt: Date.now(),
      remainingMinutes: 0,
      completedChunksCount: Number(completedChunksCount || 1)
    });

    await db.subtopics.update(subtopicId, { 
      status: "COMPLETED" 
    });

    // --- SEED D3 REVISION MILESTONE FIRST AND ONLY ---
    const existingD3 = await db.revisions
      .where("subtopicId")
      .equals(subtopicId)
      .filter(r => r.revisionStage === "D3")
      .first();

    if (!existingD3) {
      await db.revisions.put({
        id: `rev_${Date.now()}_${subtopicId}`,
        userId,
        subjectId: subjectId || "",
        topicId: topicId || "",
        subtopicId: subtopicId,
        revisionStage: "D3", // Enforced initial start assignment boundary 
        status: "PENDING",
        dueDate: dayjs(todayStr).add(3, "day").format("YYYY-MM-DD"),
        createdAt: Date.now()
      });
    }

    // Upward Rollup Hook
    if (topicId) {
      const siblings = await db.subtopics.where("topicId").equals(topicId).toArray();
      const isTopicFinished = siblings.every(s => s.status?.toUpperCase() === "COMPLETED" || s.id === subtopicId);

      if (isTopicFinished) {
        await db.topics.update(topicId, { status: "COMPLETED" });

        const parentSubjectId = subjectId || siblings[0]?.subjectId;
        if (parentSubjectId) {
          await checkAndQueueBigCycles(userId, parentSubjectId);
        }
      }
    }
  } else {
    const currentCompletedChunks = progressRecord && progressRecord.completedChunksCount 
      ? Number(progressRecord.completedChunksCount) + 1 
      : Number(completedChunksCount || 1);

    await db.subtopic_progress.put({
      id: recordId,
      subtopicId,
      status: "chunked",
      remainingMinutes: Number(nextRemainingMinutes),
      completedChunksCount: currentCompletedChunks,
      updatedAt: Date.now()
    });
    
    await db.subtopics.update(subtopicId, { 
      status: "IN_PROGRESS" 
    });
  }
}