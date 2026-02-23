import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const MOCK_USER = {
  firstName: "Erik",
  lastName: "Lindqvist",
  email: "erik.lindqvist@gmail.com",
  phone: "+46 70 123 45 67",
  dob: "1990-05-14",
  gender: "Male",
  role: "both",
  joinDate: "January 2024",
  verified: true,
  bankid: true,
  rating: 4.9,
  totalTrips: 87,
  totalAsDriver: 52,
  totalAsPassenger: 35,
  bio: "Hey! I'm Erik, based in Stockholm. I drive to Göteborg regularly for work every Monday. Love good music and friendly conversations. Non-smoker, pet-friendly!",
  languages: ["Swedish", "English"],
  city: "Stockholm",
  photo: null,
};

const MOCK_REVIEWS = [
  { id: 1, author: "Anna S.", avatar: "AS", color: "#8b5cf6", rating: 5, date: "Feb 2026", comment: "Erik is a fantastic driver! Very punctual, clean car, great music taste. Highly recommend!", role: "Driver" },
  { id: 2, author: "Magnus B.", avatar: "MB", color: "#06b6d4", rating: 5, date: "Jan 2026", comment: "Super smooth ride from Stockholm to Malmö. Erik was friendly and drove safely the whole way.", role: "Driver" },
  { id: 3, author: "Sofia K.", avatar: "SK", color: "#10b981", rating: 4, date: "Jan 2026", comment: "Good passenger, was on time and polite. Would ride with again!", role: "Passenger" },
  { id: 4, author: "Lars N.", avatar: "LN", color: "#f59e0b", rating: 5, date: "Dec 2025", comment: "Very reliable. We left exactly on time and arrived early. The car was spotless.", role: "Driver" },
];

const MOCK_RIDES = [
  { id: 1, from: "Stockholm", to: "Göteborg", date: "2026-03-01", time: "08:00", seats: 3, price: 249, status: "upcoming" },
  { id: 2, from: "Stockholm", to: "Malmö",    date: "2026-02-15", time: "09:00", seats: 2, price: 299, status: "completed" },
  { id: 3, from: "Uppsala",   to: "Stockholm", date: "2026-02-10", time: "07:30", seats: 1, price: 99,  status: "completed" },
];

