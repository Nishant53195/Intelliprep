import React from 'react';

function SegmentTabs({ segments, activeSegment, setActiveSegment }) {
  return (
    <div className="flex border-b border-slate-200/80 overflow-x-auto [&::-webkit-scrollbar]:hidden w-full space-x-6 sm:space-x-8 px-1">
      {segments.map((segment) => {
        const isActive = activeSegment === segment.id;
        return (
          <button
            key={segment.id}
            onClick={() => setActiveSegment(segment.id)}
            className={`relative pb-3 text-sm font-semibold tracking-wide transition-all duration-200 outline-none whitespace-nowrap active:scale-98
              ${isActive ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"}
            `}
          >
            {segment.label}
            
            {/* Smooth Indicator Underline Pill */}
            {isActive && (
              <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full shadow-[0_-1px_6px_rgba(99,102,241,0.4)] animate-[fadeIn_0.2s_ease-out_forwards]" />
            )}
          </button>
        );
      })}
    </div>
  );
}

export default SegmentTabs;