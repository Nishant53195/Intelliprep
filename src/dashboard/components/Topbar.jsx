import { Bell, Search, Menu } from "lucide-react";

function Topbar({ setMobileMenuOpen,title,subtitle }) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200/60 bg-white/80 px-4 py-4 backdrop-blur-md sm:px-6 md:px-8 md:py-6">
      
      <div className="flex items-center gap-4">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-500 shadow-sm transition-colors hover:bg-slate-50 md:hidden"
        >
          <Menu size={20} />
        </button>

        <div>
  <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
    {title}
  </h1>

  <p className="mt-0.5 hidden text-sm font-medium text-slate-500 sm:block">
    {subtitle}
  </p>
</div>
        
      </div>

     
    </header>
  );
}

export default Topbar;