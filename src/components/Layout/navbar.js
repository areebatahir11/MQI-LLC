import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      <div className="flex items-center justify-between px-6 py-2 rounded-full bg-white/70 backdrop-blur-xl border border-white/50 shadow-[0_8px_32px_rgb(0,0,0,0.08)]">

        {/* Logo + Brand */}
        <div className="flex items-center gap-1">
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-transparent mix-blend-multiply">
            <Image
              src="/images/mamooFinal_logo_transparent.png"
              alt="MQI SPC Logo"
              width={40}
              height={40}
              className="object-contain mix-blend-multiply"
              style={{ background: "transparent" }}
            />
          </div>
          <h1 className="text-2xl font-black tracking-wide text-orange-500 drop-shadow-sm -ml-1 mt-px uppercase">
            MQI
          </h1>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-7 text-sm font-medium">
          {[
            { name: "Home", href: "/" },
            { name: "About", href: "/aboutpage" },
            { name: "Services", href: "/servicepage" },
            { name: "Projects", href: "/projectpage" },
            { name: "Contact", href: "/contactpage" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative text-zinc-700 transition duration-300 hover:text-orange-500 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-orange-400 after:rounded-full after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <Link
          href="/adminpage"
          className="hidden md:inline-flex items-center rounded-full bg-linear-to-r from-orange-400 to-orange-500 px-5 py-2 text-sm font-semibold text-white shadow-[0_4px_14px_rgb(249,115,22,0.4)] transition-all duration-300 hover:shadow-[0_6px_20px_rgb(249,115,22,0.5)] hover:scale-105"
        >
          Admin Only
        </Link>
      </div>
    </nav>
  );
}