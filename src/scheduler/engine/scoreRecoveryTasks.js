import dayjs from "dayjs";

export function scoreRecoveryTasks(
  tasks = []
) {
  return tasks.map((task) => {
    let score = 0;

    // Older missed tasks
    const daysMissed =
      dayjs().diff(
        task.scheduledDate,
        "day"
      );

    score += daysMissed * 5;

    // Carry-forward burden
    score +=
      (task.carryForwardCount ||
        0) * 10;

    // Existing priority
    score +=
      task.priorityScore || 0;

    return {
      ...task,

      recoveryScore:
        score,
    };
  });
}