"use client";

const machinery = [
  { name: "Excavator", qty: "05 NOS" },
  { name: "Shovel", qty: "01 NOS" },
  { name: "High Up (12 Ton Capacity)", qty: "02 NOS" },
  // { name: "Ruler", qty: "02 NOS" },
  { name: "Tippers", qty: "03 NOS" },
  { name: "JCB", qty: "02 NOS" },
];

export default function OurMachinery() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-t from-white via-orange-50 to-orange-100 py-28">
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:80px_80px]" />
      <div className="absolute -top-30 -left-25 w-95 h-95 rounded-full bg-orange-300/30 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-orange-200 backdrop-blur-xl px-5 py-2 text-sm text-orange-500 font-semibold shadow-md mb-6">
            <div className="w-2 h-2 rounded-full bg-orange-700" />
            Our Equipment
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-zinc-900">
            Own{" "}
            <span className="bg-linear-to-r from-orange-500 via-orange-600 to-orange-700 bg-clip-text text-transparent">
              Machinery
            </span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {machinery.map((item, index) => (
            <div
              key={index}
              className="group bg-white/90 backdrop-blur-xl border-[3px] border-zinc-900 rounded-3xl p-6 shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_8px_30px_rgb(0,0,0,0.18)] hover:shadow-[0_0_0_1px_rgba(0,0,0,0.12),0_20px_50px_rgba(0,0,0,0.30)] hover:-translate-y-2 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-r from-orange-500 to-orange-700 text-sm font-bold text-white shadow-lg">
                  0{index + 1}
                </div>
                <span className="text-sm font-bold text-orange-500">{item.qty}</span>
              </div>
              <h3 className="text-zinc-800 font-semibold text-lg group-hover:text-orange-500 transition">
                {item.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}