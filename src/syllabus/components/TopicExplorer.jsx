// src/syllabus/components/TopicExplorer.jsx
import { useState, useMemo } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../database/dexie";
import useTopicIntelligenceMap from "../hooks/useTopicIntelligenceMap";
import useScheduleStore from "../../scheduler/store/scheduleStore"; 

function TopicExplorer({ subject, onBackSubject }) {
  const [selectedTopic, setSelectedTopic] = useState(null);
  
  // Track ongoing tasks from your global state store cleanly without falling back in the selector
  const todayTasks = useScheduleStore((state) => state.todayTasks);
  const ongoingTasks = todayTasks || {};

  /* --------------------------
     TOPICS LIVE QUERY
     -------------------------- */
  const topics = useLiveQuery(
    async () => {
      if (!subject) return [];
      return db.topics
        .where("subjectId")
        .equals(subject.id)
        .sortBy("order");
    },
    [subject]
  ) || [];

  /* --------------------------
     ALL SUBTOPICS (For Calculating Real Topic Percentages)
     -------------------------- */
  const allSubtopics = useLiveQuery(
    async () => {
      if (!subject) return [];
      return db.subtopics.where("subjectId").equals(subject.id).toArray();
    },
    [subject]
  ) || [];

  /* --------------------------
     TOPIC INTELLIGENCE MAP
     -------------------------- */
  const topicIds = useMemo(() => {
    return topics.map((t) => t.id).filter(Boolean);
  }, [topics]);

  const intelligenceMap = useTopicIntelligenceMap(topicIds) || {};

  /* --------------------------
     ACTIVE SUBTOPICS LIVE QUERY
     -------------------------- */
  const subtopics = useLiveQuery(
    async () => {
      if (!selectedTopic) return [];
      return db.subtopics
        .where("topicId")
        .equals(selectedTopic.id)
        .sortBy("order");
    },
    [selectedTopic]
  ) || [];

  // Verifies if a specific topic ID contains subtasks actively scheduled for today
  const isTopicInOngoingSchedule = (topicId) => {
    if (!ongoingTasks) return false;
    
    const allOngoingSubtasks = [
      ...(ongoingTasks.gsTasks || []),
      ...(ongoingTasks.optionalTasks || []),
      ...(ongoingTasks.revisionTasks || []),
      ...(ongoingTasks.practiceTasks || [])
    ].flatMap(task => task.subtasks || []);

    return allOngoingSubtasks.some(subtask => subtask.topicId === topicId);
  };

  // Dynamically computes a real topic's progress percentage instead of showing a hardcoded 0%
  const calculateTopicProgress = (topicId, topicStatus) => {
    if (topicStatus === "COMPLETED") return 100;
    
    const relevantSubtopics = allSubtopics.filter(st => st.topicId === topicId);
    if (relevantSubtopics.length === 0) return 0;
    
    const completedCount = relevantSubtopics.filter(st => st.status === "COMPLETED").length;
    return Math.round((completedCount / relevantSubtopics.length) * 100);
  };

  return (
    <div className="space-y-5 text-left">
      
      {/* PATHWAY BREADCRUMBS CHIPS */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <button
          onClick={onBackSubject}
          className="rounded-xl bg-[#E8EEFF] border border-[#D0DFFA] px-3.5 py-1.5 text-xs font-black text-indigo-700 flex items-center gap-1 hover:bg-[#D9E6FF] transition-colors"
        >
          🏛️ {subject?.name || "Macro Subject Segment"}
        </button>
        {selectedTopic && (
          <button
            onClick={() => setSelectedTopic(null)}
            className="rounded-xl bg-[#F1F5F9] border border-slate-200 px-3.5 py-1.5 text-xs font-black text-slate-700 flex items-center gap-1 hover:bg-slate-200 transition-colors"
          >
            🔨 {selectedTopic.name}
          </button>
        )}
      </div>

      {/* ==========================================
          TOPICS CHANNELS VIEW SCREEN
          ========================================== */}
      {!selectedTopic && (
        <div className="space-y-4">
          <div className="pl-1">
            <h3 className="text-xl font-black text-slate-800 tracking-tight">{subject?.name}</h3>
            <p className="text-xs font-semibold text-slate-400 mt-0.5">{topics.length} chapters inside this section</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {topics.map((topic) => {
              const completed = topic.status === "COMPLETED";
              const inProgress = !completed && isTopicInOngoingSchedule(topic.id);

              const realProgressPercent = calculateTopicProgress(topic.id, topic.status);

              const intelligence = intelligenceMap ? intelligenceMap[topic.id] : null;
              const highDecay = intelligence?.decayRisk >= 70;
              const highImportance = intelligence?.importanceScore >= 80;

              let statusLabel = "Pending";
              let statusClass = "bg-slate-50 border-slate-200 text-slate-400";
              
              if (completed) {
                statusLabel = "Completed";
                statusClass = "bg-emerald-50 border-emerald-100 text-emerald-700";
              } else if (inProgress) {
                statusLabel = "In Progress";
                statusClass = "bg-blue-50 border-blue-100 text-blue-600";
              }

              return (
                <div
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic)}
                  className="relative group bg-white border border-[#EBEFF8] rounded-2xl p-5 shadow-[0_8px_24px_rgba(235,240,248,0.35)] hover:shadow-md hover:border-slate-200 transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[160px]"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div className="h-8 w-8 rounded-lg bg-[#F0F4FF] text-indigo-600 flex items-center justify-center text-sm shrink-0">
                        {completed ? "🏛️" : "📖"}
                      </div>
                      
                      <span className="text-[11px] font-mono font-black text-slate-600 shrink-0 bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded">
                        {realProgressPercent}%
                      </span>
                    </div>

                    <h4 className="text-xs font-black text-slate-800 tracking-tight leading-snug pt-1 group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {topic.name}
                    </h4>

                    {/* INTELLIGENCE PARAMETER TAGS */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {highImportance && (
                        <span className="text-[8px] font-black tracking-wide uppercase px-1.5 py-0.5 rounded bg-indigo-50 border border-indigo-100 text-indigo-600">
                          CRITICAL CORE
                        </span>
                      )}
                      {highDecay && (
                        <span className="text-[8px] font-black tracking-wide uppercase px-1.5 py-0.5 rounded bg-rose-50 border border-rose-100 text-rose-600">
                          DECAY RISK
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-2 border-t border-slate-50 flex items-center justify-between">
                    <span className={`text-[10px] font-black tracking-wide uppercase px-2.5 py-0.5 rounded-full border ${statusClass}`}>
                      • {statusLabel}
                    </span>

                    <div className="h-6 w-6 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                      <span className="text-xs font-bold font-mono">→</span>
                    </div>
                  </div>

                  {inProgress && (
                    <div className="absolute bottom-0 left-5 right-5 h-[3px] bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full w-[35%] bg-blue-500 rounded-full" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ==========================================
          SUBTOPICS MODULE SCREEN
          ========================================== */}
      {selectedTopic && (
        <div className="space-y-4">
          <div className="pl-1">
            <h3 className="text-xl font-black text-slate-800 tracking-tight">{selectedTopic.name}</h3>
            <p className="text-xs font-semibold text-slate-400 mt-0.5">{subtopics.length} conceptual items in this module</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {subtopics.map((subtopic) => {
              const completed = subtopic.status === "COMPLETED";
              
              const adjustedMinutes = subtopic.estimatedMinutes || 45;

              return (
                <div
                  key={subtopic.id}
                  className="relative group bg-white border border-[#EBEFF8] rounded-2xl p-4 shadow-[0_8px_24px_rgba(235,240,248,0.35)] flex flex-col justify-between min-h-[125px] transition-all"
                >
                  {completed && (
                    <div className="absolute top-0 right-4 h-4 w-2.5 bg-indigo-500 rounded-b-xs shadow-3xs" />
                  )}

                  <div className="space-y-3">
                    <div className="h-7 w-7 rounded-lg bg-[#F0F4FF] text-indigo-600 flex items-center justify-center text-xs font-bold shrink-0">
                      {completed ? "⏳" : "🧭"}
                    </div>
                    <p className="text-xs font-black text-slate-700 tracking-tight leading-snug line-clamp-2">
                      {subtopic.name}
                    </p>
                  </div>

                  <div className="mt-4 pt-2 border-t border-slate-50 flex items-center justify-between">
                    <span className={`text-[9px] font-black tracking-wide uppercase px-2.5 py-0.5 rounded-full border ${
                      completed 
                        ? "bg-indigo-50 border-indigo-100 text-indigo-700" 
                        : "bg-slate-50 border-slate-150 text-slate-400"
                    }`}>
                      • {completed ? "Completed" : "Pending"}
                    </span>

                    {/* FIXED: Scaled up font-size, tracking-weight, and padding adjustments for a cleaner, larger look */}
                    <div className="text-[12px] font-mono font-black text-slate-700 bg-slate-100/80 border border-slate-200/60 px-2 py-0.5 rounded-md shadow-2xs">
                      {adjustedMinutes}m
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default TopicExplorer;