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
      // SUBJECT
      subjects.push({
        id: subject.id,

        type:
          subject.type,

        paper:
          subject.paper,

        name:
          subject.name,

        order:
          subjectIndex,
      });

      // TOPICS
      subject.topics.forEach(
        (
          topic,
          topicIndex
        ) => {
          let totalEstimatedMinutes =
            0;

          topics.push({
            id: topic.id,

            subjectId:
              subject.id,

            name:
              topic.name,

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

          // SUBTOPICS
          topic.subtopics.forEach(
            (
              subtopic,
              subtopicIndex
            ) => {
              totalEstimatedMinutes +=
                subtopic.estimatedMinutes;

              subtopics.push({
                id:
                  subtopic.id,

                subjectId:
                  subject.id,

                topicId:
                  topic.id,

                name:
                  subtopic.name,

                estimatedMinutes:
                  subtopic.estimatedMinutes,

                difficulty:
                  subtopic.difficulty,

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
                topic.id
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