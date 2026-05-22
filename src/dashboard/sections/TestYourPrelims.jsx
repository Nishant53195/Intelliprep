import { useState } from "react";

function TestYourPrelims() {
  const [activeChip, setActiveChip] = useState("mcq");
  const [subSection, setSubSection] = useState("take_test");

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Test Your Prelims</h2>
          <p className="text-xs text-slate-500 mt-0.5">Run adaptive question suites or record physical mock diagnostics.</p>
        </div>

        <div className="flex bg-slate-100 border border-slate-200 p-1 rounded-xl shrink-0">
          <button onClick={() => setActiveChip("mcq")} className={`px-4 py-1 text-xs font-bold rounded-lg transition-all ${activeChip === "mcq" ? "bg-white border border-slate-200 text-cyan-600 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}>MCQ Engine</button>
          <button onClick={() => setActiveChip("pyq")} className={`px-4 py-1 text-xs font-bold rounded-lg transition-all ${activeChip === "pyq" ? "bg-white border border-slate-200 text-cyan-600 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}>PYQ Records</button>
        </div>
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {["take_test", "feed_data", "analytics"].map((tab) => (
          <button
            key={tab}
            onClick={() => setSubSection(tab)}
            className={`text-xs px-3 py-1 font-bold rounded-lg border capitalize transition-all ${
              subSection === tab ? "bg-slate-100 border-slate-200 text-slate-900 shadow-sm" : "bg-transparent border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {tab.replace("_", " ")}
          </button>
        ))}
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 min-h-[16rem] flex items-center justify-center text-center shadow-inner">
        {subSection === "take_test" && (
          <div className="max-w-xs space-y-1">
            <p className="text-xs font-bold text-slate-800">Configure Sandbox {activeChip.toUpperCase()} Test Session</p>
            <p className="text-[11px] text-slate-500">Supports micro subtopic check-ins, custom subject arrays, and timed UPSC mocks.</p>
          </div>
        )}
        {subSection === "feed_data" && (
          <div className="max-w-xs space-y-1">
            <p className="text-xs font-bold text-slate-800">Offline {activeChip.toUpperCase()} Telemetry Feed</p>
            <p className="text-[11px] text-slate-500">Log accuracy trends, skipped configurations, and error classifications straight to Dexie.</p>
          </div>
        )}
        {subSection === "analytics" && (
          <div className="max-w-xs space-y-1">
            <p className="text-xs font-bold text-slate-800">{activeChip.toUpperCase()} Mistake Cluster Analytics</p>
            <p className="text-[11px] text-slate-500">Triggers automated insight mappings across memory, conceptual, and careless errors.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TestYourPrelims;