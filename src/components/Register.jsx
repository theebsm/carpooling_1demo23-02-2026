import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

// ✅ Field is OUTSIDE Register — fixes the cursor jumping bug
function Field({ icon, label, error, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#64748b", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1.2 }}>{label}</label>
      <div style={{
        display: "flex", alignItems: "center", gap: 12,
        background: error ? "#fff5f5" : "#f8fafc",
        border: `2px solid ${error ? "#fca5a5" : "#e8edf2"}`,
        borderRadius: 16, padding: "16px 20px", transition: "all 0.2s",
      }} className="reg-field">
        <i className={`fa-solid ${icon}`} style={{ color: error ? "#ef4444" : "#f43f8e", fontSize: 16, flexShrink: 0, width: 18, textAlign: "center" }} />
        {children}
      </div>
      {error && (
        <p style={{ color: "#ef4444", fontSize: 12, fontWeight: 600, marginTop: 6, display: "flex", alignItems: "center", gap: 4 }}>
          <i className="fa-solid fa-circle-exclamation" style={{ fontSize: 11 }} /> {error}
        </p>
      )}
    </div>
  );
}

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    password: "", confirmPassword: "", dob: "",
    gender: "", role: "", agree: false,
  });
  const [errors, setErrors] = useState({});

  const set = (key, val) => {
    setForm(f => ({ ...f, [key]: val }));
    setErrors(e => ({ ...e, [key]: "" }));
  };

  const validateStep1 = () => {
    const e = {};
    if (!form.email.includes("@"))                        e.email           = "Enter a valid email address";
    if (form.password.length < 8)                         e.password        = "Password must be at least 8 characters";
    if (form.password !== form.confirmPassword)           e.confirmPassword = "Passwords do not match";
    if (!form.role)                                       e.role            = "Please select how you'll use RideShare";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "First name is required";
    if (!form.lastName.trim())  e.lastName  = "Last name is required";
    if (!form.phone.trim())     e.phone     = "Phone number is required";
    if (!form.dob)              e.dob       = "Date of birth is required";
    if (!form.gender)           e.gender    = "Please select your gender";
    if (!form.agree)            e.agree     = "You must accept the terms";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    if (step === 2 && validateStep2()) setStep(3);
  };

  const inputStyle = {
    border: "none", outline: "none", background: "transparent",
    color: "#1e293b", fontSize: 15, fontWeight: 500, width: "100%", fontFamily: "inherit",
  };

  if (step === 3) {
    return (
      <div className="w-full min-h-screen bg-[#0a0f1e] flex items-center justify-center" style={{ padding: "40px 24px" }}>
        <NavBar />
        <div style={{
          background: "white", borderRadius: 32, padding: "64px 56px",
          maxWidth: 480, width: "100%", textAlign: "center",
          boxShadow: "0 40px 100px rgba(0,0,0,0.5)", marginTop: 80
        }}>
          <div style={{
            width: 90, height: 90, borderRadius: "50%",
            background: "linear-gradient(135deg,#f43f8e,#e11d68)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 28px", boxShadow: "0 12px 36px rgba(244,63,142,0.4)"
          }}>
            <i className="fa-solid fa-check" style={{ color: "white", fontSize: 38 }} />
          </div>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#1e293b", marginBottom: 12 }}>Welcome to RideShare! 🎉</h2>
          <p style={{ color: "#64748b", fontSize: "1rem", marginBottom: 8 }}>
            Hi <strong>{form.firstName}</strong>, your account has been created successfully.
          </p>
          <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginBottom: 36 }}>
            Start exploring rides across Sweden today.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => navigate("/")} style={{
              padding: "14px 32px", background: "linear-gradient(135deg,#f43f8e,#e11d68)",
              color: "white", border: "none", borderRadius: 14, fontSize: 15,
              fontWeight: 700, cursor: "pointer", boxShadow: "0 6px 20px rgba(244,63,142,0.4)",
              fontFamily: "inherit"
            }}>
              <i className="fa-solid fa-magnifying-glass" style={{ marginRight: 8 }} />Find a Ride
            </button>
            <button onClick={() => navigate("/post-ride")} style={{
              padding: "14px 32px", background: "white",
              color: "#f43f8e", border: "2px solid #f43f8e", borderRadius: 14, fontSize: 15,
              fontWeight: 700, cursor: "pointer", fontFamily: "inherit"
            }}>
              <i className="fa-solid fa-car" style={{ marginRight: 8 }} />Post a Ride
            </button>
          </div>
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
        .reg-field:focus-within {
          border-color: #f43f8e !important;
          background: white !important;
          box-shadow: 0 0 0 4px rgba(244,63,142,0.1);
        }
        .reg-btn {
          width: 100%; padding: 18px;
          background: linear-gradient(135deg,#f43f8e,#e11d68);
          color: white; border: none; border-radius: 16px;
          font-size: 16px; font-weight: 700; cursor: pointer;
          box-shadow: 0 8px 28px rgba(244,63,142,0.4);
          transition: transform 0.2s, box-shadow 0.2s;
          display: flex; align-items: center; justify-content: center;
          gap: 10px; font-family: inherit;
        }
        .reg-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 36px rgba(244,63,142,0.5); }
        .social-btn {
          flex: 1; padding: 14px 20px; border-radius: 14px;
          border: 2px solid #e8edf2; background: white;
          display: flex; align-items: center; justify-content: center;
          gap: 10px; font-size: 14px; font-weight: 700;
          color: #1e293b; cursor: pointer; transition: all 0.2s;
          font-family: inherit;
        }
        .social-btn:hover { border-color: #cbd5e1; background: #f8fafc; }
        .role-card {
          flex: 1; padding: 20px 16px; border-radius: 16px;
          border: 2px solid #e8edf2; background: #f8fafc;
          cursor: pointer; text-align: center; transition: all 0.2s;
        }
        .role-card.sel { border-color: #f43f8e; background: #fff0f7; }
        .gender-opt {
          flex: 1; padding: 14px; border-radius: 14px;
          border: 2px solid #e8edf2; background: #f8fafc;
          cursor: pointer; text-align: center; transition: all 0.2s;
          font-size: 14px; font-weight: 600; color: #64748b;
        }
        .gender-opt.sel { border-color: #f43f8e; background: #fff0f7; color: #f43f8e; }
      `}</style>

      <div className="w-full min-h-screen" style={{ background: "radial-gradient(ellipse at 20% 50%, #1a0a2e 0%, #0a0f1e 60%)" }}>
        <NavBar />

        {/* Background effects */}
        <div className="fixed inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)",
          backgroundSize: "60px 60px"
        }} />
        <div className="fixed rounded-full pointer-events-none" style={{ width:300,height:300,top:"5%",left:"2%",filter:"blur(2px)",background:"radial-gradient(circle,rgba(190,40,110,0.5),transparent)" }} />
        <div className="fixed rounded-full pointer-events-none" style={{ width:220,height:220,bottom:"8%",right:"4%",filter:"blur(2px)",background:"radial-gradient(circle,rgba(25,80,210,0.4),transparent)" }} />

        <div className="relative z-10" style={{ maxWidth: 560, margin: "0 auto", padding: "100px 24px 60px" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              borderRadius: 999, background: "rgba(244,63,142,0.12)",
              border: "1px solid rgba(244,63,142,0.3)", padding: "8px 20px", marginBottom: 16
            }}>
              <i className="fa-solid fa-user-plus" style={{ color: "#f9a8d4", fontSize: 11 }} />
              <span style={{ color: "#f9a8d4", fontSize: 11, fontWeight: 700, letterSpacing: "2px" }}>CREATE ACCOUNT</span>
            </div>
            <h1 style={{ color: "white", fontSize: "2rem", fontWeight: 800, marginBottom: 8 }}>Join RideShare Sweden</h1>
            <p style={{ color: "#475569", fontSize: "1rem" }}>Travel smarter, greener, and cheaper across Sweden</p>
          </div>

          {/* Step indicator */}
          <div style={{ display: "flex", alignItems: "center", marginBottom: 32 }}>
            {["Account", "Profile", "Done"].map((label, i) => (
              <React.Fragment key={label}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
                    background: i + 1 <= step ? "linear-gradient(135deg,#f43f8e,#e11d68)" : "rgba(255,255,255,0.08)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "white", fontWeight: 700, fontSize: 13,
                    boxShadow: i + 1 <= step ? "0 4px 16px rgba(244,63,142,0.4)" : "none",
                  }}>
                    {i + 1 < step ? <i className="fa-solid fa-check" style={{ fontSize: 12 }} /> : i + 1}
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 600, marginTop: 5, color: i + 1 <= step ? "#f9a8d4" : "#334155" }}>{label}</span>
                </div>
                {i < 2 && (
                  <div style={{
                    flex: 1, height: 2, margin: "0 6px", marginBottom: 18,
                    background: i + 1 < step ? "linear-gradient(90deg,#f43f8e,#e11d68)" : "rgba(255,255,255,0.08)",
                    transition: "background 0.3s"
                  }} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Card */}
          <div style={{ background: "white", borderRadius: 28, padding: "44px 48px", boxShadow: "0 40px 100px rgba(0,0,0,0.5)", animation: "fadeUp 0.4s ease both" }}>

            {/* ── STEP 1: ACCOUNT INFO ── */}
            {step === 1 && (
              <>
                <div style={{ marginBottom: 28 }}>
                  <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#1e293b", marginBottom: 4 }}>Account Details</h2>
                  <p style={{ color: "#94a3b8", fontSize: 14 }}>Set up your login credentials</p>
                  <div style={{ height: 2, background: "linear-gradient(90deg,#f43f8e,transparent)", borderRadius: 2, marginTop: 14 }} />
                </div>

                {/* Social signup */}
                <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
                  <button className="social-btn">
                    <svg width="18" height="18" viewBox="0 0 48 48">
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                    </svg>
                    Continue with Google
                  </button>
                  <button className="social-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Continue with Facebook
                  </button>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                  <div style={{ flex: 1, height: 1, background: "#f1f5f9" }} />
                  <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600 }}>OR SIGN UP WITH EMAIL</span>
                  <div style={{ flex: 1, height: 1, background: "#f1f5f9" }} />
                </div>

                <Field icon="fa-envelope" label="Email Address" error={errors.email}>
                  <input
                    style={inputStyle}
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={e => set("email", e.target.value)}
                  />
                </Field>

                <Field icon="fa-lock" label="Password" error={errors.password}>
                  <input
                    style={inputStyle}
                    type={showPass ? "text" : "password"}
                    placeholder="Min. 8 characters"
                    value={form.password}
                    onChange={e => set("password", e.target.value)}
                  />
                  <i
                    className={`fa-solid ${showPass ? "fa-eye-slash" : "fa-eye"}`}
                    style={{ color: "#94a3b8", cursor: "pointer", fontSize: 15, flexShrink: 0 }}
                    onClick={() => setShowPass(s => !s)}
                  />
                </Field>

                <Field icon="fa-lock" label="Confirm Password" error={errors.confirmPassword}>
                  <input
                    style={inputStyle}
                    type={showConfirm ? "text" : "password"}
                    placeholder="Repeat your password"
                    value={form.confirmPassword}
                    onChange={e => set("confirmPassword", e.target.value)}
                  />
                  <i
                    className={`fa-solid ${showConfirm ? "fa-eye-slash" : "fa-eye"}`}
                    style={{ color: "#94a3b8", cursor: "pointer", fontSize: 15, flexShrink: 0 }}
                    onClick={() => setShowConfirm(s => !s)}
                  />
                </Field>

                {/* Password strength */}
                {form.password.length > 0 && (
                  <div style={{ marginBottom: 20, marginTop: -12 }}>
                    <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} style={{
                          flex: 1, height: 4, borderRadius: 2,
                          background: form.password.length >= i * 3
                            ? i <= 1 ? "#ef4444" : i <= 2 ? "#f59e0b" : i <= 3 ? "#3b82f6" : "#22c55e"
                            : "#e8edf2",
                          transition: "background 0.3s"
                        }} />
                      ))}
                    </div>
                    <p style={{ fontSize: 11, color: "#94a3b8" }}>
                      {form.password.length < 4 ? "Weak" : form.password.length < 8 ? "Fair" : form.password.length < 12 ? "Good" : "Strong"} password
                    </p>
                  </div>
                )}

                {/* Role selector */}
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#64748b", marginBottom: 12, textTransform: "uppercase", letterSpacing: 1.2 }}>I want to</label>
                  <div style={{ display: "flex", gap: 12 }}>
                    {[
                      { key: "passenger", icon: "fa-user",  label: "Find Rides",  desc: "Search & book as passenger" },
                      { key: "driver",    icon: "fa-car",   label: "Offer Rides", desc: "Post rides as a driver"     },
                      { key: "both",      icon: "fa-users", label: "Both",        desc: "Drive & ride"               },
                    ].map(r => (
                      <div key={r.key} className={`role-card ${form.role === r.key ? "sel" : ""}`}
                        onClick={() => set("role", r.key)}>
                        <i className={`fa-solid ${r.icon}`} style={{ color: form.role === r.key ? "#f43f8e" : "#94a3b8", fontSize: 22, marginBottom: 8, display: "block" }} />
                        <div style={{ fontWeight: 700, fontSize: 13, color: form.role === r.key ? "#f43f8e" : "#1e293b" }}>{r.label}</div>
                        <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>{r.desc}</div>
                      </div>
                    ))}
                  </div>
                  {errors.role && (
                    <p style={{ color: "#ef4444", fontSize: 12, fontWeight: 600, marginTop: 8 }}>
                      <i className="fa-solid fa-circle-exclamation" style={{ marginRight: 4 }} />{errors.role}
                    </p>
                  )}
                </div>

                <button className="reg-btn" onClick={handleNext}>
                  Continue <i className="fa-solid fa-arrow-right" />
                </button>

                <p style={{ textAlign: "center", marginTop: 20, fontSize: 14, color: "#94a3b8" }}>
                  Already have an account?{" "}
                  <Link to="/login" style={{ color: "#f43f8e", fontWeight: 700, textDecoration: "none" }}>Log in</Link>
                </p>
              </>
            )}

            {/* ── STEP 2: PERSONAL INFO ── */}
            {step === 2 && (
              <>
                <div style={{ marginBottom: 28 }}>
                  <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#1e293b", marginBottom: 4 }}>Personal Information</h2>
                  <p style={{ color: "#94a3b8", fontSize: 14 }}>Tell us a bit about yourself</p>
                  <div style={{ height: 2, background: "linear-gradient(90deg,#f43f8e,transparent)", borderRadius: 2, marginTop: 14 }} />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <Field icon="fa-user" label="First Name" error={errors.firstName}>
                    <input
                      style={inputStyle}
                      placeholder="Erik"
                      value={form.firstName}
                      onChange={e => set("firstName", e.target.value)}
                    />
                  </Field>
                  <Field icon="fa-user" label="Last Name" error={errors.lastName}>
                    <input
                      style={inputStyle}
                      placeholder="Lindqvist"
                      value={form.lastName}
                      onChange={e => set("lastName", e.target.value)}
                    />
                  </Field>
                </div>

                <Field icon="fa-phone" label="Phone Number" error={errors.phone}>
                  <span style={{ color: "#94a3b8", fontWeight: 600, fontSize: 14, flexShrink: 0 }}>🇸🇪 +46</span>
                  <input
                    style={inputStyle}
                    placeholder="70 123 45 67"
                    value={form.phone}
                    onChange={e => set("phone", e.target.value)}
                  />
                </Field>

                <Field icon="fa-cake-candles" label="Date of Birth" error={errors.dob}>
                  <input
                    style={inputStyle}
                    type="date"
                    value={form.dob}
                    max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split("T")[0]}
                    onChange={e => set("dob", e.target.value)}
                  />
                </Field>

                {/* Gender */}
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#64748b", marginBottom: 10, textTransform: "uppercase", letterSpacing: 1.2 }}>Gender</label>
                  <div style={{ display: "flex", gap: 10 }}>
                    {[
                      { key: "male",   icon: "♂", label: "Male"   },
                      { key: "female", icon: "♀", label: "Female" },
                      { key: "other",  icon: "⚧", label: "Other"  },
                    ].map(g => (
                      <div key={g.key} className={`gender-opt ${form.gender === g.key ? "sel" : ""}`}
                        onClick={() => set("gender", g.key)}>
                        <span style={{ fontSize: 18 }}>{g.icon}</span>
                        <div style={{ marginTop: 4 }}>{g.label}</div>
                      </div>
                    ))}
                  </div>
                  {errors.gender && (
                    <p style={{ color: "#ef4444", fontSize: 12, fontWeight: 600, marginTop: 8 }}>
                      <i className="fa-solid fa-circle-exclamation" style={{ marginRight: 4 }} />{errors.gender}
                    </p>
                  )}
                </div>

                {/* Terms */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{
                    display: "flex", alignItems: "flex-start", gap: 12, padding: "16px",
                    borderRadius: 14, cursor: "pointer", transition: "all 0.2s",
                    background: form.agree ? "#fff0f7" : "#f8fafc",
                    border: `2px solid ${errors.agree ? "#fca5a5" : form.agree ? "#f43f8e" : "#e8edf2"}`,
                  }} onClick={() => set("agree", !form.agree)}>
                    <div style={{
                      width: 22, height: 22, borderRadius: 6, flexShrink: 0, marginTop: 1,
                      background: form.agree ? "linear-gradient(135deg,#f43f8e,#e11d68)" : "white",
                      border: `2px solid ${form.agree ? "#f43f8e" : "#cbd5e1"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all 0.2s"
                    }}>
                      {form.agree && <i className="fa-solid fa-check" style={{ color: "white", fontSize: 11 }} />}
                    </div>
                    <p style={{ fontSize: 13, color: "#64748b", margin: 0, lineHeight: 1.5 }}>
                      I agree to the{" "}
                      <span style={{ color: "#f43f8e", fontWeight: 700 }}>Terms of Service</span> and{" "}
                      <span style={{ color: "#f43f8e", fontWeight: 700 }}>Privacy Policy</span>. I confirm I am 18+ years old and residing in Sweden.
                    </p>
                  </div>
                  {errors.agree && (
                    <p style={{ color: "#ef4444", fontSize: 12, fontWeight: 600, marginTop: 6 }}>
                      <i className="fa-solid fa-circle-exclamation" style={{ marginRight: 4 }} />{errors.agree}
                    </p>
                  )}
                </div>

                <div style={{ display: "flex", gap: 12 }}>
                  <button onClick={() => setStep(1)} style={{
                    padding: "18px 28px", background: "transparent", color: "#64748b",
                    border: "2px solid #e8edf2", borderRadius: 16, fontSize: 15,
                    fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s"
                  }}>
                    <i className="fa-solid fa-arrow-left" style={{ marginRight: 8 }} />Back
                  </button>
                  <button className="reg-btn" onClick={handleNext}>
                    <i className="fa-solid fa-user-check" /> Create Account
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Trust badges */}
          {step === 1 && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 20 }}>
              {[
                { icon: "fa-shield-halved", text: "BankID Verified" },
                { icon: "fa-lock",          text: "Secure & Private" },
                { icon: "fa-leaf",          text: "Eco Friendly"     },
              ].map(b => (
                <div key={b.text} style={{
                  background: "rgba(255,255,255,0.04)", borderRadius: 14,
                  border: "1px solid rgba(255,255,255,0.08)", padding: "14px", textAlign: "center"
                }}>
                  <i className={`fa-solid ${b.icon}`} style={{ color: "#f43f8e", fontSize: 18, marginBottom: 6, display: "block" }} />
                  <div style={{ color: "#64748b", fontSize: 12, fontWeight: 600 }}>{b.text}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
