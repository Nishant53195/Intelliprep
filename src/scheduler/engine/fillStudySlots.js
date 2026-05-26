import dayjs from "dayjs";
import { TASK_TYPES, SLOT_TYPES } from "../../constants/scheduler";
import chunkSubtopic from "./chunkSubtopic";
import practiceTaskInjector from "./practiceTaskInjector";
import { buildTaskMetadata } from "./buildTaskMetadata";

/**
 * Bulk Study Slot Allocation Engine - Updated Baseline Configuration
 * 1. Hardcoded target allocations:
 * - 6 Hours: Revision = 45m | Practice = 60m | Optional = 90m  | GS = 165m
 * - 7 Hours: Revision = 60m | Practice = 60m | Optional = 105m | GS = 195m
 * - 8 Hours: Revision = 75m | Practice = 60m | Optional = 120m | GS = 225m
 * 2. DROPPED automated initialization pre-generation loops for revision milestones.
 */
export default function fillStudySlots({
  gsSubtopics = [],
  optionalSubtopics = [],
  revisionTasks = [], // Empty or handled dynamically
  studyHours,
  userId,
  startDate,
}) {
  const generatedTasks = [];
  let globalTaskOrder = 0;
  let currentDate = dayjs(startDate);

  // --- 1. COMPUTE FIXED TIME BOUNDARIES STRICTLY BY TARGET SELECTION ---
  const totalMinutes = studyHours * 60;
  
  // Set explicit, static slot intervals matching requested parameters
  const revisionMinutes = studyHours >= 8 ? 75 : (studyHours === 7 ? 60 : 45);
  const practiceMinutes = 60; // Non-negotiable structural baseline constant
  
  let optionalMinutes = 90;
  if (studyHours === 7) {
    optionalMinutes = 105;
  } else if (studyHours === 8) {
    optionalMinutes = 120;
  }

  // General Studies absorbs the exact remaining balance deductively
  const gsMinutes = totalMinutes - revisionMinutes - practiceMinutes - optionalMinutes;

  let gsPointer = 0;
  let optionalPointer = 0;

  // Outer calendar progression layout loop
  while (
    gsPointer < gsSubtopics.length ||
    optionalPointer < optionalSubtopics.length
  ) {
    const scheduledDate = currentDate.format("YYYY-MM-DD");

    /*
      --------------------------------------------------
      REVISION SLOT (STABLE BASELINE INJECTION ONLY)
      --------------------------------------------------
    */
    revisionTasks.forEach((revisionTask) => {
      generatedTasks.push(
        buildTaskMetadata(
          {
            ...revisionTask,
            userId,
            type: TASK_TYPES.REVISION,
            slotType: SLOT_TYPES.REVISION,
            scheduledDate,
            completed: false,
            orderIndex: globalTaskOrder,
          },
          globalTaskOrder++
        )
      );
    });

    /*
      --------------------------------------------------
      OPTIONAL SLOT (SEQUENTIAL CHUNKING LOGIC)
      --------------------------------------------------
    */
    let optionalUsed = 0;

    while (
      optionalUsed < optionalMinutes &&
      optionalPointer < optionalSubtopics.length
    ) {
      const subtopic = optionalSubtopics[optionalPointer];
      const remaining = optionalMinutes - optionalUsed;

      const { chunkMinutes, leftoverMinutes } = chunkSubtopic({
        remainingMinutes: subtopic.remainingMinutes || subtopic.estimatedMinutes,
        availableMinutes: remaining,
      });

      generatedTasks.push(
        buildTaskMetadata(
          {
            userId,
            subjectId: subtopic.subjectId,
            topicId: subtopic.topicId,
            subtopicId: subtopic.id,
            type: TASK_TYPES.STUDY,
            slotType: SLOT_TYPES.OPTIONAL,
            scheduledDate,
            estimatedMinutes: chunkMinutes,
            chunkMinutes,
            completed: false,
            orderIndex: globalTaskOrder,
          },
          globalTaskOrder++
        )
      );

      optionalUsed += chunkMinutes;
      subtopic.remainingMinutes = leftoverMinutes;

      if (leftoverMinutes <= 0) {
        optionalPointer += 1;
      }
    }

    /*
      --------------------------------------------------
      PRACTICE SLOT
      --------------------------------------------------
    */
    const practiceTasks = practiceTaskInjector({
      currentDate: scheduledDate,
    });

    practiceTasks.forEach((practiceTask) => {
      generatedTasks.push(
        buildTaskMetadata(
          {
            userId,
            type: practiceTask.type,
            slotType: SLOT_TYPES.PRACTICE,
            scheduledDate,
            estimatedMinutes: practiceMinutes / practiceTasks.length,
            completed: false,
            orderIndex: globalTaskOrder,
          },
          globalTaskOrder++
        )
      );
    });

    /*
      --------------------------------------------------
      GENERAL STUDIES (GS) SLOT
      --------------------------------------------------
    */
    let gsUsed = 0;

    while (
      gsUsed < gsMinutes &&
      gsPointer < gsSubtopics.length
    ) {
      const subtopic = gsSubtopics[gsPointer];
      const remaining = gsMinutes - gsUsed;

      const { chunkMinutes, leftoverMinutes } = chunkSubtopic({
        remainingMinutes: subtopic.remainingMinutes || subtopic.estimatedMinutes,
        availableMinutes: remaining,
      });

      generatedTasks.push(
        buildTaskMetadata(
          {
            userId,
            subjectId: subtopic.subjectId,
            topicId: subtopic.topicId,
            subtopicId: subtopic.id,
            type: TASK_TYPES.STUDY,
            slotType: SLOT_TYPES.GS,
            scheduledDate,
            estimatedMinutes: chunkMinutes,
            chunkMinutes,
            completed: false,
            orderIndex: globalTaskOrder,
          },
          globalTaskOrder++
        )
      );

      gsUsed += chunkMinutes;
      subtopic.remainingMinutes = leftoverMinutes;

      if (leftoverMinutes <= 0) {
        gsPointer += 1;
      }
    }

    // Increment calendar pointer block forward step-by-step
    currentDate = currentDate.add(1, "day");
  }

  return generatedTasks;
}