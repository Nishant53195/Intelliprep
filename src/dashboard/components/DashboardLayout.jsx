import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import FloatingCompleteButton from "./FloatingCompleteButton";

function DashboardLayout({ children,title,subtitle }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    /* Strict viewport lock: h-screen, w-full, overflow-hidden.
      This permanently kills horizontal mobile scrolling.
    */
    <div className="flex h-screen w-full overflow-hidden bg-[#0A0F1C] text-slate-900 font-sans selection:bg-indigo-500/30">
      
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#0A0F1C]/60 backdrop-blur-sm md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* The "App Frame": 
        On desktop, it looks like a rounded card floating inside the dark background. 
      */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden bg-slate-50 transition-all duration-300 md:rounded-tl-[2rem] md:rounded-bl-[2rem] md:border-l md:border-y md:border-slate-700/50 md:my-2 md:mr-2 md:shadow-2xl">
        <Topbar setMobileMenuOpen={setMobileMenuOpen} title={title} subtitle={subtitle} />

        {/* Scrollable Main Content Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 md:p-8 lg:p-10">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>

      <FloatingCompleteButton />
    </div>
  );
}

export default DashboardLayout;