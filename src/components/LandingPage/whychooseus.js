export default function WhyChooseUs() {
  const points = [
    {
      icon: "🏆",
      title: "15+ Years of Experience",
      desc: "Over a decade of proven expertise in demolition and excavation projects.",
    },
    {
      icon: "👷",
      title: "Professional & Trusted Team",
      desc: "Highly trained staff with a reputation for safety, quality, and reliability.",
    },
    {
      icon: "⚙️",
      title: "Modern Heavy Machinery",
      desc: "Advanced equipment for efficient, safe and fast project execution.",
    },
    {
      icon: "📅",
      title: "On-Time Project Delivery",
      desc: "We respect your timelines and ensure projects are completed on schedule.",
    },
    {
      icon: "⭐",
      title: "Excellent Client Reviews",
      desc: "Rated 5.0★ by our clients for professional service from start to finish.",
    },
    {
      icon: "🛡",
      title: "Safety First Approach",
      desc: "Strict safety protocols to protect people, property, and the environment.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-t from-orange-800 via-orange-200 to-white py-28">

      {/* Radial overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(154,52,18,0.25),transparent_40%),radial-gradient(circle_at_top_right,rgba(249,115,22,0.08),transparent_30%)]" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* Floating blobs */}
      <div className="absolute top-[-120px] right-[-100px] w-[380px] h-[380px] rounded-full bg-orange-300/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-140px] left-[-120px] w-[420px] h-[420px] rounded-full bg-orange-800/20 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-orange-200 backdrop-blur-xl px-5 py-2 text-sm text-orange-500 font-semibold shadow-md mb-6">
            <div className="w-2 h-2 rounded-full bg-orange-700" />
            Our Advantages
          </div>
          <h2 className="text-4xl md:text-5xl font-black leading-tight text-zinc-900">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 bg-clip-text text-transparent">
              Us
            </span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {points.map((item) => (
            <div
              key={item.title}
              className="group relative bg-white/70 backdrop-blur-xl border-2 border-zinc-900 rounded-3xl p-7 shadow-[0_8px_30px_rgb(0,0,0,0.10)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.22)] hover:-translate-y-2 transition-all duration-300"
            >
              {/* Hover diagonal glow */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[linear-gradient(135deg,rgba(154,52,18,0.06),transparent_60%,rgba(194,65,12,0.04))]" />

              <div className="relative w-12 h-12 rounded-2xl bg-white border-2 border-zinc-900 flex items-center justify-center text-2xl mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="mb-2 text-base font-bold text-zinc-900 group-hover:text-orange-700 transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}