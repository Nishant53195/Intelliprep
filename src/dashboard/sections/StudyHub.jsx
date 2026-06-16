// src/dashboard/sections/StudyHub.jsx
import { useState, useEffect } from "react";
import useLoginStore from "../../login/store/loginStore"; // Access core credential layer
import useDashboardStore from "../store/dashboardStore";
import useScheduleStore from "../../scheduler/store/scheduleStore";
import { generateDailySchedule, getActiveShiftDateString } from "../../scheduler/engine/generateDailySchedule";
import { completeTaskService } from "../../scheduler/services/completeTaskService";
import { db } from "../../database/dexie";
import { ChevronLeft, ChevronRight, Sliders, Activity, Zap, Award } from "lucide-react";

function StudyHub() {
  const user = useLoginStore((state) => state.user); // Checks authenticated user object context
  const { setTodayTasks } = useScheduleStore();
  const [tasks, setTasks] = useState([]);
  const [completedSubtopicIds, setCompletedSubtopicIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [showReflection, setShowReflection] = useState(false);

  // Pagination Track Indexes for Carousel Steps
  const [gsIndex, setGsIndex] = useState(0);
  const [optionalIndex, setOptionalIndex] = useState(0);

  // Extend Session Control Fields
  const [sessionHours, setSessionHours] = useState(1);
  const [extensionSlotChoice, setExtensionSlotChoice] = useState("GS");

  // Reflection Survey Sheet Overlay States
  const [energy, setEnergy] = useState(3);
  const [focus, setFocus] = useState(3);
  const [confidence, setConfidence] = useState(60);
  const [selectedTags, setSelectedTags] = useState([]);

  const obstructionTags = [
    "Phone & Social Media", "Exhaustion & Fatigue", "Anxiety & Stress", 
    "Family Interruptions", "No Conceptual Clarity", "Environment Noise"
  ];

  async function verifyLocalSyllabusSeeding() {
    const subjectCount = await db.subjects.count();
    if (subjectCount === 0) {
      await db.subjects.bulkPut([
        { id: "sub_science_tech", paper: "GS3", name: "SCIENCE & TECHNOLOGY", order: 1, type: "CORE" },
        { id: "sub_optional_maths", paper: "OPTIONAL", name: "MATHEMATICS PAPER 1", order: 2, type: "OPTIONAL" }
      ]);
      await db.topics.bulkPut([
        { id: "top_basic_biology", subjectId: "sub_science_tech", name: "Basic Biology", order: 1, status: "pending" },
        { id: "top_linear_algebra", subjectId: "sub_optional_maths", name: "Linear Algebra", order: 1, status: "pending" }
      ]);
      await db.subtopics.bulkPut([
        { id: "st_nutrients", subjectId: "sub_science_tech", topicId: "top_basic_biology", name: "[Recovery] Nutrients", order: 1, estimatedMinutes: 20, status: "pending" },
        { id: "st_vector_spaces", subjectId: "sub_optional_maths", topicId: "top_linear_algebra", name: "[Recovery] Vector spaces over R and C", order: 1, estimatedMinutes: 45, status: "pending" }
      ]);
      if (user?.uid) {
        await db.onboarding_config.put({
          userId: user.uid,
          completed: true,
          dailyStudyTarget: 6,
          gsSequence: [{ id: "sub_science_tech", name: "Science & Technology" }],
          optionalSequence: [{ id: "top_linear_algebra", name: "Linear Algebra" }]
        });
      }
    }
  }

  // FIXED SYNC SCANNER: Gated precision mapping to isolate active parts from finished chunks
  async function scanAndSyncCompletedKeys() {
    const progressRecords = await db.subtopic_progress.toArray();
    const resolvedSet = new Set();

    for (const record of progressRecords) {
      if (record.subtopicId?.startsWith("SUBJECT_MASTER_ROLLUP_")) continue;

      if (record.status?.toUpperCase() === "COMPLETED") {
        // If 100% complete, safe-keep all chunk variation configurations grayed out
        resolvedSet.add(record.subtopicId);
        for (let i = 1; i <= 10; i++) {
          resolvedSet.add(`${record.subtopicId}_chunk_${i}`);
        }
      } else if (record.status?.toLowerCase() === "chunked" && record.completedChunksCount) {
        // If only chunked, ONLY gray out up to the parts you have actually completed!
        const maxFinishedChunkCount = parseInt(record.completedChunksCount) || 1;
        
        // Part 1 uses the raw core base ID
        resolvedSet.add(record.subtopicId); 
        
        // Parts 2, 3, etc. use explicit chunk suffixes
        for (let i = 2; i <= maxFinishedChunkCount; i++) {
          resolvedSet.add(`${record.subtopicId}_chunk_${i}`);
        }
      }
    }
    setCompletedSubtopicIds(resolvedSet);
    return resolvedSet;
  }

  async function loadTodaySchedule() {
    if (!user?.uid) return;
    try {
      setLoading(true);
      await verifyLocalSyllabusSeeding();
      const activeTasks = await generateDailySchedule(user.uid);
      
      await scanAndSyncCompletedKeys();
      
      setTasks(activeTasks);
      setTodayTasks({
        gsTasks: activeTasks.filter((t) => t.type === "gs"),
        optionalTasks: activeTasks.filter((t) => t.type === "optional"),
        revisionTasks: activeTasks.filter((t) => t.type === "revision"),
        practiceTasks: activeTasks.filter((t) => t.type === "practice"),
      });
    } catch (e) {
      console.error("Failed compiling daily track allocations:", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTodaySchedule();
    const triggerLiveLayoutReload = () => {
      loadTodaySchedule();
    };
    window.addEventListener("syllabus-update", triggerLiveLayoutReload);
    return () => window.removeEventListener("syllabus-update", triggerLiveLayoutReload);
  }, [user]);

  const handleSubtaskComplete = async (task, subtask) => {
    const targetSubtopicId = subtask.subtopicId || subtask.id || null;
    
    try {
      if (targetSubtopicId) {
        setCompletedSubtopicIds(prev => {
          const next = new Set(prev);
          next.add(targetSubtopicId);
          return next;
        });
      }

      await completeTaskService(
        task.id, 
        targetSubtopicId, 
        subtask.topicId || null
      );
      
      await loadTodaySchedule();
    } catch (err) {
      console.error("Could not complete task node:", err);
    }
  };

  const handleReassembleCapacity = async () => {
    if (!user?.uid) return;
    
    try {
      setLoading(true);
      const minutesToAppend = sessionHours * 60;
      
      const updatedTasks = await generateDailySchedule(user.uid, minutesToAppend, extensionSlotChoice);
      alert(`Successfully appended your session extension to your ${extensionSlotChoice} workflow slots!`);
      
      const completedSets = await scanAndSyncCompletedKeys();

      setTasks(updatedTasks);
      setTodayTasks({
        gsTasks: updatedTasks.filter((t) => t.type === "gs"),
        optionalTasks: updatedTasks.filter((t) => t.type === "optional"),
        revisionTasks: updatedTasks.filter((t) => t.type === "revision"),
        practiceTasks: updatedTasks.filter((t) => t.type === "practice"),
      });

      const newGsTask = updatedTasks.find(t => t.type === "gs");
      if (newGsTask && newGsTask.subtasks) {
        const firstPendingGsIndex = newGsTask.subtasks.findIndex(
          st => !completedSets.has(st.subtopicId)
        );
        if (firstPendingGsIndex !== -1) {
          setGsIndex(firstPendingGsIndex); 
        }
      }

      const newOptionalTask = updatedTasks.find(t => t.type === "optional");
      if (newOptionalTask && newOptionalTask.subtasks) {
        const firstPendingOptIndex = newOptionalTask.subtasks.findIndex(
          st => !completedSets.has(st.subtopicId)
        );
        if (firstPendingOptIndex !== -1) {
          setOptionalIndex(firstPendingOptIndex); 
        }
      }

    } catch (err) {
      console.error("Extension assembly execution error:", err);
    } finally {
      setTimeout(async () => {
        const { refreshTodayTasks } = await import("../../scheduler/services/refreshTodayTasks");
        await refreshTodayTasks(user.uid);
        setLoading(false);
      }, 150);
    }
  };

  const handleLogReflection = async () => {
    try {
      const todayDate = getActiveShiftDateString();
      await db.reflections.put({
        id: `ref_${Date.now()}`, userId: user.uid, date: todayDate,
        energyLevel: parseInt(energy), focusQuality: parseInt(focus),
        confidenceScore: parseInt(confidence), distractions: selectedTags
      });
      for (const task of tasks) {
        await db.schedule_tasks.update(task.id, { status: "closed", closedAt: Date.now() });
      }
      setShowReflection(false);
      setGsIndex(0);
      setOptionalIndex(0);
      await loadTodaySchedule();
    } catch (err) {
      console.error("Failed saving profile performance markers:", err);
    }
  };

  const calculateHoursToFiveAM = () => {
    const now = new Date();
    const currentHour = now.getHours();
    let targetFiveAM = new Date();
    targetFiveAM.setHours(5, 0, 0, 0);
    if (currentHour >= 5) {
      targetFiveAM.setDate(targetFiveAM.getDate() + 1);
    }
    const diffMs = targetFiveAM.getTime() - now.getTime();
    return Math.max(1, Math.min(3, Math.floor(diffMs / (1000 * 60 * 60))));
  };

  const maxAllowedExtensionHours = calculateHoursToFiveAM();

  const gsTask = tasks.find(t => t.type === "gs");
  const optionalTask = tasks.find(t => t.type === "optional");
  const revisionTask = tasks.find(t => t.type === "revision");

  const currentGsSubtask = gsTask?.subtasks?.[Math.min(gsIndex, gsTask.subtasks.length - 1)] || null;
  const currentOptionalSubtask = optionalTask?.subtasks?.[Math.min(optionalIndex, optionalTask.subtasks.length - 1)] || null;

  // Real-time calculated status checks inside matching sets
  const isGsSubtaskDone = currentGsSubtask && (
    completedSubtopicIds.has(currentGsSubtask.subtopicId) ||
    gsTask?.status?.toUpperCase() === "COMPLETED"
  );

  const isOptionalSubtaskDone = currentOptionalSubtask && (
    completedSubtopicIds.has(currentOptionalSubtask.subtopicId) ||
    optionalTask?.status?.toUpperCase() === "COMPLETED"
  );

  const isGsSlotDone = !gsTask || gsTask.status?.toUpperCase() === "COMPLETED";
  const isOptionalSlotDone = !optionalTask || optionalTask.status?.toUpperCase() === "COMPLETED";
  const isMidnightLockActive = tasks.length === 0;

  const toggleTag = (tag) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  if (loading) return <div className="py-12 text-center text-xs text-slate-400 font-mono">Loading Operating System...</div>;

  return (
    <div className="space-y-6 text-left font-sans antialiased bg-[#FAFBFD] min-h-screen p-2">
      
      {/* 1. ROW HEADER LAYOUT GRID WITH TODAY'S MISSION CARD PANEL CONTAINER */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-[#101726] tracking-tight">Daily Target Router</h2>
          <p className="text-sm font-medium text-slate-400 mt-1">
            Track your structured preparation timelines inside clean workflow blocks.
          </p>
        </div>

        {/* TODAY'S MISSION INTERACTIVE WIDGET PANEL */}
        <div className="flex items-center bg-white border border-[#E9EFFD] rounded-3xl p-4 shadow-[0_10px_30px_rgba(223,230,245,0.4)] w-full lg:w-auto lg:min-w-[340px]">
          <div className="flex items-center justify-center h-12 w-12 rounded-2xl bg-[#F0F4FF] text-xl shrink-0">
            🎯
          </div>
          <div className="ml-4 flex-1">
            <h4 className="text-[11px] font-extrabold tracking-wider uppercase text-slate-400">Today's Mission</h4>
            <div className="flex items-center gap-3 mt-1.5 text-[11px] font-bold text-slate-500">
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#3FA2F6]" /> GS Slot</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#6366F1]" /> Optional Slot</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#F97316]" /> Revision Slot</span>
            </div>
          </div>
          <div className="pl-4 ml-2 border-l border-slate-100 text-right min-w-[70px]">
            <span className="text-base font-black text-[#4F46E5] block leading-none">3 Active</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight block mt-1">Targets</span>
          </div>
        </div>
      </div>

      {/* 2. THE MAIN 2X2 CORE STUDY BLOCK GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* SLOT A: GENERAL STUDIES TRACK */}
        <div className="relative bg-white border border-[#EBEFF8] rounded-[2.25rem] p-6 shadow-[0_12px_40px_rgba(235,240,248,0.5)] flex flex-col justify-between min-h-[230px] group transition-all duration-300 hover:shadow-md">
          {/* Navigation Slider Arrows */}
          {gsTask?.subtasks?.length > 1 && (
            <>
              <button disabled={gsIndex === 0} onClick={() => setGsIndex(p => Math.max(0, p - 1))} className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 disabled:opacity-0 transition-opacity">
                <ChevronLeft size={18} strokeWidth={2.5} />
              </button>
              <button disabled={gsIndex >= gsTask.subtasks.length - 1} onClick={() => setGsIndex(p => p + 1)} className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 disabled:opacity-0 transition-opacity">
                <ChevronRight size={18} strokeWidth={2.5} />
              </button>
            </>
          )}

          <div className={gsTask?.subtasks?.length > 1 ? "px-6" : ""}>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-0.5 rounded-md bg-[#EDF5FF] border border-[#DBE9FF] text-[#1E75FF]">
                GS Slot
              </span>
              <span className="text-xs font-mono font-bold text-slate-500">
                {gsIndex + 1} / {gsTask?.subtasks?.length || 9}
              </span>
            </div>

            {currentGsSubtask ? (
              <div className={`mt-5 space-y-1.5 relative pr-16 transition-opacity ${isGsSubtaskDone ? "opacity-40" : ""}`}>
                <p className="text-[11px] font-extrabold text-[#1E75FF] tracking-wider uppercase">
                  {currentGsSubtask.subjectName}
                </p>
                <h3 className="text-xl font-black text-[#1E2538] tracking-tight leading-snug">
                  {currentGsSubtask.topicName}
                </h3>
                <p className="text-xs text-slate-500 font-medium tracking-wide">
                  {currentGsSubtask.subtopicName}
                </p>

                {/* Vector Biology DNA Helix SVG Embedded Artwork */}
                <svg className="absolute right-0 top-[-10px] h-20 w-20 text-blue-500/10 pointer-events-none select-none" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M20,20 Q35,50 50,50 T80,80" />
                  <path d="M20,80 Q35,50 50,50 T80,20" />
                  <line x1="26" y1="32" x2="26" y2="68" />
                  <line x1="38" y1="44" x2="38" y2="56" />
                  <line x1="62" y1="56" x2="62" y2="44" />
                  <line x1="74" y1="68" x2="74" y2="32" />
                  <circle cx="26" cy="32" r="2" fill="currentColor" /><circle cx="26" cy="68" r="2" fill="currentColor" />
                  <circle cx="38" cy="44" r="2" fill="currentColor" /><circle cx="38" cy="56" r="2" fill="currentColor" />
                  <circle cx="62" cy="44" r="2" fill="currentColor" /><circle cx="62" cy="56" r="2" fill="currentColor" />
                  <circle cx="74" cy="32" r="2" fill="currentColor" /><circle cx="74" cy="68" r="2" fill="currentColor" />
                </svg>
              </div>
            ) : (
              <p className="text-xs text-slate-400 font-bold italic py-8 text-center">Block Stream Finished</p>
            )}
          </div>

          <div className={`mt-5 pt-4 border-t border-slate-100 flex items-center justify-between ${gsTask?.subtasks?.length > 1 ? "px-6" : ""}`}>
            <span className="text-[11px] font-mono font-bold text-[#1E75FF] bg-[#EDF5FF] border border-[#DBE9FF] px-2.5 py-0.5 rounded-lg flex items-center gap-1">
              ⏱️ {currentGsSubtask?.duration || 20} Mins
            </span>
            
            <button
              disabled={isGsSlotDone || !currentGsSubtask || isGsSubtaskDone}
              onClick={() => handleSubtaskComplete(gsTask, currentGsSubtask)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all shadow-3xs flex items-center gap-1 ${
                isGsSubtaskDone
                  ? "bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                  : "bg-[#EFF4FF] hover:bg-[#E2ECFF] text-[#1E75FF]"
              }`}
            >
              {isGsSubtaskDone ? "✓ Completed" : "📋 Mark Complete"}
            </button>
          </div>
        </div>

        {/* SLOT B: OPTIONAL SUBJECT TRACK */}
        <div className="relative bg-white border border-[#EBEFF8] rounded-[2.25rem] p-6 shadow-[0_12px_40px_rgba(235,240,248,0.5)] flex flex-col justify-between min-h-[230px] group transition-all duration-300 hover:shadow-md">
          {/* Navigation Slider Arrows */}
          {optionalTask?.subtasks?.length > 1 && (
            <>
              <button disabled={optionalIndex === 0} onClick={() => setOptionalIndex(p => Math.max(0, p - 1))} className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 disabled:opacity-0 transition-opacity">
                <ChevronLeft size={18} strokeWidth={2.5} />
              </button>
              <button disabled={optionalIndex >= optionalTask.subtasks.length - 1} onClick={() => setOptionalIndex(p => p + 1)} className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 disabled:opacity-0 transition-opacity">
                <ChevronRight size={18} strokeWidth={2.5} />
              </button>
            </>
          )}

          <div className={optionalTask?.subtasks?.length > 1 ? "px-6" : ""}>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-0.5 rounded-md bg-[#F0EFFF] border border-[#E0DDFF] text-[#5851ED]">
                Optional Slot
              </span>
              <span className="text-xs font-mono font-bold text-slate-500">
                {optionalIndex + 1} / {optionalTask?.subtasks?.length || 3}
              </span>
            </div>

            {currentOptionalSubtask ? (
              <div className={`mt-5 space-y-1.5 relative pr-16 transition-opacity ${isOptionalSubtaskDone ? "opacity-40" : ""}`}>
                <p className="text-[11px] font-extrabold text-[#5851ED] tracking-wider uppercase">
                  {currentOptionalSubtask.subjectName}
                </p>
                <h3 className="text-xl font-black text-[#1E2538] tracking-tight leading-snug">
                  {currentOptionalSubtask.topicName}
                </h3>
                <p className="text-xs text-slate-500 font-medium tracking-wide">
                  {currentOptionalSubtask.subtopicName}
                </p>

                {/* Geometric Node Network Vector Polytope Embedded Artwork */}
                <svg className="absolute right-0 top-[-10px] h-20 w-20 text-indigo-500/10 pointer-events-none select-none" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polygon points="50,15 80,35 80,65 50,85 20,65 20,35" />
                  <polygon points="50,30 70,43 70,57 50,70 30,57 30,43" />
                  <line x1="50" y1="15" x2="50" y2="30" />
                  <line x1="80" y1="35" x2="70" y2="43" />
                  <line x1="80" y1="65" x2="70" y2="57" />
                  <line x1="50" y1="85" x2="50" y2="70" />
                  <line x1="20" y1="65" x2="30" y2="57" />
                  <line x1="20" y1="35" x2="30" y2="43" />
                </svg>
              </div>
            ) : (
              <p className="text-xs text-slate-400 font-bold italic py-8 text-center">Block Stream Finished</p>
            )}
          </div>

          <div className={`mt-5 pt-4 border-t border-slate-100 flex items-center justify-between ${optionalTask?.subtasks?.length > 1 ? "px-6" : ""}`}>
            <span className="text-[11px] font-mono font-bold text-[#5851ED] bg-[#F0EFFF] border border-[#E0DDFF] px-2.5 py-0.5 rounded-lg flex items-center gap-1">
              ⏱️ {currentOptionalSubtask?.duration || 45} Mins
            </span>
            
            <button
              disabled={isOptionalSlotDone || !currentOptionalSubtask || isOptionalSubtaskDone}
              onClick={() => handleSubtaskComplete(optionalTask, currentOptionalSubtask)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all shadow-3xs flex items-center gap-1 ${
                isOptionalSubtaskDone
                  ? "bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                  : "bg-[#F4F3FF] hover:bg-[#EBE9FF] text-[#5851ED]"
              }`}
            >
              {isOptionalSubtaskDone ? "✓ Completed" : "📋 Mark Complete"}
            </button>
          </div>
        </div>

        {/* SLOT C: REVISION SLOT STATUS CARD */}
        <div className="bg-white border border-[#EBEFF8] rounded-[2.25rem] p-6 shadow-[0_12px_40px_rgba(235,240,248,0.5)] text-center flex flex-col justify-between min-h-[170px]">
          <div className="text-left">
            <span className="text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-0.5 rounded-md bg-[#FFF3EB] border border-[#FFE1CC] text-[#E26200]">
              Revision Slot
            </span>
          </div>
          <div className="py-2">
            <div className="h-10 w-10 rounded-2xl bg-[#FFF6F0] text-[#E26200] flex items-center justify-center mx-auto text-lg border border-[#FFE7DB] shadow-3xs mb-2">
              📙
            </div>
            
            {revisionTask && revisionTask.subtasks?.length > 0 && revisionTask.status?.toUpperCase() !== "COMPLETED" ? (
              <div className="space-y-3 max-h-[180px] overflow-y-auto px-2">
                {revisionTask.subtasks.map((sub, idx) => {
                  const isMacroCycle = sub.subtopicId?.startsWith("SUBJECT_MASTER_ROLLUP_");
                  
                  return (
                    <div key={sub.revisionId || idx} className="text-left p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between">
                      <div className="flex-1 min-w-0 pr-2">
                        {isMacroCycle ? (
                          <>
                            <h5 className="text-sm font-black text-[#1E2538] tracking-tight truncate">
                              {sub.topicName}
                            </h5>
                            <p className="text-[11px] font-mono font-bold text-[#E26200] mt-0.5 uppercase tracking-wide">
                              {sub.subtopicName}
                            </p>
                          </>
                        ) : (
                          <>
                            <h5 className="text-sm font-black text-[#1E2538] tracking-tight truncate">
                              {sub.subtopicName}
                            </h5>
                            <p className="text-[10px] font-medium text-slate-400 mt-0.5">
                              Spaced Repetition Review
                            </p>
                          </>
                        )}
                      </div>
                      
                      <button
                        onClick={() => handleSubtaskComplete(revisionTask, sub)}
                        className="px-3 py-1.5 text-[10px] font-extrabold bg-white border border-[#FFE1CC] text-[#E26200] hover:bg-[#FFF6F0] rounded-lg transition-colors shrink-0"
                      >
                        ✓ Complete
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <>
                <h4 className="text-base font-black text-[#1E2538] tracking-tight">Block Stream Finished</h4>
                <p className="text-xs font-medium text-slate-400 mt-0.5">Great job! Keep the momentum going.</p>
              </>
            )}
          </div>
          <div className="border-t border-slate-50 pt-2 text-[10px] text-slate-400 font-mono">
            Active Spaced Repetition Retentions Clear
          </div>
        </div>

        {/* SLOT D: COMPILATION PRACTICE SLOT CARD */}
        <div className="bg-[#F3F5FA]/50 border border-slate-200/60 rounded-[2.25rem] p-6 flex flex-col justify-between min-h-[170px] relative overflow-hidden select-none opacity-50">
          <div className="text-left">
            <span className="text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-400 border border-slate-200">
              PRACTICE TASKS (DISABLED)
            </span>
          </div>
          <div className="text-left relative pr-16">
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">PRACTICE SUITE</p>
            <h4 className="text-base font-black text-slate-600 tracking-tight mt-0.5">MCQ / PYQ / Mains Logs</h4>
            <p className="text-xs font-medium text-slate-400 mt-0.5">Splitting evenly across compilation targets</p>
            
            <svg className="absolute right-0 top-[-5px] h-14 w-14 text-slate-400/20 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
            </svg>
          </div>
          <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-400">⏱️ 60 Mins</span>
            <button disabled className="px-3 py-1 bg-slate-100 text-slate-400 text-[10px] font-black border border-slate-200 rounded-lg flex items-center gap-1 cursor-not-allowed">
              🔒 Disabled
            </button>
          </div>
        </div>
      </div>

      {/* 3. HORIZONTAL RUNTIME WORKFLOW COMMIT ACTION COMMAND BUTTONS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <button className="py-3.5 bg-white hover:bg-slate-50 border border-[#DCE3FA] text-xs font-black text-slate-700 rounded-2xl transition-all shadow-2xs flex items-center justify-center gap-2">
          🔄 Regenerate Schedule
        </button>
        <button 
          disabled={isMidnightLockActive}
          onClick={() => setShowReflection(true)}
          className={`py-3.5 text-xs font-black rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 ${isMidnightLockActive ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none" : "bg-[#2A52BE] hover:bg-[#1E3F96] text-white"}`}
        >
          📅 End the Day
        </button>
      </div>

      {/* 4. EXTEND STUDY STUDY SESSION TIMELINE PARAMETERS DOCK OVERLAY */}
      <div className="bg-white border border-[#E9EFFD] rounded-2xl p-4 shadow-[0_8px_30px_rgba(223,230,245,0.3)]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="text-left flex items-center gap-2.5 shrink-0">
            <div className="h-9 w-9 rounded-xl bg-[#F6F4FF] text-[#6366F1] text-lg font-bold flex items-center justify-center border border-[#EBE6FF] shadow-3xs">
              ⏰
            </div>
            <div>
              <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Extend Session</h3>
              <p className="text-[10px] font-bold text-amber-600 uppercase tracking-tight">Pending target locks active</p>
            </div>
          </div>

          <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full">
            <div className="flex-1 flex items-center gap-3 bg-[#F8FAFD] border border-slate-200/50 px-4 py-2 rounded-xl">
              <input
                type="range"
                min="1"
                max={maxAllowedExtensionHours || 3}
                step="1"
                disabled={isMidnightLockActive}
                value={sessionHours}
                onChange={(e) => setSessionHours(parseInt(e.target.value))}
                className="flex-1 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#4F46E5] disabled:cursor-not-allowed"
              />
              <span className="shrink-0 text-xs font-mono font-black text-[#4F46E5] bg-white border border-slate-200 px-2 py-0.5 rounded shadow-3xs min-w-[50px] text-center">
                +{sessionHours}h
              </span>
            </div>

            <select
              disabled={isMidnightLockActive}
              value={extensionSlotChoice}
              onChange={(e) => setExtensionSlotChoice(e.target.value)}
              className="text-xs font-bold text-slate-600 bg-white border border-[#DCE3FA] rounded-xl px-3 py-2.5 outline-none focus:border-indigo-500 cursor-pointer shadow-3xs min-w-[130px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="GS">GS Slot</option>
              <option value="OPTIONAL">Optional Slot</option>
              <option value="BOTH">Split Balanced</option>
            </select>

            <button
              disabled={isMidnightLockActive}
              onClick={handleReassembleCapacity}
              className="px-6 py-2.5 bg-[#101726] hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-400 text-white font-black text-xs rounded-xl transition-all shadow-2xs shrink-0 disabled:cursor-not-allowed"
            >
              Add Time
            </button>
          </div>
        </div>
      </div>

      {/* 5. METRIC EVALUATION SURVEY MODAL SHEET DRAWER */}
      {showReflection && (
        <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 w-full max-w-md rounded-[2.5rem] p-6 space-y-5 shadow-2xl text-left animate-in fade-in zoom-in-95 duration-150">
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight">Daily Reflection Log</h3>
              <p className="text-xs font-medium text-slate-400 mt-0.5">Save your operational parameters to assess sustainability profiles.</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-600 flex items-center gap-1"><Zap size={13} className="text-amber-500"/> Energy Level</span>
                  <span className="text-indigo-600 font-extrabold">{energy}/5</span>
                </div>
                <input type="range" min="1" max="5" value={energy} onChange={e => setEnergy(e.target.value)} className="w-full accent-indigo-600 bg-slate-100 h-1 rounded-lg" />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-600 flex items-center gap-1"><Activity size={13} className="text-indigo-500"/> Focus Quality</span>
                  <span className="text-indigo-600 font-extrabold">{focus}/5</span>
                </div>
                <input type="range" min="1" max="5" value={focus} onChange={e => setFocus(e.target.value)} className="w-full accent-indigo-600 bg-slate-100 h-1 rounded-lg" />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-600 flex items-center gap-1"><Award size={13} className="text-cyan-500"/> Confidence Profile</span>
                  <span className="text-indigo-600 font-extrabold">{confidence}%</span>
                </div>
                <input type="range" min="0" max="100" value={confidence} onChange={e => setConfidence(e.target.value)} className="w-full accent-indigo-600 bg-slate-100 h-1 rounded-lg" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Primary Obstructions Today</label>
                <div className="flex flex-wrap gap-1.5">
                  {obstructionTags.map(tag => (
                    <button key={tag} type="button" onClick={() => toggleTag(tag)} className={`text-[10px] font-bold px-2.5 py-1.5 rounded-xl transition-all border ${selectedTags.includes(tag) ? "bg-cyan-50 border-cyan-300 text-cyan-700 font-extrabold" : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100"}`}>{tag}</button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2.5 pt-3 border-t border-slate-100">
              <button onClick={() => setShowReflection(false)} className="flex-1 py-2.5 bg-slate-50 border border-slate-200 text-xs font-bold text-slate-600 rounded-xl hover:bg-slate-100 transition-colors">
                Cancel
              </button>
              <button onClick={handleLogReflection} className="flex-1 py-2.5 bg-indigo-600 text-xs font-bold text-white rounded-xl hover:bg-indigo-700 transition-all shadow-md">
                Log and Close Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudyHub;