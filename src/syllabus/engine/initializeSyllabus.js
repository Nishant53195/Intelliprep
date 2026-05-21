import gsSyllabus from "../../constants/gsSyllabus";

import optionalSyllabus from "../../constants/optionalSyllabus";

import { normalizeSyllabus } from "./normalizeSyllabus";

import {
  saveSubjects,
  saveTopics,
  saveSubtopics,
  getSubjects,
} from "../../database/repositories/syllabusRepository";

export async function initializeSyllabus() {
  const allSubjects = [
    ...gsSyllabus,
    ...optionalSyllabus,
  ];

  const normalizedData =
    normalizeSyllabus(
      allSubjects
    );

  const {
    subjects,
    topics,
    subtopics,
  } = normalizedData;

  const existingSubjects =
    await getSubjects();

  if (!existingSubjects.length) {
    await saveSubjects(
      subjects
    );

    await saveTopics(topics);

    await saveSubtopics(
      subtopics
    );
  }

  return normalizedData;
}