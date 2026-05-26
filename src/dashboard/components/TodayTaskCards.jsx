import { useState, useEffect } from "react";
import useScheduleStore from "../../scheduler/store/scheduleStore";
import { completeStudyTask } from "../../scheduler/services/completeStudyTask";
import { generateDailySchedule } from "../../scheduler/engine/generateDailySchedule";
import useLoginStore from "../../login/store/loginStore";
import useDashboardStore from "../store/dashboardStore";

function TodayTaskCards() {
  const { gsTasks, optionalTasks, revisionTasks, practiceTasks, setTodayTasks } = useScheduleStore();
  const user = useLoginStore((state) => state.user);
  const setActiveTab = useDashboardStore((state) => state.setActiveTab);
  const [expandedSection, setExpandedSection] = useState(null);

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
    { key: "gs", title: "GS Tasks", tasks: gsTasks },
    { key: "optional", title: "Optional Tasks", tasks: optionalTasks },
    { key: "revision", title: "Revision Tasks", tasks: revisionTasks },
    { key: "practice", title: "Practice Tasks", tasks: practiceTasks },
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
    <div className="space-y-4">
      {sections.map((section) => {
        const backlogTask = section.tasks.find(
          (t) => t.status === "BACKLOG_DORMANT" || t.showBacklogTrigger
        );
        const pendingCount = section.tasks.filter(
          (task) => !task.completed && task.status !== "BACKLOG_DORMANT"
        ).length;
        const expanded = expandedSection === section.key;
        const isRevisionSection = section.key === "revision";

        return (
          <div key={section.key} className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* HEADER */}
            <button onClick={() => toggleSection(section.key)} className="flex w-full items-center justify-between p-5 text-left">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-slate-900">{section.title}</h2>
                <div className="flex h-7 min-w-7 items-center justify-center rounded-full bg-indigo-500 px-2 text-xs font-bold text-white">
                  {pendingCount}
                </div>
              </div>
              <div className="text-slate-400">{expanded ? "−" : "+"}</div>
            </button>

            {/* TASKS LIST ACCORDION */}
            {expanded && (
              <div className="border-t border-slate-100 px-5 py-4">
                {section.tasks.length === 0 && !backlogTask ? (
                  <div className="text-sm text-slate-500">No task for today</div>
                ) : (
                  <div className="space-y-3">
                    {backlogTask && (
                      <div className="rounded-xl border border-dashed border-amber-300 bg-amber-50/50 p-5 text-center transition-all">
                        <h3 className="text-sm font-semibold text-amber-900 mb-1">Optional Backlog Queue Detected</h3>
                        <p className="text-xs text-slate-600 mb-4 max-w-md mx-auto">
                          Standard optional configurations are restricted today, but historical recovery items are available in your backlog pool.
                        </p>
                      </div>
                    )}

                    {isRevisionSection && pendingCount > 0 ? (
                      <div className="rounded-xl border border-indigo-100 bg-indigo-50/40 p-5 text-center">
                        <h3 className="text-base font-semibold text-indigo-950 mb-1">
                          {pendingCount} revision {pendingCount === 1 ? "task" : "tasks"} for today
                        </h3>
                        <p className="text-xs text-slate-600 mb-4 max-w-md mx-auto">
                          Active active-recall and spaced repetition items are queued inside your carousel container.
                        </p>
                        
                        <div className="inline-block rounded-xl bg-indigo-100 px-5 py-2.5 text-xs font-bold text-indigo-800 border border-indigo-200 select-none mx-auto">
                          Go to the revision hub
                        </div>
                      </div>
                    ) : (
                      section.tasks
                        .filter((t) => t.status !== "BACKLOG_DORMANT" && !t.showBacklogTrigger)
                        .map((task) => (
                          <div key={task.id} className={`rounded-xl border border-slate-200 p-4 transition-all ${task.completed ? "bg-slate-100 opacity-60" : "bg-slate-50"}`}>
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <h3 className={`font-medium ${task.completed ? "text-slate-500 line-through" : "text-slate-900"}`}>{task.subtopicName}</h3>
                                <p className="mt-1 text-sm text-slate-500">{task.estimatedMinutes} mins</p>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {task.isRecovery && <div className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">Recovery</div>}
                                {task.completed && <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Completed</div>}
                              </div>
                            </div>
                            {!task.completed && !isRevisionSection && (
                              <button onClick={() => handleCompleteTask(task, section.key)} className="mt-3 rounded-xl bg-indigo-500 px-4 py-2 text-sm font-medium text-white">
                                Complete
                              </button>
                            )}
                          </div>
                        ))
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