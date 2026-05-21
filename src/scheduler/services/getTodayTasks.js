import dayjs from "dayjs";

import {
  getTasksByDate,

  getMissedTasksForRecovery,

  bulkUpdateTasks,

  getMissedTasks,
} from "../../database/repositories/scheduleRepository";

import {
  getSubtopicById,
} from "../../database/repositories/syllabusRepository";


import {
  injectRecoveryTasks,
} from "../engine/injectRecoveryTasks";

import {
  TASK_TYPES,

  SLOT_TYPES,
} from "../../constants/scheduler";

import {
  getRevisionById,
} from "../../database/repositories/revisionRepository";

import {
  getRevisionPriority,
} from "../../revision/engine/getRevisionPriority";


export async function fetchTodayTasks() {
  const today =
    dayjs().format(
      "YYYY-MM-DD"
    );

  /*
   --------------------------
   MARK OVERDUE TASKS MISSED
   --------------------------
  */

  const overdueTasks =
    await getMissedTasks();

  const missedUpdates =
    overdueTasks.map(
      (task) => ({
        ...task,

        status: "MISSED",
      })
    );

  if (
    missedUpdates.length > 0
  ) {
    await bulkUpdateTasks(
      missedUpdates
    );
  }

  /*
   --------------------------
   FETCH TODAY TASKS
   --------------------------
  */

  const rawTasks =
    await getTasksByDate(
      today
    );

  const todayTasks =
    rawTasks;

  /*
   --------------------------
   FETCH MISSED TASKS
   --------------------------
  */

  const missedTasks =
    await getMissedTasksForRecovery();

  /*
   --------------------------
   RECOVERY INJECTION
   --------------------------
  */

  const executionQueue =
    injectRecoveryTasks({
      todayTasks,

      missedTasks,

      recoveryLimit: 2,
    });

  /*
   --------------------------
   PERSIST RECOVERY TASKS
   --------------------------
  */

  const injectedRecoveryTasks =
    executionQueue.filter(
      (task) =>
        task.isRecoveryTask &&
        task.recoveryInjectedAt
    );

  if (
    injectedRecoveryTasks.length >
    0
  ) {
    await bulkUpdateTasks(
      injectedRecoveryTasks
    );
  }

  /*
   --------------------------
   ENRICH TASKS
   --------------------------
  */

  const enrichedTasks =
    await Promise.all(
      executionQueue.map(
        async (task) => {
          const subtopic =
            task.subtopicId
              ? await getSubtopicById(
                  task.subtopicId
                )
              : null;

          let revision =
            null;

          if (
            task.type ===
              TASK_TYPES.REVISION &&
            task.revisionId
          ) {
            revision =
              await getRevisionById(
                task.revisionId
              );
          }

          return {
            ...task,

            subtopicName:
              subtopic?.name ||

              (
                task.type ===
                TASK_TYPES.PYQ
                  ? "PYQ Practice"

                : task.type ===
                  TASK_TYPES.MCQ
                  ? "MCQ Practice"

                : task.type ===
                  TASK_TYPES
                    .ANSWER_WRITING
                  ? "Answer Writing"

                : task.type ===
                  TASK_TYPES.REVISION
                  ? "Revision Session"

                : "Unknown"
              ),

            revisionStage:
              revision?.revisionStage ||
              null,

            isRevision:
              task.type ===
              TASK_TYPES.REVISION,

            isStudy:
              task.type ===
              TASK_TYPES.STUDY,

            isPractice:
              [
                TASK_TYPES.PYQ,

                TASK_TYPES.MCQ,

                TASK_TYPES
                  .ANSWER_WRITING,
              ].includes(
                task.type
              ),

            isRecovery:
              task.isRecoveryTask ||
              false,
          };
        }
      )
    );

  /*
   --------------------------
   SORT TASKS
   --------------------------
  */

  enrichedTasks.sort(
    (a, b) => {
      /*
       --------------------------
       PRIMARY:
       SEQUENTIAL TASK ORDER
       --------------------------
      */

      const orderDiff =
        (a.orderIndex || 0) -
        (b.orderIndex || 0);

      if (orderDiff !== 0) {
        return orderDiff;
      }

      /*
       --------------------------
       REVISION PRIORITY
       --------------------------
      */

      if (
        a.isRevision &&
        b.isRevision
      ) {
        return (
          getRevisionPriority(
            a.revisionStage
          ) -
          getRevisionPriority(
            b.revisionStage
          )
        );
      }

      /*
       --------------------------
       STUDY BEFORE OTHERS
       --------------------------
      */

      if (
        a.isStudy &&
        !b.isStudy
      ) {
        return -1;
      }

      if (
        !a.isStudy &&
        b.isStudy
      ) {
        return 1;
      }

      return 0;
    }
  );

  /*
   --------------------------
   GROUP TASKS
   --------------------------
  */

  const groupedTasks = {
    gsTasks:
      enrichedTasks.filter(
        (task) =>
          task.slotType ===
          SLOT_TYPES.GS
      ),

    optionalTasks:
      enrichedTasks.filter(
        (task) =>
          task.slotType ===
          SLOT_TYPES.OPTIONAL
      ),

    revisionTasks:
      enrichedTasks.filter(
        (task) =>
          task.slotType ===
          SLOT_TYPES.REVISION
      ),

    practiceTasks:
      enrichedTasks.filter(
        (task) =>
          task.slotType ===
          SLOT_TYPES.PRACTICE
      ),
  };

  return groupedTasks;
}