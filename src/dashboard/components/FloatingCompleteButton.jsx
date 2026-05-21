import { Check } from "lucide-react";

function FloatingCompleteButton() {
  return (
    <button className="group fixed bottom-6 right-6 z-30 flex items-center gap-3 rounded-full bg-gradient-to-r from-slate-800 to-slate-900 px-5 py-3.5 font-bold text-white shadow-xl ring-2 ring-white/50 transition-transform hover:scale-105 active:scale-95 sm:px-6 sm:py-4 md:bottom-10 md:right-10">
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
        <Check size={14} className="text-white" />
      </div>
      <span className="text-sm tracking-wide sm:text-base">End the day</span>
    </button>
  );
}

export default FloatingCompleteButton;