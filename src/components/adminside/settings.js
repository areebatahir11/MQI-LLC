"use client";

import Navbar from "@/components/Layout/navbar";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

export default function Settings() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await fetch("/api/auth/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.success) {
        setSuccess("Credentials updated successfully!");
        setForm({ email: "", password: "" });
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      setError("Failed to update credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Back to Dashboard */}
      <div className="mb-6">
        <Link
          href="/adminside/dashboard"
          className="inline-flex items-center text-orange-500 hover:text-orange-400 font-semibold"
        >
          <FaArrowLeft className="mr-2" /> Back to Dashboard
        </Link>
      </div>

      <h1 className="text-4xl font-bold text-orange-500 mb-4">Settings</h1>
      <p className="text-gray-300 mb-8">
        Update your admin email and password. After saving, you will need to login again.
      </p>

      <div className="max-w-md mx-auto bg-zinc-950 border border-zinc-800 rounded-xl p-8 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="admin@mqi.com"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-4 outline-none focus:border-orange-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="New Password"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-4 outline-none focus:border-orange-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-black font-semibold py-3 rounded-lg transition"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>

          {success && <p className="text-green-400 mt-2">{success}</p>}
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
}