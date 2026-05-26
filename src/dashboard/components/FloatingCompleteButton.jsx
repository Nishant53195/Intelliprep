import React from 'react';
import { CheckCircle2 } from "lucide-react";

function FloatingCompleteButton({ onClick, visible = true, label = "Mark Complete" }) {
  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 sm:bottom-8 sm:right-8 md:bottom-10 md:right-10 animate-[fadeIn_0.4s_ease-out_forwards]">
      <button
        onClick={onClick}
        className="flex items-center gap-2.5 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white font-bold text-sm tracking-wide shadow-[0_20px_40px_-6px_rgba(99,102,241,0.3)] hover:shadow-[0_24px_50px_-4px_rgba(99,102,241,0.45)] border border-white/10 group active:scale-95 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
      >
        <CheckCircle2 
          size={18} 
          className="text-cyan-400 group-hover:rotate-12 transition-transform duration-300" 
        />
        <span className="pr-0.5">{label}</span>
      </button>
    </div>
  );
}

export default FloatingCompleteButton;