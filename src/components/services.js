"use client";
import Navbar from "../components/Layout/navbar";
import { FaHardHat, FaBuilding, FaTruck, FaTools } from "react-icons/fa";

const services = [
  { title: "Building Demolition", icon: <FaBuilding /> },
  { title: "Site Clearing", icon: <FaTools /> },
  { title: "Excavation Works", icon: <FaTruck /> },
  { title: "Safety Management", icon: <FaHardHat /> },
];

export default function ServicesPage() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-12">
            Our <span className="text-orange-500">Services</span>
          </h1>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-black border border-zinc-800 rounded-xl p-6 hover:border-orange-500 transition"
              >
                <div className="text-orange-500 text-3xl mb-4">
                  {service.icon}
                </div>
                <h3 className="font-semibold">{service.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}