// //components/adminside/projectmanagemnet.js
// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { FaArrowLeft } from "react-icons/fa";

// // ─── THEME TOKENS (Team Management jaisi light theme) ─────────────────────────
// const T = {
//   bg:        "#ffffff",
//   sidebar:   "#fdf8f5",
//   card:      "#ffffff",
//   input:     "#fdf6f2",
//   border:    "#1a1a1a",
//   borderSoft:"rgba(26,26,26,0.15)",
//   orange:    "#9a3412",
//   orangeL:   "#c0481a",
//   orangePill:"rgba(154,52,18,0.10)",
//   text:      "#1a1008",
//   muted:     "#6b4c3b",
//   dim:       "#a07060",
// };

// export default function ManageProjects() {
//   const router = useRouter();

//   const [session, setSession] = useState(null);
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("add");

//   const [form, setForm] = useState({ title: "", location: "", description: "", image: "", _id: null });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [deleteConfirm, setDeleteConfirm] = useState("");
//   const [deletingProject, setDeletingProject] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);

//   async function fetchProjects() {
//     try {
//       const res = await fetch("/api/projects");
//       const data = await res.json();
//       setProjects(data.projects || []);
//     } catch { setError("Failed to load projects."); }
//     finally { setLoading(false); }
//   }

//   useEffect(() => {
//     async function check() {
//       const res = await fetch("/api/auth/session");
//       const data = await res.json();
//       if (!data.authenticated) router.push("/adminsidepages/login");
//       else { setSession(data.user); fetchProjects(); }
//     }
//     check();
//   }, [router]);

//   function handleChange(e) {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//   }

//   function handleImageUpload(e) {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setForm(prev => ({ ...prev, image: reader.result }));
//       setImagePreview(reader.result);
//     };
//     reader.readAsDataURL(file);
//   }

//   function resetForm() {
//     setForm({ title: "", location: "", description: "", image: "", _id: null });
//     setImagePreview(null); setError(""); setSuccess("");
//   }

//   function handleEdit(proj) {
//     setForm({ title: proj.title, location: proj.location, description: proj.description, image: proj.image, _id: proj._id });
//     setImagePreview(proj.image || null);
//     setError(""); setSuccess("");
//     setActiveTab("add");
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }

//   async function handleSubmit(e) {
//     e.preventDefault(); setError(""); setSuccess(""); setSubmitting(true);
//     const method = form._id ? "PUT" : "POST";
//     const endpoint = form._id ? `/api/projects/${form._id}` : "/api/projects";
//     try {
//       const res = await fetch(endpoint, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
//       const data = await res.json();
//       if (!data.success) { setError(data.message || "Something went wrong."); return; }
//       setSuccess(form._id ? "Project updated successfully!" : "Project added successfully!");
//       resetForm(); fetchProjects();
//     } catch { setError("Network error. Please try again."); }
//     finally { setSubmitting(false); }
//   }

//   async function confirmDelete() {
//     if (!deletingProject) return;
//     if (deleteConfirm !== deletingProject.title) { setError("Project name does not match."); return; }
//     try {
//       const res = await fetch(`/api/projects/${deletingProject._id}`, { method: "DELETE" });
//       const data = await res.json();
//       if (data.success) { setDeletingProject(null); setDeleteConfirm(""); fetchProjects(); }
//     } catch { setError("Delete failed."); }
//   }

//   const inputStyle = {
//     background: T.input, border: `2px solid ${T.borderSoft}`, borderRadius: "10px",
//     color: T.text, padding: "12px 14px", fontSize: "14px", outline: "none",
//     transition: "border-color 0.2s", width: "100%", boxSizing: "border-box", fontFamily: "inherit",
//   };
//   const labelStyle = { fontSize: "11px", color: T.muted, fontWeight: "700", letterSpacing: "0.5px", textTransform: "uppercase" };

//   if (loading) return (
//     <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:"100vh", background: T.bg, gap:"16px" }}>
//       <div style={{ width:"40px", height:"40px", border:`3px solid ${T.borderSoft}`, borderTop:`3px solid ${T.orange}`, borderRadius:"50%", animation:"spin 0.8s linear infinite" }} />
//       <p style={{ color: T.muted, fontSize:"14px", letterSpacing:"2px" }}>Loading Projects...</p>
//       <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
//     </div>
//   );

//   return (
//     <div style={{ display:"flex", minHeight:"100vh", background: T.bg, fontFamily:"'Segoe UI', system-ui, sans-serif", color: T.text, position:"relative" }}>
//       <style>{`
//         * { box-sizing: border-box; }
//         ::placeholder { color: ${T.dim} !important; }
//         .p-input:focus { border-color: ${T.orange} !important; box-shadow: 0 0 0 3px rgba(154,52,18,0.12); outline: none; }
//         .p-input:hover { border-color: ${T.orangeL} !important; }
//         .p-card:hover { border-color: ${T.orange} !important; transform: translateY(-2px); box-shadow: 0 8px 30px rgba(154,52,18,0.14); }
//         .p-card:hover .p-img { transform: scale(1.05); }
//         .p-act:hover { background: rgba(154,52,18,0.08) !important; border-color: ${T.orange} !important; color: ${T.orange} !important; }
//         .p-act-del:hover { background: rgba(220,38,38,0.06) !important; border-color: rgba(220,38,38,0.5) !important; }
//         .p-nav:hover { background: rgba(154,52,18,0.07) !important; color: ${T.orange} !important; }
//         label[for="projImageInput"]:hover { border-color: ${T.orange} !important; }
//         .p-back:hover { background: ${T.orange} !important; color: #fff !important; border-color: ${T.orange} !important; }
//         .p-submit:hover { background: ${T.orangeL} !important; transform: translateY(-1px); box-shadow: 0 8px 20px rgba(154,52,18,0.30) !important; }
//         .p-cancel:hover { border-color: ${T.orange} !important; color: ${T.orange} !important; }
//       `}</style>

