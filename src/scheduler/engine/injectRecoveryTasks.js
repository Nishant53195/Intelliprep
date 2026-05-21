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
        !task.completed &&
        (
          task.status ===
            "MISSED" ||

          dayjs(
            task.scheduledDate
          ).isBefore(
            today,
            "day"
          )
        ) &&
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
        b.recoveryScore -
        a.recoveryScore
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