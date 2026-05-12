import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-zinc-950">

      {/* Black base with orange bleeding from bottom corners */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_0%_100%,rgba(192,72,26,0.50),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_100%_100%,rgba(192,72,26,0.50),transparent_60%)]" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-size-" />

      {/* Top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-orange-700/60 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <h3 className="text-xl font-black text-white leading-snug">
            Muhammad Qayum{" "}
            <span className="bg-linear-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              International LLC
            </span>
          </h3>
          <p className="mt-3 text-white/50 text-sm leading-relaxed">
            Professional Excavation, Hill Cutting and Demolition Contractor with 15+ years of experience.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="mb-4 font-bold text-white text-sm tracking-widest uppercase">
            Quick Links
          </h4>
          <ul className="space-y-2.5">
            {[
              { label: "Home", href: "./" },
              { label: "About", href: "/aboutpage" },
              { label: "Services", href: "/servicepage" },
              { label: "Projects", href: "/projectpage" },
              { label: "Contact", href: "/contactpage" },
            ].map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-white/50 text-sm hover:text-orange-400 transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-orange-700/60 group-hover:bg-orange-400 transition-colors" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="mb-4 font-bold text-white text-sm tracking-widest uppercase">
            Contact
          </h4>
          <div className="space-y-3">
            <p className="text-white/50 text-sm flex items-center gap-2">
              <span className="text-base">📞</span> +968 9741 0272
            </p>
            <p className="text-white/50 text-sm flex items-center gap-2">
              <span className="text-base">⏰</span> Open · Closes 5 PM
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10 py-5 text-center text-white/30 text-xs">
        © {new Date().getFullYear()} Muhammad Qayum International LLC. All rights reserved.
      </div>
    </footer>
  );
}