import {
  getTopicsBySubject,
} from "../../database/repositories/syllabusRepository";

import {
  db,
} from "../../database/dexie";

export async function getSubjectProgress(
  subjectId
) {
  /*
   --------------------------
   FETCH TOPICS
   --------------------------
  */

  const topics =
    await getTopicsBySubject(
      subjectId
    );

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
   COUNTS
   --------------------------
  */

  const completedSubtopics =
    subtopics.filter(
      (subtopic) =>
        subtopic.status ===
        "COMPLETED"
    ).length;

  const completedTopics =
    topics.filter(
      (topic) =>
        topic.status ===
        "COMPLETED"
    ).length;

  /*
   --------------------------
   PERCENTAGE
   --------------------------
  */

  const progress =
    subtopics.length === 0
      ? 0
      : Math.round(
          (completedSubtopics /
            subtopics.length) *
            100
        );

  return {
    totalTopics:
      topics.length,

    completedTopics,

    totalSubtopics:
      subtopics.length,

    completedSubtopics,

    progress,
  };
}