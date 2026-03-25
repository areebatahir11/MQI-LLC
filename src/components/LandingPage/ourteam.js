"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

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

  return (
    <section className="bg-black py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-orange-500 mb-10">
          Our <span className="text-orange-500">Team</span>
        </h2>

        {/* Loading */}
        {loading && (
          <div className="text-white text-center">Loading team...</div>
        )}

        {/* Slider */}
        {!loading && team.length > 0 && (
          <div className="relative w-full overflow-hidden">
            <div className="flex gap-6 animate-slide">

              {[...team, ...team].map((member, index) => (
                <div
                  key={index}
                  className="min-w-65 bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
                >
                  <div className="relative w-full h-64">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-4 text-center">
                    <h3 className="text-white font-semibold text-lg">
                      {member.name}
                    </h3>

                    <p className="text-orange-400 text-sm">
                      {member.designation}
                    </p>
                  </div>
                </div>
              ))}

            </div>
          </div>
        )}

        {/* Empty state */}
        {!loading && team.length === 0 && (
          <div className="text-gray-500 text-center">
            No team members found
          </div>
        )}
      </div>

      {/* SAME animation */}
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