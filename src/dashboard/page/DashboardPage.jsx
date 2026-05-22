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

  // Programmatic language conversion handler
  // Programmatic language conversion handler with localhost retry logic
  // Dynamic language translation handler with fallback on-demand injector
  const toggleTranslation = () => {
    // 1. Look for the actual inner selector element that Google creates
    let googleCombo = document.querySelector('.goog-te-combo');
    
    // 2. If it's missing, try to force initialize the global script element manually
    if (!googleCombo && window.googleTranslateElementInit) {
      window.googleTranslateElementInit();
    }

    // 3. Set a brief checking window to toggle the configuration select index values
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
        // Force the browser layout engine to refresh and translate all copy blocks
        googleCombo.dispatchEvent(new Event('change'));
      } else {
        console.log("Injecting engine scripts into domestic local frame context...");
        // If the resource still hasn't arrived, force click translation flags
        try {
          const elementContainer = document.getElementById('google_translate_element');
          if (elementContainer && !elementContainer.innerHTML) {
            window.googleTranslateElementInit();
          }
        } catch (e) {
          console.error("Local context translation failure:", e);
        }
      }
    }, 150);
  };

  const navigationItems = [
    { id: "prep_status", label: "Preparation Status", icon: "📊" },
    { id: "study_hub", label: "Study Hub (Daily Task)", icon: "🎯" },
    { id: "syllabus_progress", label: "Syllabus Progress", icon: "📚" },
    { id: "revision_hub", label: "Revision Hub", icon: "🔄" },
    { id: "prelims_test", label: "Test your Prelims", icon: "📝" },
    { id: "mains_test", label: "Test your Mains", icon: "🖋️" },
    { id: "weak_topics", label: "Weak Topics", icon: "⚠️" },
    { id: "current_affairs", label: "Current Affairs", icon: "📰" },
    { id: "knowledge_graph", label: "Knowledge Graphs", icon: "🕸️" },
    { id: "settings_export", label: "Settings & Exports", icon: "⚙️" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-cyan-100">
      {/* Sidebar Layout */}
      <nav className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 p-4 shrink-0 shadow-sm">
        <div className="mb-4 px-2 py-1 border-b border-slate-100 pb-4">
          <h1 className="text-sm font-black tracking-wider bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent uppercase">
            IntelliPrep OS
          </h1>
          <p className="text-[11px] font-semibold text-slate-500 truncate mt-0.5">{user?.email}</p>
        </div>

        {/* Dynamic Translation Action Control Button */}
        <div className="px-2 mb-4">
          <button
            onClick={toggleTranslation}
            className={`w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold rounded-xl border transition-all ${
              isHindi 
                ? "bg-amber-50 border-amber-300 text-amber-700 shadow-sm" 
                : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700"
            }`}
          >
            🇮🇳 {isHindi ? "Show English / अंग्रेजी देखें" : "Translate to Hindi / हिंदी करें"}
          </button>
        </div>

        <div className="space-y-0.5 flex-1">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-bold rounded-xl transition-all ${
                activeNav === item.id
                  ? "bg-slate-100 border border-slate-200 shadow-sm text-cyan-600"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 border border-transparent"
              }`}
            >
              <span className="text-sm opacity-90">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile Bottom Sticky Menu Sheet Layout */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 overflow-x-auto flex flex-col gap-2 shadow-lg">
        {/* Compact Mobile Top Row Translation Toggle Action Bar */}
        <div className="px-1.5">
          <button
            onClick={toggleTranslation}
            className={`w-full py-1.5 text-[11px] font-black tracking-wide rounded-lg border text-center transition-all ${
              isHindi ? "bg-amber-50 border-amber-200 text-amber-700" : "bg-slate-50 border-slate-200 text-slate-600"
            }`}
          >
            🇮🇳 {isHindi ? "ENGLISH MODE" : "HINDI MODE (हिंदी अनुवाद)"}
          </button>
        </div>

        <div className="flex gap-1 scrollbar-none overflow-x-auto pb-0.5">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl min-w-[76px] shrink-0 transition-colors ${
                activeNav === item.id 
                  ? "text-cyan-600 bg-slate-100 border border-slate-200" 
                  : "text-slate-500 border border-transparent"
              }`}
            >
              <span className="text-sm">{item.icon}</span>
              <span className="text-[9px] font-bold tracking-tight whitespace-nowrap">{item.label.split(" ")[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Primary Content Viewport Shell Frame */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-32 md:pb-6 max-w-6xl mx-auto w-full">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 md:p-6 shadow-sm min-h-full">
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