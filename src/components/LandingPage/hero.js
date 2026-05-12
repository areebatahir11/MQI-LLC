import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Layered overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/50 to-orange-950/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Orange ambient glow */}
      <div className="absolute bottom-0 left-1/3 w-[600px] h-[400px] bg-orange-500/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-orange-400/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Edge blur fade */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white/5 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-start justify-center px-8 md:px-20 text-white max-w-7xl mx-auto">

        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 text-sm text-orange-300 font-medium">
          <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse inline-block" />
          Professional Hill Cutting, Demolition & Excavation
        </div>

        <h1 className="mb-5 text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
          Muhammad Qayum
          <br />
          <span className="bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 bg-clip-text text-transparent">
            International LLC
          </span>
        </h1>

        <p className="mb-8 max-w-xl text-base md:text-lg text-white/75 leading-relaxed font-light">
          15+ years of excellence in safe, reliable, and precision-driven
          demolition and excavation. Trusted by clients across the region.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/contactpage"
            className="rounded-full bg-gradient-to-r from-orange-400 to-orange-500 px-7 py-3.5 font-semibold text-white shadow-[0_4px_24px_rgb(249,115,22,0.5)] transition-all duration-300 hover:shadow-[0_6px_32px_rgb(249,115,22,0.6)] hover:scale-105"
          >
            Contact Us
          </Link>
          <Link
            href="/projectpage"
            className="rounded-full bg-white/10 backdrop-blur-md border border-white/30 px-7 py-3.5 font-semibold text-white transition-all duration-300 hover:bg-white/20 hover:scale-105"
          >
            View Projects
          </Link>
        </div>

        {/* Floating Stats Card */}
        <div className="absolute bottom-10 right-8 md:right-20 hidden md:flex gap-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-4 shadow-[0_8px_32px_rgb(0,0,0,0.2)]">
          {[
            { val: "15+", label: "Years" },
            { val: "100+", label: "Projects" },
            { val: "5.0★", label: "Rating" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-xl font-extrabold text-orange-400">{s.val}</p>
              <p className="text-xs text-white/60">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}