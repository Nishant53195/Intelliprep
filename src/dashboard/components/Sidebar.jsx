import {
  LayoutDashboard, Brain, FileQuestion, ClipboardCheck, Network, Newspaper, ChevronLeft, ChevronRight, X
} from "lucide-react";

import useDashboardStore from "../store/dashboardStore";

const items = [
  { icon: LayoutDashboard, label: "Preparation Status", disabled: false },
  { icon: Brain, label: "Study Hub", disabled: false },
  { icon: FileQuestion, label: "PYQ Hub", disabled: false },
  { icon: ClipboardCheck, label: "Test Hub", disabled: true }, 
  { icon: Network, label: "Knowledge Graph", disabled: true },
  { icon: Newspaper, label: "Current Affairs", disabled: true },
];

function Sidebar({ collapsed, setCollapsed, mobileMenuOpen, setMobileMenuOpen }) {
  const activeHub = useDashboardStore((state) => state.activeHub);
  const setActiveHub = useDashboardStore((state) => state.setActiveHub);

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex h-full flex-col bg-[#05070F] border-r border-white/[0.02] shadow-[25px_0_50px_-15px_rgba(0,0,0,0.5)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:relative md:z-0 md:shadow-none
        ${mobileMenuOpen ? "translate-x-0 w-[280px]" : "-translate-x-full w-[280px]"}
        ${collapsed ? "md:w-[92px]" : "md:w-[280px]"}
        md:translate-x-0
      `}
    >
      {/* Sidebar Top Header Branding Context */}
      <div className="flex items-center justify-between px-6 py-6 md:py-8 min-h-[88px]">
        {!collapsed && (
          <div className="flex flex-col opacity-0 animate-[fadeIn_0.3s_ease-out_forwards]">
            <span className="text-xl font-black tracking-tight text-white drop-shadow-md">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">UPSC</span> IntelliPrep<span className="text-indigo-400 font-extrabold">.</span>
            </span>
          </div>
        )}

        {collapsed && (
          <div className="hidden md:flex mx-auto items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500/10 to-cyan-500/5 border border-indigo-500/20 text-cyan-400 font-black text-sm shadow-inner">
            UP
          </div>
        )}
        
        {/* Desktop Collapse Toggle Button Frame */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden rounded-xl bg-white/[0.02] border border-white/[0.05] p-2 text-slate-400 transition-all duration-200 hover:bg-white/[0.07] hover:text-white hover:scale-105 active:scale-95 md:flex"
        >
          {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
        </button>

        {/* Mobile Close Toggle Overlay Button */}
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="rounded-xl bg-white/[0.04] border border-white/[0.05] p-2 text-slate-400 transition-all duration-200 hover:bg-white/[0.08] hover:text-white active:scale-95 md:hidden"
        >
          <X size={16} />
        </button>
      </div>

      {/* Fluid Nav Item Menu Matrix */}
      <div className="flex flex-1 flex-col gap-1.5 overflow-y-auto px-3.5 pb-4 [&::-webkit-scrollbar]:hidden">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeHub === item.label;

          return (
            <button
              key={item.label}
              disabled={item.disabled}
              onClick={() => {
                if (item.disabled) return;
                setActiveHub(item.label);
                setMobileMenuOpen(false);
              }}
              className={`group relative flex items-center gap-3.5 rounded-xl px-4 py-3.5 text-left transition-all duration-200 border ${
                item.disabled
                  ? "opacity-25 cursor-not-allowed pointer-events-none select-none text-slate-600 border-transparent"
                  : isActive
                  ? "bg-gradient-to-r from-indigo-600/15 via-cyan-500/5 to-transparent border-indigo-500/25 text-cyan-400 font-semibold shadow-inner shadow-indigo-500/5"
                  : "text-slate-400 border-transparent hover:bg-white/[0.03] hover:text-slate-200 hover:translate-x-0.5"
              }`}
            >
              <Icon 
                size={19} 
                className={`shrink-0 transition-all duration-200 group-hover:scale-105 ${
                  item.disabled 
                    ? "text-slate-700" 
                    : isActive 
                    ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]" 
                    : "text-slate-500 group-hover:text-slate-300"
                }`} 
              />
              
              {(!collapsed || mobileMenuOpen) && (
                <div className="flex flex-1 items-center justify-between overflow-hidden opacity-0 animate-[fadeIn_0.25s_ease-out_forwards]">
                  <span className="text-sm tracking-wide truncate">
                    {item.label}
                  </span>
                  {item.disabled && (
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-500 bg-white/[0.02] px-1.5 py-0.5 rounded border border-white/5 shadow-sm">
                      Lock
                    </span>
                  )}
                </div>
              )}

              {/* Native Highlight Indicator bar */}
              {isActive && !collapsed && (
                <div className="absolute left-0 w-[3px] h-5 bg-gradient-to-b from-cyan-400 to-indigo-500 rounded-r-full shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Footer Branding Platform OS Status Card */}
      <div className="p-4">
        <div className="rounded-2xl border border-white/[0.04] bg-gradient-to-b from-white/[0.02] to-transparent p-4 shadow-xl">
          {(!collapsed || mobileMenuOpen) ? (
            <div className="opacity-0 animate-[fadeIn_0.3s_ease-out_forwards]">
              <p className="text-xs font-semibold tracking-wide text-slate-200 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.6)] animate-pulse" />
                IntelliPrep OS
              </p>
              <p className="mt-1 text-[9px] font-mono uppercase tracking-widest text-slate-500">Version 1.0</p>
            </div>
          ) : (
            <div className="flex justify-center py-1">
              <div className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.6)] animate-pulse" />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;