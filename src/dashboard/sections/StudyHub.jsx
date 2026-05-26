import { useState, useEffect } from "react";
import useLoginStore from "../../login/store/loginStore";
import useDashboardStore from "../store/dashboardStore";
import useScheduleStore from "../../scheduler/store/scheduleStore";
import { generateDailySchedule, getActiveShiftDateString } from "../../scheduler/engine/generateDailySchedule";
import { completeTaskService } from "../../scheduler/services/completeTaskService";
import { db } from "../../database/dexie";
import { ChevronLeft, ChevronRight, Activity, Zap, Award, Sliders } from "lucide-react";

function StudyHub() {
  const user = useLoginStore((state) => state.user);
  const setActiveTab = useDashboardStore((state) => state.setActiveTab);
  const { setTodayTasks } = useScheduleStore();

  const [tasks, setTasks] = useState([]);
  const [completedSubtopicIds, setCompletedSubtopicIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [showReflection, setShowReflection] = useState(false);
  
  const [gsIndex, setGsIndex] = useState(0);
  const [optionalIndex, setOptionalIndex] = useState(0);
  const [revIndex, setRevIndex] = useState(0);
  
  const [sessionHours, setSessionHours] = useState(1);
  const [extensionSlotChoice, setExtensionSlotChoice] = useState("GS");

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
        { id: "sub_polity", paper: "GS2", name: "Indian Polity & Governance", order: 1, type: "CORE" },
        { id: "sub_history", paper: "GS1", name: "Modern Indian History", order: 2, type: "CORE" },
        { id: "sub_optional_maths", paper: "OPTIONAL", name: "Mathematics Optional Paper I", order: 1, type: "OPTIONAL" }
      ]);

      await db.topics.bulkPut([
        { id: "top_fundamental_rights", subjectId: "sub_polity", name: "Fundamental Rights Structure", order: 1, status: "pending" },
        { id: "top_revolt_1857", subjectId: "sub_history", name: "The Uprising Crisis of 1857", order: 1, status: "pending" },
        { id: "top_linear_algebra", subjectId: "sub_optional_maths", name: "Linear Algebra Matrices", order: 1, status: "pending" },
        { id: "top_calculus", subjectId: "sub_optional_maths", name: "Calculus & Analytic Geometry", order: 2, status: "pending" }
      ]);

      await db.subtopics.bulkPut([
        { id: "st_article_14", subjectId: "sub_polity", topicId: "top_fundamental_rights", name: "Article 14: Parameters of Equality Before Law", order: 1, estimatedMinutes: 40, status: "pending" },
        { id: "st_article_19", subjectId: "sub_polity", topicId: "top_fundamental_rights", name: "Article 19: Protection of Expression Rights", order: 2, estimatedMinutes: 50, status: "pending" },
        { id: "st_causes_revolt", subjectId: "sub_history", topicId: "top_revolt_1857", name: "Socio-Political & Economic Trigger Factors", order: 1, estimatedMinutes: 60, status: "pending" },
        { id: "st_matrix_rank", subjectId: "sub_optional_maths", topicId: "top_linear_algebra", name: "Vector Spaces and Rank-Nullity Theorem", order: 1, estimatedMinutes: 45, status: "pending" },
        { id: "st_eigenvalues", subjectId: "sub_optional_maths", topicId: "top_linear_algebra", name: "Eigenvalues and Characteristic Polynomials", order: 2, estimatedMinutes: 45, status: "pending" }
      ]);

      if (user?.uid) {
        await db.onboarding_config.put({
          userId: user.uid,
          completed: true,
          dailyStudyTarget: 6,
          gsSequence: [
            { id: "sub_polity", name: "Indian Polity & Governance" },
            { id: "sub_history", name: "Modern Indian History" }
          ],
          optionalSequence: [
            { id: "top_linear_algebra", name: "Linear Algebra Matrices" },
            { id: "top_calculus", name: "Calculus & Analytic Geometry" }
          ]
        });
      }
    }
  }

  async function loadTodaySchedule() {
    if (!user?.uid) return;
    try {
      setLoading(true);
      await verifyLocalSyllabusSeeding();
      const activeTasks = await generateDailySchedule(user.uid);
      
      const progresses = await db.subtopic_progress
        .filter(p => p.status?.toUpperCase() === "COMPLETED")
        .toArray();
      setCompletedSubtopicIds(new Set(progresses.map(p => p.subtopicId)));
      
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
    const triggerLiveLayoutReload = () => { loadTodaySchedule(); };
    window.addEventListener("syllabus-update", triggerLiveLayoutReload);
    return () => window.removeEventListener("syllabus-update", triggerLiveLayoutReload);
  }, [user]);

  const handleSubtaskComplete = async (task, subtask) => {
    try {
      if (task.type === "revision" && subtask.revisionId) {
        await db.revisions.update(subtask.revisionId, {
          status: "COMPLETED",
          completedAt: Date.now()
        });
      }

      await completeTaskService(task.id, subtask.subtopicId || null, subtask.topicId || null);
      await loadTodaySchedule();
    } catch (err) {
      console.error("Could not complete task node:", err);
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
      setRevIndex(0);
      alert("Day logged successfully! Routine lock active until midnight.");
      await loadTodaySchedule();
    } catch (err) {
      console.error("Failed archiving metrics or transferring missed blocks:", err);
    }
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
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
    const hoursLeft = Math.floor(diffMs / (1000 * 60 * 60));
    
    return Math.max(1, Math.min(3, hoursLeft));
  };

  const maxAllowedExtensionHours = calculateHoursToFiveAM();

  const gsTask = tasks.find(t => t.type === "gs");
  const optionalTask = tasks.find(t => t.type === "optional");
  const revisionTask = tasks.find(t => t.type === "revision");
  const practiceTask = tasks.find(t => t.type === "practice");

  const currentGsSubtask = gsTask && gsTask.subtasks ? gsTask.subtasks[Math.min(gsIndex, gsTask.subtasks.length - 1)] : null;
  const currentOptionalSubtask = optionalTask && optionalTask.subtasks ? optionalTask.subtasks[Math.min(optionalIndex, optionalTask.subtasks.length - 1)] : null;

  const isGsSlotDone = tasks.length === 0 || gsTask?.status?.toUpperCase() === "COMPLETED";
  const isOptionalSlotDone = tasks.length === 0 || optionalTask?.status?.toUpperCase() === "COMPLETED";
  const isRevisionSlotDone = tasks.length === 0 || revisionTask?.status?.toUpperCase() === "COMPLETED";

  const isGsActiveAndUnfinished = gsTask && gsTask.status?.toUpperCase() !== "COMPLETED";
  const isOptionalActiveAndUnfinished = optionalTask && optionalTask.status?.toUpperCase() !== "COMPLETED";
  const isTargetCapacityFullyFinished = !isGsActiveAndUnfinished && !isOptionalActiveAndUnfinished;

  const handleReassembleCapacity = async () => {
    if (!isTargetCapacityFullyFinished) {
      alert("First Complete Alloted Tasks.");
      return;
    }

    if (sessionHours > maxAllowedExtensionHours) {
      alert(`Extension allocation blocked. Selected time exceeds your remaining headroom hours left until the 5:00 AM reset window (+${maxAllowedExtensionHours} hour(s) max).`);
      return;
    }

    try {
      setLoading(true);
      const minutesToAppend = sessionHours * 60;
      await generateDailySchedule(user.uid, minutesToAppend, extensionSlotChoice);
      alert(`Successfully appended your session extension to your ${extensionSlotChoice} workflow slots!`);
      await loadTodaySchedule();
    } catch (err) {
      console.error("Extension assembly error:", err);
    } finally {
      setLoading(true);
      setTimeout(async () => {
        const { refreshTodayTasks } = await import("../../scheduler/services/refreshTodayTasks");
        await refreshTodayTasks(user.uid); 
        setLoading(false);
      }, 150);
    }
  };

  const handleEndDayClick = () => {
    const activeRevisionTask = tasks.find(t => t.type === "revision");
    const hasUnfinishedRevisions = activeRevisionTask && activeRevisionTask.status?.toUpperCase() !== "COMPLETED";

    if (hasUnfinishedRevisions) {
      alert(
        "If you cant study GS or Optional its not an issue but what you have studied must be revised. " +
        "The day will not be complete without revision and No new schedule will be loaded if revision is not completed."
      );
      return;
    }
    setShowReflection(true);
  };

  const isMidnightLockActive = tasks.length === 0;

  const pendingRevisionTasksCount = revisionTask && revisionTask.subtasks 
    ? revisionTask.subtasks.filter(st => !st.completed).length 
    : 0;

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200/80 pb-4 text-left">
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Daily Target Router</h2>
        <p className="text-xs font-medium text-slate-400 mt-0.5">
          {isMidnightLockActive 
            ? "Targets closed out for today. Next core timeline sequence will generate fresh after 5:00 AM." 
            : "Track your structured preparation timelines inside clean workflow blocks."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-100/60 border border-slate-200/60 p-5 rounded-[2rem] shadow-inner">
        
        {/* SLOT 1: GS Tasks Card */}
        <div className={`relative group/card p-5 bg-white border rounded-[1.5rem] shadow-[0_8px_24px_-10px_rgba(0,0,0,0.05)] flex flex-col justify-between border-slate-200 transition-all duration-300 ${isGsSlotDone ? "opacity-40 bg-slate-50/60 pointer-events-none shadow-none" : "hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.08)]"}`}>
          {!isMidnightLockActive && gsTask && gsTask.subtasks && gsTask.subtasks.length > 1 && (
            <>
              <button disabled={gsIndex === 0} onClick={() => setGsIndex(p => Math.max(0, p - 1))} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-slate-600 transition-all hover:bg-slate-50 hover:scale-105 active:scale-95 disabled:opacity-0 disabled:pointer-events-none">
                <ChevronLeft size={16} strokeWidth={2.5} />
              </button>
              <button disabled={gsIndex >= gsTask.subtasks.length - 1} onClick={() => setGsIndex(p => p + 1)} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-slate-600 transition-all hover:bg-slate-50 hover:scale-105 active:scale-95 disabled:opacity-0 disabled:pointer-events-none">
                <ChevronRight size={16} strokeWidth={2.5} />
              </button>
            </>
          )}

          <div className={`${!isMidnightLockActive && gsTask && gsTask.subtasks && gsTask.subtasks.length > 1 ? "px-6" : ""}`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black px-2 py-0.5 rounded-md border uppercase tracking-wider bg-cyan-50 text-cyan-700 border-cyan-200/60">GS Slot</span>
              {!isMidnightLockActive && gsTask && gsTask.subtasks && gsTask.subtasks.length > 1 && (
                <span className="text-[10px] font-mono font-bold bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded text-slate-500">
                  {Math.min(gsIndex, gsTask.subtasks.length - 1) + 1} / {gsTask.subtasks.length}
                </span>
              )}
            </div>
            
            {currentGsSubtask && !isMidnightLockActive ? (
              <div className="mt-4 space-y-1 text-left">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider truncate block">{currentGsSubtask.subjectName}</span>
                  <span className="shrink-0 text-[10px] font-mono font-bold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-full border border-cyan-100">{currentGsSubtask.duration} Mins</span>
                </div>
                <span className="text-base font-black text-slate-800 block leading-tight pt-1 line-clamp-1">{currentGsSubtask.topicName}</span>
                <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1 line-clamp-2">{currentGsSubtask.subtopicName}</p>
              </div>
            ) : (
              <p className="text-xs text-slate-400 font-bold italic py-8 text-center">✓ Block Stream Finished</p>
            )}
          </div>

          {currentGsSubtask && !isMidnightLockActive && (
            <div className={`mt-5 pt-3 border-t border-slate-100 flex justify-end ${!isMidnightLockActive && gsTask && gsTask.subtasks && gsTask.subtasks.length > 1 ? "px-6" : ""}`}>
              <button disabled={completedSubtopicIds.has(currentGsSubtask.subtopicId) || isGsSlotDone} onClick={() => handleSubtaskComplete(gsTask, currentGsSubtask)} className={`px-4 py-2 text-xs font-bold rounded-xl transition-all shadow-sm ${completedSubtopicIds.has(currentGsSubtask.subtopicId) || isGsSlotDone ? "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none" : "bg-slate-900 text-white hover:bg-slate-800 active:scale-98"}`}>
                {completedSubtopicIds.has(currentGsSubtask.subtopicId) || isGsSlotDone ? "✓ Completed" : "Mark Complete"}
              </button>
            </div>
          )}
        </div>

        {/* SLOT 2: Optional Tasks Card */}
        <div className={`relative group/card p-5 bg-white border rounded-[1.5rem] shadow-[0_8px_24px_-10px_rgba(0,0,0,0.05)] flex flex-col justify-between border-slate-200 transition-all duration-300 ${isOptionalSlotDone ? "opacity-40 bg-slate-50/60 pointer-events-none shadow-none" : "hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.08)]"}`}>
          {!isMidnightLockActive && optionalTask && optionalTask.subtasks && optionalTask.subtasks.length > 1 && (
            <>
              <button disabled={optionalIndex === 0} onClick={() => setOptionalIndex(p => Math.max(0, p - 1))} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-slate-600 transition-all hover:bg-slate-50 hover:scale-105 active:scale-95 disabled:opacity-0 disabled:pointer-events-none">
                <ChevronLeft size={16} strokeWidth={2.5} />
              </button>
              <button disabled={optionalIndex >= optionalTask.subtasks.length - 1} onClick={() => setOptionalIndex(p => p + 1)} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-slate-600 transition-all hover:bg-slate-50 hover:scale-105 active:scale-95 disabled:opacity-0 disabled:pointer-events-none">
                <ChevronRight size={16} strokeWidth={2.5} />
              </button>
            </>
          )}

          <div className={`${!isMidnightLockActive && optionalTask && optionalTask.subtasks && optionalTask.subtasks.length > 1 ? "px-6" : ""}`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black px-2 py-0.5 rounded-md border uppercase tracking-wider bg-indigo-50 text-indigo-700 border-indigo-200/60">Optional Slot</span>
              {!isMidnightLockActive && optionalTask && optionalTask.subtasks && optionalTask.subtasks.length > 1 && (
                <span className="text-[10px] font-mono font-bold bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded text-slate-500">
                  {Math.min(optionalIndex, optionalTask.subtasks.length - 1) + 1} / {optionalTask.subtasks.length}
                </span>
              )}
            </div>
            
            {currentOptionalSubtask && !isMidnightLockActive ? (
              <div className="mt-4 space-y-1 text-left">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider truncate block">{currentOptionalSubtask.subjectName}</span>
                  <span className="shrink-0 text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">{currentOptionalSubtask.duration} Mins</span>
                </div>
                <span className="text-base font-black text-slate-800 block leading-tight pt-1 line-clamp-1">{currentOptionalSubtask.topicName}</span>
                <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1 line-clamp-2">{currentOptionalSubtask.subtopicName}</p>
              </div>
            ) : (
              <p className="text-xs text-slate-400 font-bold italic py-8 text-center">✓ Block Stream Finished</p>
            )}
          </div>

          {currentOptionalSubtask && !isMidnightLockActive && (
            <div className={`mt-5 pt-3 border-t border-slate-100 flex justify-end ${!isMidnightLockActive && optionalTask && optionalTask.subtasks && optionalTask.subtasks.length > 1 ? "px-6" : ""}`}>
              <button disabled={completedSubtopicIds.has(currentOptionalSubtask.subtopicId) || isOptionalSlotDone} onClick={() => handleSubtaskComplete(optionalTask, currentOptionalSubtask)} className={`px-4 py-2 text-xs font-bold rounded-xl transition-all shadow-sm ${completedSubtopicIds.has(currentOptionalSubtask.subtopicId) || isOptionalSlotDone ? "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none" : "bg-slate-900 text-white hover:bg-slate-800 active:scale-98"}`}>
                {completedSubtopicIds.has(currentOptionalSubtask.subtopicId) || isOptionalSlotDone ? "✓ Completed" : "Mark Complete"}
              </button>
            </div>
          )}
        </div>

        {/* SLOT 3: Revision Tasks Card */}
        <div className={`p-5 bg-white border rounded-[1.5rem] shadow-[0_8px_24px_-10px_rgba(0,0,0,0.05)] flex flex-col justify-between border-slate-200 transition-all duration-300 ${isRevisionSlotDone ? "opacity-40 bg-slate-50/60 pointer-events-none shadow-none" : "hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.08)]"}`}>
          <div>
            <div className="flex items-center text-left">
              <span className="text-[10px] font-black px-2 py-0.5 rounded-md border uppercase tracking-wider bg-amber-50 text-amber-700 border-amber-200/60">Revision Slot</span>
            </div>
            {!isMidnightLockActive && pendingRevisionTasksCount > 0 ? (
              <div className="mt-4 text-center py-3">
                <h3 className="text-base font-black text-slate-800">
                  {pendingRevisionTasksCount} revision {pendingRevisionTasksCount === 1 ? "task" : "tasks"} for today
                </h3>
                <p className="text-xs font-medium text-slate-400 mt-1 max-w-[240px] mx-auto leading-relaxed">
                  Spaced repetition elements are waiting inside your priority carousel pipeline.
                </p>
              </div>
            ) : (
              <p className="text-xs text-slate-400 font-bold italic py-8 text-center">✓ Block Stream Finished</p>
            )}
          </div>
          {!isMidnightLockActive && pendingRevisionTasksCount > 0 && (
            <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
              <div className="rounded-xl bg-indigo-50 border border-indigo-100/50 px-4 py-2 text-xs font-bold text-indigo-700 shadow-sm select-none cursor-pointer hover:bg-indigo-100/60 transition-colors">
                Go to the revision hub
              </div>
            </div>
          )}
        </div>

        {/* SLOT 4: Practice Tasks */}
        <div className="p-5 bg-slate-200/40 opacity-30 border border-slate-200/80 rounded-[1.5rem] flex flex-col justify-between pointer-events-none select-none transition-all">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Practice Tasks (Disabled)</span>
              <span className="text-[10px] font-mono bg-slate-200 border border-slate-300 px-2 py-0.5 rounded-full text-slate-500 font-bold">
                {practiceTask && !isMidnightLockActive ? `${practiceTask.estimatedMinutes} Mins` : "--"}
              </span>
            </div>
            {practiceTask && !isMidnightLockActive ? (
              <div className="mt-3 space-y-0.5 text-left">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-tight truncate">{practiceTask.subjectName}</span>
                <span className="text-sm font-black text-slate-400 block leading-tight mt-1 truncate">{practiceTask.topicName}</span>
                <p className="text-xs text-slate-400 mt-1 truncate">{practiceTask.subtopicName}</p>
              </div>
            ) : (
              <p className="text-xs text-slate-400 font-bold italic py-8 text-center">✓ Block Finished</p>
            )}
          </div>
          <div className="mt-5 pt-3 border-t border-slate-200/60 flex justify-end">
            <button disabled className="px-4 py-2 text-xs font-bold rounded-xl bg-slate-200 text-slate-400 cursor-not-allowed shadow-none border border-transparent">Disabled</button>
          </div>
        </div>

        {/* Control Actions Frame */}
        <div className="sm:col-span-2 grid grid-cols-2 gap-4 pt-2">
          <button disabled={isMidnightLockActive} className="py-3 bg-white border border-slate-200 text-xs font-bold text-slate-600 rounded-xl hover:bg-slate-50 active:scale-98 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm">Regenerate Schedule</button>
          <button 
            disabled={isMidnightLockActive}
            onClick={handleEndDayClick} 
            className={`py-3 text-xs font-bold text-white rounded-xl shadow-sm transition-all active:scale-98 ${isMidnightLockActive ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none border border-transparent" : "bg-gradient-to-r from-cyan-600 to-indigo-600 hover:opacity-95 cursor-pointer"}`}
          >
            {isMidnightLockActive ? "Day Concluded" : "End the Day"}
          </button>
        </div>
      </div>

      {/* STREAMLINED EXTEND SESSION CONTROL PANEL */}
      <div className="bg-white border border-slate-200/70 p-4 rounded-[1.25rem] shadow-[0_4px_20px_-8px_rgba(0,0,0,0.03)]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Label Context Metadata */}
          <div className="flex items-center gap-2 min-w-max text-left">
            <Sliders size={15} className="text-cyan-500" />
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-700">Extend Session</h3>
              {!isTargetCapacityFullyFinished && !isMidnightLockActive && (
                <p className="text-[9px] font-bold text-amber-600">Pending target locks active</p>
              )}
            </div>
          </div>

          {/* Fluid Functional Interactive Controls Group */}
          <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
            
            {/* Timeline Range Slider Object */}
            <div className="flex-1 flex items-center gap-3 bg-slate-50 border border-slate-200/50 px-3 py-1.5 rounded-xl">
              <input 
                type="range" 
                min="1" 
                max={maxAllowedExtensionHours || 1} 
                disabled={isMidnightLockActive}
                value={sessionHours} 
                onChange={(e) => setSessionHours(parseInt(e.target.value))} 
                className="flex-1 accent-cyan-600 h-1 bg-slate-200 rounded-md cursor-pointer disabled:cursor-not-allowed" 
              />
              <span className="shrink-0 text-[11px] font-mono font-bold text-cyan-700 bg-white border border-slate-200/60 px-2 py-0.5 rounded shadow-sm min-w-[55px] text-center">
                +{sessionHours}h
              </span>
            </div>

            {/* Target Criteria Stream Selector Dropdown */}
            <select 
              disabled={isMidnightLockActive}
              value={extensionSlotChoice} 
              onChange={(e) => setExtensionSlotChoice(e.target.value)} 
              className="text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200/60 rounded-xl px-3 py-2.5 sm:max-w-[200px] cursor-pointer focus:outline-none focus:border-cyan-500 disabled:opacity-50 shadow-sm"
            >
              <option value="GS">GS Slot</option>
              <option value="OPTIONAL">Optional Slot</option>
              <option value="BOTH">Split Balanced</option>
            </select>

            {/* Micro Trigger Commitment Execution Action Button */}
            <button 
              disabled={isMidnightLockActive}
              onClick={handleReassembleCapacity}
              className="px-4 py-2.5 bg-slate-900 text-white hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-400 text-xs font-bold rounded-xl transition-all shadow-sm disabled:cursor-not-allowed active:scale-98 shrink-0"
            >
              Add Time
            </button>
          </div>

        </div>
      </div>

      {/* RECOVERY QUEUE AREA */}
      <div className="bg-gradient-to-r from-slate-50 to-slate-100/50 border border-slate-200/60 p-5 rounded-[1.5rem] flex items-start gap-4 text-left shadow-sm">
        <div className="mt-0.5 p-2 bg-slate-200/60 rounded-xl border border-slate-300/40 text-slate-500">
          <Activity size={16} />
        </div>
        <div>
          <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider">Recovery Queue</h3>
          <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1">Missed subtopics and incomplete timelines automatically drop here after you clear the active day.</p>
        </div>
      </div>

      {/* REFLECTION SURVEY SHEET MODAL */}
      {showReflection && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white border border-slate-200/80 w-full max-w-md rounded-[2rem] p-6 space-y-5 shadow-2xl transition-all text-left">
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight">Daily Reflection Log</h3>
              <p className="text-xs font-medium text-slate-400 mt-0.5">Save your metrics to evaluate study sustainability rates.</p>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-600 flex items-center gap-1.5"><Zap size={14} className="text-amber-500" /> Energy Levels</span>
                  <span className="text-cyan-600 font-black">{energy}/5</span>
                </div>
                <input type="range" min="1" max="5" value={energy} onChange={(e) => setEnergy(e.target.value)} className="w-full accent-cyan-600 h-1 bg-slate-100 rounded-lg" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-600 flex items-center gap-1.5"><Activity size={14} className="text-indigo-500" /> Focus Quality</span>
                  <span className="text-indigo-600 font-black">{focus}/5</span>
                </div>
                <input type="range" min="1" max="5" value={focus} onChange={(e) => setFocus(e.target.value)} className="w-full accent-indigo-600 h-1 bg-slate-100 rounded-lg" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-600 flex items-center gap-1.5"><Award size={14} className="text-cyan-500" /> Preparedness Confidence</span>
                  <span className="text-cyan-600 font-black">{confidence}%</span>
                </div>
                <input type="range" min="0" max="100" value={confidence} onChange={(e) => setConfidence(e.target.value)} className="w-full accent-cyan-500 h-1 bg-slate-100 rounded-lg" />
              </div>

              <div className="space-y-2.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Primary Obstructions Today</label>
                <div className="flex flex-wrap gap-2">
                  {obstructionTags.map(tag => (
                    <button key={tag} onClick={() => toggleTag(tag)} className={`text-[10px] font-bold px-3 py-1.5 rounded-xl transition-all border ${selectedTags.includes(tag) ? "bg-cyan-50 border-cyan-300 text-cyan-700 shadow-sm font-extrabold" : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-700"}`}>{tag}</button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-slate-100">
              <button onClick={() => setShowReflection(false)} className="flex-1 py-3 bg-slate-50 border border-slate-200 text-xs font-bold text-slate-500 rounded-xl hover:bg-slate-100 hover:text-slate-700 transition-colors">Back</button>
              <button onClick={handleLogReflection} className="flex-1 py-3 bg-gradient-to-r from-cyan-600 to-indigo-600 text-xs font-bold text-white rounded-xl hover:opacity-95 transition-opacity shadow-sm">Log Reflection & Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudyHub;