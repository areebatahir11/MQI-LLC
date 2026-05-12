// "use client";

// import { useEffect, useState } from "react";
// import Navbar from "../components/Layout/navbar";
// import { FaHardHat, FaBuilding, FaTruck, FaTools } from "react-icons/fa";

// const services = [
//   { title: "Building Demolition", icon: FaBuilding },
//   { title: "Site Clearing", icon: FaTools },
//   { title: "Excavation Works", icon: FaTruck },
//   { title: "Safety Management", icon: FaHardHat },
// ];

// export default function ServicesPage() {
//   const [dbServices, setDbServices] = useState([]);

//   useEffect(() => {
//     async function fetchServices() {
//       try {
//         const res = await fetch("/api/services");
//         const data = await res.json();

//         if (data.success) {
//           setDbServices(data.services || []);
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     }

//     fetchServices();
//   }, []);

//   const allServices = [
//     ...services,

//     ...dbServices.map((s, i) => ({
//       title: s.title,
//       description: s.description,
//       features: s.features,
//       icon: [FaBuilding, FaTools, FaTruck, FaHardHat][i % 4],
//     })),
//   ];

//   return (
//     <div className="bg-zinc-950 text-white min-h-screen">
//       <Navbar />

//       {/* ================= HERO ================= */}
//       <section className="relative min-h-screen overflow-hidden py-24">
//         {/* 🔥 Bottom corner orange 800 glow */}
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_0%_100%,rgba(192,72,26,0.45),transparent_60%)]" />
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_100%_100%,rgba(192,72,26,0.45),transparent_60%)]" />

//         {/* Grid */}
//         <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />

//         {/* Blobs */}
//         <div className="absolute -top-30 -right-25 w-95 h-95 rounded-full bg-orange-900/20 blur-3xl pointer-events-none" />
//         <div className="absolute -bottom-35 -left-30 w-105 h-105 rounded-full bg-orange-800/20 blur-3xl pointer-events-none" />

//         <div className="relative max-w-7xl mx-auto px-6">
//           {/* Header */}
//           <div className="mb-12">
//             <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-orange-800/40 px-5 py-2 text-sm text-orange-400 font-semibold mb-6">
//               <div className="w-2 h-2 rounded-full bg-orange-600" />
//               What We Do
//             </div>

//             <h1 className="text-4xl md:text-5xl font-black">
//               Our{" "}
//               <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
//                 Services
//               </span>
//             </h1>
//           </div>

//           {/* ================= GRID ================= */}
//           <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
//             {allServices.map((service, index) => {
//               const Icon = service.icon;

//               return (
//                 <div
//                   key={index}
//                   className="group relative bg-zinc-900/60 backdrop-blur-xl border-2 border-zinc-800 hover:border-orange-700/60 rounded-3xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_60px_rgba(192,72,26,0.25)] hover:-translate-y-1 transition-all duration-300"
//                 >
//                   {/* glow on hover */}
//                   <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-orange-800/10 via-transparent to-orange-800/10" />

//                   <div className="relative">
//                     <div className="text-orange-500 text-3xl mb-4">
//                       <Icon />
//                     </div>

//                     <h3 className="font-semibold text-lg group-hover:text-orange-400 transition">
//                       {service.title}
//                     </h3>

//                     {/* Dynamic description */}
//                     {service.description && (
//                       <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
//                         {service.description}
//                       </p>
//                     )}

//                     {/* Dynamic features */}
//                     {service.features?.length > 0 && (
//                       <div className="flex flex-wrap gap-2 mt-4">
//                         {service.features.slice(0, 3).map((f, i) => (
//                           <span
//                             key={i}
//                             className="text-[11px] px-3 py-1 rounded-full border border-orange-700/40 bg-orange-900/10 text-orange-300"
//                           >
//                             {f}
//                           </span>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Layout/navbar";
import { FaHardHat, FaBuilding, FaTruck, FaTools } from "react-icons/fa";

export default function ServicesPage() {
  const [dbServices, setDbServices] = useState([]);

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch("/api/services");
        const data = await res.json();

        if (data.success) {
          setDbServices(data.services || []);
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchServices();
  }, []);

  return (
    <div className="text-white min-h-screen">
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen overflow-hidden py-24 bg-zinc-950">
        
        {/* 🔥 Bottom corner orange 800 glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_0%_100%,rgba(192,72,26,0.45),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_100%_100%,rgba(192,72,26,0.45),transparent_60%)]" />

        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />

        {/* Blobs */}
        <div className="absolute -top-30 -right-25 w-95 h-95 rounded-full bg-orange-900/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-35 -left-30 w-105 h-105 rounded-full bg-orange-800/20 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6">

          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-orange-800/40 px-5 py-2 text-sm text-orange-400 font-semibold mb-6">
              <div className="w-2 h-2 rounded-full bg-orange-600" />
              What We Do
            </div>

            <h1 className="text-4xl md:text-5xl font-black">
              Our{" "}
              <span className="bg-linear-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                Services
              </span>
            </h1>
          </div>

          {/* ================= GRID ================= */}
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">

            {dbServices.map((service, index) => {

              const icons = [FaBuilding, FaTools, FaTruck, FaHardHat];
              const Icon = icons[index % 4];

              return (
                <div
                  key={service._id}
                  className="group relative bg-zinc-900/60 backdrop-blur-xl border-2 border-zinc-800 hover:border-orange-700/60 rounded-3xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_60px_rgba(192,72,26,0.25)] hover:-translate-y-1 transition-all duration-300"
                >
                  {/* glow on hover */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition bg-linear-to-r from-orange-800/10 via-transparent to-orange-800/10" />

                  <div className="relative">

                    {/* Icon */}
                    <div className="text-orange-500 text-3xl mb-4">
                      <Icon />
                    </div>

                    {/* Title */}
                    <h3 className="font-semibold text-lg group-hover:text-orange-400 transition">
                      {service.title}
                    </h3>

                    {/* Description */}
                    {service.description && (
                      <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
                        {service.description}
                      </p>
                    )}

                    {/* Features */}
                    {service.features?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {service.features.slice(0, 3).map((feature, i) => (
                          <span
                            key={i}
                            className="text-[11px] px-3 py-1 rounded-full border border-orange-700/40 bg-orange-900/10 text-orange-300"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}

                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </section>
    </div>
  );
}