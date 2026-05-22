import { db }
from "../../database/dexie";

import {
  calculateSyllabusMetrics,
} from "./calculateSyllabusMetrics";

export async function getSubjectAnalytics(
  subjectId
) {
  /*
   --------------------------
   FETCH TOPICS
   --------------------------
  */

  const topics =
    await db.topics
      .where("subjectId")
      .equals(subjectId)
      .toArray();

  /*
   --------------------------
   FETCH SUBTOPICS
   --------------------------
  */

  const subtopics =
    await db.subtopics
      .where("subjectId")
      .equals(subjectId)
      .toArray();

  /*
   --------------------------
   COMPLETION METRICS
   --------------------------
  */

  const completedTopics =
    topics.filter(
      (topic) =>
        topic.status ===
        "COMPLETED"
    ).length;

  const completedSubtopics =
    subtopics.filter(
      (subtopic) =>
        subtopic.status ===
        "COMPLETED"
    ).length;

  const completionProgress =
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
    topics.length === 0
      ? 0
      : Math.round(
          topics.reduce(
            (sum, topic) =>
              sum +
              (
                topic.confidence ||
                60
              ),
            0
          ) / topics.length
        );

  /*
   --------------------------
   WEAK TOPICS
   --------------------------
  */

  const weakTopics =
    await db.weak_topics
      .filter(
        (topic) =>
          topic.subjectId ===
          subjectId
      )
      .toArray();

  const weakTopicsCount =
    weakTopics.length;

  /*
   --------------------------
   REVISIONS
   --------------------------
  */

  const revisions =
    await db.revisions
      .filter(
        (revision) =>
          revision.subjectId ===
          subjectId
      )
      .toArray();

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
      completionProgress,
      confidenceScore,
      missedRevisionCount
    );

  /*
   --------------------------
   HEALTH SCORE
   --------------------------
  */

  const healthScore =
    await calculateSyllabusMetrics.computeSubjectHealth(
      subjectId
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
            5
      )
    );

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
            revisions.filter(
              (
                revision
              ) =>
                revision.status ===
                "COMPLETED"
            ).length /
            revisions.length
          ) * 100
        );

  /*
   --------------------------
   SUBJECT STATE
   --------------------------
  */

  let intelligenceState =
    "NORMAL";

  if (
    healthScore < 40
  ) {
    intelligenceState =
      "CRITICAL";
  } else if (
    weakTopicsCount >= 5
  ) {
    intelligenceState =
      "WEAK";
  } else if (
    effectiveProgress >=
      75 &&
    healthScore >= 70
  ) {
    intelligenceState =
      "STRONG";
  }

  return {
    totalTopics:
      topics.length,

    completedTopics,

    totalSubtopics:
      subtopics.length,

    completedSubtopics,

    completionProgress,

    confidenceScore,

    effectiveProgress,

    healthScore,

    retentionScore,

    revisionHealth,

    weakTopicsCount,

    missedRevisionCount,

    intelligenceState,
  };
}