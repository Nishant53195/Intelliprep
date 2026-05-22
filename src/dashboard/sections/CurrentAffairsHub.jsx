import { useState } from "react";
import useLoginStore from "../../login/store/loginStore";

function CurrentAffairsHub() {
  const user = useLoginStore((state) => state.user);
  const isAdmin = user?.email === "nishant53195@gmail.com";
  
  const [activeTab, setActiveTab] = useState("read_ca");

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Current Affairs Terminal</h2>
          <p className="text-xs text-slate-500 mt-0.5">Track evolving context, core linkages, and static syllabus references.</p>
        </div>

        <div className="flex bg-slate-100 border border-slate-200 p-1 rounded-xl shrink-0">
          <button 
            onClick={() => setActiveTab("read_ca")} 
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${activeTab === "read_ca" ? "bg-white border border-slate-200 text-cyan-600 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
          >
            📚 Read CA
          </button>
          
          {isAdmin && (
            <button 
              onClick={() => setActiveTab("create_ca")} 
              className={`ml-1 px-3 py-1 text-xs font-bold rounded-lg transition-all ${activeTab === "create_ca" ? "bg-white border border-amber-300 text-amber-700 shadow-sm" : "text-amber-600 hover:text-amber-700"}`}
            >
              ⚡ Create CA (Admin)
            </button>
          )}
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 min-h-[16rem]">
        {activeTab === "create_ca" && isAdmin ? (
          <form className="space-y-3 max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
            <h3 className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">Publish Intelligence Context</h3>
            
            <input type="text" placeholder="Title" className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-cyan-500" />
            <textarea placeholder="Summary" rows={3} className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-cyan-500 resize-none" />
            
            <div className="grid grid-cols-2 gap-2">
              <input type="text" placeholder="Source" className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-cyan-500" />
              <input type="date" className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 outline-none focus:border-cyan-500" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <input type="text" placeholder="Paper Tag" className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-[11px] text-slate-800 outline-none" />
              <input type="text" placeholder="Subject Tag" className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-[11px] text-slate-800 outline-none" />
              <input type="text" placeholder="Topic Tag" className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-[11px] text-slate-800 outline-none" />
              <input type="text" placeholder="Subtopic Tag" className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-[11px] text-slate-800 outline-none" />
            </div>

            <button type="submit" className="w-full py-2.5 bg-white border border-amber-200 font-bold text-xs text-amber-700 rounded-xl shadow-sm hover:bg-slate-50 transition-colors">
              Commit Entry Node
            </button>
          </form>
        ) : (
          <div className="space-y-2">
            <div className="flex gap-1.5 mb-3 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-[10px] px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-800 font-bold whitespace-nowrap">Filter: All Papers</span>
              <span className="text-[10px] px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-500 font-medium whitespace-nowrap">GS I</span>
              <span className="text-[10px] px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-500 font-medium whitespace-nowrap">GS II</span>
              <span className="text-[10px] px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-500 font-medium whitespace-nowrap">GS III</span>
            </div>
            <p className="text-center text-xs text-slate-500 pt-8">
              No current affairs items found in database query context. Today's entries surface automatically.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CurrentAffairsHub;