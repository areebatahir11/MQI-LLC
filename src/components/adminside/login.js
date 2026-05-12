// //adminside/login.js
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { FaArrowLeft } from "react-icons/fa";

// export default function AdminLogin() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   async function handleLogin(e) {
//     e.preventDefault();
//     setError("");

//     const res = await fetch("/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await res.json();

//     if (!data.success) {
//       setError(data.message || "Login failed");
//       return;
//     }

//     // Redirect to dashboard
//     router.push("/adminsidepages/dashboardadmin");
//   }

//   return (
//     <div className="min-h-screen flex bg-black text-white relative">
//       {/* Back to homepage */}
//       <div className="absolute top-6 right-6">
//         <Link
//           href="/"
//           className="inline-flex items-center text-orange-500 hover:text-orange-400 font-semibold"
//         >
//           <FaArrowLeft className="mr-2" />
//           Back to Homepage
//         </Link>
//       </div>

//       <div className="flex flex-col md:flex-row w-full">
//         {/* Left side branding */}
//         <div className="hidden md:flex w-1/2 relative">
//           <div
//             className="absolute inset-0 bg-cover bg-center"
//             style={{ backgroundImage: "url('/images/about.png')" }}
//           ></div>
//           <div className="absolute inset-0 bg-black/80"></div>
//           <div className="absolute left-0 top-0 h-full w-2 bg-orange-600"></div>

//           <div className="relative z-10 flex flex-col justify-center px-16">
//             <h1 className="text-6xl font-extrabold text-orange-500 tracking-widest">
//               MQI
//             </h1>
//             <p className="mt-6 text-xl uppercase tracking-wider">
//               Muhammad Qayum International LLC
//             </p>
//             <div className="mt-10 h-1 w-24 bg-orange-600"></div>
//             <p className="mt-6 text-sm leading-relaxed max-w-md">
//               Secure administrative access to manage demolition, excavation
//               projects, team members and service listings.
//             </p>
//           </div>
//         </div>

//         {/* Right side login */}
//         <div className="flex w-full md:w-1/2 items-center justify-center px-8 py-16">
//           <div className="w-full max-w-md">
//             <h2 className="text-3xl font-bold mb-12 uppercase tracking-widest text-orange-500">
//               Admin Login
//             </h2>

//             {error && (
//               <div className="mb-6 border border-orange-600 p-3 text-orange-500 text-sm">
//                 {error}
//               </div>
//             )}

//             <form onSubmit={handleLogin} className="flex flex-col gap-10">
//               <div>
//                 <label className="text-xs uppercase tracking-widest">
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   className="w-full bg-transparent border-b border-white py-3 focus:outline-none focus:border-orange-600 transition duration-300"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="text-xs uppercase tracking-widest">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   className="w-full bg-transparent border-b border-white py-3 focus:outline-none focus:border-orange-600 transition duration-300"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="text-right">
//                 <button
//                   type="button"
//                   onClick={() =>
//                     router.push("/adminsidepages/forgetpasswordpage")
//                   }
//                   className="text-xs text-orange-500 hover:underline tracking-wide"
//                 >
//                   Forgot Password?
//                 </button>
//               </div>

