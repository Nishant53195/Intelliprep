import { create } from "zustand";

import gsSubjects from "../../constants/gsSubjects"

import optionalSubjects from "../../constants/optionalSubjects";

import optionalSyllabus from "../../constants/optionalSyllabus";

const defaultOptional =
  optionalSubjects[0];

function getOptionalTopics(
  optionalSubject
) {
  return optionalSyllabus
    .filter((paper) =>
      paper.id
        .toLowerCase()
        .startsWith(
          optionalSubject.toLowerCase()
        )
    )
    .flatMap(
      (paper) =>
        paper.topics || []
    );
}

const initialState = {
  hydrated: false,

  currentStep: 1,

  name: "",

  studyHoursPerDay: 6,

  attemptYear: 2027,

  prelimsDate:
    "2027-05-23",

  mainsDate:
    "2027-08-20",

  optionalSubject:
    defaultOptional?.name ||
    "",

  isOnboardingCompleted:
    false,

  gsSequence: [
    ...gsSubjects,
  ],

optionalSequence:
  getOptionalTopics(
    defaultOptional?.name
  ),
};

const useOnboardingStore =
  create((set) => ({
    ...initialState,

    setHydrated: (
      hydrated
    ) =>
      set({
        hydrated,
      }),

    setName: (name) =>
      set({ name }),

    setStudyHoursPerDay:
      (
        studyHoursPerDay
      ) =>
        set({
          studyHoursPerDay,
        }),

    setAttemptYear:
      (attemptYear) =>
        set({
          attemptYear,
        }),

    setPrelimsDate:
      (prelimsDate) =>
        set({
          prelimsDate,
        }),

    setMainsDate:
      (mainsDate) =>
        set({
          mainsDate,
        }),

    setOptionalSubject:
  (optionalSubject) =>
    set({
      optionalSubject,

      optionalSequence:
        getOptionalTopics(
          optionalSubject
        ),
    }),

    setGSSequence:
      (gsSequence) =>
        set({
          gsSequence,
        }),

    setOptionalSequence:
      (
        optionalSequence
      ) =>
        set({
          optionalSequence,
        }),

    nextStep: () =>
      set((state) => ({
        currentStep:
          state.currentStep +
          1,
      })),

    previousStep: () =>
      set((state) => ({
        currentStep:
          Math.max(
            1,
            state.currentStep -
              1
          ),
      })),

    completeOnboarding:
      () =>
        set({
          isOnboardingCompleted:
            true,
        }),

    hydrateOnboarding:
      (onboarding) =>
        set({
          hydrated: true,

          isOnboardingCompleted:
            onboarding.completed ??
            false,

          name:
            onboarding.name ||
            "",

          studyHoursPerDay:
            onboarding.studyHoursPerDay ||
            6,

          attemptYear:
            onboarding.attemptYear ||
            2027,

          prelimsDate:
            onboarding.prelimsDate ||
            "2027-05-23",

          mainsDate:
            onboarding.mainsDate ||
            "2027-08-20",

          optionalSubject:
            onboarding.optionalSubject ||
            defaultOptional?.name ||
            "",

          gsSequence:
            onboarding.gsSequence ||
            [...gsSubjects],

          optionalSequence:
            onboarding.optionalSequence ||
            [
              ...defaultTopics,
            ],
        }),

    resetOnboarding:
      () =>
        set({
          ...initialState,
        }),
  }));

export default
  useOnboardingStore;