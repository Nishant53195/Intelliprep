function SegmentTabs({ options, active, setActive }) {
  return (
    <div className="w-full overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
      <div className="inline-flex rounded-xl border border-slate-200 bg-slate-100 p-1 shadow-inner">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => setActive(option)}
            className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 md:px-6 ${
              active === option
                ? "bg-white text-slate-900 shadow-sm ring-1 ring-black/5"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SegmentTabs;