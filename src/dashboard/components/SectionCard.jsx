function SectionCard({ title, subtitle, children }) {
  return (
    <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] md:p-4">
      <div className="relative">
        {children}
      </div>
    </section>
  );
}

export default SectionCard;