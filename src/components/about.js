"use client";

import Image from "next/image";
import Navbar from "../components/Layout/navbar";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <section className="relative overflow-hidden bg-zinc-950 text-white py-24">
        {/* Background layers — single consistent set */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_0%_100%,rgba(192,72,26,0.45),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_100%_100%,rgba(192,72,26,0.45),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
        <div className="absolute top-[-120px] right-[-100px] w-[380px] h-[380px] rounded-full bg-orange-900/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-140px] left-[-120px] w-[420px] h-[420px] rounded-full bg-orange-800/20 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 space-y-24">
          {/* — About — */}
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-orange-800/40 px-5 py-2 text-sm text-orange-400 font-semibold shadow-md mb-6">
                <div className="w-2 h-2 rounded-full bg-orange-600" />
                Who We Are
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                About{" "}
                <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                  MQI Contractors
                </span>
              </h1>
              <p className="text-white/60 mb-4 leading-relaxed">
                Muhammad Qayum International LLC (MQI Contractors) is a
                professional demolition and excavation company with 15+ years
                experience, delivering safe, efficient, and high-quality
                solutions across Oman.
              </p>
              <p className="text-white/60 leading-relaxed">
                With experienced engineers, skilled operators, and modern heavy
                machinery, we ensure every project is completed on time with
                strict safety standards.
              </p>
            </div>

            <div className="relative h-80 rounded-3xl overflow-hidden border-2 border-zinc-900 shadow-[0_20px_60px_rgb(0,0,0,0.5)]">
              <Image
                src="/images/about.png"
                alt="About MQI Contractors"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                loading="eager"
              />
            </div>
          </div>

          {/* — Experience — */}
          <div>
            <div className="mb-14">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-orange-800/40 px-5 py-2 text-sm text-orange-400 font-semibold shadow-md mb-6">
                <div className="w-2 h-2 rounded-full bg-orange-600" />
                Our Expertise
              </div>
              <h2 className="text-4xl md:text-5xl font-black">
                Our{" "}
                <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                  Experience
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="group bg-zinc-800/60 backdrop-blur-xl border-2 border-zinc-700 hover:border-orange-700/60 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:shadow-[0_20px_50px_rgba(192,72,26,0.20)] hover:-translate-y-1 transition-all duration-300">
                <h3 className="text-2xl font-black mb-4 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                  Excavation
                </h3>
                <p className="text-white/60 leading-relaxed">
                  MQI Contractors has extensive experience in large-scale
                  excavation projects, including site preparation, trenching,
                  and earthworks. Our team ensures efficient soil removal,
                  grading, and foundation prep using modern machinery while
                  strictly adhering to safety protocols.
                </p>
              </div>

              <div className="group bg-zinc-800/60 backdrop-blur-xl border-2 border-zinc-700 hover:border-orange-700/60 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:shadow-[0_20px_50px_rgba(192,72,26,0.20)] hover:-translate-y-1 transition-all duration-300">
                <h3 className="text-2xl font-black mb-4 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                  Demolition
                </h3>
                <p className="text-white/60 leading-relaxed">
                  With years of experience in commercial and industrial
                  demolitions, we deliver precise, safe, and controlled
                  dismantling of structures. Our skilled operators handle heavy
                  machinery expertly to minimize risk and ensure debris removal
                  is quick and organized.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
