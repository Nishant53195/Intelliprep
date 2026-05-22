function SortableSubjectItem({
  subject,
  pxDense = false,
}) {
  return (
    <div className={`rounded-md bg-slate-800/60 truncate ${pxDense ? "p-1.5" : "p-3"}`}>
      <div className="flex items-center justify-between gap-2 truncate">
        <span className="text-xs font-medium text-slate-200 truncate">
          {subject.name}
        </span>

        {subject.lockedAfterPrelims && !pxDense && (
          <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[9px] text-amber-400 font-semibold shrink-0">
            Post-Prelims
          </span>
        )}
      </div>
    </div>
  );
}

export default SortableSubjectItem;