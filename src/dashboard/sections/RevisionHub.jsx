// src/dashboard/sections/RevisionHub.jsx
import { useState, useEffect } from "react";
import useLoginStore from "../../login/store/loginStore";
import { db } from "../../database/dexie";
import { completeTaskService } from "../../scheduler/services/completeTaskService";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight, AlertTriangle, Calendar, RefreshCw } from "lucide-react";

function RevisionHub() {
  const user = useLoginStore((state) => state.user);
  const [todayRevisions, setTodayRevisions] = useState([]);
  const [pendingQueue, setPendingQueue] = useState([]);
  const [upcomingSchedule, setUpcomingSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Track complete status locally to immediately freeze/grey out buttons snappy
  const [locallyCompletedIds, setLocallyCompletedIds] = useState(new Set());

  // Carousel slider track index pointer
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Slider Evaluation Overlay States
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

      // 1. HARVEST TODAY'S REVISIONS (FIXED: Now includes COMPLETED tasks so they don't disappear)
      const activeToday = await db.revisions
        .where("dueDate")
        .equals(todayStr)
        .filter(r => r.status === "PENDING" || r.status === "COMPLETED")
        .toArray();
      
      // 2. HARVEST PENDING MISSED BACKLOGS (FIXED: Keeps completed backlogs in view for the session)
      const missedBacklog = await db.revisions
        .filter(r => (r.status === "PENDING" || r.status === "COMPLETED") && r.dueDate < todayStr)
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

      const hydratedToday = await hydrateList(activeToday);
      const hydratedBacklog = await hydrateList(missedBacklog);

      // Sync backend completed states with local component UI state maps
      hydratedToday.forEach(item => {
        if (item.status === "COMPLETED") locallyCompletedIds.add(item.id);
      });
      hydratedBacklog.forEach(item => {
        if (item.status === "COMPLETED") locallyCompletedIds.add(item.id);
      });

      setTodayRevisions(hydratedToday);
      setPendingQueue(hydratedBacklog);
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
    // Prevent opening modal if it's already marked finished or greyed out
    if (revItem.status === "COMPLETED" || locallyCompletedIds.has(revItem.id)) return;
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
      
      // Instantly inject complete status flag into local state to keep UI snappy
      setLocallyCompletedIds(prev => {
        const next = new Set(prev);
        next.add(selectedRevItem.id);
        return next;
      });

      // Query active schedule task rows to check overall completion status metrics
      const activeScheduleTasks = await db.schedule_tasks
        .where("[userId+scheduledDate]")
        .equals([user.uid, todayDate])
        .toArray();

      const matchedScheduleTask = activeScheduleTasks.find(
        (t) => t.type === "revision" || t.slotType === "REVISION"
      );

      const isTodayItem = todayRevisions.some(r => r.id === selectedRevItem.id);
      const remainingCount = todayRevisions.filter(r => r.id !== selectedRevItem.id && !locallyCompletedIds.has(r.id) && r.status !== "COMPLETED").length;

      // IF LAST TASK: completeTaskService handles both completion and single adjustment cleanly
      if (matchedScheduleTask && isTodayItem && remainingCount === 0) {
        await completeTaskService(
          matchedScheduleTask.id,
          selectedRevItem.subtopicId,
          selectedRevItem.topicId,
          textLabelValue
        );
      } else {
        // IF NOT LAST TASK: Manually apply single score adjustment cleanly here
        if (selectedRevItem.topicId) {
          let topicIntel = await db.topic_intelligence
            .where("[userId+topicId]")
            .equals([user.uid, selectedRevItem.topicId])
            .first();

          if (!topicIntel) {
            topicIntel = await db.topic_intelligence
              .where("topicId")
              .equals(selectedRevItem.topicId)
              .filter(r => r.userId === user.uid)
              .first();
          }
            
          let currentConfidence = topicIntel ? (topicIntel.confidenceScore || 0) : 0;
          let adjustment = 0;
          const qualityLower = textLabelValue.toLowerCase();

          if (qualityLower.includes("strong") || qualityLower.includes("easy")) {
            adjustment = 3;
          } else if (qualityLower.includes("medium") || qualityLower.includes("partial")) {
            adjustment = 2;
          } else if (qualityLower.includes("tough") || qualityLower.includes("hard")) {
            adjustment = 1;
          } else if (qualityLower.includes("fail") || qualityLower.includes("weak")) {
            adjustment = -4;
          }

          const newConfidence = Math.max(0, Math.min(100, currentConfidence + adjustment));

          if (topicIntel) {
            await db.topic_intelligence.update(topicIntel.id, {
              confidenceScore: newConfidence,
              updatedAt: new Date()
            });
          } else {
            await db.topic_intelligence.put({
              id: `intel_t_${Date.now()}_${selectedRevItem.topicId}`,
              userId: user.uid,
              topicId: selectedRevItem.topicId,
              subjectId: selectedRevItem.subjectId || "",
              completionScore: 0,
              confidenceScore: newConfidence,
              updatedAt: new Date()
            });
          }

          const { syncTopicIntelligence } = await import("../../syllabus/services/intelligenceSyncService");
          await syncTopicIntelligence(selectedRevItem.topicId, user.uid);
        }

        await db.revisions.update(selectedRevItem.id, {
          status: "COMPLETED",
          recallQuality: textLabelValue,
          updatedAt: Date.now()
        });

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
        
        window.dispatchEvent(new Event("syllabus-update"));
      }

      setShowSliderModal(false);
      setSelectedRevItem(null);
      await loadRevisionSystemBlocks();
    } catch (err) {
      console.error("Failed saving slider response data state attributes:", err);
    }
  };

  const currentActiveRev = todayRevisions[Math.min(carouselIndex, todayRevisions.length - 1)] || null;
  const activeSelectionDetails = recallOptions.find(o => o.score === Number(sliderValue));
  
  // Track current item completeness flag
  const isActiveItemDone = currentActiveRev && (currentActiveRev.status === "COMPLETED" || locallyCompletedIds.has(currentActiveRev.id));

  const getSubjectIcon = (name) => {
    const lower = name?.toLowerCase() || "";
    if (lower.includes("math") || lower.includes("linear")) return "🧮";
    if (lower.includes("chem") || lower.includes("bio") || lower.includes("science")) return "🧪";
    if (lower.includes("plant") || lower.includes("botany")) return "🌿";
    return "📚";
  };

  if (loading) return <div className="py-12 text-center text-xs text-slate-400 font-mono">Loading Revision Pools...</div>;

  return (
    <div className="space-y-6 text-left font-sans antialiased bg-[#FAFBFD] min-h-screen">
      
      {/* HEADER SECTION TITLE BLOCK */}
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-2xl font-black text-[#111625] tracking-tight">Revision Management Hub</h2>
        <p className="text-xs font-semibold text-slate-400 mt-1 leading-relaxed">
          Track retention decay rates and control spaced repetition tasks.
        </p>
      </div>

      {/* ==========================================
          1. SPACED REPETITION STUDY CAROUSEL 
          ========================================== */}
      <div className="relative bg-white border border-[#EBEFF8] rounded-[2.25rem] p-6 shadow-[0_12px_40px_rgba(235,240,248,0.5)] flex flex-col justify-between min-h-[220px] group transition-all duration-300 hover:shadow-md">
        
        {/* Carousel Navigation Arrow Controls */}
        {todayRevisions.length > 1 && (
          <>
            <button 
              disabled={carouselIndex === 0} 
              onClick={() => setCarouselIndex(p => Math.max(0, p - 1))} 
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 disabled:opacity-30 transition-opacity"
            >
              <ChevronLeft size={18} strokeWidth={2.5} />
            </button>
            <button 
              disabled={carouselIndex >= todayRevisions.length - 1} 
              onClick={() => setCarouselIndex(p => Math.min(todayRevisions.length - 1, p + 1))} 
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 disabled:opacity-30 transition-opacity"
            >
              <ChevronRight size={18} strokeWidth={2.5} />
            </button>
          </>
        )}

        <div className={todayRevisions.length > 1 ? "px-6" : ""}>
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-0.5 rounded-md bg-[#FFF0E6] border border-[#FFE0CC] text-[#FF6600]">
              Today's Revision Carousel
            </span>
            <span className="text-xs font-mono font-bold text-slate-500">
              {todayRevisions.length ? carouselIndex + 1 : 0} / {todayRevisions.length || 0}
            </span>
          </div>

          {currentActiveRev ? (
            <div className={`mt-5 space-y-1.5 relative pr-16 transition-all duration-200 ${isActiveItemDone ? "opacity-40 select-none" : ""}`}>
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-extrabold text-[#FF6600] tracking-wider uppercase font-mono">
                  {currentActiveRev.subjectName}
                </p>
                <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100 shrink-0">
                  {currentActiveRev.revisionStage} Interval
                </span>
              </div>
              <h3 className="text-xl font-black text-[#1E2538] tracking-tight leading-snug truncate">
                {currentActiveRev.topicName}
              </h3>
              <p className="text-xs text-slate-500 font-medium tracking-wide">
                {currentActiveRev.subtopicName}
              </p>

              <div className="absolute right-0 top-0 text-4xl select-none pointer-events-none opacity-10">
                {getSubjectIcon(currentActiveRev.subjectName)}
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-400 font-bold italic py-8 text-center">✓ Clear for today! No revisions generated.</p>
          )}
        </div>

        <div className={`mt-5 pt-4 border-t border-slate-100 flex items-center justify-between ${todayRevisions.length > 1 ? "px-6" : ""}`}>
          <span className="text-[11px] font-mono font-black text-indigo-600/80 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-lg flex items-center gap-1">
            <RefreshCw size={11} className="animate-spin-slow" /> Spaced Repetition Active
          </span>
          
          <button
            disabled={!currentActiveRev || isActiveItemDone}
            onClick={() => handleOpenSlider(currentActiveRev)}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all shadow-3xs flex items-center gap-1.5 ${
              isActiveItemDone
                ? "bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                : "bg-[#111625] hover:bg-slate-800 text-white"
            }`}
          >
            {isActiveItemDone ? "✓ Completed" : "📋 Mark Complete"}
          </button>
        </div>
      </div>

      {/* ==========================================
          2. LOWER DUAL-COLUMN SPLIT GRID SECTION
          ========================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* LEFT COLUMN PANEL: PENDING MISSED BACKLOGS */}
        <div className="lg:col-span-2 bg-white border border-[#EBEFF8] rounded-[1.75rem] p-5 shadow-[0_8px_24px_rgba(235,240,248,0.35)] flex flex-col justify-between min-h-[300px]">
          <div>
            <h4 className="text-xs font-black tracking-wider uppercase text-rose-600 flex items-center gap-1.5 border-b border-slate-50 pb-2">
              <AlertTriangle size={13} strokeWidth={2.5} /> Pending Missed Backlog
            </h4>
          </div>

          {pendingQueue.length === 0 ? (
            <div className="py-8 flex flex-col items-center justify-center text-center space-y-3 my-auto">
              <div className="h-20 w-20 rounded-full bg-[#FFF5F5] border border-[#FFE0E0] flex items-center justify-center text-3xl shadow-3xs relative">
                📋
                <div className="absolute bottom-1 right-1 h-5 w-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">✓</div>
              </div>
              <div>
                <h5 className="text-sm font-black text-slate-800 tracking-tight">No missed tasks</h5>
                <p className="text-[11px] font-medium text-slate-400 mt-0.5 italic">Consistency index is stable.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-0.5 mt-3 flex-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-slate-100 rounded">
              {pendingQueue.map((item) => {
                const isBacklogDone = item.status === "COMPLETED" || locallyCompletedIds.has(item.id);
                return (
                  <div key={item.id} className="flex items-center justify-between bg-white border border-[#EFF3FA] p-3 rounded-xl shadow-3xs">
                    <div className={`flex items-center gap-3 min-w-0 transition-opacity duration-200 ${isBacklogDone ? "opacity-35 select-none" : ""}`}>
                      <div className="h-9 w-9 rounded-xl bg-[#FFF5F5] border border-slate-50 flex items-center justify-center text-lg shrink-0">
                        ⚠️
                      </div>
                      <div className="text-left min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-[9px] font-mono font-black text-slate-400 truncate tracking-wider leading-none">
                            {item.subjectName}
                          </p>
                          <span className="shrink-0 text-[8px] font-mono font-black text-rose-600 bg-rose-50 border border-rose-100 px-1 rounded">
                            Overdue: {item.dueDate}
                          </span>
                        </div>
                        <h5 className="text-xs font-black text-slate-800 tracking-tight mt-1 truncate">
                          {item.topicName}
                        </h5>
                        <p className="text-[10px] font-bold text-slate-400 truncate mt-0.5">
                          {item.subtopicName}
                        </p>
                      </div>
                    </div>

                    <button
                      disabled={isBacklogDone}
                      onClick={() => handleOpenSlider(item)}
                      className={`shrink-0 text-[10px] font-black px-2.5 py-1.5 rounded-lg transition-all ${
                        isBacklogDone
                          ? "bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                          : "bg-[#111625] hover:bg-indigo-950 text-white"
                      }`}
                    >
                      {isBacklogDone ? "Done ✓" : "Resolve"}
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          <div className="pt-2 border-t border-slate-50/60 text-[10px] font-mono text-center text-slate-400">
            System Backlog Stream: {pendingQueue.filter(i => i.status !== "COMPLETED" && !locallyCompletedIds.has(i.id)).length} Issues Pending
          </div>
        </div>

        
        <div className="lg:col-span-3 bg-white border border-[#EBEFF8] rounded-[1.75rem] p-5 shadow-[0_8px_24px_rgba(235,240,248,0.35)] flex flex-col justify-between min-h-[300px]">
          <div>
            <h4 className="text-xs font-black tracking-wider uppercase text-indigo-600 flex items-center gap-1.5 border-b border-slate-50 pb-2">
              <Calendar size={13} strokeWidth={2.5} /> Upcoming Revision Timeline
            </h4>
          </div>

          {upcomingSchedule.length === 0 ? (
            <div className="py-8 flex flex-col items-center justify-center text-center my-auto">
              <p className="text-xs text-slate-400 italic">No future iterations configured yet.</p>
            </div>
          ) : (
            <div className="mt-3 flex-1 overflow-y-auto max-h-[260px] space-y-2.5 pr-0.5 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-slate-100 rounded">
              {upcomingSchedule.map((item) => (
                <div key={item.id} className="flex items-center justify-between bg-white border border-[#EFF3FA] p-3 rounded-xl shadow-3xs group cursor-default">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-9 w-9 rounded-xl bg-[#F0F4FF] border border-slate-50 flex items-center justify-center text-lg shrink-0 shadow-3xs group-hover:scale-102 transition-transform">
                      {getSubjectIcon(item.subjectName)}
                    </div>
                    <div className="text-left min-w-0">
                      <p className="text-[9px] font-mono font-black text-indigo-500 tracking-wider uppercase leading-none">
                        {item.subjectName}
                      </p>
                      <h5 className="text-xs font-black text-slate-800 tracking-tight mt-1 truncate">
                        {item.topicName}
                      </h5>
                      <p className="text-[10px] font-bold text-slate-400 truncate mt-0.5">
                        {item.subtopicName}
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 text-[9px] font-mono font-black text-indigo-600 bg-[#F0F3FF] border border-[#DEE6FF] px-2 py-0.5 rounded-md shadow-3xs">
                    Due: {item.dueDate}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="pt-2 mt-2 border-t border-slate-50/60 text-[10px] font-mono text-right text-slate-400">
            Timelines calculated using continuous Spaced-Repetition curves
          </div>
        </div>

      </div>

      {/* ==========================================
          3. ACTIVE RECALL QUALITY EVALUATION SLIDER MODAL
          ========================================== */}
      {showSliderModal && (
        <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 w-full max-w-md rounded-[2.5rem] p-6 space-y-5 shadow-2xl text-left animate-in fade-in zoom-in-95 duration-150">
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight">Evaluate Active Recall Quality</h3>
              <p className="text-xs font-medium text-slate-400 mt-0.5">Drag the slider selection control row node to save evaluation score parameters.</p>
            </div>

            <div className="space-y-5 py-1">
              <div className={`p-4 border rounded-2xl text-center text-sm font-black tracking-wide transition-all ${activeSelectionDetails?.color}`}>
                {activeSelectionDetails?.label}
              </div>

              <div className="space-y-2.5">
                <input 
                  type="range" 
                  min="1" 
                  max="4" 
                  step="1"
                  value={sliderValue} 
                  onChange={(e) => setSliderValue(Number(e.target.value))} 
                  className="w-full accent-indigo-600 h-1.5 bg-slate-100 rounded-lg cursor-pointer" 
                />
                <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-wider px-1">
                  <span>Strong</span>
                  <span>Medium</span>
                  <span>Weak</span>
                  <span>Fail</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2.5 pt-3 border-t border-slate-100">
              <button onClick={() => setShowSliderModal(false)} className="flex-1 py-2.5 bg-slate-50 border border-slate-200 text-xs font-bold text-slate-600 rounded-xl hover:bg-slate-100 transition-colors">
                Cancel
              </button>
              <button onClick={handleConfirmSliderSelection} className="flex-1 py-2.5 bg-indigo-600 text-xs font-bold text-white rounded-xl hover:bg-indigo-700 transition-all shadow-md">
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