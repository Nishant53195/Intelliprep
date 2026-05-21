export const TASK_STATUS = {
  PENDING: "PENDING",

  IN_PROGRESS: "IN_PROGRESS",

  COMPLETED: "COMPLETED",

  SKIPPED: "SKIPPED",

  MISSED: "MISSED",
};

export const TASK_TYPES = {
  STUDY: "STUDY",
  REVISION: "REVISION",

  PYQ: "PYQ",
  MCQ: "MCQ",
  ANSWER_WRITING: "ANSWER_WRITING",
};

export const INTENSITY_MODES = {
  LIGHT: "LIGHT",

  NORMAL: "NORMAL",

  HEAVY: "HEAVY",

  RECOVERY: "RECOVERY",
};

export const TASK_GENERATION_TYPES = {
  INITIAL: "INITIAL",

  REGENERATED: "REGENERATED",

  RECOVERY: "RECOVERY",

  REVISION: "REVISION",
};

export const TASK_SOURCE_TYPES = {
  SYLLABUS: "SYLLABUS",

  REVISION: "REVISION",

  WEAK_TOPIC: "WEAK_TOPIC",

  RECOVERY: "RECOVERY",
};

export const DAILY_BUCKET_CONFIG = {
  6: {
    revisionMinutes: 45,
    practiceMinutes: 45,
    optionalWeeklyMinutes: 360,
  },

  7: {
    revisionMinutes: 60,
    practiceMinutes: 60,
    optionalWeeklyMinutes: 420,
  },

  8: {
    revisionMinutes: 60,
    practiceMinutes: 60,
    optionalWeeklyMinutes: 480,
  },
};

export const SLOT_TYPES = {
  GS: "GS",
  OPTIONAL: "OPTIONAL",
  REVISION: "REVISION",
  PRACTICE: "PRACTICE",
};