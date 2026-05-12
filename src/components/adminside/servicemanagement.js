"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

const T = {
  bg:        "#ffffff",
  sidebar:   "#fdf8f5",
  card:      "#ffffff",
  input:     "#fdf6f2",
  border:    "#1a1a1a",
  borderSoft:"rgba(26,26,26,0.15)",
  orange:    "#9a3412",
  orangeL:   "#c0481a",
  orangePill:"rgba(154,52,18,0.10)",
  text:      "#1a1008",
  muted:     "#6b4c3b",
  dim:       "#a07060",
};

export default function ManageServices() {
  const router = useRouter();

  const [session, setSession]   = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [activeTab, setActiveTab] = useState("add");

  const [form, setForm] = useState({ title: "", description: "", features: "", _id: null });
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm]   = useState("");
  const [deletingService, setDeletingService] = useState(null);

  async function fetchServices() {
    try {
      const res  = await fetch("/api/services");
      const data = await res.json();
      setServices(data.services || []);
    } catch { setError("Failed to load services."); }
    finally { setLoading(false); }
  }

  useEffect(() => {
    async function check() {
      const res  = await fetch("/api/auth/session");
      const data = await res.json();
      if (!data.authenticated) router.push("/adminsidepages/login");
      else { setSession(data.user); fetchServices(); }
    }
    check();
  }, [router]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function resetForm() {
    setForm({ title: "", description: "", features: "", _id: null });
    setError(""); setSuccess("");
  }

  function handleEdit(svc) {
    setForm({ title: svc.title, description: svc.description, features: svc.features?.join(", ") || "", _id: svc._id });
    setActiveTab("add");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(e) {
    e.preventDefault(); setSubmitting(true); setError(""); setSuccess("");
    const method   = form._id ? "PUT" : "POST";
    const endpoint = form._id ? `/api/services/${form._id}` : "/api/services";
    try {
      const res = await fetch(endpoint, {
        method, headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title:       form.title,
          description: form.description,
          features:    form.features.split(",").map(f => f.trim()).filter(Boolean),
        }),
      });
      const data = await res.json();
      if (!data.success) { setError(data.message || "Something went wrong."); return; }
      setSuccess(form._id ? "Service updated successfully!" : "Service added successfully!");
      resetForm(); fetchServices();
    } catch { setError("Network error. Please try again."); }
    finally { setSubmitting(false); }
  }

  async function confirmDelete() {
    if (!deletingService) return;
    if (deleteConfirm !== deletingService.title) { setError("Title does not match."); return; }
    try {
      const res  = await fetch(`/api/services/${deletingService._id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) { setDeletingService(null); setDeleteConfirm(""); fetchServices(); }
    } catch { setError("Delete failed."); }
  }

  const inputStyle = {
    background: T.input, border: `2px solid ${T.borderSoft}`, borderRadius: "10px",
    color: T.text, padding: "12px 14px", fontSize: "14px", outline: "none",
    transition: "border-color 0.2s", width: "100%", boxSizing: "border-box", fontFamily: "inherit",
  };

  if (loading) return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:"100vh", background: T.bg, gap:"16px" }}>
      <div style={{ width:"40px", height:"40px", border:`3px solid ${T.borderSoft}`, borderTop:`3px solid ${T.orange}`, borderRadius:"50%", animation:"spin 0.8s linear infinite" }} />
      <p style={{ color: T.muted, fontSize:"14px", letterSpacing:"2px" }}>Loading Services...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <div style={{ display:"flex", minHeight:"100vh", background: T.bg, fontFamily:"'Segoe UI', system-ui, sans-serif", color: T.text, position:"relative" }}>
      <style>{`
        * { box-sizing: border-box; }
        ::placeholder { color: ${T.dim} !important; }
        .s-input:focus  { border-color: ${T.orange} !important; box-shadow: 0 0 0 3px rgba(154,52,18,0.12); outline: none; }
        .s-input:hover  { border-color: ${T.orangeL} !important; }
        .s-card:hover   { border-color: ${T.orange} !important; transform: translateY(-2px); box-shadow: 0 8px 30px rgba(154,52,18,0.14); }
        .s-act:hover    { background: rgba(154,52,18,0.08) !important; border-color: ${T.orange} !important; color: ${T.orange} !important; }
        .s-nav:hover    { background: rgba(154,52,18,0.07) !important; color: ${T.orange} !important; }
        .s-back:hover   { background: ${T.orange} !important; color: #fff !important; border-color: ${T.orange} !important; }
        .s-submit:hover { background: ${T.orangeL} !important; transform: translateY(-1px); box-shadow: 0 8px 20px rgba(154,52,18,0.30) !important; }
        .s-cancel:hover { border-color: ${T.orange} !important; color: ${T.orange} !important; }
      `}</style>

      {/* Background gradients */}
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0 }}>
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 55% 50% at 0% 0%, rgba(154,52,18,0.18), transparent 55%)" }} />
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 55% 50% at 100% 0%, rgba(154,52,18,0.18), transparent 55%)" }} />
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 55% 50% at 0% 100%, rgba(154,52,18,0.18), transparent 55%)" }} />
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 55% 50% at 100% 100%, rgba(154,52,18,0.18), transparent 55%)" }} />
        <div style={{ position:"absolute", inset:0, opacity:0.04, backgroundImage:"linear-gradient(to right,#000 1px,transparent 1px),linear-gradient(to bottom,#000 1px,transparent 1px)", backgroundSize:"80px 80px" }} />
      </div>

      {/* SIDEBAR */}
      <aside style={{ width:"240px", minHeight:"100vh", background:"rgba(253,248,245,0.92)", backdropFilter:"blur(12px)", borderRight:`2px solid ${T.border}`, display:"flex", flexDirection:"column", position:"sticky", top:0, height:"100vh", zIndex:10 }}>
        <div style={{ padding:"28px 24px 20px" }}>
          <div style={{ fontSize:"20px", fontWeight:"900", color: T.orange, letterSpacing:"4px" }}>SERVICE</div>
          <div style={{ fontSize:"10px", color: T.dim, letterSpacing:"3px", fontWeight:"600", marginTop:"2px" }}>MANAGER</div>
        </div>
        <div style={{ height:"2px", background:`linear-gradient(to right, ${T.orange}, transparent)`, marginBottom:"16px" }} />

        <nav style={{ display:"flex", flexDirection:"column", gap:"4px", padding:"0 12px", flex:1 }}>
          {[
            { id:"add",    icon:"＋", label: form._id ? "Edit Service" : "Add Service" },
            { id:"manage", icon:"◈",  label: "Manage Services", badge: services.length },
          ].map(item => (
            <button key={item.id} className="s-nav"
              onClick={() => { if (item.id === "add") resetForm(); else { setError(""); setSuccess(""); } setActiveTab(item.id); }}
              style={{ display:"flex", alignItems:"center", gap:"10px", padding:"12px 14px", background: activeTab===item.id ? T.orangePill : "transparent", border: activeTab===item.id ? `2px solid ${T.orange}` : "2px solid transparent", borderRadius:"10px", color: activeTab===item.id ? T.orange : T.muted, fontSize:"14px", fontWeight:"600", cursor:"pointer", textAlign:"left", width:"100%", transition:"all 0.2s" }}>
              <span style={{ fontSize:"15px", minWidth:"20px", textAlign:"center" }}>{item.icon}</span>
              <span style={{ flex:1 }}>{item.label}</span>
              {item.badge !== undefined && <span style={{ background: T.orange, color:"#fff", fontSize:"11px", fontWeight:"700", padding:"2px 7px", borderRadius:"20px" }}>{item.badge}</span>}
              {activeTab===item.id && <span style={{ width:"6px", height:"6px", borderRadius:"50%", background: T.orange }} />}
            </button>
          ))}
        </nav>

        <div style={{ padding:"20px 16px", borderTop:`2px solid ${T.border}` }}>
          <button onClick={() => router.push("/adminsidepages/dashboardadmin")} className="s-back"
            style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"8px", background: T.orangePill, border:`2px solid ${T.orange}`, color: T.orange, fontSize:"13px", fontWeight:"700", cursor:"pointer", padding:"12px 16px", borderRadius:"10px", transition:"all 0.2s", width:"100%" }}>
            <FaArrowLeft style={{ fontSize:"11px" }} /> Back to Dashboard
          </button>
          <div style={{ display:"flex", alignItems:"center", gap:"8px", marginTop:"12px", paddingLeft:"4px" }}>
            <div style={{ width:"8px", height:"8px", borderRadius:"50%", background:"#22c55e", boxShadow:"0 0 6px #22c55e" }} />
            <span style={{ fontSize:"12px", color: T.muted }}>Admin Active</span>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{ flex:1, padding:"32px 40px", maxWidth:"calc(100vw - 240px)", overflowX:"hidden", position:"relative", zIndex:1 }}>

        {/* Topbar */}
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:"28px" }}>
          <div>
            <h1 style={{ fontSize:"32px", fontWeight:"900", color: T.text, margin:0, letterSpacing:"-0.5px" }}>
              {activeTab==="add" ? (form._id ? "Edit Service" : "Add New Service") : "Manage Services"}
            </h1>
            <p style={{ fontSize:"14px", color: T.muted, margin:"4px 0 0" }}>
              {activeTab==="add" ? "Fill in the details below to add a service" : `${services.length} service${services.length !== 1 ? "s" : ""} available`}
            </p>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
            <div style={{ width:"60px", height:"2px", background:`linear-gradient(to left, ${T.orange}, transparent)` }} />
            <div style={{ width:"8px", height:"8px", borderRadius:"50%", background: T.orange, boxShadow:`0 0 10px rgba(154,52,18,0.5)` }} />
          </div>
        </div>

        {/* Alerts */}
        {error && (
          <div style={{ background:"rgba(255,68,68,0.07)", border:"2px solid rgba(255,68,68,0.30)", color:"#c0392b", padding:"12px 16px", borderRadius:"12px", marginBottom:"20px", fontSize:"14px", display:"flex", alignItems:"center", gap:"8px" }}>
            <span style={{ fontWeight:"700" }}>✕</span> {error}
          </div>
        )}
        {success && (
          <div style={{ background:"rgba(34,197,94,0.07)", border:"2px solid rgba(34,197,94,0.30)", color:"#166534", padding:"12px 16px", borderRadius:"12px", marginBottom:"20px", fontSize:"14px", display:"flex", alignItems:"center", gap:"8px" }}>
            <span style={{ fontWeight:"700" }}>✓</span> {success}
          </div>
        )}

        {/* ADD / EDIT FORM */}
        {activeTab === "add" && (
          <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"16px", maxWidth:"680px" }}>

            {/* Title */}
            <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
              <label style={{ fontSize:"11px", color: T.muted, fontWeight:"700", letterSpacing:"0.5px", textTransform:"uppercase" }}>
                Service Title <span style={{ color: T.orange }}>*</span>
              </label>
              <input className="s-input" name="title" placeholder="e.g. Excavation Works"
                onChange={handleChange} value={form.title} required style={inputStyle} />
            </div>

            {/* Description */}
            <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
              <label style={{ fontSize:"11px", color: T.muted, fontWeight:"700", letterSpacing:"0.5px", textTransform:"uppercase" }}>
                Description <span style={{ color: T.orange }}>*</span>
              </label>
              <textarea className="s-input" name="description" placeholder="Describe the service in detail..." rows={4}
                onChange={handleChange} value={form.description} required
                style={{ ...inputStyle, resize:"vertical", minHeight:"100px" }} />
            </div>

            {/* Features */}
            <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
              <label style={{ fontSize:"11px", color: T.muted, fontWeight:"700", letterSpacing:"0.5px", textTransform:"uppercase" }}>
                Features <span style={{ color: T.dim, textTransform:"none", fontWeight:"400" }}>(comma separated)</span>
              </label>
              <input className="s-input" name="features" placeholder="e.g. Heavy machinery, Site clearance, 24/7 support"
                onChange={handleChange} value={form.features} style={inputStyle} />
              {form.features && (
                <div style={{ display:"flex", flexWrap:"wrap", gap:"6px", marginTop:"4px" }}>
                  {form.features.split(",").map((f, i) => f.trim() && (
                    <span key={i} style={{ background: T.orangePill, border:`1px solid ${T.orange}`, color: T.orange, fontSize:"11px", padding:"3px 10px", borderRadius:"20px", fontWeight:"600" }}>
                      {f.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div style={{ display:"flex", gap:"12px", justifyContent:"flex-end", marginTop:"8px", paddingTop:"16px", borderTop:`2px solid ${T.borderSoft}` }}>
              {form._id && (
                <button type="button" onClick={resetForm} className="s-cancel"
                  style={{ background:"transparent", border:`2px solid ${T.borderSoft}`, color: T.muted, padding:"12px 20px", borderRadius:"10px", fontSize:"14px", fontWeight:"600", cursor:"pointer", transition:"all 0.2s" }}>
                  Cancel Edit
                </button>
              )}
              <button type="submit" disabled={submitting} className="s-submit"
                style={{ background: T.orange, border:"none", color:"#fff", padding:"12px 28px", borderRadius:"10px", fontSize:"14px", fontWeight:"700", cursor:"pointer", transition:"all 0.2s", opacity: submitting ? 0.7 : 1, boxShadow:"0 4px 15px rgba(154,52,18,0.25)" }}>
                {submitting ? "Saving..." : form._id ? "Update Service" : "Add Service"}
              </button>
            </div>
          </form>
        )}

        {/* MANAGE TAB */}
        {activeTab === "manage" && (
          <div>
            {services.length === 0 ? (
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"80px 20px", gap:"12px" }}>
                <span style={{ fontSize:"48px", color: T.dim }}>◈</span>
                <p style={{ fontSize:"20px", fontWeight:"700", color: T.muted, margin:0 }}>No services yet</p>
                <p style={{ fontSize:"14px", color: T.dim, margin:"0 0 16px" }}>Add your first service to get started</p>
                <button onClick={() => setActiveTab("add")} className="s-submit"
                  style={{ background: T.orange, border:"none", color:"#fff", padding:"12px 28px", borderRadius:"10px", fontSize:"14px", fontWeight:"700", cursor:"pointer", transition:"all 0.2s", boxShadow:"0 4px 15px rgba(154,52,18,0.25)" }}>
                  + Add First Service
                </button>
              </div>
            ) : (
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))", gap:"20px" }}>
                {services.map(svc => (
                  <div key={svc._id} className="s-card"
                    style={{ background: T.card, border:`2px solid ${T.border}`, borderRadius:"16px", overflow:"hidden", transition:"all 0.25s", boxShadow:"0 4px 16px rgba(0,0,0,0.08)", display:"flex", flexDirection:"column" }}>

                    {/* Card header — orange accent bar */}
                    <div style={{ height:"4px", background:`linear-gradient(to right, ${T.orange}, ${T.orangeL})` }} />

                    <div style={{ padding:"20px 20px 14px", flex:1 }}>
                      {/* Icon + Title */}
                      <div style={{ display:"flex", alignItems:"flex-start", gap:"12px", marginBottom:"10px" }}>
                        <div style={{ width:"40px", height:"40px", borderRadius:"10px", background: T.orangePill, border:`1px solid ${T.borderSoft}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"18px", flexShrink:0 }}>
                          ◈
                        </div>
                        <h3 style={{ fontSize:"16px", fontWeight:"700", color: T.text, margin:0, lineHeight:"1.4" }}>{svc.title}</h3>
                      </div>

                      {/* Description */}
                      <p style={{ fontSize:"13px", color: T.muted, margin:"0 0 12px", lineHeight:"1.6", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
                        {svc.description}
                      </p>

                      {/* Features */}
                      {svc.features?.length > 0 && (
                        <div style={{ display:"flex", flexWrap:"wrap", gap:"5px" }}>
                          {svc.features.slice(0, 3).map((f, i) => (
                            <span key={i} style={{ background:"#f5f0ee", border:`1px solid ${T.borderSoft}`, color: T.muted, fontSize:"10px", padding:"2px 8px", borderRadius:"20px" }}>{f}</span>
                          ))}
                          {svc.features.length > 3 && (
                            <span style={{ background: T.orangePill, color: T.orange, fontSize:"10px", padding:"2px 8px", borderRadius:"20px", border:`1px solid ${T.orange}` }}>+{svc.features.length - 3}</span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div style={{ display:"flex", gap:"8px", padding:"10px 20px 16px", borderTop:`2px solid ${T.borderSoft}` }}>
                      <button onClick={() => handleEdit(svc)} className="s-act"
                        style={{ flex:1, background:"transparent", border:`2px solid ${T.borderSoft}`, color: T.muted, padding:"8px", borderRadius:"8px", fontSize:"13px", cursor:"pointer", fontWeight:"600", transition:"all 0.2s" }}>
                        ✎ Edit
                      </button>
                      <button onClick={() => { setDeletingService(svc); setDeleteConfirm(""); setError(""); }}
                        style={{ flex:1, background:"transparent", border:"2px solid rgba(220,38,38,0.25)", color:"#dc2626", padding:"8px", borderRadius:"8px", fontSize:"13px", cursor:"pointer", fontWeight:"600", transition:"all 0.2s" }}>
                        ✕ Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* DELETE MODAL */}
      {deletingService && (
        <div style={{ position:"fixed", inset:0, background:"rgba(26,16,8,0.60)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000, backdropFilter:"blur(4px)" }}
          onClick={e => e.target === e.currentTarget && setDeletingService(null)}>
          <div style={{ background:"#fff", border:`2px solid ${T.border}`, borderRadius:"16px", padding:"28px", width:"420px", maxWidth:"90vw", boxShadow:"0 20px 60px rgba(0,0,0,0.20)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"12px" }}>
              <span style={{ fontSize:"20px", color: T.orange }}>⚠</span>
              <h2 style={{ fontSize:"18px", fontWeight:"700", margin:0, color: T.text }}>Delete Service?</h2>
            </div>
            <p style={{ fontSize:"14px", color: T.muted, marginBottom:"16px", lineHeight:"1.5" }}>
              This cannot be undone. Type <strong style={{ color: T.orange }}>{deletingService.title}</strong> to confirm.
            </p>
            <div style={{ background: T.input, border:`2px solid ${T.borderSoft}`, borderRadius:"8px", padding:"10px 14px", fontSize:"13px", color: T.orange, fontFamily:"monospace", marginBottom:"12px" }}>
              {deletingService.title}
            </div>
            <input className="s-input" type="text" value={deleteConfirm}
              onChange={e => { setDeleteConfirm(e.target.value); setError(""); }}
              placeholder="Type service title here..."
              style={{ ...inputStyle, marginBottom:"8px" }} />
            {error && <p style={{ color:"#dc2626", fontSize:"13px", marginBottom:"12px" }}>✕ {error}</p>}
            <div style={{ display:"flex", gap:"10px", justifyContent:"flex-end" }}>
              <button onClick={() => { setDeletingService(null); setDeleteConfirm(""); setError(""); }} className="s-cancel"
                style={{ background:"transparent", border:`2px solid ${T.borderSoft}`, color: T.muted, padding:"10px 20px", borderRadius:"10px", fontSize:"14px", fontWeight:"600", cursor:"pointer", transition:"all 0.2s" }}>
                Cancel
              </button>
              <button onClick={confirmDelete} disabled={deleteConfirm !== deletingService.title}
                style={{ background:"rgba(220,38,38,0.08)", border:"2px solid rgba(220,38,38,0.35)", color:"#dc2626", padding:"10px 20px", borderRadius:"10px", fontSize:"14px", fontWeight:"600", cursor: deleteConfirm !== deletingService.title ? "not-allowed" : "pointer", opacity: deleteConfirm !== deletingService.title ? 0.35 : 1, transition:"all 0.2s" }}>
                Delete Service
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}