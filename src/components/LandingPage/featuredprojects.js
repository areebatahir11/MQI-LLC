"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function FeaturedProjects() {
  const [projects, setProjects] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        if (data.success) {
          setProjects(data.projects || []);
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  useEffect(() => {
    if (projects.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % projects.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [projects]);

  const BgLayers = () => (
    <>
      {/* Clean white base */}
      <div className="absolute inset-0 bg-white" />

      {/* Exact burnt orange from image — bottom-left corner */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_0%_100%,rgba(192,72,26,0.90),transparent_60%)]" />

      {/* Bottom-right corner same color */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_100%_100%,rgba(192,72,26,0.90),transparent_60%)]" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* Floating blobs */}
      <div className="absolute top-[-120px] right-[-100px] w-[380px] h-[380px] rounded-full bg-orange-300/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-140px] left-[-120px] w-[420px] h-[420px] rounded-full bg-orange-800/20 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 blur-3xl pointer-events-none" />
    </>
  );

  if (loading) {
    return (
      <section className="relative py-28 overflow-hidden">
        <BgLayers />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-orange-200 backdrop-blur-xl px-5 py-2 text-sm text-orange-500 font-semibold shadow-md mb-6">
            <div className="w-2 h-2 rounded-full bg-orange-700" />
            Portfolio
          </div>
          <h2 className="mb-10 text-4xl md:text-5xl font-black text-zinc-900">
            Featured{" "}
            <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <div className="relative overflow-hidden rounded-[28px] border-2 border-zinc-900 h-72 md:h-96 bg-white/60 backdrop-blur-md animate-pulse shadow-[0_20px_60px_rgb(0,0,0,0.12)]" />
          <div className="mt-6 flex justify-center gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-2.5 w-2.5 rounded-full bg-black/20" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) return null;

  return (
    <section className="relative py-28 overflow-hidden">
      <BgLayers />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-orange-200 backdrop-blur-xl px-5 py-2 text-sm text-orange-500 font-semibold shadow-md mb-6">
            <div className="w-2 h-2 rounded-full bg-orange-700" />
            Portfolio
          </div>
          <h2 className="text-4xl md:text-5xl font-black leading-tight text-zinc-900">
            Featured{" "}
            <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
        </div>

        {/* Slider */}
        <div className="relative overflow-hidden rounded-[28px] border-2 border-zinc-900 shadow-[0_20px_60px_rgb(0,0,0,0.18)]">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {projects.map((project) => (
              <div
                key={project._id}
                className="relative h-72 md:h-[420px] min-w-full"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-orange-900/30 to-transparent" />
                <div className="absolute bottom-0 left-0 p-7">
                  <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                  <p className="text-white/70 mt-1">{project.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="mt-6 flex justify-center gap-3">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === index
                  ? "bg-black w-7 shadow-[0_0_10px_rgba(0,0,0,0.25)]"
                  : "bg-zinc-800/40 w-2.5 hover:bg-black/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}