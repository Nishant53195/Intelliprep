function LoginCard({ children }) {
  return (
    <div className="relative z-10 w-full max-w-md rounded-[2.5rem] border border-white/10 bg-[#131C2D]/80 p-8 sm:p-10 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
      
      <h2 className="text-3xl font-bold leading-tight text-white">
        Welcome to the<br />UPSC IntelliPrep.
      </h2>

      <p className="mt-4 text-sm font-light leading-relaxed text-slate-400">
        Authenticate to access the central orchestration layer...
      </p>

      <div className="mt-8">
        {children}
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6 text-[11px] font-mono tracking-widest text-slate-500 uppercase">
        <span>v1.0-beta</span>
        <span className="flex items-center gap-1.5">
          <svg className="h-3.5 w-3.5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Encrypted Sync
        </span>
      </div>
    </div>
  );
}

export default LoginCard;