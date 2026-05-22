import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../database/dexie";
import TopicExplorer from "./TopicExplorer";

function SyllabusProgressView() {
  const [activePaper, setActivePaper] = useState("GS1");
  const [selectedSubject, setSelectedSubject] = useState(null);

  const papers = [
    { label: "GS I", value: "GS1" },
    { label: "GS II", value: "GS2" },
    { label: "GS III", value: "GS3" },
    { label: "GS IV", value: "GS4" },
    { label: "Optional", value: "OPTIONAL" },
  ];

  // DIRECT DATABASE LIVE QUERY LAYER: Syncs percentages instantly on change clicks
  const enrichedSubjects = useLiveQuery(async () => {
    // 1. Fetch onboarding configuration to handle user sequences cleanly
    const onboarding = await db.onboarding_config.toCollection().first();
    const allSubjects = await db.subjects.toArray();

    if (!onboarding) return [];

    let filteredSubjects = [];

    // 2. Linear Sorting Strategy matching useOrderedSubjects rules safely
    if (activePaper.toUpperCase() === "OPTIONAL") {
      const selectedOptional = onboarding.optionalSubject || "";
      filteredSubjects = allSubjects.filter((subject) => {
        if (subject.type?.toUpperCase() !== "OPTIONAL") return false;
        return subject.name.toLowerCase().includes(selectedOptional.toLowerCase());
      });
    } else {
      const sequenceIds = (onboarding.gsSequence || []).map((subject) => subject.id);
      filteredSubjects = allSubjects
        .filter(
          (subject) =>
            subject.paper?.toUpperCase() === activePaper.toUpperCase() &&
            (subject.type?.toUpperCase() === "GS" || subject.type?.toUpperCase() === "CORE")
        )
        .sort((a, b) => {
          const aIndex = sequenceIds.indexOf(a.id);
          const bIndex = sequenceIds.indexOf(b.id);
          if (aIndex === -1) return 1;
          if (bIndex === -1) return -1;
          return aIndex - bIndex;
        });
    }

    // 3. Directly calculate real-time completion percentages to bypass subjectAnalyticsEngine
    return await Promise.all(
      filteredSubjects.map(async (subject) => {
        const subtopics = await db.subtopics
          .where("subjectId")
          .equals(subject.id)
          .toArray();

        if (subtopics.length === 0) {
          return {
            ...subject,
            completionProgress: 0,
            effectiveProgress: 0,
            healthScore: 0,
            confidenceScore: 0,
            weakTopicsCount: 0,
          };
        }

        const subtopicIds = subtopics.map((st) => st.id);

        // Scan progress table for valid uppercase completed entries
        const progressRecords = await db.subtopic_progress
          .where("subtopicId")
          .anyOf(subtopicIds)
          .toArray();

        const completedCount = subtopics.filter((st) => {
          const prog = progressRecords.find((p) => p.subtopicId === st.id);
          return (st.status && st.status.toUpperCase() === "COMPLETED") ||
                 (prog && prog.status && prog.status.toUpperCase() === "COMPLETED");
        }).length;

        const percent = Math.round((completedCount / subtopics.length) * 100);

        return {
          ...subject,
          completionProgress: percent,
          effectiveProgress: percent,
          healthScore: percent,
          confidenceScore: percent > 0 ? 100 : 0,
          weakTopicsCount: 0,
        };
      })
    );
  }, [activePaper, selectedSubject]);

  return (
    <div className="space-y-5">
      {/* TITLE SUMMARY HEADER */}
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">Syllabus Progress</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Review core completion tracking, coverage depth, and subject pacing markers across your profile.
        </p>
      </div>

      {/* LIGHT MODE PAPER SELECTOR */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {papers.map((paper) => (
          <button
            key={paper.label}
            onClick={() => {
              setActivePaper(paper.value);
              setSelectedSubject(null); // Reset selected subject
            }}
            className={`text-xs px-3.5 py-1.5 font-bold rounded-xl border transition-all whitespace-nowrap ${
              activePaper === paper.value
                ? "bg-slate-100 border-slate-200 text-slate-900 shadow-sm"
                : "bg-transparent border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {paper.label}
          </button>
        ))}
      </div>

      {/* LIGHT MODE GALLERY SUBJECT GRID */}
      {!selectedSubject && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {enrichedSubjects?.map((subject) => (
            <div
              key={subject.id}
              onClick={() => setSelectedSubject(subject)}
              className="group relative flex flex-col justify-between bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-4 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-wide bg-slate-50 border-slate-200 text-slate-600">
                    {activePaper === "OPTIONAL" ? "Optional" : "GS Core"}
                  </span>
                  <span className="text-xs font-black text-slate-500 group-hover:text-cyan-600 transition-colors">
                    {subject.completionProgress || 0}%
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-800 group-hover:text-slate-900 transition-colors tracking-wide line-clamp-2">
                  {subject.name}
                </h3>
              </div>

              <div className="mt-4 pt-1 space-y-2">
                {/* Linear Progress Indicator */}
                <div className="w-full bg-slate-100 border border-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${subject.completionProgress || 0}%`,
                    }}
                  />
                </div>

                {/* High Density Metric Cells Grid */}
                <div className="grid grid-cols-2 gap-2 pt-1 text-[10px]">
                  <div className="rounded-xl bg-slate-50 border border-slate-100 p-2 text-left">
                    <p className="text-slate-400 font-medium uppercase tracking-tight">Effective</p>
                    <p className="font-black text-indigo-600 mt-0.5 text-xs">
                      {subject.effectiveProgress || 0}%
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 border border-slate-100 p-2 text-left">
                    <p className="text-slate-400 font-medium uppercase tracking-tight">Health</p>
                    <p className="font-black text-emerald-600 mt-0.5 text-xs">
                      {subject.healthScore || 0}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 border border-slate-100 p-2 text-left">
                    <p className="text-slate-400 font-medium uppercase tracking-tight">Confidence</p>
                    <p className="font-black text-amber-600 mt-0.5 text-xs">
                      {subject.confidenceScore || 0}%
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 border border-slate-100 p-2 text-left">
                    <p className="text-slate-400 font-medium uppercase tracking-tight">Weak Topics</p>
                    <p className="font-black text-rose-600 mt-0.5 text-xs">
                      {subject.weakTopicsCount || 0}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium pt-1">
                  <span>Direct Data Stream</span>
                  <span className="group-hover:text-slate-600 transition-colors">Explore Chapters →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TOPIC EXPLORER CONTAINER VIEWPORT */}
      {selectedSubject && (
        <TopicExplorer
          subject={selectedSubject}
          onBackSubject={() => setSelectedSubject(null)}
        />
      )}
    </div>
  );
}

export default SyllabusProgressView;