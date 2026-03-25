"use client";

import Image from "next/image";
import Navbar from "../components/Layout/navbar";
export default function AboutPage() {
  return (
    <>      
    <Navbar />
      {/* About Section */}
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-orange-500">MQI Contractors</span>
            </h1>
            <p className="text-white/80 mb-4">
              Muhammad Qayum International LLC (MQI Contractors) is a professional
              demolition and excavation company with 15+ years experience, delivering safe, efficient, and
              high-quality solutions across Oman.
            </p>
            <p className="text-white/80">
              With experienced engineers, skilled operators, and modern heavy
              machinery, we ensure every project is completed on time with strict
              safety standards.
            </p>
          </div>

          <div className="relative h-80 rounded-2xl overflow-hidden">
            <Image
              src="/images/about.png"
              alt="About MQI Contractors"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="bg-zinc-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Experience
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Excavation Experience */}
            <div className="bg-black border border-zinc-800 rounded-xl p-8 shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-orange-500">Excavation</h3>
              <p className="text-white/90">
                MQI Contractors has extensive experience in large-scale excavation projects,
                including site preparation, trenching, and earthworks. Our team ensures
                efficient soil removal, grading, and foundation prep using modern machinery
                while strictly adhering to safety protocols.
              </p>
            </div>

            {/* Demolition Experience */}
            <div className="bg-black border border-zinc-800 rounded-xl p-8 shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-orange-500">Demolition</h3>
              <p className="text-white/90">
                With years of experience in commercial and industrial demolitions, we
                deliver precise, safe, and controlled dismantling of structures.
                Our skilled operators handle heavy machinery expertly to minimize
                risk and ensure debris removal is quick and organized.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}