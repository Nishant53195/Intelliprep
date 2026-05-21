import {
  LayoutDashboard, Brain, FileQuestion, ClipboardCheck, Network, Newspaper, ChevronLeft, ChevronRight, X
} from "lucide-react";

import useDashboardStore from "../store/dashboardStore";

const items = [
  { icon: LayoutDashboard, label: "Preparation Status" },
  { icon: Brain, label: "Study Hub" },
  { icon: FileQuestion, label: "PYQ Hub" },
  { icon: ClipboardCheck, label: "Test Hub" },
  { icon: Network, label: "Knowledge Graph" },
  { icon: Newspaper, label: "Current Affairs" },
];

function Sidebar({ collapsed, setCollapsed, mobileMenuOpen, setMobileMenuOpen }) {
  const activeHub = useDashboardStore((state) => state.activeHub);
  const setActiveHub = useDashboardStore((state) => state.setActiveHub);

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex h-full flex-col bg-[#0A0F1C] transition-all duration-300 ease-in-out md:relative md:z-0
        ${mobileMenuOpen ? "translate-x-0 w-[280px]" : "-translate-x-full w-[280px]"}
        ${collapsed ? "md:w-[88px]" : "md:w-[280px]"}
        md:translate-x-0
      `}
    >
      <div className="flex items-center justify-between px-6 py-6 md:py-8">
        {!collapsed && (
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white drop-shadow-md">
              <span className="text-cyan-400">UPSC</span> IntelliPrep.
            </span>
          </div>
        )}
        
        {/* Desktop Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden rounded-lg bg-white/[0.03] p-2 text-slate-400 transition-colors hover:bg-white/[0.08] hover:text-white md:flex"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>

        {/* Mobile Close Toggle */}
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="rounded-lg bg-white/[0.05] p-2 text-slate-400 transition-colors hover:bg-white/[0.1] hover:text-white md:hidden"
        >
          <X size={18} />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 overflow-y-auto px-3 pb-4 [&::-webkit-scrollbar]:hidden">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeHub === item.label;

          return (
            <button
              key={item.label}
              onClick={() => {
                setActiveHub(item.label);
                setMobileMenuOpen(false);
              }}
              className={`group relative flex items-center gap-3.5 rounded-xl px-4 py-3.5 text-left transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-indigo-500/10 to-cyan-500/5 text-cyan-400"
                  : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200"
              }`}
            >
              <Icon size={20} className={`shrink-0 ${isActive ? "text-cyan-400" : "text-slate-500 group-hover:text-slate-400"}`} />
              
              {(!collapsed || mobileMenuOpen) && (
                <span className="text-sm font-medium tracking-wide">
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="p-4">
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
          {(!collapsed || mobileMenuOpen) ? (
            <>
              <p className="text-sm font-medium text-slate-300">IntelliPrep OS</p>
              <p className="mt-1 text-[10px] font-mono uppercase tracking-widest text-slate-500">Version 1.0</p>
            </>
          ) : (
            <div className="flex justify-center">
              <div className="h-1.5 w-1.5 rounded-full bg-cyan-500/50" />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;