//adminside/login.js
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

    // Redirect to dashboard
    router.push("/adminsidepages/dashboardadmin");
  }

  return (
    <div className="min-h-screen flex bg-black text-white relative">
      {/* Back to homepage */}
      <div className="absolute top-6 right-6">
        <Link
          href="/"
          className="inline-flex items-center text-orange-500 hover:text-orange-400 font-semibold"
        >
          <FaArrowLeft className="mr-2" />
          Back to Homepage
        </Link>
      </div>

      <div className="flex flex-col md:flex-row w-full">
        {/* Left side branding */}
        <div className="hidden md:flex w-1/2 relative">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/about.png')" }}
          ></div>
          <div className="absolute inset-0 bg-black/80"></div>
          <div className="absolute left-0 top-0 h-full w-2 bg-orange-600"></div>

          <div className="relative z-10 flex flex-col justify-center px-16">
            <h1 className="text-6xl font-extrabold text-orange-500 tracking-widest">
              MQI
            </h1>
            <p className="mt-6 text-xl uppercase tracking-wider">
              Muhammad Qayum International LLC
            </p>
            <div className="mt-10 h-1 w-24 bg-orange-600"></div>
            <p className="mt-6 text-sm leading-relaxed max-w-md">
              Secure administrative access to manage demolition, excavation
              projects, team members and service listings.
            </p>
          </div>
        </div>

        {/* Right side login */}
        <div className="flex w-full md:w-1/2 items-center justify-center px-8 py-16">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold mb-12 uppercase tracking-widest text-orange-500">
              Admin Login
            </h2>

            {error && (
              <div className="mb-6 border border-orange-600 p-3 text-orange-500 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="flex flex-col gap-10">
              <div>
                <label className="text-xs uppercase tracking-widest">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full bg-transparent border-b border-white py-3 focus:outline-none focus:border-orange-600 transition duration-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-widest">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full bg-transparent border-b border-white py-3 focus:outline-none focus:border-orange-600 transition duration-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="text-right">
                <button
                  type="button"
                  onClick={() =>
                    router.push("/adminsidepages/forgetpasswordpage")
                  }
                  className="text-xs text-orange-500 hover:underline tracking-wide"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="bg-orange-600 text-black font-bold py-3 uppercase tracking-widest hover:bg-orange-500 transition duration-300"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}