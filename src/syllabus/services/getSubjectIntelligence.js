import { db } from "../../database/dexie";

import { calculateSyllabusMetrics }
from "./calculateSyllabusMetrics";

export async function getSubjectIntelligence(
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
   COMPLETION
   --------------------------
  */

  const completedTopics =
    topics.filter(
      (topic) =>
        topic.status ===
        "COMPLETED"
    ).length;

  const completionProgress =
    topics.length === 0
      ? 0
      : Math.round(
          (
            completedTopics /
            topics.length
          ) * 100
        );

  /*
   --------------------------
   CONFIDENCE
   --------------------------
  */

  const averageConfidence =
    topics.length === 0
      ? 0
      : Math.round(
          topics.reduce(
            (sum, topic) =>
              sum +
              (topic.confidence || 60),
            0
          ) / topics.length
        );

  /*
   --------------------------
   WEAK TOPICS
   --------------------------
  */

  const weakTopicsCount =
    await db.weak_topics
      .where("subjectId")
      .equals(subjectId)
      .count();

  /*
   --------------------------
   MISSED REVISIONS
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
      averageConfidence,
      missedRevisionCount
    );

  /*
   --------------------------
   SUBJECT HEALTH
   --------------------------
  */

  const healthScore =
    await calculateSyllabusMetrics.computeSubjectHealth(
      subjectId
    );

  return {
    completionProgress,

    confidenceScore:
      averageConfidence,

    effectiveProgress,

    healthScore,

    weakTopicsCount,
  };
}