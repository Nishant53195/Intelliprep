import { useRef, useState } from "react";
import useOnboardingStore from "../../store/onboardingStore";
import OnboardingCard from "../OnboardingCard";

function GSSequenceStep() {
  const gsSequence = useOnboardingStore((state) => state.gsSequence);
  const setGSSequence = useOnboardingStore((state) => state.setGSSequence);
  const nextStep = useOnboardingStore((state) => state.nextStep);
  const previousStep = useOnboardingStore((state) => state.previousStep);

  const activeSubjects = gsSequence.filter((subject) => !subject.lockedAfterPrelims);
  const lockedSubjects = gsSequence.filter((subject) => subject.lockedAfterPrelims);

  // --- Drag and Drop Logic ---
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleSort = () => {
    if (dragItem.current === null || dragOverItem.current === null) return;
    let _activeSubjects = [...activeSubjects];
    const draggedItemContent = _activeSubjects.splice(dragItem.current, 1)[0];
    _activeSubjects.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setIsDragging(false);
    setGSSequence([..._activeSubjects, ...lockedSubjects]);
  };

  // --- Click Logic (Arrows) ---
  function moveUp(index) {
    if (index === 0) return;
    const updated = [...activeSubjects];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    setGSSequence([...updated, ...lockedSubjects]);
  }

  function moveDown(index) {
    if (index === activeSubjects.length - 1) return;
    const updated = [...activeSubjects];
    [updated[index + 1], updated[index]] = [updated[index], updated[index + 1]];
    setGSSequence([...updated, ...lockedSubjects]);
  }

  // --- Direct Number Type Logic ---
  function handleDirectMove(oldIndex, newPriority) {
    if (newPriority === "") return; 
    const newIndex = parseInt(newPriority) - 1;
    if (isNaN(newIndex) || newIndex < 0 || newIndex >= activeSubjects.length || oldIndex === newIndex) return;
    
    const updated = [...activeSubjects];
    const [movedItem] = updated.splice(oldIndex, 1);
    updated.splice(newIndex, 0, movedItem);
    setGSSequence([...updated, ...lockedSubjects]);
  }

  return (
    <OnboardingCard
      title="GS Sequence"
      description="Type a number, drag the cards, or use the arrows to arrange your subjects."
    >
      <div className="space-y-3 sm:space-y-4 max-h-[50vh] overflow-y-auto overflow-x-hidden pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full">
        
        {activeSubjects.map((subject, index) => (
          <div
            key={subject.name}
            draggable
            onDragStart={() => {
              dragItem.current = index;
              setIsDragging(true);
            }}
            onDragEnter={() => {
              dragOverItem.current = index;
            }}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
            className={`group flex cursor-grab items-center gap-3 sm:gap-4 rounded-3xl border p-3 sm:p-4 transition-all duration-300 active:cursor-grabbing active:scale-[0.98] active:opacity-80 ${
              index === 0 
                ? "border-cyan-500/50 bg-cyan-950/20 shadow-[0_0_20px_rgba(6,182,212,0.15)]" 
                : "border-white/5 bg-white/[0.02] hover:bg-white/[0.05]"
            }`}
          >
            {/* Drag Grip Icon (Hidden on mobile to save space) */}
            <div className="hidden sm:flex shrink-0 items-center justify-center text-slate-600 transition-colors group-hover:text-slate-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/>
                <circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/>
              </svg>
            </div>

            {/* Typable Priority Number Input */}
            <input
              type="number"
              min={1}
              max={activeSubjects.length}
              value={index + 1}
              onChange={(e) => handleDirectMove(index, e.target.value)}
              onFocus={(e) => e.target.select()}
              title="Type priority number"
              className={`flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 text-center items-center justify-center rounded-2xl border text-lg sm:text-xl font-black shadow-inner outline-none transition-all hover:ring-2 hover:ring-white/20 focus:ring-2 focus:ring-cyan-400/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                index === 0 
                  ? "border-cyan-400 bg-cyan-500/20 text-cyan-300" 
                  : "border-white/10 bg-white/5 text-slate-400 group-hover:text-slate-200 focus:text-white"
              }`}
            />
            
            {/* Subject Details */}
            <div className="flex-1 min-w-0">
              <h3 className={`text-sm sm:text-lg font-bold tracking-wide truncate ${index === 0 ? "text-cyan-50" : "text-white"}`}>
                {subject.name}
              </h3>
              <p className="text-[10px] sm:text-xs font-medium text-slate-500 uppercase tracking-widest mt-0.5">
                Priority {index + 1}
              </p>
            </div>
            
            {/* Vertical Control Pad */}
            <div className="flex flex-col gap-1.5 shrink-0">
              <button
                onClick={(e) => { e.stopPropagation(); moveUp(index); }}
                disabled={index === 0}
                className="flex h-7 w-9 sm:h-8 sm:w-12 items-center justify-center rounded-lg bg-white/5 text-slate-400 transition-all hover:bg-cyan-500/20 hover:text-cyan-300 disabled:opacity-20 disabled:hover:bg-white/5 disabled:hover:text-slate-400"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="sm:w-[18px] sm:h-[18px]">
                  <path d="m18 15-6-6-6 6"/>
                </svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); moveDown(index); }}
                disabled={index === activeSubjects.length - 1}
                className="flex h-7 w-9 sm:h-8 sm:w-12 items-center justify-center rounded-lg bg-white/5 text-slate-400 transition-all hover:bg-cyan-500/20 hover:text-cyan-300 disabled:opacity-20 disabled:hover:bg-white/5 disabled:hover:text-slate-400"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="sm:w-[18px] sm:h-[18px]">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </button>
            </div>
          </div>
        ))}

        {/* Locked Subjects Section */}
        {lockedSubjects.length > 0 && (
          <div className="pt-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10"></div>
              <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-500">
                Locked Post-Prelims
              </h3>
              <div className="h-px flex-1 bg-white/10"></div>
            </div>
            
            <div className="space-y-3">
              {lockedSubjects.map((subject) => (
                <div
                  key={subject.name}
                  className="flex items-center gap-3 sm:gap-4 rounded-3xl border border-white/5 bg-[#0A0F1C]/40 p-3 sm:p-4 opacity-75"
                >
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl border border-white/5 bg-white/[0.02] text-slate-600">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-semibold text-slate-400 truncate">{subject.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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
          className="rounded-2xl bg-gradient-to-r from-cyan-600 to-indigo-600 px-6 sm:px-8 py-3.5 sm:py-4 font-semibold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
        >
          Continue
        </button>
      </div>
    </OnboardingCard>
  );
}

export default GSSequenceStep;