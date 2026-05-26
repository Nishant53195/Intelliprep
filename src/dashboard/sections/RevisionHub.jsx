import { useState, useEffect } from "react";
import useLoginStore from "../../login/store/loginStore";
import { db } from "../../database/dexie";
import { completeTaskService } from "../../scheduler/services/completeTaskService";
import dayjs from "dayjs";

function RevisionHub() {
  const user = useLoginStore((state) => state.user);
  const [todayRevisions, setTodayRevisions] = useState([]);
  const [pendingQueue, setPendingQueue] = useState([]);
  const [upcomingSchedule, setUpcomingSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Carousel selector active slide parameter
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Slider Overlay States
  const [showSliderModal, setShowSliderModal] = useState(false);
  const [selectedRevItem, setSelectedRevItem] = useState(null);
  const [sliderValue, setSliderValue] = useState(2); // Defaults to option index 2: Partial Recall

  const recallOptions = [
    { score: 1, label: "Easy Recall (strong)", color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
    { score: 2, label: "Partial Recall (Medium)", color: "text-cyan-600 bg-cyan-50 border-cyan-200" },
    { score: 3, label: "Tough Recall (Weak)", color: "text-amber-600 bg-amber-50 border-amber-200" },
    { score: 4, label: "Failed Recall (Fail)", color: "text-rose-600 bg-rose-50 border-rose-200" }
  ];

  async function loadRevisionSystemBlocks() {
    if (!user?.uid) return;
    try {
      setLoading(true);
      const todayStr = new Date().toISOString().split("T")[0];

      // 1. HARVEST TODAY'S REVISIONS
      const activeToday = await db.revisions
        .where("dueDate")
        .equals(todayStr)
        .filter(r => r.status === "PENDING")
        .toArray();
      
      // 2. HARVEST PENDING MISSED BACKLOGS (Automatically catches anything skipped past 5:00 AM)
      const missedBacklog = await db.revisions
        .filter(r => r.status === "PENDING" && r.dueDate < todayStr)
        .toArray();

      // 3. HARVEST UPCOMING TIMELINES
      const futureSchedule = await db.revisions
        .filter(r => r.status === "PENDING" && r.dueDate > todayStr)
        .toArray();

      // Hydrate naming strings across database collections
      const hydrateList = async (list) => {
        return await Promise.all(list.map(async (item) => {
          let subName = "Macro Subject Review";
          let topicName = "Unified Framework";
          let subjName = "Core Hub";

          if (item.subtopicId) {
            const st = await db.subtopics.get(item.subtopicId);
            if (st) subName = st.name;
          }
          if (item.topicId) {
            const t = await db.topics.get(item.topicId);
            if (t) topicName = t.name;
          }
          if (item.subjectId) {
            const s = await db.subjects.get(item.subjectId);
            if (s) subjName = s.name;
          }

          return { ...item, subtopicName: subName, topicName, subjectName: subjName };
        }));
      };

      setTodayRevisions(await hydrateList(activeToday));
      setPendingQueue(await hydrateList(missedBacklog));
      setUpcomingSchedule(await hydrateList(futureSchedule));
    } catch (err) {
      console.error("Failed loading revision modules:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRevisionSystemBlocks();
  }, [user]);

  const handleOpenSlider = (revItem) => {
    setSelectedRevItem(revItem);
    setSliderValue(2); 
    setShowSliderModal(true);
  };

  const handleConfirmSliderSelection = async () => {
    if (!selectedRevItem) return;
    try {
      const selectedOption = recallOptions.find(o => o.score === Number(sliderValue));
      const textLabelValue = selectedOption ? selectedOption.label : "Partial Recall (Medium)";

      const todayDate = new Date().toISOString().split("T")[0];
      
      // Query active schedule task rows to check overall completion status metrics
      const activeScheduleTasks = await db.schedule_tasks
        .where("[userId+scheduledDate]")
        .equals([user.uid, todayDate])
        .toArray();

      const matchedScheduleTask = activeScheduleTasks.find(
        (t) => t.type === "revision" || t.slotType === "REVISION"
      );

      // Check if this item belongs to today's active schedule array pool
      const isTodayItem = todayRevisions.some(r => r.id === selectedRevItem.id);
      const remainingCount = todayRevisions.filter(r => r.id !== selectedRevItem.id).length;

      if (matchedScheduleTask && isTodayItem && remainingCount === 0) {
        // Safe progression pass to complete the entire daily schedule wrapper slot card row
        await completeTaskService(
          matchedScheduleTask.id,
          selectedRevItem.subtopicId,
          selectedRevItem.topicId,
          textLabelValue
        );
      } else {
        // Direct mutation fallback path for backlog recovery items completed out-of-context
        await db.revisions.update(selectedRevItem.id, {
          status: "COMPLETED",
          recallQuality: textLabelValue,
          updatedAt: Date.now()
        });

        // Trigger dynamic single sequential stage progression calculation independently
        let nextStage = null;
        let daysToAdd = 0;
        if (selectedRevItem.revisionStage === "D3") {
          nextStage = "D10";
          daysToAdd = 7;
        } else if (selectedRevItem.revisionStage === "D10") {
          nextStage = "D30";
          daysToAdd = 20;
        }

        if (textLabelValue.includes("Failed Recall") || textLabelValue.includes("(Fail)")) {
          nextStage = selectedRevItem.revisionStage;
          daysToAdd = 1;
        }

        if (nextStage && daysToAdd > 0) {
          const duplicateCheck = await db.revisions
            .where("subtopicId")
            .equals(selectedRevItem.subtopicId)
            .filter(r => r.revisionStage === nextStage && r.status === "PENDING")
            .first();

          if (!duplicateCheck) {
            await db.revisions.put({
              id: `rev_${Date.now()}_${selectedRevItem.subtopicId}`,
              userId: user.uid,
              subjectId: selectedRevItem.subjectId || "",
              topicId: selectedRevItem.topicId || "",
              subtopicId: selectedRevItem.subtopicId,
              revisionStage: nextStage,
              status: "PENDING",
              dueDate: dayjs(todayDate).add(daysToAdd, "day").format("YYYY-MM-DD"),
              createdAt: Date.now()
            });
          }
        }
        
        // Notify dashboard components to sync metrics immediately
        window.dispatchEvent(new Event("syllabus-update"));
      }

      setShowSliderModal(false);
      setSelectedRevItem(null);

      // Adjust slide carousel navigation index pointer parameters cleanly
      if (isTodayItem && carouselIndex >= todayRevisions.length - 1 && carouselIndex > 0) {
        setCarouselIndex(p => p - 1);
      }

      await loadRevisionSystemBlocks();
    } catch (err) {
      console.error("Failed saving slider response data state attributes:", err);
    }
  };

  if (loading) return <div className="py-12 text-center text-xs text-slate-400 font-mono">Loading Revision Pools...</div>;

  const currentActiveRev = todayRevisions[Math.min(carouselIndex, todayRevisions.length - 1)] || null;
  const activeSelectionDetails = recallOptions.find(o => o.score === Number(sliderValue));

  return (
    <div className="space-y-6 text-left">
      <div>
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">Revision Management Hub</h2>
        <p className="text-xs text-slate-500 mt-0.5">Track retention decay rates and control spaced repetition tasks.</p>
      </div>

      {/* TODAY'S REVISIONS CAROUSEL */}
      <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl shadow-inner">
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col justify-between min-h-[180px]">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider bg-amber-50 text-amber-700 border-amber-200">
                Today's Revision Carousel
              </span>
              {todayRevisions.length > 1 && (
                <div className="flex items-center gap-1.5 bg-slate-100 px-1.5 py-0.5 rounded-lg border border-slate-200">
                  <button disabled={carouselIndex === 0} onClick={() => setCarouselIndex(p => Math.max(0, p - 1))} className="text-xs font-black cursor-pointer">←</button>
                  <span className="text-[10px] font-mono font-bold text-slate-600">{carouselIndex + 1}/{todayRevisions.length}</span>
                  <button disabled={carouselIndex >= todayRevisions.length - 1} onClick={() => setCarouselIndex(p => p + 1)} className="text-xs font-black cursor-pointer">→</button>
                </div>
              )}
            </div>

            {currentActiveRev ? (
              <div className="mt-3 space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-tight truncate">{currentActiveRev.subjectName}</span>
                  <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100">{currentActiveRev.revisionStage} Interval</span>
                </div>
                <span className="text-sm font-black text-slate-800 block mt-1 truncate">{currentActiveRev.topicName}</span>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">{currentActiveRev.subtopicName}</p>
              </div>
            ) : (
              <p className="text-xs text-slate-500 font-bold italic py-8 text-center">✓ Clear for today! No pending revisions due.</p>
            )}
          </div>

          {currentActiveRev && (
            <div className="mt-4 pt-2 border-t border-slate-100 flex justify-end">
              <button onClick={() => handleOpenSlider(currentActiveRev)} className="px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-sm">
                Mark Complete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* BACKLOGS & TIMELINE VIEWS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* PENDING MISSED BACKLOG CARD (NOW FULLY INTERACTIVE WITH RECOVERY FEATURE ROUTING) */}
        <div className="border border-slate-200 rounded-2xl p-4 bg-white shadow-sm">
          <h3 className="text-xs font-bold text-red-600 uppercase tracking-wider mb-3">⚠️ Pending Missed Backlog</h3>
          {pendingQueue.length === 0 ? (
            <p className="text-xs text-slate-400 italic py-4">No missed tasks. Consistency index is stable.</p>
          ) : (
            <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
              {pendingQueue.map((item) => (
                <div key={item.id} className="p-3 border border-slate-100 bg-slate-50 rounded-xl flex flex-col justify-between">
                  <div className="text-left">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] uppercase font-bold text-slate-400">{item.subjectName}</span>
                      <span className="text-[9px] font-bold text-red-600 bg-red-50 border border-red-100 px-1.5 py-0.2 rounded font-mono">Overdue: {item.dueDate}</span>
                    </div>
                    <span className="text-xs font-bold text-slate-800 block truncate mt-0.5">{item.topicName}</span>
                    <p className="text-[11px] text-slate-600 truncate mt-0.5">{item.subtopicName}</p>
                  </div>
                  {/* ACTIVATES MATCHING METRIC SLIDER HOOK FOR RECOVERY BACKLOG ELEMENTS */}
                  <button onClick={() => handleOpenSlider(item)} className="mt-2 self-end text-[10px] font-bold text-white bg-slate-800 px-2.5 py-1 rounded-md hover:bg-slate-700 transition-colors">
                    Mark Complete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* UPCOMING SCHEDULE TIMELINE */}
        <div className="border border-slate-200 rounded-2xl p-4 bg-white shadow-sm">
          <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-3">📅 Upcoming Revision Timeline</h3>
          {upcomingSchedule.length === 0 ? (
            <p className="text-xs text-slate-400 italic py-4">No future iterations configured yet.</p>
          ) : (
            <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
              {upcomingSchedule.map((item) => (
                <div key={item.id} className="p-3 border border-slate-100 bg-white rounded-xl shadow-sm text-left">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] uppercase font-bold text-slate-400">{item.subjectName}</span>
                    <span className="text-[9px] font-mono font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-1.5 py-0.5 rounded">Due: {item.dueDate}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-800 block truncate mt-0.5">{item.topicName}</span>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">{item.subtopicName}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* DYNAMIC REACT INTERACTIVE SLIDER OVERLAY MODAL */}
      {showSliderModal && (
        <div className="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 w-full max-w-md rounded-2xl p-6 space-y-5 shadow-xl animate-in fade-in zoom-in-95 duration-150">
            <div>
              <h3 className="text-base font-bold text-slate-900">Evaluate Active Recall Quality</h3>
              <p className="text-xs text-slate-500 mt-1">Drag the slider selection control row node to save evaluation score parameters.</p>
            </div>

            <div className="space-y-5 py-2">
              <div className={`p-4 border rounded-xl text-center text-sm font-black tracking-wide transition-all ${activeSelectionDetails?.color}`}>
                {activeSelectionDetails?.label}
              </div>

              <div className="space-y-2">
                <input 
                  type="range" 
                  min="1" 
                  max="4" 
                  step="1"
                  value={sliderValue} 
                  onChange={(e) => setSliderValue(Number(e.target.value))} 
                  className="w-full accent-indigo-600 h-2 bg-slate-100 rounded-lg cursor-pointer" 
                />
                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">
                  <span>Strong</span>
                  <span>Medium</span>
                  <span>Weak</span>
                  <span>Fail</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-100">
              <button onClick={() => setShowSliderModal(false)} className="flex-1 py-2 bg-slate-50 border border-slate-200 text-xs font-bold text-slate-600 rounded-xl hover:bg-slate-100 transition-colors">
                Cancel
              </button>
              <button onClick={handleConfirmSliderSelection} className="flex-1 py-2 bg-indigo-600 text-xs font-bold text-white rounded-xl hover:bg-indigo-700 transition-all shadow-md">
                Log Quality Metric
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RevisionHub;