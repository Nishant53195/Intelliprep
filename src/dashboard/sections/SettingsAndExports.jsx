function SettingsAndExports() {
  return (
    <div className="space-y-4">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">Settings & Data Systems</h2>
        <p className="text-xs text-slate-500 mt-0.5">Execute backups, raw state modifications, or restoration sequences.</p>
      </div>

      <div className="p-1 bg-slate-50 border border-slate-200 rounded-2xl shadow-inner grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-2 shadow-sm">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Export Framework Snapshot</h3>
          <p className="text-[11px] text-slate-600 leading-relaxed">Download your personal database logs as an encrypted JSON archive for safekeeping.</p>
          <button className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold transition-colors shadow-sm">
            Generate Backup
          </button>
        </div>
        
        <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-2 shadow-sm">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Restore Storage State</h3>
          <p className="text-[11px] text-slate-600 leading-relaxed">Import a previously saved JSON file directly back into your browser storage cache.</p>
          <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 rounded-xl text-xs font-bold transition-colors shadow-sm">
            Upload Snapshot
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsAndExports;