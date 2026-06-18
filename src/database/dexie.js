// src/database/dexie.js
import Dexie from "dexie";

export const db = new Dexie("intelliprep_database");

// Your exact schema table keys configuration mappings
const databaseStores = {
  users: 'id,email,role',
  onboarding_config: 'userId,completed,attemptYear,dailyStudyTarget,optionalSubject',
  subjects: 'id,type,paper,name,order',
  topics: 'id,subjectId,name,estimatedMinutes,pyqFrequency,currentRelevance,status',
  subtopics: 'id,subjectId,topicId,paper,type,name,estimatedMinutes,difficulty,status',
  subtopic_progress: 'id,subtopicId,totalMinutes,completedMinutes,remainingMinutes,status,completedAt',
  schedule_tasks: 'id,userId,subjectId,topicId,subtopicId,revisionId,type,scheduledDate,status,intensityMode,generationType,sourceType,priorityScore,carryForwardCount,recoveryInjectedAt,orderIndex,isRecoveryTask,originalScheduledDate,completedAt,createdAt,[userId+scheduledDate],[scheduledDate+status]',
  revisions: 'id,userId,subjectId,topicId,subtopicId,sourceTaskId,linkedScheduleTaskId,revisionStage,dueDate,completedAt,recallQuality,memoryState,intervalDays,nextRevisionDate,revisionCount,status,createdAt,[userId+dueDate+status]',
  mains_tests: 'id,userId,sourceType,subjectId,topicId,maxMarks,marksObtained,wordCountAllowed,wordCountDone,timeTaken,*shortcomings,createdAt,[userId+createdAt]',
  pyqs: 'id,year,paper,type,subjectId,topicId,subtopicId,difficulty,*keywords,*linkedCurrentAffairs,*linkedWeakTopics',
  current_affairs: 'id,title,summary,source,date,paperTag,subjectTag,topicTag,subtopicTag,importanceScore,*issueEvolutionIds,createdBy,createdAt,[subjectTag+date],[paperTag+date]',
  topic_intelligence: 'id,userId,topicId,subjectId,completionScore,confidenceScore,retentionScore,effectiveProgress,importanceScore,healthScore,decayRisk,decayRate,weakTopicCount,revisionMissCount,lastRevisedAt,nextReviewAt,intelligenceState,updatedAt,[userId+topicId],[userId+subjectId],[userId+importanceScore],[userId+effectiveProgress]',
  subject_intelligence: 'id,userId,subjectId,coverageScore,confidenceScore,retentionScore,weakTopicDensity,revisionHealth,effectiveProgress,healthScore,stabilityState,updatedAt,[userId+subjectId],[userId+healthScore]',
  reflections: 'id,userId,date,energyLevel,focusQuality,confidenceScore,*distractions,[userId+date]',
  sync_queue: 'id,status,tableName,recordId,createdAt',

  // Track 1: Topic Wise MCQ Practice Registry
  topic_test_prelims: 'id,userId,subjectId,topicId,createdAt',
  
  // Track 2: Coaching Mock Simulator Test Registry
  coaching_test_prelims: 'id,userId,coachingName,testName,testType,createdAt',
  
  // Track 3: Topic Wise PYQ Practice Registry
  topic_pyq_prelims: 'id,userId,subjectId,topicId,createdAt',

  // Add this to your existing Dexie database tables configuration setup:
mains_log_marks: "id, userId, questionId, timestamp",
  
  // Track 4: Granular Error-Aware Core Weak Topic Engine [source: 1]
  weak_topics: 'id,userId,subjectId,topicId,state,[userId+topicId]'

};

db.version(9).stores(databaseStores);

/*
|--------------------------------------------------------------------------
| CENTRAL BULLETPROOF DEFERRING SYNCHRONIZATION HOOK SYSTEMS
|--------------------------------------------------------------------------
*/

/**
 * Places mutation tasks into the sync_queue table out-of-band.
 */
const enqueueSyncMutation = (tableName, recordId, operation) => {
  if (tableName === "sync_queue") return;

  db.sync_queue.put({
    id: `${tableName}_${recordId}`,
    tableName,
    recordId,
    operation,
    createdAt: Date.now(),
    status: "PENDING"
  }).catch(err => {
    // Catch structural database closures gracefully during rapid route testing
    if (!err.message?.includes("Database is closing")) {
      console.error(`[Sync Hook Error] Failed logging mutation for ${tableName}:`, err);
    }
  });
};

// Bind active listeners explicitly across all mapped stores to intercept direct statements
Object.keys(databaseStores).forEach((tableName) => {
  if (tableName === "sync_queue") return;

  const targetTable = db[tableName];
  if (!targetTable) return;

  // 1. Creation Interceptor (Traps .add, .put, .bulkAdd, and .bulkPut operations natively)
  targetTable.hook('creating', function (primKey, obj) {
    const finalKey = primKey || obj.id || obj.userId;
    if (finalKey) {
      // queueMicrotask pushes the execution out of the current call stack, making bulk operations bulletproof
      queueMicrotask(() => enqueueSyncMutation(tableName, finalKey, "PUT"));
    }
  });

  // 2. Update Interceptor (Traps direct object modifications via .update)
  targetTable.hook('updating', function (modifications, primKey, obj) {
    const finalKey = primKey || (obj ? (obj.id || obj.userId) : null);
    if (finalKey) {
      queueMicrotask(() => enqueueSyncMutation(tableName, finalKey, "PUT"));
    }
  });

  // 3. Deletion Interceptor (Traps items removed via .delete or .bulkDelete)
  targetTable.hook('deleting', function (primKey) {
    if (primKey) {
      queueMicrotask(() => enqueueSyncMutation(tableName, primKey, "DELETE"));
    }
  });
});

if (typeof window !== "undefined") {
  window.db = db;
}