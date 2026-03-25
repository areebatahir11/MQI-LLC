"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("/api/auth/forgetpassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, newPassword }),
    });

    const data = await res.json();

    if (!data.success) {
      setMessage(data.message);
      return;
    }

    setMessage("Password updated! Redirecting to login...");
    
    setTimeout(() => {
      router.push("/adminsidepages/login");
    }, 2000);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-8 rounded-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-orange-500">
          Forgot Password
        </h2>

        {message && (
          <div className="text-sm text-orange-400">{message}</div>
        )}

        <div>
          <label>Email</label>
          <input
            type="email"
            className="w-full bg-transparent border-b border-white py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>New Password</label>
          <input
            type="password"
            className="w-full bg-transparent border-b border-white py-2"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-orange-600 text-black py-2 w-full font-bold"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}
