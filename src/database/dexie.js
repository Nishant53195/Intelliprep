import Dexie from "dexie";

export const db = new Dexie("intelliprep_database");

db.version(1).stores({
  users: "id,email",

  onboarding_config:  "id,userId,completed,attemptYear,optionalSubject",

   subjects: `
    id,
    type,
    paper,
    name,
    order
  `,

  topics: `
    id,
    subjectId,
    name,
    estimatedMinutes,
    importanceScore,
    currentRelevance,
    pyqFrequency,
    healthScore,
    status
  `,

  subtopics: `
  id,
  subjectId,
  topicId,
  paper,
  type,
  name,
  estimatedMinutes,
  difficulty,
  status
`,

subtopic_progress:
  `id, 
  subtopicId,
  totalMinutes, 
  completedMinutes, 
  remainingMinutes, 
  status`,

  schedule_tasks: `
  id,
  userId,
  subjectId,
  topicId,
  subtopicId,
  revisionId,
  type,
  scheduledDate,
  estimatedMinutes,
  actualMinutes,
  status,
  intensityMode,
  generationType,
  sourceType,
  priorityScore,
  carryForwardCount,
  recoveryInjectedAt,    
  orderIndex,
  isRecoveryTask,
  originalScheduledDate,
  completedAt,
  createdAt
`,

 revisions: `
  id,
  userId,

  subjectId,
  topicId,
  subtopicId,

  sourceTaskId,
  linkedScheduleTaskId,

  revisionStage,

  dueDate,
  completedAt,

  recallQuality,
  memoryState,

  intervalDays,
  nextRevisionDate,

  revisionCount,

  status,

  createdAt
`,

  weak_topics: "id,userId,topicId,severity",

  reflections: "id,userId,date",

  prelims_tests: "id,userId,createdAt",

  mains_tests: "id,userId,createdAt",

  pyqs: "id,year,paper",

  current_affairs: "id,date",

  sync_queue: "id,status,createdAt",
});