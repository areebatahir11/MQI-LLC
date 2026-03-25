import Link from "next/link"
export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold text-orange-500">
            Muhammad Qayum International LLC
          </h3>
          <p className="mt-2 text-white/70">
            Professional Demolition Contractor with 15+ years of experience.
          </p>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">Quick Links</h4>
          <ul className="space-y-2 text-white/70">
            <li><Link href="./">Home</Link></li>
            <li><Link href="/aboutpage">About</Link></li>
            <li><Link href="/servicepage">Services</Link></li>
            <li><Link href="/projectpage">Projects</Link></li>
            <li><Link href="/contactpage">Contacts</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">Contact</h4>
          <p className="text-white/70">📞 +968 9741 0272</p>
          <p className="text-white/70">⏰ Open • Closes 9 PM</p>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-white/50 text-sm">
        © {new Date().getFullYear()} Muhammad Qayum International LLC. All rights reserved.
      </div>
    </footer>
  );
}