//       {/* Cornered orange gradients — Team jaisi */}
//       <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0 }}>
//         <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 55% 50% at 0% 0%, rgba(154,52,18,0.18), transparent 55%)" }} />
//         <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 55% 50% at 100% 0%, rgba(154,52,18,0.18), transparent 55%)" }} />
//         <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 55% 50% at 0% 100%, rgba(154,52,18,0.18), transparent 55%)" }} />
//         <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 55% 50% at 100% 100%, rgba(154,52,18,0.18), transparent 55%)" }} />
//         <div style={{ position:"absolute", inset:0, opacity:0.04, backgroundImage:"linear-gradient(to right,#000 1px,transparent 1px),linear-gradient(to bottom,#000 1px,transparent 1px)", backgroundSize:"80px 80px" }} />
//       </div>

//       {/* SIDEBAR */}
//       <aside style={{ width:"240px", minHeight:"100vh", background:"rgba(253,248,245,0.92)", backdropFilter:"blur(12px)", borderRight:`2px solid ${T.border}`, display:"flex", flexDirection:"column", position:"sticky", top:0, height:"100vh", zIndex:10 }}>
//         <div style={{ padding:"28px 24px 20px" }}>
//           <div style={{ fontSize:"20px", fontWeight:"900", color: T.orange, letterSpacing:"4px" }}>PROJECT</div>
//           <div style={{ fontSize:"10px", color: T.dim, letterSpacing:"3px", fontWeight:"600", marginTop:"2px" }}>MANAGER</div>
//         </div>
//         <div style={{ height:"2px", background:`linear-gradient(to right, ${T.orange}, transparent)`, marginBottom:"16px" }} />

//         <nav style={{ display:"flex", flexDirection:"column", gap:"4px", padding:"0 12px", flex:1 }}>
//           {[
//             { id:"add", icon:"＋", label: form._id ? "Edit Project" : "Add Project" },
//             { id:"manage", icon:"◈", label:"Manage Projects", badge: projects.length },
//           ].map(item => (
//             <button key={item.id} className="p-nav" onClick={() => { if(item.id==="add"){ resetForm(); } else { setError(""); setSuccess(""); } setActiveTab(item.id); }}
//               style={{ display:"flex", alignItems:"center", gap:"10px", padding:"12px 14px", background: activeTab===item.id ? T.orangePill : "transparent", border: activeTab===item.id ? `2px solid ${T.orange}` : "2px solid transparent", borderRadius:"10px", color: activeTab===item.id ? T.orange : T.muted, fontSize:"14px", fontWeight:"600", cursor:"pointer", textAlign:"left", width:"100%", transition:"all 0.2s" }}>
//               <span style={{ fontSize:"15px", minWidth:"20px", textAlign:"center" }}>{item.icon}</span>
//               <span style={{ flex:1 }}>{item.label}</span>
//               {item.badge !== undefined && <span style={{ background: T.orange, color:"#fff", fontSize:"11px", fontWeight:"700", padding:"2px 7px", borderRadius:"20px" }}>{item.badge}</span>}
//               {activeTab===item.id && <span style={{ width:"6px", height:"6px", borderRadius:"50%", background: T.orange }} />}
//             </button>
//           ))}
//         </nav>

//         {/* Back to Dashboard — Team jaisi prominent style */}
//         <div style={{ padding:"20px 16px", borderTop:`2px solid ${T.border}` }}>
//           <button onClick={() => router.push("/adminsidepages/dashboardadmin")} className="p-back"
//             style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"8px", background: T.orangePill, border:`2px solid ${T.orange}`, color: T.orange, fontSize:"13px", fontWeight:"700", cursor:"pointer", padding:"12px 16px", borderRadius:"10px", transition:"all 0.2s", width:"100%" }}>
//             <FaArrowLeft style={{ fontSize:"11px" }} /> Back to Dashboard
//           </button>
//           <div style={{ display:"flex", alignItems:"center", gap:"8px", marginTop:"12px", paddingLeft:"4px" }}>
//             <div style={{ width:"8px", height:"8px", borderRadius:"50%", background:"#22c55e", boxShadow:"0 0 6px #22c55e" }} />
//             <span style={{ fontSize:"12px", color: T.muted }}>Admin Active</span>
//           </div>
//         </div>
//       </aside>

//       {/* MAIN */}
//       <main style={{ flex:1, padding:"32px 40px", maxWidth:"calc(100vw - 240px)", overflowX:"hidden", position:"relative", zIndex:1 }}>

//         {/* Topbar */}
//         <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:"28px" }}>
//           <div>
//             <h1 style={{ fontSize:"32px", fontWeight:"900", color: T.text, margin:0, letterSpacing:"-0.5px" }}>
//               {activeTab==="add" ? (form._id ? "Edit Project" : "Add New Project") : "Manage Projects"}
//             </h1>
//             <p style={{ fontSize:"14px", color: T.muted, margin:"4px 0 0" }}>
//               {activeTab==="add" ? (form._id ? "Update the project details below" : "Fill in the details to publish a new project") : `${projects.length} project${projects.length !== 1 ? "s" : ""} in database`}
//             </p>
//           </div>
//           <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
//             <div style={{ width:"60px", height:"2px", background:`linear-gradient(to left, ${T.orange}, transparent)` }} />
//             <div style={{ width:"8px", height:"8px", borderRadius:"50%", background: T.orange, boxShadow:`0 0 10px rgba(154,52,18,0.5)` }} />
//           </div>
//         </div>

//         {/* Alerts */}
//         {error && (
//           <div style={{ background:"rgba(255,68,68,0.07)", border:"2px solid rgba(255,68,68,0.30)", color:"#c0392b", padding:"12px 16px", borderRadius:"12px", marginBottom:"20px", fontSize:"14px", display:"flex", alignItems:"center", gap:"8px" }}>
//             <span style={{ fontWeight:"700" }}>✕</span> {error}
//           </div>
//         )}
//         {success && (
//           <div style={{ background:"rgba(34,197,94,0.07)", border:"2px solid rgba(34,197,94,0.30)", color:"#166534", padding:"12px 16px", borderRadius:"12px", marginBottom:"20px", fontSize:"14px", display:"flex", alignItems:"center", gap:"8px" }}>
//             <span style={{ fontWeight:"700" }}>✓</span> {success}
//           </div>
//         )}

//         {/* FORM */}
//         {activeTab === "add" && (
//           <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"20px", maxWidth:"700px" }}>
//             {/* Title + Location */}
//             <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px" }}>
//               {[
//                 { name:"title", label:"Project Title", placeholder:"e.g. Muscat Demolition Site", required:true },
//                 { name:"location", label:"Location", placeholder:"e.g. Seeb, Muscat", required:true },
//               ].map(f => (
//                 <div key={f.name} style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
//                   <label style={labelStyle}>{f.label} <span style={{ color: T.orange }}>*</span></label>
//                   <input className="p-input" name={f.name} value={form[f.name]} onChange={handleChange} placeholder={f.placeholder} required style={inputStyle} />
//                 </div>
//               ))}
//             </div>

//             {/* Image Upload */}
//             <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
//               <label style={labelStyle}>Project Image {!form._id && <span style={{ color: T.orange }}>*</span>}</label>
//               <label htmlFor="projImageInput" style={{ display:"flex", alignItems:"center", justifyContent:"center", border:`2px dashed ${T.orange}`, borderRadius:"16px", background: T.input, cursor:"pointer", position:"relative", overflow:"hidden", height:"180px", transition:"border-color 0.2s" }}>
//                 {imagePreview ? (
//                   <>
//                     <img src={imagePreview} alt="preview" className="p-img" style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.5s" }} />
//                     <div style={{ position:"absolute", inset:0, background:"rgba(154,52,18,0.75)", display:"flex", alignItems:"center", justifyContent:"center", opacity:0, transition:"opacity 0.2s" }}>
//                       <span style={{ color:"#fff", fontWeight:"600", fontSize:"14px" }}>⬆ Change Image</span>
//                     </div>
//                   </>
//                 ) : (
//                   <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"8px" }}>
//                     <span style={{ fontSize:"28px", color: T.orange }}>⬆</span>
//                     <span style={{ fontSize:"14px", color: T.muted, fontWeight:"600" }}>Click to upload project image</span>
//                     <span style={{ fontSize:"11px", color: T.dim }}>PNG, JPG — max 5MB</span>
//                   </div>
//                 )}
//               </label>
//               <input id="projImageInput" type="file" accept="image/*" onChange={handleImageUpload} style={{ display:"none" }} required={!form._id} />
//               {imagePreview && (
//                 <button type="button" onClick={() => { setImagePreview(null); setForm(p => ({ ...p, image:"" })); }}
//                   style={{ alignSelf:"flex-start", background:"transparent", border:`2px solid ${T.borderSoft}`, color: T.muted, padding:"6px 14px", borderRadius:"8px", fontSize:"12px", cursor:"pointer" }}>
//                   Remove Image
//                 </button>
//               )}
//             </div>

//             {/* Description */}
//             <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
//               <label style={labelStyle}>Description <span style={{ color: T.orange }}>*</span></label>
//               <textarea className="p-input" name="description" value={form.description} onChange={handleChange} placeholder="Describe the project: scope, location details, type of work done..." required rows={4}
//                 style={{ ...inputStyle, resize:"vertical", minHeight:"100px" }} />
//             </div>

//             {/* Footer */}
//             <div style={{ display:"flex", gap:"12px", justifyContent:"flex-end", marginTop:"8px", paddingTop:"16px", borderTop:`2px solid ${T.borderSoft}` }}>
//               {form._id ? (
//                 <button type="button" onClick={resetForm} className="p-cancel"
//                   style={{ background:"transparent", border:`2px solid ${T.borderSoft}`, color: T.muted, padding:"12px 20px", borderRadius:"10px", fontSize:"14px", fontWeight:"600", cursor:"pointer", transition:"all 0.2s" }}>
//                   Cancel Edit
//                 </button>
//               ) : (
//                 <span style={{ fontSize:"12px", color: T.dim, alignSelf:"center" }}>* All fields required</span>
//               )}
//               <button type="submit" disabled={submitting} className="p-submit"
//                 style={{ background: T.orange, border:"none", color:"#fff", padding:"12px 28px", borderRadius:"10px", fontSize:"14px", fontWeight:"700", cursor:"pointer", transition:"all 0.2s", opacity: submitting ? 0.7 : 1, boxShadow:"0 4px 15px rgba(154,52,18,0.25)" }}>
//                 {submitting ? "Saving..." : form._id ? "Update Project" : "Add Project"}
//               </button>
//             </div>
//           </form>
//         )}

