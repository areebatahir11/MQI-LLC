"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Placeholder silhouette SVG for when no image is set
const PlaceholderAvatar = ({ name }) => {
  const initials = name
    ? name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 relative overflow-hidden">
      {/* Decorative rings */}
      <div className="absolute w-40 h-40 rounded-full border-2 border-orange-200/50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute w-56 h-56 rounded-full border border-orange-100/60 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      {/* Avatar circle */}
      <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-200">
        <span className="text-white text-2xl font-black tracking-tight">{initials}</span>
      </div>
      {/* Silhouette body hint */}
      <div className="relative z-10 mt-3 w-12 h-5 rounded-full bg-orange-200/70" />
    </div>
  );
};

// Skeleton card for loading state
const SkeletonCard = () => (
  <div className="min-w-[260px] rounded-3xl overflow-hidden border border-white/60 bg-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-xl">
    <div className="w-full h-64 bg-gradient-to-br from-orange-100 to-orange-50 animate-pulse" />
    <div className="p-5 space-y-2.5">
      <div className="h-4 w-3/4 mx-auto rounded-full bg-orange-100 animate-pulse" />
      <div className="h-3 w-1/2 mx-auto rounded-full bg-orange-50 animate-pulse" />
    </div>
  </div>
);

// Empty placeholder card — shown when admin hasn't added members yet
const EmptyCard = ({ index }) => (
  <div className="group min-w-[260px] rounded-3xl overflow-hidden border-2 border-dashed border-zinc-800 bg-white/40 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-zinc-900 hover:shadow-[0_16px_40px_rgba(0,0,0,0.18)] hover:-translate-y-1 transition-all duration-300">
    <div className="w-full h-64 flex flex-col items-center justify-center bg-gradient-to-br from-orange-50/80 to-white/80 relative overflow-hidden">
      {/* Decorative frame corners */}
      <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-zinc-700/60 rounded-tl-lg" />
      <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-zinc-700/60 rounded-tr-lg" />
      <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-zinc-700/60 rounded-bl-lg" />
      <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-zinc-700/60 rounded-br-lg" />
      {/* Center icon */}
      <div className="w-16 h-16 rounded-full border-2 border-dashed border-zinc-700/60 flex items-center justify-center group-hover:border-zinc-900 transition-colors">
        <svg className="w-7 h-7 text-zinc-400 group-hover:text-zinc-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
      <p className="mt-3 text-zinc-400 text-xs font-medium tracking-wide group-hover:text-zinc-700 transition-colors">
        Coming Soon
      </p>
    </div>
    <div className="p-5 text-center">
      <div className="h-3.5 w-2/3 mx-auto rounded-full bg-orange-100/80" />
      <div className="h-2.5 w-1/3 mx-auto rounded-full bg-orange-50/80 mt-2" />
    </div>
  </div>
);

export default function OurTeam() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeam() {
      try {
        const res = await fetch("/api/team");
        const data = await res.json();
        setTeam(data.teams || []);
      } catch (err) {
        console.error("Failed to load team", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTeam();
  }, []);

  // Always show at least 6 slots — fill remaining with empty cards
  const MIN_CARDS = 6;
  const displayTeam = team.length >= MIN_CARDS
    ? team
    : [...team, ...Array(MIN_CARDS - team.length).fill(null)];

  return (
    <section className="relative overflow-hidden bg-gradient-to-t from-orange-800 via-orange-200 to-white py-28">

      {/* — Same background treatment as OurGoals — */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(154,52,18,0.25),transparent_40%),radial-gradient(circle_at_top_right,rgba(249,115,22,0.08),transparent_30%)]" />

      {/* Floating blobs */}
      <div className="absolute top-[-120px] right-[-100px] w-[380px] h-[380px] rounded-full bg-orange-300/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-140px] left-[-120px] w-[420px] h-[420px] rounded-full bg-orange-200/30 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 blur-3xl pointer-events-none" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header — matches OurGoals style */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-orange-200 backdrop-blur-xl px-5 py-2 text-sm text-orange-500 font-semibold shadow-md mb-6">
            <div className="w-2 h-2 rounded-full bg-orange-700" />
            The People Behind MQI
          </div>
          <h2 className="text-4xl md:text-5xl font-black leading-tight text-zinc-900">
            Our{" "}
            <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 bg-clip-text text-transparent">
              Team
            </span>
          </h2>
        </div>

        {/* Loading skeletons */}
        {loading && (
          <div className="flex gap-6 overflow-hidden">
            {Array(4).fill(null).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Slider — sliding effect preserved exactly */}
        {!loading && (
          <div className="relative w-full overflow-hidden">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-orange-900/40 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-orange-900/40 to-transparent z-10 pointer-events-none" />

            <div className="flex gap-6 animate-slide">
              {/* Duplicate for seamless infinite loop */}
              {[...displayTeam, ...displayTeam].map((member, index) => {
                if (!member) {
                  return <EmptyCard key={`empty-${index}`} index={index} />;
                }

                return (
                  <div
                    key={index}
                    className="group min-w-[260px] bg-white/70 backdrop-blur-xl rounded-3xl overflow-hidden border-2 border-zinc-900 shadow-[0_8px_30px_rgb(0,0,0,0.15)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:-translate-y-2 transition-all duration-300 relative"
                  >
                    {/* Decorative frame corners on hover */}
                    <div className="absolute top-2 left-2 w-6 h-6 border-t-[3px] border-l-[3px] border-black/0 group-hover:border-black rounded-tl-lg transition-colors duration-300 z-20" />
                    <div className="absolute top-2 right-2 w-6 h-6 border-t-[3px] border-r-[3px] border-black/0 group-hover:border-black rounded-tr-lg transition-colors duration-300 z-20" />
                    <div className="absolute bottom-0 left-2 w-6 h-6 border-b-[3px] border-l-[3px] border-black/0 group-hover:border-black rounded-bl-lg transition-colors duration-300 z-20" />
                    <div className="absolute bottom-0 right-2 w-6 h-6 border-b-[3px] border-r-[3px] border-black/0 group-hover:border-black rounded-br-lg transition-colors duration-300 z-20" />

                    {/* Image or placeholder */}
                    <div className="relative w-full h-64 overflow-hidden">
                      {member.image ? (
                        <>
                          <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            className="object-cover transition duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        </>
                      ) : (
                        <PlaceholderAvatar name={member.name} />
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-5 text-center">
                      <h3 className="text-zinc-900 font-bold text-base group-hover:text-orange-600 transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-orange-500 text-sm font-medium mt-0.5">
                        {member.designation}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Sliding animation — untouched */}
      <style jsx>{`
        .animate-slide {
          animation: slide 25s linear infinite;
        }
        @keyframes slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}