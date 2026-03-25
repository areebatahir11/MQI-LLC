import Link from "next/link";
import Image from "next/image";

export default function AboutPreview() {
  return (
    <section className="bg-neutral-950 py-20 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 md:grid-cols-2 items-center">
        
        <div>
          <h2 className="mb-4 text-3xl md:text-4xl font-bold text-orange-500">
            About Muhammad Qayum International LLC
          </h2>
          <p className="mb-4 text-white/80 leading-relaxed">
            Muhammad Qayum International LLC is a professional demolition and
            excavation contractor with over 15+ years of experience in the
            industry. We are known for delivering safe, reliable, and
            high-quality services across residential, commercial, and
            industrial projects.
          </p>
          <p className="mb-6 text-white/70">
            Our team uses modern heavy machinery and follows strict safety
            standards to ensure every project is completed on time and within
            budget.
          </p>

          <Link
            href="/aboutpage"
            className="inline-flex items-center rounded-md bg-orange-500 px-5 py-2.5 font-semibold text-black transition hover:shadow-lg hover:shadow-orange-500/40"
          >
            Learn More About Us
          </Link>
        </div>

        {/* Right: Image */}
        <div className="relative h-75 md:h-95 w-full overflow-hidden rounded-lg border border-white/10">
          <Image
            src="/images/about.png" 
            alt="MQI Demolition Work"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
