// components/projects.js  (dedicated projects page)
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
      <section className="bg-black text-white py-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-12 text-left">
            Our <span className="text-orange-500">Projects</span>
          </h1>

          {/* Loading skeleton */}
          {loading && (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden border border-white/10 bg-zinc-900 animate-pulse"
                >
                  <div className="w-full aspect-[4/3] bg-zinc-800" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-zinc-700 rounded w-3/4" />
                    <div className="h-3 bg-zinc-800 rounded w-1/2" />
                    <div className="h-3 bg-zinc-800 rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Projects grid */}
          {!loading && (
            <div className="grid md:grid-cols-3 gap-8">
              {projects.length > 0 ? (
                projects.map((project) => (
                  <div
                    key={project._id}
                    className="rounded-xl overflow-hidden border border-white/10 hover:border-orange-500 transition bg-black"
                  >
                    <div className="relative w-full aspect-[4/3] bg-zinc-900">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-5 space-y-2">
                      <h3 className="font-semibold text-lg">{project.title}</h3>
                      <p className="text-white/70 text-sm">{project.location}</p>
                      <p className="text-white/60 text-sm">{project.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center col-span-3 text-white/50 py-20">
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