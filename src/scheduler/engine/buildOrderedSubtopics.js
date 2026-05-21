export default function buildOrderedSubtopics({
  subjects = [],

  topics = [],

  subtopics = [],

  sequence = [],
}) {
  const orderedSubtopics =
    [];

  /*
   --------------------------
   NORMALIZE SEQUENCE IDS
   --------------------------
  */

  const normalizedSequence =
    sequence.map((item) => {
      /*
       DIRECT STRING
      */

      if (
        typeof item ===
        "string"
      ) {
        return item;
      }

      /*
       OBJECT SHAPES
      */

      return (
        item.subjectId ||
        item.id ||
        item.paperId ||
        item.topicId
      );
    });

  /*
   --------------------------
   BUILD ORDERED PIPELINE
   --------------------------
  */

  normalizedSequence.forEach(
    (sequenceId) => {
      /*
       SUBJECT TOPICS
      */

      const subjectTopics =
        topics
          .filter(
            (topic) =>
              topic.subjectId ===
              sequenceId
          )
          .sort(
            (a, b) =>
              (a.order ||
                0) -
              (b.order || 0)
          );

      /*
       TOPIC SUBTOPICS
      */

      subjectTopics.forEach(
        (topic) => {
          const topicSubtopics =
            subtopics
              .filter(
                (
                  subtopic
                ) =>
                  subtopic.topicId ===
                  topic.id
              )
              .sort(
                (
                  a,
                  b
                ) =>
                  (a.order ||
                    0) -
                  (b.order ||
                    0)
              );

          orderedSubtopics.push(
            ...topicSubtopics
          );
        }
      );
    }
  );

  return orderedSubtopics;
}