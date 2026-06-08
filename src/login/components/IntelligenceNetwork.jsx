import IntelligenceNode from "./IntelligenceNode";

function IntelligenceNetwork() {
  return (
    <div className="relative hidden h-full min-h-[700px] w-full items-center justify-center overflow-hidden lg:flex">

      {/* Background Glow */}
      <div className="absolute h-[700px] w-[700px] rounded-full bg-violet-500/10 blur-[180px]" />
      <div className="absolute h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[160px]" />

      {/* Orbital Rings */}
      <div className="absolute h-[280px] w-[280px] rounded-full border border-white/5" />
      <div className="absolute h-[420px] w-[420px] rounded-full border border-cyan-500/10" />
      <div className="absolute h-[560px] w-[560px] rounded-full border border-violet-500/10" />

      {/* Animated Center Dot */}
      <div className="absolute h-4 w-4 rounded-full bg-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.8)] animate-pulse" />

      {/* Connection Network */}
      <svg className="absolute inset-0 z-10 h-full w-full pointer-events-none">
        <defs>
          <linearGradient id="networkLine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(139,92,246,0.25)" />
            <stop offset="100%" stopColor="rgba(34,211,238,0.25)" />
          </linearGradient>
        </defs>

        <line x1="50%" y1="50%" x2="16%" y2="15%" stroke="url(#networkLine)" strokeWidth="1" />
        <line x1="50%" y1="50%" x2="84%" y2="19%" stroke="url(#networkLine)" strokeWidth="1" />
        <line x1="50%" y1="50%" x2="22%" y2="78%" stroke="url(#networkLine)" strokeWidth="1" />
        <line x1="50%" y1="50%" x2="42%" y2="90%" stroke="url(#networkLine)" strokeWidth="1" />
        <line x1="50%" y1="50%" x2="80%" y2="45%" stroke="url(#networkLine)" strokeWidth="1" />
        <line x1="50%" y1="50%" x2="82%" y2="82%" stroke="url(#networkLine)" strokeWidth="1" />
        <line x1="50%" y1="50%" x2="12%" y2="45%" stroke="url(#networkLine)" strokeWidth="1" />

        {/* Endpoint Dots */}
        <circle cx="16%" cy="15%" r="4" fill="#8b5cf6" />
        <circle cx="84%" cy="19%" r="4" fill="#22d3ee" />
        <circle cx="22%" cy="78%" r="4" fill="#8b5cf6" />
        <circle cx="42%" cy="90%" r="4" fill="#22d3ee" />
        <circle cx="80%" cy="45%" r="4" fill="#8b5cf6" />
        <circle cx="82%" cy="82%" r="4" fill="#22d3ee" />
        <circle cx="12%" cy="45%" r="4" fill="#8b5cf6" />
      </svg>

      {/* Center Branding */}
      <div className="relative z-20 text-center">

        <h2
  className="
    mb-2
    text-5xl
    font-bold
    tracking-[0.25em]
    text-cyan-200/80
    uppercase
  "
>
  UPSC
</h2>

        <h1
          className="
            text-8xl
            font-black
            tracking-tight
            text-transparent
            bg-clip-text
            bg-gradient-to-r
            from-violet-200
            via-indigo-200
            to-cyan-200
            drop-shadow-[0_0_30px_rgba(99,102,241,0.35)]
          "
        >
          IntelliPrep.
        </h1>

        <p className="mt-4 text-xs font-mono tracking-[0.4em] text-slate-500 uppercase">
          Intelligent Preparation Operating System
        </p>

        <div className="mt-6 flex items-center justify-center gap-4">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-cyan-400/30" />
          <span className="text-[10px] font-mono tracking-[0.3em] text-slate-500 uppercase">
            Version 1.0
          </span>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-violet-400/30" />
        </div>
      </div>

      {/* Nodes */}

      <IntelligenceNode
        icon="🧠"
        title="Memory Retention"
        subtitle="Active"
        className="left-[8%] top-[12%]"
      />

      <IntelligenceNode
        icon="📉"
        title="PYQ Predictive"
        subtitle="Engine Live"
        className="right-[8%] top-[16%]"
      />

      <IntelligenceNode
        icon="🎯"
        title="Strategic Weakness"
        subtitle="Mapped"
        className="bottom-[18%] left-[14%]"
      />

      <IntelligenceNode
        icon="📅"
        title="Adaptive Scheduling"
        subtitle="Orchestrating"
        className="bottom-[6%] left-[34%]"
      />

      <IntelligenceNode
        icon="🔄"
        title="Recovery Pressure"
        subtitle="Balanced"
        className="right-[12%] top-[42%]"
      />

      <IntelligenceNode
        icon="📰"
        title="Intelligent CA"
        subtitle="Phase 5+"
        className="bottom-[14%] right-[12%]"
      />

      <IntelligenceNode
        icon="🔥"
        title="Burnout Control"
        subtitle="Monitored"
        className="left-[4%] top-[42%]"
      />
    </div>
  );
}

export default IntelligenceNetwork;