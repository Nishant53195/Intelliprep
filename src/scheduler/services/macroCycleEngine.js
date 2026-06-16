// src/scheduler/services/macroCycleEngine.js
import { db } from "../../database/dexie";
import dayjs from "dayjs";

/**
 * Checks if a given date string falls within April 2027.
 * @param {string} dateStr - YYYY-MM-DD formatted date string
 * @returns {boolean}
 */
function isDateInApril2027(dateStr) {
  if (!dateStr) return false;
  const parsed = dayjs(dateStr);
  return parsed.year() === 2027 && parsed.month() === 3; // dayjs months are 0-indexed (3 is April)
}

/**
 * Schedules a single master C1 Macro-Cycle for the entire Subject (20 days post-subject completion)
 */
export async function scheduleSubjectC1MacroCycle(userId, subjectId, todayStr) {
  const computedDueDate = dayjs(todayStr).add(20, "day").format("YYYY-MM-DD");

  if (isDateInApril2027(computedDueDate)) {
    console.log(`[Macro Engine] Subject C1 bypassed for ${subjectId}. Due date ${computedDueDate} falls in April 2027.`);
    return null;
  }

  const subjectTokenKey = `SUBJECT_MASTER_ROLLUP_${subjectId}`;

  const duplicateCheck = await db.revisions
    .where("subtopicId")
    .equals(subjectTokenKey)
    .filter(r => r.revisionStage === "C1" && r.status === "PENDING")
    .first();

  if (!duplicateCheck) {
    const subjectMetadata = await db.subjects.get(subjectId);
    const subjectName = subjectMetadata ? subjectMetadata.name.toUpperCase() : subjectId.toUpperCase();

    const c1Payload = {
      id: `macro_c1_${Date.now()}_${subjectId}`,
      userId,
      subjectId,
      topicId: subjectId, // Bind directly to subjectId to prevent fallback titles
      subtopicId: subjectTokenKey, // Master tracking signature key for subject filters
      topicName: `${subjectName} Revision`,
      subtopicName: "Cycle 1 Checkpoint",
      revisionStage: "C1",
      status: "PENDING",
      dueDate: computedDueDate,
      createdAt: Date.now()
    };

    await db.revisions.put(c1Payload);
    console.log(`[Macro Engine] Whole Subject C1 scheduled successfully for ${subjectName} on ${computedDueDate}`);
    return c1Payload;
  }
  return null;
}

/**
 * Schedules a single master C2 Macro-Cycle for the entire Subject (45 days post-C1 completion)
 */
export async function scheduleSubjectC2MacroCycle(userId, subjectId, todayStr) {
  const computedDueDate = dayjs(todayStr).add(45, "day").format("YYYY-MM-DD");

  if (isDateInApril2027(computedDueDate)) {
    console.log(`[Macro Engine] Subject C2 bypassed for ${subjectId}. Due date ${computedDueDate} falls in April 2027.`);
    return null;
  }

  const subjectTokenKey = `SUBJECT_MASTER_ROLLUP_${subjectId}`;

  const duplicateCheck = await db.revisions
    .where("subtopicId")
    .equals(subjectTokenKey)
    .filter(r => r.revisionStage === "C2" && r.status === "PENDING")
    .first();

  if (!duplicateCheck) {
    const subjectMetadata = await db.subjects.get(subjectId);
    const subjectName = subjectMetadata ? subjectMetadata.name.toUpperCase() : subjectId.toUpperCase();

    const c2Payload = {
      id: `macro_c2_${Date.now()}_${subjectId}`,
      userId,
      subjectId,
      topicId: subjectId, // Bind directly to subjectId to prevent fallback titles
      subtopicId: subjectTokenKey,
      topicName: `${subjectName} Revision`,
      subtopicName: "Cycle 2 Checkpoint",
      revisionStage: "C2",
      status: "PENDING",
      dueDate: computedDueDate,
      createdAt: Date.now()
    };

    await db.revisions.put(c2Payload);
    console.log(`[Macro Engine] Whole Subject C2 scheduled successfully for ${subjectName} on ${computedDueDate}`);
    return c2Payload;
  }
  return null;
}