//               <button
//                 type="submit"
//                 className="bg-orange-600 text-black font-bold py-3 uppercase tracking-widest hover:bg-orange-500 transition duration-300"
//               >
//                 Login
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!data.success) {
      setError(data.message || "Login failed");
      return;
    }
    router.push("/adminsidepages/dashboardadmin");
  }

  return (
    <div className="min-h-screen flex relative overflow-hidden">

      {/* ── LEFT SIDE — light orange-800 theme ── */}
      <div className="hidden md:flex w-1/2 relative flex-col justify-center">

        {/* Light gradient background — same as dashboard */}
        <div className="absolute inset-0 bg-gradient-to-t from-orange-800 via-orange-200 to-white" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(154,52,18,0.25),transparent_40%)]" />
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:80px_80px]" />

        {/* Blobs */}
        <div className="absolute top-[-80px] left-[-80px] w-[320px] h-[320px] rounded-full bg-orange-300/30 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-100px] right-[-60px] w-[300px] h-[300px] rounded-full bg-orange-800/20 blur-3xl pointer-events-none" />

        {/* Right edge divider */}
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-orange-800/30 to-transparent" />

        <div className="relative z-10 px-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-orange-200 backdrop-blur-xl px-5 py-2 text-sm text-orange-600 font-semibold shadow-md mb-8">
            <div className="w-2 h-2 rounded-full bg-orange-800" />
            Admin Portal
          </div>

          <h1 className="text-7xl font-black text-transparent bg-gradient-to-br from-orange-950 via-orange-700 to-orange-500 bg-clip-text tracking-tight leading-none mb-4">
            MQI
          </h1>
          <p className="text-zinc-700 font-bold text-lg uppercase tracking-widest mb-8">
            Muhammad Qayum International LLC
          </p>

          <div className="h-1 w-16 rounded-full bg-gradient-to-r from-orange-800 to-orange-500 mb-8" />

          <p className="text-zinc-600 text-sm leading-relaxed max-w-sm">
            Secure administrative access to manage demolition, excavation
            projects, team members and service listings.
          </p>
        </div>
      </div>

      {/* ── RIGHT SIDE — dark with black corners ── */}
      <div className="relative flex w-full md:w-1/2 items-center justify-center px-8 py-16 bg-zinc-950 overflow-hidden">

        {/* Black corners — top-right and bottom-right */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_100%_0%,rgba(20,10,5,0.95),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_100%_100%,rgba(20,10,5,0.95),transparent_65%)]" />

        {/* Orange warmth bleeding from left */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_0%_50%,rgba(192,72,26,0.18),transparent_55%)]" />

        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />

        {/* Blobs */}
        <div className="absolute top-[-80px] right-[-60px] w-[300px] h-[300px] rounded-full bg-black/60 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-80px] right-[-60px] w-[300px] h-[300px] rounded-full bg-black/60 blur-3xl pointer-events-none" />

        {/* Back link */}
        <div className="absolute top-6 right-6">
          <Link href="/" className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-semibold text-sm transition-colors">
            <FaArrowLeft className="text-xs" />
            Back to Homepage
          </Link>
        </div>

        <div className="relative w-full max-w-md">

          <h2 className="text-3xl font-black mb-2 text-white">
            Admin{" "}
            <span className="bg-gradient-to-r from-orange-300 via-orange-400 to-orange-600 bg-clip-text text-transparent">
              Login
            </span>
          </h2>
          <p className="text-white/30 text-sm mb-10 uppercase tracking-widest">Enter your credentials</p>

          {error && (
            <div className="mb-6 bg-orange-900/30 border-2 border-orange-700/50 rounded-2xl p-4 text-orange-300 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-6">

            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-widest text-white/40 font-semibold">
                Email Address
              </label>
              <input
                type="email"
                className="w-full bg-white/[0.05] border-2 border-white/10 focus:border-orange-600 rounded-2xl px-5 py-4 text-white placeholder-white/20 outline-none transition-colors duration-200"
                placeholder="admin@mqicontractors.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-widest text-white/40 font-semibold">
                Password
              </label>
              <input
                type="password"
                className="w-full bg-white/[0.05] border-2 border-white/10 focus:border-orange-600 rounded-2xl px-5 py-4 text-white placeholder-white/20 outline-none transition-colors duration-200"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="text-right -mt-2">
              <button
                type="button"
                onClick={() => router.push("/adminsidepages/forgetpasswordpage")}
                className="text-xs text-orange-400 hover:text-orange-300 tracking-wide transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-800 to-orange-600 hover:from-orange-700 hover:to-orange-500 text-white font-black py-4 rounded-2xl uppercase tracking-widest transition-all duration-300 shadow-[0_8px_30px_rgba(192,72,26,0.40)] hover:shadow-[0_12px_40px_rgba(192,72,26,0.60)] hover:-translate-y-0.5"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}