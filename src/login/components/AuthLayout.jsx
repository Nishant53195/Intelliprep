function AuthLayout({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050B18] text-white">

      {/* Top Accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

      {/* Bottom Accent */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-400/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col lg:flex-row">
        {children}
      </div>

    </div>
  );
}

export default AuthLayout;