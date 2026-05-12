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

export default function ManageTeam() {
  const router = useRouter();

  const [session, setSession] = useState(null);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("add");

  const [form, setForm] = useState({
    name: "", designation: "", description: "", image: "",
    email: "", phone: "", experience: "", skills: "", _id: null,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [deletingMember, setDeletingMember] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  async function fetchTeams() {
    try {
      const res = await fetch("/api/team");
      const data = await res.json();
      setTeams(data.teams || []);
    } catch { setError("Failed to load team."); }
    finally { setLoading(false); }
  }

  useEffect(() => {
    async function check() {
      const res = await fetch("/api/auth/session");
      const data = await res.json();
      if (!data.authenticated) router.push("/adminsidepages/login");
      else { setSession(data.user); fetchTeams(); }
    }
    check();
  }, [router]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, image: reader.result }));
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  }

  function resetForm() {
    setForm({ name: "", designation: "", description: "", image: "", email: "", phone: "", experience: "", skills: "", _id: null });
    setImagePreview(null); setError(""); setSuccess("");
  }

  function handleEdit(member) {
    setForm({ ...member, skills: member.skills?.join(", ") });
    setImagePreview(member.image || null);
    setActiveTab("add");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(e) {
    e.preventDefault(); setSubmitting(true); setError(""); setSuccess("");
    const method = form._id ? "PUT" : "POST";
    const endpoint = form._id ? `/api/team/${form._id}` : "/api/team";
    try {
      const res = await fetch(endpoint, {
        method, headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, skills: form.skills.split(",") }),
      });
      const data = await res.json();
      if (!data.success) { setError(data.message); return; }
      setSuccess(form._id ? "Member updated successfully!" : "Member added successfully!");
      resetForm(); fetchTeams();
    } catch { setError("Network error. Please try again."); }
    finally { setSubmitting(false); }
  }

  async function confirmDelete() {
    if (deleteConfirm !== deletingMember.name) { setError("Name does not match."); return; }
    await fetch(`/api/team/${deletingMember._id}`, { method: "DELETE" });
    setDeletingMember(null); setDeleteConfirm(""); fetchTeams();
  }

  const inputStyle = {
    background: T.input, border: `2px solid ${T.borderSoft}`, borderRadius: "10px",
    color: T.text, padding: "12px 14px", fontSize: "14px", outline: "none",
    transition: "border-color 0.2s", width: "100%", boxSizing: "border-box", fontFamily: "inherit",
  };

  if (loading) return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:"100vh", background: T.bg, gap:"16px" }}>
      <div style={{ width:"40px", height:"40px", border:`3px solid ${T.borderSoft}`, borderTop:`3px solid ${T.orange}`, borderRadius:"50%", animation:"spin 0.8s linear infinite" }} />
      <p style={{ color: T.muted, fontSize:"14px", letterSpacing:"2px" }}>Loading Team...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <div style={{ display:"flex", minHeight:"100vh", background: T.bg, fontFamily:"'Segoe UI', system-ui, sans-serif", color: T.text, position:"relative" }}>
      <style>{`
        * { box-sizing: border-box; }
        ::placeholder { color: ${T.dim} !important; }
        .t-input:focus { border-color: ${T.orange} !important; box-shadow: 0 0 0 3px rgba(154,52,18,0.12); outline: none; }
        .t-input:hover { border-color: ${T.orangeL} !important; }
        .t-card:hover { border-color: ${T.orange} !important; transform: translateY(-2px); box-shadow: 0 8px 30px rgba(154,52,18,0.14); }
        .t-act:hover { background: rgba(154,52,18,0.08) !important; border-color: ${T.orange} !important; color: ${T.orange} !important; }
        label[for="imageInput"]:hover { border-color: ${T.orange} !important; }
        .t-nav:hover { background: rgba(154,52,18,0.07) !important; color: ${T.orange} !important; }
        .t-back:hover { background: ${T.orange} !important; color: #fff !important; border-color: ${T.orange} !important; }
        .t-submit:hover { background: ${T.orangeL} !important; transform: translateY(-1px); box-shadow: 0 8px 20px rgba(154,52,18,0.30) !important; }
        .t-cancel:hover { border-color: ${T.orange} !important; color: ${T.orange} !important; }
      `}</style>

      {/* Cornered orange-800 gradients */}
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0 }}>
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 55% 50% at 0% 0%, rgba(154,52,18,0.18), transparent 55%)" }} />
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 55% 50% at 100% 0%, rgba(154,52,18,0.18), transparent 55%)" }} />
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 55% 50% at 0% 100%, rgba(154,52,18,0.18), transparent 55%)" }} />
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 55% 50% at 100% 100%, rgba(154,52,18,0.18), transparent 55%)" }} />
        {/* Grid */}
        <div style={{ position:"absolute", inset:0, opacity:0.04, backgroundImage:"linear-gradient(to right,#000 1px,transparent 1px),linear-gradient(to bottom,#000 1px,transparent 1px)", backgroundSize:"80px 80px" }} />
      </div>

      {/* SIDEBAR */}
      <aside style={{ width:"240px", minHeight:"100vh", background:"rgba(253,248,245,0.92)", backdropFilter:"blur(12px)", borderRight:`2px solid ${T.border}`, display:"flex", flexDirection:"column", position:"sticky", top:0, height:"100vh", zIndex:10 }}>
        <div style={{ padding:"28px 24px 20px" }}>
          <div style={{ fontSize:"20px", fontWeight:"900", color: T.orange, letterSpacing:"4px" }}>TEAM</div>
          <div style={{ fontSize:"10px", color: T.dim, letterSpacing:"3px", fontWeight:"600", marginTop:"2px" }}>MANAGER</div>
        </div>
        <div style={{ height:"2px", background:`linear-gradient(to right, ${T.orange}, transparent)`, marginBottom:"16px" }} />

        <nav style={{ display:"flex", flexDirection:"column", gap:"4px", padding:"0 12px", flex:1 }}>
          {[
            { id:"add", icon:"＋", label: form._id ? "Edit Member" : "Add Member" },
            { id:"manage", icon:"◈", label:"Manage Team", badge: teams.length },
          ].map(item => (
            <button key={item.id} className="t-nav" onClick={() => { if(item.id==="add") resetForm(); setActiveTab(item.id); }}
              style={{ display:"flex", alignItems:"center", gap:"10px", padding:"12px 14px", background: activeTab===item.id ? T.orangePill : "transparent", border: activeTab===item.id ? `2px solid ${T.orange}` : "2px solid transparent", borderRadius:"10px", color: activeTab===item.id ? T.orange : T.muted, fontSize:"14px", fontWeight:"600", cursor:"pointer", textAlign:"left", width:"100%", transition:"all 0.2s" }}>
              <span style={{ fontSize:"15px", minWidth:"20px", textAlign:"center" }}>{item.icon}</span>
              <span style={{ flex:1 }}>{item.label}</span>
              {item.badge !== undefined && <span style={{ background: T.orange, color:"#fff", fontSize:"11px", fontWeight:"700", padding:"2px 7px", borderRadius:"20px" }}>{item.badge}</span>}
              {activeTab===item.id && <span style={{ width:"6px", height:"6px", borderRadius:"50%", background: T.orange }} />}
            </button>
          ))}
        </nav>

        {/* Back to Dashboard — bottom, prominent */}
        <div style={{ padding:"20px 16px", borderTop:`2px solid ${T.border}` }}>
          <button onClick={() => router.push("/adminsidepages/dashboardadmin")} className="t-back"
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
              {activeTab==="add" ? (form._id ? "Edit Member" : "Add New Member") : "Manage Team"}
            </h1>
            <p style={{ fontSize:"14px", color: T.muted, margin:"4px 0 0" }}>
              {activeTab==="add" ? "Fill in the details below to add a team member" : `${teams.length} members in your team`}
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
          <form onSubmit={handleSubmit} style={{ display:"flex", gap:"32px", alignItems:"flex-start", flexWrap:"wrap" }}>
            {/* Image Upload */}
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"12px" }}>
              <label htmlFor="imageInput" style={{ width:"200px", height:"200px", border:`2px dashed ${T.orange}`, borderRadius:"16px", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", position:"relative", overflow:"hidden", background: T.input, transition:"border-color 0.2s" }}>
                {imagePreview ? (
                  <img src={imagePreview} alt="preview" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                ) : (
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"8px" }}>
                    <span style={{ fontSize:"28px", color: T.orange }}>⬆</span>
                    <span style={{ fontSize:"14px", color: T.muted, fontWeight:"600" }}>Upload Photo</span>
                    <span style={{ fontSize:"11px", color: T.dim }}>Click to browse</span>
                  </div>
                )}
                <div style={{ position:"absolute", inset:0, background:"rgba(154,52,18,0.75)", display:"flex", alignItems:"center", justifyContent:"center", opacity:0, transition:"opacity 0.2s" }}>
                  <span style={{ color:"#fff", fontWeight:"600", fontSize:"14px" }}>Change Photo</span>
                </div>
              </label>
              <input id="imageInput" type="file" accept="image/*" onChange={handleImageUpload} style={{ display:"none" }} />
              {imagePreview && (
                <button type="button" onClick={() => { setImagePreview(null); setForm(p => ({ ...p, image:"" })); }}
                  style={{ background:"transparent", border:`2px solid ${T.borderSoft}`, color: T.muted, padding:"6px 14px", borderRadius:"8px", fontSize:"12px", cursor:"pointer" }}>
                  Remove Photo
                </button>
              )}
            </div>

            {/* Fields */}
            <div style={{ flex:1, display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px", minWidth:"400px" }}>
              {[
                { name:"name", label:"Full Name", placeholder:"e.g. John Smith", required:true },
                { name:"designation", label:"Designation", placeholder:"e.g. Manager", required:true },
                { name:"email", label:"Email", placeholder:"email@company.com", type:"email" },
                { name:"phone", label:"Phone", placeholder:"+92 300 0000000" },
                { name:"experience", label:"Experience", placeholder:"e.g. 5 years" },
                { name:"linkedin", label:"LinkedIn", placeholder:"linkedin.com/in/username" },
              ].map(f => (
                <div key={f.name} style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
                  <label style={{ fontSize:"11px", color: T.muted, fontWeight:"700", letterSpacing:"0.5px", textTransform:"uppercase" }}>
                    {f.label} {f.required && <span style={{ color: T.orange }}>*</span>}
                  </label>
                  <input className="t-input" name={f.name} type={f.type||"text"} placeholder={f.placeholder}
                    onChange={handleChange} value={form[f.name]||""} required={!!f.required} style={inputStyle} />
                </div>
              ))}

              <div style={{ gridColumn:"1 / -1", display:"flex", flexDirection:"column", gap:"6px" }}>
                <label style={{ fontSize:"11px", color: T.muted, fontWeight:"700", letterSpacing:"0.5px", textTransform:"uppercase" }}>Description</label>
                <textarea className="t-input" name="description" placeholder="Brief bio or role description..." onChange={handleChange} value={form.description} rows={3}
                  style={{ ...inputStyle, resize:"vertical", minHeight:"80px" }} />
              </div>

              <div style={{ gridColumn:"1 / -1", display:"flex", flexDirection:"column", gap:"6px" }}>
                <label style={{ fontSize:"11px", color: T.muted, fontWeight:"700", letterSpacing:"0.5px", textTransform:"uppercase" }}>
                  Skills <span style={{ color: T.dim, textTransform:"none", fontWeight:"400" }}>(comma separated)</span>
                </label>
                <input className="t-input" name="skills" placeholder="Hill cutting, Driving, Operating machines.." onChange={handleChange} value={form.skills} style={inputStyle} />
                {form.skills && (
                  <div style={{ display:"flex", flexWrap:"wrap", gap:"6px", marginTop:"4px" }}>
                    {form.skills.split(",").map((s,i) => s.trim() && (
                      <span key={i} style={{ background: T.orangePill, border:`1px solid ${T.orange}`, color: T.orange, fontSize:"11px", padding:"3px 10px", borderRadius:"20px", fontWeight:"600" }}>{s.trim()}</span>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ gridColumn:"1 / -1", display:"flex", gap:"12px", justifyContent:"flex-end", marginTop:"8px", paddingTop:"16px", borderTop:`2px solid ${T.borderSoft}` }}>
                {form._id && (
                  <button type="button" onClick={resetForm} className="t-cancel"
                    style={{ background:"transparent", border:`2px solid ${T.borderSoft}`, color: T.muted, padding:"12px 20px", borderRadius:"10px", fontSize:"14px", fontWeight:"600", cursor:"pointer", transition:"all 0.2s" }}>
                    Cancel Edit
                  </button>
                )}
                <button type="submit" disabled={submitting} className="t-submit"
                  style={{ background: T.orange, border:"none", color:"#fff", padding:"12px 28px", borderRadius:"10px", fontSize:"14px", fontWeight:"700", cursor:"pointer", transition:"all 0.2s", opacity: submitting ? 0.7 : 1, boxShadow:"0 4px 15px rgba(154,52,18,0.25)" }}>
                  {submitting ? "Saving..." : form._id ? "Update Member" : "Add Member"}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* MANAGE TAB */}
        {activeTab === "manage" && (
          <div>
            {teams.length === 0 ? (
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"80px 20px", gap:"12px" }}>
                <span style={{ fontSize:"48px", color: T.dim }}>◈</span>
                <p style={{ fontSize:"20px", fontWeight:"700", color: T.muted, margin:0 }}>No team members yet</p>
                <p style={{ fontSize:"14px", color: T.dim, margin:"0 0 16px" }}>Add your first team member to get started</p>
                <button onClick={() => setActiveTab("add")} className="t-submit"
                  style={{ background: T.orange, border:"none", color:"#fff", padding:"12px 28px", borderRadius:"10px", fontSize:"14px", fontWeight:"700", cursor:"pointer", transition:"all 0.2s", boxShadow:"0 4px 15px rgba(154,52,18,0.25)" }}>
                  + Add First Member
                </button>
              </div>
            ) : (
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))", gap:"20px" }}>
                {teams.map(m => (
                  <div key={m._id} className="t-card"
                    style={{ background: T.card, border:`2px solid ${T.border}`, borderRadius:"16px", overflow:"hidden", transition:"all 0.25s", boxShadow:"0 4px 16px rgba(0,0,0,0.08)" }}>
                    <div style={{ position:"relative", height:"180px", background:"#f5e8de", overflow:"hidden" }}>
                      {m.image ? (
                        <img src={m.image} alt={m.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                      ) : (
                        <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"48px", fontWeight:"900", color: T.orange, background: T.orangePill }}>
                          {m.name?.charAt(0)?.toUpperCase()}
                        </div>
                      )}
                      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"60px", background:"linear-gradient(to top, #fff, transparent)" }} />
                    </div>

                    <div style={{ padding:"16px 18px 10px" }}>
                      <h3 style={{ fontSize:"16px", fontWeight:"700", color: T.text, margin:"0 0 4px" }}>{m.name}</h3>
                      <p style={{ fontSize:"13px", color: T.orange, margin:"0 0 6px", fontWeight:"600" }}>{m.designation}</p>
                      {m.experience && <p style={{ fontSize:"12px", color: T.dim, margin:"0 0 8px" }}>⏱ {m.experience}</p>}
                      {m.skills?.length > 0 && (
                        <div style={{ display:"flex", flexWrap:"wrap", gap:"5px" }}>
                          {m.skills.slice(0,3).map((s,i) => (
                            <span key={i} style={{ background:"#f5f0ee", border:`1px solid ${T.borderSoft}`, color: T.muted, fontSize:"10px", padding:"2px 8px", borderRadius:"20px" }}>{s}</span>
                          ))}
                          {m.skills.length > 3 && <span style={{ background: T.orangePill, color: T.orange, fontSize:"10px", padding:"2px 8px", borderRadius:"20px", border:`1px solid ${T.orange}` }}>+{m.skills.length - 3}</span>}
                        </div>
                      )}
                    </div>

                    <div style={{ display:"flex", gap:"8px", padding:"10px 18px 14px", borderTop:`2px solid ${T.borderSoft}` }}>
                      <button onClick={() => handleEdit(m)} className="t-act"
                        style={{ flex:1, background:"transparent", border:`2px solid ${T.borderSoft}`, color: T.muted, padding:"8px", borderRadius:"8px", fontSize:"13px", cursor:"pointer", fontWeight:"600", transition:"all 0.2s" }}>
                        ✎ Edit
                      </button>
                      <button onClick={() => setDeletingMember(m)}
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
      {deletingMember && (
        <div style={{ position:"fixed", inset:0, background:"rgba(26,16,8,0.60)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000, backdropFilter:"blur(4px)" }}
          onClick={e => e.target === e.currentTarget && setDeletingMember(null)}>
          <div style={{ background:"#fff", border:`2px solid ${T.border}`, borderRadius:"16px", padding:"28px", width:"420px", maxWidth:"90vw", boxShadow:"0 20px 60px rgba(0,0,0,0.20)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"12px" }}>
              <span style={{ fontSize:"20px", color: T.orange }}>⚠</span>
              <h2 style={{ fontSize:"18px", fontWeight:"700", margin:0, color: T.text }}>Confirm Deletion</h2>
            </div>
            <p style={{ fontSize:"14px", color: T.muted, marginBottom:"16px", lineHeight:"1.5" }}>
              This action cannot be undone. Type <strong style={{ color: T.orange }}>{deletingMember.name}</strong> to confirm.
            </p>
            <input className="t-input" placeholder={`Type "${deletingMember.name}"`} onChange={e => setDeleteConfirm(e.target.value)} value={deleteConfirm}
              style={{ ...inputStyle, marginBottom:"8px" }} />
            {error && <p style={{ color:"#dc2626", fontSize:"13px", marginBottom:"12px" }}>{error}</p>}
            <div style={{ display:"flex", gap:"10px", justifyContent:"flex-end" }}>
              <button onClick={() => { setDeletingMember(null); setDeleteConfirm(""); setError(""); }} className="t-cancel"
                style={{ background:"transparent", border:`2px solid ${T.borderSoft}`, color: T.muted, padding:"10px 20px", borderRadius:"10px", fontSize:"14px", fontWeight:"600", cursor:"pointer", transition:"all 0.2s" }}>
                Cancel
              </button>
              <button onClick={confirmDelete}
                style={{ background:"rgba(220,38,38,0.08)", border:"2px solid rgba(220,38,38,0.35)", color:"#dc2626", padding:"10px 20px", borderRadius:"10px", fontSize:"14px", fontWeight:"600", cursor:"pointer", transition:"all 0.2s" }}>
                Delete Member
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}