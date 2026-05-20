import FloatingFeatures from "./FloatingFeatures";

function HeroSection() {
  return (
    <div className="flex w-full flex-col justify-center px-8 py-12 lg:w-1/2 lg:px-20 lg:py-16">
      <div>
        <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-8xl">
          UPSC
        </h1>

        <h1 className="mt-2 text-4xl font-black tracking-tight text-blue-400 sm:text-5xl lg:text-7xl">
          IntelliPrep
        </h1>

        <p className="mt-4 text-base text-slate-400 lg:text-lg">
          Version 1.0
        </p>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 lg:mt-8 lg:text-lg">
          Intelligent UPSC
          Preparation Operating
          System powered by
          adaptive scheduling,
          revision intelligence,
          recovery systems, and
          memory tracking.
        </p>
      </div>

      {/* Desktop Only */}
      <div className="hidden lg:block">
        <FloatingFeatures />
      </div>
    </div>
  );
}

export default HeroSection;