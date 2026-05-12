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
    <section className="relative overflow-hidden bg-white py-28">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(234,88,12,0.55),transparent_60%),radial-gradient(circle_at_bottom_right,rgba(154,52,18,0.45),transparent_55%)]" />
      <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,rgba(0,0,0,0.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.25)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="absolute bottom-[-180px] right-[-120px] w-[500px] h-[500px] rounded-full bg-orange-400/25 blur-3xl" />
      <div className="absolute bottom-[-200px] left-[-140px] w-[520px] h-[520px] rounded-full bg-orange-300/20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-orange-200 px-5 py-2 text-sm text-orange-600 font-semibold shadow-sm mb-6">
            <div className="w-2 h-2 rounded-full bg-orange-500" />
            What We Do
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-zinc-900">
            Our{" "}
            <span className="bg-gradient-to-r from-orange-900 via-orange-600 to-orange-800 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.slice(0, 6).map((s, index) => (
            <div
              key={s._id || s.title}
              className="group relative rounded-2xl border border-white/70 bg-white/85 backdrop-blur-2xl p-6 shadow-[0_10px_35px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-2 hover:border-orange-300 hover:shadow-[0_15px_50px_rgba(249,115,22,0.18)]"
            >
              {/* hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-orange-500/10 via-transparent to-orange-500/10" />

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
