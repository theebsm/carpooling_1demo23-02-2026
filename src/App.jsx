import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import FAQSection from "./components/FAQSection";
import PostRide from "./components/PostRide";
import SearchResults from "./components/SearchResults";
import Register from "./components/Register";
import UserProfile from "./components/UserProfile";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post-ride" element={<PostRide />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

function HomePage() {
  const navigate = useNavigate();
  const [from, setFrom]             = useState("");
  const [to, setTo]                 = useState("");
  const [date, setDate]             = useState("");
  const [time, setTime]             = useState("");
  const [passengers, setPassengers] = useState("1");

  const swap = () => { setFrom(to); setTo(from); };

  const handleSearch = () => {
    navigate("/search", {
      state: { from, to, date, time, passengers: Number(passengers) }
    });
  };

  return (
    <>
      <style>{`
        @keyframes float1 {
          0%,100% { transform: translate(0px,0px) scale(1); }
          33%      { transform: translate(25px,-35px) scale(1.06); }
          66%      { transform: translate(-18px,22px) scale(0.94); }
        }
        @keyframes float2 {
          0%,100% { transform: translate(0px,0px) scale(1); }
          33%      { transform: translate(-22px,28px) scale(1.08); }
          66%      { transform: translate(28px,-22px) scale(0.93); }
        }
        @keyframes float3 {
          0%,100% { transform: translate(0px,0px) scale(1); }
          50%      { transform: translate(18px,-40px) scale(1.07); }
        }
        @keyframes float4 {
          0%,100% { transform: translate(0px,0px); }
          50%      { transform: translate(-30px,25px); }
        }
        @keyframes slideUp {
          from { opacity:0; transform:translateY(40px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .anim-float1 { animation: float1 7s ease-in-out infinite; }
        .anim-float2 { animation: float2 9s ease-in-out infinite; }
        .anim-float3 { animation: float3 6s ease-in-out infinite; }
        .anim-float4 { animation: float4 8s ease-in-out infinite; }
        .anim-float5 { animation: float2 10s ease-in-out infinite reverse; }
        .anim-su1 { animation: slideUp 0.8s ease both; }
        .anim-su2 { animation: slideUp 0.9s ease 0.25s both; }
        .anim-su3 { animation: slideUp 1s ease 0.5s both; }

        .rs-field {
          display: flex; align-items: center; gap: 14px;
          background: #f8fafc; border: 2px solid #e8edf2;
          border-radius: 20px; padding: 20px 24px;
          transition: all 0.2s; cursor: text;
        }
        .rs-field:focus-within {
          border-color: #f43f8e;
          box-shadow: 0 0 0 4px rgba(244,63,142,0.1);
          background: #ffffff;
        }
        .rs-field .field-icon { color: #f43f8e; font-size: 20px; flex-shrink: 0; width: 24px; text-align: center; }
        .rs-field .field-label {
          font-size: 10px; font-weight: 700; color: #94a3b8;
          letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 5px;
        }
        .rs-field input, .rs-field select {
          border: none; outline: none; background: transparent;
          color: #1e293b; font-size: 16px; font-weight: 500;
          width: 100%; font-family: inherit;
        }
        .rs-field input::placeholder { color: #b0bec5; font-weight: 400; }

        .swap-btn {
          width: 58px; height: 58px; border-radius: 50%;
          background: linear-gradient(135deg, #f43f8e, #e11d68);
          border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: white; font-size: 18px;
          box-shadow: 0 6px 22px rgba(244,63,142,0.5);
          transition: transform 0.35s ease, box-shadow 0.2s; flex-shrink: 0;
        }
        .swap-btn:hover { transform: rotate(180deg) scale(1.1); box-shadow: 0 10px 28px rgba(244,63,142,0.6); }

        .search-btn {
          width: 100%; padding: 22px;
          background: linear-gradient(135deg, #f43f8e, #e11d68);
          color: white; border: none; border-radius: 20px;
          font-size: 18px; font-weight: 700; cursor: pointer;
          letter-spacing: 0.5px; box-shadow: 0 8px 28px rgba(244,63,142,0.5);
          transition: transform 0.2s, box-shadow 0.2s;
          display: flex; align-items: center; justify-content: center;
          gap: 12px; font-family: inherit;
        }
        .search-btn:hover { transform: translateY(-3px); box-shadow: 0 14px 36px rgba(244,63,142,0.55); }
        .search-btn:active { transform: translateY(0); }
      `}</style>

      <div className="w-full min-h-screen bg-[#0a0f1e]">
        <NavBar />

        <section
          className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
          style={{ padding: "120px 24px 80px", background:"radial-gradient(ellipse at 20% 50%, #1a0a2e 0%, #0a0f1e 60%)" }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage:"linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)",
            backgroundSize:"60px 60px"
          }} />

          <div className="anim-float1 absolute rounded-full" style={{ width:340,height:340,top:"4%",left:"2%",filter:"blur(1px)",background:"radial-gradient(circle at 40% 40%,rgba(190,40,110,0.75),rgba(120,15,65,0.15))" }} />
          <div className="anim-float2 absolute rounded-full" style={{ width:260,height:260,top:"6%",left:"36%",filter:"blur(1px)",background:"radial-gradient(circle at 40% 40%,rgba(190,155,15,0.7),rgba(120,100,5,0.1))" }} />
          <div className="anim-float3 absolute rounded-full" style={{ width:360,height:360,top:"22%",left:"14%",filter:"blur(2px)",background:"radial-gradient(circle at 40% 40%,rgba(25,80,210,0.65),rgba(10,40,140,0.1))" }} />
          <div className="anim-float4 absolute rounded-full" style={{ width:180,height:180,bottom:"8%",right:"6%",filter:"blur(3px)",background:"radial-gradient(circle,rgba(244,63,142,0.3),transparent)" }} />
          <div className="anim-float5 absolute rounded-full" style={{ width:130,height:130,top:"15%",right:"12%",filter:"blur(2px)",background:"radial-gradient(circle,rgba(99,102,241,0.4),transparent)" }} />

          <div className="anim-su1 relative z-10 text-center text-white" style={{ marginBottom:48 }}>
            <div className="inline-flex items-center gap-2 rounded-full text-pink-300 text-xs font-semibold tracking-widest"
              style={{ background:"rgba(244,63,142,0.12)", border:"1px solid rgba(244,63,142,0.3)", padding:"8px 20px", marginBottom:20 }}>
              <i className="fa-solid fa-circle-check" style={{ fontSize:11 }} />
              TRUSTED RIDESHARE PLATFORM
            </div>
            <h1 className="font-extrabold" style={{ fontSize:"clamp(2.6rem,5vw,4rem)", lineHeight:1.15, marginBottom:16 }}>
              <i className="fa-solid fa-car-side text-pink-500" style={{ marginRight:14 }} />
              Find a Ride.{" "}
              <span style={{ background:"linear-gradient(135deg,#f43f8e,#fb923c)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                Save Money.
              </span>
            </h1>
            <p style={{ fontSize:"1.15rem", color:"#64748b" }}>Eco-friendly and cost-effective way of travelling.</p>
          </div>

          <div className="anim-su2 relative z-10 bg-white w-full max-w-4xl"
            style={{ borderRadius:32, padding:"52px 56px", boxShadow:"0 40px 100px rgba(0,0,0,0.45)" }}>

            <p className="text-center font-bold text-slate-400 uppercase tracking-widest"
              style={{ fontSize:11, letterSpacing:"2.5px", marginBottom:36 }}>
              Where are you headed?
            </p>

            <div className="flex items-center" style={{ gap:16, marginBottom:20 }}>
              <div className="rs-field flex-1">
                <i className="fa-solid fa-location-dot field-icon" />
                <div style={{ flex:1 }}>
                  <p className="field-label">From</p>
                  <input type="text" placeholder="Leaving from..." value={from} onChange={e => setFrom(e.target.value)} />
                </div>
              </div>
              <button className="swap-btn" onClick={swap}>
                <i className="fa-solid fa-right-left" />
              </button>
              <div className="rs-field flex-1">
                <i className="fa-solid fa-location-arrow field-icon" />
                <div style={{ flex:1 }}>
                  <p className="field-label">To</p>
                  <input type="text" placeholder="Going to..." value={to} onChange={e => setTo(e.target.value)} />
                </div>
              </div>
            </div>

            <div className="flex items-center" style={{ gap:16, marginBottom:32 }}>
              <div className="rs-field flex-1">
                <i className="fa-solid fa-calendar-days field-icon" />
                <div style={{ flex:1 }}>
                  <p className="field-label">Date</p>
                  <input type="date" value={date} onChange={e => setDate(e.target.value)} />
                </div>
              </div>
              <div className="rs-field flex-1">
                <i className="fa-solid fa-clock field-icon" />
                <div style={{ flex:1 }}>
                  <p className="field-label">Time</p>
                  <input type="time" value={time} onChange={e => setTime(e.target.value)} />
                </div>
              </div>
              <div className="rs-field flex-1">
                <i className="fa-solid fa-user-group field-icon" />
                <div style={{ flex:1 }}>
                  <p className="field-label">Passengers</p>
                  <select value={passengers} onChange={e => setPassengers(e.target.value)}>
                    {[1,2,3,4,5,6].map(n => (
                      <option key={n} value={n}>{n} Passenger{n > 1 ? "s" : ""}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* ✅ onClick now navigates to /search */}
            <button className="search-btn" onClick={handleSearch}>
              <i className="fa-solid fa-magnifying-glass" />
              Search Available Rides
            </button>
          </div>

          <div className="anim-su3 relative z-10 flex" style={{ gap:64, marginTop:48 }}>
            {[
              { icon:"fa-users", value:"50K+", label:"Happy Riders" },
              { icon:"fa-route", value:"120+", label:"Cities Covered" },
              { icon:"fa-leaf",  value:"30%",  label:"CO₂ Saved" },
            ].map(s => (
              <div key={s.label} style={{ textAlign:"center" }}>
                <div style={{ fontSize:"1.6rem", fontWeight:800, color:"white" }}>
                  <i className={`fa-solid ${s.icon} text-pink-500`} style={{ fontSize:"1rem", marginRight:8 }} />
                  {s.value}
                </div>
                <div style={{ fontSize:12, color:"#475569", fontWeight:500, marginTop:6 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        <FAQSection />
      </div>
    </>
  );
}
