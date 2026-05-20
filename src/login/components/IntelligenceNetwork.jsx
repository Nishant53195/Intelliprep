import IntelligenceNode from "./IntelligenceNode";

function IntelligenceNetwork() {
  return (
    <div className="relative hidden h-full min-h-[700px] w-full items-center justify-center lg:flex">
      
      {/* Center Core (Text Only, No Circles/Lights) */}
      <div className="relative z-20 text-center">
        <h2 className="mb-2 block text-2xl font-medium tracking-[0.25em] text-cyan-200/60 uppercase drop-shadow-md">
          UPSC
        </h2>
        <h1 className="text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-[linear-gradient(to_right,#e0e7ff,#c4b5fd,#a5f3fc,#e0e7ff)] animate-text-flow pb-2 drop-shadow-[0_0_15px_rgba(196,181,253,0.2)] leading-tight">
          IntelliPrep.
        </h1>
        <p className="mt-2 text-sm font-mono tracking-[0.3em] text-white/30 uppercase">
          Version 1.0
        </p>
      </div>

      {/* Subtle Connection Lines */}
      <svg className="absolute inset-0 z-10 h-full w-full pointer-events-none">
        <line x1="50%" y1="50%" x2="16%" y2="15%" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <line x1="50%" y1="50%" x2="84%" y2="19%" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <line x1="50%" y1="50%" x2="22%" y2="78%" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <line x1="50%" y1="50%" x2="42%" y2="90%" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <line x1="50%" y1="50%" x2="80%" y2="45%" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <line x1="50%" y1="50%" x2="82%" y2="82%" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <line x1="50%" y1="50%" x2="12%" y2="45%" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      </svg>

      {/* Scattered Nodes */}
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