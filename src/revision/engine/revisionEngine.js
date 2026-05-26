// src/revision/engine/revisionEngine.js
import { db } from "../../database/dexie";

/**
 * UTILITY: Formats a date object to local YYYY-MM-DD string format securely.
 */
function addDaysAndFormat(dateStr, days) {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
}

/**
 * PART 1: Spaced Repetition Scheduler (Subtopic-Wise)
 * Automatically triggers D3, D10, and D30 revision queues upon fine-grained subtopic completion.
 */
export async function queueSpacedRepetition(userId, subtask) {
  const { subtopicId, topicId, subjectId } = subtask;
  const todayStr = new Date().toISOString().split("T")[0];

  // Map out the targeted micro intervals
  const intervals = [
    { stage: "D3", days: 3 },
    { stage: "D10", days: 10 },
    { stage: "D30", days: 30 }
  ];

  const revisionEntries = intervals.map(interval => ({
    id: `rev_sr_${interval.stage}_${Date.now()}_${subtopicId}`,
    userId,
    subjectId: subjectId || "",
    topicId: topicId || "",
    subtopicId,
    revisionStage: interval.stage,
    dueDate: addDaysAndFormat(todayStr, interval.days),
    intervalDays: interval.days,
    revisionCount: 1,
    status: "PENDING",
    createdAt: Date.now()
  }));

  // Bulk put into Dexie IndexedDB rows securely
  await db.revisions.bulkPut(revisionEntries);
  console.log(`[Revision Engine] Successfully queued D3, D10, D30 subtopic entries for: ${subtopicId}`);
}

/**
 * PART 2: Big Cycles Master Watcher (Subject-Wise Rollup)
 * Checks if the parent subject is 100% finished. If true, schedules C1 (D+20) and C2 (D+60) macro review blocks.
 */
export async function checkAndQueueBigCycles(userId, subjectId) {
  if (!subjectId) return;

  // 1. Fetch all sibling subtopics belonging to this macro subject field
  const totalSubtopics = await db.subtopics.where("subjectId").equals(subjectId).toArray();
  if (totalSubtopics.length === 0) return;

  // 2. Cross-reference completed items from subtopic progress registers
  const completedProgress = await db.subtopic_progress
    .where("status")
    .equals("COMPLETED")
    .toArray();

  const completedSubtopicIds = new Set(completedProgress.map(p => p.subtopicId));

  // 3. Verify absolute coverage bounds
  const isSubjectFullyComplete = totalSubtopics.every(st => completedSubtopicIds.has(st.id));

  if (isSubjectFullyComplete) {
    const todayStr = new Date().toISOString().split("T")[0];
    
    // Check if C1 or C2 for this subject has already been scheduled to avoid double triggers
    const existingCycles = await db.revisions
      .where("subjectId")
      .equals(subjectId)
      .filter(r => r.revisionStage === "C1" || r.revisionStage === "C2")
      .toArray();
      
    if (existingCycles.length > 0) return;

    const bigCycleEntries = [
      {
        id: `rev_cycle_C1_${Date.now()}_${subjectId}`,
        userId,
        subjectId,
        topicId: "", // Leave blank or target generic summary block layout
        subtopicId: "", // Subject-wide macro target
        revisionStage: "C1",
        dueDate: addDaysAndFormat(todayStr, 20),
        intervalDays: 20,
        revisionCount: 1,
        status: "PENDING",
        createdAt: Date.now()
      },
      {
        id: `rev_cycle_C2_${Date.now()}_${subjectId}`,
        userId,
        subjectId,
        topicId: "",
        subtopicId: "",
        revisionStage: "C2",
        dueDate: addDaysAndFormat(todayStr, 60),
        intervalDays: 60,
        revisionCount: 1,
        status: "PENDING",
        createdAt: Date.now()
      }
    ];

    await db.revisions.bulkPut(bigCycleEntries);
    console.log(`[Revision Engine] SUBJECT COMPLETE: Scheduled C1 (+20 days) and C2 (+60 days) for Subject: ${subjectId}`);
  }
}