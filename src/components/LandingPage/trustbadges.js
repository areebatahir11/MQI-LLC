//trustbadges.js
export default function Stats() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-white via-orange-50 to-orange-100 py-24">
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* Center blob */}
      <div className="absolute -top-30 -left-25 w-95 h-95 rounded-full bg-orange-300/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-35 -right-30 w-105 h-105 rounded-full bg-orange-200/30 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 w-75 h-75 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 blur-3xl pointer-events-none" />
      <div className="relative mx-auto max-w-5xl px-6">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { val: "15+", label: "Years in Business", icon: "🏗" },
            { val: "5.0★", label: "Customer Rating", icon: "⭐" },
            { val: "100+", label: "Completed Projects", icon: "🎯" },
            { val: "24/7", label: "Support", icon: "📞" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="group relative bg-white/90 backdrop-blur-xl border-[3px] border-zinc-900 rounded-3xl p-6 text-center shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_8px_30px_rgb(0,0,0,0.18)] hover:shadow-[0_0_0_1px_rgba(0,0,0,0.12),0_20px_50px_rgba(0,0,0,0.30)] hover:-translate-y-2 transition-all duration-300"
            >
              {/* Hover diagonal glow */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[linear-gradient(135deg,rgba(154,52,18,0.06),transparent_60%)]" />

              <div className="relative text-2xl mb-2">{stat.icon}</div>
              <p className="relative text-3xl md:text-4xl font-black bg-gradient-to-r from-orange-950 via-orange-800 to-orange-600 bg-clip-text text-transparent">
                {stat.val}
              </p>
              <p className="relative text-zinc-500 text-sm mt-1 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
