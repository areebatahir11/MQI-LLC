import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full backdrop-blur-md bg-black border-b border-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* Logo + Brand */}
        <div className="flex items-center gap-3">
          <Image
            src="/images/mamooFinal logo.png"   // <-- put your logo path here
            alt="MQI SPC Logo"
            width={40}
            
            height={40}
            className="object-contain"
          />
          <h1 className="text-3xl font-extrabold tracking-wide text-orange-500">
            MQI
          </h1>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
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
              className="relative text-white/80 transition duration-300 hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <Link
          href="/adminpage"
          className="hidden md:inline-flex items-center rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-black transition-all duration-300 hover:translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/40"
        >
          Admin Only
        </Link>
      </div>
    </nav>
  );
}
