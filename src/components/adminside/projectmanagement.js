//adminside/projectmanagemnt.js
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
    description: "",
    image: "",
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
      setForm((prev) => ({ ...prev, image: reader.result }));
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  }

  function resetForm() {
    setForm({ title: "", location: "", description: "", image: "", _id: null });
    setImagePreview(null);
    setError("");
    setSuccess("");
  }

  function handleEdit(proj) {
    setForm({
      title: proj.title,
      location: proj.location,
      description: proj.description,
      image: proj.image,
      _id: proj._id,
    });
    setImagePreview(proj.image || null);
    setError("");
    setSuccess("");
    setActiveTab("add");
    window.scrollTo({ top: 0, behavior: "smooth" });
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
        headers: { "Content-Type": "application/json" },
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

  if (loading)
    return (
      <div style={styles.loadingScreen}>
        <div style={styles.loadingSpinner} />
        <p style={styles.loadingText}>Loading Projects...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );

  return (
    <div style={styles.root}>
      <style>{globalCSS}</style>

      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarLogo}>
          <span style={styles.logoAccent}>PROJECT</span>
          <span style={styles.logoSub}>MANAGER</span>
        </div>

        <div style={styles.sidebarDivider} />

        <nav style={styles.nav}>
          <button
            style={{
              ...styles.navBtn,
              ...(activeTab === "add" ? styles.navBtnActive : {}),
            }}
            onClick={() => {
              resetForm();
              setActiveTab("add");
            }}
          >
            <span style={styles.navIcon}>＋</span>
            <span>{form._id ? "Edit Project" : "Add Project"}</span>
            {activeTab === "add" && <span style={styles.navIndicator} />}
          </button>

          <button
            style={{
              ...styles.navBtn,
              ...(activeTab === "manage" ? styles.navBtnActive : {}),
            }}
            onClick={() => {
              setError("");
              setSuccess("");
              setActiveTab("manage");
            }}
          >
            <span style={styles.navIcon}>◈</span>
            <span>Manage Projects</span>
            <span style={styles.navBadge}>{projects.length}</span>
            {activeTab === "manage" && <span style={styles.navIndicator} />}
          </button>
        </nav>

        <div style={styles.sidebarFooter}>
          <button
            onClick={() => router.push("/adminsidepages/dashboardadmin")}
            style={styles.backBtn}
          >
            <FaArrowLeft style={{ fontSize: "10px" }} />
            <span>Dashboard</span>
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main style={styles.main}>
        {/* TOPBAR */}
        <div style={styles.topbar}>
          <div>
            <h1 style={styles.pageTitle}>
              {activeTab === "add"
                ? form._id
                  ? "Edit Project"
                  : "Add New Project"
                : "Manage Projects"}
            </h1>
            <p style={styles.pageSubtitle}>
              {activeTab === "add"
                ? form._id
                  ? "Update the project details below"
                  : "Fill in the details to publish a new project"
                : `${projects.length} project${projects.length !== 1 ? "s" : ""} in database`}
            </p>
          </div>
          <div style={styles.topbarRight}>
            <div style={styles.adminBadge}>
              <div style={styles.adminAvatar}>
                {session?.username?.[0]?.toUpperCase() || "A"}
              </div>
              <span style={styles.adminName}>
                {session?.username || "Admin"}
              </span>
            </div>
          </div>
        </div>

        {/* ALERTS */}
        {error && (
          <div style={styles.alertError}>
            <span style={styles.alertIcon}>✕</span> {error}
          </div>
        )}
        {success && (
          <div style={styles.alertSuccess}>
            <span style={styles.alertIcon}>✓</span> {success}
          </div>
        )}

        {/* ADD / EDIT FORM */}
        {activeTab === "add" && (
          <form onSubmit={handleSubmit} style={styles.formCard}>
            {/* Title + Location */}
            <div style={styles.formRow}>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>
                  Project Title <span style={styles.required}>*</span>
                </label>
                <input
                  className="proj-input"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Muscat Demolition Site"
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>
                  Location <span style={styles.required}>*</span>
                </label>
                <input
                  className="proj-input"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g. Seeb, Muscat"
                  required
                  style={styles.input}
                />
              </div>
            </div>

            {/* Image Upload */}
            <div style={styles.fieldGroup}>
              <label style={styles.label}>
                Project Image{" "}
                {!form._id && <span style={styles.required}>*</span>}
              </label>
              <label htmlFor="projImageInput" style={styles.imageUploadBox}>
                {imagePreview ? (
                  <>
                    <img
                      src={imagePreview}
                      alt="preview"
                      style={styles.imagePreviewFull}
                    />
                    <div style={styles.imageOverlay}>
                      <span style={styles.overlayText}>⬆ Change Image</span>
                    </div>
                  </>
                ) : (
                  <div style={styles.imagePlaceholder}>
                    <span style={styles.uploadIcon}>⬆</span>
                    <span style={styles.uploadText}>
                      Click to upload project image
                    </span>
                    <span style={styles.uploadHint}>PNG, JPG — max 5MB</span>
                  </div>
                )}
              </label>
              <input
                id="projImageInput"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
                required={!form._id}
              />
              {imagePreview && (
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview(null);
                    setForm((p) => ({ ...p, image: "" }));
                  }}
                  style={styles.removeImageBtn}
                >
                  Remove Image
                </button>
              )}
            </div>

            {/* Description */}
            <div style={styles.fieldGroup}>
              <label style={styles.label}>
                Description <span style={styles.required}>*</span>
              </label>
              <textarea
                className="proj-input"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the project: scope, location details, type of work done..."
                required
                rows={4}
                style={{
                  ...styles.input,
                  resize: "vertical",
                  minHeight: "100px",
                }}
              />
            </div>

            {/* Footer */}
            <div style={styles.formFooter}>
              {form._id ? (
                <button
                  type="button"
                  onClick={resetForm}
                  style={styles.cancelBtn}
                >
                  ← Cancel Edit
                </button>
              ) : (
                <span style={styles.requiredNote}>* All fields required</span>
              )}
              <button
                type="submit"
                disabled={submitting}
                style={
                  submitting
                    ? { ...styles.submitBtn, opacity: 0.7 }
                    : styles.submitBtn
                }
              >
                {submitting
                  ? "Saving..."
                  : form._id
                    ? "✎ Update Project"
                    : "+ Add Project"}
              </button>
            </div>
          </form>
        )}

        {/* MANAGE TAB */}
        {activeTab === "manage" && (
          <div>
            {projects.length === 0 ? (
              <div style={styles.emptyState}>
                <span style={styles.emptyIcon}>◈</span>
                <p style={styles.emptyTitle}>No projects yet</p>
                <p style={styles.emptySubtitle}>
                  Add your first project to get started
                </p>
                <button
                  onClick={() => setActiveTab("add")}
                  style={styles.submitBtn}
                >
                  + Add First Project
                </button>
              </div>
            ) : (
              <div style={styles.cardsGrid}>
                {projects.map((proj) => (
                  <div key={proj._id} style={styles.card} className="proj-card">
                    {/* Image */}
                    <div style={styles.cardImageWrap}>
                      {proj.image ? (
                        <img
                          src={proj.image}
                          alt={proj.title}
                          style={styles.cardImage}
                          className="proj-card-img"
                          unoptimized
                        />
                      ) : (
                        <div style={styles.cardImageFallback}>
                          <span style={styles.fallbackIcon}>◈</span>
                        </div>
                      )}
                      <div style={styles.cardImageGradient} />
                      {/* Location badge over image */}
                      <div style={styles.locationBadge}>
                        <span style={styles.locationPin}>📍</span>
                        {proj.location}
                      </div>
                    </div>

                    {/* Body */}
                    <div style={styles.cardBody}>
                      <h3 style={styles.cardTitle}>{proj.title}</h3>
                      <p style={styles.cardDesc}>{proj.description}</p>
                    </div>

                    {/* Actions */}
                    <div style={styles.cardActions}>
                      <button
                        onClick={() => handleEdit(proj)}
                        style={styles.editBtn}
                        className="proj-action-btn"
                      >
                        ✎ Edit
                      </button>
                      <button
                        onClick={() => {
                          setDeletingProject(proj);
                          setDeleteConfirm("");
                          setError("");
                        }}
                        style={styles.deleteBtn}
                        className="proj-action-btn-del"
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
          style={styles.modalOverlay}
          onClick={(e) =>
            e.target === e.currentTarget && setDeletingProject(null)
          }
        >
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <span style={styles.modalWarningIcon}>⚠</span>
              <h2 style={styles.modalTitle}>Delete Project?</h2>
            </div>
            <p style={styles.modalDesc}>
              This cannot be undone. Type the project name to confirm:
            </p>
            <div style={styles.modalProjectName}>{deletingProject.title}</div>
            <input
              className="proj-input"
              type="text"
              value={deleteConfirm}
              onChange={(e) => {
                setDeleteConfirm(e.target.value);
                setError("");
              }}
              placeholder="Type project name here..."
              style={{ ...styles.input, marginBottom: "8px" }}
            />
            {error && (
              <p
                style={{
                  color: "#ff4444",
                  fontSize: "12px",
                  marginBottom: "12px",
                }}
              >
                ✕ {error}
              </p>
            )}
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={() => {
                  setDeletingProject(null);
                  setDeleteConfirm("");
                  setError("");
                }}
                style={styles.cancelBtn}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleteConfirm !== deletingProject.title}
                style={
                  deleteConfirm !== deletingProject.title
                    ? {
                        ...styles.confirmDeleteBtn,
                        opacity: 0.3,
                        cursor: "not-allowed",
                      }
                    : styles.confirmDeleteBtn
                }
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

// ─── STYLES ──────────────────────────────────────────────────────────────────

const styles = {
  root: {
    display: "flex",
    minHeight: "100vh",
    background: "#000000",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    color: "#FFFFFF",
  },
  loadingScreen: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "#000",
    gap: "16px",
  },
  loadingSpinner: {
    width: "40px",
    height: "40px",
    border: "3px solid #222",
    borderTop: "3px solid #FF6B00",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  loadingText: { color: "#888", fontSize: "14px", letterSpacing: "2px" },

  // SIDEBAR
  sidebar: {
    width: "240px",
    minHeight: "100vh",
    background: "#0A0A0A",
    borderRight: "1px solid #1A1A1A",
    display: "flex",
    flexDirection: "column",
    position: "sticky",
    top: 0,
    height: "100vh",
  },
  sidebarLogo: {
    padding: "28px 24px 24px",
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  logoAccent: {
    fontSize: "18px",
    fontWeight: "800",
    color: "#FF6B00",
    letterSpacing: "4px",
  },
  logoSub: {
    fontSize: "11px",
    color: "#555",
    letterSpacing: "3px",
    fontWeight: "500",
  },
  sidebarDivider: {
    height: "1px",
    background: "linear-gradient(to right, #FF6B00, transparent)",
    margin: "0 0 16px 0",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    padding: "0 12px",
    flex: 1,
  },
  navBtn: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 14px",
    background: "transparent",
    border: "none",
    borderRadius: "10px",
    color: "#666",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s",
    textAlign: "left",
    position: "relative",
    width: "100%",
  },
  navBtnActive: {
    background: "rgba(255, 107, 0, 0.1)",
    color: "#FF6B00",
    border: "1px solid rgba(255, 107, 0, 0.2)",
  },
  navIcon: { fontSize: "16px", minWidth: "20px", textAlign: "center" },
  navIndicator: {
    marginLeft: "auto",
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#FF6B00",
  },
  navBadge: {
    marginLeft: "auto",
    background: "#FF6B00",
    color: "#000",
    fontSize: "11px",
    fontWeight: "700",
    padding: "2px 7px",
    borderRadius: "20px",
    minWidth: "20px",
    textAlign: "center",
  },
  sidebarFooter: {
    padding: "20px 24px",
    borderTop: "1px solid #1A1A1A",
  },
  backBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "transparent",
    border: "1px solid #1A1A1A",
    color: "#555",
    fontSize: "12px",
    cursor: "pointer",
    padding: "8px 14px",
    borderRadius: "8px",
    transition: "all 0.2s",
    width: "100%",
  },

  // MAIN
  main: {
    flex: 1,
    padding: "32px 40px",
    maxWidth: "calc(100vw - 240px)",
    overflowX: "hidden",
  },
  topbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "32px",
  },
  pageTitle: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#FFFFFF",
    margin: 0,
    letterSpacing: "-0.5px",
  },
  pageSubtitle: { fontSize: "14px", color: "#555", margin: "4px 0 0" },
  topbarRight: { display: "flex", alignItems: "center" },
  adminBadge: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "#0D0D0D",
    border: "1px solid #1A1A1A",
    borderRadius: "30px",
    padding: "6px 14px 6px 6px",
  },
  adminAvatar: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    background: "#FF6B00",
    color: "#000",
    fontWeight: "700",
    fontSize: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  adminName: { fontSize: "13px", color: "#666" },

  // ALERTS
  alertError: {
    background: "rgba(255,68,68,0.1)",
    border: "1px solid rgba(255,68,68,0.3)",
    color: "#ff6666",
    padding: "12px 16px",
    borderRadius: "10px",
    marginBottom: "20px",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  alertSuccess: {
    background: "rgba(34,197,94,0.1)",
    border: "1px solid rgba(34,197,94,0.3)",
    color: "#4ade80",
    padding: "12px 16px",
    borderRadius: "10px",
    marginBottom: "20px",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  alertIcon: { fontWeight: "700" },

  // FORM
  formCard: {
    background: "#0A0A0A",
    border: "1px solid #1A1A1A",
    borderRadius: "16px",
    padding: "28px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    maxWidth: "700px",
  },
  formRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },
  fieldGroup: { display: "flex", flexDirection: "column", gap: "8px" },
  label: {
    fontSize: "11px",
    color: "#666",
    fontWeight: "700",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },
  required: { color: "#FF6B00" },
  requiredNote: { fontSize: "12px", color: "#444" },
  input: {
    background: "#0D0D0D",
    border: "1px solid #222",
    borderRadius: "10px",
    color: "#FFFFFF",
    padding: "12px 14px",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s",
    width: "100%",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },

  imageUploadBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px dashed #222",
    borderRadius: "12px",
    background: "#0D0D0D",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    height: "180px",
    transition: "border-color 0.2s",
  },
  imagePlaceholder: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
  },
  uploadIcon: { fontSize: "28px", color: "#FF6B00" },
  uploadText: { fontSize: "14px", color: "#888", fontWeight: "500" },
  uploadHint: { fontSize: "11px", color: "#555" },
  imagePreviewFull: { width: "100%", height: "100%", objectFit: "cover" },
  imageOverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(255,107,0,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0,
    transition: "opacity 0.2s",
  },
  overlayText: { color: "#fff", fontWeight: "600", fontSize: "14px" },
  removeImageBtn: {
    alignSelf: "flex-start",
    background: "transparent",
    border: "1px solid #222",
    color: "#666",
    padding: "5px 12px",
    borderRadius: "6px",
    fontSize: "12px",
    cursor: "pointer",
  },

  formFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: "16px",
    borderTop: "1px solid #1A1A1A",
  },
  submitBtn: {
    background: "#FF6B00",
    border: "none",
    color: "#000",
    padding: "12px 28px",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  cancelBtn: {
    background: "transparent",
    border: "1px solid #333",
    color: "#888",
    padding: "12px 20px",
    borderRadius: "10px",
    fontSize: "14px",
    cursor: "pointer",
  },

  // CARDS
  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#0A0A0A",
    border: "1px solid #1A1A1A",
    borderRadius: "16px",
    overflow: "hidden",
    transition: "all 0.25s",
  },
  cardImageWrap: {
    position: "relative",
    height: "190px",
    background: "#111",
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.5s",
  },
  cardImageFallback: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255,107,0,0.04)",
  },
  fallbackIcon: { fontSize: "40px", color: "#222" },
  cardImageGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "80px",
    background: "linear-gradient(to top, #0A0A0A, transparent)",
  },
  locationBadge: {
    position: "absolute",
    bottom: "12px",
    left: "12px",
    background: "rgba(0,0,0,0.75)",
    backdropFilter: "blur(8px)",
    border: "1px solid #222",
    borderRadius: "20px",
    padding: "4px 10px",
    fontSize: "11px",
    color: "#CCC",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  locationPin: { fontSize: "10px" },
  cardBody: { padding: "16px 18px 10px" },
  cardTitle: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#FFF",
    margin: "0 0 6px",
  },
  cardDesc: {
    fontSize: "12px",
    color: "#555",
    margin: 0,
    lineHeight: "1.6",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  cardActions: {
    display: "flex",
    gap: "8px",
    padding: "10px 18px 16px",
    borderTop: "1px solid #111",
  },
  editBtn: {
    flex: 1,
    background: "transparent",
    border: "1px solid #222",
    color: "#FFF",
    padding: "8px",
    borderRadius: "8px",
    fontSize: "12px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "all 0.2s",
  },
  deleteBtn: {
    flex: 1,
    background: "transparent",
    border: "1px solid rgba(255,68,68,0.2)",
    color: "#ff6666",
    padding: "8px",
    borderRadius: "8px",
    fontSize: "12px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "all 0.2s",
  },

  // EMPTY
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "80px 20px",
    gap: "12px",
  },
  emptyIcon: { fontSize: "48px", color: "#1A1A1A" },
  emptyTitle: { fontSize: "20px", fontWeight: "700", color: "#444", margin: 0 },
  emptySubtitle: { fontSize: "14px", color: "#333", margin: "0 0 16px" },

  // MODAL
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.85)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    backdropFilter: "blur(4px)",
  },
  modal: {
    background: "#0D0D0D",
    border: "1px solid #1E1E1E",
    borderRadius: "16px",
    padding: "28px",
    width: "420px",
    maxWidth: "90vw",
  },
  modalHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "10px",
  },
  modalWarningIcon: { fontSize: "20px", color: "#FF6B00" },
  modalTitle: { fontSize: "18px", fontWeight: "700", margin: 0, color: "#FFF" },
  modalDesc: {
    fontSize: "13px",
    color: "#666",
    marginBottom: "14px",
    lineHeight: "1.5",
  },
  modalProjectName: {
    background: "#111",
    border: "1px solid #222",
    borderRadius: "8px",
    padding: "10px 14px",
    fontSize: "13px",
    color: "#FF6B00",
    fontFamily: "monospace",
    marginBottom: "12px",
    letterSpacing: "0.3px",
  },
  confirmDeleteBtn: {
    background: "rgba(255,68,68,0.15)",
    border: "1px solid rgba(255,68,68,0.4)",
    color: "#ff6666",
    padding: "10px 20px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
  },
};

const globalCSS = `
  * { box-sizing: border-box; }
  ::placeholder { color: #333 !important; }

  .proj-input:focus {
    border-color: #FF6B00 !important;
    box-shadow: 0 0 0 3px rgba(255, 107, 0, 0.08);
    outline: none;
  }

  .proj-card:hover {
    border-color: #FF6B00 !important;
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(255, 107, 0, 0.08);
  }

  .proj-card:hover .proj-card-img {
    transform: scale(1.05);
  }

  .proj-action-btn:hover {
    background: rgba(255, 107, 0, 0.08) !important;
    border-color: #FF6B00 !important;
    color: #FF6B00 !important;
  }

  .proj-action-btn-del:hover {
    background: rgba(255, 68, 68, 0.12) !important;
    border-color: rgba(255, 68, 68, 0.5) !important;
  }

  label[for="projImageInput"]:hover {
    border-color: #FF6B00 !important;
  }
`;
