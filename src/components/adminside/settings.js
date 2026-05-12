// //adminiside/settings.js
// "use client";

// import { useState } from "react";
// import { FaArrowLeft } from "react-icons/fa";
// import { useRouter } from "next/navigation";

// export default function Settings() {
//   const router = useRouter();
//   const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" });
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");

//   function handleChange(e) {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setError(""); setSuccess("");

//     if (!form.email || !form.password || !form.confirmPassword)
//       return setError("All fields are required");
//     if (form.password.length < 6)
//       return setError("Password must be at least 6 characters");
//     if (form.password !== form.confirmPassword)
//       return setError("Passwords do not match");

//     setLoading(true);
//     try {
//       const res = await fetch("/api/auth/update", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: form.email, password: form.password }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         setSuccess(data.message || "Updated successfully!");
//         setForm({ email: "", password: "", confirmPassword: "" });
//       } else {
//         setError(data.message || "Something went wrong");
//       }
//     } catch {
//       setError("Failed to update credentials");
//     } finally {
//       setLoading(false);
//     }
//   }

//   const inputStyle = {
//     width: "100%", padding: "13px 16px", borderRadius: "10px",
//     background: "rgba(255,255,255,0.04)", border: "1px solid rgba(192,72,26,0.25)",
//     color: "#f5e6d8", fontSize: "14px", outline: "none", fontFamily: "inherit",
//     transition: "border-color 0.2s",
//   };

//   return (
//     <div style={{ minHeight:"100vh", background:"#09090b", fontFamily:"'Segoe UI', system-ui, sans-serif", color:"#f5e6d8", position:"relative", overflow:"hidden" }}>
//       <style>{`
//         * { box-sizing: border-box; }
//         ::placeholder { color: rgba(245,230,216,0.25) !important; }
//         .s-input:focus { border-color: rgba(192,72,26,0.70) !important; box-shadow: 0 0 0 3px rgba(192,72,26,0.12); }
//         .s-input:hover { border-color: rgba(192,72,26,0.45) !important; }
//         .s-back:hover { border-color: rgba(192,72,26,0.60) !important; color: #e8703a !important; }
//         .s-submit:hover { background: #e8703a !important; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(192,72,26,0.35) !important; }
//       `}</style>

//       {/* Orange corner gradients — footer style */}
//       <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0 }}>
//         <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 55% 60% at 0% 100%, rgba(192,72,26,0.50), transparent 60%)" }} />
//         <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 55% 60% at 100% 100%, rgba(192,72,26,0.50), transparent 60%)" }} />
//         <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 40% 40% at 50% 0%, rgba(192,72,26,0.12), transparent 60%)" }} />
//         {/* Grid */}
//         <div style={{ position:"absolute", inset:0, opacity:0.06, backgroundImage:"linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)", backgroundSize:"80px 80px" }} />
//         {/* Top glow line */}
//         <div style={{ position:"absolute", top:0, left:0, right:0, height:"1px", background:"linear-gradient(to right, transparent, rgba(192,72,26,0.60), transparent)" }} />
//       </div>

//       {/* Content */}
//       <div style={{ position:"relative", zIndex:1, minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"40px 20px" }}>

//         {/* Back button */}
//         <div style={{ width:"100%", maxWidth:"440px", marginBottom:"24px" }}>
//           <button onClick={() => router.push("/adminsidepages/dashboardadmin")} className="s-back"
//             style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:"transparent", border:"1px solid rgba(192,72,26,0.25)", color:"rgba(245,230,216,0.45)", fontSize:"13px", cursor:"pointer", padding:"8px 16px", borderRadius:"10px", transition:"all 0.2s", fontFamily:"inherit" }}>
//             <FaArrowLeft style={{ fontSize:"10px" }} /> Back to Dashboard
//           </button>
//         </div>

//         {/* Header */}
//         <div style={{ width:"100%", maxWidth:"440px", marginBottom:"28px" }}>
//           <div style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:"rgba(192,72,26,0.12)", border:"1px solid rgba(192,72,26,0.25)", borderRadius:"20px", padding:"6px 16px", fontSize:"12px", color:"#e8703a", fontWeight:"600", letterSpacing:"0.5px", marginBottom:"14px" }}>
//             <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#c0481a" }} />
//             Admin Panel
//           </div>
//           <h1 style={{ fontSize:"32px", fontWeight:"900", margin:"0 0 6px", letterSpacing:"-0.5px", color:"#fff" }}>
//             Admin{" "}
//             <span style={{ background:"linear-gradient(to right, #e8703a, #c0481a)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
//               Settings
//             </span>
//           </h1>
//           <p style={{ fontSize:"14px", color:"rgba(245,230,216,0.40)", margin:0 }}>Update your login email and password</p>
//         </div>

//         {/* Card */}
//         <div style={{ width:"100%", maxWidth:"440px", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(192,72,26,0.25)", borderRadius:"20px", padding:"32px", backdropFilter:"blur(12px)" }}>

