const steps = [
  "Welcome",
  "Preparation Config",
  "GS Sequence",
  "Optional Sequence",
  "Initialization",
];

function OnboardingSidebar({ currentStep }) {
  return (
    <div className="flex h-full flex-col justify-between p-10">
      <div>
        {/* Glowing IntelliPrep Logo Stack */}
        <div className="mb-12">
          <span className="mb-1 block text-xl font-medium tracking-[0.25em] text-cyan-200/60 uppercase drop-shadow-md">
            UPSC
          </span>
          <h1 className="text-4xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-[linear-gradient(to_right,#e0e7ff,#c4b5fd,#a5f3fc,#e0e7ff)] drop-shadow-[0_0_15px_rgba(196,181,253,0.2)] pb-1">
            IntelliPrep.
          </h1>
          <p className="mt-2 text-xs font-mono tracking-[0.2em] text-slate-400 uppercase">
            System Initialization
          </p>
        </div>

        <div className="mt-12 space-y-6">
          {steps.map((step, index) => {
            const active = currentStep === index + 1;
            const completed = currentStep > index + 1;

            return (
              <div key={step} className="group flex items-center gap-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold transition-all duration-300 ${
                    active
                      ? "border-cyan-400 bg-cyan-400/10 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                      : completed
                      ? "border-indigo-500/50 bg-indigo-500/20 text-indigo-300"
                      : "border-white/10 bg-white/[0.02] text-slate-500"
                  }`}
                >
                  {completed ? "✓" : index + 1}
                </div>

                <div>
                  <p
                    className={`text-sm font-medium transition-colors ${
                      active
                        ? "text-white"
                        : completed
                        ? "text-slate-300"
                        : "text-slate-500"
                    }`}
                  >
                    {step}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-slate-500">
        <div className="h-1.5 w-1.5 rounded-full bg-cyan-500/50" />
        IntelliPrep OS v1.0
      </div>
    </div>
  );
}

export default OnboardingSidebar;