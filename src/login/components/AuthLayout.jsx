function AuthLayout({
  children,
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* Soft Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Ambient Layer */}
      <div className="absolute inset-0 bg-white/[0.015]" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col lg:flex-row">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;