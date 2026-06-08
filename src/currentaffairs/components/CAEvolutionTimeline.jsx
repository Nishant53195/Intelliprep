import { useEffect, useState } from "react";
import { db } from "../../database/dexie";
import dayjs from "dayjs";

function CAEvolutionTracker({ rootEntry }) {
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function traceHistoricalNodes() {
      if (!rootEntry) return;
      setLoading(true);
      
      const chain = [{ ...rootEntry, isTargetNode: true }];
      let currentPointer = rootEntry;

      // Deep trace recursion loop across parent evolution tracking arrays
      while (currentPointer?.issueEvolutionIds && currentPointer.issueEvolutionIds.length > 0) {
        const parentId = currentPointer.issueEvolutionIds[0];
        const parentNode = await db.current_affairs.get(parentId);
        
        if (parentNode) {
          chain.unshift(parentNode); // Insert chronological parent at the beginning of the array
          currentPointer = parentNode;
        } else {
          break; // Historical node out of cache bounds or broken reference link
        }
      }
      
      setEvolutionChain(chain);
      setLoading(false);
    }

    traceHistoricalNodes();
  }, [rootEntry]);

  if (loading) {
    return <div className="text-[11px] font-mono font-bold text-slate-400 animate-pulse py-2">Assembling history mapping chains...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-1.5 border-b border-slate-200/60 pb-1.5">
        <span className="text-[11px] font-black text-slate-700 uppercase tracking-wide">⏱️ Chronological Evolution Roadmap</span>
      </div>

      <div className="relative pl-4 space-y-4 before:absolute before:bottom-2 before:top-2 before:left-[5px] before:w-px before:bg-slate-200">
        {evolutionChain.map((node, idx) => (
          <div key={node.id} className="relative group text-left">
            {/* TIMELINE INTERACTIVE NODE PIN */}
            <div className={`absolute -left-[15px] top-1.5 h-2 w-2 rounded-full border transition-transform duration-200 group-hover:scale-125 ${
              node.isTargetNode 
                ? "bg-cyan-500 border-cyan-200 ring-4 ring-cyan-100 animate-pulse" 
                : "bg-slate-400 border-white ring-2 ring-slate-100"
            }`} />
            
            {/* CONTENT LOG DECK PANEL */}
            <div className={`rounded-xl p-3 transition-all border ${
              node.isTargetNode 
                ? "bg-cyan-50/40 border-cyan-200 shadow-sm" 
                : "bg-white border-slate-200/70 opacity-75 hover:opacity-100"
            }`}>
              <div className="flex items-center justify-between gap-2 text-[10px] font-bold text-slate-400">
                <span className="text-slate-600 bg-slate-100 px-1.5 py-0.2 rounded font-mono">{node.date}</span>
                <span className="uppercase text-slate-500 tracking-wider">Node #{idx + 1} {node.isTargetNode && "(Selected Active View)"}</span>
              </div>
              
              <h4 className={`text-xs font-bold mt-1 tracking-tight ${node.isTargetNode ? "text-cyan-950" : "text-slate-800"}`}>
                {node.title}
              </h4>
              <p className="text-[11px] text-slate-500 leading-relaxed mt-1 whitespace-pre-wrap">
                {node.summary}
              </p>
              
              {node.source && (
                <div className="mt-1.5 text-[9px] font-mono text-slate-400">
                  Verified Data Point Reference: {node.source}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CAEvolutionTracker;