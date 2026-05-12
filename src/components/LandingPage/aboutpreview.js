import Link from "next/link";
import Image from "next/image";

export default function AboutPreview() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-white via-orange-50 to-white py-28">
      {/* Soft Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.12),transparent_30%)]" />

      {/* Floating Blobs */}
      <div className="absolute -top-30 -left-25 w-95 h-95 rounded-full bg-orange-300/30 blur-3xl" />

      <div className="absolute -bottom-35 -right-30 w-105 h-105 rounded-full bg-orange-200/30 blur-3xl" />

      <div className="absolute top-1/2 left-1/2 w-75 h-75 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 blur-3xl" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-size-" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 md:grid-cols-2 items-center">
        {/* Left Content */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-orange-200 backdrop-blur-xl px-5 py-2 text-sm text-orange-500 font-semibold shadow-md mb-6">
            <div className="w-2 h-2 rounded-full bg-orange-400" />
            Who We Are
          </div>

          <h2 className="mb-6 text-4xl md:text-5xl font-black leading-tight text-zinc-900">
            Muhammad Qayum{" "}
            <span className="bg-linear-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
              International LLC
            </span>
          </h2>

          <p className="mb-5 text-zinc-700 leading-relaxed text-[15px] md:text-base">
            A professional demolition and excavation contractor with over 15+
            years of experience. We are known for delivering safe, reliable, and
            high-quality services across residential, commercial, and industrial
            projects.
          </p>

          <p className="mb-9 text-zinc-500 text-sm leading-relaxed">
            Our team uses modern heavy machinery and follows strict safety
            standards to ensure every project is completed on time and within
            budget.
          </p>

          <Link
            href="/aboutpage"
            className="inline-flex items-center rounded-full bg-linear-to-r from-orange-500 to-orange-400 px-7 py-3 font-semibold text-white shadow-[0_10px_30px_rgba(249,115,22,0.25)] transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_40px_rgba(249,115,22,0.35)]"
          >
            Learn More About Us →
          </Link>
        </div>

        {/* Right Image */}
        <div className="relative group">
          {/* Glow */}
          <div className="absolute -inset-2 rounded-4x1 bg-linear-to-br from-orange-300/40 to-orange-500/20 blur-xl opacity-70 group-hover:opacity-100 transition duration-500" />

          {/* Image Card */}
          <div className="relative h-80 md:h-112.5 w-full overflow-hidden rounded-4x1 border border-white/60 bg-white/50 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.12)]">
            <Image
              src="/images/about.png"
              alt="MQI Demolition Work"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />

            {/* Overlay */}
            <div
              className="absolute inset-0 bg-linear
            -to-t from-black/20 via-transparent to-transparent"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
