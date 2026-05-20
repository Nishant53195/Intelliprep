function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="border-b border-slate-800 p-4">
        <h1 className="text-xl font-bold">
          UPSC IntelliPrep
        </h1>
      </div>

      <main>{children}</main>
    </div>
  );
}

export default AppLayout;