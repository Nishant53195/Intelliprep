import { db } from "../../database/dexie";

/**
 * Advanced Chunk-Aware Completion Hook Service
 * Marks items complete inside progress tracking layers and primary data structures.
 * Standardizes status formatting to uppercase "COMPLETED" to instantly fix StudyHub greying rules.
 */
export async function completeTaskService(taskId, targetSubtopicId, targetTopicId) {
  const taskRow = await db.schedule_tasks.get(taskId);
  if (!taskRow) return;

  // 1. Process individual subtask closures inside the daily slot rows
  if (targetSubtopicId) {
    const matchedSubtask = taskRow.subtasks?.find(st => st.subtopicId === targetSubtopicId);
    if (matchedSubtask) {
      await commitSubtopicStatusToDatabase(matchedSubtask);
    }
  } else {
    // Loop through and complete all subtasks packed inside this card slot
    if (taskRow.subtasks && taskRow.subtasks.length > 0) {
      for (const subtask of taskRow.subtasks) {
        await commitSubtopicStatusToDatabase(subtask);
      }
    }
  }

  // 2. Evaluation Rule: Check if ALL subtasks assigned to this daily card slot are closed
  const refetchedTaskRow = await db.schedule_tasks.get(taskId);
  if (refetchedTaskRow && refetchedTaskRow.subtasks && refetchedTaskRow.subtasks.length > 0) {
    const subtaskIds = refetchedTaskRow.subtasks.map(st => st.subtopicId);
    
    const progressRecords = await db.subtopic_progress
      .where("subtopicId")
      .anyOf(subtaskIds)
      .toArray();

    // Check if every individual component subtask chunk is fully satisfied
    const areAllSlotTasksFinished = refetchedTaskRow.subtasks.every(st => {
      const prog = progressRecords.find(p => p.subtopicId === st.subtopicId);
      // It is finished if marked complete in progress, or if it was an intermediate chunk (processed for today)
      return prog && (prog.status?.toUpperCase() === "COMPLETED" || st.isFinalChunk === false);
    });

    if (areAllSlotTasksFinished) {
      // Commit uppercase COMPLETED to match the StudyHub UI layout filter blocks
      await db.schedule_tasks.update(taskId, {
        status: "COMPLETED",
        completedAt: Date.now()
      });
    }
  } else {
    // Standalone base rule handler
    await db.schedule_tasks.update(taskId, {
      status: "COMPLETED",
      completedAt: Date.now()
    });
  }

  // 3. Dispatch global layout refresh notification to force tabs to update instantly
  window.dispatchEvent(new Event("syllabus-update"));
}

/**
 * Writes completion markers directly to both subtopic and subtopic_progress tables.
 */
async function commitSubtopicStatusToDatabase(subtask) {
  const { subtopicId, topicId, isFinalChunk, nextRemainingMinutes, completedChunksCount } = subtask;
  
  const progressRecord = await db.subtopic_progress.where("subtopicId").equals(subtopicId).first();
  const recordId = progressRecord ? progressRecord.id : `prog_node_${Date.now()}_${subtopicId}`;

  // Direct safe fallbacks checking properties explicitly to prevent injecting default values
  const verifiedIsFinal = isFinalChunk !== undefined ? isFinalChunk : true;

  if (verifiedIsFinal) {
    // --- FINAL CHUNK: Mark subtopic fully complete inside both database dimensions ---
    await db.subtopic_progress.put({
      id: recordId,
      subtopicId,
      status: "COMPLETED",
      completedAt: Date.now(),
      remainingMinutes: 0,
      completedChunksCount: (completedChunksCount || 1)
    });

    await db.subtopics.update(subtopicId, { 
      status: "COMPLETED" 
    });

    // Upward Rollup Hook: Check if all sibling subtopics are complete to close the parent topic container
    if (topicId) {
      const siblings = await db.subtopics.where("topicId").equals(topicId).toArray();
      const isTopicFinished = siblings.every(s => s.status?.toUpperCase() === "COMPLETED" || s.id === subtopicId);

      if (isTopicFinished) {
        await db.topics.update(topicId, { status: "COMPLETED" });
      }
    }
  } else {
    // --- INTERMEDIATE CHUNK: Save accurate leftover tracking parameters safely ---
    await db.subtopic_progress.put({
      id: recordId,
      subtopicId,
      status: "chunked",
      remainingMinutes: nextRemainingMinutes || 30,
      completedChunksCount: completedChunksCount || 1,
      updatedAt: Date.now()
    });
    
    await db.subtopics.update(subtopicId, { 
      status: "IN_PROGRESS" 
    });
  }
}