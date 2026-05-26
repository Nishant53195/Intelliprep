import useOnboardingStore from "../../store/onboardingStore";
import OnboardingCard from "../OnboardingCard";
import optionalSubjects from "../../../constants/optionalSubjects";

function PreparationStep() {
  const studyHoursPerDay = useOnboardingStore((state) => state.studyHoursPerDay);
  const setStudyHoursPerDay = useOnboardingStore((state) => state.setStudyHoursPerDay);
  const attemptYear = useOnboardingStore((state) => state.attemptYear);
  const setAttemptYear = useOnboardingStore((state) => state.setAttemptYear);
  const setPrelimsDate = useOnboardingStore((state) => state.setPrelimsDate);
  const setMainsDate = useOnboardingStore((state) => state.setMainsDate);
  const optionalSubject = useOnboardingStore((state) => state.optionalSubject);
  const setOptionalSubject = useOnboardingStore((state) => state.setOptionalSubject);
  const nextStep = useOnboardingStore((state) => state.nextStep);
  const previousStep = useOnboardingStore((state) => state.previousStep);

  function handleYearChange(value) {
    const year = Number(value);
    setAttemptYear(year);

    if (year === 2027) {
      setPrelimsDate("2027-05-23");
      setMainsDate("2027-08-20");
    }
    if (year === 2028) {
      setPrelimsDate("2028-05-21");
      setMainsDate("2028-08-18");
    }
  }

  function handleOptionalChange(value) {
    // Let the store handle picking the correct, isolated topics automatically
    setOptionalSubject(value);
  }

  return (
    <OnboardingCard
      title="Preparation Setup"
      description="Configure your operational parameters."
    >
      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Daily Study Hours
          </label>
          <select
            value={studyHoursPerDay}
            onChange={(e) => setStudyHoursPerDay(Number(e.target.value))}
            className="w-full appearance-none rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-white outline-none transition-all focus:border-cyan-500/50 focus:bg-white/[0.05]"
          >
            {[5, 6, 7, 8].map((hour) => (
              <option key={hour} value={hour} className="bg-[#0F172A] text-white">
                {hour} Hours
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Attempt Year
          </label>
          <select
            value={attemptYear}
            onChange={(e) => handleYearChange(e.target.value)}
            className="w-full appearance-none rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-white outline-none transition-all focus:border-cyan-500/50 focus:bg-white/[0.05]"
          >
            <option value={2027} className="bg-[#0F172A] text-white">2027</option>
            <option value={2028} className="bg-[#0F172A] text-white">2028</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Optional Subject
          </label>
          <select
            value={optionalSubject}
            onChange={(e) => handleOptionalChange(e.target.value)}
            className="w-full appearance-none rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-white outline-none transition-all focus:border-cyan-500/50 focus:bg-white/[0.05]"
          >
            {optionalSubjects.map((subject) => (
              <option key={subject.name} value={subject.name} className="bg-[#0F172A] text-white">
                {subject.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-12 flex items-center justify-between">
        <button
          onClick={previousStep}
          className="text-sm font-medium text-slate-400 transition-colors hover:text-white"
        >
          ← Back
        </button>
        <button
          onClick={nextStep}
          className="rounded-2xl bg-gradient-to-r from-cyan-600 to-indigo-600 px-8 py-4 font-semibold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
        >
          Continue
        </button>
      </div>
    </OnboardingCard>
  );
}

export default PreparationStep;