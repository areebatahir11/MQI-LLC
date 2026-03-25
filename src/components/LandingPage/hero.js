import Link from "next/link";

export default function Hero() {
  return (
     <section className="relative h-screen w-full overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-start justify-center px-6 md:px-20 text-white">
        <h1 className="mb-4 text-4xl md:text-6xl font-extrabold leading-tight">
          Muhammad Qayum International LLC
        </h1>
        <p className="mb-6 max-w-2xl text-lg md:text-xl text-white/80">
          Professional Demolition & Excavation Contractors with 15+ years of
          experience. Trusted for safe, reliable and on-time project delivery.
        </p>

        <div className="flex gap-4">
          <Link
            href="/contactpage"
            className="rounded-md bg-orange-500 px-6 py-3 font-semibold text-black transition hover:shadow-lg hover:shadow-orange-500/40"
          >
            Contact Us
          </Link>
          <Link
            href="/projectpage"
            className="rounded-md border border-white/40 px-6 py-3 font-semibold text-white hover:bg-white/10"
          >
            View Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
