import { create }
from "zustand";

const useScheduleStore =
  create((set) => ({
    gsTasks: [],

    optionalTasks: [],

    revisionTasks: [],

    practiceTasks: [],

    setTodayTasks:
      (
        groupedTasks
      ) =>
        set({
          gsTasks:
            groupedTasks.gsTasks ||
            [],

          optionalTasks:
            groupedTasks.optionalTasks ||
            [],

          revisionTasks:
            groupedTasks.revisionTasks ||
            [],

          practiceTasks:
            groupedTasks.practiceTasks ||
            [],
        }),
  }));

export default
  useScheduleStore;