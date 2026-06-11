// src/currentaffairs/components/CAFilterConsole.jsx
import { useEffect, useState } from "react";
import useCAStore from "../store/useCAStore";
import gsSyllabus from "../../constants/gsSyllabus";
import { db } from "../../database/dexie";
import { firestoreDb } from "../../firebase/firestore/config";
import { collection, query, where, getDocs, limit, orderBy } from "firebase/firestore";
import { Search, Loader2 } from "lucide-react";

function CAFilterConsole() {
  const { userFilters, updateUserFilters, resetUserFilters, setTimeChip } = useCAStore();
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [availableTopics, setAvailableTopics] = useState([]);
  const [availableSubtopics, setAvailableSubtopics] = useState([]);
  const [cloudLoading, setCloudLoading] = useState(false);

  // 1. DYNAMICALLY COMPUTE THE ONGOING MONTH BOUNDARY
  const fullMonthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentOngoingMonthIndex = new Date().getMonth(); // Automatically gets 0-11 index based on active runtime year
  const activeMonthsLimitList = fullMonthsList.slice(0, currentOngoingMonthIndex + 1);

  // Cascade Rule #1: Evaluate Subject list content only after a parent paper tag is selected
  useEffect(() => {
    if (userFilters.papers.length === 0) {
      setAvailableSubjects([]);
      setAvailableTopics([]);
      setAvailableSubtopics([]);
      updateUserFilters({ subjects: [], topics: [], subtopics: [] });
      return;
    }
    const filtered = gsSyllabus.filter((s) => userFilters.papers.includes(s.paper));
    setAvailableSubjects(filtered);
  }, [userFilters.papers]);

  // Cascade Rule #2: Evaluate Topic list content only after a parent subject tag is selected
  useEffect(() => {
    if (userFilters.subjects.length === 0) {
      setAvailableTopics([]);
      setAvailableSubtopics([]);
      updateUserFilters({ topics: [], subtopics: [] });
      return;
    }
    const filtered = availableSubjects
      .filter((s) => userFilters.subjects.includes(s.id))
      .flatMap((s) => s.topics || []);
    setAvailableTopics(filtered);
  }, [userFilters.subjects, availableSubjects]);

  // Cascade Rule #3: Evaluate Subtopic list content only after a parent topic tag is selected
  useEffect(() => {
    if (userFilters.topics.length === 0) {
      setAvailableSubtopics([]);
      updateUserFilters({ subtopics: [] });
      return;
    }
    const filtered = availableTopics
      .filter((t) => userFilters.topics.includes(t.id))
      .flatMap((t) => t.subtopics || []);
    setAvailableSubtopics(filtered);
  }, [userFilters.topics, availableTopics]);

  const toggleArrayFilter = (field, value) => {
    const currentList = userFilters[field] || [];
    const updatedList = currentList.includes(value)
      ? currentList.filter((item) => item !== value)
      : [...currentList, value];
    updateUserFilters({ [field]: updatedList });
  };

  // ADVANCED: TARGETED FIRESTORE FILTER MATCHING QUERY ENGINE
  const handleLoadFilteredCAFromCloud = async () => {
    setCloudLoading(true);
    try {
      console.log("🔍 Compiling targeted search matrix criteria keys...", userFilters);
      
      let cloudQuery = collection(firestoreDb, "current_affairs_master");
      const queryConstraints = [];

      // Sift boundaries iteratively to map compound indexes cleanly
      if (userFilters.papers && userFilters.papers.length > 0) {
        queryConstraints.push(where("paperTag", "==", userFilters.papers[0]));
      }
      if (userFilters.subjects && userFilters.subjects.length > 0) {
        queryConstraints.push(where("subjectTag", "==", userFilters.subjects[0]));
      }
      if (userFilters.topics && userFilters.topics.length > 0) {
        queryConstraints.push(where("topicTag", "==", userFilters.topics[0]));
      }
      if (userFilters.subtopics && userFilters.subtopics.length > 0) {
        queryConstraints.push(where("subtopicTag", "==", userFilters.subtopics[0]));
      }
      if (userFilters.examType && userFilters.examType !== "BOTH") {
        queryConstraints.push(where("examType", "==", userFilters.examType));
      }

      // Chain constraints securely and set upper safety threshold bounds
      const builtQuery = query(cloudQuery, ...queryConstraints, limit(40));
      const querySnapshot = await getDocs(builtQuery);
      
      const matchedArticles = [];
      querySnapshot.forEach((docSnap) => {
        matchedArticles.push({ id: docSnap.id, ...docSnap.data() });
      });

      console.log(`📡 Cloud Search Complete: Ingesting ${matchedArticles.length} matching rows down to workspace...`);
      
      if (matchedArticles.length > 0) {
        // Hydrate local IndexedDB cache with search results instantly
        await db.current_affairs.bulkPut(matchedArticles);
      } else {
        alert("No exact matches found in the cloud repository for the selected tags.");
      }

      // Notify the active card read deck component views to update layout rows
      window.dispatchEvent(new Event("syllabus-update"));
    } catch (err) {
      console.error("Firestore targeted extraction sequence failed:", err);
      alert("Failed loading targeted records. Ensure index states are active.");
    } finally {
      setCloudLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left space-y-4 shadow-sm animate-in fade-in duration-200">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">🛠️ Dimensional Filter Matrix</span>
        <button 
          onClick={resetUserFilters}
          className="text-[11px] font-bold text-rose-600 hover:text-rose-700 bg-white border border-rose-200 px-2.5 py-1 rounded-lg transition-all shadow-sm active:scale-95 cursor-pointer"
        >
          Clear Selections
        </button>
      </div>

      {/* TARGET SCOPE & TIMELINE MODAL WRAPPERS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase text-slate-500">Exam Target Scope</label>
          <div className="flex gap-1.5">
            {["PRELIMS", "MAINS", "BOTH"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => updateUserFilters({ examType: type })}
                className={`px-4 py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  userFilters.examType === type
                    ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase text-slate-500">Chronological Aggregation Window</label>
          <div className="flex flex-wrap gap-1">
            {[
              // "All History" option completely excised from here
              { id: "weekly", label: "Weekly Grid" },
              { id: "monthly", label: "Monthly Deck" },
              { id: "quarterly", label: "Quarterly Logs" },
              { id: "yearly", label: "Year View" }
            ].map((windowOpt) => {
              // Ensure store updates mode selection smoothly since 'all' is dropped
              const isSelected = userFilters.timelineMode === windowOpt.id;
              return (
                <button
                  key={windowOpt.id}
                  type="button"
                  onClick={() => updateUserFilters({ timelineMode: windowOpt.id })}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-cyan-600 border-cyan-600 text-white shadow-sm"
                      : "bg-white text-slate-500 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {windowOpt.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* DYNAMIC RENDER DOCK: CONDITIONAL CHRONOLOGICAL FILTER VIEWS */}
      {userFilters.timelineMode !== "all" && (
        <div className="bg-white border border-slate-200 rounded-xl p-3 space-y-3 animate-in slide-in-from-top-2 duration-200">
          
          {/* WEEKLY GRID: Display months running exactly up to the ongoing month boundary dynamically */}
          {userFilters.timelineMode === "weekly" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">1. Target Month Selector</span>
                <select 
                  value={userFilters.selectedMonth}
                  onChange={(e) => updateUserFilters({ selectedMonth: e.target.value })}
                  className="w-full border border-slate-200 bg-slate-50 rounded-lg p-2 font-medium focus:outline-none focus:ring-1 focus:ring-cyan-500 outline-none cursor-pointer"
                >
                  <option value="">-- Choose Month --</option>
                  {activeMonthsLimitList.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">2. Target Week Selection (Descriptive Segments)</span>
                <div className="grid grid-cols-2 gap-1 pt-0.5">
                  {[
                    { id: "1", label: "W1 (1-7)" },
                    { id: "2", label: "W2(8-14)" },
                    { id: "3", label: "W3(15-21)" },
                    { id: "4", label: "W4 (21 onwards)" }
                  ].map(w => {
                    const active = userFilters.selectedWeeks.includes(w.id);
                    return (
                      <button 
                        key={w.id} 
                        type="button" 
                        onClick={() => toggleArrayFilter("selectedWeeks", w.id)} 
                        className={`py-1 rounded-lg border text-[10px] font-bold text-center transition-all cursor-pointer truncate ${
                          active ? "bg-cyan-500 border-cyan-500 text-white shadow-sm" : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        {w.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* MONTHLY DECK: Loads months strictly bound up to current ongoing tracking month */}
          {userFilters.timelineMode === "monthly" && (
            <div className="space-y-1 text-left">
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Select Target Month</span>
              <div className="flex flex-wrap gap-1">
                {activeMonthsLimitList.map(m => {
                  const active = userFilters.selectedMonth === m;
                  return (
                    <button 
                      key={m}
                      type="button"
                      onClick={() => updateUserFilters({ selectedMonth: active ? "" : m })}
                      className={`px-2.5 py-1 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                        active ? "bg-cyan-500 border-cyan-500 text-white shadow-sm font-black" : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {m}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {userFilters.timelineMode === "quarterly" && (
            <div className="space-y-1 text-left">
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Select Quarter Target Windows</span>
              <div className="flex gap-2">
                {[
                  { id: "1", label: "Q1 (Jan-Mar)" }, { id: "2", label: "Q2 (Apr-Jun)" },
                  { id: "3", label: "Q3 (Jul-Sep)" }, { id: "4", label: "Q4 (Oct-Dec)" }
                ].map(q => {
                  const active = userFilters.selectedQuarters.includes(q.id);
                  return (
                    <button key={q.id} type="button" onClick={() => toggleArrayFilter("selectedQuarters", q.id)} className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${active ? "bg-cyan-500 border-cyan-500 text-white shadow-sm" : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"}`}>{q.label}</button>
                  );
                })}
              </div>
            </div>
          )}

          {/* YEAR VIEW: Featuring separate discrete options for 2025, 2026, and 2027 */}
          {userFilters.timelineMode === "yearly" && (
            <div className="space-y-1 text-left">
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Select Horizon Horizon Windows</span>
              <div className="flex gap-2">
                {["2025", "2026", "2027"].map(y => {
                  const active = userFilters.selectedYears.includes(y);
                  return (
                    <button key={y} type="button" onClick={() => toggleArrayFilter("selectedYears", y)} className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${active ? "bg-cyan-500 border-cyan-500 text-white shadow-sm" : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"}`}>{y}</button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ROOT GENERAL STUDIES PAPER CHIP TRACKS */}
      <div className="space-y-1.5 pt-2 border-t border-slate-200/60">
        <label className="text-[11px] font-bold uppercase text-slate-500 block">General Studies Paper Index Matcher</label>
        <div className="flex gap-2">
          {["GS1", "GS2", "GS3", "GS4"].map((paper) => {
            const isSelected = userFilters.papers.includes(paper);
            return (
              <button
                key={paper}
                type="button"
                onClick={() => toggleArrayFilter("papers", paper)}
                className={`px-4 py-1.5 text-xs font-black rounded-xl border transition-all cursor-pointer ${
                  isSelected ? "bg-indigo-600 border-indigo-600 text-white shadow-sm" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {paper}
              </button>
            );
          })}
        </div>
      </div>

      {/* SEQUENTIAL CASCADE RENDER GRIDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-200/60">
        {/* SUBJECT SELECTION PANEL */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase text-slate-400">Subject Segment</label>
          <div className="max-h-[120px] overflow-y-auto bg-white border border-slate-200 rounded-xl p-1.5 space-y-0.5 custom-scrollbar min-h-[80px]">
            {availableSubjects.length > 0 ? (
              availableSubjects.map((s) => {
                const isSelected = userFilters.subjects.includes(s.id);
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => toggleArrayFilter("subjects", s.id)}
                    className={`w-full text-left px-2 py-1 text-[11px] rounded transition-all truncate block cursor-pointer ${
                      isSelected ? "bg-indigo-50 text-indigo-700 font-bold" : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {s.name}
                  </button>
                );
              })
            ) : (
              <div className="text-[10px] text-slate-400 italic text-center pt-6">Select a GS Paper first...</div>
            )}
          </div>
        </div>

        {/* TOPIC SELECTION PANEL */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase text-slate-400">Topic Segment</label>
          <div className="max-h-[120px] overflow-y-auto bg-white border border-slate-200 rounded-xl p-1.5 space-y-0.5 custom-scrollbar min-h-[80px]">
            {availableTopics.length > 0 ? (
              availableTopics.map((t) => {
                const isSelected = userFilters.topics.includes(t.id);
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => toggleArrayFilter("topics", t.id)}
                    className={`w-full text-left px-2 py-1 text-[11px] rounded transition-all truncate block cursor-pointer ${
                      isSelected ? "bg-amber-50 text-amber-800 font-bold" : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {t.name}
                  </button>
                );
              })
            ) : (
              <div className="text-[10px] text-slate-400 italic text-center pt-6">Select a Subject first...</div>
            )}
          </div>
        </div>

        {/* SUBTOPIC SELECTION PANEL */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase text-slate-400">Subtopic Segment</label>
          <div className="max-h-[120px] overflow-y-auto bg-white border border-slate-200 rounded-xl p-1.5 space-y-0.5 custom-scrollbar min-h-[80px]">
            {availableSubtopics.length > 0 ? (
              availableSubtopics.map((st) => {
                const isSelected = userFilters.subtopics.includes(st.id);
                return (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => toggleArrayFilter("subtopics", st.id)}
                    className={`w-full text-left px-2 py-1 text-[11px] rounded transition-all truncate block cursor-pointer ${
                      isSelected ? "bg-emerald-50 text-emerald-800 font-bold" : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {st.name}
                  </button>
                );
              })
            ) : (
              <div className="text-[10px] text-slate-400 italic text-center pt-6">Select a Topic first...</div>
            )}
          </div>
        </div>
      </div>

      {/* CLOUD ACTION DOCK: PLACED CLEANLY BENEATH SUBTOPIC MODULE */}
      <div className="pt-2 flex justify-end">
        <button
          type="button"
          disabled={cloudLoading}
          onClick={handleLoadFilteredCAFromCloud}
          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#1E2538] to-[#2E374E] hover:from-slate-800 hover:to-slate-700 text-white font-black text-xs rounded-xl shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {cloudLoading ? (
            <>
              <Loader2 size={14} className="animate-spin text-cyan-400" />
              <span>Scanning Knowledge Repositories...</span>
            </>
          ) : (
            <>
              <Search size={14} className="text-cyan-400" />
              <span>Load CA from Cloud</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default CAFilterConsole;