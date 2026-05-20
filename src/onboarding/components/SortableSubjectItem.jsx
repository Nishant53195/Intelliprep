function SortableSubjectItem({
  subject,
}) {
  return (
    <div className="rounded-xl bg-slate-800 p-4">
      <div className="flex items-center justify-between">
        <span>
          {subject.name}
        </span>

        {subject.lockedAfterPrelims && (
          <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs text-amber-300">
            After Prelims
          </span>
        )}
      </div>
    </div>
  );
}

export default SortableSubjectItem;