"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

export default function Dashboard() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch("/api/auth/session");
        const text = await res.text();
        let data = {};
        try {
          data = text ? JSON.parse(text) : {};
        } catch (err) {
          console.error("Invalid JSON from /api/auth/session:", text);
        }
        if (data.authenticated) setSession(data.user);
        else setSession(null);
      } catch (err) {
        console.error("Session check failed", err);
        setSession(null);
      } finally {
        setLoading(false);
      }
    }
    checkSession();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-t from-orange-800 via-orange-200 to-white">
        <div className="flex items-center gap-3 text-zinc-700 font-semibold text-lg">
          <div className="w-5 h-5 rounded-full border-2 border-orange-700 border-t-transparent animate-spin" />
          Loading Dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-t from-orange-800 via-orange-200 to-white">

      {/* Radial overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(154,52,18,0.25),transparent_40%),radial-gradient(circle_at_top_right,rgba(249,115,22,0.08),transparent_30%)]" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-size-" />

      {/* Blobs */}
      <div className="absolute -top-30 -right-25 w-95 h-95 rounded-full bg-orange-300/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-35 -left-30 w-105 h-105 rounded-full bg-orange-800/20 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 w-75 h-75 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 blur-3xl pointer-events-none" />

      <div className="relative p-8 max-w-7xl mx-auto">

        {/* Top bar */}
        <div className="flex justify-between items-center mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-orange-800 hover:text-orange-600 font-semibold transition-colors duration-200"
          >
            <FaArrowLeft className="text-sm" />
            Back to Homepage
          </Link>

          {!session && (
            <button
              onClick={() => router.push("/adminsidepages/login")}
              className="bg-linear-to-r from-orange-800 to-orange-600 hover:from-orange-700 hover:to-orange-500 text-white font-bold px-6 py-2.5 rounded-2xl shadow-[0_8px_20px_rgba(154,52,18,0.30)] hover:shadow-[0_10px_30px_rgba(154,52,18,0.45)] hover:-translate-y-0.5 transition-all duration-300"
            >
              Login as Admin
            </button>
          )}
        </div>

        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-orange-200 backdrop-blur-xl px-5 py-2 text-sm text-orange-600 font-semibold shadow-md mb-5">
            <div className="w-2 h-2 rounded-full bg-orange-800" />
            MQI – Control Panel
          </div>
          <h1 className="text-4xl md:text-5xl font-black leading-tight text-zinc-900">
            Admin{" "}
            <span className="bg-linear-to-r from-orange-500 via-orange-700 to-orange-800 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
        </div>

        {/* Read-only notice */}
        {!session && (
          <div className="mb-8 flex items-start gap-3 bg-white/60 backdrop-blur-xl border-2 border-orange-300/60 rounded-2xl p-5 shadow-[0_4px_20px_rgba(154,52,18,0.10)]">
            <span className="text-orange-600 text-xl mt-0.5">⚠️</span>
            <p className="text-zinc-700 text-sm leading-relaxed">
              You are viewing the dashboard in <span className="font-bold text-orange-700">read-only mode</span>. Login to manage team and projects.
            </p>
          </div>
        )}

        {/* Management Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            {
              title: "Team Management",
              desc: "Add, edit, or remove team members displayed on the website.",
              route: "/adminsidepages/adminteam",
              icon: "👷",
            },
            {
              title: "Projects Management",
              desc: "Control all demolition & excavation project showcases.",
              route: "/adminsidepages/adminprojects",
              icon: "🏗",
            },
            {
              title: "Contact Messages",
              desc: "View messages submitted from contact form.",
              route: "/adminsidepages/adminContacts",
              icon: "✉️",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="group relative bg-white/70 backdrop-blur-xl border-2 border-zinc-900 rounded-3xl p-7 shadow-[0_8px_30px_rgb(0,0,0,0.10)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.22)] hover:-translate-y-2 transition-all duration-300"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[linear-gradient(135deg,rgba(154,52,18,0.06),transparent_60%)]" />

              <div className="relative w-12 h-12 rounded-2xl bg-white border-2 border-zinc-900 flex items-center justify-center text-2xl mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300">
                {card.icon}
              </div>

              <h2 className="relative text-lg font-black text-zinc-900 mb-2 group-hover:text-orange-700 transition-colors duration-300">
                {card.title}
              </h2>
              <p className="relative text-zinc-500 text-sm leading-relaxed mb-5">
                {card.desc}
              </p>

              <button
                onClick={() =>
                  session
                    ? router.push(card.route)
                    : router.push("/adminside/login")
                }
                className={`relative w-full py-2.5 rounded-2xl font-bold text-sm transition-all duration-300 ${
                  session
                    ? "bg-linear-to-r from-orange-800 to-orange-600 hover:from-orange-700 hover:to-orange-500 text-white shadow-[0_4px_15px_rgba(154,52,18,0.30)] hover:shadow-[0_8px_25px_rgba(154,52,18,0.45)]"
                    : "bg-zinc-100 border-2 border-zinc-300 text-zinc-400 cursor-not-allowed"
                }`}
              >
                {session ? `Manage ${card.title.split(" ")[0]}` : "Login Required"}
              </button>
            </div>
          ))}
        </div>

        {/* Footer Quick Actions */}
        {session && (
          <div className="border-t-2 border-zinc-900/10 pt-8 flex flex-wrap gap-4">
            <button
              onClick={() => router.push("/adminsidepages/dminsettings")}
              className="bg-white/70 backdrop-blur-xl border-2 border-zinc-900 text-zinc-800 hover:bg-orange-200 hover:text-orange-700 hover:border-orange-800 font-bold px-6 py-2.5 rounded-2xl transition-all duration-300 shadow-sm"
            >
              ⚙️ Settings
            </button>

            <button
              onClick={async () => {
                await fetch("/api/auth/logout", { method: "POST" });
                setSession(null);
              }}
              className="bg-white/70 backdrop-blur-xl border-2 border-red-400 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 font-bold px-6 py-2.5 rounded-2xl transition-all duration-300 shadow-sm"
            >
              🚪 Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}