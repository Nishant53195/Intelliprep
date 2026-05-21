import { db } from "../dexie";

export async function saveSubjects(subjects) {
  await db.subjects.bulkPut(subjects);
}

export async function saveTopics(topics) {
  await db.topics.bulkPut(topics);
}

export async function saveSubtopics(subtopics) {
  await db.subtopics.bulkPut(subtopics);
}

export async function getSubjects() {
  return await db.subjects.toArray();
}

export async function getTopicsBySubject(subjectId) {
  return await db.topics
    .where("subjectId")
    .equals(subjectId)
    .toArray();
}

export async function getSubtopicById(
  subtopicId
) {
  return await db.subtopics.get(
    subtopicId
  );
}

export async function getTopics() {
  return await db.topics.toArray();
}

export async function getSubtopics() {
  return await db.subtopics.toArray();
}

export async function completeSubtopic(
  subtopicId
) {
  return await db.subtopics
    .update(subtopicId, {
      status:
        "COMPLETED",

      completedAt:
        new Date(),
    });
}

export async function completeTopic(
  topicId
) {
  return await db.topics
    .update(topicId, {
      status:
        "COMPLETED",

      completedAt:
        new Date(),
    });
}

export async function getSubtopicsByTopic(
  topicId
) {
  return await db.subtopics
    .where("topicId")
    .equals(topicId)
    .sortBy("order");
}