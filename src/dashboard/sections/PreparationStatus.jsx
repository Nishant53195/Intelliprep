import  SectionCard  from "../components/SectionCard";
import { Activity, ShieldCheck, Award, Zap } from "lucide-react";

function PreparationStatus() {
  const analyticsMetrics = [
    { label: "Overall Progress", value: "0.0%", icon: Activity, color: "text-indigo-600 bg-indigo-50 border-indigo-100" },
    { label: "Syllabus Health", value: "Stable", icon: ShieldCheck, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
    { label: "Memory Stability", value: "60%", icon: Award, color: "text-cyan-600 bg-cyan-50 border-cyan-100" },
    { label: "Fatigue Level", value: "Minimal", icon: Zap, color: "text-amber-600 bg-amber-50 border-amber-100" },
  ];

  return (
    <div className="space-y-6 text-left">
      <div className="border-b border-slate-200/80 pb-4">
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Preparation Status</h2>
        <p className="text-xs font-medium text-slate-400 mt-0.5">Comprehensive snapshot of your cross-functional UPSC preparation performance.</p>
      </div>

      {/* Luxury KPI Metric Bento Deck */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {analyticsMetrics.map((stat, idx) => {
          const IconComponent = stat.icon;
          return (
            <div key={idx} className="bg-white border border-slate-200/70 p-4 rounded-2xl shadow-[0_4px_20px_-10px_rgba(15,23,42,0.03)] flex flex-col justify-between min-h-[105px] transition-all duration-300 hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.06)] hover:border-slate-300">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 truncate">{stat.label}</span>
                <div className={`p-1.5 rounded-lg border shrink-0 ${stat.color}`}>
                  <IconComponent size={14} />
                </div>
              </div>
              <span className="text-xl font-black text-slate-800 tracking-tight block mt-2">{stat.value}</span>
            </div>
          );
        })}
      </div>

      {/* Core Gallery Render Frame Wrapper Panel */}
      <div className="bg-white border border-slate-200/70 rounded-[2rem] p-6 sm:p-8 min-h-[16rem] flex flex-col items-center justify-center text-center space-y-2 shadow-[0_10px_35px_-12px_rgba(15,23,42,0.03)]">
        <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 mb-1">
          <Activity size={18} />
        </div>
        <p className="text-sm font-black text-slate-800 tracking-tight">Performance Trend & Correlation Dashboards</p>
        <p className="text-xs font-medium text-slate-400 max-w-sm leading-relaxed">
          Interactive Recharts mapping score consistency vs focus quality patterns will render inside this gallery framework panel.
        </p>
      </div>
    </div>
  );
}

export default PreparationStatus;