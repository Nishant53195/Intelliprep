import {
  fetchTodayTasks,
} from "./getTodayTasks";

import useScheduleStore
from "../store/scheduleStore";

export async function refreshTodayTasks() {
  const groupedTasks =
    await fetchTodayTasks();

  useScheduleStore
    .getState()
    .setTodayTasks(
      groupedTasks
    );
}