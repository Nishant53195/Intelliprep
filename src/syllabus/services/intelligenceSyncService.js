import { db }
from "../../database/dexie";

import {
  getTopicIntelligence,
} from "./topicIntelligenceEngine";

import {
  getSubjectAnalytics,
} from "./subjectAnalyticsEngine";

/*
|--------------------------------------------------------------------------
| TOPIC INTELLIGENCE SYNC
|--------------------------------------------------------------------------
*/

export async function syncTopicIntelligence(
  topicId
) {
  /*
   --------------------------
   CALCULATE
   --------------------------
  */

  const intelligence =
    await getTopicIntelligence(
      topicId
    );

  if (!intelligence) {
    return null;
  }

  /*
   --------------------------
   EXISTING RECORD
   --------------------------
  */

  const existing =
    await db.topic_intelligence
      .where("[userId+topicId]")
      .equals([
        "local_user",
        topicId,
      ])
      .first();

  /*
   --------------------------
   UPSERT
   --------------------------
  */

  const payload = {
    ...intelligence,

    userId:
      "local_user",

    topicId,

    updatedAt:
      new Date(),
  };

  if (existing) {
    await db.topic_intelligence.update(
      existing.id,
      payload
    );
  } else {
    await db.topic_intelligence.add(
      {
        id:
          crypto.randomUUID(),

        ...payload,
      }
    );
  }

  /*
   --------------------------
   SYNC SUBJECT
   --------------------------
  */

  await syncSubjectIntelligence(
    intelligence.subjectId
  );

  return intelligence;
}

/*
|--------------------------------------------------------------------------
| SUBJECT INTELLIGENCE SYNC
|--------------------------------------------------------------------------
*/

export async function syncSubjectIntelligence(
  subjectId
) {
  /*
   --------------------------
   CALCULATE
   --------------------------
  */

  const analytics =
    await getSubjectAnalytics(
      subjectId
    );

  /*
   --------------------------
   EXISTING
   --------------------------
  */

  const existing =
    await db.subject_intelligence
      .where("[userId+subjectId]")
      .equals([
        "local_user",
        subjectId,
      ])
      .first();

  /*
   --------------------------
   PAYLOAD
   --------------------------
  */

  const payload = {
    userId:
      "local_user",

    subjectId,

    coverageScore:
      analytics.completionProgress,

    confidenceScore:
      analytics.confidenceScore,

    retentionScore:
      analytics.retentionScore,

    weakTopicDensity:
      analytics.weakTopicsCount,

    revisionHealth:
      analytics.revisionHealth,

    effectiveProgress:
      analytics.effectiveProgress,

    healthScore:
      analytics.healthScore,

    stabilityState:
      analytics.intelligenceState,

    updatedAt:
      new Date(),
  };

  /*
   --------------------------
   UPSERT
   --------------------------
  */

  if (existing) {
    await db.subject_intelligence.update(
      existing.id,
      payload
    );
  } else {
    await db.subject_intelligence.add(
      {
        id:
          crypto.randomUUID(),

        ...payload,
      }
    );
  }

  return payload;
}