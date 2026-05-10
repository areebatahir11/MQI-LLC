"use client";

import Image from "next/image";

export default function OurGoals() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#78360d] via-orange-100 to-white py-28">

      {/* Soft Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.12),transparent_30%)]" />

      {/* Floating Blobs */}
      <div className="absolute top-[-120px] right-[-100px] w-[380px] h-[380px] rounded-full bg-orange-300/30 blur-3xl" />

      <div className="absolute bottom-[-140px] left-[-120px] w-[420px] h-[420px] rounded-full bg-orange-200/30 blur-3xl" />

      <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 blur-3xl" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* Left Image */}
        <div className="relative group w-full h-[350px] md:h-[480px] rounded-[32px] overflow-hidden">

          {/* Glow */}
          <div className="absolute -inset-2 rounded-[32px] bg-gradient-to-br from-orange-300/40 to-orange-500/20 blur-xl opacity-70 group-hover:opacity-100 transition duration-500" />

          {/* Image Card */}
          <div className="relative w-full h-full overflow-hidden rounded-[32px] border border-white/60 bg-white/50 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.12)]">

            <Image
              src="/images/residential.jpg"
              alt="Our Goals"
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
        </div>

        {/* Right Content */}
        <div>

          {/* Tag */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-orange-200 backdrop-blur-xl px-5 py-2 text-sm text-orange-500 font-semibold shadow-md mb-6">
            <div className="w-2 h-2 rounded-full bg-orange-700" />
            Our Mission
          </div>

          <h2 className="text-4xl md:text-5xl font-black leading-tight text-zinc-900 mb-8">
            Our{" "}
            <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 bg-clip-text text-transparent">
              Goals
            </span>
          </h2>

          <div className="space-y-5">
            {[
              "Deliver projects on time with precision",
              "Maintain highest safety standards on-site",
              "Use modern machinery for efficient execution",
              "Build long-term trust with our clients",
            ].map((goal, index) => (
              <div
                key={index}
                className="group rounded-2xl border border-white/60 bg-white/60 backdrop-blur-2xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-[0_15px_50px_rgba(249,115,22,0.15)]"
              >
                <div className="flex items-center gap-4">

                  {/* Number */}
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-orange-700 text-sm font-bold text-white shadow-lg">
                    0{index + 1}
                  </div>

                  {/* Text */}
                  <h3 className="text-zinc-800 font-semibold text-lg group-hover:text-orange-500 transition">
                    {goal}
                  </h3>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}