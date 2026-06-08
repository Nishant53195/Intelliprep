function IntelligenceNode({
  title,
  subtitle,
  icon,
  className = "",
}) {
  return (
    <div
      className={`
        absolute
        z-10
        group
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-[rgba(15,22,40,0.75)]
        backdrop-blur-2xl
        px-5
        py-4
        transition-all
        duration-500
        hover:scale-105
        hover:border-cyan-400/20
        hover:shadow-[0_0_40px_rgba(34,211,238,0.12)]
        ${className}
      `}
    >
      {/* Hover Glow */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 via-transparent to-cyan-500/5" />
      </div>

      {/* Content */}
      <div className="relative flex items-center gap-4">

        {/* Icon Container */}
        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            border
            border-white/10
            bg-white/[0.03]
            text-2xl
            shadow-inner
          "
        >
          {icon}
        </div>

        {/* Text */}
        <div className="flex flex-col">
          <h3
            className="
              text-sm
              font-semibold
              tracking-wide
              text-slate-100
            "
          >
            {title}
          </h3>

          <div className="mt-1 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />

            <p
              className="
                text-[10px]
                font-mono
                tracking-[0.25em]
                text-slate-400
                uppercase
              "
            >
              {subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div
        className="
          absolute
          bottom-0
          left-0
          h-[2px]
          w-0
          bg-gradient-to-r
          from-violet-400
          to-cyan-400
          transition-all
          duration-500
          group-hover:w-full
        "
      />
    </div>
  );
}

export default IntelligenceNode;