//           {/* Divider */}
//           <div style={{ height:"1px", background:"linear-gradient(to right, #c0481a, transparent)", marginBottom:"28px" }} />

//           <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"16px" }}>

//             {/* Email */}
//             <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
//               <label style={{ fontSize:"11px", color:"rgba(245,230,216,0.40)", fontWeight:"700", letterSpacing:"1px", textTransform:"uppercase" }}>
//                 New Email <span style={{ color:"#c0481a" }}>*</span>
//               </label>
//               <input className="s-input" type="email" name="email" placeholder="admin@example.com"
//                 value={form.email} onChange={handleChange} style={inputStyle} />
//             </div>

//             {/* Password */}
//             <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
//               <label style={{ fontSize:"11px", color:"rgba(245,230,216,0.40)", fontWeight:"700", letterSpacing:"1px", textTransform:"uppercase" }}>
//                 New Password <span style={{ color:"#c0481a" }}>*</span>
//               </label>
//               <input className="s-input" type="password" name="password" placeholder="Min. 6 characters"
//                 value={form.password} onChange={handleChange} style={inputStyle} />
//             </div>

//             {/* Confirm Password */}
//             <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
//               <label style={{ fontSize:"11px", color:"rgba(245,230,216,0.40)", fontWeight:"700", letterSpacing:"1px", textTransform:"uppercase" }}>
//                 Confirm Password <span style={{ color:"#c0481a" }}>*</span>
//               </label>
//               <input className="s-input" type="password" name="confirmPassword" placeholder="Re-enter password"
//                 value={form.confirmPassword} onChange={handleChange} style={inputStyle} />
//             </div>

//             {/* Alerts */}
//             {error && (
//               <div style={{ background:"rgba(255,68,68,0.08)", border:"1px solid rgba(255,68,68,0.25)", color:"#ff8888", padding:"11px 14px", borderRadius:"10px", fontSize:"13px", display:"flex", alignItems:"center", gap:"8px" }}>
//                 <span style={{ fontWeight:"700" }}>✕</span> {error}
//               </div>
//             )}
//             {success && (
//               <div style={{ background:"rgba(34,197,94,0.08)", border:"1px solid rgba(34,197,94,0.25)", color:"#4ade80", padding:"11px 14px", borderRadius:"10px", fontSize:"13px", display:"flex", alignItems:"center", gap:"8px" }}>
//                 <span style={{ fontWeight:"700" }}>✓</span> {success}
//               </div>
//             )}

//             {/* Submit */}
//             <button type="submit" disabled={loading} className="s-submit"
//               style={{ marginTop:"4px", width:"100%", background:"#c0481a", border:"none", color:"#fff", padding:"14px", borderRadius:"10px", fontSize:"14px", fontWeight:"700", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, transition:"all 0.2s", boxShadow:"0 4px 15px rgba(192,72,26,0.25)", fontFamily:"inherit" }}>
//               {loading ? "Saving..." : "Save Changes"}
//             </button>

//           </form>
//         </div>

//         {/* Footer note */}
//         <p style={{ marginTop:"20px", fontSize:"12px", color:"rgba(245,230,216,0.20)", textAlign:"center" }}>
//           © {new Date().getFullYear()} Muhammad Qayum International LLC
//         </p>
//       </div>
//     </div>
//   );
// }

// adminsidepages/settings.js
"use client";

