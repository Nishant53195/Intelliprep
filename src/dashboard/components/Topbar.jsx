import { Menu } from "lucide-react";

function Topbar({ setMobileMenuOpen, title, subtitle }) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200/40 bg-white/70 px-5 py-4 backdrop-blur-xl sm:px-6 md:px-8 md:py-5 min-h-[88px] transition-all duration-300">
      
      <div className="flex items-center gap-4 min-w-0">
        {/* Mobile Functional Hamburger Button Frame with Touch Scaling */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:text-slate-900 active:scale-95 md:hidden"
          aria-label="Open navigation menu"
        >
          <Menu size={19} />
        </button>

        {/* Header Text Wrapper Frame */}
        <div className="min-w-0">
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl truncate">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-0.5 hidden text-xs font-semibold text-slate-400 sm:block truncate uppercase tracking-wider">
              {subtitle}
            </p>
          )}
        </div>
      </div>

    </header>
  );
}

export default Topbar;