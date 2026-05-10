"use client";

import Navbar from "../components/Layout/navbar";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess("Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        alert("Error: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error sending message");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      {/* ================= CONTACT SECTION ================= */}
      <section className="relative overflow-hidden min-h-screen py-24 bg-zinc-950">

        {/* 🔥 BACKGROUND (About Page Style Unified) */}
        <div className="absolute inset-0">

          {/* Base */}
          <div className="absolute inset-0 bg-zinc-950" />

          {/* Bottom orange 800 corners */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_0%_100%,rgba(192,72,26,0.45),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_100%_100%,rgba(192,72,26,0.45),transparent_60%)]" />

          {/* Top subtle glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.08),transparent_40%)]" />

          {/* Grid */}
          <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />

          {/* Blobs */}
          <div className="absolute top-[-120px] right-[-100px] w-[380px] h-[380px] rounded-full bg-orange-900/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-[-140px] left-[-120px] w-[420px] h-[420px] rounded-full bg-orange-800/20 blur-3xl pointer-events-none" />

        </div>

        {/* ================= CONTENT ================= */}
        <div className="relative max-w-4xl mx-auto px-6 space-y-8">

          {/* Form Card */}
          <div className="bg-white/[0.06] backdrop-blur-xl border-2 border-orange-900/40 rounded-3xl p-10 shadow-[0_20px_60px_rgb(0,0,0,0.5)]">

            <div className="mb-8 text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-orange-900/30 border border-orange-700/40 px-5 py-2 text-sm text-orange-300 font-semibold mb-4">
                <div className="w-2 h-2 rounded-full bg-orange-500" />
                Get In Touch
              </div>

              <h1 className="text-4xl md:text-5xl font-black text-white">
                Contact{" "}
                <span className="bg-gradient-to-r from-orange-300 via-orange-400 to-orange-600 bg-clip-text text-transparent">
                  Us
                </span>
              </h1>

              <p className="text-white/35 mt-3 text-sm leading-relaxed max-w-lg mx-auto">
                Get in touch with MQI Contractors for demolition & excavation services.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="w-full bg-white/[0.05] border-2 border-orange-900/40 focus:border-orange-600 rounded-2xl px-5 py-4 text-white placeholder-white/20 outline-none"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-white/[0.05] border-2 border-orange-900/40 focus:border-orange-600 rounded-2xl px-5 py-4 text-white placeholder-white/20 outline-none"
                required
              />

              <textarea
                name="message"
                rows="5"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                className="w-full bg-white/[0.05] border-2 border-orange-900/40 focus:border-orange-600 rounded-2xl px-5 py-4 text-white placeholder-white/20 outline-none resize-none"
                required
              />

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-800 to-orange-600 hover:from-orange-700 hover:to-orange-500 text-white font-bold py-4 rounded-2xl transition-all duration-300 shadow-[0_8px_30px_rgba(192,72,26,0.40)] hover:shadow-[0_12px_40px_rgba(192,72,26,0.60)] hover:-translate-y-0.5"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>

            {success && (
              <p className="mt-5 text-center text-green-400 font-semibold">
                {success}
              </p>
            )}
          </div>

          {/* Contact Info */}
          <div className="flex flex-col md:flex-row justify-around items-center bg-white/[0.06] backdrop-blur-xl border-2 border-orange-900/40 rounded-3xl p-8 gap-6">

            <p className="text-white/50 flex items-center gap-2">
              📍 Muscat, Oman
            </p>

            <div className="hidden md:block w-px h-8 bg-orange-900/50" />

            <p className="text-white/50 flex items-center gap-2">
              📞 +968 9741 0272
            </p>

            <div className="hidden md:block w-px h-8 bg-orange-900/50" />

            <p className="text-white/50 flex items-center gap-2">
              ✉️ muhammadqayumrana@gmail.com
            </p>

          </div>

        </div>
      </section>
    </>
  );
}