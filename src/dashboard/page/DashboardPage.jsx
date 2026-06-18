// src/dashboard/page/DashboardPage.jsx
import { useState } from "react";
import useLoginStore from "../../login/store/loginStore";

// Section Components
import PreparationStatus from "../sections/PreparationStatus";
import StudyHub from "../sections/StudyHub";
import SyllabusProgressView from "../../syllabus/components/SyllabusProgressView";
import RevisionHub from "../sections/RevisionHub";
import TestYourPrelims from "../sections/TestYourPrelims";
import TestYourMains from "../sections/TestYourMains";
import WeakTopics from "../sections/WeakTopics";
import CurrentAffairsHub from "../sections/CurrentAffairsHub";
import KnowledgeGraph from "../sections/KnowledgeGraph";
import SettingsAndExports from "../sections/SettingsAndExports";

function DashboardPage() {
  const [activeNav, setActiveNav] = useState("study_hub");
  const [isHindi, setIsHindi] = useState(false);
  const user = useLoginStore((state) => state.user);

  const toggleTranslation = () => {
    let googleCombo = document.querySelector('.goog-te-combo');
    if (!googleCombo && window.googleTranslateElementInit) {
      window.googleTranslateElementInit();
    }
    setTimeout(() => {
      googleCombo = document.querySelector('.goog-te-combo');
      if (googleCombo) {
        if (!isHindi) {
          googleCombo.value = 'hi';
          setIsHindi(true);
        } else {
          googleCombo.value = 'en';
          setIsHindi(false);
        }
        googleCombo.dispatchEvent(new Event('change'));
      }
    }, 150);
  };

  // Verbatim 1:1 labeling matching target layout registry arrays cleanly
  const navigationItems = [
    { id: "prep_status", label: "Intelligent Dashboard", icon: "📊", disabled: false },
    { id: "study_hub", label: "Study Hub (Daily Task)", icon: "🎯", disabled: false },
    { id: "syllabus_progress", label: "Syllabus Progress", icon: "📖", disabled: false },
    { id: "revision_hub", label: "Revision Hub", icon: "🔄", disabled: false },
    { id: "prelims_test", label: "Test your Prelims", icon: "📝", disabled: false },
    { id: "mains_test", label: "Test your Mains", icon: "✍️", disabled: false },
    { id: "weak_topics", label: "Analysis and Intelligence", icon: "⚠️", disabled: false },
    { id: "current_affairs", label: "Current Affairs", icon: "📰", disabled: false },
    { id: "knowledge_graph", label: "Knowledge Graph", icon: "🌐", disabled: false },
    { id: "settings_export", label: "Settings & Exports", icon: "⚙️", disabled: false },
  ];

  return (
    <div className="flex h-screen w-full bg-[#F4F6FA] text-slate-800 antialiased font-sans overflow-hidden">
      
      {/* ==========================================
          1. SIDEBAR LAYOUT (LAPTOP / DESKTOP VIEW)
          ========================================== */}
      <nav className="hidden md:flex flex-col w-[255px] bg-white border-r border-[#EBEFF8] px-4.5 py-4 shrink-0 h-screen sticky top-0 justify-between select-none text-left overflow-hidden">
        {/* Optimized step spacing balance: holds clear text styles without overflowing viewports */}
        <div className="space-y-4">
          
          {/* BRAND HEADLINE HEADER */}
          <div className="px-1.5 pt-0.5">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-black shadow-md shadow-indigo-500/20">
                Ω
              </div>
              <div>
                <h1 className="text-sm font-black tracking-wider text-slate-900 uppercase leading-none">
                  UPSC INTELLIPREP 
                </h1>
                <p className="text-[10px] font-bold text-indigo-500 tracking-tight uppercase mt-0.5">
                  Most Smart UPSC System
                </p>
              </div>
            </div>
          </div>

          
          {/* TRANSLATION BAR BUTTON PANEL TOGGLE */}
          <div className="px-0.5">
            <button
              onClick={toggleTranslation}
              className="w-full flex items-center justify-start gap-2 px-3 py-1.5 text-xs font-bold rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-all shadow-2xs group"
            >
              <span className="text-slate-400 group-hover:text-slate-600 text-sm">🌐</span>
              <span className="tracking-wide truncate">
                {isHindi ? "Translate to English" : "Translate to Hindi / हिंदी"}
              </span>
            </button>
          </div>

          {/* CONDENSED SPACING SELECTION NAVIGATION LIST ITEMS */}
          <div className="space-y-1 overflow-hidden">
            {navigationItems.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  disabled={item.disabled}
                  onClick={() => !item.disabled && setActiveNav(item.id)}
                  className={`w-full flex items-center justify-between px-1 py-3.5 text-sm font-bold rounded-xl transition-all border border-transparent text-left ${
                    item.disabled
                      ? "bg-transparent text-black-400 opacity-30 cursor-not-allowed select-none"
                      : isActive
                      ? "bg-[#c4eaec] text-indigo-600 font-extrabold shadow-3xs"
                      : "text-black-500 hover:bg-green-100"
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <span className={`text-base shrink-0 ${item.disabled ? "grayscale opacity-30" : "opacity-90"}`}>
                      {item.icon}
                    </span>
                    <span className="truncate tracking-wide font-sans">{item.label}</span>
                  </div>
                  {item.disabled && (
                    <span className="text-xs opacity-40 shrink-0 select-none pl-1">🔒</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        
      </nav>

      {/* ==========================================
          2. MOBILE BOTTOM STICKY MENU LAYOUT (PHONE VIEW)
          ========================================== */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-2 overflow-x-auto flex flex-col gap-2 shadow-lg">
        <div className="px-1.5">
          <button
            onClick={toggleTranslation}
            className={`w-full py-1.5 text-[11px] font-black tracking-wide rounded-lg border text-center transition-all ${
              isHindi ? "bg-amber-50 border-amber-200 text-amber-700" : "bg-slate-50 border-slate-200 text-slate-600"
            }`}
          >
            {isHindi ? "ENGLISH MODE" : "HINDI MODE / हिंदी"}
          </button>
        </div>
        
        <div className="flex gap-1 overflow-x-auto pb-0.5 scrollbar-none [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {navigationItems.map((item) => (
            <button
              key={item.id}
              disabled={item.disabled}
              onClick={() => !item.disabled && setActiveNav(item.id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl min-w-[82px] shrink-0 transition-all border ${
                item.disabled
                  ? "text-slate-400 opacity-35 cursor-not-allowed pointer-events-none select-none border-transparent"
                  : activeNav === item.id 
                  ? "text-indigo-600 bg-[#E8EEFF] border-transparent font-extrabold shadow-3xs"
                  : "text-slate-500 border-transparent hover:bg-slate-50"
              }`}
            >
              <span className={`text-base ${item.disabled ? "grayscale opacity-40" : ""}`}>{item.icon}</span>
              <span className="text-[9px] font-bold tracking-tight whitespace-nowrap">
                {item.disabled ? "Locked" : item.label.split(" ")[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ==========================================
          3. MAIN CONTENT FRAME VIEWPORT
          ========================================== */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-32 md:pb-8 h-full w-full flex justify-center">
        <div className="w-full max-w-7xl">
          {activeNav === "prep_status" && <PreparationStatus />}
          {activeNav === "study_hub" && <StudyHub />}
          {activeNav === "syllabus_progress" && <SyllabusProgressView />}
          {activeNav === "revision_hub" && <RevisionHub />}
          {activeNav === "prelims_test" && <TestYourPrelims />}
          {activeNav === "mains_test" && <TestYourMains />}
          {activeNav === "weak_topics" && <WeakTopics />}
          {activeNav === "current_affairs" && <CurrentAffairsHub />}
          {activeNav === "knowledge_graph" && <KnowledgeGraph />}
          {activeNav === "settings_export" && <SettingsAndExports />}
        </div>
      </main>

    </div>
  );
}

export default DashboardPage;