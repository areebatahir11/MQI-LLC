"use client";

import Navbar from "../components/Layout/navbar";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();

        console.log("PROJECT API:", data); // 🔥 debug

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

  return (
    <>
      <Navbar />

      <section className="relative min-h-screen overflow-hidden py-24 bg-zinc-950">
        {/* 🔥 MQI Background (same as About) */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-zinc-950" />

          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_0%_100%,rgba(192,72,26,0.45),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_100%_100%,rgba(192,72,26,0.45),transparent_60%)]" />

          <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />

          <div className="absolute top-[-120px] right-[-100px] w-[380px] h-[380px] rounded-full bg-orange-900/20 blur-3xl" />
          <div className="absolute bottom-[-140px] left-[-120px] w-[420px] h-[420px] rounded-full bg-orange-800/20 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-orange-800/40 px-5 py-2 text-sm text-orange-400 font-semibold mb-6">
              <div className="w-2 h-2 rounded-full bg-orange-600" />
              Portfolio
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-white">
              Our{" "}
              <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                Projects
              </span>
            </h1>
          </div>

          {/* Loading */}
          {loading && (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="rounded-3xl overflow-hidden border-2 border-zinc-800 bg-zinc-900/60 animate-pulse"
                >
                  <div className="w-full aspect-[4/3] bg-zinc-800" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-zinc-700 rounded w-3/4" />
                    <div className="h-3 bg-zinc-800 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {!loading && (
            <div className="grid md:grid-cols-3 gap-8">
              {projects.length > 0 ? (
                projects.map((project) => (
                  <div
                    key={project._id}
                    className="group relative rounded-3xl overflow-hidden border-2 border-zinc-800 bg-zinc-900/60 hover:border-orange-700/60 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative w-full aspect-[4/3]">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    </div>

                    <div className="p-5">
                      <h3 className="font-bold text-lg text-white group-hover:text-orange-400 transition">
                        {project.title}
                      </h3>
                      <p className="text-white/60 text-sm">
                        {project.location}
                      </p>
                      <p className="text-white/40 text-sm mt-2">
                        {project.description}
                      </p>
                      <p className="text-white/40 text-sm mt-2">
                        {project.client}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center col-span-3 text-white/40 py-20">
                  No projects added yet.
                </p>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
