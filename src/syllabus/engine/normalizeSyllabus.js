import {
  TOPIC_STATUS,
  SUBTOPIC_STATUS,
} from "../../constants/syllabus";

export function normalizeSyllabus(
  syllabusData
) {
  const subjects = [];
  const topics = [];
  const subtopics = [];

  syllabusData.forEach(
    (
      subject,
      subjectIndex
    ) => {
      // Establish a safe fallback ID for the subject if missing
      const safeSubjectId = subject.id || `subject-${subjectIndex}`;

      // SUBJECT
      subjects.push({
        id: safeSubjectId,

        type:
          subject.type,

        paper:
          subject.paper,

        name:
          subject.name,

        order:
          subjectIndex,
      });

      // SAFELY FETCH TOPICS WITH FALLBACK TO PREVENT CRASHING
      const safeTopics = subject.topics || [];

      safeTopics.forEach(
        (
          topic,
          topicIndex
        ) => {
          if (!topic) return;

          // GUARANTEE VALID ID: If topic.id is missing, generate a valid key string
          const safeTopicId = topic.id || `${safeSubjectId}-topic-${topicIndex}`;
          let totalEstimatedMinutes = 0;

          topics.push({
            id: safeTopicId,

            subjectId:
              safeSubjectId,

            name:
              topic.name || "Untitled Topic",

            order:
              topicIndex,

            estimatedMinutes: 0,

            importanceScore: 0,

            currentRelevance: 0,

            pyqFrequency: 0,

            healthScore: 100,

            status:
              TOPIC_STATUS.NOT_STARTED,
          });

          // SAFELY FETCH SUBTOPICS WITH FALLBACK
          const safeSubtopics = topic.subtopics || [];

          safeSubtopics.forEach(
            (
              subtopic,
              subtopicIndex
            ) => {
              if (!subtopic) return;

              // GUARANTEE VALID SUBTOPIC ID
              const safeSubtopicId = subtopic.id 
  ? `${safeSubjectId}-${safeTopicId}-${subtopic.id}` 
  : `${safeTopicId}-subtopic-${subtopicIndex}`;

              totalEstimatedMinutes +=
                subtopic.estimatedMinutes || 0;

              subtopics.push({
                id:
                  safeSubtopicId,

                subjectId:
                  safeSubjectId,

                topicId:
                  safeTopicId,

                name:
                  subtopic.name || "Untitled Subtopic",

                estimatedMinutes:
                  subtopic.estimatedMinutes || 0,

                difficulty:
                  subtopic.difficulty || 1,

                status:
                  SUBTOPIC_STATUS.NOT_STARTED,

                paper:  subject.paper,

                type:  subject.type,

                order:
                  subtopicIndex,
              });
            }
          );

          // UPDATE TOTAL TOPIC TIME
          const topicDbIndex =
            topics.findIndex(
              (t) =>
                t.id ===
                safeTopicId
            );

          if (
            topicDbIndex !==
            -1
          ) {
            topics[
              topicDbIndex
            ].estimatedMinutes =
              totalEstimatedMinutes;
          }
        }
      );
    }
  );

  return {
    subjects,
    topics,
    subtopics,
  };
}