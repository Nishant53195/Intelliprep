import dayjs from "dayjs";

import {
  TASK_TYPES,
  SLOT_TYPES,
} from "../../constants/scheduler";

import chunkSubtopic
  from "./chunkSubtopic";

import practiceTaskInjector
  from "./practiceTaskInjector";

import { buildTaskMetadata }
  from "./buildTaskMetadata";

export default function fillStudySlots({
  gsSubtopics = [],

  optionalSubtopics = [],

  revisionTasks = [],

  studyHours,

  userId,

  startDate,
}) {
  const generatedTasks = [];

  let globalTaskOrder = 0;

  let currentDate =
    dayjs(startDate);

  const totalMinutes =
    studyHours * 60;

  const revisionMinutes =
    studyHours >= 7
      ? 60
      : 45;

  const practiceMinutes =
    studyHours >= 7
      ? 60
      : 45;

  const optionalMinutes =
    90;

  const gsMinutes =
    totalMinutes -
    revisionMinutes -
    practiceMinutes -
    optionalMinutes;

  let gsPointer = 0;

  let optionalPointer = 0;

  while (
    gsPointer <
      gsSubtopics.length ||
    optionalPointer <
      optionalSubtopics.length
  ) {
    const scheduledDate =
      currentDate.format(
        "YYYY-MM-DD"
      );

    /*
     ------------------------
     REVISION SLOT
     ------------------------
    */

    revisionTasks.forEach(
      (revisionTask) => {
        generatedTasks.push(
          buildTaskMetadata(
            {
              ...revisionTask,

              userId,

              type:
                TASK_TYPES.REVISION,

              slotType:
                SLOT_TYPES.REVISION,

              scheduledDate,

              completed: false,

              orderIndex:
                globalTaskOrder,
            },

            globalTaskOrder++
          )
        );
      }
    );

    /*
     ------------------------
     OPTIONAL SLOT
     ------------------------
    */

    let optionalUsed = 0;

    while (
      optionalUsed <
        optionalMinutes &&
      optionalPointer <
        optionalSubtopics.length
    ) {
      const subtopic =
        optionalSubtopics[
          optionalPointer
        ];

      const remaining =
        optionalMinutes -
        optionalUsed;

      const {
        chunkMinutes,

        leftoverMinutes,
      } = chunkSubtopic({
        remainingMinutes:
          subtopic.remainingMinutes ||
          subtopic.estimatedMinutes,

        availableMinutes:
          remaining,
      });

      generatedTasks.push(
        buildTaskMetadata(
          {
            userId,

            subjectId:
              subtopic.subjectId,

            topicId:
              subtopic.topicId,

            subtopicId:
              subtopic.id,

            type:
              TASK_TYPES.STUDY,

            slotType:
              SLOT_TYPES.OPTIONAL,

            scheduledDate,

            estimatedMinutes:
              chunkMinutes,

            chunkMinutes,

            completed: false,

            orderIndex:
              globalTaskOrder,
          },

          globalTaskOrder++
        )
      );

      optionalUsed +=
        chunkMinutes;

      subtopic.remainingMinutes =
        leftoverMinutes;

      if (
        leftoverMinutes <= 0
      ) {
        optionalPointer += 1;
      }
    }

    /*
     ------------------------
     PRACTICE SLOT
     ------------------------
    */

    const practiceTasks =
      practiceTaskInjector({
        currentDate:
          scheduledDate,
      });

    practiceTasks.forEach(
      (practiceTask) => {
        generatedTasks.push(
          buildTaskMetadata(
            {
              userId,

              type:
                practiceTask.type,

              slotType:
                SLOT_TYPES.PRACTICE,

              scheduledDate,

              estimatedMinutes:
                practiceMinutes /
                practiceTasks.length,

              completed: false,

              orderIndex:
                globalTaskOrder,
            },

            globalTaskOrder++
          )
        );
      }
    );

    /*
     ------------------------
     GS SLOT
     ------------------------
    */

    let gsUsed = 0;

    while (
      gsUsed < gsMinutes &&
      gsPointer <
        gsSubtopics.length
    ) {
      const subtopic =
        gsSubtopics[gsPointer];

      const remaining =
        gsMinutes - gsUsed;

      const {
        chunkMinutes,

        leftoverMinutes,
      } = chunkSubtopic({
        remainingMinutes:
          subtopic.remainingMinutes ||
          subtopic.estimatedMinutes,

        availableMinutes:
          remaining,
      });

      generatedTasks.push(
        buildTaskMetadata(
          {
            userId,

            subjectId:
              subtopic.subjectId,

            topicId:
              subtopic.topicId,

            subtopicId:
              subtopic.id,

            type:
              TASK_TYPES.STUDY,

            slotType:
              SLOT_TYPES.GS,

            scheduledDate,

            estimatedMinutes:
              chunkMinutes,

            chunkMinutes,

            completed: false,

            orderIndex:
              globalTaskOrder,
          },

          globalTaskOrder++
        )
      );

      gsUsed +=
        chunkMinutes;

      subtopic.remainingMinutes =
        leftoverMinutes;

      if (
        leftoverMinutes <= 0
      ) {
        gsPointer += 1;
      }
    }

    currentDate =
      currentDate.add(
        1,
        "day"
      );
  }

  return generatedTasks;
}