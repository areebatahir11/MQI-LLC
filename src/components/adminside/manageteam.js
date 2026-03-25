"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

export default function ManageTeam() {
  const router = useRouter();

  const [session, setSession] = useState(null);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("add");

  const [form, setForm] = useState({
    name: "",
    designation: "",
    description: "",
    image: "",
    email: "",
    phone: "",
    experience: "",
    skills: "",
    _id: null,
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
    } catch {
      setError("Failed to load team.");
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
        fetchTeams();
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
    setForm({
      name: "",
      designation: "",
      description: "",
      image: "",
      email: "",
      phone: "",
      experience: "",
      skills: "",
      _id: null,
    });
    setImagePreview(null);
    setError("");
    setSuccess("");
  }

  function handleEdit(member) {
    setForm({ ...member, skills: member.skills?.join(", ") });
    setImagePreview(member.image || null);
    setActiveTab("add");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");
    const method = form._id ? "PUT" : "POST";
    const endpoint = form._id ? `/api/team/${form._id}` : "/api/team";
    try {
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, skills: form.skills.split(",") }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message);
        return;
      }
      setSuccess(
        form._id
          ? "Member updated successfully!"
          : "Member added successfully!",
      );
      resetForm();
      fetchTeams();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function confirmDelete() {
    if (deleteConfirm !== deletingMember.name) {
      setError("Name does not match.");
      return;
    }
    await fetch(`/api/team/${deletingMember._id}`, { method: "DELETE" });
    setDeletingMember(null);
    setDeleteConfirm("");
    fetchTeams();
  }

  if (loading)
    return (
      <div style={styles.loadingScreen}>
        <div style={styles.loadingSpinner}></div>
        <p style={styles.loadingText}>Loading Team...</p>
        <style>{spinnerCSS}</style>
      </div>
    );

  return (
    <div style={styles.root}>
      <style>{globalCSS}</style>
      <div className="mb-6">
        <button
          onClick={() => router.push("/adminsidepages/dashboardadmin")}
          className="flex items-center gap-2 text-orange-500 hover:text-orange-400 text-sm font-medium transition"
        >
          <FaArrowLeft className="text-xs" />
          Back to Dashboard
        </button>
      </div>

      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarLogo}>
          <span style={styles.logoAccent}>TEAM</span>
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
            <span>{form._id ? "Edit Member" : "Add Member"}</span>
            {activeTab === "add" && <span style={styles.navIndicator} />}
          </button>

          <button
            style={{
              ...styles.navBtn,
              ...(activeTab === "manage" ? styles.navBtnActive : {}),
            }}
            onClick={() => setActiveTab("manage")}
          >
            <span style={styles.navIcon}>◈</span>
            <span>Manage Team</span>
            <span style={styles.navBadge}>{teams.length}</span>
            {activeTab === "manage" && <span style={styles.navIndicator} />}
          </button>
        </nav>

        <div style={styles.sidebarFooter}>
          <div style={styles.sessionDot} />
          <span style={styles.sessionText}>Admin Active</span>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main style={styles.main}>
        {/* TOPBAR */}
        <div style={styles.topbar}>
          <div>
            <h1 style={styles.pageTitle}>
              {activeTab === "add"
                ? form._id
                  ? "Edit Member"
                  : "Add New Member"
                : "Manage Team"}
            </h1>
            <p style={styles.pageSubtitle}>
              {activeTab === "add"
                ? "Fill in the details below to add a team member"
                : `${teams.length} members in your team`}
            </p>
          </div>
          <div style={styles.topbarAccent}>
            <span style={styles.accentLine} />
            <span style={styles.accentDot} />
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
          <form onSubmit={handleSubmit} style={styles.formWrapper}>
            {/* Image Upload */}
            <div style={styles.imageSection}>
              <label style={styles.imageUploadBox} htmlFor="imageInput">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="preview"
                    style={styles.imagePreview}
                  />
                ) : (
                  <div style={styles.imagePlaceholder}>
                    <span style={styles.uploadIcon}>⬆</span>
                    <span style={styles.uploadText}>Upload Photo</span>
                    <span style={styles.uploadHint}>Click to browse</span>
                  </div>
                )}
                <div style={styles.imageOverlay}>
                  <span style={styles.overlayText}>Change Photo</span>
                </div>
              </label>
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
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
                  Remove Photo
                </button>
              )}
            </div>

            {/* Form Fields */}
            <div style={styles.fieldsGrid}>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>
                  Full Name <span style={styles.required}>*</span>
                </label>
                <input
                  className="team-input"
                  name="name"
                  placeholder="e.g. John Smith"
                  onChange={handleChange}
                  value={form.name}
                  required
                  style={styles.input}
                />
              </div>

              <div style={styles.fieldGroup}>
                <label style={styles.label}>
                  Designation <span style={styles.required}>*</span>
                </label>
                <input
                  className="team-input"
                  name="designation"
                  placeholder="e.g. Senior Developer"
                  onChange={handleChange}
                  value={form.designation}
                  required
                  style={styles.input}
                />
              </div>

              <div style={{ ...styles.fieldGroup, gridColumn: "1 / -1" }}>
                <label style={styles.label}>Description</label>
                <textarea
                  className="team-input"
                  name="description"
                  placeholder="Brief bio or role description..."
                  onChange={handleChange}
                  value={form.description}
                  rows={3}
                  style={{
                    ...styles.input,
                    resize: "vertical",
                    minHeight: "80px",
                  }}
                />
              </div>

              <div style={styles.fieldGroup}>
                <label style={styles.label}>Email</label>
                <input
                  className="team-input"
                  name="email"
                  type="email"
                  placeholder="email@company.com"
                  onChange={handleChange}
                  value={form.email}
                  style={styles.input}
                />
              </div>

              <div style={styles.fieldGroup}>
                <label style={styles.label}>Phone</label>
                <input
                  className="team-input"
                  name="phone"
                  placeholder="+92 300 0000000"
                  onChange={handleChange}
                  value={form.phone}
                  style={styles.input}
                />
              </div>

              <div style={styles.fieldGroup}>
                <label style={styles.label}>Experience</label>
                <input
                  className="team-input"
                  name="experience"
                  placeholder="e.g. 5 years"
                  onChange={handleChange}
                  value={form.experience}
                  style={styles.input}
                />
              </div>

              <div style={styles.fieldGroup}>
                <label style={styles.label}>LinkedIn</label>
                <input
                  className="team-input"
                  name="linkedin"
                  placeholder="linkedin.com/in/username"
                  onChange={handleChange}
                  value={form.linkedin}
                  style={styles.input}
                />
              </div>

              <div style={{ ...styles.fieldGroup, gridColumn: "1 / -1" }}>
                <label style={styles.label}>
                  Skills <span style={styles.hint}>(comma separated)</span>
                </label>
                <input
                  className="team-input"
                  name="skills"
                  placeholder="React, Node.js, UI Design..."
                  onChange={handleChange}
                  value={form.skills}
                  style={styles.input}
                />
                {form.skills && (
                  <div style={styles.skillTags}>
                    {form.skills.split(",").map(
                      (s, i) =>
                        s.trim() && (
                          <span key={i} style={styles.skillTag}>
                            {s.trim()}
                          </span>
                        ),
                    )}
                  </div>
                )}
              </div>

              <div
                style={{
                  ...styles.fieldGroup,
                  gridColumn: "1 / -1",
                  display: "flex",
                  gap: "12px",
                  justifyContent: "flex-end",
                  marginTop: "8px",
                }}
              >
                {form._id && (
                  <button
                    type="button"
                    onClick={resetForm}
                    style={styles.cancelBtn}
                  >
                    Cancel Edit
                  </button>
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
                      ? "Update Member"
                      : "Add Member"}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* MANAGE TAB */}
        {activeTab === "manage" && (
          <div>
            {teams.length === 0 ? (
              <div style={styles.emptyState}>
                <span style={styles.emptyIcon}>◈</span>
                <p style={styles.emptyTitle}>No team members yet</p>
                <p style={styles.emptySubtitle}>
                  Add your first team member to get started
                </p>
                <button
                  onClick={() => setActiveTab("add")}
                  style={styles.submitBtn}
                >
                  + Add First Member
                </button>
              </div>
            ) : (
              <div style={styles.cardsGrid}>
                {teams.map((m) => (
                  <div key={m._id} style={styles.card} className="team-card">
                    <div style={styles.cardImageWrap}>
                      {m.image ? (
                        <img
                          src={m.image}
                          alt={m.name}
                          style={styles.cardImage}
                        />
                      ) : (
                        <div style={styles.cardImageFallback}>
                          {m.name?.charAt(0)?.toUpperCase()}
                        </div>
                      )}
                      <div style={styles.cardImageOverlay} />
                    </div>

                    <div style={styles.cardBody}>
                      <h3 style={styles.cardName}>{m.name}</h3>
                      <p style={styles.cardDesig}>{m.designation}</p>

                      {m.experience && (
                        <p style={styles.cardExp}>⏱ {m.experience}</p>
                      )}

                      {m.skills?.length > 0 && (
                        <div style={styles.cardSkills}>
                          {m.skills.slice(0, 3).map((s, i) => (
                            <span key={i} style={styles.cardSkillTag}>
                              {s}
                            </span>
                          ))}
                          {m.skills.length > 3 && (
                            <span style={styles.cardSkillMore}>
                              +{m.skills.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div style={styles.cardActions}>
                      <button
                        onClick={() => handleEdit(m)}
                        style={styles.editBtn}
                        className="card-action-btn"
                      >
                        ✎ Edit
                      </button>
                      <button
                        onClick={() => setDeletingMember(m)}
                        style={styles.deleteBtn}
                        className="card-action-btn"
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
      {deletingMember && (
        <div
          style={styles.modalOverlay}
          onClick={(e) =>
            e.target === e.currentTarget && setDeletingMember(null)
          }
        >
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <span style={styles.modalWarningIcon}>⚠</span>
              <h2 style={styles.modalTitle}>Confirm Deletion</h2>
            </div>
            <p style={styles.modalDesc}>
              This action cannot be undone. Type{" "}
              <strong style={{ color: "#FF6B00" }}>
                {deletingMember.name}
              </strong>{" "}
              to confirm.
            </p>
            <input
              className="team-input"
              placeholder={`Type "${deletingMember.name}"`}
              onChange={(e) => setDeleteConfirm(e.target.value)}
              value={deleteConfirm}
              style={{ ...styles.input, marginBottom: "8px" }}
            />
            {error && (
              <p
                style={{
                  color: "#ff4444",
                  fontSize: "13px",
                  marginBottom: "12px",
                }}
              >
                {error}
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
                  setDeletingMember(null);
                  setDeleteConfirm("");
                  setError("");
                }}
                style={styles.cancelBtn}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                style={{
                  ...styles.deleteBtn,
                  padding: "10px 20px",
                  borderRadius: "8px",
                }}
              >
                Delete Member
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
    padding: "0",
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
    fontSize: "22px",
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
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  sessionDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#22c55e",
    boxShadow: "0 0 6px #22c55e",
  },
  sessionText: { fontSize: "12px", color: "#555" },

  // MAIN
  main: {
    flex: 1,
    padding: "32px 40px",
    maxWidth: "calc(100vw - 240px)",
    overflowX: "hidden",
  },
  topbar: {
    display: "flex",
    alignItems: "flex-start",
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
  pageSubtitle: {
    fontSize: "14px",
    color: "#555",
    margin: "4px 0 0",
  },
  topbarAccent: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  accentLine: {
    display: "block",
    width: "60px",
    height: "2px",
    background: "linear-gradient(to left, #FF6B00, transparent)",
  },
  accentDot: {
    display: "block",
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#FF6B00",
    boxShadow: "0 0 10px #FF6B00",
  },

  // ALERTS
  alertError: {
    background: "rgba(255, 68, 68, 0.1)",
    border: "1px solid rgba(255, 68, 68, 0.3)",
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
    background: "rgba(34, 197, 94, 0.1)",
    border: "1px solid rgba(34, 197, 94, 0.3)",
    color: "#4ade80",
    padding: "12px 16px",
    borderRadius: "10px",
    marginBottom: "20px",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  alertIcon: { fontWeight: "700", fontSize: "16px" },

  // FORM
  formWrapper: {
    display: "flex",
    gap: "32px",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  imageSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
  },
  imageUploadBox: {
    width: "200px",
    height: "200px",
    border: "2px dashed #333",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    background: "#0D0D0D",
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
  imagePreview: { width: "100%", height: "100%", objectFit: "cover" },
  imageOverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(255, 107, 0, 0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0,
    transition: "opacity 0.2s",
  },
  overlayText: { color: "#fff", fontWeight: "600", fontSize: "14px" },
  removeImageBtn: {
    background: "transparent",
    border: "1px solid #333",
    color: "#888",
    padding: "6px 14px",
    borderRadius: "6px",
    fontSize: "12px",
    cursor: "pointer",
  },

  fieldsGrid: {
    flex: 1,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
    minWidth: "400px",
  },
  fieldGroup: { display: "flex", flexDirection: "column", gap: "6px" },
  label: {
    fontSize: "12px",
    color: "#888",
    fontWeight: "600",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
  },
  required: { color: "#FF6B00" },
  hint: {
    color: "#555",
    fontWeight: "400",
    textTransform: "none",
    letterSpacing: "0",
  },
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

  skillTags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
    marginTop: "6px",
  },
  skillTag: {
    background: "rgba(255, 107, 0, 0.12)",
    border: "1px solid rgba(255, 107, 0, 0.3)",
    color: "#FF6B00",
    fontSize: "11px",
    padding: "3px 10px",
    borderRadius: "20px",
    fontWeight: "500",
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
    letterSpacing: "0.3px",
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
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
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
    height: "180px",
    background: "#111",
    overflow: "hidden",
  },
  cardImage: { width: "100%", height: "100%", objectFit: "cover" },
  cardImageFallback: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "48px",
    fontWeight: "800",
    color: "#FF6B00",
    background: "rgba(255, 107, 0, 0.07)",
  },
  cardImageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "60px",
    background: "linear-gradient(to top, #0A0A0A, transparent)",
  },
  cardBody: { padding: "16px 18px 12px" },
  cardName: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#FFF",
    margin: "0 0 4px",
  },
  cardDesig: {
    fontSize: "13px",
    color: "#FF6B00",
    margin: "0 0 8px",
    fontWeight: "500",
  },
  cardExp: { fontSize: "12px", color: "#555", margin: "0 0 10px" },
  cardSkills: { display: "flex", flexWrap: "wrap", gap: "5px" },
  cardSkillTag: {
    background: "#111",
    border: "1px solid #222",
    color: "#888",
    fontSize: "10px",
    padding: "2px 8px",
    borderRadius: "20px",
  },
  cardSkillMore: {
    background: "rgba(255, 107, 0, 0.1)",
    color: "#FF6B00",
    fontSize: "10px",
    padding: "2px 8px",
    borderRadius: "20px",
    border: "1px solid rgba(255, 107, 0, 0.2)",
  },
  cardActions: {
    display: "flex",
    gap: "8px",
    padding: "12px 18px 16px",
    borderTop: "1px solid #111",
  },
  editBtn: {
    flex: 1,
    background: "transparent",
    border: "1px solid #333",
    color: "#FFF",
    padding: "8px",
    borderRadius: "8px",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "all 0.2s",
  },
  deleteBtn: {
    flex: 1,
    background: "transparent",
    border: "1px solid rgba(255, 68, 68, 0.3)",
    color: "#ff6666",
    padding: "8px",
    borderRadius: "8px",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "all 0.2s",
  },

  // EMPTY STATE
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "80px 20px",
    gap: "12px",
  },
  emptyIcon: { fontSize: "48px", color: "#222" },
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
    border: "1px solid #222",
    borderRadius: "16px",
    padding: "28px",
    width: "420px",
    maxWidth: "90vw",
  },
  modalHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "12px",
  },
  modalWarningIcon: { fontSize: "20px", color: "#FF6B00" },
  modalTitle: { fontSize: "18px", fontWeight: "700", margin: 0, color: "#FFF" },
  modalDesc: {
    fontSize: "14px",
    color: "#888",
    marginBottom: "20px",
    lineHeight: "1.5",
  },
};

const spinnerCSS = `
  @keyframes spin { to { transform: rotate(360deg); } }
`;

const globalCSS = `
  * { box-sizing: border-box; }
  ::placeholder { color: #444 !important; }
  
  .team-input:focus {
    border-color: #FF6B00 !important;
    box-shadow: 0 0 0 3px rgba(255, 107, 0, 0.1);
    outline: none;
  }
  
  .team-input:hover {
    border-color: #333;
  }
  
  label[for="imageInput"]:hover .imageOverlay {
    opacity: 1 !important;
  }
  
  label[for="imageInput"]:hover {
    border-color: #FF6B00 !important;
  }
  
  .team-card:hover {
    border-color: #FF6B00 !important;
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(255, 107, 0, 0.08);
  }
  
  .card-action-btn:hover {
    background: rgba(255, 107, 0, 0.08) !important;
    border-color: #FF6B00 !important;
    color: #FF6B00 !important;
  }
`;
