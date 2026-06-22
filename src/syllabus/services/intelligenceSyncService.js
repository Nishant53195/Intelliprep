// src/syllabus/services/intelligenceSyncService.js
import { db } from "../../database/dexie";
import { getTopicIntelligence } from "./topicIntelligenceEngine";
import { getSubjectAnalytics } from "./subjectAnalyticsEngine";

/*
|--------------------------------------------------------------------------
| TOPIC INTELLIGENCE SYNC
|--------------------------------------------------------------------------
*/
export async function syncTopicIntelligence(topicId, userId = "local_user") {
  // FIXED: Forward the true userId down into the engine to look up the correct row
  const intelligence = await getTopicIntelligence(topicId, userId); 
  if (!intelligence) return null;

  const existing = await db.topic_intelligence
    .where("[userId+topicId]")
    .equals([userId, topicId])
    .first();

  const payload = {
    ...intelligence,
    userId,
    topicId,
    updatedAt: new Date(),
  };

  if (existing) {
    await db.topic_intelligence.update(existing.id, payload);
  } else {
    await db.topic_intelligence.add({
      id: crypto.randomUUID(),
      ...payload,
    });
  }

  await syncSubjectIntelligence(intelligence.subjectId, userId);

  return intelligence;
}

/*
|--------------------------------------------------------------------------
| SUBJECT INTELLIGENCE SYNC
|--------------------------------------------------------------------------
*/
export async function syncSubjectIntelligence(subjectId, userId = "local_user") {
  const analytics = await getSubjectAnalytics(subjectId);

  const existing = await db.subject_intelligence
    .where("[userId+subjectId]")
    .equals([userId, subjectId])
    .first();

  const payload = {
    userId,
    subjectId,
    coverageScore: analytics.completionProgress,
    confidenceScore: analytics.confidenceScore,
    retentionScore: analytics.retentionScore,
    weakTopicDensity: analytics.weakTopicsCount,
    revisionHealth: analytics.revisionHealth,
    effectiveProgress: analytics.effectiveProgress,
    healthScore: analytics.healthScore,
    stabilityState: analytics.intelligenceState,
    updatedAt: new Date(),
  };

  if (existing) {
    await db.subject_intelligence.update(existing.id, payload);
  } else {
    await db.subject_intelligence.add({
      id: crypto.randomUUID(),
      ...payload,
    });
  }

  return payload;
}