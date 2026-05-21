import dayjs from "dayjs";

import { saveTasks }
  from "../../database/repositories/scheduleRepository";

import {
  getSubjects,
  getTopics,
  getSubtopics,
} from "../../database/repositories/syllabusRepository";

import {
  getOnboarding,
} from "../../database/repositories/onboardingRepository";

import fillStudySlots
  from "./fillStudySlots";

import buildOrderedSubtopics
  from "./buildOrderedSubtopics";

export async function initializeSchedule(
  userId,
  studyHours = 6
) {
  /*
   --------------------------
   FETCH MASTER DATA
   --------------------------
  */

  const [
    subjects,

    topics,

    subtopics,

    onboarding,
  ] = await Promise.all([
    getSubjects(),

    getTopics(),

    getSubtopics(),

    getOnboarding(userId),
  ]);

  /*
   --------------------------
   BUILD ORDERED GS PIPELINE
   --------------------------
  */

  const orderedGsSubtopics =
    buildOrderedSubtopics({
      subjects,

      topics,

      subtopics:
        subtopics.filter(
          (subtopic) =>
            subtopic.type ===
            "GS"
        ),

      sequence:
        onboarding?.gsSequence ||
        [],
    });

  /*
   --------------------------
   BUILD ORDERED OPTIONAL PIPELINE
   --------------------------
  */

  const optionalSubjects =
    subjects.filter(
      (subject) =>
        subject.type ===
        "OPTIONAL"
    );

  /*
   --------------------------
   PAPER 1 DEFAULT
   --------------------------
  */

  const optionalSubjectId =
    optionalSubjects[0]?.id;

  /*
   --------------------------
   USE ONBOARDING ORDER
   --------------------------
  */

  const orderedOptionalSubtopics =
    (
      onboarding?.optionalSequence ||
      []
    ).flatMap(
      (
        topic,
        topicIndex
      ) =>
        (
          topic.subtopics || []
        ).map(
          (
            subtopic,
            subtopicIndex
          ) => ({
            ...subtopic,

            /*
             IMPORTANT
            */

            type:
              "OPTIONAL",

            /*
             MAP SUBJECT
            */

            subjectId:
              optionalSubjectId,

            /*
             TOPIC INFO
            */

            topicId:
              topic.id,

            topicName:
              topic.name,

            /*
             ORDERING
            */

            topicOrder:
              topicIndex,

            order:
              subtopicIndex,
          })
        )
    );

  /*
   --------------------------
   REVISION TASKS
   --------------------------
  */

  const revisionTasks =
    [];

  /*
   --------------------------
   GENERATE TASKS
   --------------------------
  */

  const tasks =
    fillStudySlots({
      gsSubtopics:
        orderedGsSubtopics,

      optionalSubtopics:
        orderedOptionalSubtopics,

      revisionTasks,

      studyHours,

      userId,

      startDate:
        dayjs().format(
          "YYYY-MM-DD"
        ),
    });

  /*
   --------------------------
   SAVE TASKS
   --------------------------
  */

  await saveTasks(tasks);

  return tasks;
}