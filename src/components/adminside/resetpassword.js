// adminsidepages/resetpassword.js
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaArrowLeft, FaKey, FaLock } from "react-icons/fa";

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [form, setForm] = useState({ token: "", newPassword: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // URL mein token aaya ho toh auto-fill karo
  useEffect(() => {
    const urlToken = searchParams.get("token");
    if (urlToken) setForm(f => ({ ...f, token: urlToken }));
  }, [searchParams]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); setSuccess("");

    if (!form.token || !form.newPassword || !form.confirmPassword)
      return setError("Sab fields required hain");
    if (form.newPassword.length < 6)
      return setError("Password kam az kam 6 characters ka hona chahiye");
    if (form.newPassword !== form.confirmPassword)
      return setError("Passwords match nahi kar rahe");

    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: form.token,
          newPassword: form.newPassword,
          confirmPassword: form.confirmPassword,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess("Password reset ho gaya! Login page par ja rahe hain...");
        setTimeout(() => router.push("/adminsidepages/login"), 2500);
      } else {
        setError(data.message || "Kuch galat hua");
      }
    } catch {
      setError("Server se connect nahi ho saka");
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    width: "100%", padding: "13px 16px 13px 44px", borderRadius: "10px",
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(192,72,26,0.25)",
    color: "#f5e6d8", fontSize: "14px", outline: "none", fontFamily: "inherit",
    transition: "border-color 0.2s",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#09090b", fontFamily: "'Segoe UI', system-ui, sans-serif", color: "#f5e6d8", position: "relative", overflow: "hidden" }}>
      <style>{`
        * { box-sizing: border-box; }
        ::placeholder { color: rgba(245,230,216,0.25) !important; }
        .rp-input:focus { border-color: rgba(192,72,26,0.70) !important; box-shadow: 0 0 0 3px rgba(192,72,26,0.12); }
        .rp-back:hover { border-color: rgba(192,72,26,0.60) !important; color: #e8703a !important; }
        .rp-btn:hover:not(:disabled) { background: #e8703a !important; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(192,72,26,0.35) !important; }
      `}</style>

      {/* Background */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 55% 60% at 0% 100%, rgba(192,72,26,0.50), transparent 60%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 55% 60% at 100% 100%, rgba(192,72,26,0.50), transparent 60%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 40% 40% at 50% 0%, rgba(192,72,26,0.12), transparent 60%)" }} />
        <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)", backgroundSize: "80px 80px" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(to right, transparent, rgba(192,72,26,0.60), transparent)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>

        {/* Back button */}
        <div style={{ width: "100%", maxWidth: "440px", marginBottom: "24px" }}>
          <button onClick={() => router.push("/adminsidepages/forgetpassword")} className="rp-back"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "transparent", border: "1px solid rgba(192,72,26,0.25)", color: "rgba(245,230,216,0.45)", fontSize: "13px", cursor: "pointer", padding: "8px 16px", borderRadius: "10px", transition: "all 0.2s", fontFamily: "inherit" }}>
            <FaArrowLeft style={{ fontSize: "10px" }} /> Token Dobara Bhejo
          </button>
        </div>

        {/* Header */}
        <div style={{ width: "100%", maxWidth: "440px", marginBottom: "28px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(192,72,26,0.12)", border: "1px solid rgba(192,72,26,0.25)", borderRadius: "20px", padding: "6px 16px", fontSize: "12px", color: "#e8703a", fontWeight: "600", letterSpacing: "0.5px", marginBottom: "14px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#c0481a" }} />
            Admin Panel
          </div>
          <h1 style={{ fontSize: "32px", fontWeight: "900", margin: "0 0 6px", letterSpacing: "-0.5px", color: "#fff" }}>
            Reset{" "}
            <span style={{ background: "linear-gradient(to right, #e8703a, #c0481a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Password
            </span>
          </h1>
          <p style={{ fontSize: "14px", color: "rgba(245,230,216,0.40)", margin: 0 }}>
            Enter token you received via email and type new password
          </p>
        </div>

        {/* Card */}
        <div style={{ width: "100%", maxWidth: "440px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(192,72,26,0.25)", borderRadius: "20px", padding: "32px", backdropFilter: "blur(12px)" }}>
          <div style={{ height: "1px", background: "linear-gradient(to right, #c0481a, transparent)", marginBottom: "28px" }} />

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* Token */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "11px", color: "rgba(245,230,216,0.40)", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase" }}>
                Reset Token <span style={{ color: "#c0481a" }}>*</span>
              </label>
              <div style={{ position: "relative" }}>
                <FaKey style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "rgba(192,72,26,0.5)", fontSize: "13px" }} />
                <input className="rp-input" type="text" name="token" placeholder="Email se mila 6-digit token"
                  value={form.token} onChange={handleChange} style={{ ...inputStyle, letterSpacing: "3px", fontSize: "18px", fontWeight: "700" }} maxLength={6} />
              </div>
              <p style={{ fontSize: "11px", color: "rgba(245,230,216,0.25)", margin: "2px 0 0" }}>Token will expire after 15 minutes</p>
            </div>

            {/* New Password */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "11px", color: "rgba(245,230,216,0.40)", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase" }}>
                Naya Password <span style={{ color: "#c0481a" }}>*</span>
              </label>
              <div style={{ position: "relative" }}>
                <FaLock style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "rgba(192,72,26,0.5)", fontSize: "13px" }} />
                <input className="rp-input" type="password" name="newPassword" placeholder="Minimum 6 Characters"
                  value={form.newPassword} onChange={handleChange} style={inputStyle} />
              </div>
            </div>

            {/* Confirm Password */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "11px", color: "rgba(245,230,216,0.40)", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase" }}>
                Confirm your password <span style={{ color: "#c0481a" }}>*</span>
              </label>
              <div style={{ position: "relative" }}>
                <FaLock style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "rgba(192,72,26,0.5)", fontSize: "13px" }} />
                <input className="rp-input" type="password" name="confirmPassword" placeholder="Retype Password"
                  value={form.confirmPassword} onChange={handleChange} style={inputStyle} />
              </div>
            </div>

            {error && (
              <div style={{ background: "rgba(255,68,68,0.08)", border: "1px solid rgba(255,68,68,0.25)", color: "#ff8888", padding: "11px 14px", borderRadius: "10px", fontSize: "13px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontWeight: "700" }}>✕</span> {error}
              </div>
            )}
            {success && (
              <div style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)", color: "#4ade80", padding: "11px 14px", borderRadius: "10px", fontSize: "13px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontWeight: "700" }}>✓</span> {success}
              </div>
            )}

            <button type="submit" disabled={loading} className="rp-btn"
              style={{ marginTop: "4px", width: "100%", background: "#c0481a", border: "none", color: "#fff", padding: "14px", borderRadius: "10px", fontSize: "14px", fontWeight: "700", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, transition: "all 0.2s", boxShadow: "0 4px 15px rgba(192,72,26,0.25)", fontFamily: "inherit" }}>
              {loading ? "Reseting..." : "Reset your password"}
            </button>
          </form>
        </div>

        <p style={{ marginTop: "20px", fontSize: "12px", color: "rgba(245,230,216,0.20)", textAlign: "center" }}>
          © {new Date().getFullYear()} Muhammad Qayum International LLC
        </p>
      </div>
    </div>
  );
}