export default function Stats() {
  return (
    <section className="bg-neutral-950 py-20 text-white">
      <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-8 px-6 text-center">
        <div>
          <p className="text-4xl font-extrabold text-orange-500">15+</p>
          <p className="text-white/70">Years in Business</p>
        </div>
        <div>
          <p className="text-4xl font-extrabold text-orange-500">5.0★</p>
          <p className="text-white/70">Customer Rating</p>
        </div>
        <div>
          <p className="text-4xl font-extrabold text-orange-500">100+</p>
          <p className="text-white/70">Completed Projects</p>
        </div>
        <div>
          <p className="text-4xl font-extrabold text-orange-500">24/7</p>
          <p className="text-white/70">Support</p>
        </div>
      </div>
    </section>
  );
}
