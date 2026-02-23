import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

// Mock ride data — Swedish cities only
const MOCK_RIDES = [
  {
    id: 1, from: "Stockholm", to: "Göteborg", date: "2026-03-01", time: "08:00",
    price: 249, seats: 3, driver: "Erik Lindqvist", rating: 4.9, trips: 87,
    car: "Volvo XC60", carColor: "Silver", prefs: { smoking: false, pets: true, music: true, chat: true },
    duration: "2h 55m", avatar: "EL", verified: true, luggage: "large",
  },
  {
    id: 2, from: "Stockholm", to: "Göteborg", date: "2026-03-01", time: "09:30",
    price: 199, seats: 1, driver: "Anna Svensson", rating: 4.7, trips: 43,
    car: "Toyota Prius", carColor: "White", prefs: { smoking: false, pets: false, music: false, chat: true },
    duration: "3h 05m", avatar: "AS", verified: true, luggage: "medium",
  },
  {
    id: 3, from: "Stockholm", to: "Göteborg", date: "2026-03-01", time: "11:00",
    price: 179, seats: 2, driver: "Magnus Björk", rating: 4.5, trips: 21,
    car: "Volkswagen Golf", carColor: "Blue", prefs: { smoking: false, pets: false, music: true, chat: false },
    duration: "3h 10m", avatar: "MB", verified: false, luggage: "small",
  },
  {
    id: 4, from: "Stockholm", to: "Göteborg", date: "2026-03-01", time: "13:00",
    price: 299, seats: 4, driver: "Sofia Karlsson", rating: 5.0, trips: 134,
    car: "Tesla Model 3", carColor: "Black", prefs: { smoking: false, pets: true, music: true, chat: true },
    duration: "2h 50m", avatar: "SK", verified: true, luggage: "large",
  },
  {
    id: 5, from: "Stockholm", to: "Göteborg", date: "2026-03-01", time: "15:30",
    price: 149, seats: 2, driver: "Lars Nilsson", rating: 4.3, trips: 12,
    car: "SAAB 9-3", carColor: "Grey", prefs: { smoking: true, pets: false, music: false, chat: false },
    duration: "3h 20m", avatar: "LN", verified: false, luggage: "medium",
  },
];

