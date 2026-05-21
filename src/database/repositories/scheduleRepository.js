import dayjs from "dayjs";

import {db} from "../dexie";

import {
  TASK_TYPES,
} from "../../constants/scheduler";

export async function saveTasks(
  tasks = []
) {
  console.log(
    "SAVING TASKS",
    tasks
  );

  return await db.schedule_tasks
    .bulkPut(tasks);
}

export async function getTasksByDate(
  date
) {
  return await db.schedule_tasks
    .where("scheduledDate")
    .equals(date)
    .sortBy("orderIndex");
}

export async function getAllTasks() {
  const tasks =
    await db.schedule_tasks
      .toArray();

  return tasks.sort(
    (a, b) => {
      if (
        a.scheduledDate ===
        b.scheduledDate
      ) {
        return (
          a.orderIndex -
          b.orderIndex
        );
      }

      return (
        new Date(
          a.scheduledDate
        ) -
        new Date(
          b.scheduledDate
        )
      );
    }
  );
}

export async function updateTask(
  id,
  updates
) {
  return db.schedule_tasks.update(
    id,
    updates
  );
}

export async function getPendingTasks() {
  return await db.schedule_tasks
    .where("status")
    .equals("PENDING")
    .toArray();
}

export async function getMissedTasks() {
  const today =
    dayjs().format(
      "YYYY-MM-DD"
    );

  return await db.schedule_tasks
    .filter(
      (task) =>
        task.status ===
          "PENDING" &&
        task.scheduledDate <
          today
    )
    .toArray();
}

export async function bulkUpdateTasks(
  tasks = []
) {
  return await db.schedule_tasks
    .bulkPut(tasks);
}

export async function deleteTasksAfterDate(
  date
) {
  // IMPORTANT:
  // Revision tasks must survive
  // schedule regeneration.
  //
  // ONLY study execution tasks
  // should be regenerated.
  const futureTasks =
    await db.schedule_tasks
      .filter(
        (task) =>
          task.scheduledDate >=
          date
      )
      .toArray();

  const deletableTasks =
    futureTasks.filter(
      (task) =>
        task.type !==
        TASK_TYPES.REVISION
    );

  const ids =
    deletableTasks.map(
      (task) => task.id
    );

  return await db.schedule_tasks
    .bulkDelete(ids);
}

export async function getMissedTasksForRecovery() {
  return await db.schedule_tasks
    .where("status")
    .equals("MISSED")
    .toArray();
}

export async function completeTask(
  taskId
) {
  return await db.schedule_tasks
    .update(taskId, {
      completed: true,
      status : "COMPLETED",

      completedAt:
        new Date(),
    });
}

export async function getTasksBySubtopic(
  subtopicId
) {
  return await db.schedule_tasks
    .where("subtopicId")
    .equals(subtopicId)
    .toArray();
}