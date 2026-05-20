function IntelligenceNode({ title, subtitle, icon, className = "" }) {
  return (
    <div
      className={`absolute flex items-center gap-3 rounded-2xl border border-white/10 bg-[#131C2D]/80 px-4 py-3 backdrop-blur-xl shadow-[0_15px_30px_rgba(0,0,0,0.4)] transition-all duration-300 hover:scale-105 hover:bg-white/[0.08] ${className}`}
    >
      {icon && <div className="text-xl drop-shadow-md">{icon}</div>}
      <div className="flex flex-col">
        <h3 className="text-sm font-medium text-slate-200 drop-shadow-sm">
          {title}
        </h3>
        <p className="mt-0.5 text-[10px] font-mono tracking-wider text-slate-400 uppercase">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

export default IntelligenceNode;