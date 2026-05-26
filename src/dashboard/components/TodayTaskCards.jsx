import { useState, useEffect } from "react";
import useScheduleStore from "../../scheduler/store/scheduleStore";
import { completeStudyTask } from "../../scheduler/services/completeStudyTask";
import { generateDailySchedule } from "../../scheduler/engine/generateDailySchedule";
import useLoginStore from "../../login/store/loginStore";
import useDashboardStore from "../store/dashboardStore";
import { ChevronLeft, ChevronRight, AlertCircle, Sparkles } from "lucide-react";

function TodayTaskCards() {
  const { gsTasks, optionalTasks, revisionTasks, practiceTasks, setTodayTasks } = useScheduleStore();
  const user = useLoginStore((state) => state.user);
  const setActiveTab = useDashboardStore((state) => state.setActiveTab);
  const [expandedSection, setExpandedSection] = useState(null);

  // Separate pagination tracks for individual section streams
  const [gsIndex, setGsIndex] = useState(0);
  const [optionalIndex, setOptionalIndex] = useState(0);
  const [practiceIndex, setPracticeIndex] = useState(0);

  useEffect(() => {
    async function syncStoreWithDatabase() {
      if (!user?.uid) return;
      try {
        const currentTasks = await generateDailySchedule(user.uid, 0, null);
        setTodayTasks({
          gsTasks: currentTasks.filter((t) => t.type === "gs"),
          optionalTasks: currentTasks.filter((t) => t.type === "optional"),
          revisionTasks: currentTasks.filter((t) => t.type === "revision"),
          practiceTasks: currentTasks.filter((t) => t.type === "practice"),
        });
      } catch (err) {
        console.error("Failed to sync card store targets:", err);
      }
    }
    syncStoreWithDatabase();
  }, [user?.uid]);

  const sections = [
    { key: "gs", title: "GS Tasks", tasks: gsTasks, index: gsIndex, setIndex: setGsIndex },
    { key: "optional", title: "Optional Tasks", tasks: optionalTasks, index: optionalIndex, setIndex: setOptionalIndex },
    { key: "revision", title: "Revision Tasks", tasks: revisionTasks },
    { key: "practice", title: "Practice Tasks", tasks: practiceTasks, index: practiceIndex, setIndex: setPracticeIndex },
  ];

  function toggleSection(key) {
    setExpandedSection(expandedSection === key ? null : key);
  }

  async function handleCompleteTask(task, sectionKey) {
    await completeStudyTask(task);
    const updatedSections = {
      gsTasks: sectionKey === "gs" ? gsTasks.map((t) => (t.id === task.id ? { ...t, completed: true } : t)) : gsTasks,
      optionalTasks: sectionKey === "optional" ? optionalTasks.map((t) => (t.id === task.id ? { ...t, completed: true } : t)) : optionalTasks,
      revisionTasks: sectionKey === "revision" ? revisionTasks.map((t) => (t.id === task.id ? { ...t, completed: true } : t)) : revisionTasks,
      practiceTasks: sectionKey === "practice" ? practiceTasks.map((t) => (t.id === task.id ? { ...t, completed: true } : t)) : practiceTasks,
    };
    setTodayTasks(updatedSections);
  }

  return (
    <div className="space-y-4 text-left">
      {sections.map((section) => {
        const backlogTask = section.tasks.find(
          (t) => t.status === "BACKLOG_DORMANT" || t.showBacklogTrigger
        );
        const pendingCount = section.tasks.filter(
          (task) => !task.completed && task.status !== "BACKLOG_DORMANT"
        ).length;
        const expanded = expandedSection === section.key;
        const isRevisionSection = section.key === "revision";

        // Filtering rule to exclude backlog triggers from standard carousel iterations
        const visibleTasks = section.tasks.filter((t) => t.status !== "BACKLOG_DORMANT" && !t.showBacklogTrigger);
        const currentIndex = section.index || 0;
        const currentTask = visibleTasks[Math.min(currentIndex, visibleTasks.length - 1)];

        return (
          <div key={section.key} className={`rounded-[1.5rem] border bg-white transition-all duration-300 shadow-[0_4px_20px_-10px_rgba(15,23,42,0.03)] ${expanded ? "border-slate-300 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.06)]" : "border-slate-200 hover:border-slate-300"}`}>
            
            {/* HEADER */}
            <button onClick={() => toggleSection(section.key)} className="flex w-full items-center justify-between p-5 text-left outline-none">
              <div className="flex items-center gap-3.5">
                <h2 className="text-base font-black tracking-tight text-slate-800">{section.title}</h2>
                <div className="flex h-6 min-w-6 items-center justify-center rounded-lg bg-indigo-600/10 border border-indigo-600/10 px-2 text-xs font-black text-indigo-600">
                  {pendingCount}
                </div>
              </div>
              <div className="text-slate-400 font-mono font-bold text-sm bg-slate-50 border border-slate-200/60 w-7 h-7 rounded-lg flex items-center justify-center transition-colors group-hover:bg-slate-100">
                {expanded ? "−" : "+"}
              </div>
            </button>

            {/* TASKS LIST ACCORDION TRACK FRAME */}
            {expanded && (
              <div className="border-t border-slate-100/80 px-5 py-5 bg-gradient-to-b from-slate-50/50 to-transparent rounded-b-[1.5rem]">
                {section.tasks.length === 0 && !backlogTask ? (
                  <div className="text-xs font-bold text-slate-400 italic py-4 text-center">No track allocations for today</div>
                ) : (
                  <div className="space-y-4">
                    {backlogTask && (
                      <div className="rounded-2xl border border-dashed border-amber-300 bg-amber-50/40 p-5 text-center flex flex-col items-center">
                        <AlertCircle className="text-amber-600 mb-2" size={20} />
                        <h3 className="text-sm font-black text-amber-900 mb-0.5">Optional Backlog Queue Detected</h3>
                        <p className="text-xs font-medium text-slate-500 max-w-sm leading-relaxed">
                          Standard optional configurations are restricted today, but historical recovery items are available in your backlog pool.
                        </p>
                      </div>
                    )}

                    {isRevisionSection ? (
                      pendingCount > 0 ? (
                        <div className="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-5 text-center flex flex-col items-center">
                          <Sparkles className="text-indigo-600 mb-2" size={20} />
                          <h3 className="text-base font-black text-indigo-950">
                            {pendingCount} revision {pendingCount === 1 ? "task" : "tasks"} for today
                          </h3>
                          <p className="text-xs font-medium text-slate-500 mt-1 max-w-sm leading-relaxed">
                            Active active-recall and spaced repetition items are queued inside your carousel container.
                          </p>
                          
                          <button onClick={() => setActiveTab("Revision Hub")} className="mt-4 rounded-xl bg-white border border-indigo-200/80 px-4 py-2.5 text-xs font-black text-indigo-700 shadow-sm hover:bg-indigo-50/60 transition-colors select-none">
                            Go to the revision hub
                          </button>
                        </div>
                      ) : (
                        <div className="text-xs font-bold text-slate-400 italic py-4 text-center">✓ Revision Stream Finished</div>
                      )
                    ) : (
                      /* FLUID FULL-CARD WIDTH CONTROLS FOR MULTI-ITEM TASKS */
                      visibleTasks.length > 0 && (
                        <div className="relative group/card-viewport">
                          
                          {/* Left and Right Sidebar Arrow Navigations */}
                          {visibleTasks.length > 1 && (
                            <>
                              <button 
                                disabled={currentIndex === 0}
                                onClick={() => section.setIndex(p => Math.max(0, p - 1))}
                                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-50 active:scale-95 disabled:opacity-0 disabled:pointer-events-none transition-all"
                              >
                                <ChevronLeft size={15} strokeWidth={2.5} />
                              </button>
                              <button 
                                disabled={currentIndex >= visibleTasks.length - 1}
                                onClick={() => section.setIndex(p => Math.min(visibleTasks.length - 1, p + 1))}
                                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-50 active:scale-95 disabled:opacity-0 disabled:pointer-events-none transition-all"
                              >
                                <ChevronRight size={15} strokeWidth={2.5} />
                              </button>
                            </>
                          )}

                          {/* Content Container Frame Wrapper */}
                          {currentTask && (
                            <div className={`rounded-xl border border-slate-200 p-5 transition-all duration-300 ${visibleTasks.length > 1 ? "px-12" : ""} ${currentTask.completed ? "bg-slate-50 opacity-60 shadow-none border-slate-200/60" : "bg-white shadow-[0_8px_20px_-8px_rgba(0,0,0,0.04)]"}`}>
                              <div className="flex items-start justify-between gap-4">
                                <div className="space-y-1 min-w-0">
                                  <h3 className={`font-black text-sm tracking-tight leading-tight truncate ${currentTask.completed ? "text-slate-400 line-through" : "text-slate-800"}`}>
                                    {currentTask.subtopicName}
                                  </h3>
                                  <p className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wide">
                                    Allocation: {currentTask.estimatedMinutes} mins
                                  </p>
                                </div>
                                <div className="flex flex-wrap gap-1.5 shrink-0">
                                  {currentTask.isRecovery && <span className="rounded-md bg-amber-50 border border-amber-200/60 px-2 py-0.5 text-[10px] font-bold text-amber-700 uppercase tracking-wider">Recovery</span>}
                                  {currentTask.completed && <span className="rounded-md bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Completed</span>}
                                </div>
                              </div>
                              
                              {!currentTask.completed && (
                                <div className="mt-4 pt-2 border-t border-slate-100/80 flex justify-between items-center">
                                  {visibleTasks.length > 1 ? (
                                    <span className="text-[10px] font-mono font-bold text-slate-400">
                                      Task Node {currentIndex + 1} of {visibleTasks.length}
                                    </span>
                                  ) : <div />}
                                  <button onClick={() => handleCompleteTask(currentTask, section.key)} className="rounded-lg bg-slate-900 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-slate-800 active:scale-98 transition-all">
                                    Complete
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default TodayTaskCards;