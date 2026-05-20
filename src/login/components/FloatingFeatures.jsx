const features = [
  "Smart Revision Engine",
  "Adaptive Scheduling",
  "Weak Topic Detection",
  "Recovery Intelligence",
  "Memory Stability",
  "Execution Analytics",
  "Revision Heatmaps",
  "Offline First",
  "Post-Prelims Lock",
  "Intelligent Recovery",
];

function FloatingFeatures() {
  return (
    <div className="relative mt-12 h-[320px] w-full">
      {features.map(
        (feature, index) => (
          <div
            key={feature}
            className="absolute rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 backdrop-blur-xl transition duration-300 hover:scale-105 hover:bg-white/10"
            style={{
              top: `${
                (index % 5) * 60
              }px`,
              left: `${
                (index % 2) * 180 +
                (index % 3) * 30
              }px`,
            }}
          >
            {feature}
          </div>
        )
      )}
    </div>
  );
}

export default FloatingFeatures;