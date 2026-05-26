import React from 'react';

function HubTabs({ tabs, activeTab, setActiveTab }) {
  return (
    <div className="relative flex items-center p-1.5 bg-slate-200/60 backdrop-blur-md rounded-2xl border border-slate-300/40 w-full overflow-x-auto [&::-webkit-scrollbar]:hidden shadow-sm">
      <div className="flex space-x-1 w-full min-w-max">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-5 py-2.5 text-xs font-bold tracking-wide rounded-xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] select-none
                ${
                  isActive
                    ? "bg-white text-slate-900 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.12)] border border-black/[0.02] scale-[1.02]"
                    : "text-slate-500 hover:text-slate-800 hover:bg-white/40"
                }
              `}
            >
              <span className="relative z-10 flex items-center gap-2">
                {tab.label}
                {tab.count !== undefined && (
                  <span className={`px-1.5 py-0.5 text-[10px] font-mono rounded-md border transition-colors duration-200
                    ${isActive ? "bg-slate-100 text-slate-600 border-slate-200" : "bg-slate-300/40 text-slate-500 border-transparent"}
                  `}>
                    {tab.count}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default HubTabs;