export default function UserProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(MOCK_USER);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({ ...MOCK_USER });
  const [activeTab, setActiveTab] = useState("about");
  const [photoHover, setPhotoHover] = useState(false);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setUser(u => ({ ...u, photo: ev.target.result }));
    reader.readAsDataURL(file);
  };

  const saveEdit = () => {
    setUser({ ...user, ...editForm });
    setEditing(false);
  };

  const inputStyle = {
    border: "2px solid #e8edf2", borderRadius: 12, padding: "12px 16px",
    fontSize: 14, fontWeight: 500, color: "#1e293b", fontFamily: "inherit",
    outline: "none", width: "100%", background: "#f8fafc", boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  const stars = (n) => Array.from({ length: 5 }, (_, i) => (
    <i key={i} className={`fa-${i < Math.floor(n) ? "solid" : i < n ? "solid" : "regular"} fa-star`}
      style={{ color: i < n ? "#f59e0b" : "#e2e8f0", fontSize: 13 }} />
  ));

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .profile-anim { animation: fadeUp 0.4s ease both; }

        .tab-btn {
          padding: 12px 24px; border-radius: 999px;
          border: none; background: transparent;
          font-size: 14px; font-weight: 600; cursor: pointer;
          color: #64748b; transition: all 0.2s; font-family: inherit;
        }
        .tab-btn.active {
          background: linear-gradient(135deg,#f43f8e,#e11d68);
          color: white; box-shadow: 0 4px 16px rgba(244,63,142,0.35);
        }
        .tab-btn:hover:not(.active) { background: #f8fafc; color: #1e293b; }

        .badge {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 6px 14px; border-radius: 999px;
          font-size: 12px; font-weight: 700;
        }
        .edit-input:focus { border-color: #f43f8e !important; background: white !important; }

        .ride-chip {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 4px 12px; border-radius: 999px; font-size: 11px; font-weight: 700;
        }
        .save-btn {
          padding: 14px 32px;
          background: linear-gradient(135deg,#f43f8e,#e11d68);
          color: white; border: none; border-radius: 14px;
          font-size: 15px; font-weight: 700; cursor: pointer;
          box-shadow: 0 6px 20px rgba(244,63,142,0.4);
          transition: transform 0.2s; font-family: inherit;
        }
        .save-btn:hover { transform: translateY(-2px); }
        .stat-card {
          flex: 1; background: white; border-radius: 18px;
          padding: 20px; text-align: center;
          border: 2px solid #f1f5f9;
          box-shadow: 0 4px 16px rgba(0,0,0,0.04);
          transition: all 0.2s;
        }
        .stat-card:hover { border-color: #f43f8e; transform: translateY(-2px); }
      `}</style>

      <div className="w-full min-h-screen" style={{ background: "#f8fafc" }}>
        <NavBar />

        {/* ── HERO BANNER ── */}
        <div style={{
          background: "linear-gradient(135deg, #0a0f1e 0%, #1a0a2e 60%, #0a0f1e 100%)",
          paddingTop: 80, paddingBottom: 0, position: "relative", overflow: "hidden"
        }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
          <div style={{ position: "absolute", top: "10%", left: "5%", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle,rgba(190,40,110,0.4),transparent)", filter: "blur(2px)" }} />
          <div style={{ position: "absolute", bottom: 0, right: "5%", width: 160, height: 160, borderRadius: "50%", background: "radial-gradient(circle,rgba(25,80,210,0.35),transparent)", filter: "blur(2px)" }} />

          <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px 0", position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 28, flexWrap: "wrap" }}>

              {/* ── AVATAR / PHOTO ── */}
              <div style={{ position: "relative", flexShrink: 0 }}
                onMouseEnter={() => setPhotoHover(true)}
                onMouseLeave={() => setPhotoHover(false)}>
                <div style={{
                  width: 110, height: 110, borderRadius: "50%",
                  background: user.photo ? "transparent" : "linear-gradient(135deg,#f43f8e,#e11d68)",
                  border: "4px solid rgba(255,255,255,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  overflow: "hidden", boxShadow: "0 8px 32px rgba(244,63,142,0.4)",
                  cursor: "pointer", transition: "all 0.2s",
                  filter: photoHover ? "brightness(0.7)" : "none",
                }}>
                  {user.photo
                    ? <img src={user.photo} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    : <span style={{ color: "white", fontSize: 36, fontWeight: 800 }}>
                        {user.firstName[0]}{user.lastName[0]}
                      </span>
                  }
                </div>

                {/* Upload overlay */}
                <label style={{
                  position: "absolute", inset: 0, borderRadius: "50%",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", opacity: photoHover ? 1 : 0, transition: "opacity 0.2s",
                }}>
                  <i className="fa-solid fa-camera" style={{ color: "white", fontSize: 20, marginBottom: 4 }} />
                  <span style={{ color: "white", fontSize: 10, fontWeight: 700 }}>
                    {user.photo ? "Change" : "Add Photo"}
                  </span>
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: "none" }} />
                </label>

                {/* Optional label when no photo */}
                {!user.photo && !photoHover && (
                  <div style={{
                    position: "absolute", bottom: -4, left: "50%", transform: "translateX(-50%)",
                    background: "rgba(255,255,255,0.15)", borderRadius: 999,
                    padding: "2px 8px", whiteSpace: "nowrap"
                  }}>
                    <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 9, fontWeight: 600 }}>OPTIONAL</span>
                  </div>
                )}
              </div>

              {/* Name & badges */}
              <div style={{ flex: 1, paddingBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
                  <h1 style={{ color: "white", fontSize: "1.8rem", fontWeight: 800, margin: 0 }}>
                    {user.firstName} {user.lastName}
                  </h1>
                  {user.verified && (
                    <span className="badge" style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)", color: "#86efac" }}>
                      <i className="fa-solid fa-circle-check" style={{ fontSize: 11 }} /> Verified
                    </span>
                  )}
                  {user.bankid && (
                    <span className="badge" style={{ background: "rgba(244,63,142,0.15)", border: "1px solid rgba(244,63,142,0.3)", color: "#f9a8d4" }}>
                      <i className="fa-solid fa-shield-halved" style={{ fontSize: 11 }} /> BankID
                    </span>
                  )}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                  {stars(user.rating)}
                  <span style={{ color: "white", fontWeight: 700, fontSize: 15, marginLeft: 4 }}>{user.rating}</span>
                  <span style={{ color: "#64748b", fontSize: 13 }}>({user.totalTrips} trips)</span>
                </div>

                <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                  <span style={{ color: "#64748b", fontSize: 13 }}>
                    <i className="fa-solid fa-location-dot" style={{ color: "#f43f8e", marginRight: 6 }} />{user.city}
                  </span>
                  <span style={{ color: "#64748b", fontSize: 13 }}>
                    <i className="fa-solid fa-calendar" style={{ color: "#f43f8e", marginRight: 6 }} />Member since {user.joinDate}
                  </span>
                  <span style={{ color: "#64748b", fontSize: 13 }}>
                    <i className="fa-solid fa-{user.role === 'driver' ? 'car' : user.role === 'passenger' ? 'user' : 'users'}" style={{ color: "#f43f8e", marginRight: 6 }} />
                    <i className="fa-solid fa-users" style={{ color: "#f43f8e", marginRight: 6 }} />
                    {user.role === "both" ? "Driver & Passenger" : user.role === "driver" ? "Driver" : "Passenger"}
                  </span>
                </div>
              </div>

              {/* Edit button */}
              <div style={{ paddingBottom: 24 }}>
                <button onClick={() => { setEditForm({ ...user }); setEditing(true); }} style={{
                  padding: "12px 24px", background: "rgba(255,255,255,0.1)",
                  border: "1.5px solid rgba(255,255,255,0.2)", borderRadius: 14,
                  color: "white", fontWeight: 700, fontSize: 14, cursor: "pointer",
                  transition: "all 0.2s", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 8
                }}>
                  <i className="fa-solid fa-pen" style={{ fontSize: 13 }} /> Edit Profile
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", gap: 4, marginTop: 8 }}>
              {[
                { key: "about",   label: "About",        icon: "fa-user"        },
                { key: "rides",   label: "My Rides",     icon: "fa-car"         },
                { key: "reviews", label: "Reviews",      icon: "fa-star"        },
              ].map(t => (
                <button key={t.key} className={`tab-btn ${activeTab === t.key ? "active" : ""}`}
                  onClick={() => setActiveTab(t.key)}>
                  <i className={`fa-solid ${t.icon}`} style={{ marginRight: 7, fontSize: 12 }} />
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px 60px" }}>

          {/* Stats row */}
          <div className="profile-anim" style={{ display: "flex", gap: 16, marginBottom: 28, flexWrap: "wrap" }}>
            {[
              { icon: "fa-route",      value: user.totalTrips,        label: "Total Trips",       color: "#f43f8e" },
              { icon: "fa-car",        value: user.totalAsDriver,     label: "As Driver",         color: "#8b5cf6" },
              { icon: "fa-user",       value: user.totalAsPassenger,  label: "As Passenger",      color: "#06b6d4" },
              { icon: "fa-star",       value: user.rating,            label: "Rating",            color: "#f59e0b" },
            ].map(s => (
              <div key={s.label} className="stat-card">
                <i className={`fa-solid ${s.icon}`} style={{ color: s.color, fontSize: 22, marginBottom: 10, display: "block" }} />
                <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#1e293b" }}>{s.value}</div>
                <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* ── ABOUT TAB ── */}
          {activeTab === "about" && (
            <div className="profile-anim" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

              {/* Bio */}
              <div style={{ gridColumn: "1 / -1", background: "white", borderRadius: 20, padding: "28px 32px", border: "2px solid #f1f5f9", boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }}>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "#1e293b", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                  <i className="fa-solid fa-quote-left" style={{ color: "#f43f8e" }} /> About Me
                </h3>
                <p style={{ color: "#64748b", fontSize: 15, lineHeight: 1.7, margin: 0 }}>
                  {user.bio || <span style={{ color: "#cbd5e1", fontStyle: "italic" }}>No bio added yet. Click Edit Profile to add one.</span>}
                </p>
              </div>

              {/* Personal details */}
              <div style={{ background: "white", borderRadius: 20, padding: "28px 32px", border: "2px solid #f1f5f9", boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }}>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "#1e293b", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
                  <i className="fa-solid fa-id-card" style={{ color: "#f43f8e" }} /> Personal Details
                </h3>
                {[
                  { icon: "fa-envelope",    label: "Email",    value: user.email    },
                  { icon: "fa-phone",       label: "Phone",    value: user.phone    },
                  { icon: "fa-location-dot",label: "City",     value: user.city     },
                  { icon: "fa-venus-mars",  label: "Gender",   value: user.gender   },
                  { icon: "fa-language",    label: "Languages",value: user.languages.join(", ") },
                ].map(row => (
                  <div key={row.label} style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 0", borderBottom: "1px solid #f8fafc" }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: "#fff0f7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <i className={`fa-solid ${row.icon}`} style={{ color: "#f43f8e", fontSize: 14 }} />
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>{row.label}</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>{row.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Preferences */}
              <div style={{ background: "white", borderRadius: 20, padding: "28px 32px", border: "2px solid #f1f5f9", boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }}>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "#1e293b", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
                  <i className="fa-solid fa-sliders" style={{ color: "#f43f8e" }} /> Travel Preferences
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { icon: "fa-smoking-ban", label: "No Smoking",    active: true  },
                    { icon: "fa-paw",          label: "Pets Welcome",  active: true  },
                    { icon: "fa-music",         label: "Music On",      active: true  },
                    { icon: "fa-comments",      label: "Loves to Chat", active: true  },
                  ].map(p => (
                    <div key={p.label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: p.active ? "#fff0f7" : "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <i className={`fa-solid ${p.icon}`} style={{ color: p.active ? "#f43f8e" : "#cbd5e1", fontSize: 14 }} />
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 600, color: p.active ? "#1e293b" : "#94a3b8" }}>{p.label}</span>
                      {p.active && <i className="fa-solid fa-check" style={{ color: "#22c55e", fontSize: 12, marginLeft: "auto" }} />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Verifications */}
              <div style={{ gridColumn: "1 / -1", background: "white", borderRadius: 20, padding: "28px 32px", border: "2px solid #f1f5f9", boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }}>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "#1e293b", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
                  <i className="fa-solid fa-shield-halved" style={{ color: "#f43f8e" }} /> Verifications
                </h3>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                  {[
                    { icon: "fa-envelope",      label: "Email",    done: true  },
                    { icon: "fa-phone",          label: "Phone",    done: true  },
                    { icon: "fa-shield-halved",  label: "BankID",   done: true  },
                    { icon: "fa-camera",         label: "Photo",    done: !!user.photo },
                  ].map(v => (
                    <div key={v.label} style={{
                      display: "flex", alignItems: "center", gap: 10, padding: "14px 20px",
                      borderRadius: 14, border: `2px solid ${v.done ? "#bbf7d0" : "#e8edf2"}`,
                      background: v.done ? "#f0fdf4" : "#f8fafc", flex: "1 1 160px"
                    }}>
                      <i className={`fa-solid ${v.icon}`} style={{ color: v.done ? "#22c55e" : "#cbd5e1", fontSize: 18 }} />
                      <span style={{ fontWeight: 700, fontSize: 14, color: v.done ? "#15803d" : "#94a3b8" }}>{v.label}</span>
                      {v.done
                        ? <i className="fa-solid fa-circle-check" style={{ color: "#22c55e", marginLeft: "auto", fontSize: 16 }} />
                        : <span style={{ color: "#94a3b8", fontSize: 11, marginLeft: "auto", fontWeight: 600 }}>Pending</span>
                      }
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── RIDES TAB ── */}
          {activeTab === "rides" && (
            <div className="profile-anim">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: "#1e293b", margin: 0 }}>My Rides</h3>
                <button onClick={() => navigate("/post-ride")} style={{
                  padding: "10px 22px", background: "linear-gradient(135deg,#f43f8e,#e11d68)",
                  color: "white", border: "none", borderRadius: 12, fontWeight: 700,
                  fontSize: 14, cursor: "pointer", fontFamily: "inherit"
                }}>
                  <i className="fa-solid fa-plus" style={{ marginRight: 7 }} />Post a Ride
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {MOCK_RIDES.map(ride => (
                  <div key={ride.id} style={{
                    background: "white", borderRadius: 18, padding: "22px 28px",
                    border: "2px solid #f1f5f9", boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                    display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap"
                  }}>
                    {/* Status dot */}
                    <div style={{
                      width: 10, height: 10, borderRadius: "50%", flexShrink: 0,
                      background: ride.status === "upcoming" ? "#22c55e" : "#94a3b8"
                    }} />

                    {/* Route */}
                    <div style={{ flex: 1, minWidth: 180 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontWeight: 800, fontSize: 16, color: "#1e293b" }}>{ride.from}</span>
                        <i className="fa-solid fa-arrow-right" style={{ color: "#f43f8e", fontSize: 12 }} />
                        <span style={{ fontWeight: 800, fontSize: 16, color: "#1e293b" }}>{ride.to}</span>
                      </div>
                      <span style={{ fontSize: 13, color: "#94a3b8" }}>
                        <i className="fa-solid fa-calendar" style={{ marginRight: 6, color: "#f43f8e" }} />
                        {ride.date} at {ride.time}
                      </span>
                    </div>

                    <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600 }}>SEATS</div>
                        <div style={{ fontWeight: 800, color: "#1e293b" }}>{ride.seats}</div>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600 }}>PRICE</div>
                        <div style={{ fontWeight: 800, color: "#f43f8e" }}>{ride.price} SEK</div>
                      </div>
                      <span className="ride-chip" style={{
                        background: ride.status === "upcoming" ? "#f0fdf4" : "#f8fafc",
                        color: ride.status === "upcoming" ? "#15803d" : "#64748b",
                        border: `1.5px solid ${ride.status === "upcoming" ? "#bbf7d0" : "#e8edf2"}`
                      }}>
                        <i className={`fa-solid ${ride.status === "upcoming" ? "fa-clock" : "fa-check"}`} style={{ fontSize: 10 }} />
                        {ride.status === "upcoming" ? "Upcoming" : "Completed"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── REVIEWS TAB ── */}
          {activeTab === "reviews" && (
            <div className="profile-anim">
              {/* Overall rating */}
              <div style={{ background: "white", borderRadius: 20, padding: "28px 32px", marginBottom: 20, border: "2px solid #f1f5f9", boxShadow: "0 4px 16px rgba(0,0,0,0.04)", display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "3.5rem", fontWeight: 900, color: "#1e293b", lineHeight: 1 }}>{user.rating}</div>
                  <div style={{ display: "flex", gap: 3, justifyContent: "center", margin: "8px 0" }}>{stars(user.rating)}</div>
                  <div style={{ fontSize: 13, color: "#94a3b8", fontWeight: 600 }}>{MOCK_REVIEWS.length} reviews</div>
                </div>
                <div style={{ flex: 1, minWidth: 200 }}>
                  {[5,4,3,2,1].map(n => {
                    const count = MOCK_REVIEWS.filter(r => r.rating === n).length;
                    const pct = Math.round((count / MOCK_REVIEWS.length) * 100);
                    return (
                      <div key={n} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                        <span style={{ fontSize: 12, color: "#64748b", fontWeight: 600, width: 8 }}>{n}</span>
                        <i className="fa-solid fa-star" style={{ color: "#f59e0b", fontSize: 11 }} />
                        <div style={{ flex: 1, height: 8, background: "#f1f5f9", borderRadius: 4, overflow: "hidden" }}>
                          <div style={{ width: `${pct}%`, height: "100%", background: "linear-gradient(90deg,#f43f8e,#e11d68)", borderRadius: 4, transition: "width 0.5s ease" }} />
                        </div>
                        <span style={{ fontSize: 12, color: "#94a3b8", width: 28 }}>{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {MOCK_REVIEWS.map((r, idx) => (
                  <div key={r.id} style={{
                    background: "white", borderRadius: 18, padding: "22px 28px",
                    border: "2px solid #f1f5f9", boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                    animationDelay: `${idx * 0.08}s`
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
                      <div style={{ width: 44, height: 44, borderRadius: "50%", background: r.color, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: 14, flexShrink: 0 }}>
                        {r.avatar}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ fontWeight: 700, fontSize: 15, color: "#1e293b" }}>{r.author}</span>
                          <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 999, background: "#fff0f7", color: "#f43f8e" }}>
                            {r.role}
                          </span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                          {stars(r.rating)}
                          <span style={{ fontSize: 12, color: "#94a3b8", marginLeft: 4 }}>{r.date}</span>
                        </div>
                      </div>
                    </div>
                    <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.6, margin: 0, paddingLeft: 58 }}>
                      "{r.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── EDIT MODAL ── */}
      {editing && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
          onClick={() => setEditing(false)}>
          <div style={{ background: "white", borderRadius: 28, padding: "44px 48px", maxWidth: 560, width: "100%", boxShadow: "0 40px 100px rgba(0,0,0,0.4)", maxHeight: "90vh", overflowY: "auto" }}
            onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#1e293b", margin: 0 }}>Edit Profile</h2>
              <button onClick={() => setEditing(false)} style={{ background: "#f8fafc", border: "none", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", fontSize: 16, color: "#64748b" }}>✕</button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              {[
                { key: "firstName", label: "First Name", placeholder: "Erik" },
                { key: "lastName",  label: "Last Name",  placeholder: "Lindqvist" },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#64748b", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>{f.label}</label>
                  <input className="edit-input" style={inputStyle} placeholder={f.placeholder}
                    value={editForm[f.key]} onChange={e => setEditForm(ef => ({ ...ef, [f.key]: e.target.value }))} />
                </div>
              ))}
            </div>

            {[
              { key: "email", label: "Email", type: "email", placeholder: "you@example.com" },
              { key: "phone", label: "Phone", type: "text",  placeholder: "+46 70 123 45 67" },
              { key: "city",  label: "City",  type: "text",  placeholder: "Stockholm" },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#64748b", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>{f.label}</label>
                <input className="edit-input" style={inputStyle} type={f.type} placeholder={f.placeholder}
                  value={editForm[f.key]} onChange={e => setEditForm(ef => ({ ...ef, [f.key]: e.target.value }))} />
              </div>
            ))}

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#64748b", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>About Me</label>
              <textarea className="edit-input" rows={4} placeholder="Tell passengers and drivers about yourself..."
                value={editForm.bio} onChange={e => setEditForm(ef => ({ ...ef, bio: e.target.value }))}
                style={{ ...inputStyle, resize: "vertical" }} />
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => setEditing(false)} style={{ padding: "14px 28px", background: "transparent", color: "#64748b", border: "2px solid #e8edf2", borderRadius: 14, fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>
                Cancel
              </button>
              <button className="save-btn" onClick={saveEdit} style={{ flex: 1 }}>
                <i className="fa-solid fa-check" style={{ marginRight: 8 }} />Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}