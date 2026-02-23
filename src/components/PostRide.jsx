import React, { useState } from "react";
import NavBar from "./NavBar";

const SWEDISH_CITIES = [
  "Stockholm", "Göteborg", "Malmö", "Uppsala", "Västerås",
  "Örebro", "Linköping", "Helsingborg", "Jönköping", "Norrköping",
  "Lund", "Umeå", "Gävle", "Borås", "Södertälje",
  "Eskilstuna", "Karlstad", "Täby", "Sundsvall", "Luleå",
  "Halmstad", "Växjö", "Nacka", "Järfälla", "Sollentuna",
];

const STEPS = ["Route", "Date & Time", "Seats & Price", "Car & Preferences", "Review"];

const CAR_BRANDS = ["Volvo", "SAAB", "Toyota", "Volkswagen", "BMW", "Ford", "Audi", "Renault", "Peugeot", "Hyundai", "Kia", "Tesla", "Mercedes", "Skoda", "Nissan"];
const CAR_COLORS = ["White", "Black", "Silver", "Grey", "Blue", "Red", "Green", "Yellow", "Orange", "Brown"];

export default function PostRide() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  // Form data
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fromSugg, setFromSugg] = useState([]);
  const [toSugg, setToSugg] = useState([]);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [seats, setSeats] = useState(1);
  const [price, setPrice] = useState("");
  const [luggageSize, setLuggageSize] = useState("medium");

  const [carBrand, setCarBrand] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carColor, setCarColor] = useState("");
  const [carYear, setCarYear] = useState("");
  const [prefs, setPrefs] = useState({ smoking: false, pets: false, music: false, chat: false });
  const [description, setDescription] = useState("");

  const filterCities = (val) =>
    val.length < 2 ? [] : SWEDISH_CITIES.filter(c => c.toLowerCase().startsWith(val.toLowerCase())).slice(0, 5);

  const handleFromChange = (v) => { setFrom(v); setFromSugg(filterCities(v)); };
  const handleToChange = (v) => { setTo(v); setToSugg(filterCities(v)); };

  const canNext = () => {
    if (step === 0) return from.trim() && to.trim() && from !== to;
    if (step === 1) return date && time;
    if (step === 2) return seats >= 1 && price > 0;
    if (step === 3) return carBrand && carModel && carColor && carYear;
    return true;
  };

  const nextStep = () => { if (canNext()) setStep(s => s + 1); };
  const prevStep = () => setStep(s => s - 1);

  const togglePref = (key) => setPrefs(p => ({ ...p, [key]: !p[key] }));

  if (submitted) {
    return (
      <div className="w-full min-h-screen bg-[#0a0f1e] flex items-center justify-center" style={{ padding: "40px 24px" }}>
          <NavBar />
        <div style={{
          background: "white", borderRadius: 32, padding: "64px 56px", maxWidth: 520, width: "100%",
          textAlign: "center", boxShadow: "0 40px 100px rgba(0,0,0,0.5)"
        }}>
          <div style={{
            width: 88, height: 88, borderRadius: "50%",
            background: "linear-gradient(135deg, #f43f8e, #e11d68)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 28px", boxShadow: "0 12px 36px rgba(244,63,142,0.4)"
          }}>
            <i className="fa-solid fa-check" style={{ color: "white", fontSize: 36 }} />
          </div>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#1e293b", marginBottom: 12 }}>Ride Posted! 🎉</h2>
          <p style={{ color: "#64748b", fontSize: "1rem", marginBottom: 8 }}>
            Your ride from <strong>{from}</strong> to <strong>{to}</strong> on <strong>{date}</strong> at <strong>{time}</strong> is now live.
          </p>
          <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginBottom: 36 }}>
            Passengers will be able to book seats shortly.
          </p>
          <div style={{
            background: "#f8fafc", borderRadius: 20, padding: "20px 24px",
            display: "flex", justifyContent: "space-between", marginBottom: 36, flexWrap: "wrap", gap: 16
          }}>
            {[
              { icon: "fa-chair", label: "Seats", value: seats },
              { icon: "fa-coins", label: "Price/seat", value: `${price} SEK` },
              { icon: "fa-car", label: "Car", value: `${carBrand} ${carModel}` },
            ].map(s => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <i className={`fa-solid ${s.icon} text-pink-500`} style={{ fontSize: 20, marginBottom: 6, display: "block" }} />
                <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>{s.label}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#1e293b" }}>{s.value}</div>
              </div>
            ))}
          </div>
          <button onClick={() => { setSubmitted(false); setStep(0); setFrom(""); setTo(""); setDate(""); setTime(""); setSeats(1); setPrice(""); setCarBrand(""); setCarModel(""); setCarColor(""); setCarYear(""); setDescription(""); setPrefs({ smoking: false, pets: false, music: false, chat: false }); }}
            style={{
              background: "linear-gradient(135deg,#f43f8e,#e11d68)", color: "white", border: "none",
              borderRadius: 16, padding: "16px 40px", fontSize: 16, fontWeight: 700, cursor: "pointer",
              boxShadow: "0 8px 28px rgba(244,63,142,0.4)"
            }}>
            Post Another Ride
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .step-anim { animation: fadeUp 0.4s ease both; }

        .pr-field {
          display:flex; align-items:center; gap:14px;
          background:#f8fafc; border:2px solid #e8edf2;
          border-radius:16px; padding:18px 22px; transition:all 0.2s; cursor:text;
        }
        .pr-field:focus-within {
          border-color:#f43f8e; background:#ffffff;
          box-shadow:0 0 0 4px rgba(244,63,142,0.1);
        }
        .pr-field .fi { color:#f43f8e; font-size:18px; flex-shrink:0; width:22px; text-align:center; }
        .pr-field .fl { font-size:10px; font-weight:700; color:#94a3b8; letter-spacing:1.5px; text-transform:uppercase; margin-bottom:4px; }
        .pr-field input, .pr-field select {
          border:none; outline:none; background:transparent;
          color:#1e293b; font-size:16px; font-weight:500; width:100%; font-family:inherit;
        }
        .pr-field input::placeholder { color:#b0bec5; font-weight:400; }

        .sugg-list {
          position:absolute; top:calc(100% + 6px); left:0; right:0; z-index:50;
          background:white; border-radius:14px; overflow:hidden;
          box-shadow:0 12px 40px rgba(0,0,0,0.12); border:1.5px solid #e8edf2;
        }
        .sugg-item {
          padding:12px 20px; cursor:pointer; color:#1e293b; font-size:15px; font-weight:500;
          display:flex; align-items:center; gap:10px; transition:background 0.15s;
        }
        .sugg-item:hover { background:#fdf2f7; color:#f43f8e; }

        .pref-toggle {
          display:flex; align-items:center; justify-content:space-between;
          padding:16px 20px; border-radius:16px; background:#f8fafc;
          border:2px solid #e8edf2; cursor:pointer; transition:all 0.2s;
          font-size:15px; font-weight:600; color:#1e293b;
        }
        .pref-toggle.active { border-color:#f43f8e; background:#fff0f7; color:#f43f8e; }

        .toggle-track {
          width:44px; height:24px; border-radius:999px; transition:background 0.2s;
          position:relative; flex-shrink:0;
        }
        .toggle-knob {
          position:absolute; top:3px; width:18px; height:18px;
          border-radius:50%; background:white; transition:left 0.2s;
          box-shadow:0 2px 6px rgba(0,0,0,0.2);
        }

        .seat-btn {
          width:48px; height:48px; border-radius:50%; border:2px solid #e8edf2;
          background:white; font-size:20px; font-weight:700; cursor:pointer;
          display:flex; align-items:center; justify-content:center;
          color:#1e293b; transition:all 0.2s;
        }
        .seat-btn:hover { border-color:#f43f8e; color:#f43f8e; }

        .luggage-opt {
          flex:1; padding:16px; border-radius:16px; border:2px solid #e8edf2;
          background:#f8fafc; cursor:pointer; text-align:center; transition:all 0.2s;
        }
        .luggage-opt.sel { border-color:#f43f8e; background:#fff0f7; }

        .next-btn {
          width:100%; padding:18px; background:linear-gradient(135deg,#f43f8e,#e11d68);
          color:white; border:none; border-radius:16px; font-size:17px; font-weight:700;
          cursor:pointer; box-shadow:0 8px 28px rgba(244,63,142,0.4);
          transition:transform 0.2s,box-shadow 0.2s; font-family:inherit;
          display:flex; align-items:center; justify-content:center; gap:10px;
        }
        .next-btn:hover { transform:translateY(-2px); box-shadow:0 14px 36px rgba(244,63,142,0.5); }
        .next-btn:disabled { opacity:0.4; transform:none; cursor:not-allowed; }
        .back-btn {
          padding:18px 32px; background:transparent; color:#64748b;
          border:2px solid #e8edf2; border-radius:16px; font-size:16px; font-weight:600;
          cursor:pointer; font-family:inherit; transition:all 0.2s;
        }
        .back-btn:hover { border-color:#cbd5e1; color:#1e293b; }

        .review-row {
          display:flex; justify-content:space-between; align-items:center;
          padding:14px 0; border-bottom:1px solid #f1f5f9;
        }
        .review-row:last-child { border-bottom:none; }
      `}</style>

      <div className="w-full min-h-screen bg-[#0a0f1e]" style={{ paddingTop: 80 }}>
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)",
          backgroundSize: "60px 60px", position: "fixed", top: 0, left: 0, right: 0, bottom: 0
        }} />
        <div style={{
          position: "fixed", top: "5%", left: "3%", width: 320, height: 320, borderRadius: "50%",
          background: "radial-gradient(circle at 40% 40%,rgba(190,40,110,0.5),rgba(120,15,65,0.05))",
          filter: "blur(2px)", pointerEvents: "none"
        }} />
        <div style={{
          position: "fixed", bottom: "5%", right: "3%", width: 260, height: 260, borderRadius: "50%",
          background: "radial-gradient(circle,rgba(25,80,210,0.4),transparent)",
          filter: "blur(2px)", pointerEvents: "none"
        }} />

        <div className="relative z-10" style={{ maxWidth: 680, margin: "0 auto", padding: "40px 24px 80px" }}>

          {/* Page Header */}
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8, borderRadius: 999,
              background: "rgba(244,63,142,0.12)", border: "1px solid rgba(244,63,142,0.3)",
              padding: "8px 20px", marginBottom: 16
            }}>
              <i className="fa-solid fa-car text-pink-400" style={{ fontSize: 12 }} />
              <span style={{ color: "#f9a8d4", fontSize: 11, fontWeight: 700, letterSpacing: "2px" }}>DRIVER MODE</span>
            </div>
            <h1 style={{ color: "white", fontSize: "2rem", fontWeight: 800, marginBottom: 8 }}>
              Post a Ride
            </h1>
            <p style={{ color: "#475569", fontSize: "1rem" }}>Share your journey and split costs with passengers across Sweden</p>
          </div>

          {/* Step Progress */}
          <div style={{ display: "flex", alignItems: "center", marginBottom: 40, gap: 0 }}>
            {STEPS.map((label, i) => (
              <React.Fragment key={label}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: i < STEPS.length - 1 ? "none" : "none" }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: i < step ? "linear-gradient(135deg,#f43f8e,#e11d68)" : i === step ? "linear-gradient(135deg,#f43f8e,#e11d68)" : "rgba(255,255,255,0.08)",
                    border: i === step ? "3px solid rgba(244,63,142,0.4)" : "none",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "white", fontWeight: 700, fontSize: 14,
                    boxShadow: i <= step ? "0 4px 16px rgba(244,63,142,0.4)" : "none",
                    transition: "all 0.3s", flexShrink: 0
                  }}>
                    {i < step ? <i className="fa-solid fa-check" style={{ fontSize: 13 }} /> : i + 1}
                  </div>
                  <span style={{
                    fontSize: 10, fontWeight: 600, marginTop: 6, whiteSpace: "nowrap",
                    color: i <= step ? "#f9a8d4" : "#334155", letterSpacing: "0.5px"
                  }}>{label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{
                    flex: 1, height: 2, margin: "0 4px", marginBottom: 22,
                    background: i < step ? "linear-gradient(90deg,#f43f8e,#e11d68)" : "rgba(255,255,255,0.08)",
                    transition: "background 0.3s"
                  }} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Card */}
          <div style={{
            background: "white", borderRadius: 28, padding: "44px 48px",
            boxShadow: "0 40px 100px rgba(0,0,0,0.5)"
          }}>

            {/* ── STEP 0: ROUTE ── */}
            {step === 0 && (
              <div className="step-anim">
                <StepTitle icon="fa-route" title="Where are you going?" subtitle="Enter your departure and destination cities" />

                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#64748b", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Departure City</label>
                  <div style={{ position: "relative" }}>
                    <div className="pr-field">
                      <i className="fa-solid fa-location-dot fi" />
                      <div style={{ flex: 1 }}>
                        <p className="fl">From</p>
                        <input
                          type="text"
                          placeholder="e.g. Stockholm"
                          value={from}
                          onChange={e => handleFromChange(e.target.value)}
                          autoComplete="off"
                        />
                      </div>
                    </div>
                    {fromSugg.length > 0 && (
                      <div className="sugg-list">
                        {fromSugg.map(c => (
                          <div key={c} className="sugg-item" onClick={() => { setFrom(c); setFromSugg([]); }}>
                            <i className="fa-solid fa-location-dot" style={{ color: "#f43f8e", fontSize: 13 }} /> {c}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Divider with arrow */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "8px 0 20px" }}>
                  <div style={{ flex: 1, height: 1, background: "#f1f5f9" }} />
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                    background: "linear-gradient(135deg,#f43f8e,#e11d68)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 4px 16px rgba(244,63,142,0.4)"
                  }}>
                    <i className="fa-solid fa-arrow-down" style={{ color: "white", fontSize: 13 }} />
                  </div>
                  <div style={{ flex: 1, height: 1, background: "#f1f5f9" }} />
                </div>

                <div style={{ marginBottom: 28 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#64748b", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Destination City</label>
                  <div style={{ position: "relative" }}>
                    <div className="pr-field">
                      <i className="fa-solid fa-location-arrow fi" />
                      <div style={{ flex: 1 }}>
                        <p className="fl">To</p>
                        <input
                          type="text"
                          placeholder="e.g. Göteborg"
                          value={to}
                          onChange={e => handleToChange(e.target.value)}
                          autoComplete="off"
                        />
                      </div>
                    </div>
                    {toSugg.length > 0 && (
                      <div className="sugg-list">
                        {toSugg.map(c => (
                          <div key={c} className="sugg-item" onClick={() => { setTo(c); setToSugg([]); }}>
                            <i className="fa-solid fa-location-arrow" style={{ color: "#f43f8e", fontSize: 13 }} /> {c}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {from && to && from === to && (
                  <p style={{ color: "#ef4444", fontSize: 13, fontWeight: 600, marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
                    <i className="fa-solid fa-triangle-exclamation" /> Departure and destination cannot be the same city.
                  </p>
                )}
              </div>
            )}

            {/* ── STEP 1: DATE & TIME ── */}
            {step === 1 && (
              <div className="step-anim">
                <StepTitle icon="fa-calendar-days" title="When are you leaving?" subtitle="Set your departure date and time" />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#64748b", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Date</label>
                    <div className="pr-field">
                      <i className="fa-solid fa-calendar fi" />
                      <div style={{ flex: 1 }}>
                        <p className="fl">Departure Date</p>
                        <input type="date" value={date} min={new Date().toISOString().split("T")[0]} onChange={e => setDate(e.target.value)} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#64748b", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Time</label>
                    <div className="pr-field">
                      <i className="fa-solid fa-clock fi" />
                      <div style={{ flex: 1 }}>
                        <p className="fl">Departure Time</p>
                        <input type="time" value={time} onChange={e => setTime(e.target.value)} />
                      </div>
                    </div>
                  </div>
                </div>

                {date && time && (
                  <div style={{
                    background: "#f0fdf4", border: "1.5px solid #bbf7d0", borderRadius: 16,
                    padding: "16px 20px", display: "flex", alignItems: "center", gap: 12, marginBottom: 8
                  }}>
                    <i className="fa-solid fa-circle-check" style={{ color: "#22c55e", fontSize: 18 }} />
                    <span style={{ color: "#15803d", fontWeight: 600, fontSize: 15 }}>
                      Departing {from} → {to} on {new Date(date).toLocaleDateString("sv-SE", { weekday: "long", month: "long", day: "numeric" })} at {time}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* ── STEP 2: SEATS & PRICE ── */}
            {step === 2 && (
              <div className="step-anim">
                <StepTitle icon="fa-users" title="Seats & Pricing" subtitle="How many passengers can join your ride?" />

                <div style={{ marginBottom: 32 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#64748b", marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>Available Seats</label>
                  <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                    <button className="seat-btn" onClick={() => setSeats(s => Math.max(1, s - 1))}>−</button>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "#1e293b", lineHeight: 1 }}>{seats}</div>
                      <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>passenger{seats > 1 ? "s" : ""}</div>
                    </div>
                    <button className="seat-btn" onClick={() => setSeats(s => Math.min(7, s + 1))}>+</button>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {[1, 2, 3, 4].map(n => (
                        <button key={n} onClick={() => setSeats(n)} style={{
                          padding: "8px 16px", borderRadius: 999, border: "2px solid",
                          borderColor: seats === n ? "#f43f8e" : "#e8edf2",
                          background: seats === n ? "#fff0f7" : "white",
                          color: seats === n ? "#f43f8e" : "#64748b",
                          fontWeight: 600, fontSize: 14, cursor: "pointer", transition: "all 0.15s"
                        }}>{n}</button>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: 32 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#64748b", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Price per Seat (SEK)</label>
                  <div className="pr-field">
                    <i className="fa-solid fa-coins fi" />
                    <div style={{ flex: 1 }}>
                      <p className="fl">Price in Swedish Kronor</p>
                      <input type="number" min="1" placeholder="e.g. 150" value={price} onChange={e => setPrice(e.target.value)} />
                    </div>
                    <span style={{ color: "#94a3b8", fontWeight: 700, fontSize: 15, paddingLeft: 8 }}>SEK</span>
                  </div>
                  {price > 0 && (
                    <p style={{ fontSize: 13, color: "#64748b", marginTop: 8, paddingLeft: 4 }}>
                      You'll earn up to <strong style={{ color: "#f43f8e" }}>{price * seats} SEK</strong> if all {seats} seat{seats > 1 ? "s" : ""} are booked.
                    </p>
                  )}
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#64748b", marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>Luggage Allowed</label>
                  <div style={{ display: "flex", gap: 12 }}>
                    {[
                      { key: "small", icon: "fa-briefcase", label: "Small", desc: "Backpack only" },
                      { key: "medium", icon: "fa-suitcase", label: "Medium", desc: "One suitcase" },
                      { key: "large", icon: "fa-suitcase-rolling", label: "Large", desc: "Multiple bags" },
                    ].map(o => (
                      <div key={o.key} className={`luggage-opt ${luggageSize === o.key ? "sel" : ""}`}
                        onClick={() => setLuggageSize(o.key)}>
                        <i className={`fa-solid ${o.icon}`} style={{ color: luggageSize === o.key ? "#f43f8e" : "#94a3b8", fontSize: 22, marginBottom: 8, display: "block" }} />
                        <div style={{ fontWeight: 700, fontSize: 13, color: luggageSize === o.key ? "#f43f8e" : "#1e293b" }}>{o.label}</div>
                        <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>{o.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 3: CAR & PREFERENCES ── */}
            {step === 3 && (
              <div className="step-anim">
                <StepTitle icon="fa-car" title="Your Car & Preferences" subtitle="Tell passengers about your vehicle and travel style" />

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#64748b", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Brand</label>
                    <div className="pr-field">
                      <i className="fa-solid fa-car fi" />
                      <div style={{ flex: 1 }}>
                        <p className="fl">Car Brand</p>
                        <select value={carBrand} onChange={e => setCarBrand(e.target.value)}>
                          <option value="">Select brand</option>
                          {CAR_BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#64748b", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Model</label>
                    <div className="pr-field">
                      <i className="fa-solid fa-id-card fi" />
                      <div style={{ flex: 1 }}>
                        <p className="fl">Car Model</p>
                        <input type="text" placeholder="e.g. XC60, Golf" value={carModel} onChange={e => setCarModel(e.target.value)} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#64748b", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Color</label>
                    <div className="pr-field">
                      <i className="fa-solid fa-palette fi" />
                      <div style={{ flex: 1 }}>
                        <p className="fl">Car Color</p>
                        <select value={carColor} onChange={e => setCarColor(e.target.value)}>
                          <option value="">Select color</option>
                          {CAR_COLORS.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#64748b", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Year</label>
                    <div className="pr-field">
                      <i className="fa-solid fa-calendar fi" />
                      <div style={{ flex: 1 }}>
                        <p className="fl">Model Year</p>
                        <input type="number" placeholder="e.g. 2020" min="2000" max="2025" value={carYear} onChange={e => setCarYear(e.target.value)} />
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#64748b", marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>Travel Preferences</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    {[
                      { key: "smoking", icon: "fa-smoking-ban", label: "No Smoking", on: "No Smoking", off: "Smoking OK" },
                      { key: "pets", icon: "fa-paw", label: "Pets Welcome", on: "Pets Welcome", off: "No Pets" },
                      { key: "music", icon: "fa-music", label: "Music", on: "Music On", off: "Quiet Ride" },
                      { key: "chat", icon: "fa-comments", label: "Chat", on: "Let's Chat", off: "Prefer Silence" },
                    ].map(p => (
                      <div key={p.key} className={`pref-toggle ${prefs[p.key] ? "active" : ""}`}
                        onClick={() => togglePref(p.key)}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <i className={`fa-solid ${p.icon}`} style={{ fontSize: 16, color: prefs[p.key] ? "#f43f8e" : "#94a3b8" }} />
                          <span style={{ fontSize: 14 }}>{prefs[p.key] ? p.on : p.off}</span>
                        </div>
                        <div className="toggle-track" style={{ background: prefs[p.key] ? "#f43f8e" : "#e2e8f0" }}>
                          <div className="toggle-knob" style={{ left: prefs[p.key] ? 23 : 3 }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#64748b", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Trip Description (Optional)</label>
                  <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="e.g. Comfortable Volvo XC60, regular stops at Arlanda. Happy to chat or enjoy the journey in silence!"
                    rows={3}
                    style={{
                      width: "100%", border: "2px solid #e8edf2", borderRadius: 16,
                      padding: "16px 20px", fontSize: 15, color: "#1e293b", fontFamily: "inherit",
                      resize: "vertical", outline: "none", background: "#f8fafc",
                      transition: "border-color 0.2s", boxSizing: "border-box"
                    }}
                    onFocus={e => e.target.style.borderColor = "#f43f8e"}
                    onBlur={e => e.target.style.borderColor = "#e8edf2"}
                  />
                </div>
              </div>
            )}

            {/* ── STEP 4: REVIEW ── */}
            {step === 4 && (
              <div className="step-anim">
                <StepTitle icon="fa-circle-check" title="Review Your Ride" subtitle="Double-check everything before publishing" />

                <div style={{ background: "#f8fafc", borderRadius: 20, padding: "24px 28px", marginBottom: 24 }}>
                  {/* Route header */}
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid #e8edf2" }}>
                    <div style={{ textAlign: "center", fontWeight: 700, fontSize: 18, color: "#1e293b" }}>{from}</div>
                    <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ flex: 1, height: 2, background: "linear-gradient(90deg,#f43f8e,#e11d68)" }} />
                      <i className="fa-solid fa-car" style={{ color: "#f43f8e", fontSize: 16 }} />
                      <div style={{ flex: 1, height: 2, background: "linear-gradient(90deg,#f43f8e,#e11d68)" }} />
                    </div>
                    <div style={{ textAlign: "center", fontWeight: 700, fontSize: 18, color: "#1e293b" }}>{to}</div>
                  </div>

                  <div className="review-row">
                    <span style={{ color: "#64748b", fontWeight: 500 }}><i className="fa-solid fa-calendar" style={{ marginRight: 8, color: "#f43f8e" }} />Date & Time</span>
                    <span style={{ fontWeight: 700, color: "#1e293b" }}>{date} at {time}</span>
                  </div>
                  <div className="review-row">
                    <span style={{ color: "#64748b", fontWeight: 500 }}><i className="fa-solid fa-users" style={{ marginRight: 8, color: "#f43f8e" }} />Available Seats</span>
                    <span style={{ fontWeight: 700, color: "#1e293b" }}>{seats} seat{seats > 1 ? "s" : ""}</span>
                  </div>
                  <div className="review-row">
                    <span style={{ color: "#64748b", fontWeight: 500 }}><i className="fa-solid fa-coins" style={{ marginRight: 8, color: "#f43f8e" }} />Price per Seat</span>
                    <span style={{ fontWeight: 700, color: "#1e293b" }}>{price} SEK</span>
                  </div>
                  <div className="review-row">
                    <span style={{ color: "#64748b", fontWeight: 500 }}><i className="fa-solid fa-suitcase" style={{ marginRight: 8, color: "#f43f8e" }} />Luggage</span>
                    <span style={{ fontWeight: 700, color: "#1e293b" }}>{luggageSize.charAt(0).toUpperCase() + luggageSize.slice(1)}</span>
                  </div>
                  <div className="review-row">
                    <span style={{ color: "#64748b", fontWeight: 500 }}><i className="fa-solid fa-car" style={{ marginRight: 8, color: "#f43f8e" }} />Vehicle</span>
                    <span style={{ fontWeight: 700, color: "#1e293b" }}>{carColor} {carBrand} {carModel} ({carYear})</span>
                  </div>
                  <div className="review-row">
                    <span style={{ color: "#64748b", fontWeight: 500 }}><i className="fa-solid fa-star" style={{ marginRight: 8, color: "#f43f8e" }} />Preferences</span>
                    <span style={{ fontWeight: 700, color: "#1e293b", textAlign: "right", fontSize: 13 }}>
                      {[
                        prefs.smoking ? "No Smoking" : "Smoking OK",
                        prefs.pets ? "Pets OK" : "No Pets",
                        prefs.music ? "Music" : "Quiet",
                        prefs.chat ? "Chat" : "Silence",
                      ].join(" · ")}
                    </span>
                  </div>
                  {description && (
                    <div className="review-row">
                      <span style={{ color: "#64748b", fontWeight: 500 }}><i className="fa-solid fa-comment" style={{ marginRight: 8, color: "#f43f8e" }} />Description</span>
                      <span style={{ fontWeight: 500, color: "#1e293b", maxWidth: "60%", textAlign: "right", fontSize: 13 }}>{description}</span>
                    </div>
                  )}
                </div>

                <div style={{ background: "#fef3c7", border: "1.5px solid #fde68a", borderRadius: 16, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 }}>
                  <i className="fa-solid fa-circle-info" style={{ color: "#d97706", fontSize: 16 }} />
                  <p style={{ color: "#92400e", fontSize: 13, fontWeight: 500, margin: 0 }}>
                    By publishing, you confirm this ride is real and you're committed to completing it. Repeated cancellations may affect your driver rating.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
              {step > 0 && (
                <button className="back-btn" onClick={prevStep}>
                  <i className="fa-solid fa-arrow-left" style={{ marginRight: 8 }} />Back
                </button>
              )}
              {step < STEPS.length - 1 ? (
                <button className="next-btn" onClick={nextStep} disabled={!canNext()}>
                  Continue <i className="fa-solid fa-arrow-right" />
                </button>
              ) : (
                <button className="next-btn" onClick={() => setSubmitted(true)}>
                  <i className="fa-solid fa-paper-plane" />
                  Publish My Ride
                </button>
              )}
            </div>
          </div>

          {/* Ride Tips */}
          {step === 0 && (
            <div className="step-anim" style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
              {[
                { icon: "fa-shield-halved", title: "Safe Community", text: "All drivers are verified with Swedish BankID" },
                { icon: "fa-leaf", title: "Eco Friendly", text: "Reduce CO₂ emissions by sharing rides" },
                { icon: "fa-coins", title: "Share Costs", text: "Split fuel costs fairly with passengers" },
              ].map(tip => (
                <div key={tip.title} style={{
                  background: "rgba(255,255,255,0.04)", borderRadius: 16,
                  border: "1px solid rgba(255,255,255,0.08)",
                  padding: "20px", textAlign: "center"
                }}>
                  <i className={`fa-solid ${tip.icon}`} style={{ color: "#f43f8e", fontSize: 22, marginBottom: 10 }} />
                  <div style={{ color: "white", fontWeight: 700, fontSize: 13, marginBottom: 6 }}>{tip.title}</div>
                  <div style={{ color: "#475569", fontSize: 12 }}>{tip.text}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function StepTitle({ icon, title, subtitle }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 14, flexShrink: 0,
          background: "linear-gradient(135deg,#f43f8e,#e11d68)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 6px 20px rgba(244,63,142,0.35)"
        }}>
          <i className={`fa-solid ${icon}`} style={{ color: "white", fontSize: 18 }} />
        </div>
        <div>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#1e293b", margin: 0 }}>{title}</h2>
          <p style={{ color: "#94a3b8", fontSize: 14, margin: "4px 0 0" }}>{subtitle}</p>
        </div>
      </div>
      <div style={{ height: 2, background: "linear-gradient(90deg,#f43f8e,transparent)", borderRadius: 2, marginTop: 16 }} />
    </div>
  );
}