const AVATAR_COLORS = ["#f43f8e", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"];

export default function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = location.state || {};

  const [from, setFrom] = useState(params.from || "Stockholm");
  const [to, setTo]     = useState(params.to   || "Göteborg");
  const [date, setDate] = useState(params.date || "2026-03-01");
  const [passengers]    = useState(params.passengers || 1);

  const [sortBy, setSortBy]       = useState("price");
  const [filterMax, setFilterMax] = useState(500);
  const [filterVerified, setFilterVerified] = useState(false);
  const [filterPets, setFilterPets]         = useState(false);
  const [filterNoSmoke, setFilterNoSmoke]   = useState(false);
  const [selectedRide, setSelectedRide]     = useState(null);

  const filtered = MOCK_RIDES
    .filter(r => !filterVerified || r.verified)
    .filter(r => !filterPets    || r.prefs.pets)
    .filter(r => !filterNoSmoke || !r.prefs.smoking)
    .filter(r => r.price <= filterMax)
    .filter(r => r.seats >= passengers)
    .sort((a, b) => {
      if (sortBy === "price")  return a.price - b.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "time")   return a.time.localeCompare(b.time);
      return 0;
    });

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .ride-card {
          background: white;
          border-radius: 20px;
          border: 2px solid #f1f5f9;
          padding: 28px 32px;
          transition: all 0.25s;
          cursor: pointer;
          animation: fadeUp 0.4s ease both;
        }
        .ride-card:hover {
          border-color: #f43f8e;
          box-shadow: 0 12px 40px rgba(244,63,142,0.12);
          transform: translateY(-2px);
        }
        .ride-card.selected {
          border-color: #f43f8e;
          box-shadow: 0 12px 40px rgba(244,63,142,0.2);
        }
        .filter-chip {
          display: flex; align-items: center; gap: 8px;
          padding: 10px 18px; border-radius: 999px;
          border: 2px solid #e8edf2; background: white;
          font-size: 13px; font-weight: 600; color: #64748b;
          cursor: pointer; transition: all 0.2s; white-space: nowrap;
        }
        .filter-chip.on {
          border-color: #f43f8e; background: #fff0f7; color: #f43f8e;
        }
        .sort-btn {
          padding: 10px 20px; border-radius: 999px;
          border: 2px solid #e8edf2; background: white;
          font-size: 13px; font-weight: 600; color: #64748b;
          cursor: pointer; transition: all 0.2s;
        }
        .sort-btn.active {
          border-color: #1e293b; background: #1e293b; color: white;
        }
        .book-btn {
          padding: 14px 32px;
          background: linear-gradient(135deg, #f43f8e, #e11d68);
          color: white; border: none; border-radius: 14px;
          font-size: 15px; font-weight: 700; cursor: pointer;
          box-shadow: 0 6px 20px rgba(244,63,142,0.4);
          transition: transform 0.2s, box-shadow 0.2s;
          white-space: nowrap;
        }
        .book-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(244,63,142,0.5);
        }
        .search-bar-field {
          display: flex; align-items: center; gap: 10px;
          background: white; border: 2px solid #e8edf2;
          border-radius: 14px; padding: 12px 18px;
          transition: border-color 0.2s;
        }
        .search-bar-field:focus-within { border-color: #f43f8e; }
        .search-bar-field input {
          border: none; outline: none; background: transparent;
          font-size: 14px; font-weight: 600; color: #1e293b;
          font-family: inherit; width: 120px;
        }
        .pref-dot {
          width: 28px; height: 28px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px;
        }
        .modal-overlay {
          position: fixed; inset: 0; z-index: 200;
          background: rgba(0,0,0,0.5); backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
        }
        .modal-box {
          background: white; border-radius: 28px;
          padding: 48px; max-width: 520px; width: 100%;
          box-shadow: 0 40px 100px rgba(0,0,0,0.4);
          animation: fadeUp 0.3s ease both;
        }
      `}</style>

      <div className="w-full min-h-screen" style={{ background: "#f8fafc" }}>
        <NavBar />

        {/* ── TOP SEARCH BAR ── */}
        <div style={{
          background: "#0a0f1e", paddingTop: 80,
          paddingBottom: 24, paddingLeft: 24, paddingRight: 24
        }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 12,
              flexWrap: "wrap", paddingTop: 20
            }}>
              {/* From */}
              <div className="search-bar-field">
                <i className="fa-solid fa-location-dot" style={{ color: "#f43f8e", fontSize: 14 }} />
                <input value={from} onChange={e => setFrom(e.target.value)} placeholder="From" />
              </div>

              {/* Arrow */}
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: "linear-gradient(135deg,#f43f8e,#e11d68)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, boxShadow: "0 4px 14px rgba(244,63,142,0.4)"
              }}>
                <i className="fa-solid fa-arrow-right" style={{ color: "white", fontSize: 13 }} />
              </div>

              {/* To */}
              <div className="search-bar-field">
                <i className="fa-solid fa-location-arrow" style={{ color: "#f43f8e", fontSize: 14 }} />
                <input value={to} onChange={e => setTo(e.target.value)} placeholder="To" />
              </div>

              {/* Date */}
              <div className="search-bar-field">
                <i className="fa-solid fa-calendar" style={{ color: "#f43f8e", fontSize: 14 }} />
                <input type="date" value={date} onChange={e => setDate(e.target.value)}
                  style={{ width: 140 }} />
              </div>

              {/* Passengers */}
              <div className="search-bar-field">
                <i className="fa-solid fa-user" style={{ color: "#f43f8e", fontSize: 14 }} />
                <input value={`${passengers} passenger${passengers > 1 ? "s" : ""}`}
                  readOnly style={{ width: 110, cursor: "default" }} />
              </div>

              {/* Search */}
              <button className="book-btn" style={{ padding: "13px 28px" }}>
                <i className="fa-solid fa-magnifying-glass" style={{ marginRight: 8 }} />
                Search
              </button>
            </div>
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px", display: "flex", gap: 28, alignItems: "flex-start" }}>

          {/* ── LEFT: FILTERS ── */}
          <div style={{
            width: 260, flexShrink: 0, background: "white",
            borderRadius: 20, padding: "28px 24px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)", position: "sticky", top: 100
          }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: "#1e293b", marginBottom: 24, margin: "0 0 24px" }}>
              <i className="fa-solid fa-sliders" style={{ color: "#f43f8e", marginRight: 8 }} />
              Filters
            </h3>

            {/* Max Price */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 1 }}>Max Price</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: "#f43f8e" }}>{filterMax} SEK</span>
              </div>
              <input type="range" min={50} max={500} step={10} value={filterMax}
                onChange={e => setFilterMax(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#f43f8e" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#94a3b8", marginTop: 4 }}>
                <span>50 SEK</span><span>500 SEK</span>
              </div>
            </div>

            <div style={{ height: 1, background: "#f1f5f9", margin: "20px 0" }} />

            {/* Toggles */}
            <div style={{ fontSize: 13, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 1, marginBottom: 14 }}>Preferences</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "Verified drivers only", icon: "fa-shield-halved", state: filterVerified, set: setFilterVerified },
                { label: "Pets allowed",          icon: "fa-paw",           state: filterPets,     set: setFilterPets     },
                { label: "No smoking",            icon: "fa-smoking-ban",   state: filterNoSmoke,  set: setFilterNoSmoke  },
              ].map(f => (
                <div key={f.label}
                  onClick={() => f.set(s => !s)}
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "12px 14px", borderRadius: 12, cursor: "pointer",
                    border: "2px solid", transition: "all 0.2s",
                    borderColor: f.state ? "#f43f8e" : "#e8edf2",
                    background: f.state ? "#fff0f7" : "#f8fafc",
                  }}>
                  <i className={`fa-solid ${f.icon}`} style={{ color: f.state ? "#f43f8e" : "#94a3b8", fontSize: 14, width: 16 }} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: f.state ? "#f43f8e" : "#64748b", flex: 1 }}>{f.label}</span>
                  {f.state && <i className="fa-solid fa-check" style={{ color: "#f43f8e", fontSize: 12 }} />}
                </div>
              ))}
            </div>

            <div style={{ height: 1, background: "#f1f5f9", margin: "20px 0" }} />

            {/* Reset */}
            <button onClick={() => { setFilterMax(500); setFilterVerified(false); setFilterPets(false); setFilterNoSmoke(false); }}
              style={{
                width: "100%", padding: "12px", borderRadius: 12,
                border: "2px solid #e8edf2", background: "white",
                color: "#64748b", fontWeight: 600, fontSize: 13,
                cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s"
              }}>
              <i className="fa-solid fa-rotate-left" style={{ marginRight: 6 }} />
              Reset Filters
            </button>
          </div>

          {/* ── RIGHT: RESULTS ── */}
          <div style={{ flex: 1, minWidth: 0 }}>

            {/* Results header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
              <div>
                <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#1e293b", margin: 0 }}>
                  {from} → {to}
                </h2>
                <p style={{ color: "#94a3b8", fontSize: 13, margin: "4px 0 0" }}>
                  {filtered.length} ride{filtered.length !== 1 ? "s" : ""} found · {new Date(date).toLocaleDateString("sv-SE", { weekday: "long", day: "numeric", month: "long" })}
                </p>
              </div>
              {/* Sort */}
              <div style={{ display: "flex", gap: 8 }}>
                {[
                  { key: "price",  label: "Cheapest" },
                  { key: "rating", label: "Top Rated" },
                  { key: "time",   label: "Earliest" },
                ].map(s => (
                  <button key={s.key} className={`sort-btn ${sortBy === s.key ? "active" : ""}`}
                    onClick={() => setSortBy(s.key)}>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* No results */}
            {filtered.length === 0 && (
              <div style={{
                background: "white", borderRadius: 20, padding: "60px 40px",
                textAlign: "center", border: "2px dashed #e8edf2"
              }}>
                <i className="fa-solid fa-car-side" style={{ fontSize: 48, color: "#e8edf2", marginBottom: 16, display: "block" }} />
                <h3 style={{ color: "#1e293b", fontWeight: 700, marginBottom: 8 }}>No rides found</h3>
                <p style={{ color: "#94a3b8", fontSize: 14 }}>Try adjusting your filters or search for a different date.</p>
              </div>
            )}

            {/* Ride Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {filtered.map((ride, idx) => (
                <div key={ride.id}
                  className={`ride-card ${selectedRide?.id === ride.id ? "selected" : ""}`}
                  style={{ animationDelay: `${idx * 0.08}s` }}
                  onClick={() => setSelectedRide(ride)}>

                  <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>

                    {/* Avatar */}
                    <div style={{
                      width: 52, height: 52, borderRadius: "50%", flexShrink: 0,
                      background: AVATAR_COLORS[ride.id % AVATAR_COLORS.length],
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "white", fontWeight: 800, fontSize: 16, position: "relative"
                    }}>
                      {ride.avatar}
                      {ride.verified && (
                        <div style={{
                          position: "absolute", bottom: -2, right: -2,
                          width: 18, height: 18, borderRadius: "50%",
                          background: "#22c55e", border: "2px solid white",
                          display: "flex", alignItems: "center", justifyContent: "center"
                        }}>
                          <i className="fa-solid fa-check" style={{ color: "white", fontSize: 9 }} />
                        </div>
                      )}
                    </div>

                    {/* Driver info */}
                    <div style={{ minWidth: 120 }}>
                      <div style={{ fontWeight: 700, fontSize: 15, color: "#1e293b" }}>{ride.driver}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                        <i className="fa-solid fa-star" style={{ color: "#f59e0b", fontSize: 12 }} />
                        <span style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}>{ride.rating}</span>
                        <span style={{ fontSize: 12, color: "#94a3b8" }}>({ride.trips} trips)</span>
                      </div>
                      <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>{ride.car} · {ride.carColor}</div>
                    </div>

                    {/* Route */}
                    <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 12, minWidth: 200 }}>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 18, fontWeight: 800, color: "#1e293b" }}>{ride.time}</div>
                        <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500 }}>{ride.from}</div>
                      </div>
                      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                        <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>{ride.duration}</span>
                        <div style={{ width: "100%", display: "flex", alignItems: "center", gap: 4 }}>
                          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#f43f8e", flexShrink: 0 }} />
                          <div style={{ flex: 1, height: 2, background: "linear-gradient(90deg,#f43f8e,#e11d68)" }} />
                          <i className="fa-solid fa-location-dot" style={{ color: "#e11d68", fontSize: 14, flexShrink: 0 }} />
                        </div>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 18, fontWeight: 800, color: "#1e293b" }}>
                          {/* Estimate arrival */}
                          {(() => {
                            const [h, m] = ride.time.split(":").map(Number);
                            const dur = parseInt(ride.duration);
                            const arr = new Date(2000, 0, 1, h, m + dur * 60 / 60);
                            return `${String(arr.getHours()).padStart(2,"0")}:${String(arr.getMinutes()).padStart(2,"0")}`;
                          })()}
                        </div>
                        <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500 }}>{ride.to}</div>
                      </div>
                    </div>

                    {/* Prefs */}
                    <div style={{ display: "flex", gap: 6 }}>
                      {[
                        { icon: "fa-smoking-ban", active: !ride.prefs.smoking, tip: "No smoking" },
                        { icon: "fa-paw",          active: ride.prefs.pets,    tip: "Pets OK"    },
                        { icon: "fa-music",         active: ride.prefs.music,   tip: "Music"      },
                        { icon: "fa-comments",      active: ride.prefs.chat,    tip: "Chat"       },
                      ].map(p => (
                        <div key={p.icon} className="pref-dot" title={p.tip}
                          style={{ background: p.active ? "#fff0f7" : "#f8fafc" }}>
                          <i className={`fa-solid ${p.icon}`}
                            style={{ color: p.active ? "#f43f8e" : "#cbd5e1", fontSize: 11 }} />
                        </div>
                      ))}
                    </div>

                    {/* Seats & Price */}
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#1e293b" }}>
                        {ride.price} <span style={{ fontSize: 14, fontWeight: 600, color: "#94a3b8" }}>SEK</span>
                      </div>
                      <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 10 }}>
                        <i className="fa-solid fa-chair" style={{ marginRight: 4 }} />
                        {ride.seats} seat{ride.seats > 1 ? "s" : ""} left
                      </div>
                      <button className="book-btn" style={{ padding: "10px 22px", fontSize: 14 }}
                        onClick={e => { e.stopPropagation(); setSelectedRide(ride); }}>
                        Book
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── BOOKING MODAL ── */}
      {selectedRide && (
        <div className="modal-overlay" onClick={() => setSelectedRide(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
              <div>
                <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#1e293b", margin: 0 }}>Confirm Booking</h2>
                <p style={{ color: "#94a3b8", fontSize: 14, marginTop: 4 }}>Review your ride details</p>
              </div>
              <button onClick={() => setSelectedRide(null)}
                style={{ background: "#f8fafc", border: "none", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", fontSize: 16, color: "#64748b" }}>
                ✕
              </button>
            </div>

            {/* Route */}
            <div style={{ background: "#f8fafc", borderRadius: 16, padding: "20px 24px", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ fontWeight: 800, fontSize: 18, color: "#1e293b" }}>{selectedRide.from}</div>
                <div style={{ flex: 1, height: 2, background: "linear-gradient(90deg,#f43f8e,#e11d68)" }} />
                <i className="fa-solid fa-car" style={{ color: "#f43f8e" }} />
                <div style={{ flex: 1, height: 2, background: "linear-gradient(90deg,#f43f8e,#e11d68)" }} />
                <div style={{ fontWeight: 800, fontSize: 18, color: "#1e293b" }}>{selectedRide.to}</div>
              </div>
              {[
                { icon: "fa-calendar",    label: "Date",    value: date },
                { icon: "fa-clock",       label: "Time",    value: selectedRide.time },
                { icon: "fa-hourglass",   label: "Duration",value: selectedRide.duration },
                { icon: "fa-car",         label: "Vehicle", value: `${selectedRide.carColor} ${selectedRide.car}` },
                { icon: "fa-user",        label: "Driver",  value: selectedRide.driver },
                { icon: "fa-coins",       label: "Price",   value: `${selectedRide.price} SEK / seat` },
              ].map(row => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #e8edf2" }}>
                  <span style={{ color: "#64748b", fontSize: 14 }}>
                    <i className={`fa-solid ${row.icon}`} style={{ color: "#f43f8e", marginRight: 8, width: 14 }} />{row.label}
                  </span>
                  <span style={{ fontWeight: 700, fontSize: 14, color: "#1e293b" }}>{row.value}</span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, padding: "16px 20px", background: "#fff0f7", borderRadius: 14, border: "1.5px solid #fecdd3" }}>
              <span style={{ fontWeight: 700, color: "#1e293b" }}>Total for {passengers} passenger{passengers > 1 ? "s" : ""}</span>
              <span style={{ fontSize: "1.4rem", fontWeight: 900, color: "#f43f8e" }}>{selectedRide.price * passengers} SEK</span>
            </div>

            <button className="book-btn" style={{ width: "100%", padding: 18, fontSize: 16 }}
              onClick={() => { alert(`Booking confirmed! Enjoy your ride from ${selectedRide.from} to ${selectedRide.to} 🚗`); setSelectedRide(null); }}>
              <i className="fa-solid fa-check" style={{ marginRight: 8 }} />
              Confirm & Book
            </button>
          </div>
        </div>
      )}
    </>
  );
}
