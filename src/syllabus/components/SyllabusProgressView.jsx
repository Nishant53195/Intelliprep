import {
  useEffect,
  useState,
} from "react";

import {
  getSubjectProgress,
} from "../services/getSubjectProgress";

import useOrderedSubjects
from "../services/useOrderedSubjects";

import TopicExplorer
from "./TopicExplorer";

function SyllabusProgressView() {
  const [
    activePaper,
    setActivePaper,
  ] = useState("GS1");

  const [
    selectedSubject,
    setSelectedSubject,
  ] = useState(null);

  const papers = [
    {
      label: "GS I",
      value: "GS1",
    },

    {
      label: "GS II",
      value: "GS2",
    },

    {
      label: "GS III",
      value: "GS3",
    },

    {
      label: "GS IV",
      value: "GS4",
    },

    {
      label: "Optional",
      value: "OPTIONAL",
    },
  ];

  const subjects =
    useOrderedSubjects(
      activePaper
    );

    const [
  enrichedSubjects,

  setEnrichedSubjects,
] = useState([]);

useEffect(() => {
  async function enrich() {
    const enriched =
      await Promise.all(
        subjects.map(
          async (
            subject
          ) => {
            const progress =
              await getSubjectProgress(
                subject.id
              );

            return {
              ...subject,

              ...progress,
            };
          }
        )
      );

    setEnrichedSubjects(
      enriched
    );
  }

  if (
    subjects?.length
  ) {
    enrich();
  }
}, [subjects]);

  return (
    <div>
      {/* PAPER SELECTOR */}
      <div className="mb-6 flex flex-wrap gap-3">
        {papers.map((paper) => (
          <button
            key={paper.label}
            onClick={() => {
              setActivePaper(
                paper.value
              );

              // reset selected subject
              setSelectedSubject(
                null
              );
            }}
            className={`rounded-xl px-4 py-2 text-sm font-semibold ${
              activePaper ===
              paper.value
                ? "bg-indigo-500 text-white"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            {paper.label}
          </button>
        ))}
      </div>

      {/* SUBJECT GRID */}
      {!selectedSubject && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {enrichedSubjects?.map(
            (subject) => (
              <div
                key={
                  subject.id
                }
                onClick={() =>
                  setSelectedSubject(
                    subject
                  )
                }
                className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-slate-900">
                  {
                    subject.name
                  }
                </h3>
                <p className="mt-3 text-sm text-slate-500">
  {subject.progress}%
  completed
</p>

<div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
  <div
    className="h-full rounded-full bg-emerald-500"
    style={{
      width: `${subject.progress}%`,
    }}
  />
</div>
              </div>
            )
          )}
        </div>
      )}

      {/* TOPIC EXPLORER */}
      {selectedSubject && (
        <TopicExplorer
          subject={
            selectedSubject
          }
          onBackSubject={() =>
            setSelectedSubject(
              null
            )
          }
        />
      )}
    </div>
  );
}

export default
  SyllabusProgressView;