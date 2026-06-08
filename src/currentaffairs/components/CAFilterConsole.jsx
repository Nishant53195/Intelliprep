// src/currentaffairs/components/CAFilterConsole.jsx
import { useEffect, useState } from "react";
import useCAStore from "../store/useCAStore";
import gsSyllabus from "../../constants/gsSyllabus"; // References core static structural syllabus arrays[cite: 2]

function CAFilterConsole() {
  const { userFilters, updateUserFilters, resetUserFilters } = useCAStore(); //[cite: 2]
  
  const [availableSubjects, setAvailableSubjects] = useState([]); //[cite: 2]
  const [availableTopics, setAvailableTopics] = useState([]); //[cite: 2]
  const [availableSubtopics, setAvailableSubtopics] = useState([]); //[cite: 2]

  // Base list of all months for reference[cite: 2]
  const fullMonthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; //[cite: 2]
  
  // Programmatic cutoff point configuration for 2026 tracking context[cite: 2]
  const currentMonthIndex = 5; // June (0-indexed base)[cite: 2]
  
  // Filter list parameters dynamically up to current month (January to June)[cite: 2]
  const activeMonthsLimitList = fullMonthsList.slice(0, currentMonthIndex + 1); //[cite: 2]
  
  // Specialized Custom Fiscal Cycle Macro Horizons[cite: 2]
  const specializedYearsList = ["2025-2026", "2026-2027"]; //[cite: 2]

  // Cascade Rule #1: Evaluate Subject dropdown list content ONLY after a parent paper tag is selected[cite: 2]
  useEffect(() => {
    if (userFilters.papers.length === 0) {
      setAvailableSubjects([]); //[cite: 2]
      setAvailableTopics([]); //[cite: 2]
      setAvailableSubtopics([]); //[cite: 2]
      updateUserFilters({ subjects: [], topics: [], subtopics: [] }); //[cite: 2]
      return;
    }
    const filtered = gsSyllabus.filter((s) => userFilters.papers.includes(s.paper)); //[cite: 2]
    setAvailableSubjects(filtered); //[cite: 2]
  }, [userFilters.papers]); //[cite: 2]

  // Evaluate Topic dropdown list content ONLY after a parent subject tag is selected[cite: 2]
  useEffect(() => {
    if (userFilters.subjects.length === 0) {
      setAvailableTopics([]); //[cite: 2]
      setAvailableSubtopics([]); //[cite: 2]
      updateUserFilters({ topics: [], subtopics: [] }); //[cite: 2]
      return;
    }
    const filtered = availableSubjects
      .filter((s) => userFilters.subjects.includes(s.id)) //[cite: 2]
      .flatMap((s) => s.topics || []); //[cite: 2]
    setAvailableTopics(filtered); //[cite: 2]
  }, [userFilters.subjects, availableSubjects]); //[cite: 2]

  // Evaluate Subtopic dropdown list content ONLY after a parent topic tag is selected[cite: 2]
  useEffect(() => {
    if (userFilters.topics.length === 0) {
      setAvailableSubtopics([]); //[cite: 2]
      updateUserFilters({ subtopics: [] }); //[cite: 2]
      return;
    }
    const filtered = availableTopics
      .filter((t) => userFilters.topics.includes(t.id)) //[cite: 2]
      .flatMap((t) => t.subtopics || []); //[cite: 2]
    setAvailableSubtopics(filtered); //[cite: 2]
  }, [userFilters.topics, availableTopics]); //[cite: 2]

  const toggleArrayFilter = (field, value) => {
    const currentList = userFilters[field] || []; //[cite: 2]
    const updatedList = currentList.includes(value)
      ? currentList.filter((item) => item !== value)
      : [...currentList, value];
    updateUserFilters({ [field]: updatedList }); //[cite: 2]
  };

  // Live click handler for the drop-down month change event block[cite: 2]
  const handleSelectMonthLive = (e) => {
    updateUserFilters({ selectedMonth: e.target.value }); //[cite: 2]
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left space-y-4 shadow-sm animate-in fade-in duration-200"> {/*[cite: 2] */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3"> {/*[cite: 2] */}
        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">🎯 Dimensional Filter Matrix</span> {/*[cite: 2] */}
        <button 
          onClick={resetUserFilters} //[cite: 2]
          className="text-[11px] font-bold text-rose-600 hover:text-rose-700 bg-white border border-rose-200 px-2.5 py-1 rounded-lg transition-all shadow-sm active:scale-95" //[cite: 2]
        >
          Clear Selections
        </button> {/*[cite: 2] */}
      </div>

      {/* TARGET SCOPE & TIMELINE MODAL WRAPPERS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/*[cite: 2] */}
        <div className="space-y-1.5"> {/*[cite: 2] */}
          <label className="text-[11px] font-bold uppercase text-slate-500">Exam Target Scope</label> {/*[cite: 2] */}
          <div className="flex gap-1.5"> {/*[cite: 2] */}
            {["PRELIMS", "MAINS", "BOTH"].map((type) => ( //[cite: 2]
              <button
                key={type} //[cite: 2]
                type="button" //[cite: 2]
                onClick={() => updateUserFilters({ examType: type })} //[cite: 2]
                className={`px-4 py-1.5 text-xs font-bold rounded-xl border transition-all ${
                  userFilters.examType === type //[cite: 2]
                    ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {type}
              </button> //[cite: 2]
            ))}
          </div>
        </div>

        <div className="space-y-1.5"> {/*[cite: 2] */}
          <label className="text-[11px] font-bold uppercase text-slate-500">Chronological Aggregation Window</label> {/*[cite: 2] */}
          <div className="flex flex-wrap gap-1"> {/*[cite: 2] */}
            {[
              { id: "all", label: "All History" },
              { id: "weekly", label: "Weekly Grid" },
              { id: "monthly", label: "Monthly Deck" },
              { id: "quarterly", label: "Quarterly Logs" },
              { id: "yearly", label: "Year View" }
            ].map((window) => ( //[cite: 2]
              <button
                key={window.id} //[cite: 2]
                type="button" //[cite: 2]
                onClick={() => updateUserFilters({ timelineMode: window.id })} //[cite: 2]
                className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-all ${
                  userFilters.timelineMode === window.id //[cite: 2]
                    ? "bg-cyan-600 border-cyan-600 text-white shadow-sm"
                    : "bg-white text-slate-500 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {window.label}
              </button> //[cite: 2]
            ))}
          </div>
        </div>
      </div>

      {/* DYNAMIC RENDER DOCK: CONDITIONAL TIMELINE FILTER FIELDS */}
      {userFilters.timelineMode !== "all" && ( //[cite: 2]
        <div className="bg-white border border-slate-200 rounded-xl p-3 space-y-3 animate-in slide-in-from-top-2 duration-200"> {/*[cite: 2] */}
          
          {/* WEEKLY GRID: Months up to current month (June) inside dropdown */}
          {userFilters.timelineMode === "weekly" && ( //[cite: 2]
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs"> {/*[cite: 2] */}
              <div className="space-y-1"> {/*[cite: 2] */}
                <span className="text-[10px] font-bold text-slate-400 uppercase">1. Target Month Selector</span> {/*[cite: 2] */}
                <select 
                  value={userFilters.selectedMonth} //[cite: 2]
                  onChange={handleSelectMonthLive} //[cite: 2]
                  className="w-full border border-slate-200 bg-slate-50 rounded-lg p-2 font-medium focus:outline-none focus:ring-1 focus:ring-cyan-500"
                >
                  <option value="">-- Choose Month --</option>
                  {activeMonthsLimitList.map(m => <option key={m} value={m}>{m}</option>)} {/*[cite: 2] */}
                </select>
              </div>
              <div className="space-y-1"> {/*[cite: 2] */}
                <span className="text-[10px] font-bold text-slate-400 uppercase">2. Target Week Selection (Multi-Select)</span> {/*[cite: 2] */}
                <div className="flex gap-1 pt-0.5"> {/*[cite: 2] */}
                  {["1", "2", "3", "4"].map(w => { //[cite: 2]
                    const active = userFilters.selectedWeeks.includes(w); //[cite: 2]
                    return (
                      <button key={w} type="button" onClick={() => toggleArrayFilter("selectedWeeks", w)} className={`flex-1 py-1.5 rounded-lg border font-bold text-center transition-all ${active ? "bg-cyan-500 border-cyan-500 text-white shadow-sm" : "bg-slate-50 border-slate-200 text-slate-600"}`}>W{w}</button> //[cite: 2]
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* MONTHLY DECK: Shows month buttons running up exclusively to the current active month selection */}
          {userFilters.timelineMode === "monthly" && ( //[cite: 2]
            <div className="space-y-1 text-left"> {/*[cite: 2] */}
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Select Target Month</span> {/*[cite: 2] */}
              <div className="flex flex-wrap gap-1"> {/*[cite: 2] */}
                {activeMonthsLimitList.map(m => { //[cite: 2]
                  const active = userFilters.selectedMonth === m;
                  return (
                    <button 
                      key={m} 
                      type="button" 
                      onClick={() => updateUserFilters({ selectedMonth: active ? "" : m })} 
                      className={`px-2.5 py-1 text-xs font-medium rounded-lg border transition-all ${active ? "bg-cyan-500 border-cyan-500 text-white shadow-sm font-black" : "bg-slate-50 text-slate-600 border-slate-200"}`}
                    >
                      {m}
                    </button> //[cite: 2]
                  );
                })}
              </div>
            </div>
          )}

          {userFilters.timelineMode === "quarterly" && ( //[cite: 2]
            <div className="space-y-1 text-left"> {/*[cite: 2] */}
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Select Quarter Target Windows (Multi-Select Allowed)</span> {/*[cite: 2] */}
              <div className="flex gap-2"> {/*[cite: 2] */}
                {[
                  { id: "1", label: "Q1 (Jan-Mar)" }, { id: "2", label: "Q2 (Apr-Jun)" }, //[cite: 2]
                  { id: "3", label: "Q3 (Jul-Sep)" }, { id: "4", label: "Q4 (Oct-Dec)" } //[cite: 2]
                ].map(q => { //[cite: 2]
                  const active = userFilters.selectedQuarters.includes(q.id); //[cite: 2]
                  return (
                    <button key={q.id} type="button" onClick={() => toggleArrayFilter("selectedQuarters", q.id)} className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${active ? "bg-cyan-500 border-cyan-500 text-white shadow-sm" : "bg-slate-50 border-slate-200 text-slate-600"}`}>{q.label}</button> //[cite: 2]
                  );
                })}
              </div>
            </div>
          )}

          {/* YEAR VIEW: Shows 2025-2026 and 2026-2027 live control switches */}
          {userFilters.timelineMode === "yearly" && ( //[cite: 2]
            <div className="space-y-1 text-left"> {/*[cite: 2] */}
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Select Horizon Cycles (Multi-Select Allowed)</span> {/*[cite: 2] */}
              <div className="flex gap-2"> {/*[cite: 2] */}
                {specializedYearsList.map(y => { //[cite: 2]
                  const active = userFilters.selectedYears.includes(y); //[cite: 2]
                  return (
                    <button key={y} type="button" onClick={() => toggleArrayFilter("selectedYears", y)} className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all ${active ? "bg-cyan-500 border-cyan-500 text-white shadow-sm" : "bg-slate-50 border-slate-200 text-slate-600"}`}>{y}</button> //[cite: 2]
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ROOT GENERAL STUDIES PAPER CHIP TRACKS */}
      <div className="space-y-1.5 pt-2 border-t border-slate-200/60"> {/*[cite: 2] */}
        <label className="text-[11px] font-bold uppercase text-slate-500 block">General Studies Paper Index Matcher</label> {/*[cite: 2] */}
        <div className="flex gap-2"> {/*[cite: 2] */}
          {["GS1", "GS2", "GS3", "GS4"].map((paper) => { //[cite: 2]
            const isSelected = userFilters.papers.includes(paper); //[cite: 2]
            return (
              <button
                key={paper} //[cite: 2]
                type="button" //[cite: 2]
                onClick={() => toggleArrayFilter("papers", paper)} //[cite: 2]
                className={`px-4 py-1.5 text-xs font-black rounded-xl border transition-all ${
                  isSelected ? "bg-indigo-600 border-indigo-600 text-white shadow-sm" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {paper}
              </button> //[cite: 2]
            );
          })}
        </div>
      </div>

      {/* SEQUENTIAL CASCADE RENDER GRIDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-200/60"> {/*[cite: 2] */}
        {/* SUBJECT SELECTION PANEL */}
        <div className="space-y-1"> {/*[cite: 2] */}
          <label className="text-[10px] font-bold uppercase text-slate-400">Subject Segment</label> {/*[cite: 2] */}
          <div className="max-h-[120px] overflow-y-auto bg-white border border-slate-200 rounded-xl p-1.5 space-y-0.5 custom-scrollbar min-h-[80px]"> {/*[cite: 2] */}
            {availableSubjects.length > 0 ? ( //[cite: 2]
              availableSubjects.map((s) => { //[cite: 2]
                const isSelected = userFilters.subjects.includes(s.id); //[cite: 2]
                return (
                  <button
                    key={s.id} //[cite: 2]
                    type="button" //[cite: 2]
                    onClick={() => toggleArrayFilter("subjects", s.id)} //[cite: 2]
                    className={`w-full text-left px-2 py-1 text-[11px] rounded transition-all truncate block ${
                      isSelected ? "bg-indigo-50 text-indigo-700 font-bold" : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {s.name}
                  </button> //[cite: 2]
                );
              })
            ) : (
              <div className="text-[10px] text-slate-400 italic text-center pt-6">Select a GS Paper first...</div> //[cite: 2]
            )}
          </div>
        </div>

        {/* TOPIC SELECTION PANEL */}
        <div className="space-y-1"> {/*[cite: 2] */}
          <label className="text-[10px] font-bold uppercase text-slate-400">Topic Segment</label> {/*[cite: 2] */}
          <div className="max-h-[120px] overflow-y-auto bg-white border border-slate-200 rounded-xl p-1.5 space-y-0.5 custom-scrollbar min-h-[80px]"> {/*[cite: 2] */}
            {availableTopics.length > 0 ? ( //[cite: 2]
              availableTopics.map((t) => { //[cite: 2]
                const isSelected = userFilters.topics.includes(t.id); //[cite: 2]
                return (
                  <button
                    key={t.id} //[cite: 2]
                    type="button" //[cite: 2]
                    onClick={() => toggleArrayFilter("topics", t.id)} //[cite: 2]
                    className={`w-full text-left px-2 py-1 text-[11px] rounded transition-all truncate block ${
                      isSelected ? "bg-amber-50 text-amber-800 font-bold" : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {t.name}
                  </button> //[cite: 2]
                );
              })
            ) : (
              <div className="text-[10px] text-slate-400 italic text-center pt-6">Select a Subject first...</div> //[cite: 2]
            )}
          </div>
        </div>

        {/* SUBTOPIC SELECTION PANEL */}
        <div className="space-y-1"> {/*[cite: 2] */}
          <label className="text-[10px] font-bold uppercase text-slate-400">Subtopic Segment</label> {/*[cite: 2] */}
          <div className="max-h-[120px] overflow-y-auto bg-white border border-slate-200 rounded-xl p-1.5 space-y-0.5 custom-scrollbar min-h-[80px]"> {/*[cite: 2] */}
            {availableSubtopics.length > 0 ? ( //[cite: 2]
              availableSubtopics.map((st) => { //[cite: 2]
                const isSelected = userFilters.subtopics.includes(st.id); //[cite: 2]
                return (
                  <button
                    key={st.id} //[cite: 2]
                    type="button" //[cite: 2]
                    onClick={() => toggleArrayFilter("subtopics", st.id)} //[cite: 2]
                    className={`w-full text-left px-2 py-1 text-[11px] rounded transition-all truncate block ${
                      isSelected ? "bg-emerald-50 text-emerald-800 font-bold" : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {st.name}
                  </button> //[cite: 2]
                );
              })
            ) : (
              <div className="text-[10px] text-slate-400 italic text-center pt-6">Select a Topic first...</div> //[cite: 2]
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CAFilterConsole;