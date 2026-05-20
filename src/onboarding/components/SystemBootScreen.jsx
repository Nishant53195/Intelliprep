const bootSteps = [
  "Initializing Scheduler Engine...",
  "Loading GS Knowledge Graph...",
  "Preparing Revision Pipelines...",
  "Configuring Recovery Intelligence...",
  "Activating Memory Tracking...",
  "Building Subject Orchestration...",
  "Finalizing IntelliPrep OS...",
];

function SystemBootScreen({
  currentIndex,
}) {
  return (
    <div className="space-y-4">
      {bootSteps.map(
        (
          step,
          index
        ) => {
          const active =
            index <=
            currentIndex;

          return (
            <div
              key={step}
              className={`flex items-center gap-4 rounded-2xl border px-5 py-4 transition ${
                active
                  ? "border-white/10 bg-white/[0.04] text-white"
                  : "border-white/5 bg-white/[0.02] text-slate-600"
              }`}
            >
              <div
                className={`h-2 w-2 rounded-full ${
                  active
                    ? "bg-white"
                    : "bg-slate-700"
                }`}
              />

              <span className="text-sm">
                {step}
              </span>
            </div>
          );
        }
      )}
    </div>
  );
}

export default
  SystemBootScreen;