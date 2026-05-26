import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import FloatingCompleteButton from "./FloatingCompleteButton";

function DashboardLayout({ children, title, subtitle }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    /* Strict viewport lock: h-screen, w-full, overflow-hidden.
       Permanently prevents accidental mobile horizontal elastic scrolling.
    */
    <div className="flex h-screen w-full overflow-hidden bg-[#05070F] text-slate-900 font-sans antialiased selection:bg-indigo-500/30">
      
      {/* Mobile Sidebar Overlay with Elastic Fade/Blur */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#05070F]/75 backdrop-blur-md md:hidden transition-all duration-300 ease-out animate-fade-in"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* The Desktop "App Card Frame" Wrap: 
          Floats elegantly like an isolated device mockup canvas over the dark background space.
      */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden bg-slate-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:rounded-tl-[2.2rem] md:rounded-bl-[2.2rem] md:border-l md:border-y md:border-white/[0.06] md:my-3 md:mr-3 md:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.6)]">
        <Topbar setMobileMenuOpen={setMobileMenuOpen} title={title} subtitle={subtitle} />

        {/* Scrollable Main Content Area with Clean Light-Gradients */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 md:p-8 lg:p-10 bg-gradient-to-b from-slate-50 via-slate-100/40 to-slate-50/80">
          <div className="mx-auto max-w-7xl opacity-0 animate-[fadeIn_0.4s_ease-out_forwards]">
            {children}
          </div>
        </main>
      </div>

      <FloatingCompleteButton />
    </div>
  );
}

export default DashboardLayout;