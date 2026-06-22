// src/syllabus/services/topicIntelligenceEngine.js
import { db } from "../../database/dexie";

/**
 * Central topic intelligence parameter processor
 */
export async function getTopicIntelligence(topicId, userId = "local_user") {
  const topic = await db.topics.get(topicId);
  if (!topic) return null;

  const subtopics = await db.subtopics.where("topicId").equals(topicId).toArray();

  // 1. Calculate absolute completion score percentage
  const completedSubtopics = subtopics.filter((subtopic) => subtopic.status === "COMPLETED").length;
  const completionScore = subtopics.length === 0 ? 0 : Math.round((completedSubtopics / subtopics.length) * 100);

  // 2. FIXED: Fetch what was saved by your task hook services to preserve revision increments
  const existingIntel = await db.topic_intelligence
    .where("[userId+topicId]")
    .equals([userId, topicId])
    .first();

  // If a record exists, preserve its current score; otherwise default to 0
  let confidenceScore = existingIntel ? (existingIntel.confidenceScore || 0) : 0;

  return {
    topicId,
    subjectId: topic.subjectId,
    completionScore,
    confidenceScore, // Dynamically retained across sync sessions
    updatedAt: new Date(),
  };
}