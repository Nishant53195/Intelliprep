// src/dashboard/components/Sidebar.jsx
import React from "react";
import useLoginStore from "../../login/store/loginStore";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

function Sidebar({ collapsed, setCollapsed, mobileMenuOpen, setMobileMenuOpen, activeNav, setActiveNav, isHindi, toggleTranslation }) {
  const user = useLoginStore((state) => state.user);

  // Full 10-item menu list containing all routes
  const navigationItems = [
    { id: "prep_status", label: "Preparation Status", icon: "📊", disabled: false },
    { id: "study_hub", label: "Study Hub (Daily Task)", icon: "🎯", disabled: false },
    { id: "syllabus_progress", label: "Syllabus Progress", icon: "📖", disabled: false },
    { id: "revision_hub", label: "Revision Hub", icon: "🔄", disabled: false },
    { id: "prelims_test", label: "Test your Prelims", icon: "📝", disabled: true },
    { id: "mains_test", label: "Test your Mains", icon: "✍️", disabled: true },
    { id: "weak_topics", label: "Weak Topics", icon: "⚠️", disabled: true },
    { id: "current_affairs", label: "Current Affairs", icon: "📰", disabled: false },
    { id: "knowledge_graph", label: "Knowledge Graph", icon: "🌐", disabled: false },
    { id: "settings_export", label: "Settings & Exports", icon: "⚙️", disabled: false },
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-white border-r border-[#E9EFFD] p-2.5 shrink-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:sticky md:top-0 md:z-0 select-none justify-between h-screen overflow-hidden
        ${mobileMenuOpen ? "translate-x-0 w-[250px]" : "-translate-x-full w-[0px]"}
        ${collapsed ? "md:w-[68px]" : "md:w-[235px]"}
        md:translate-x-0
      `}
    >
      {/* Tight vertical stack wrapper */}
      <div className="space-y-1.5">
        
        {/* BRAND LOGO CONSOLE HEADER */}
        <div className="px-1 py-0.5 flex items-center justify-between min-h-[28px]">
          {(!collapsed || mobileMenuOpen) && (
            <div className="flex items-center gap-2 opacity-0 animate-[fadeIn_0.3s_ease-out_forwards]">
              <div className="h-5 w-5 rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-[9px] font-black shadow-md shrink-0">
                Ω
              </div>
              <div className="text-left">
                <h1 className="text-[10.5px] font-black tracking-wider text-slate-900 uppercase leading-none font-sans">
                  INTELLIPREP OS
                </h1>
                <p className="text-[7.5px] font-bold text-indigo-500 tracking-tight uppercase mt-0.5">
                  Your UPSC Command Center
                </p>
              </div>
            </div>
          )}

          {collapsed && !mobileMenuOpen && (
            <div className="flex mx-auto items-center justify-center w-5 h-5 rounded-md bg-gradient-to-br from-indigo-500/10 to-cyan-500/5 border border-indigo-500/10 text-indigo-600 font-black text-[9px]">
              Ω
            </div>
          )}

          {/* Controls Toggle */}
          <div className="flex items-center gap-0.5">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden rounded-md bg-slate-50 border border-slate-200/60 p-0.5 text-slate-400 hover:bg-slate-100 hover:text-slate-800 md:flex"
            >
              {collapsed ? <ChevronRight size={11} /> : <ChevronLeft size={11} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-md bg-slate-50 border border-slate-200/60 p-0.5 text-slate-400 hover:bg-slate-100 hover:text-slate-800 md:hidden"
            >
              <X size={11} />
            </button>
          </div>
        </div>

        {/* IDENTITY SUITE PROFILE COMPACT BAR */}
        {(!collapsed || mobileMenuOpen) && (
          <div className="flex items-center justify-between bg-[#F8FAFD] border border-[#EFF2F9] rounded-md p-1 mx-0.5 opacity-0 animate-[fadeIn_0.3s_ease-out_forwards]">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <div className="h-4.5 w-4.5 rounded-full bg-indigo-600 text-white font-extrabold text-[8px] flex items-center justify-center shadow-inner shrink-0 uppercase">
                {user?.email?.charAt(0) || "N"}
              </div>
              <div className="min-w-0 flex-1 text-left">
                <p className="text-[9.5px] font-mono font-bold text-slate-600 truncate leading-tight">
                  {user?.email || "nishant53195@gmail.com"}
                </p>
              </div>
            </div>
            <span className="text-slate-400 text-[6px] pr-0.5">▼</span>
          </div>
        )}

        {/* TRANSLATION ASSISTANT PILL BUTTON */}
        {(!collapsed || mobileMenuOpen) && (
          <div className="px-0.5 opacity-0 animate-[fadeIn_0.35s_ease-out_forwards]">
            <button
              onClick={toggleTranslation}
              className="w-full flex items-center justify-start gap-1 px-2 py-0.5 text-[9.5px] font-bold rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-all group"
            >
              <span className="text-slate-400 group-hover:text-slate-600 text-[10px]">🌐</span>
              <span className="tracking-wide truncate">
                {isHindi ? "Show English" : "Translate to Hindi / हिंदी"}
              </span>
            </button>
          </div>
        )}

        {/* HIGH-DENSITY VERTICAL NAVIGATION MENU LIST */}
        <div className="space-y-0.5 overflow-hidden">
          {navigationItems.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                disabled={item.disabled}
                onClick={() => {
                  if (item.disabled) return;
                  setActiveNav(item.id);
                  if (mobileMenuOpen) setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-2 py-1 text-[10px] font-bold rounded-md transition-all border text-left group ${
                  item.disabled
                    ? "border-transparent bg-transparent text-slate-400 opacity-30 cursor-not-allowed select-none"
                    : isActive
                    ? "bg-[#E8EEFF] border-transparent text-indigo-600 font-extrabold shadow-3xs"
                    : "text-slate-500 hover:bg-slate-50 border-transparent"
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className={`text-xs shrink-0 ${item.disabled ? "grayscale opacity-30" : "opacity-90"}`}>
                    {item.icon}
                  </span>
                  {(!collapsed || mobileMenuOpen) && (
                    <span className="truncate tracking-wide font-sans opacity-0 animate-[fadeIn_0.15s_ease-out_forwards]">
                      {item.label}
                    </span>
                  )}
                </div>

                {item.disabled && (!collapsed || mobileMenuOpen) && (
                  <span className="text-[8px] opacity-30 shrink-0 select-none pl-1 opacity-0 animate-[fadeIn_0.15s_ease-out_forwards]">
                    🔒
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* MINI DECORATIVE GRAPHIC FOOTER BLOCK */}
      {(!collapsed || mobileMenuOpen) && (
        <div className="rounded-md border border-[#E9EFFD] bg-gradient-to-br from-[#F4F7FF] via-white to-transparent p-1.5 text-left relative overflow-hidden mt-auto shadow-3xs mx-0.5 opacity-0 animate-[fadeIn_0.4s_ease-out_forwards]">
          <h4 className="text-[8.5px] font-black text-slate-700 tracking-wide uppercase">Small steps daily</h4>
          <p className="text-[7.5px] text-slate-400 font-medium leading-tight mt-0.5">
            lead to big results. <span className="text-indigo-500 font-bold">Keep going! 🚀</span>
          </p>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;