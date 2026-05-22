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
      {/* Maximum Height expanded to 60vh with micro gutters */}
      <div className="space-y-1.5 max-h-[60vh] overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full">
        {optionalSequence.map((chapter, index) => (
          <div
            key={chapter.id || chapter.name}
            className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.01] pl-3 pr-1.5 py-1.5 transition-colors hover:bg-white/[0.03]"
          >
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <span className="text-[10px] font-bold text-slate-500 w-4 shrink-0">
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className="text-xs font-medium text-slate-200 truncate pr-2">{chapter.name}</p>
            </div>
            
            <div className="flex gap-1 shrink-0">
              <button
                onClick={() => moveUp(index)}
                disabled={index === 0}
                className="flex h-6 w-6 items-center justify-center rounded-md bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-10"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="m18 15-6-6-6 6"/>
                </svg>
              </button>
              <button
                onClick={() => moveDown(index)}
                disabled={index === optionalSequence.length - 1}
                className="flex h-6 w-6 items-center justify-center rounded-md bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-10"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between pt-3 border-t border-white/5">
        <button
          onClick={previousStep}
          className="text-xs font-medium text-slate-400 transition-colors hover:text-white"
        >
          ← Back
        </button>
        <button
          onClick={nextStep}
          className="rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md transition-transform hover:scale-102 active:scale-98"
        >
          Initialize Engine
        </button>
      </div>
    </OnboardingCard>
  );
}

export default OptionalSequenceStep;