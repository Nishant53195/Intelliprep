function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#070913] via-[#0A0F1D] to-[#141A2E] text-slate-100 antialiased selection:bg-indigo-500/30">
      {/* Global Glass Sticky Header */}
      <div className="border-b border-white/[0.04] bg-[#0A0F1D]/60 backdrop-blur-xl sticky top-0 z-50 px-4 py-3.5 transition-all duration-300 shadow-[0_2px_20px_-5px_rgba(0,0,0,0.3)]">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <h1 className="text-xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(34,211,238,0.15)]">
            UPSC IntelliPrep
          </h1>
        </div>
      </div>

      <main className="relative transition-all duration-300">{children}</main>
    </div>
  );
}

export default AppLayout;