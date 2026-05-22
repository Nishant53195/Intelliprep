import { useState } from "react";

function KnowledgeGraph() {
  const [graphMode, setGraphMode] = useState("today");

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Knowledge Graphs</h2>
          <p className="text-xs text-slate-500 mt-0.5">Visualize multidimensional node maps matching subjects, PYQs, and weak spots.</p>
        </div>

        <div className="flex gap-1.5 bg-slate-100 border border-slate-200 p-1 rounded-xl shrink-0">
          <button 
            onClick={() => setGraphMode("today")} 
            className={`text-xs px-3 py-1 font-bold rounded-lg transition-all ${graphMode === "today" ? "bg-white border border-slate-200 text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
          >
            Today's Topic Graph
          </button>
          <button 
            onClick={() => setGraphMode("search")} 
            className={`text-xs px-3 py-1 font-bold rounded-lg transition-all ${graphMode === "search" ? "bg-white border border-slate-200 text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
          >
            Search Topic Graph
          </button>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 min-h-[20rem] flex flex-col items-center justify-center text-center relative overflow-hidden shadow-inner">
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#64748b_1px,transparent_1px),linear-gradient(to_bottom,#64748b_1px,transparent_1px)] bg-[size:16px_24px] pointer-events-none" />

        {graphMode === "search" && (
          <div className="w-full max-w-sm mb-4 z-10">
            <input 
              type="text" 
              placeholder="🔍 Search specific syllabus graph topic nodes... (e.g. Inflation)" 
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 text-center outline-none focus:border-cyan-500"
            />
          </div>
        )}

        <div className="max-w-xs space-y-1.5 z-10">
          <span className="text-2xl opacity-80">🕸️</span>
          <p className="text-xs font-bold text-slate-800">
            {graphMode === "today" ? "Active Daily Topic Network Map" : "Custom Topic Query Mapping"}
          </p>
          <p className="text-[11px] text-slate-500">
            Interactive canvas linking current topics to historical PYQ frequencies and logged mistake clusters will render here.
          </p>
        </div>
      </div>
    </div>
  );
}

export default KnowledgeGraph;