// src/dashboard/sections/TestYourPrelims.jsx
import { useState } from "react";
import useLoginStore from "../../login/store/loginStore";
import AdminQuestionForm from "../../prelims/components/AdminQuestionForm";

function TestYourPrelims() {
  const user = useLoginStore((state) => state.user);
  const isAdmin = user?.email === "nishant53195@gmail.com";

  const [activeChip, setActiveChip] = useState("mcq");
  const [subSection, setSubSection] = useState("take_test");

  return (
    <div className="space-y-5 text-left font-sans antialiased text-slate-800 min-h-screen">
      
      {/* HEADER SEGMENT */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-black text-[#111625] tracking-tight">Adaptive Testing Sandbox</h2>
          <p className="text-xs font-semibold text-slate-400 mt-0.5">Run adaptive question suites or record official custom test scripts.</p>
        </div>
        
        <div className="flex bg-slate-100 border border-slate-200 p-1 rounded-xl shrink-0 self-start sm:self-center shadow-3xs">
          <button 
            type="button"
            onClick={() => { setActiveChip("mcq"); if (subSection === "admin_creator") setSubSection("take_test"); }} 
            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${activeChip === "mcq" && subSection !== "admin_creator" ? "bg-white border border-slate-200 text-indigo-600 shadow-3xs font-black" : "text-slate-500 hover:text-slate-800"}`}
          >
            MCQ Engine
          </button>
          <button 
            type="button"
            onClick={() => { setActiveChip("pyq"); if (subSection === "admin_creator") setSubSection("take_test"); }} 
            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${activeChip === "pyq" && subSection !== "admin_creator" ? "bg-white border border-slate-200 text-indigo-600 shadow-3xs font-black" : "text-slate-500 hover:text-slate-800"}`}
          >
            PYQ Records
          </button>
        </div>
      </div>

      {/* MULTI-TAB VIEW SELECTORS FRAME STRIP */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/60 pb-2.5">
        <div className="flex gap-1.5 overflow-x-auto scrollbar-none">
          {[
            { id: "take_test", label: "Take Practice Sandbox" },
            { id: "feed_data", label: "Telemetry Logs" },
            { id: "analytics", label: "Mistake Clusters" }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSubSection(tab.id)}
              className={`text-xs px-4 py-1.5 font-black rounded-xl border transition-all cursor-pointer ${
                subSection === tab.id
                  ? "bg-[#E8EEFF] border-transparent text-indigo-600 shadow-3xs"
                  : "bg-white border-slate-200 text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* SECURITY BOUNDARY EXCLUSIVE BUTTON: Only rendered if you are logged in as admin */}
        {isAdmin && (
          <button
            type="button"
            onClick={() => setSubSection(subSection === "admin_creator" ? "take_test" : "admin_creator")}
            className={`px-4 py-1.5 text-xs font-black rounded-xl border transition-all shadow-3xs flex items-center gap-1 cursor-pointer ${
              subSection === "admin_creator"
                ? "bg-amber-50 border-amber-200 text-amber-700 font-black"
                : "bg-white border-amber-200 text-amber-600 hover:bg-amber-50/50"
            }`}
          >
            ⚙️ {subSection === "admin_creator" ? "Exit Question Creator" : "Add Questions (Admin)"}
          </button>
        )}
      </div>

      {/* MASTER PORTS DISPLAY SHELL */}
      <div className="bg-white border border-[#EBEFF8] rounded-[2rem] p-6 shadow-[0_8px_24px_rgba(235,240,248,0.35)] min-h-[20rem]">
        
        {subSection === "admin_creator" && isAdmin ? (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="bg-[#FFF8F2] border border-[#FFEADA] rounded-xl p-3 flex items-center gap-2 text-[#D96B27]">
              <span className="text-xs shrink-0">🔒</span>
              <span className="text-[11px] font-black uppercase tracking-wider">
                Authorized Administrator Mode: Seeding Master Question Registries.
              </span>
            </div>
            <AdminQuestionForm onComplete={() => setSubSection("take_test")} />
          </div>
        ) : (
          <div className="flex items-center justify-center text-center h-full py-12 animate-in fade-in duration-200">
            {subSection === "take_test" && (
              <div className="max-w-md space-y-1.5">
                <span className="text-3xl block">🎮</span>
                <p className="text-sm font-black text-slate-800">Configure Sandbox {activeChip.toUpperCase()} Test Session</p>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">
                  Supports micro subtopic check-ins, custom syllabus weight matrices, and timed UPSC examination environments.
                </p>
              </div>
            )}

            {subSection === "feed_data" && (
              <div className="max-w-md space-y-1.5">
                <span className="text-3xl block">📊</span>
                <p className="text-sm font-black text-slate-800">Offline {activeChip.toUpperCase()} Telemetry Feed</p>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">
                  Log historical accuracy scores, omitted choices, and duration tracking parameters directly to your local database engine.
                </p>
              </div>
            )}

            {subSection === "analytics" && (
              <div className="max-w-md space-y-1.5">
                <span className="text-3xl block">🎯</span>
                <p className="text-sm font-black text-slate-800">{activeChip.toUpperCase()} Mistake Cluster Core Mappings</p>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">
                  Triggers dynamic breakdown reports mapping systemic memory slips, structural conceptual bugs, and careless oversights.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}

export default TestYourPrelims;