//         {/* MANAGE TAB */}
//         {activeTab === "manage" && (
//           <div>
//             {projects.length === 0 ? (
//               <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"80px 20px", gap:"12px" }}>
//                 <span style={{ fontSize:"48px", color: T.dim }}>◈</span>
//                 <p style={{ fontSize:"20px", fontWeight:"700", color: T.muted, margin:0 }}>No projects yet</p>
//                 <p style={{ fontSize:"14px", color: T.dim, margin:"0 0 16px" }}>Add your first project to get started</p>
//                 <button onClick={() => setActiveTab("add")} className="p-submit"
//                   style={{ background: T.orange, border:"none", color:"#fff", padding:"12px 28px", borderRadius:"10px", fontSize:"14px", fontWeight:"700", cursor:"pointer", transition:"all 0.2s", boxShadow:"0 4px 15px rgba(154,52,18,0.25)" }}>
//                   + Add First Project
//                 </button>
//               </div>
//             ) : (
//               <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))", gap:"20px" }}>
//                 {projects.map(proj => (
//                   <div key={proj._id} className="p-card"
//                     style={{ background: T.card, border:`2px solid ${T.border}`, borderRadius:"16px", overflow:"hidden", transition:"all 0.25s", boxShadow:"0 4px 16px rgba(0,0,0,0.08)" }}>
//                     <div style={{ position:"relative", height:"190px", background:"#f5e8de", overflow:"hidden" }}>
//                       {proj.image && proj.image.startsWith("http") ? (
//                         <img src={proj.image} alt={proj.title} className="p-img" style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.5s" }} />
//                       ) : (
//                         <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"48px", fontWeight:"900", color: T.orange, background: T.orangePill }}>
//                           {proj.title?.charAt(0)?.toUpperCase()}
//                         </div>
//                       )}
//                       <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"80px", background:"linear-gradient(to top, #fff, transparent)" }} />
//                       <div style={{ position:"absolute", bottom:"12px", left:"12px", background:"rgba(255,255,255,0.85)", backdropFilter:"blur(8px)", border:`1px solid ${T.borderSoft}`, borderRadius:"20px", padding:"4px 10px", fontSize:"11px", color: T.muted, display:"flex", alignItems:"center", gap:"4px" }}>
//                         <span style={{ fontSize:"10px" }}>📍</span> {proj.location}
//                       </div>
//                     </div>

//                     <div style={{ padding:"16px 18px 10px" }}>
//                       <h3 style={{ fontSize:"15px", fontWeight:"700", color: T.text, margin:"0 0 6px" }}>{proj.title}</h3>
//                       <p style={{ fontSize:"12px", color: T.dim, margin:0, lineHeight:"1.6", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{proj.description}</p>
//                     </div>

//                     <div style={{ display:"flex", gap:"8px", padding:"10px 18px 14px", borderTop:`2px solid ${T.borderSoft}` }}>
//                       <button onClick={() => handleEdit(proj)} className="p-act"
//                         style={{ flex:1, background:"transparent", border:`2px solid ${T.borderSoft}`, color: T.muted, padding:"8px", borderRadius:"8px", fontSize:"13px", cursor:"pointer", fontWeight:"600", transition:"all 0.2s" }}>
//                         ✎ Edit
//                       </button>
//                       <button onClick={() => { setDeletingProject(proj); setDeleteConfirm(""); setError(""); }} className="p-act-del"
//                         style={{ flex:1, background:"transparent", border:"2px solid rgba(220,38,38,0.25)", color:"#dc2626", padding:"8px", borderRadius:"8px", fontSize:"13px", cursor:"pointer", fontWeight:"600", transition:"all 0.2s" }}>
//                         ✕ Delete
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}
//       </main>