import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Settings() {
  const router = useRouter();
  const [form, setForm] = useState({
    oldEmail: "",
    newEmail: "",
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
    setError(""); setSuccess("");

    if (!form.oldEmail || !form.newEmail || !form.password || !form.confirmPassword)
      return setError("Sab fields required hain");
    if (form.password.length < 6)
      return setError("Password kam az kam 6 characters ka hona chahiye");
    if (form.password !== form.confirmPassword)
      return setError("Passwords match nahi kar rahe");

    setLoading(true);
    try {
      const res = await fetch("/api/auth/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oldEmail: form.oldEmail,
          newEmail: form.newEmail,
          password: form.password,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(data.message || "Updated successfully!");
        setForm({ oldEmail: "", newEmail: "", password: "", confirmPassword: "" });
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
    width: "100%", padding: "13px 16px", borderRadius: "10px",
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(192,72,26,0.25)",
    color: "#f5e6d8", fontSize: "14px", outline: "none", fontFamily: "inherit",
    transition: "border-color 0.2s",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#09090b", fontFamily: "'Segoe UI', system-ui, sans-serif", color: "#f5e6d8", position: "relative", overflow: "hidden" }}>
      <style>{`
        * { box-sizing: border-box; }
        ::placeholder { color: rgba(245,230,216,0.25) !important; }
        .s-input:focus { border-color: rgba(192,72,26,0.70) !important; box-shadow: 0 0 0 3px rgba(192,72,26,0.12); }
        .s-input:hover { border-color: rgba(192,72,26,0.45) !important; }
        .s-back:hover { border-color: rgba(192,72,26,0.60) !important; color: #e8703a !important; }
        .s-submit:hover { background: #e8703a !important; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(192,72,26,0.35) !important; }

        /* Divider between old and new section */
        .s-divider-label {
          display: flex; align-items: center; gap: 10px;
          font-size: 10px; color: rgba(192,72,26,0.6);
          font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;
          margin: 4px 0;
        }
        .s-divider-label::before, .s-divider-label::after {
          content: ''; flex: 1; height: 1px; background: rgba(192,72,26,0.2);
        }
      `}</style>

      {/* Background */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 55% 60% at 0% 100%, rgba(192,72,26,0.50), transparent 60%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 55% 60% at 100% 100%, rgba(192,72,26,0.50), transparent 60%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 40% 40% at 50% 0%, rgba(192,72,26,0.12), transparent 60%)" }} />
        <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)", backgroundSize: "80px 80px" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(to right, transparent, rgba(192,72,26,0.60), transparent)" }} />
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>

        {/* Back button */}
        <div style={{ width: "100%", maxWidth: "440px", marginBottom: "24px" }}>
          <button onClick={() => router.push("/adminsidepages/dashboardadmin")} className="s-back"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "transparent", border: "1px solid rgba(192,72,26,0.25)", color: "rgba(245,230,216,0.45)", fontSize: "13px", cursor: "pointer", padding: "8px 16px", borderRadius: "10px", transition: "all 0.2s", fontFamily: "inherit" }}>
            <FaArrowLeft style={{ fontSize: "10px" }} /> Back to Dashboard
          </button>
        </div>

        {/* Header */}
        <div style={{ width: "100%", maxWidth: "440px", marginBottom: "28px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(192,72,26,0.12)", border: "1px solid rgba(192,72,26,0.25)", borderRadius: "20px", padding: "6px 16px", fontSize: "12px", color: "#e8703a", fontWeight: "600", letterSpacing: "0.5px", marginBottom: "14px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#c0481a" }} />
            Admin Panel
          </div>
          <h1 style={{ fontSize: "32px", fontWeight: "900", margin: "0 0 6px", letterSpacing: "-0.5px", color: "#fff" }}>
            Admin{" "}
            <span style={{ background: "linear-gradient(to right, #e8703a, #c0481a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Settings
            </span>
          </h1>
          <p style={{ fontSize: "14px", color: "rgba(245,230,216,0.40)", margin: 0 }}>Purani email verify karke nai email aur password set karo</p>
        </div>

        {/* Card */}
        <div style={{ width: "100%", maxWidth: "440px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(192,72,26,0.25)", borderRadius: "20px", padding: "32px", backdropFilter: "blur(12px)" }}>
          <div style={{ height: "1px", background: "linear-gradient(to right, #c0481a, transparent)", marginBottom: "28px" }} />

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* OLD EMAIL — verify karne ke liye */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "11px", color: "rgba(245,230,216,0.40)", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase" }}>
                Old Email (Verify) <span style={{ color: "#c0481a" }}>*</span>
              </label>
              <input className="s-input" type="email" name="oldEmail" placeholder="Current email"
                value={form.oldEmail} onChange={handleChange} style={inputStyle} />
            </div>

            <div className="s-divider-label">New Credentials</div>

            {/* NEW EMAIL */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "11px", color: "rgba(245,230,216,0.40)", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase" }}>
                New Email <span style={{ color: "#c0481a" }}>*</span>
              </label>
              <input className="s-input" type="email" name="newEmail" placeholder="admin@example.com"
                value={form.newEmail} onChange={handleChange} style={inputStyle} />
            </div>

            {/* NEW PASSWORD */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "11px", color: "rgba(245,230,216,0.40)", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase" }}>
                New Password <span style={{ color: "#c0481a" }}>*</span>
              </label>
              <input className="s-input" type="password" name="password" placeholder="Minimum 6 Characters"
                value={form.password} onChange={handleChange} style={inputStyle} />
            </div>

            {/* CONFIRM PASSWORD */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "11px", color: "rgba(245,230,216,0.40)", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase" }}>
                Password Confirm <span style={{ color: "#c0481a" }}>*</span>
              </label>
              <input className="s-input" type="password" name="confirmPassword" placeholder="Retype password"
                value={form.confirmPassword} onChange={handleChange} style={inputStyle} />
            </div>

            {/* Alerts */}
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

            {/* Submit */}
            <button type="submit" disabled={loading} className="s-submit"
              style={{ marginTop: "4px", width: "100%", background: "#c0481a", border: "none", color: "#fff", padding: "14px", borderRadius: "10px", fontSize: "14px", fontWeight: "700", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, transition: "all 0.2s", boxShadow: "0 4px 15px rgba(192,72,26,0.25)", fontFamily: "inherit" }}>
              {loading ? "Saving your changes..." : "Save Changes"}
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