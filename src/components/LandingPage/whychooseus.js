export default function WhyChooseUs() {
  const points = [
    {
      title: "15+ Years of Experience",
      desc: "Over a decade of proven expertise in demolition and excavation projects.",
    },
    {
      title: "Professional & Trusted Team",
      desc: "Highly trained staff with a reputation for safety, quality, and reliability.",
    },
    {
      title: "Modern Heavy Machinery",
      desc: "Advanced equipment for efficient, safe and fast project execution.",
    },
    {
      title: "On-Time Project Delivery",
      desc: "We respect your timelines and ensure projects are completed on schedule.",
    },
    {
      title: "Excellent Client Reviews",
      desc: "Rated 5.0★ by our clients for professional service from start to finish.",
    },
    {
      title: "Safety First Approach",
      desc: "Strict safety protocols to protect people, property, and the environment.",
    },
  ];

  return (
    <section className="bg-black py-20 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-10 text-3xl md:text-4xl font-bold text-orange-500">
          Why Choose Us
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {points.map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/10"
            >
              <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
              <p className="text-white/70 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
