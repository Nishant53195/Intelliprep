import dayjs from "dayjs";

import {
  TASK_TYPES,
} from "../../constants/scheduler";

export default function practiceTaskInjector({
  currentDate,

  topicCompleted,
}) {
  const tasks = [];

  const dayNumber =
    dayjs(currentDate).day();

  const isAlternateDay =
    dayNumber % 2 === 0;

  const isThirdDay =
    dayNumber % 3 === 0;

  if (topicCompleted) {
    tasks.push({
      type: TASK_TYPES.PYQ,
    });
  } else if (
    isAlternateDay
  ) {
    tasks.push({
      type: TASK_TYPES.MCQ,
    });
  }

  if (isThirdDay) {
    tasks.push({
      type:
        TASK_TYPES.ANSWER_WRITING,
    });
  }

  return tasks;
}