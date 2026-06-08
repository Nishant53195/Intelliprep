function LoginCard({ children }) {
  return (
    <div
      className="
        relative
        z-10
        w-full
        max-w-lg
        overflow-hidden
        rounded-[32px]
        border
        border-white/10
        bg-[rgba(12,18,35,0.82)]
        p-10
        backdrop-blur-xl
        shadow-[0_20px_60px_rgba(0,0,0,0.45)]
      "
    >

      {/* Top Accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

      {/* Badge */}
      <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-400/10 bg-cyan-400/5 px-3 py-1">

        <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />

        <span className="text-[10px] font-mono tracking-[0.3em] text-cyan-300 uppercase">
          Secure Access
        </span>

      </div>

      {/* Heading */}
      <h2 className="text-4xl font-bold leading-tight text-white">
        Welcome to the
        <br />

        <span className="bg-gradient-to-r from-violet-300 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
          UPSC IntelliPrep.
        </span>
      </h2>

      {/* Description */}
      <p className="mt-5 text-base leading-relaxed text-slate-400">
        Authenticate to access the intelligent orchestration layer powering
        adaptive scheduling, recovery systems and memory intelligence.
      </p>

      {/* Actions */}
      <div className="mt-10">
        {children}
      </div>

      {/* Footer */}
      <div className="mt-10 border-t border-white/10 pt-6">

        <div className="flex items-center justify-between text-[11px] font-mono tracking-[0.25em] text-slate-500 uppercase">

          <span>v1.0-beta</span>

          <span className="flex items-center gap-2 text-cyan-300">

            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>

            Encrypted Sync

          </span>

        </div>

      </div>

    </div>
  );
}

export default LoginCard;