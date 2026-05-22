function WeakTopics() {
  return (
    <div className="space-y-4">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">Weak Topic Engine</h2>
        <p className="text-xs text-slate-500 mt-0.5">Isolate high-severity vulnerability points tracked by structural logs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-red-50 border border-red-200 p-3.5 rounded-xl shadow-sm">
          <h3 className="text-xs font-bold text-red-600 uppercase tracking-wider mb-2">🔴 High-Risk Clusters</h3>
          <p className="text-xs text-slate-700">Topics with repetitive test failures or severe confidence decay surface automatically.</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl shadow-sm">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Analytics Viewport</h3>
          <p className="text-xs text-slate-600">Monitors stability curves and successful weakness recoveries over time.</p>
        </div>
      </div>
    </div>
  );
}

export default WeakTopics;