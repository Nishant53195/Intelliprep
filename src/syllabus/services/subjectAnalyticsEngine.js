import { db } from "../../database/dexie";

export async function getSubjectAnalytics(subjectId) {
  const topics = await db.topics.where("subjectId").equals(subjectId).toArray();
  const subtopics = await db.subtopics.where("subjectId").equals(subjectId).toArray();
  const subtopicIds = subtopics.map(st => st.id);

  // Read direct live progress records from the raw subtopic tracking registry
  const progressRecords = subtopicIds.length > 0 
    ? await db.subtopic_progress.where("subtopicId").anyOf(subtopicIds).toArray()
    : [];

  // Match case-insensitively against both database structural variables
  const completedSubtopicsCount = subtopics.filter(st => {
    const prog = progressRecords.find(p => p.subtopicId === st.id);
    return (st.status && st.status.toUpperCase() === "COMPLETED") || 
           (prog && prog.status && prog.status.toUpperCase() === "COMPLETED");
  }).length;

  const completionProgress = subtopics.length === 0
    ? 0
    : Math.round((completedSubtopicsCount / subtopics.length) * 100);

  const confidenceScore = topics.length === 0 ? 0 : 65;
  const weakTopicsCount = 0;
  const effectiveProgress = completionProgress;
  const healthScore = Math.min(100, Math.round(completionProgress * 1.1 || 70));

  return {
    totalTopics: topics.length,
    completedTopics: topics.filter(t => t.status && t.status.toUpperCase() === "COMPLETED").length,
    totalSubtopics: subtopics.length,
    completedSubtopics: completedSubtopicsCount,
    completionProgress, 
    confidenceScore,
    effectiveProgress,
    healthScore,
    weakTopicsCount,
    missedRevisionCount: 0,
    intelligenceState: "NORMAL"
  };
}