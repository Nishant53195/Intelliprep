import dayjs from "dayjs";

import {
  scoreRecoveryTasks,
} from "./scoreRecoveryTasks";

export function injectRecoveryTasks({
  todayTasks = [],

  missedTasks = [],

  recoveryLimit = 2,
}) {
  const today =
    dayjs().format(
      "YYYY-MM-DD"
    );

  /*
   --------------------------
   FILTER ELIGIBLE TASKS
   --------------------------
  */

  const eligibleRecoveryTasks =
    missedTasks.filter(
      (task) =>
        // Ensure the task isn't already completed or closed out
        !task.completed &&
        task.status !== "COMPLETED" &&
        task.status !== "CLOSED" &&
        task.status !== "closed" &&
        (
          // Match tasks that were explicitly marked as missed by ending the day
          task.status?.toUpperCase() === "MISSED" ||

          // Match tasks whose scheduled date is prior to today
          dayjs(
            task.scheduledDate
          ).isBefore(
            today,
            "day"
          )
        ) &&
        // Ensure it hasn't already been injected during a previous cycle today
        !task.recoveryInjectedAt
    );

  /*
   --------------------------
   SCORE RECOVERY TASKS
   --------------------------
  */

  const scoredRecoveryTasks =
    scoreRecoveryTasks(
      eligibleRecoveryTasks
    );

  /*
   --------------------------
   PRIORITY SORT
   --------------------------
  */

  const prioritizedRecoveryTasks =
    scoredRecoveryTasks.sort(
      (a, b) =>
        // Fallback to 0 to prevent NaN calculation errors if scoring is missing properties
        (b.recoveryScore || 0) -
        (a.recoveryScore || 0)
    );

  /*
   --------------------------
   SELECT RECOVERY TASKS
   --------------------------
  */

  const recoveryTasks =
    prioritizedRecoveryTasks
      .slice(
        0,
        recoveryLimit
      )
      .map((task) => ({
        ...task,

        /*
         ----------------------
         MOVE TO TODAY
         ----------------------
        */

        scheduledDate:
          today,

        /*
         ----------------------
         RECOVERY FLAGS
         ----------------------
        */

        isRecoveryTask:
          true,

        recoveryInjectedAt:
          dayjs().toISOString(),

        /*
         ----------------------
         RESET STATUS
         ----------------------
        */

        status:
          "PENDING",
      }));

  /*
   --------------------------
   MERGE TASKS
   --------------------------
  */

  return [
    ...recoveryTasks,

    ...todayTasks,
  ];
}