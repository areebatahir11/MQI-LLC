//servicespreview.js
"use client";

import { useEffect, useState } from "react";

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch("/api/services");
        const data = await res.json();

        if (data.success) {
          setServices(data.services || []);
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchServices();
  }, []);

  const icons = ["🏚", "🌿", "⛏", "🪨", "🚛", "🦺"];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-orange-50 to-orange-100 py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.10),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.18),transparent_35%)]" />
      <div className="absolute -top-30 -left-25 w-95 h-95 rounded-full bg-orange-300/30 blur-3xl" />
      <div className="absolute -bottom-35 -right-30 w-105 h-105 rounded-full bg-orange-200/30 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 w-75 h-75 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 blur-3xl" />
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:80px_80px]" />
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-orange-200 px-5 py-2 text-sm text-orange-800 font-semibold shadow-sm mb-6">
            <div className="w-2 h-2 rounded-full bg-orange-500" />
            What We Do
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-zinc-900">
            Our{" "}
            <span className="bg-linear-to-r from-orange-900 via-orange-600 to-orange-800 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.slice(0, 6).map((s, index) => (
            <div
              key={s._id || s.title}
              className="group relative bg-white/90 backdrop-blur-xl border-[3px] border-zinc-900 rounded-3xl p-6 shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_8px_30px_rgb(0,0,0,0.18)] hover:shadow-[0_0_0_1px_rgba(0,0,0,0.12),0_20px_50px_rgba(0,0,0,0.30)] hover:-translate-y-2 transition-all duration-300"
            >
              {/* hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-linear-to-r from-orange-500/10 via-transparent to-orange-500/10" />

              <div className="relative flex items-center gap-4">
                {/* Number badge */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white border border-orange-300 text-orange-800 font-bold shadow-md group-hover:bg-orange-500 group-hover:text-white transition">
                  0{index + 1}
                </div>

                <div>
                  {/* icon */}
                  <div className="text-2xl mb-1">
                    {icons[index % icons.length]}
                  </div>

                  {/* ONLY NAME */}
                  <h3 className="text-zinc-900 font-semibold text-lg group-hover:text-orange-600 transition">
                    {s.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
