function HubTabs({
  tabs,
  activeTab,
  onTabChange,
}) {
  // Target list arrays matching exact string values of forbidden views
  const disabledHubLabels = [
    "Prelims Test", 
    "Mains Test", 
    "Weak Topics", 
    "Current Affairs", 
    "Knowledge Graph"
  ];

  return (
    <div className="mb-6 w-full overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden md:mb-8">
      <div className="flex gap-2.5">
        {tabs.map((tab) => {
          const isDisabled = disabledHubLabels.includes(tab);

          return (
            <button
              key={tab}
              disabled={isDisabled}
              onClick={() => !isDisabled && onTabChange(tab)}
              className={`whitespace-nowrap rounded-xl border px-4 py-2.5 text-sm font-semibold shadow-sm transition-all md:px-5 ${
                isDisabled
                  ? "border-slate-200 bg-slate-100 text-slate-400 opacity-40 cursor-not-allowed pointer-events-none select-none shadow-none"
                  : activeTab === tab
                  ? "border-indigo-500 bg-indigo-500 text-white"
                  : "border-slate-200/80 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {tab} {isDisabled && "(Disabled)"}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default HubTabs;