// src/syllabus/services/calculateSyllabusMetrics.js
import { db } from "../../database/dexie";

export const calculateSyllabusMetrics = {
  /**
   * 1. Effective Progress Calculation
   * Effective progress = (Completion weight) + (Confidence weight) - (Penalties for skipped revisions)
   */
  calculateEffectiveTopicProgress(completionProgress, confidence, missedRevisionCount) {
    if (completionProgress === 0) return 0;
    
    const baseProgress = (completionProgress * 0.6) + (confidence * 0.4);
    const revisionPenalty = missedRevisionCount * 8; 
    
    return Math.max(0, Math.min(100, Math.round(baseProgress - revisionPenalty)));
  },

  /**
   * 2. Dynamic Topic Importance Score
   * Calculated automatically from historical data points
   */
  calculateTopicImportance(pyqCount, currentAffairsCount, mistakeCount, revisionFailureCount) {
    const pyqWeight = pyqCount * 12;
    const caWeight = currentAffairsCount * 6;
    const riskWeight = mistakeCount * 4;
    const failurePenalty = revisionFailureCount * 5;

    return Math.max(0, Math.min(100, Math.round(40 + pyqWeight + caWeight + riskWeight + failurePenalty)));
  },

  /**
   * 3. Overall Subject Health Summary Analyzer
   */
  async computeSubjectHealth(subjectId) {
    const topics = await db.topics
  .where("subjectId")
  .equals(subjectId)
  .toArray();
    if (topics.length === 0) return 100;

    let totalConfidence = 0;
    let completedTopicsCount = 0;
    
    for (const topic of topics) {
      totalConfidence += topic.confidence || 60;
      if (topic.status === "COMPLETED" || topic.status === "REVISED") completedTopicsCount++;
    }

    const averageConfidence = totalConfidence / topics.length;
    const coveragePercentage = (completedTopicsCount / topics.length) * 100;
    const weakTopicsCount = await db.weak_topics.where("subjectId").equals(subjectId).count();

    let baselineHealth = (coveragePercentage * 0.3) + (averageConfidence * 0.7);
    const weaknessPenalty = weakTopicsCount * 10;

    if (coveragePercentage === 0) {
      baselineHealth = averageConfidence; 
    }

    return Math.max(0, Math.min(100, Math.round(baselineHealth - weaknessPenalty)));
  }
};