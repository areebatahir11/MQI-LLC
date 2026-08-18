"use-client";
export default function OurMission() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-t from-white via-orange-50 to-orange-100 py-28">
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:80px_80px]" />
      <div className="absolute -top-30 -left-25 w-95 h-95 rounded-full bg-orange-300/30 blur-3xl" />
      <div className="absolute -bottom-35 -right-30 w-105 h-105 rounded-full bg-orange-200/30 blur-3xl" />

      <div className="px-5">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-orange-200 backdrop-blur-xl px-5 py-2 text-sm text-orange-500 font-semibold shadow-md mb-6">
          <div className="w-2 h-2 rounded-full bg-orange-400" />
          Powering progress through precision, safety, and strength.
        </div>

        <h2 className="text-4xl md:text-5xl font-black leading-tight text-zinc-900 mb-8">
          Our{" "}
          <span className="bg-linear-to-r from-orange-500 via-orange-600 to-orange-700 bg-clip-text text-transparent">
            Mission
          </span>
        </h2>
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <div className="bg-white/90 backdrop-blur-xl border-[3px] border-zinc-900 rounded-3xl p-10 md:p-12 shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_8px_30px_rgb(0,0,0,0.18)]">
          <p className="text-xl md:text-2xl text-zinc-800 leading-relaxed font-medium">
            To procure projects at{" "}
            <span className="text-orange-500 font-bold">
              competitive prices
            </span>
            , provide safe working conditions, and deliver quality work within a
            reasonable time frame.
          </p>
        </div>
      </div>
    </section>
  );
}
