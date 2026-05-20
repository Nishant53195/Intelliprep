import useOnboardingStore from "../../store/onboardingStore";
import OnboardingCard from "../OnboardingCard";

function OptionalSequenceStep() {
  const optionalSequence = useOnboardingStore((state) => state.optionalSequence);
  const setOptionalSequence = useOnboardingStore((state) => state.setOptionalSequence);
  const nextStep = useOnboardingStore((state) => state.nextStep);
  const previousStep = useOnboardingStore((state) => state.previousStep);

  function moveUp(index) {
    if (index === 0) return;
    const updated = [...optionalSequence];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    setOptionalSequence(updated);
  }

  function moveDown(index) {
    if (index === optionalSequence.length - 1) return;
    const updated = [...optionalSequence];
    [updated[index + 1], updated[index]] = [updated[index], updated[index + 1]];
    setOptionalSequence(updated);
  }

  return (
    <OnboardingCard
      title="Optional Sequence"
      description="Arrange your optional chapters by preparation priority."
    >
      <div className="space-y-3 max-h-[45vh] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full">
        {optionalSequence.map((chapter, index) => (
          <div
            key={chapter.id || chapter.name}
            className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] px-5 py-4 transition-colors hover:bg-white/[0.04]"
          >
            <p className="font-medium text-white">{chapter.name}</p>
            <div className="flex gap-2">
              <button
                onClick={() => moveUp(index)}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                ↑
              </button>
              <button
                onClick={() => moveDown(index)}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                ↓
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between pt-4 border-t border-white/5">
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
          Initialize Engine
        </button>
      </div>
    </OnboardingCard>
  );
}

export default OptionalSequenceStep;