import dayjs from "dayjs";
import { nanoid } from "nanoid";

import {
  TASK_STATUS,
  TASK_GENERATION_TYPES,
  TASK_SOURCE_TYPES,
  INTENSITY_MODES,
} from "../../constants/scheduler";

export function buildTaskMetadata(task, index = 0) {
  return {
    id: nanoid(),

    status: TASK_STATUS.PENDING,

    createdAt: dayjs().toISOString(),

    completedAt: null,

    carryForwardCount: 0,

    generationType:
      TASK_GENERATION_TYPES.INITIAL,

    sourceType:
      TASK_SOURCE_TYPES.SYLLABUS,

    priorityScore: 1,

    orderIndex: index,

    isRecoveryTask: false,

    originalScheduledDate:
      task.scheduledDate,

    intensityMode:
      INTENSITY_MODES.NORMAL,

    ...task,
  };
}