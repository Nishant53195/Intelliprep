import useOnboardingStore from "../../store/onboardingStore";
import OnboardingCard from "../OnboardingCard";

function WelcomeStep() {
  const name = useOnboardingStore((state) => state.name);
  const setName = useOnboardingStore((state) => state.setName);
  const nextStep = useOnboardingStore((state) => state.nextStep);

  return (
    <OnboardingCard
      title="Welcome to IntelliPrep"
      description="Your intelligent UPSC preparation system."
    >
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Your Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name..."
          className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-white placeholder-slate-600 outline-none transition-all focus:border-cyan-500/50 focus:bg-white/[0.05] focus:ring-1 focus:ring-cyan-500/50"
        />
      </div>

      <div className="mt-12 flex justify-end">
        <button
          onClick={nextStep}
          disabled={!name.trim()}
          className="rounded-2xl bg-gradient-to-r from-cyan-600 to-indigo-600 px-8 py-4 font-semibold text-white shadow-lg transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
        >
          Continue
        </button>
      </div>
    </OnboardingCard>
  );
}

export default WelcomeStep;