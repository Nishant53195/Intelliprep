import { fetchTodayTasks } from "./getTodayTasks";
import useScheduleStore from "../store/scheduleStore";
import { db } from "../../database/dexie";
import { getActiveShiftDateString } from "../engine/generateDailySchedule";

/**
 * Syncs the active daily workflow state back to the global store hook
 * Bound cleanly to evaluate the 5:00 AM shifted calendar index row.
 */
export async function refreshTodayTasks(userId) {
  // If a specific user parameter scope context isn't passed, fall back to default grouping
  if (!userId) {
    const groupedTasks = await fetchTodayTasks();
    useScheduleStore.getState().setTodayTasks(groupedTasks);
    return;
  }

  // Shifted date matching criteria evaluation window string
  const activeShiftDate = getActiveShiftDateString();

  const currentTasks = await db.schedule_tasks
    .where("[userId+scheduledDate]")
    .equals([userId, activeShiftDate])
    .toArray();

  useScheduleStore.getState().setTodayTasks({
    gsTasks: currentTasks.filter((t) => t.type === "gs"),
    optionalTasks: currentTasks.filter((t) => t.type === "optional"),
    revisionTasks: currentTasks.filter((t) => t.type === "revision"),
    practiceTasks: currentTasks.filter((t) => t.type === "practice"),
  });
}