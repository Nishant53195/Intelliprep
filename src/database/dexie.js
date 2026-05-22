// src/database/dexie.js

import Dexie from "dexie";

export const db = new Dexie("intelliprep_database");

/*
|--------------------------------------------------------------------------
| VERSION 3
|--------------------------------------------------------------------------
| Intelligence Layer Expansion
| - Effective Progress Engine
| - Subject Health Engine
| - Confidence + Retention System
| - Scheduler Intelligence Foundation
|--------------------------------------------------------------------------
*/

db.version(3).stores({
  /*
  |--------------------------------------------------------------------------
  | USERS
  |--------------------------------------------------------------------------
  */
  users: `
    id,
    email,
    role
  `,

  /*
  |--------------------------------------------------------------------------
  | ONBOARDING
  |--------------------------------------------------------------------------
  */
  onboarding_config: `
    id,
    userId,
    completed,
    attemptYear,
    dailyStudyTarget,
    optionalSubject
  `,

  /*
  |--------------------------------------------------------------------------
  | SUBJECTS
  |--------------------------------------------------------------------------
  */
  subjects: `
    id,
    type,
    paper,
    name,
    order
  `,

  /*
  |--------------------------------------------------------------------------
  | TOPICS
  |--------------------------------------------------------------------------
  | Static syllabus metadata only
  |--------------------------------------------------------------------------
  */
  topics: `
    id,
    subjectId,
    name,
    estimatedMinutes,
    pyqFrequency,
    currentRelevance,
    status
  `,

  /*
  |--------------------------------------------------------------------------
  | SUBTOPICS
  |--------------------------------------------------------------------------
  */
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

  /*
  |--------------------------------------------------------------------------
  | SUBTOPIC PROGRESS
  |--------------------------------------------------------------------------
  */
  subtopic_progress: `
    id,
    subtopicId,
    totalMinutes,
    completedMinutes,
    remainingMinutes,
    status
  `,

  /*
  |--------------------------------------------------------------------------
  | TOPIC INTELLIGENCE
  |--------------------------------------------------------------------------
  | Core Intelligence Engine
  |--------------------------------------------------------------------------
  */
  topic_intelligence: `
    id,

    userId,
    topicId,
    subjectId,

    completionScore,
    confidenceScore,
    retentionScore,

    effectiveProgress,

    importanceScore,
    healthScore,

    decayRisk,
    decayRate,

    weakTopicCount,
    revisionMissCount,

    lastRevisedAt,
    nextReviewAt,

    intelligenceState,

    updatedAt,

    [userId+topicId],
    [userId+subjectId],
    [userId+importanceScore],
    [userId+effectiveProgress]
  `,

  /*
  |--------------------------------------------------------------------------
  | SUBJECT INTELLIGENCE
  |--------------------------------------------------------------------------
  */
  subject_intelligence: `
    id,

    userId,
    subjectId,

    coverageScore,
    confidenceScore,
    retentionScore,

    weakTopicDensity,
    revisionHealth,

    effectiveProgress,
    healthScore,

    stabilityState,

    updatedAt,

    [userId+subjectId],
    [userId+healthScore]
  `,

  /*
  |--------------------------------------------------------------------------
  | USER PERFORMANCE PROFILE
  |--------------------------------------------------------------------------
  | Scheduler + Burnout Engine Foundation
  |--------------------------------------------------------------------------
  */
  user_performance_profile: `
    id,

    userId,

    avgCompletionRate,
    avgStudyMinutes,

    consistencyScore,

    fatigueRisk,

    strongestDay,
    weakestDay,

    lastCalculatedAt
  `,

  /*
  |--------------------------------------------------------------------------
  | SCHEDULE TASKS
  |--------------------------------------------------------------------------
  */
  schedule_tasks: `
    id,

    userId,

    subjectId,
    topicId,
    subtopicId,

    revisionId,

    type,

    scheduledDate,

    [userId+scheduledDate],
    [scheduledDate+status],

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

  /*
  |--------------------------------------------------------------------------
  | REVISIONS
  |--------------------------------------------------------------------------
  */
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

    [userId+dueDate+status],

    completedAt,

    recallQuality,
    memoryState,

    intervalDays,
    nextRevisionDate,

    revisionCount,

    status,

    createdAt
  `,

  /*
  |--------------------------------------------------------------------------
  | WEAK TOPICS
  |--------------------------------------------------------------------------
  */
  weak_topics: `
    id,

    userId,

    subjectId,
    topicId,

    confidence,

    decayRate,

    lastReviewedAt,
    nextReviewAt,

    mistakeCount,

    weaknessType,

    state,

    [userId+topicId],
    [userId+state]
  `,

  /*
  |--------------------------------------------------------------------------
  | REFLECTIONS
  |--------------------------------------------------------------------------
  */
  reflections: `
    id,

    userId,

    date,

    energyLevel,
    focusQuality,

    confidenceScore,

    distractions,

    [userId+date]
  `,

  /*
  |--------------------------------------------------------------------------
  | PRELIMS TESTS
  |--------------------------------------------------------------------------
  */
  prelims_tests: `
    id,

    userId,

    type,

    subjectId,
    topicId,

    score,
    accuracy,

    createdAt
  `,

  /*
  |--------------------------------------------------------------------------
  | MAINS TESTS
  |--------------------------------------------------------------------------
  */
  mains_tests: `
    id,

    userId,

    subjectId,
    topicId,

    maxMarks,
    marksObtained,

    timeTaken,

    createdAt
  `,

  /*
  |--------------------------------------------------------------------------
  | PYQS
  |--------------------------------------------------------------------------
  */
  pyqs: `
    id,

    year,

    paper,
    type,

    subjectId,
    topicId,
    subtopicId,

    keywords
  `,

  /*
  |--------------------------------------------------------------------------
  | CURRENT AFFAIRS
  |--------------------------------------------------------------------------
  */
  current_affairs: `
    id,

    date,

    paperTag,
    subjectTag,
    topicTag,

    importanceScore
  `,

  /*
  |--------------------------------------------------------------------------
  | SYNC QUEUE
  |--------------------------------------------------------------------------
  */
  sync_queue: `
    id,
    status,
    createdAt
  `,
});