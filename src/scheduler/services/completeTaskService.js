// src/scheduler/services/completeTaskService.js
import { db } from "../../database/dexie";
import dayjs from "dayjs";
import { queueSpacedRepetition, checkAndQueueBigCycles } from "../../revision/engine/revisionEngine";
import { getActiveShiftDateString } from "../engine/generateDailySchedule";

// IMPORT BOTH DYNAMIC SUBJECT LEVEL MACRO CALCULATORS
import { scheduleSubjectC1MacroCycle, scheduleSubjectC2MacroCycle } from "./macroCycleEngine";

/**
 * Advanced Chunk-Aware Completion Hook Service
 */
export async function completeTaskService(taskId, targetSubtopicId, targetTopicId, recallQuality = "Partial Recall (Medium)") {
  const taskRow = await db.schedule_tasks.get(taskId);
  if (!taskRow) return;

  const userId = taskRow.userId;
  const todayStr = getActiveShiftDateString();

  // --- 1. EVALUATE REVISION CARD TIER PROGRESSION WITH SLIDER METRICS ---
  if (taskRow.type === "revision" || taskRow.slotType === "REVISION") {
    
    // Clean the lookup key to handle chunk extensions cleanly
    const lookupKey = targetSubtopicId || taskRow.subtopicId || "";
    const activeRevision = await db.revisions
      .where("subtopicId")
      .equals(lookupKey)
      .filter(r => r.status === "PENDING")
      .first();

    if (activeRevision) {
      // Mark current tracking tier finished
      await db.revisions.update(activeRevision.id, {
        status: "COMPLETED",
        recallQuality: recallQuality,
        updatedAt: Date.now()
      });

      // SUBTOPIC LEVEL CONTINUOUS REVISION TRACKING (D3 -> D10 -> D30)
      if (activeRevision.revisionStage === "D3") {
        const duplicateCheck = await db.revisions
          .where("subtopicId")
          .equals(activeRevision.subtopicId)
          .filter(r => r.revisionStage === "D10" && r.status === "PENDING")
          .first();

        if (!duplicateCheck) {
          await db.revisions.put({
            id: `rev_${Date.now()}_${activeRevision.subtopicId}`,
            userId: activeRevision.userId,
            subjectId: activeRevision.subjectId || "",
            topicId: activeRevision.topicId || "",
            subtopicId: activeRevision.subtopicId,
            revisionStage: "D10",
            status: "PENDING",
            dueDate: dayjs(todayStr).add(7, "day").format("YYYY-MM-DD"), // Day 10
            createdAt: Date.now()
          });
        }
      } 
      else if (activeRevision.revisionStage === "D10") {
        const duplicateCheck = await db.revisions
          .where("subtopicId")
          .equals(activeRevision.subtopicId)
          .filter(r => r.revisionStage === "D30" && r.status === "PENDING")
          .first();

        if (!duplicateCheck) {
          await db.revisions.put({
            id: `rev_${Date.now()}_${activeRevision.subtopicId}`,
            userId: activeRevision.userId,
            subjectId: activeRevision.subjectId || "",
            topicId: activeRevision.topicId || "",
            subtopicId: activeRevision.subtopicId,
            revisionStage: "D30",
            status: "PENDING",
            dueDate: dayjs(todayStr).add(20, "day").format("YYYY-MM-DD"), // Day 30
            createdAt: Date.now()
          });
        }
      } 
      // WHOLE SUBJECT LEVEL MACRO CYCLES TIMELINE (C1 COMPLETION TRIGGERS C2 ONLY)
      else if (activeRevision.revisionStage === "C1") {
        await scheduleSubjectC2MacroCycle(userId, activeRevision.subjectId, todayStr);
      }

      // Handle Fail Cases
      if (recallQuality.includes("Failed Recall") || recallQuality.includes("(Fail)")) {
        await db.revisions.put({
          id: `rev_${Date.now()}_${activeRevision.subtopicId}_fail`,
          userId: activeRevision.userId,
          subjectId: activeRevision.subjectId || "",
          topicId: activeRevision.topicId || "",
          subtopicId: activeRevision.subtopicId,
          revisionStage: activeRevision.revisionStage,
          status: "PENDING",
          dueDate: dayjs(todayStr).add(1, "day").format("YYYY-MM-DD"),
          createdAt: Date.now()
        });
      }
    }
    
    await db.schedule_tasks.update(taskId, {
      status: "COMPLETED",
      completedAt: Date.now()
    });
    
    window.dispatchEvent(new Event("syllabus-update"));
    return;
  }

  // --- 2. STANDARD WORKSPACE CLOSURES (GS / OPTIONAL STUDY TASKS) ---
  const cleanSubtopicId = (targetSubtopicId || "").replace(/_chunk_\d+$/, "");
  
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

  // --- 3. DYNAMIC TARGET CHECK: AUTOMATIC WHOLE-SUBJECT COMPLETION INTERCEPTOR FOR C1 ONLY ---
  const refetchedTaskRow = await db.schedule_tasks.get(taskId);
  if (refetchedTaskRow) {
    // RESOLVE TRUE SUBJECT ID: Look up the parent topic row directly to prevent ID field contamination bugs
    const sampleTopicId = targetTopicId || refetchedTaskRow.topicId || refetchedTaskRow.subtasks?.[0]?.topicId;
    let parentSubjectId = refetchedTaskRow.subjectId;

    if (sampleTopicId) {
      const topicRecord = await db.topics.get(sampleTopicId);
      if (topicRecord && topicRecord.subjectId) {
        parentSubjectId = topicRecord.subjectId; // Guaranteed to be the true high-level Subject ID (e.g., 'sub_ancient_history')
      }
    }

    if (parentSubjectId) {
      // 1. Fetch total static syllabus scope subtopics for this true whole subject
      const allSubjectSubtopics = await db.subtopics
        .where("subjectId")
        .equals(parentSubjectId)
        .toArray();

      // Fallback check: try querying by topic rollup if data keys were seeded with topic overrides
      let subtopicIds = allSubjectSubtopics.map(s => s.id);
      if (subtopicIds.length === 0 && sampleTopicId) {
        const siblingSubtopics = await db.subtopics.where("topicId").equals(sampleTopicId).toArray();
        subtopicIds = siblingSubtopics.map(s => s.id);
      }

      if (subtopicIds.length > 0) {
        // 2. Query actual live progression metrics
        const progressRecords = await db.subtopic_progress
          .where("subtopicId")
          .anyOf(subtopicIds)
          .filter(p => p.status?.toUpperCase() === "COMPLETED")
          .toArray();

        // 3. Trigger condition: If the number of finished database progress rows matches the entire subject scope
        if (progressRecords.length >= subtopicIds.length) {
          
          // GATED RE-TRIGGER CHECK: Ensure C1 is only scheduled if it has NEVER been initialized before
          const subjectTokenKey = `SUBJECT_MASTER_ROLLUP_${parentSubjectId}`;
          const existingMacroCheck = await db.revisions
            .where("subtopicId")
            .equals(subjectTokenKey)
            .first();

          if (!existingMacroCheck) {
            console.log(`[Subject Rollup] ${parentSubjectId} has reached 100% completion! Dispatching Master Subject C1...`);
            await scheduleSubjectC1MacroCycle(userId, parentSubjectId, todayStr);
          }
        }
      }
    }
  }

  // --- 4. PROGRESS SLOT CARD SYNC CLOSURE ---
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
  
  // Clean the id reference pointer to handle multi-part chunks seamlessly
  const cleanId = (subtopicId || "").replace(/_chunk_\d+$/, "");
  
  const progressRecord = await db.subtopic_progress.where("subtopicId").equals(cleanId).first();
  const recordId = progressRecord ? progressRecord.id : `prog_node_${Date.now()}_${cleanId}`;

  const verifiedIsFinal = isFinalChunk !== undefined ? isFinalChunk : true;

  if (verifiedIsFinal) {
    await db.subtopic_progress.put({
      id: recordId,
      subtopicId: cleanId,
      status: "COMPLETED",
      completedAt: Date.now(),
      remainingMinutes: 0,
      completedChunksCount: Number(completedChunksCount || 1)
    });

    await db.subtopics.update(cleanId, { 
      status: "COMPLETED" 
    });

    // SEED D3 REVISION MILESTONE EXCLUSIVELY FOR SUBTOPICS
    const existingD3 = await db.revisions
      .where("subtopicId")
      .equals(cleanId)
      .filter(r => r.revisionStage === "D3")
      .first();

    if (!existingD3) {
      await db.revisions.put({
        id: `rev_${Date.now()}_${cleanId}`,
        userId,
        subjectId: subjectId || "",
        topicId: topicId || "",
        subtopicId: cleanId,
        revisionStage: "D3", 
        status: "PENDING",
        dueDate: dayjs(todayStr).add(3, "day").format("YYYY-MM-DD"),
        createdAt: Date.now()
      });
    }

    if (topicId) {
      const siblings = await db.subtopics.where("topicId").equals(topicId).toArray();
      const isTopicFinished = siblings.every(s => s.status?.toUpperCase() === "COMPLETED" || s.id === cleanId);

      if (isTopicFinished) {
        await db.topics.update(topicId, { status: "COMPLETED" });
      }
    }
  } else {
    const currentCompletedChunks = progressRecord && progressRecord.completedChunksCount 
      ? Number(progressRecord.completedChunksCount) + 1 
      : Number(completedChunksCount || 1);

    await db.subtopic_progress.put({
      id: recordId,
      subtopicId: cleanId,
      status: "chunked",
      remainingMinutes: Number(nextRemainingMinutes),
      completedChunksCount: currentCompletedChunks,
      updatedAt: Date.now()
    });
    
    await db.subtopics.update(cleanId, { 
      status: "IN_PROGRESS" 
    });
  }
}