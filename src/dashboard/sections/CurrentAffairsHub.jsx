// src/dashboard/sections/CurrentAffairsHub.jsx
import { useState, useEffect } from "react"; // Integrated useEffect hook loop
import useLoginStore from "../../login/store/loginStore"; // Access core credential layer
import useCAStore from "../../currentaffairs/store/useCAStore";
import AdminCAForm from "../../currentaffairs/components/AdminCAForm";
import CAReadDeck from "../../currentaffairs/components/CAReadDeck";
import CAFilterConsole from "../../currentaffairs/components/CAFilterConsole";
// IMPORT TARGETED BACKGROUND SYNC ENGINE CONTROL NODE
import { syncCentralCA } from "../../currentaffairs/services/syncCentralCA";

// IMPORT COLLAPSIBLE CONTROL ICONS
import { SlidersHorizontal, ChevronUp, ChevronDown } from "lucide-react";

function CurrentAffairsHub() {
  const user = useLoginStore((state) => state.user); // Checks authenticated user object context
  const isAdmin = user?.email === "nishant53195@gmail.com"; // Enforces secure email guard boundary

  const { activeTab, setActiveTab, timeChip, setTimeChip } = useCAStore();
  
  // NEW STATE: Tracks visibility of the collapsible dimensions filter console panel
  const [isFilterExpanded, setIsFilterExpanded] = useState(true);

  // AUTOMATED TARGETED BACKGROUND SYNCHRONIZATION HANDSHAKE
  useEffect(() => {
    // Executes an isolated, background download chunk exclusively for current affairs master nodes
    syncCentralCA().catch((err) =>
      console.error("[CA Background Sync] Pull execution delayed:", err)
    );
  }, [activeTab, timeChip]); // Safely re-runs when switching tabs or time filters

  return (
    <div className="space-y-5 text-left font-sans antialiased bg-[#FAFBFD] min-h-screen p-2">
      
      {/* HEADER SECTION PANEL BRANDING */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-indigo-50 border border-indigo-150 flex items-center justify-center text-indigo-600 shadow-3xs shrink-0">
            📝
          </div>
          <div>
            <h2 className="text-xl font-black text-[#111625] tracking-tight">Current Affairs Knowledge Publisher</h2>
            <p className="text-xs font-semibold text-slate-400 mt-0.5">
              Dynamically contextualize evolving current updates against structural static syllabus nodes.
            </p>
          </div>
        </div>

        {/* Dynamic Multi-Mode Navigation Tab Trigger Blocks */}
        <div className="flex items-center gap-1 bg-slate-50 border border-slate-200/80 p-1 rounded-xl self-start sm:self-center shadow-3xs">
          <button 
            type="button"
            onClick={() => setActiveTab("read_ca")} 
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === "read_ca" 
                ? "bg-white text-indigo-600 shadow-3xs border border-slate-200/60 font-black" 
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Read Articles
          </button>
          
          {isAdmin && (
            <button 
              type="button"
              onClick={() => setActiveTab("create_ca")} 
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === "create_ca" 
                  ? "bg-white border border-amber-200 text-amber-700 shadow-3xs font-black" 
                  : "text-amber-600 hover:text-amber-700"
              }`}
            >
              Add Entry (Admin)
            </button>
          )}
        </div>
      </div>

      {/* RENDER PORTS VIEW CHANNELS */}
      {activeTab === "create_ca" && isAdmin ? (
        <div className="space-y-5 animate-in fade-in duration-200">
          {/* ADMINISTRATIVE SESSION NOTICE BAR */}
          <div className="bg-[#FFF8F2] border border-[#FFEADA] rounded-xl p-3 flex items-center gap-2.5 text-[#D96B27]">
            <span className="text-xs shrink-0">🛡️</span>
            <span className="text-[11px] font-black uppercase tracking-wider">
              Authorized Administrator Session: Publishing Context Data Layer.
            </span>
          </div>

          {/* Form Content Anchor Shell */}
          <div className="bg-white border border-[#EBEFF8] rounded-[2rem] p-5 shadow-[0_8px_24px_rgba(235,240,248,0.35)]">
            <AdminCAForm />
          </div>
        </div>
      ) : (
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* USER CHIP VIEW SELECTORS FILTER DECK STRIP */}
          <div className="flex items-center justify-between border-b border-slate-200/60 pb-2.5 gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <button 
                type="button"
                onClick={() => setTimeChip("today")} 
                className={`px-4 py-1.5 text-xs font-black rounded-xl border transition-all cursor-pointer ${
                  timeChip === "today" 
                    ? "bg-[#E8EEFF] border-transparent text-indigo-600 shadow-3xs" 
                    : "bg-white border-slate-200 text-slate-500 hover:text-slate-800"
                }`}
              >
                Today's CA
              </button>
              <button 
                type="button"
                onClick={() => setTimeChip("all")} 
                className={`px-4 py-1.5 text-xs font-black rounded-xl border transition-all cursor-pointer ${
                  timeChip === "all" 
                    ? "bg-[#E8EEFF] border-transparent text-indigo-600 shadow-3xs" 
                    : "bg-white border-slate-200 text-slate-500 hover:text-slate-800"
                }`}
              >
                All CA Deck Matrix
              </button>
            </div>

            {/* DYNAMIC SHOWN COLLAPSIBLE TRIGGER CONTROLS BUTTON */}
            {timeChip === "all" && (
              <button
                type="button"
                onClick={() => setIsFilterExpanded(prev => !prev)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-black rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-all shadow-3xs cursor-pointer"
              >
                <SlidersHorizontal size={13} />
                <span>{isFilterExpanded ? "Hide Filters" : "Show Filters"}</span>
                {isFilterExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
              </button>
            )}
          </div>

          {/* Conditional Query Filters Row Deck Module with active collapsible layout gating */}
          {timeChip === "all" && isFilterExpanded && (
            <div className="bg-white border border-[#EBEFF8] rounded-2xl p-4 shadow-3xs animate-in slide-in-from-top-2 duration-200">
              <CAFilterConsole />
            </div>
          )}

          {/* Main List Read Viewport Canvas Wrapper */}
          <div className="rounded-2xl">
            <CAReadDeck />
          </div>
        </div>
      )}
    </div>
  );
}

export default CurrentAffairsHub;