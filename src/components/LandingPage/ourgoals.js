"use client";

import Image from "next/image";

export default function OurGoals() {
  return (
    <section className="bg-zinc-950 py-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Image */}
        <div className="relative w-full h-100 rounded-2xl overflow-hidden shadow-2xl order-1 md:order-1">
          <Image
            src="/images/residential.jpg"
            alt="Our Goals"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Right Content */}
        <div className="order-2 md:order-2">
          <h2 className="text-4xl md:text-5xl font-bold text-orange-500 mb-8">
            Our <span className="text-orange-500">Goals</span>
          </h2>

          <div className="space-y-6">
            {[
              "Deliver projects on time with precision",
              "Maintain highest safety standards on-site",
              "Use modern machinery for efficient execution",
              "Build long-term trust with our clients",
            ].map((goal, index) => (
              <div
                key={index}
                className="bg-black border border-zinc-800 rounded-xl p-5 hover:border-orange-500 transition"
              >
                <h3 className="text-white font-semibold text-lg">
                  {goal}
                </h3>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
