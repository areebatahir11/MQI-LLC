// components/LandingPage/featuredprojects.js
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function FeaturedProjects() {
  const [projects, setProjects] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true); // ← yeh add kiya

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
        setLoading(false); // ← fetch hone ke baad loading false
      }
    }
    fetchProjects();
  }, []);

  // Auto-slide
  useEffect(() => {
    if (projects.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % projects.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [projects]);

  // Loading skeleton — section visible rehta hai
  if (loading) {
    return (
      <section className="bg-black py-20 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-10 text-3xl md:text-4xl font-bold text-orange-500">
            Featured Projects
          </h2>
          <div className="relative overflow-hidden rounded-xl border border-white/10 h-72 md:h-96 bg-zinc-900 animate-pulse" />
          <div className="mt-6 flex justify-center gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-2.5 w-2.5 rounded-full bg-white/20" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Koi project nahi — section show nahi karo
  if (projects.length === 0) return null;

  return (
    <section className="bg-black py-20 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-10 text-3xl md:text-4xl font-bold text-orange-500">
          Featured Projects
        </h2>

        <div className="relative overflow-hidden rounded-xl border border-white/10">
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
                  priority={index === 0} // pehli image fast load ho
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold">{project.title}</h3>
                  <p className="text-white/80">{project.location}</p>
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
              className={`h-2.5 w-2.5 rounded-full transition ${
                i === index ? "bg-orange-500" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}