//       {/* DELETE MODAL */}
//       {deletingProject && (
//         <div style={{ position:"fixed", inset:0, background:"rgba(26,16,8,0.60)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000, backdropFilter:"blur(4px)" }}
//           onClick={e => e.target === e.currentTarget && setDeletingProject(null)}>
//           <div style={{ background:"#fff", border:`2px solid ${T.border}`, borderRadius:"16px", padding:"28px", width:"420px", maxWidth:"90vw", boxShadow:"0 20px 60px rgba(0,0,0,0.20)" }}>
//             <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"12px" }}>
//               <span style={{ fontSize:"20px", color: T.orange }}>⚠</span>
//               <h2 style={{ fontSize:"18px", fontWeight:"700", margin:0, color: T.text }}>Delete Project?</h2>
//             </div>
//             <p style={{ fontSize:"14px", color: T.muted, marginBottom:"16px", lineHeight:"1.5" }}>
//               This cannot be undone. Type <strong style={{ color: T.orange }}>{deletingProject.title}</strong> to confirm.
//             </p>
//             <div style={{ background: T.input, border:`2px solid ${T.borderSoft}`, borderRadius:"8px", padding:"10px 14px", fontSize:"13px", color: T.orange, fontFamily:"monospace", marginBottom:"12px", letterSpacing:"0.3px" }}>
//               {deletingProject.title}
//             </div>
//             <input className="p-input" type="text" value={deleteConfirm} onChange={e => { setDeleteConfirm(e.target.value); setError(""); }} placeholder="Type project name here..."
//               style={{ ...inputStyle, marginBottom:"8px" }} />
//             {error && <p style={{ color:"#dc2626", fontSize:"13px", marginBottom:"12px" }}>✕ {error}</p>}
//             <div style={{ display:"flex", gap:"10px", justifyContent:"flex-end" }}>
//               <button onClick={() => { setDeletingProject(null); setDeleteConfirm(""); setError(""); }} className="p-cancel"
//                 style={{ background:"transparent", border:`2px solid ${T.borderSoft}`, color: T.muted, padding:"10px 20px", borderRadius:"10px", fontSize:"14px", fontWeight:"600", cursor:"pointer", transition:"all 0.2s" }}>
//                 Cancel
//               </button>
//               <button onClick={confirmDelete} disabled={deleteConfirm !== deletingProject.title}
//                 style={{ background:"rgba(220,38,38,0.08)", border:"2px solid rgba(220,38,38,0.35)", color:"#dc2626", padding:"10px 20px", borderRadius:"10px", fontSize:"14px", fontWeight:"600", cursor: deleteConfirm !== deletingProject.title ? "not-allowed" : "pointer", opacity: deleteConfirm !== deletingProject.title ? 0.35 : 1, transition:"all 0.2s" }}>
//                 Delete Project
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

