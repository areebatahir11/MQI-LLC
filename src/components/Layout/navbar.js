// import Link from "next/link";
// import Image from "next/image";

// export default function Navbar() {
//   return (
//     <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
//       <div className="flex items-center justify-between px-6 py-2 rounded-full bg-white/70 backdrop-blur-xl border border-white/50 shadow-[0_8px_32px_rgb(0,0,0,0.08)]">
//         {/* Logo + Brand */}
//         <div className="flex items-center gap-1">
//           <div className="relative w-10 h-10 bg-transparent">
//             <Image
//               src="/images/mamooFinal_logo_transparent.png"
//               alt="MQI SPC Logo (Transparent)"
//               fill
//               sizes="40px"
//               className="object-contain mix-blend-multiply bg-transparent"
//             />
//           </div>
//           <h1 className="text-2xl font-black tracking-wide text-orange-500 drop-shadow-sm -ml-1 mt-px uppercase">
//             MQI
//           </h1>
//         </div>

//         {/* Nav Links */}
//         <div className="hidden md:flex items-center gap-7 text-sm font-medium">
//           {[
//             { name: "Home", href: "/" },
//             { name: "About", href: "/aboutpage" },
//             { name: "Services", href: "/servicepage" },
//             { name: "Projects", href: "/projectpage" },
//             { name: "Contact", href: "/contactpage" },
//           ].map((item) => (
//             <Link
//               key={item.name}
//               href={item.href}
//               className="relative text-zinc-700 transition duration-300 hover:text-orange-500 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-orange-400 after:rounded-full after:transition-all after:duration-300 hover:after:w-full"
//             >
//               {item.name}
//             </Link>
//           ))}
//         </div>

//         <Link
//           href="/adminpage"
//           className="hidden md:inline-flex items-center rounded-full bg-linear-to-r from-orange-400 to-orange-500 px-5 py-2 text-sm font-semibold text-white shadow-[0_4px_14px_rgb(249,115,22,0.4)] transition-all duration-300 hover:shadow-[0_6px_20px_rgb(249,115,22,0.5)] hover:scale-105"
//         >
//           Admin Only
//         </Link>
//       </div>
//     </nav>
//   );
// }
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/aboutpage" },
    { name: "Services", href: "/servicepage" },
    { name: "Projects", href: "/projectpage" },
    { name: "Contact", href: "/contactpage" },
  ];

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      {/* Main bar */}
      <div className="flex items-center justify-between px-6 py-2 rounded-full bg-white/70 backdrop-blur-xl border border-white/50 shadow-[0_8px_32px_rgb(0,0,0,0.08)]">

        {/* Logo + Brand */}
        <div className="flex items-center gap-1">
          <div className="relative w-10 h-10 bg-transparent">
            <Image
              src="/images/mamooFinal_logo_transparent.png"
              alt="MQI SPC Logo (Transparent)"
              fill
              sizes="40px"
              className="object-contain mix-blend-multiply bg-transparent"
            />
          </div>
          <h1 className="text-2xl font-black tracking-wide text-orange-500 drop-shadow-sm -ml-1 mt-px uppercase">
            MQI
          </h1>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-7 text-sm font-medium">
          {links.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative text-zinc-700 transition duration-300 hover:text-orange-500 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-orange-400 after:rounded-full after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop Admin Button */}
        <Link
          href="/adminpage"
          className="hidden md:inline-flex items-center rounded-full bg-gradient-to-r from-orange-400 to-orange-500 px-5 py-2 text-sm font-semibold text-white shadow-[0_4px_14px_rgb(249,115,22,0.4)] transition-all duration-300 hover:shadow-[0_6px_20px_rgb(249,115,22,0.5)] hover:scale-105"
        >
          Admin Only
        </Link>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-full hover:bg-orange-50 transition-colors duration-200"
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-5 bg-zinc-700 rounded-full transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 w-5 bg-zinc-700 rounded-full transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-5 bg-zinc-700 rounded-full transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
        <div className="rounded-3xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-[0_8px_32px_rgb(0,0,0,0.10)] px-6 py-5 flex flex-col gap-1">
          {links.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-zinc-700 font-medium text-sm py-3 px-3 rounded-xl hover:bg-orange-50 hover:text-orange-500 transition-all duration-200"
            >
              {item.name}
            </Link>
          ))}

          {/* Divider */}
          <div className="h-px bg-zinc-100 my-1" />

          <Link
            href="/adminpage"
            onClick={() => setMenuOpen(false)}
            className="text-center rounded-full bg-gradient-to-r from-orange-400 to-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_4px_14px_rgb(249,115,22,0.3)] transition-all duration-300 hover:shadow-[0_6px_20px_rgb(249,115,22,0.5)]"
          >
            Admin Only
          </Link>
        </div>
      </div>
    </nav>
  );
}