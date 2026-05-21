function HubTabs({
  tabs,
  activeTab,
  onTabChange,
}) {
  return (
    <div className="mb-6 w-full overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden md:mb-8">
      <div className="flex gap-2.5">
        {tabs.map((tab) => (
          <button
  key={tab}
  onClick={() =>
    onTabChange(tab)
  }
  className={`whitespace-nowrap rounded-xl border px-4 py-2.5 text-sm font-semibold shadow-sm transition-all md:px-5 ${
    activeTab === tab
      ? "border-indigo-500 bg-indigo-500 text-white"
      : "border-slate-200/80 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
  }`}
>
  {tab}
</button>
        ))}
      </div>
    </div>
  );
}

export default HubTabs;