export default function ManageProjects() {
  const router = useRouter();

  const [session, setSession] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("add");

  const [form, setForm] = useState({
    title: "",
    location: "",
    client: "",
    contractor: "",
    description: "",
    image: "",
    showOnLanding: true,
    _id: null,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [deletingProject, setDeletingProject] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  async function fetchProjects() {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data.projects || []);
    } catch {
      setError("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function check() {
      const res = await fetch("/api/auth/session");
      const data = await res.json();

      if (!data.authenticated) {
        router.push("/adminsidepages/login");
      } else {
        setSession(data.user);
        fetchProjects();
      }
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
      setForm((prev) => ({
        ...prev,
        image: reader.result,
      }));

      setImagePreview(reader.result);
    };

    reader.readAsDataURL(file);
  }

  function resetForm() {
    setForm({
      title: "",
      location: "",
      client: "",
      contractor: "",
      description: "",
      image: "",
      showOnLanding: true,
      _id: null,
    });

    setImagePreview(null);
    setError("");
    setSuccess("");
  }

  function handleEdit(proj) {
    setForm({
      title: proj.title || "",
      location: proj.location || "",
      client: proj.client || "",
      contractor: proj.contractor || "",
      description: proj.description || "",
      image: proj.image || "",
      showOnLanding: proj.showOnLanding !== false,
      _id: proj._id,
    });

    setImagePreview(proj.image || null);
    setError("");
    setSuccess("");
    setActiveTab("add");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");
    setSubmitting(true);

    const method = form._id ? "PUT" : "POST";
    const endpoint = form._id ? `/api/projects/${form._id}` : "/api/projects";

    try {
      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Something went wrong.");
        return;
      }

      setSuccess(
        form._id
          ? "Project updated successfully!"
          : "Project added successfully!",
      );

      resetForm();
      fetchProjects();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function confirmDelete() {
    if (!deletingProject) return;

    if (deleteConfirm !== deletingProject.title) {
      setError("Project name does not match.");
      return;
    }

    try {
      const res = await fetch(`/api/projects/${deletingProject._id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        setDeletingProject(null);
        setDeleteConfirm("");
        fetchProjects();
      }
    } catch {
      setError("Delete failed.");
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white">
        <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-[rgba(26,26,26,0.15)] border-t-[#9a3412]" />

        <p className="text-sm tracking-[2px] text-[#6b4c3b]">
          Loading Projects...
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen bg-white font-['Segoe_UI',system-ui,sans-serif] text-[#1a1008]">
      {/* CORNERED ORANGE GRADIENTS */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_0%_0%,rgba(154,52,18,0.18),transparent_55%)]" />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_100%_0%,rgba(154,52,18,0.18),transparent_55%)]" />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_0%_100%,rgba(154,52,18,0.18),transparent_55%)]" />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_100%_100%,rgba(154,52,18,0.18),transparent_55%)]" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:80px_80px] opacity-[0.04]" />
      </div>

      {/* SIDEBAR */}
      <aside className="sticky top-0 z-10 flex h-screen min-h-screen w-[240px] shrink-0 flex-col border-r-2 border-[#1a1a1a] bg-[rgba(253,248,245,0.92)] backdrop-blur-xl">
        <div className="px-6 pb-5 pt-7">
          <div className="text-xl font-black tracking-[4px] text-[#9a3412]">
            PROJECT
          </div>

          <div className="mt-0.5 text-[10px] font-semibold tracking-[3px] text-[#a07060]">
            MANAGER
          </div>
        </div>

        <div className="mb-4 h-0.5 bg-gradient-to-r from-[#9a3412] to-transparent" />

        <nav className="flex flex-1 flex-col gap-1 px-3">
          {[
            {
              id: "add",
              icon: "＋",
              label: form._id ? "Edit Project" : "Add Project",
            },
            {
              id: "manage",
              icon: "◈",
              label: "Manage Projects",
              badge: projects.length,
            },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === "add") {
                  resetForm();
                } else {
                  setError("");
                  setSuccess("");
                }

                setActiveTab(item.id);
              }}
              className={`group flex w-full items-center gap-2.5 rounded-[10px] border-2 px-3.5 py-3 text-left text-sm font-semibold transition-all duration-200 hover:border-[#9a3412] hover:bg-[rgba(154,52,18,0.07)] hover:text-[#9a3412] ${
                activeTab === item.id
                  ? "border-[#9a3412] bg-[rgba(154,52,18,0.10)] text-[#9a3412]"
                  : "border-transparent bg-transparent text-[#6b4c3b]"
              }`}
            >
              <span className="min-w-5 text-center text-[15px]">
                {item.icon}
              </span>

              <span className="flex-1">{item.label}</span>

              {item.badge !== undefined && (
                <span className="rounded-full bg-[#9a3412] px-2 py-0.5 text-[11px] font-bold text-white">
                  {item.badge}
                </span>
              )}

              {activeTab === item.id && (
                <span className="h-1.5 w-1.5 rounded-full bg-[#9a3412]" />
              )}
            </button>
          ))}
        </nav>

        {/* BACK TO DASHBOARD */}
        <div className="border-t-2 border-[#1a1a1a] px-4 py-5">
          <button
            onClick={() => router.push("/adminsidepages/dashboardadmin")}
            className="group flex w-full items-center justify-center gap-2 rounded-[10px] border-2 border-[#9a3412] bg-[rgba(154,52,18,0.10)] px-4 py-3 text-[13px] font-bold text-[#9a3412] transition-all duration-200 hover:border-[#9a3412] hover:bg-[#9a3412] hover:text-white"
          >
            <FaArrowLeft className="text-[11px]" />
            Back to Dashboard
          </button>

          <div className="mt-3 flex items-center gap-2 pl-1">
            <div className="h-2 w-2 rounded-full bg-[#22c55e] shadow-[0_0_6px_#22c55e]" />

            <span className="text-xs text-[#6b4c3b]">Admin Active</span>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="relative z-[1] min-w-0 flex-1 overflow-x-hidden px-10 py-8">
        {/* TOPBAR */}
        <div className="mb-7 flex items-start justify-between">
          <div>
            <h1 className="m-0 text-[32px] font-black tracking-[-0.5px] text-[#1a1008]">
              {activeTab === "add"
                ? form._id
                  ? "Edit Project"
                  : "Add New Project"
                : "Manage Projects"}
            </h1>

            <p className="mt-1 text-sm text-[#6b4c3b]">
              {activeTab === "add"
                ? form._id
                  ? "Update the project details below"
                  : "Fill in the details to publish a new project"
                : `${projects.length} project${
                    projects.length !== 1 ? "s" : ""
                  } in database`}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-0.5 w-[60px] bg-gradient-to-l from-[#9a3412] to-transparent" />

            <div className="h-2 w-2 rounded-full bg-[#9a3412] shadow-[0_0_10px_rgba(154,52,18,0.5)]" />
          </div>
        </div>

        {/* ALERTS */}
        {error && (
          <div className="mb-5 flex items-center gap-2 rounded-xl border-2 border-[rgba(255,68,68,0.30)] bg-[rgba(255,68,68,0.07)] px-4 py-3 text-sm text-[#c0392b]">
            <span className="font-bold">✕</span>
            {error}
          </div>
        )}

        {success && (
          <div className="mb-5 flex items-center gap-2 rounded-xl border-2 border-[rgba(34,197,94,0.30)] bg-[rgba(34,197,94,0.07)] px-4 py-3 text-sm text-[#166534]">
            <span className="font-bold">✓</span>
            {success}
          </div>
        )}

        {/* FORM */}
        {activeTab === "add" && (
          <form
            onSubmit={handleSubmit}
            className="flex max-w-[700px] flex-col gap-5"
          >
            {/* TITLE + LOCATION */}
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  name: "title",
                  label: "Project Title",
                  placeholder: "e.g. Muscat Demolition Site",
                  required: true,
                },
                {
                  name: "location",
                  label: "Location",
                  placeholder: "e.g. Seeb, Muscat",
                  required: true,
                },
              ].map((f) => (
                <div key={f.name} className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-[0.5px] text-[#6b4c3b]">
                    {f.label} <span className="text-[#9a3412]">*</span>
                  </label>

                  <input
                    className="w-full rounded-[10px] border-2 border-[rgba(26,26,26,0.15)] bg-[#fdf6f2] px-3.5 py-3 text-sm text-[#1a1008] outline-none transition-all duration-200 placeholder:text-[#a07060] hover:border-[#c0481a] focus:border-[#9a3412] focus:shadow-[0_0_0_3px_rgba(154,52,18,0.12)]"
                    name={f.name}
                    value={form[f.name]}
                    onChange={handleChange}
                    placeholder={f.placeholder}
                    required
                  />
                </div>
              ))}
            </div>

            {/* CLIENT + CONTRACTOR */}
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  name: "client",
                  label: "Client",
                  placeholder: "e.g. Ministry of Tanmia",
                  required: false,
                },
                {
                  name: "contractor",
                  label: "Contractor",
                  placeholder: "e.g. Larsen & Tabouro",
                  required: false,
                },
              ].map((f) => (
                <div key={f.name} className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-[0.5px] text-[#6b4c3b]">
                    {f.label}
                  </label>

                  <input
                    className="w-full rounded-[10px] border-2 border-[rgba(26,26,26,0.15)] bg-[#fdf6f2] px-3.5 py-3 text-sm text-[#1a1008] outline-none transition-all duration-200 placeholder:text-[#a07060] hover:border-[#c0481a] focus:border-[#9a3412] focus:shadow-[0_0_0_3px_rgba(154,52,18,0.12)]"
                    name={f.name}
                    value={form[f.name]}
                    onChange={handleChange}
                    placeholder={f.placeholder}
                  />
                </div>
              ))}
            </div>

            {/* IMAGE UPLOAD */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold uppercase tracking-[0.5px] text-[#6b4c3b]">
                Project Image{" "}
                {!form._id && <span className="text-[#9a3412]">*</span>}
              </label>

              <label
                htmlFor="projImageInput"
                className="group relative flex h-[180px] cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-[#9a3412] bg-[#fdf6f2] transition-colors duration-200 hover:border-[#9a3412]"
              >
                {imagePreview ? (
                  <>
                    <img
                      src={imagePreview}
                      alt="preview"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 flex items-center justify-center bg-[rgba(154,52,18,0.75)] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      <span className="text-sm font-semibold text-white">
                        ⬆ Change Image
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-[28px] text-[#9a3412]">⬆</span>

                    <span className="text-sm font-semibold text-[#6b4c3b]">
                      Click to upload project image
                    </span>

                    <span className="text-[11px] text-[#a07060]">
                      PNG, JPG — max 5MB
                    </span>
                  </div>
                )}
              </label>

              <input
                id="projImageInput"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                required={!form._id}
              />

              {imagePreview && (
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview(null);
                    setForm((p) => ({
                      ...p,
                      image: "",
                    }));
                  }}
                  className="self-start rounded-lg border-2 border-[rgba(26,26,26,0.15)] bg-transparent px-3.5 py-1.5 text-xs text-[#6b4c3b] transition-all duration-200 hover:border-[#9a3412] hover:text-[#9a3412]"
                >
                  Remove Image
                </button>
              )}
            </div>

            {/* DESCRIPTION */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold uppercase tracking-[0.5px] text-[#6b4c3b]">
                Description <span className="text-[#9a3412]">*</span>
              </label>

              <textarea
                className="w-full resize-y rounded-[10px] border-2 border-[rgba(26,26,26,0.15)] bg-[#fdf6f2] px-3.5 py-3 text-sm text-[#1a1008] outline-none transition-all duration-200 placeholder:text-[#a07060] hover:border-[#c0481a] focus:border-[#9a3412] focus:shadow-[0_0_0_3px_rgba(154,52,18,0.12)]"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the project: scope, location details, type of work done..."
                required
                rows={4}
              />
            </div>
            {/* Show on Landing */}
            <div className="flex items-center justify-between rounded-[10px] border-2 border-[rgba(26,26,26,0.15)] bg-[#fdf6f2] px-4 py-3.5">
              <div>
                <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.5px] text-[#6b4c3b]">
                  Show on Landing Page
                </div>

                <div className="text-xs text-[#a07060]">
                  Display this project in the Featured Projects section
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    showOnLanding: !prev.showOnLanding,
                  }))
                }
                className={`relative h-7 w-[52px] shrink-0 cursor-pointer rounded-full border-none p-[3px] transition-colors duration-200 ${
                  form.showOnLanding ? "bg-[#9a3412]" : "bg-[#d1d5db]"
                }`}
              >
                <span
                  className={`block h-[22px] w-[22px] rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,0.2)] transition-transform duration-200 ${
                    form.showOnLanding ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* FOOTER */}
            <div className="mt-2 flex justify-end gap-3 border-t-2 border-[rgba(26,26,26,0.15)] pt-4">
              {form._id ? (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-[10px] border-2 border-[rgba(26,26,26,0.15)] bg-transparent px-5 py-3 text-sm font-semibold text-[#6b4c3b] transition-all duration-200 hover:border-[#9a3412] hover:text-[#9a3412]"
                >
                  Cancel Edit
                </button>
              ) : (
                <span className="self-center text-xs text-[#a07060]">
                  * All fields required
                </span>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="rounded-[10px] border-0 bg-[#9a3412] px-7 py-3 text-sm font-bold text-white shadow-[0_4px_15px_rgba(154,52,18,0.25)] transition-all duration-200 hover:-translate-y-px hover:bg-[#c0481a] hover:shadow-[0_8px_20px_rgba(154,52,18,0.30)] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting
                  ? "Saving..."
                  : form._id
                    ? "Update Project"
                    : "Add Project"}
              </button>
            </div>
          </form>
        )}

        {/* MANAGE TAB */}
        {activeTab === "manage" && (
          <div>
            {projects.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 px-5 py-20">
                <span className="text-5xl text-[#a07060]">◈</span>

                <p className="m-0 text-xl font-bold text-[#6b4c3b]">
                  No projects yet
                </p>

                <p className="m-0 mb-4 text-sm text-[#a07060]">
                  Add your first project to get started
                </p>

                <button
                  onClick={() => setActiveTab("add")}
                  className="rounded-[10px] border-0 bg-[#9a3412] px-7 py-3 text-sm font-bold text-white shadow-[0_4px_15px_rgba(154,52,18,0.25)] transition-all duration-200 hover:-translate-y-px hover:bg-[#c0481a] hover:shadow-[0_8px_20px_rgba(154,52,18,0.30)]"
                >
                  + Add First Project
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5">
                {projects.map((proj) => (
                  <div
                    key={proj._id}
                    className="group overflow-hidden rounded-2xl border-2 border-[#1a1a1a] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#9a3412] hover:shadow-[0_8px_30px_rgba(154,52,18,0.14)]"
                  >
                    {/* PROJECT IMAGE */}
                    <div className="relative h-[190px] overflow-hidden bg-[#f5e8de]">
                      {proj.image && proj.image.startsWith("http") ? (
                        <img
                          src={proj.image}
                          alt={proj.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-[rgba(154,52,18,0.10)] text-5xl font-black text-[#9a3412]">
                          {proj.title?.charAt(0)?.toUpperCase()}
                        </div>
                      )}

                      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />

                      <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full border border-[rgba(26,26,26,0.15)] bg-[rgba(255,255,255,0.85)] px-2.5 py-1 text-[11px] text-[#6b4c3b] backdrop-blur-lg">
                        <span className="text-[10px]">📍</span>
                        {proj.location}
                      </div>
                    </div>

                    {/* PROJECT INFO */}
                    <div className="px-[18px] pb-2.5 pt-4">
                      <h3 className="mb-1.5 text-[15px] font-bold text-[#1a1008]">
                        {proj.title}
                      </h3>

                      <p className="m-0 line-clamp-2 overflow-hidden text-xs leading-[1.6] text-[#a07060]">
                        {proj.description}
                      </p>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex gap-2 border-t-2 border-[rgba(26,26,26,0.15)] px-[18px] pb-3.5 pt-2.5">
                      <button
                        onClick={() => handleEdit(proj)}
                        className="flex-1 rounded-lg border-2 border-[rgba(26,26,26,0.15)] bg-transparent p-2 text-[13px] font-semibold text-[#6b4c3b] transition-all duration-200 hover:border-[#9a3412] hover:bg-[rgba(154,52,18,0.08)] hover:text-[#9a3412]"
                      >
                        ✎ Edit
                      </button>

                      <button
                        onClick={() => {
                          setDeletingProject(proj);
                          setDeleteConfirm("");
                          setError("");
                        }}
                        className="flex-1 rounded-lg border-2 border-[rgba(220,38,38,0.25)] bg-transparent p-2 text-[13px] font-semibold text-[#dc2626] transition-all duration-200 hover:border-[rgba(220,38,38,0.5)] hover:bg-[rgba(220,38,38,0.06)]"
                      >
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
      {deletingProject && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-[rgba(26,16,8,0.60)] backdrop-blur-[4px]"
          onClick={(e) =>
            e.target === e.currentTarget && setDeletingProject(null)
          }
        >
          <div className="w-[420px] max-w-[90vw] rounded-2xl border-2 border-[#1a1a1a] bg-white p-7 shadow-[0_20px_60px_rgba(0,0,0,0.20)]">
            <div className="mb-3 flex items-center gap-2.5">
              <span className="text-xl text-[#9a3412]">⚠</span>

              <h2 className="m-0 text-lg font-bold text-[#1a1008]">
                Delete Project?
              </h2>
            </div>

            <p className="mb-4 text-sm leading-[1.5] text-[#6b4c3b]">
              This cannot be undone. Type{" "}
              <strong className="text-[#9a3412]">
                {deletingProject.title}
              </strong>{" "}
              to confirm.
            </p>

            <div className="mb-3 rounded-lg border-2 border-[rgba(26,26,26,0.15)] bg-[#fdf6f2] px-3.5 py-2.5 font-mono text-[13px] tracking-[0.3px] text-[#9a3412]">
              {deletingProject.title}
            </div>

            <input
              className="mb-2 w-full rounded-[10px] border-2 border-[rgba(26,26,26,0.15)] bg-[#fdf6f2] px-3.5 py-3 text-sm text-[#1a1008] outline-none transition-all duration-200 placeholder:text-[#a07060] hover:border-[#c0481a] focus:border-[#9a3412] focus:shadow-[0_0_0_3px_rgba(154,52,18,0.12)]"
              type="text"
              value={deleteConfirm}
              onChange={(e) => {
                setDeleteConfirm(e.target.value);
                setError("");
              }}
              placeholder="Type project name here..."
            />

            {error && (
              <p className="mb-3 text-[13px] text-[#dc2626]">✕ {error}</p>
            )}

            <div className="flex justify-end gap-2.5">
              <button
                onClick={() => {
                  setDeletingProject(null);
                  setDeleteConfirm("");
                  setError("");
                }}
                className="rounded-[10px] border-2 border-[rgba(26,26,26,0.15)] bg-transparent px-5 py-2.5 text-sm font-semibold text-[#6b4c3b] transition-all duration-200 hover:border-[#9a3412] hover:text-[#9a3412]"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                disabled={deleteConfirm !== deletingProject.title}
                className={`rounded-[10px] border-2 border-[rgba(220,38,38,0.35)] bg-[rgba(220,38,38,0.08)] px-5 py-2.5 text-sm font-semibold text-[#dc2626] transition-all duration-200 ${
                  deleteConfirm !== deletingProject.title
                    ? "cursor-not-allowed opacity-35"
                    : "cursor-pointer hover:border-[rgba(220,38,38,0.5)] hover:bg-[rgba(220,38,38,0.12)]"
                }`}
              >
                Delete Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
