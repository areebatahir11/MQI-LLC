export default function Services() {
  const services = [
    "Building Demolition",
    "Site Clearing",
    "Excavation Work",
    "Concrete Breaking",
    "Debris Removal",
    "Heavy Machinery Operations",
  ];

  return (
    <section className="bg-black py-20 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-10 text-3xl md:text-4xl font-bold text-orange-500">
          Our Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s}
              className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur hover:border-orange-500 transition"
            >
              <h3 className="text-lg font-semibold">{s}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
