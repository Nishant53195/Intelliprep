import SortableSubjectItem from "./SortableSubjectItem";

function GSSequenceList({
  subjects = [],
  moveUp,
  moveDown,
}) {
  const safeSubjects = subjects.filter(Boolean);
  const activeSubjects = safeSubjects.filter((subject) => !subject?.lockedAfterPrelims);
  const afterPrelimsSubjects = safeSubjects.filter((subject) => subject?.lockedAfterPrelims);

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        {activeSubjects.map((subject, index) => (
          <div
            key={subject.id}
            className="flex items-center justify-between gap-2 p-1 bg-slate-900/40 rounded-lg border border-white/5"
          >
            <div className="flex-1 min-w-0">
              <SortableSubjectItem subject={subject} pxDense />
            </div>

            <div className="flex gap-1 shrink-0 pr-1">
              <button
                onClick={() => moveUp(index)}
                disabled={index === 0}
                className="rounded bg-slate-800 hover:bg-slate-700 h-6 w-6 flex items-center justify-center text-xs text-slate-300 disabled:opacity-20"
              >
                ↑
              </button>
              <button
                onClick={() => moveDown(index)}
                disabled={index === activeSubjects.length - 1}
                className="rounded bg-slate-800 hover:bg-slate-700 h-6 w-6 flex items-center justify-center text-xs text-slate-300 disabled:opacity-20"
              >
                ↓
              </button>
            </div>
          </div>
        ))}
      </div>

      {afterPrelimsSubjects.length > 0 && (
        <div className="pt-2 border-t border-white/5">
          <h3 className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-400/80">
            After Prelims
          </h3>
          <div className="grid grid-cols-2 gap-1">
            {afterPrelimsSubjects.map((subject) => (
              <SortableSubjectItem
                key={subject.id}
                subject={subject}
                pxDense
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default GSSequenceList;