import SortableSubjectItem from "./SortableSubjectItem";

function GSSequenceList({
  subjects = [],
  moveUp,
  moveDown,
}) {
  const safeSubjects =
    subjects.filter(Boolean);

  const activeSubjects =
    safeSubjects.filter(
      (subject) =>
        !subject?.lockedAfterPrelims
    );

  const afterPrelimsSubjects =
    safeSubjects.filter(
      (subject) =>
        subject?.lockedAfterPrelims
    );

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        {activeSubjects.map(
          (
            subject,
            index
          ) => (
            <div
              key={subject.id}
              className="space-y-2"
            >
              <SortableSubjectItem
                subject={
                  subject
                }
              />

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    moveUp(index)
                  }
                  className="rounded-lg bg-slate-700 px-3 py-2 text-sm"
                >
                  ↑
                </button>

                <button
                  onClick={() =>
                    moveDown(
                      index
                    )
                  }
                  className="rounded-lg bg-slate-700 px-3 py-2 text-sm"
                >
                  ↓
                </button>
              </div>
            </div>
          )
        )}
      </div>

      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-amber-300">
          After Prelims
        </h3>

        <div className="space-y-3">
          {afterPrelimsSubjects.map(
            (subject) => (
              <SortableSubjectItem
                key={subject.id}
                subject={
                  subject
                }
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default GSSequenceList;