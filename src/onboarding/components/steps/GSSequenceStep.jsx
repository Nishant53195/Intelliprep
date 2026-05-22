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
      description="Arrange your preparation priorities using input keys, quick clicks, or fluid drag motions."
    >
      {/* Maximum Height expanded to 60vh with dense spacing arrays */}
      <div className="space-y-1.5 max-h-[60vh] overflow-y-auto overflow-x-hidden pr-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full">
        
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
            className={`group flex cursor-grab items-center gap-2 rounded-xl border p-1.5 transition-all duration-200 active:cursor-grabbing active:scale-[0.99] ${
              index === 0 
                ? "border-cyan-500/40 bg-cyan-950/30 shadow-[0_0_12px_rgba(6,182,212,0.1)]" 
                : "border-white/5 bg-white/[0.01] hover:bg-white/[0.03]"
            }`}
          >
            {/* Ultra-Dense Drag Handle icon */}
            <div className="flex shrink-0 items-center justify-center text-slate-600 group-hover:text-slate-400 pointer-events-none">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/>
                <circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/>
              </svg>
            </div>

            {/* Micro Input Numeric Box */}
            <input
              type="number"
              min={1}
              max={activeSubjects.length}
              value={index + 1}
              onChange={(e) => handleDirectMove(index, e.target.value)}
              onFocus={(e) => e.target.select()}
              className={`flex h-7 w-8 shrink-0 text-center items-center justify-center rounded-md border text-xs font-bold outline-none transition-all focus:ring-1 focus:ring-cyan-400/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                index === 0 
                  ? "border-cyan-400/70 bg-cyan-500/20 text-cyan-300" 
                  : "border-white/10 bg-white/5 text-slate-400 group-hover:text-slate-200 focus:text-white"
              }`}
            />
            
            {/* High Density Subject Information text layout */}
            <div className="flex-1 min-w-0">
              <h3 className={`text-xs font-semibold tracking-wide truncate ${index === 0 ? "text-cyan-200" : "text-slate-200"}`}>
                {subject.name}
              </h3>
            </div>
            
            {/* Horizontal Compact Control Buttons */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={(e) => { e.stopPropagation(); moveUp(index); }}
                disabled={index === 0}
                className="flex h-6 w-6 items-center justify-center rounded-md bg-white/5 text-slate-400 transition-all hover:bg-cyan-500/25 hover:text-cyan-300 disabled:opacity-10 disabled:hover:bg-white/5 disabled:hover:text-slate-400"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="m18 15-6-6-6 6"/>
                </svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); moveDown(index); }}
                disabled={index === activeSubjects.length - 1}
                className="flex h-6 w-6 items-center justify-center rounded-md bg-white/5 text-slate-400 transition-all hover:bg-cyan-500/25 hover:text-cyan-300 disabled:opacity-10 disabled:hover:bg-white/5 disabled:hover:text-slate-400"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </button>
            </div>
          </div>
        ))}

        {/* Compressed Locked Post-Prelims View */}
        {lockedSubjects.length > 0 && (
          <div className="pt-3">
            <div className="mb-2 flex items-center gap-2">
              <div className="h-px flex-1 bg-white/5"></div>
              <h3 className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
                Locked Post-Prelims
              </h3>
              <div className="h-px flex-1 bg-white/5"></div>
            </div>
            
            <div className="grid grid-cols-2 gap-1.5">
              {lockedSubjects.map((subject) => (
                <div
                  key={subject.name}
                  className="flex items-center gap-2 rounded-xl border border-white/5 bg-[#0A0F1C]/20 px-2.5 py-1.5 opacity-60"
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-500 shrink-0">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <span className="text-[11px] font-medium text-slate-400 truncate">{subject.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Control Actions Container */}
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
          Continue
        </button>
      </div>
    </OnboardingCard>
  );
}

export default GSSequenceStep;