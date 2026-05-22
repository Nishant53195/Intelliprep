import { db }
from "../../database/dexie";

import {
  calculateSyllabusMetrics,
} from "./calculateSyllabusMetrics";

/*
|--------------------------------------------------------------------------
| TOPIC INTELLIGENCE ENGINE
|--------------------------------------------------------------------------
| Central intelligence calculator
|--------------------------------------------------------------------------
*/

export async function getTopicIntelligence(
  topicId
) {
  /*
   --------------------------
   TOPIC
   --------------------------
  */

  const topic =
    await db.topics.get(
      topicId
    );

  if (!topic) {
    return null;
  }

  /*
   --------------------------
   SUBTOPICS
   --------------------------
  */

  const subtopics =
    await db.subtopics
      .where("topicId")
      .equals(topicId)
      .toArray();

  /*
   --------------------------
   COMPLETION
   --------------------------
  */

  const completedSubtopics =
    subtopics.filter(
      (subtopic) =>
        subtopic.status ===
        "COMPLETED"
    ).length;

  const completionScore =
    subtopics.length === 0
      ? 0
      : Math.round(
          (
            completedSubtopics /
            subtopics.length
          ) * 100
        );

  /*
   --------------------------
   CONFIDENCE
   --------------------------
  */

  const confidenceScore =
    topic.confidence ||
    60;

  /*
   --------------------------
   WEAK TOPIC ENTRIES
   --------------------------
  */

  const weakEntries =
    await db.weak_topics
      .filter(
        (entry) =>
          entry.topicId ===
          topicId
      )
      .toArray();

  const weakTopicCount =
    weakEntries.length;

  /*
   --------------------------
   REVISIONS
   --------------------------
  */

  const revisions =
    await db.revisions
      .filter(
        (revision) =>
          revision.topicId ===
          topicId
      )
      .toArray();

  const completedRevisions =
    revisions.filter(
      (revision) =>
        revision.status ===
        "COMPLETED"
    ).length;

  const missedRevisionCount =
    revisions.filter(
      (revision) =>
        revision.status !==
        "COMPLETED"
    ).length;

  /*
   --------------------------
   EFFECTIVE PROGRESS
   --------------------------
  */

  const effectiveProgress =
    calculateSyllabusMetrics.calculateEffectiveTopicProgress(
      completionScore,
      confidenceScore,
      missedRevisionCount
    );

  /*
   --------------------------
   IMPORTANCE SCORE
   --------------------------
  */

  const pyqCount =
    topic.pyqFrequency || 0;

  const currentAffairsCount =
    topic.currentRelevance || 0;

  const revisionFailureCount =
    missedRevisionCount;

  const importanceScore =
    calculateSyllabusMetrics.calculateTopicImportance(
      pyqCount,
      currentAffairsCount,
      weakTopicCount,
      revisionFailureCount
    );

  /*
   --------------------------
   RETENTION SCORE
   --------------------------
  */

  const retentionScore =
    Math.max(
      0,
      Math.round(
        confidenceScore -
          missedRevisionCount *
            7
      )
    );

  /*
   --------------------------
   HEALTH SCORE
   --------------------------
  */

  const healthScore =
    Math.max(
      0,
      Math.round(
        (
          effectiveProgress *
            0.5 +
          retentionScore *
            0.3 +
          confidenceScore *
            0.2
        ) -
          weakTopicCount *
            5
      )
    );

  /*
   --------------------------
   DECAY RISK
   --------------------------
  */

  let decayRisk = 0;

  if (
    confidenceScore <
    40
  ) {
    decayRisk += 35;
  }

  if (
    missedRevisionCount >
    2
  ) {
    decayRisk += 30;
  }

  if (
    weakTopicCount >
    1
  ) {
    decayRisk += 20;
  }

  if (
    completionScore <
    50
  ) {
    decayRisk += 15;
  }

  decayRisk = Math.min(
    100,
    decayRisk
  );

  /*
   --------------------------
   INTELLIGENCE STATE
   --------------------------
  */

  let intelligenceState =
    "NORMAL";

  if (
    decayRisk >= 70
  ) {
    intelligenceState =
      "CRITICAL";
  } else if (
    weakTopicCount >= 3
  ) {
    intelligenceState =
      "WEAK";
  } else if (
    effectiveProgress >=
      80 &&
    healthScore >= 75
  ) {
    intelligenceState =
      "STRONG";
  }

  /*
   --------------------------
   REVISION HEALTH
   --------------------------
  */

  const revisionHealth =
    revisions.length === 0
      ? 100
      : Math.round(
          (
            completedRevisions /
            revisions.length
          ) * 100
        );

  return {
    topicId,

    subjectId:
      topic.subjectId,

    completionScore,

    confidenceScore,

    retentionScore,

    effectiveProgress,

    importanceScore,

    healthScore,

    decayRisk,

    weakTopicCount,

    revisionMissCount:
      missedRevisionCount,

    revisionHealth,

    intelligenceState,

    updatedAt:
      new Date(),
  };
}