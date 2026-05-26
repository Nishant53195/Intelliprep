import { useState, useEffect } from "react";
import useLoginStore from "../../login/store/loginStore";
import useDashboardStore from "../store/dashboardStore";
import useScheduleStore from "../../scheduler/store/scheduleStore";
import { generateDailySchedule, getActiveShiftDateString } from "../../scheduler/engine/generateDailySchedule";
import { completeTaskService } from "../../scheduler/services/completeTaskService";
import { db } from "../../database/dexie";

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
  
  // Extension Control States
  const [sessionHours, setSessionHours] = useState(1);
  const [extensionSlotChoice, setExtensionSlotChoice] = useState("GS"); // Defaults to GS choice mode option selector

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
    // 1. STALEMATE GUARD VALIDATION CHECK
    if (!isTargetCapacityFullyFinished) {
      alert("First Complete Alloted Tasks.");
      return;
    }

    // 2. HEADROOM OVERFLOW CRITERIA CONTROLS
    if (sessionHours > maxAllowedExtensionHours) {
      alert(`Extension allocation blocked. Selected time exceeds your remaining headroom hours left until the 5:00 AM reset window (+${maxAllowedExtensionHours} hour(s) max).`);
      return;
    }

    try {
      setLoading(true);
      const minutesToAppend = sessionHours * 60;
      // INPUT REMOVED: Pipes target allocation criteria directly from choice selector dropdown node
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
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">Daily Target Router</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          {isMidnightLockActive 
            ? "Targets closed out for today. Next core timeline sequence will generate fresh after 5:00 AM." 
            : "Track your structured preparation timelines inside clean workflow blocks."}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 border border-slate-200 p-4 rounded-2xl shadow-inner">
        {/* SLOT 1: GS Tasks Card */}
        <div className={`p-4 bg-white border rounded-xl shadow-sm flex flex-col justify-between border-slate-200 transition-all ${isGsSlotDone ? "opacity-40 bg-slate-50/60 pointer-events-none" : ""}`}>
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider bg-cyan-50 text-cyan-700 border-cyan-200">GS Slot</span>
              {!isMidnightLockActive && gsTask && gsTask.subtasks && gsTask.subtasks.length > 1 && (
                <div className="flex items-center gap-1.5 bg-slate-100 px-1.5 py-0.5 rounded-lg border border-slate-200">
                  <button disabled={gsIndex === 0} onClick={() => setGsIndex(p => Math.max(0, p - 1))} className="text-xs font-black px-1 text-slate-700 hover:text-slate-900 disabled:opacity-20 cursor-pointer">←</button>
                  <span className="text-[10px] font-mono font-bold text-slate-600">{Math.min(gsIndex, gsTask.subtasks.length - 1) + 1}/{gsTask.subtasks.length}</span>
                  <button disabled={gsIndex >= gsTask.subtasks.length - 1} onClick={() => setGsIndex(p => p + 1)} className="text-xs font-black px-1 text-slate-700 hover:text-slate-900 disabled:opacity-20 cursor-pointer">→</button>
                </div>
              )}
            </div>
            {currentGsSubtask && !isMidnightLockActive ? (
              <div className="mt-3 space-y-0.5 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-tight truncate">{currentGsSubtask.subjectName}</span>
                  <span className="text-[10px] font-mono font-bold text-cyan-700 bg-cyan-50/60 px-1.5 py-0.5 rounded border border-cyan-100">{currentGsSubtask.duration} Mins</span>
                </div>
                <span className="text-sm font-black text-slate-800 block leading-tight mt-1 line-clamp-1">{currentGsSubtask.topicName}</span>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">{currentGsSubtask.subtopicName}</p>
              </div>
            ) : (
              <p className="text-xs text-slate-500 font-bold italic py-5 text-left">✓ Block Finished.</p>
            )}
          </div>
          {currentGsSubtask && !isMidnightLockActive && (
            <div className="mt-4 pt-2 border-t border-slate-100 flex justify-end">
              <button disabled={completedSubtopicIds.has(currentGsSubtask.subtopicId) || isGsSlotDone} onClick={() => handleSubtaskComplete(gsTask, currentGsSubtask)} className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors shadow-sm ${completedSubtopicIds.has(currentGsSubtask.subtopicId) || isGsSlotDone ? "bg-slate-100 text-slate-400 cursor-not-allowed" : "bg-slate-900 text-white hover:bg-slate-800"}`}>
                {completedSubtopicIds.has(currentGsSubtask.subtopicId) || isGsSlotDone ? "✓ Completed" : "Mark Complete"}
              </button>
            </div>
          )}
        </div>

        {/* SLOT 2: Optional Tasks Card */}
        <div className={`p-4 bg-white border rounded-xl shadow-sm flex flex-col justify-between border-slate-200 transition-all ${isOptionalSlotDone ? "opacity-40 bg-slate-50/60 pointer-events-none" : ""}`}>
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider bg-indigo-50 text-indigo-700 border-indigo-200">Optional Slot</span>
              {!isMidnightLockActive && optionalTask && optionalTask.subtasks && optionalTask.subtasks.length > 1 && (
                <div className="flex items-center gap-1.5 bg-slate-100 px-1.5 py-0.5 rounded-lg border border-slate-200">
                  <button disabled={optionalIndex === 0} onClick={() => setOptionalIndex(p => Math.max(0, p - 1))} className="text-xs font-black px-1 text-slate-700 hover:text-slate-900 disabled:opacity-20 cursor-pointer">←</button>
                  <span className="text-[10px] font-mono font-bold text-slate-600">{Math.min(optionalIndex, optionalTask.subtasks.length - 1) + 1}/{optionalTask.subtasks.length}</span>
                  <button disabled={optionalIndex >= optionalTask.subtasks.length - 1} onClick={() => setOptionalIndex(p => p + 1)} className="text-xs font-black px-1 text-slate-700 hover:text-slate-900 disabled:opacity-20 cursor-pointer">→</button>
                </div>
              )}
            </div>
            {currentOptionalSubtask && !isMidnightLockActive ? (
              <div className="mt-3 space-y-0.5 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-tight truncate">{currentOptionalSubtask.subjectName}</span>
                  <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50/60 px-1.5 py-0.5 rounded border border-indigo-100">{currentOptionalSubtask.duration} Mins</span>
                </div>
                <span className="text-sm font-black text-slate-800 block leading-tight mt-1 line-clamp-1">{currentOptionalSubtask.topicName}</span>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">{currentOptionalSubtask.subtopicName}</p>
              </div>
            ) : (
              <p className="text-xs text-slate-500 font-bold italic py-5 text-left">✓ Block Finished.</p>
            )}
          </div>
          {currentOptionalSubtask && !isMidnightLockActive && (
            <div className="mt-4 pt-2 border-t border-slate-100 flex justify-end">
              <button disabled={completedSubtopicIds.has(currentOptionalSubtask.subtopicId) || isOptionalSlotDone} onClick={() => handleSubtaskComplete(optionalTask, currentOptionalSubtask)} className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors shadow-sm ${completedSubtopicIds.has(currentOptionalSubtask.subtopicId) || isOptionalSlotDone ? "bg-slate-100 text-slate-400 cursor-not-allowed" : "bg-slate-900 text-white hover:bg-slate-800"}`}>
                {completedSubtopicIds.has(currentOptionalSubtask.subtopicId) || isOptionalSlotDone ? "✓ Completed" : "Mark Complete"}
              </button>
            </div>
          )}
        </div>

        {/* SLOT 3: Revision Tasks Card */}
        <div className={`p-4 bg-white border rounded-xl shadow-sm flex flex-col justify-between border-slate-200 transition-all ${isRevisionSlotDone ? "opacity-40 bg-slate-50/60 pointer-events-none" : ""}`}>
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider bg-amber-50 text-amber-700 border-amber-200">Revision Slot</span>
            </div>
            {!isMidnightLockActive && pendingRevisionTasksCount > 0 ? (
              <div className="mt-4 text-center py-2">
                <h3 className="text-sm font-bold text-slate-800">
                  {pendingRevisionTasksCount} revision {pendingRevisionTasksCount === 1 ? "task" : "tasks"} for today
                </h3>
                <p className="text-[11px] text-slate-500 mt-1 max-w-[220px] mx-auto leading-normal">
                  Spaced repetition elements are waiting inside your priority carousel pipeline.
                </p>
              </div>
            ) : (
              <p className="text-xs text-slate-500 font-bold italic py-6 text-left">✓ Block Finished.</p>
            )}
          </div>
          {!isMidnightLockActive && pendingRevisionTasksCount > 0 && (
            <div className="mt-4 pt-2 border-t border-slate-100 flex justify-end">
              <div className="rounded-lg bg-indigo-50 border border-indigo-100 px-3 py-1.5 text-xs font-bold text-indigo-700 shadow-sm select-none">
                Go to the revision hub
              </div>
            </div>
          )}
        </div>

        {/* SLOT 4: Practice Tasks */}
        <div className="p-4 bg-slate-100/80 opacity-40 border border-slate-200 rounded-xl shadow-sm flex flex-col justify-between pointer-events-none select-none transition-all">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Practice Tasks (Disabled)</span>
              <span className="text-[10px] bg-slate-200 border border-slate-300 text-slate-600 font-bold px-2.5 py-0.5 rounded-full">
                {practiceTask && !isMidnightLockActive ? `${practiceTask.estimatedMinutes} Mins` : "--"}
              </span>
            </div>
            {practiceTask && !isMidnightLockActive ? (
              <div className="mt-2 space-y-0.5 text-left">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-tight truncate">{practiceTask.subjectName}</span>
                <span className="text-sm font-black text-slate-400 block leading-tight mt-1 line-clamp-1">{practiceTask.topicName}</span>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{practiceTask.subtopicName}</p>
              </div>
            ) : (
              <p className="text-xs text-slate-400 font-bold italic py-3 text-left">✓ Block Finished.</p>
            )}
          </div>
          <div className="mt-4 pt-2 border-t border-slate-200 flex justify-end">
            <button disabled className="px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-200 text-slate-400 cursor-not-allowed shadow-none">Disabled</button>
          </div>
        </div>

        {/* Control Actions */}
        <div className="sm:col-span-2 grid grid-cols-2 gap-3 pt-2">
          <button disabled={isMidnightLockActive} className="py-2.5 bg-white border border-slate-200 text-xs font-bold text-slate-600 rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm">Regenerate Schedule</button>
          <button 
            disabled={isMidnightLockActive}
            onClick={handleEndDayClick} 
            className={`py-2.5 text-xs font-bold text-white rounded-xl shadow-sm transition-all ${isMidnightLockActive ? "bg-slate-300 text-slate-400 cursor-not-allowed" : "bg-gradient-to-r from-cyan-600 to-indigo-600 hover:opacity-95 cursor-pointer"}`}
          >
            {isMidnightLockActive ? "Day Concluded" : "End the Day"}
          </button>
        </div>
      </div>

      {/* EXTEND SESSION AREA: EMBEDDED DROPDOWN PICKER FOR NO-INPUT CONTROLS */}
      <div className="bg-white border border-slate-200 p-4 rounded-xl space-y-3 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Extend Your Session</h3>
          {!isTargetCapacityFullyFinished && !isMidnightLockActive && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded border border-amber-200 bg-amber-50 text-amber-700">
              Locks until all active daily targets are 100% completed
            </span>
          )}
        </div>
        
        {/* RANGE RANGE NODE CONTROLLER */}
        <div className="flex items-center gap-4">
          <input 
            type="range" 
            min="1" 
            max={maxAllowedExtensionHours || 1} 
            disabled={isMidnightLockActive}
            value={sessionHours} 
            onChange={(e) => setSessionHours(parseInt(e.target.value))} 
            className="flex-1 accent-cyan-600 h-1 bg-slate-200 rounded-lg cursor-pointer disabled:cursor-not-allowed" 
          />
          <span className="text-xs font-black text-cyan-700 bg-slate-50 border border-slate-200 px-3 py-1 rounded-md shadow-sm">
            +{sessionHours} Hour{sessionHours > 1 ? "s" : ""}
          </span>
        </div>

        {/* INPUT REPLACED: CHIP INPUT DROPDOWN OPTION SELECTOR INTERFACE NODE */}
        <div className="space-y-1.5 text-left">
          <label className="text-[10px] uppercase font-bold text-slate-400 block tracking-tight">Target Stream Allocation Slot</label>
          <select 
            disabled={isMidnightLockActive}
            value={extensionSlotChoice} 
            onChange={(e) => setExtensionSlotChoice(e.target.value)} 
            className="w-full text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 cursor-pointer focus:outline-none focus:border-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-colors"
          >
            <option value="GS">General Studies (GS Slot)</option>
            <option value="OPTIONAL">Optional Subject (Optional Slot)</option>
            <option value="BOTH">Distribute Balanced (Split BOTH Slots)</option>
          </select>
        </div>

        <button 
          disabled={isMidnightLockActive}
          onClick={handleReassembleCapacity}
          className="w-full py-2 bg-slate-900 text-white hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-400 text-xs font-bold rounded-lg transition-colors shadow-sm disabled:cursor-not-allowed"
        >
          Reassemble Target Capacity
        </button>
      </div>

      {/* RECOVERY QUEUE AREA */}
      <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Recovery Queue</h3>
        <p className="text-xs text-slate-600">Missed subtopics and incomplete timelines automatically drop here after you clear the active day.</p>
      </div>

      {/* REFLECTION SURVEY SHEET */}
      {showReflection && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 w-full max-w-md rounded-2xl p-5 space-y-4 shadow-xl">
            <div>
              <h3 className="text-base font-bold text-slate-900">Daily Reflection Log</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Save your metrics to evaluate study sustainability rates.</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold"><span className="text-slate-600">Energy Levels</span><span className="text-cyan-600 font-bold">{energy}/5</span></div>
                <input type="range" min="1" max="5" value={energy} onChange={(e) => setEnergy(e.target.value)} className="w-full accent-cyan-600 h-1 bg-slate-200 rounded-lg" />
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold"><span className="text-slate-600">Focus Quality</span><span className="text-indigo-600 font-bold">{focus}/5</span></div>
                <input type="range" min="1" max="5" value={focus} onChange={(e) => setFocus(e.target.value)} className="w-full accent-indigo-600 h-1 bg-slate-200 rounded-lg" />
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold"><span className="text-slate-600">Preparedness Confidence</span><span className="text-amber-600 font-bold">{confidence}%</span></div>
                <input type="range" min="0" max="100" value={confidence} onChange={(e) => setConfidence(e.target.value)} className="w-full accent-amber-400 h-1 bg-slate-800 rounded-lg" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Primary Obstructions Today</label>
                <div className="flex flex-wrap gap-1.5">
                  {obstructionTags.map(tag => (
                    <button key={tag} onClick={() => toggleTag(tag)} className={`text-[10px] font-bold px-2.5 py-1 rounded-lg transition-colors border ${selectedTags.includes(tag) ? "bg-cyan-50 border-cyan-300 text-cyan-700" : "bg-slate-100 border-slate-200 text-slate-500 hover:bg-slate-200 hover:text-slate-800"}`}>{tag}</button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-3 border-t border-slate-200">
              <button onClick={() => setShowReflection(false)} className="flex-1 py-2 bg-slate-100 border border-slate-200 text-xs font-bold text-slate-600 rounded-xl hover:bg-slate-200 transition-colors">Back</button>
              <button onClick={handleLogReflection} className="flex-1 py-2 bg-gradient-to-r from-cyan-600 to-indigo-600 text-xs font-bold text-white rounded-xl hover:opacity-95 transition-opacity">Log Reflection & Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudyHub;