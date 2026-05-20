function OnboardingLayout({ sidebar, children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0A0F1C] text-slate-200 font-sans selection:bg-indigo-500/30">
      
      {/* Architectural Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] z-0" />
      
      {/* Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 flex min-h-screen">
        {/* Sidebar */}
        <div className="hidden w-[380px] border-r border-white/5 bg-[#0F172A]/80 backdrop-blur-xl lg:block">
          {sidebar}
        </div>

        {/* Main Content Area */}
        <div className="flex flex-1 items-center justify-center px-6 py-10 sm:px-12">
          {children}
        </div>
      </div>
    </div>
  );
}

export default OnboardingLayout;