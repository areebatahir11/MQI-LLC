//adminside/settings.js
"use client";

import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

export default function Settings() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.email || !form.password || !form.confirmPassword) {
      return setError("All fields are required");
    }

    if (form.password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match");
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(data.message || "Updated successfully!");
        setForm({ email: "", password: "", confirmPassword: "" });
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
      <Link
        href="/adminsidepages/dashboardadmin"
        className="inline-flex items-center text-orange-500 mb-6"
      >
        <FaArrowLeft className="mr-2" /> Back
      </Link>

      <h1 className="text-4xl font-bold text-orange-500 mb-6">
        Admin Settings
      </h1>

      <div className="max-w-md mx-auto bg-zinc-950 p-8 rounded-xl border border-zinc-800">
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Enter new email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-4 bg-zinc-900 border border-zinc-800 rounded-lg"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Enter new password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-4 bg-zinc-900 border border-zinc-800 rounded-lg"
          />

          {/* Confirm Password */}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full p-4 bg-zinc-900 border border-zinc-800 rounded-lg"
          />

          <button
            disabled={loading}
            className="w-full bg-orange-500 py-3 rounded-lg text-black font-semibold"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>

          {success && <p className="text-green-400">{success}</p>}
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
}