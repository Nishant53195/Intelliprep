function OnboardingCard({ title, description, children }) {
  return (
    <div className="w-full max-w-2xl relative rounded-[2.5rem] border border-white/5 bg-[#131C2D]/80 p-8 sm:p-12 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
        {title}
      </h2>

      <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-400 font-light">
        {description}
      </p>

      <div className="mt-10">
        {children}
      </div>
    </div>
  );
}

export default OnboardingCard;