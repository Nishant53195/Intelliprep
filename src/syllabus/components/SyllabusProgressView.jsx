import {
  useEffect,
  useState,
} from "react";

import useOrderedSubjects
from "../services/useOrderedSubjects";

import TopicExplorer
from "./TopicExplorer";

import {
  getSubjectAnalytics,
} from "../services/subjectAnalyticsEngine";


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
  async (subject) => {
    try {
      const analytics =
  await getSubjectAnalytics(
    subject.id
  );

return {
  ...subject,
  ...analytics,
};
    } catch (error) {
      console.error(
        "Subject intelligence error",
        error
      );

      return {
        ...subject,

        progress: 0,

        effectiveProgress: 0,

        healthScore: 0,

        confidenceScore: 0,

        weakTopicsCount: 0,
      };
    }
  }
)
      );

    setEnrichedSubjects(
      enriched
    );
  }

  if (!subjects) {
  setEnrichedSubjects([]);
  return;
}

enrich();
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
    <div className="mt-4 space-y-2">
  <div className="flex items-center justify-between text-sm">
    <span className="text-slate-500">
      Completion
    </span>

    <span className="font-semibold text-slate-700">
      {subject.completionProgress}%
    </span>
  </div>

  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
    <div
      className="h-full rounded-full bg-emerald-500"
      style={{
        width: `${subject.completionProgress}%`,
      }}
    />
  </div>

  <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
    <div className="rounded-xl bg-slate-50 p-2">
      <p className="text-slate-400">
        Effective
      </p>

      <p className="font-bold text-indigo-600">
        {
          subject.effectiveProgress
        }%
      </p>
    </div>

    <div className="rounded-xl bg-slate-50 p-2">
      <p className="text-slate-400">
        Health
      </p>

      <p className="font-bold text-emerald-600">
        {
          subject.healthScore
        }
      </p>
    </div>

    <div className="rounded-xl bg-slate-50 p-2">
      <p className="text-slate-400">
        Confidence
      </p>

      <p className="font-bold text-amber-600">
        {
          subject.confidenceScore
        }%
      </p>
    </div>

    <div className="rounded-xl bg-slate-50 p-2">
      <p className="text-slate-400">
        Weak Topics
      </p>

      <p className="font-bold text-rose-600">
        {
          subject.weakTopicsCount
        }
      </p>
    </div>
  </div>
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