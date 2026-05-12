"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

const T = {
  bg: "#ffffff",
  sidebar: "#fdf8f5",
  card: "#ffffff",
  input: "#fdf6f2",
  border: "#1a1a1a",
  borderSoft: "rgba(26,26,26,0.15)",
  orange: "#9a3412",
  orangeL: "#c0481a",
  orangePill: "rgba(154,52,18,0.10)",
  text: "#1a1008",
  muted: "#6b4c3b",
  dim: "#a07060",
};

export default function ContactsManage() {
  const router = useRouter();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  async function fetchContacts() {
    try {
      const res = await fetch("/api/contact");
      if (!res.ok) throw new Error("API failed");
      const data = await res.json();
      setContacts(data.contacts || []);
      if (data.contacts?.length > 0) setSelected(data.contacts[0]);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchContacts();
  }, []);

  const filtered = contacts.filter(
    (c) =>
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase()) ||
      c.message?.toLowerCase().includes(search.toLowerCase()),
  );

  function timeAgo(date) {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    const hrs = Math.floor(mins / 60);
    const days = Math.floor(hrs / 24);
    if (days > 0) return `${days}d ago`;
    if (hrs > 0) return `${hrs}h ago`;
    if (mins > 0) return `${mins}m ago`;
    return "Just now";
  }

  // Gmail compose URL — "to" mein client ka email seedha aa jata hai
  function getGmailUrl(contact) {
    const subject = encodeURIComponent("Re: Your message");
    const body = encodeURIComponent(`Hi ${contact.name},\n\n`);
    return `https://mail.google.com/mail/?view=cm&to=${contact.email}&su=${subject}&body=${body}`;
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: T.bg,
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        color: T.text,
        position: "relative",
      }}
    >
      <style>{`
        * { box-sizing: border-box; }
        ::placeholder { color: ${T.dim} !important; }
        .msg-item:hover { background: ${T.orangePill} !important; }
        .msg-item.active { background: ${T.orangePill} !important; border-left: 3px solid ${T.orange} !important; }
        .c-back:hover { background: ${T.orange} !important; color: #fff !important; border-color: ${T.orange} !important; }
        .search-input:focus { border-color: ${T.orange} !important; box-shadow: 0 0 0 3px rgba(154,52,18,0.10); outline: none; }
        .reply-btn:hover { background: ${T.orangeL} !important; transform: translateY(-1px); box-shadow: 0 8px 20px rgba(154,52,18,0.30) !important; }
        .next-btn:hover { border-color: ${T.orange} !important; color: ${T.orange} !important; }
        @keyframes spin    { to { transform: rotate(360deg); } }
      `}</style>

      {/* Background gradients */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 55% 50% at 0% 0%, rgba(154,52,18,0.18), transparent 55%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 55% 50% at 100% 0%, rgba(154,52,18,0.18), transparent 55%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 55% 50% at 0% 100%, rgba(154,52,18,0.18), transparent 55%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 55% 50% at 100% 100%, rgba(154,52,18,0.18), transparent 55%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.04,
            backgroundImage:
              "linear-gradient(to right,#000 1px,transparent 1px),linear-gradient(to bottom,#000 1px,transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* ── LEFT SIDEBAR ── */}
      <aside
        style={{
          width: "320px",
          minHeight: "100vh",
          background: "rgba(253,248,245,0.92)",
          backdropFilter: "blur(12px)",
          borderRight: `2px solid ${T.border}`,
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh",
          zIndex: 10,
        }}
      >
        <div style={{ padding: "28px 20px 16px" }}>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "900",
              color: T.orange,
              letterSpacing: "4px",
            }}
          >
            INBOX
          </div>
          <div
            style={{
              fontSize: "10px",
              color: T.dim,
              letterSpacing: "3px",
              fontWeight: "600",
              marginTop: "2px",
            }}
          >
            CONTACT MESSAGES
          </div>
        </div>
        <div
          style={{
            height: "2px",
            background: `linear-gradient(to right, ${T.orange}, transparent)`,
            marginBottom: "16px",
          }}
        />

        {/* Search */}
        <div style={{ padding: "0 16px 12px" }}>
          <input
            className="search-input"
            placeholder="Search messages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              background: T.input,
              border: `2px solid ${T.borderSoft}`,
              borderRadius: "10px",
              color: T.text,
              padding: "10px 14px",
              fontSize: "13px",
              outline: "none",
              transition: "border-color 0.2s",
              fontFamily: "inherit",
            }}
          />
        </div>

        {/* Count */}
        <div
          style={{
            padding: "0 20px 10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              color: T.dim,
              fontWeight: "600",
              letterSpacing: "0.5px",
            }}
          >
            {loading
              ? "Loading..."
              : `${filtered.length} MESSAGE${filtered.length !== 1 ? "S" : ""}`}
          </span>
          {contacts.length > 0 && (
            <span
              style={{
                background: T.orange,
                color: "#fff",
                fontSize: "11px",
                fontWeight: "700",
                padding: "2px 8px",
                borderRadius: "20px",
              }}
            >
              {contacts.length}
            </span>
          )}
        </div>

        {/* List */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0 8px" }}>
          {loading && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: T.muted,
                fontSize: "13px",
                padding: "20px 12px",
              }}
            >
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  border: `2px solid ${T.borderSoft}`,
                  borderTop: `2px solid ${T.orange}`,
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                  flexShrink: 0,
                }}
              />
              Loading...
            </div>
          )}
          {!loading && filtered.length === 0 && (
            <div style={{ padding: "40px 20px", textAlign: "center" }}>
              <div
                style={{ fontSize: "32px", color: T.dim, marginBottom: "8px" }}
              >
                ✉
              </div>
              <p style={{ fontSize: "14px", color: T.muted, margin: 0 }}>
                No messages found
              </p>
            </div>
          )}
          {!loading &&
            filtered.map((c) => (
              <div
                key={c._id}
                className={`msg-item${selected?._id === c._id ? " active" : ""}`}
                onClick={() => setSelected(c)}
                style={{
                  padding: "14px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  marginBottom: "4px",
                  borderLeft:
                    selected?._id === c._id
                      ? `3px solid ${T.orange}`
                      : "3px solid transparent",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "50%",
                      background: T.orangePill,
                      border: `2px solid ${selected?._id === c._id ? T.orange : T.borderSoft}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "15px",
                      fontWeight: "800",
                      color: T.orange,
                      flexShrink: 0,
                    }}
                  >
                    {c.name?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "8px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: "700",
                          color: T.text,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {c.name}
                      </span>
                      <span
                        style={{
                          fontSize: "11px",
                          color: T.dim,
                          whiteSpace: "nowrap",
                          flexShrink: 0,
                        }}
                      >
                        {timeAgo(c.createdAt)}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: "12px",
                        color: T.muted,
                        margin: "2px 0 0",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {c.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Back to dashboard */}
        <div
          style={{ padding: "20px 16px", borderTop: `2px solid ${T.border}` }}
        >
          <button
            onClick={() => router.push("/adminsidepages/dashboardadmin")}
            className="c-back"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              background: T.orangePill,
              border: `2px solid ${T.orange}`,
              color: T.orange,
              fontSize: "13px",
              fontWeight: "700",
              cursor: "pointer",
              padding: "12px 16px",
              borderRadius: "10px",
              transition: "all 0.2s",
              width: "100%",
            }}
          >
            <FaArrowLeft style={{ fontSize: "11px" }} /> Back to Dashboard
          </button>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "12px",
              paddingLeft: "4px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#22c55e",
                boxShadow: "0 0 6px #22c55e",
              }}
            />
            <span style={{ fontSize: "12px", color: T.muted }}>
              Admin Active
            </span>
          </div>
        </div>
      </aside>

      {/* ── RIGHT — message detail ── */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
        }}
      >
        {/* Empty state */}
        {!selected && !loading && (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              padding: "40px",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: T.orangePill,
                border: `2px solid ${T.borderSoft}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "32px",
              }}
            >
              ✉
            </div>
            <p
              style={{
                fontSize: "20px",
                fontWeight: "700",
                color: T.muted,
                margin: 0,
              }}
            >
              Select a message
            </p>
            <p style={{ fontSize: "14px", color: T.dim, margin: 0 }}>
              Choose a message from the inbox to read it
            </p>
          </div>
        )}

        {/* Message detail */}
        {selected && (
          <div style={{ flex: 1, padding: "40px 48px", maxWidth: "760px" }}>
            {/* Sender info */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "32px",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: T.orangePill,
                  border: `2px solid ${T.orange}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                  fontWeight: "900",
                  color: T.orange,
                  flexShrink: 0,
                }}
              >
                {selected.name?.charAt(0)?.toUpperCase() || "?"}
              </div>
              <div style={{ flex: 1 }}>
                <h2
                  style={{
                    fontSize: "22px",
                    fontWeight: "900",
                    color: T.text,
                    margin: "0 0 4px",
                    letterSpacing: "-0.3px",
                  }}
                >
                  {selected.name}
                </h2>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      color: T.orange,
                      fontWeight: "600",
                    }}
                  >
                    ✉ {selected.email}
                  </span>
                  {selected.phone && (
                    <span style={{ fontSize: "14px", color: T.muted }}>
                      · 📞 {selected.phone}
                    </span>
                  )}
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div
                  style={{
                    fontSize: "12px",
                    color: T.dim,
                    marginBottom: "4px",
                  }}
                >
                  Received
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: T.muted,
                    fontWeight: "600",
                  }}
                >
                  {new Date(selected.createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
                <div style={{ fontSize: "12px", color: T.dim }}>
                  {new Date(selected.createdAt).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "28px",
              }}
            >
              <div
                style={{
                  height: "2px",
                  flex: 1,
                  background: `linear-gradient(to right, ${T.orange}, transparent)`,
                }}
              />
              <span
                style={{
                  fontSize: "11px",
                  color: T.dim,
                  fontWeight: "700",
                  letterSpacing: "2px",
                }}
              >
                MESSAGE
              </span>
              <div
                style={{
                  height: "2px",
                  flex: 1,
                  background: `linear-gradient(to left, ${T.orange}, transparent)`,
                }}
              />
            </div>

            {/* Message bubble */}
            <div
              style={{
                background: T.input,
                border: `2px solid ${T.borderSoft}`,
                borderRadius: "20px",
                borderTopLeftRadius: "4px",
                padding: "28px 32px",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "16px",
                  left: "20px",
                  fontSize: "48px",
                  color: T.orangePill,
                  fontFamily: "Georgia, serif",
                  lineHeight: 1,
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              >
              </div>
              <p
                style={{
                  fontSize: "16px",
                  color: T.text,
                  lineHeight: "1.85",
                  margin: 0,
                  whiteSpace: "pre-wrap",
                  paddingTop: "20px",
                  paddingLeft: "8px",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {selected.message}
              </p>
            </div>

            {/* Actions */}
            <div
              style={{
                marginTop: "24px",
                display: "flex",
                gap: "12px",
                alignItems: "center",
              }}
            >
              {/* Reply via Gmail — seedha Gmail khulta hai, "to" mein client ka email */}
              <a
                href={getGmailUrl(selected)}
                target="_blank"
                rel="noopener noreferrer"
                className="reply-btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: T.orange,
                  color: "#fff",
                  padding: "12px 24px",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontWeight: "700",
                  textDecoration: "none",
                  boxShadow: "0 4px 15px rgba(154,52,18,0.25)",
                  transition: "all 0.2s",
                }}
              >
                ↩ Reply via Gmail
              </a>

              {/* Next message */}
              {filtered.indexOf(selected) < filtered.length - 1 && (
                <button
                  className="next-btn"
                  onClick={() =>
                    setSelected(filtered[filtered.indexOf(selected) + 1])
                  }
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "transparent",
                    border: `2px solid ${T.borderSoft}`,
                    color: T.muted,
                    padding: "12px 20px",
                    borderRadius: "10px",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  Next Message →
                </button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
