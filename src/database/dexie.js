// src/database/dexie.js

import Dexie from "dexie";

export const db = new Dexie("intelliprep_database");

db.version(6).stores({
  /*
  |--------------------------------------------------------------------------
  | CORE AUTH & CONFIG STORES (Cleaned of all structural spaces/newlines)
  |--------------------------------------------------------------------------
  */
  users: 'id,email,role',
  
  onboarding_config: 'userId,completed,attemptYear,dailyStudyTarget,optionalSubject',

  /*
  |--------------------------------------------------------------------------
  | SYLLABUS DATA METADATA STORES
  |--------------------------------------------------------------------------
  */
  subjects: 'id,type,paper,name,order',
  
  topics: 'id,subjectId,name,estimatedMinutes,pyqFrequency,currentRelevance,status',
  
  subtopics: 'id,subjectId,topicId,paper,type,name,estimatedMinutes,difficulty,status',
  
  subtopic_progress: 'id,subtopicId,totalMinutes,completedMinutes,remainingMinutes,status,completedAt',

  /*
  |--------------------------------------------------------------------------
  | ENGINE TRACKING SYSTEMS
  |--------------------------------------------------------------------------
  */
  schedule_tasks: 'id,userId,subjectId,topicId,subtopicId,revisionId,type,scheduledDate,status,intensityMode,generationType,sourceType,priorityScore,carryForwardCount,recoveryInjectedAt,orderIndex,isRecoveryTask,originalScheduledDate,completedAt,createdAt,[userId+scheduledDate],[scheduledDate+status]',
  
  revisions: 'id,userId,subjectId,topicId,subtopicId,sourceTaskId,linkedScheduleTaskId,revisionStage,dueDate,completedAt,recallQuality,memoryState,intervalDays,nextRevisionDate,revisionCount,status,createdAt,[userId+dueDate+status]',

  /*
  |--------------------------------------------------------------------------
  | PERFORMANCE TESTING STORES
  |--------------------------------------------------------------------------
  */
  prelims_tests: 'id,userId,testMode,type,subjectId,topicId,subtopicId,totalQuestions,attemptedCount,correctCount,wrongCount,skippedCount,score,accuracy,completionTime,*taggedWrongTopics,*errorTypes,createdAt,[userId+createdAt],[userId+testMode]',
  
  mains_tests: 'id,userId,sourceType,subjectId,topicId,maxMarks,marksObtained,wordCountAllowed,wordCountDone,timeTaken,*shortcomings,createdAt,[userId+createdAt]',

  /*
  |--------------------------------------------------------------------------
  | KNOWLEDGE GRAPH COMPREHENSION STORES
  |--------------------------------------------------------------------------
  */
  pyqs: 'id,year,paper,type,subjectId,topicId,subtopicId,difficulty,*keywords,*linkedCurrentAffairs,*linkedWeakTopics',
  
  current_affairs: 'id,title,summary,source,date,paperTag,subjectTag,topicTag,subtopicTag,importanceScore,*issueEvolutionIds,createdBy,createdAt,[subjectTag+date],[paperTag+date]',

  /*
  |--------------------------------------------------------------------------
  | REAL-TIME ANALYTICAL UTILITY LAYERS
  |--------------------------------------------------------------------------
  */
  topic_intelligence: 'id,userId,topicId,subjectId,completionScore,confidenceScore,retentionScore,effectiveProgress,importanceScore,healthScore,decayRisk,decayRate,weakTopicCount,revisionMissCount,lastRevisedAt,nextReviewAt,intelligenceState,updatedAt,[userId+topicId],[userId+subjectId],[userId+importanceScore],[userId+effectiveProgress]',
  
  subject_intelligence: 'id,userId,subjectId,coverageScore,confidenceScore,retentionScore,weakTopicDensity,revisionHealth,effectiveProgress,healthScore,stabilityState,updatedAt,[userId+subjectId],[userId+healthScore]',
  
  weak_topics: 'id,userId,subjectId,topicId,confidence,decayRate,lastReviewedAt,nextReviewAt,mistakeCount,*weaknessType,state,*sourceHistory,[userId+topicId],[userId+state]',
  
  user_performance_profile: 'id,userId,avgCompletionRate,avgStudyMinutes,consistencyScore,fatigueRisk,strongestDay,weakestDay,lastCalculatedAt',
  
  reflections: 'id,userId,date,energyLevel,focusQuality,confidenceScore,*distractions,[userId+date]',
  
  sync_queue: 'id,status,createdAt'
});