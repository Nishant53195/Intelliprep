// src/syllabus/components/SyllabusProgressView.jsx
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

  // Dynamic iconography mapping based strictly on subject patterns matching screenshot layers
  const getSubjectIcon = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes("ancient") || lower.includes("art")) return "🏛️";
    if (lower.includes("medieval")) return "🏰";
    if (lower.includes("modern") || lower.includes("polity")) return "⏳";
    if (lower.includes("geography")) return "🗺️";
    if (lower.includes("security") || lower.includes("disaster")) return "🛡️";
    return "📖";
  };

  // Live Query Layer: Preserved completely intact for real-time reactivity
  const enrichedSubjects = useLiveQuery(async () => {
    const onboarding = await db.onboarding_config.toCollection().first();
    const allSubjects = await db.subjects.toArray();
    if (!onboarding) return [];
    
    let filteredSubjects = [];
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

    return await Promise.all(
      filteredSubjects.map(async (subject) => {
        const subtopics = await db.subtopics           .where("subjectId")
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

  // Compute aggregated total progress values for the layout header widget box
  const overallPercentage = enrichedSubjects?.length
    ? Math.round(enrichedSubjects.reduce((acc, curr) => acc + (curr.completionProgress || 0), 0) / enrichedSubjects.length)
    : 0;

  return (
    <div className="space-y-6 text-left font-sans antialiased bg-[#FAFBFD] min-h-screen">
      
      {/* 1. LAYOUT SECTION TITLE AND HIGH-DENSITY METRIC MONITOR OVERLAY */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-2xl font-black text-[#111625] tracking-tight">Syllabus Progress</h2>
          <p className="text-xs font-medium text-slate-400 mt-1 max-w-xl leading-relaxed">
            Review core completion tracking, coverage depth, and subject pacing markers across your profile.
          </p>
        </div>

        {/* OVERALL PROGRESS PROFILE FRAME PIN */}
        <div className="flex items-center bg-white border border-[#E9EFFD] rounded-2xl p-3 shadow-[0_8px_24px_rgba(225,231,245,0.4)] min-w-[240px]">
          <div className="h-10 w-10 rounded-xl bg-[#F0F4FF] flex items-center justify-center text-indigo-600 font-bold shrink-0">
            📈
          </div>
          <div className="ml-3 text-left">
            <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-wide">Overall Progress ({papers.find(p => p.value === activePaper)?.label || "GS I"})</h4>
            <span className="text-xs font-black text-indigo-600 block mt-0.5">{overallPercentage}% Completed</span>
          </div>
        </div>
      </div>

      {/* 2. TAB SEGMENT CHIP RENDER ROW STRATEGY */}
      <div className="flex border-b border-slate-200/60 pb-px gap-1 overflow-x-auto scrollbar-none">
        {papers.map((paper) => {
          const isSelected = activePaper === paper.value;
          return (
            <button
              key={paper.value}
              onClick={() => {
                setActivePaper(paper.value);
                setSelectedSubject(null);
              }}
              className={`text-xs px-4 py-2 font-black transition-all relative border-b-2 -mb-px whitespace-nowrap outline-none ${
                isSelected
                  ? "border-indigo-600 text-indigo-600 bg-[#F0F4FF]/50 rounded-t-xl"
                  : "border-transparent text-slate-400 hover:text-slate-700"
              }`}
            >
              {paper.label}
            </button>
          );
        })}
      </div>

      {/* 3. CORE CONDITIONAL CANVAS SHELL PORT VIEWPORT */}
      {!selectedSubject ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
          {enrichedSubjects?.map((subject) => (
            <div
              key={subject.id}
              onClick={() => setSelectedSubject(subject)}
              className="group bg-white border border-[#EBEFF8] rounded-[2rem] p-5 shadow-[0_10px_30px_rgba(235,240,248,0.4)] hover:shadow-md hover:border-slate-200/80 transition-all duration-200 cursor-pointer relative flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Subject Identity Header Tag */}
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[9px] font-black px-2.5 py-0.5 rounded-md border uppercase tracking-wider bg-[#EDF2FF] border-[#E0E7FF] text-[#4F46E5]">
                    {activePaper === "OPTIONAL" ? "Optional" : "GS Core"}
                  </span>
                  <span className="text-sm font-black text-slate-700">
                    {subject.completionProgress || 0}%
                  </span>
                </div>

                {/* Subject Title Matrix Layout Row */}
                <div className="flex items-center gap-3 pt-1">
                  <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-lg shadow-3xs group-hover:bg-[#F0F4FF] transition-colors shrink-0">
                    {getSubjectIcon(subject.name)}
                  </div>
                  <h3 className="text-sm font-black text-slate-800 tracking-tight leading-tight line-clamp-2">
                    {subject.name}
                  </h3>
                </div>
              </div>

              {/* High Density Score Cells Matrix Blocks */}
              <div className="mt-5 pt-3 border-t border-slate-50 space-y-4">
                <div className="grid grid-cols-2 gap-3 text-left">
                  <div className="rounded-xl bg-[#F8FAFD] border border-[#EFF2F9] p-2.5">
                    <p className="text-[9px] font-extrabold uppercase text-slate-400 tracking-tight">Effective</p>
                    <p className="text-xs font-black text-indigo-600 mt-0.5">
                      {subject.effectiveProgress || 0}%
                    </p>
                  </div>
                  <div className="rounded-xl bg-[#F8FAFD] border border-[#EFF2F9] p-2.5">
                    <p className="text-[9px] font-extrabold uppercase text-slate-400 tracking-tight">Health</p>
                    <p className="text-xs font-black text-emerald-600 mt-0.5">
                      {subject.healthScore || 0}
                    </p>
                  </div>
                  <div className="rounded-xl bg-[#F8FAFD] border border-[#EFF2F9] p-2.5">
                    <p className="text-[9px] font-extrabold uppercase text-slate-400 tracking-tight">Confidence</p>
                    <p className="text-xs font-black text-amber-600 mt-0.5">
                      {subject.confidenceScore || 0}%
                    </p>
                  </div>
                  <div className="rounded-xl bg-[#F8FAFD] border border-[#EFF2F9] p-2.5">
                    <p className="text-[9px] font-extrabold uppercase text-slate-400 tracking-tight">Weak Topics</p>
                    <p className="text-xs font-black text-rose-600 mt-0.5">
                      {subject.weakTopicsCount || 0}
                    </p>
                  </div>
                </div>

                {/* Sub Card Footer Anchors layout row */}
                <div className="flex items-center justify-between text-[10px] font-bold pt-1 text-slate-400 border-t border-slate-50/50">
                  <span className="font-mono">Direct Data Stream</span>
                  <span className="text-indigo-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                    Explore Chapters <span className="text-xs">→</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <TopicExplorer
          subject={selectedSubject}
          onBackSubject={() => setSelectedSubject(null)}
          activePaperLabel={papers.find(p => p.value === activePaper)?.label || "GS I"}
        />
      )}
    </div>
  );
}

export default SyllabusProgressView;