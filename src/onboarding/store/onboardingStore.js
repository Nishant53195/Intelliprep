import { create } from "zustand";
import gsSubjects from "../../constants/gsSubjects";
import optionalSubjects from "../../constants/optionalSubjects";
import optionalSyllabus from "../../constants/optionalSyllabus";

const defaultOptional = optionalSubjects[0];

function getOptionalTopics(optionalSubject) {
  if (!optionalSubject) return [];

  // 1. Map name to explicit ID to avoid any structural leaks
  const subjectObj = optionalSubjects.find(
    (s) => s.name.toLowerCase().trim() === optionalSubject.toLowerCase().trim()
  );
  const targetId = subjectObj ? subjectObj.id.toLowerCase().trim() : optionalSubject.toLowerCase().trim();

  // 2. Filter using clean exact match tracking
  return optionalSyllabus
    .filter((paper) => {
      if (!paper || !paper.id) return false;
      const basePaperId = paper.id.toLowerCase().trim().replace(/[0-9]/g, '');
      return basePaperId === targetId;
    })
    .flatMap((paper) => paper.topics || []);
}

const initialState = {
  hydrated: false,
  currentStep: 1,
  name: "",
  studyHoursPerDay: 6,
  attemptYear: 2027,
  prelimsDate: "2027-05-23",
  mainsDate: "2027-08-20",
  optionalSubject: defaultOptional?.name || "",
  isOnboardingCompleted: false,
  gsSequence: [...gsSubjects],
  optionalSequence: getOptionalTopics(defaultOptional?.name || ""),
};

const useOnboardingStore = create((set) => ({
  ...initialState,

  setHydrated: (hydrated) => set({ hydrated }),
  setName: (name) => set({ name }),
  setStudyHoursPerDay: (studyHoursPerDay) => set({ studyHoursPerDay }),
  setAttemptYear: (attemptYear) => set({ attemptYear }),
  setPrelimsDate: (prelimsDate) => set({ prelimsDate }),
  setMainsDate: (mainsDate) => set({ mainsDate }),

  setOptionalSubject: (optionalSubject) => {
    // CRITICAL: Clear the old sequence first to prevent React rendering elements from previous subjects
    set({ optionalSequence: [] });
    
    const sequence = getOptionalTopics(optionalSubject);
    set({
      optionalSubject,
      optionalSequence: [...sequence],
    });
  },

  setGSSequence: (gsSequence) => set({ gsSequence }),
  setOptionalSequence: (optionalSequence) => set({ optionalSequence: [...optionalSequence] }),

  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  previousStep: () => set((state) => ({ currentStep: Math.max(1, state.currentStep - 1) })),
  completeOnboarding: () => set({ isOnboardingCompleted: true }),

  hydrateOnboarding: (onboarding) => {
    const chosenSubject = onboarding.optionalSubject || defaultOptional?.name || "";
    set({
      hydrated: true,
      isOnboardingCompleted: onboarding.completed ?? false,
      name: onboarding.name || "",
      studyHoursPerDay: onboarding.studyHoursPerDay || 6,
      attemptYear: onboarding.attemptYear || 2027,
      prelimsDate: onboarding.prelimsDate || "2027-05-23",
      mainsDate: onboarding.mainsDate || "2027-08-20",
      optionalSubject: chosenSubject,
      gsSequence: onboarding.gsSequence || [...gsSubjects],
      optionalSequence: onboarding.optionalSequence || getOptionalTopics(chosenSubject),
    });
  },

  resetOnboarding: () => set({ ...initialState }),
}));

export default useOnboardingStore;