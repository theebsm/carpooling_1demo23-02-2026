import React, { useState } from "react";

const faqs = [
  {
    q: "How do I book a ride?",
    a: "Enter your destination, choose a travel date, and browse available rides. Select a suitable option and confirm your seat.",
    icon: "fa-ticket",
  },
  {
    q: "How can I offer a ride?",
    a: "Add your route, departure time, number of seats, and price. Publish the ride so others can request to join.",
    icon: "fa-car-side",
  },
  {
    q: "Can I cancel my ride?",
    a: "Yes, you can cancel from your account dashboard. Cancelling early helps other users plan better.",
    icon: "fa-circle-xmark",
  },
  {
    q: "Why should I use carpooling?",
    a: "Carpooling saves money, reduces traffic, and helps protect the environment.",
    icon: "fa-leaf",
  },
  {
    q: "How is ride price calculated?",
    a: "Prices depend on distance, demand, and timing. Drivers decide the price per seat.",
    icon: "fa-tag",
  },
  {
    q: "How do I get started?",
    a: "Create a free account, complete your profile, and start booking or posting rides.",
    icon: "fa-rocket",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState(null);
  const toggle = (i) => setOpen(open === i ? null : i);

  return (
    <section
      className="relative w-full flex flex-col items-center bg-[#070d1a] overflow-hidden"
      style={{ padding: "100px 24px 120px" }}
    >
      {/* Background glows */}
      <div className="absolute rounded-full pointer-events-none" style={{ width:500, height:500, top:"10%", right:"-10%", background:"radial-gradient(circle, rgba(244,63,142,0.07), transparent 70%)", filter:"blur(40px)" }} />
      <div className="absolute rounded-full pointer-events-none" style={{ width:400, height:400, bottom:"5%", left:"-8%", background:"radial-gradient(circle, rgba(25,80,210,0.08), transparent 70%)", filter:"blur(40px)" }} />

      {/* Content wrapper — centred */}
      <div className="relative z-10 w-full max-w-3xl flex flex-col items-center">

        {/* ── HEADER ── */}
        <div className="text-center w-full" style={{ marginBottom: 64 }}>
          <p className="text-pink-500 text-sm font-bold tracking-[3px] uppercase" style={{ marginBottom: 20 }}>
            Help Centre
          </p>
          <h2 className="font-extrabold text-white" style={{ fontSize:"clamp(2.2rem,4vw,3.2rem)", lineHeight:1.2, marginBottom: 28 }}>
            Carpool{" "}
            <span style={{ background:"linear-gradient(135deg,#f43f8e,#fb923c)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              Help Centre
            </span>
          </h2>
          <p className="text-slate-400 text-lg">Everything you need to know about RideShare.</p>
        </div>

        {/* ── FAQ ACCORDION ── */}
        <div className="w-full flex flex-col" style={{ gap: 16 }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              onClick={() => toggle(i)}
              className="w-full rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
              style={{
                background: open === i ? "rgba(244,63,142,0.08)" : "rgba(255,255,255,0.03)",
                border: open === i ? "1.5px solid rgba(244,63,142,0.35)" : "1.5px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Question row */}
              <div className="flex items-center gap-4" style={{ padding: "20px 24px" }}>
                <div
                  className="flex-shrink-0 flex items-center justify-center rounded-xl text-sm"
                  style={{
                    width: 42, height: 42,
                    background: open === i ? "linear-gradient(135deg,#f43f8e,#e11d68)" : "rgba(255,255,255,0.06)",
                    color: open === i ? "white" : "#64748b",
                    transition: "all 0.3s",
                  }}
                >
                  <i className={`fa-solid ${faq.icon}`} />
                </div>

                <span className="flex-1 text-base font-semibold text-white">{faq.q}</span>

                <div
                  className="flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-300"
                  style={{
                    width: 32, height: 32,
                    background: open === i ? "rgba(244,63,142,0.2)" : "rgba(255,255,255,0.05)",
                    transform: open === i ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  <i className="fa-solid fa-chevron-down text-pink-400 text-xs" />
                </div>
              </div>

              {/* Answer */}
              <div style={{ maxHeight: open === i ? "200px" : "0", overflow:"hidden", transition:"max-height 0.35s ease" }}>
                <p className="text-slate-400 text-[15px] leading-relaxed" style={{ padding: "0 24px 22px 82px" }}>
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── CONTACT SUPPORT CARD ── */}
        <div
          className="w-full text-center relative overflow-hidden"
          style={{
            marginTop: 64,
            borderRadius: 28,
            padding: "52px 40px",
            background: "linear-gradient(135deg, rgba(244,63,142,0.12), rgba(99,102,241,0.1))",
            border: "1.5px solid rgba(244,63,142,0.2)",
          }}
        >
          <div className="absolute rounded-full pointer-events-none" style={{ width:200, height:200, top:"-50%", left:"50%", transform:"translateX(-50%)", background:"radial-gradient(circle, rgba(244,63,142,0.15), transparent)", filter:"blur(20px)" }} />

          <div className="relative z-10 flex flex-col items-center">
            <div
              className="flex items-center justify-center text-xl text-white"
              style={{ width:56, height:56, borderRadius:16, background:"linear-gradient(135deg,#f43f8e,#e11d68)", boxShadow:"0 8px 24px rgba(244,63,142,0.4)", marginBottom:20 }}
            >
              <i className="fa-solid fa-headset" />
            </div>
            <h3 className="text-xl font-bold text-white" style={{ marginBottom:10 }}>Still need help?</h3>
            <p className="text-slate-400 text-sm" style={{ marginBottom:28 }}>Our support team is always ready to assist you.</p>
            <button
              className="inline-flex items-center gap-2 text-white font-semibold text-sm transition-all duration-200 hover:-translate-y-1"
              style={{ background:"linear-gradient(135deg,#f43f8e,#e11d68)", boxShadow:"0 6px 20px rgba(244,63,142,0.4)", border:"none", cursor:"pointer", padding:"14px 32px", borderRadius:14 }}
            >
              <i className="fa-solid fa-envelope" />
              Contact Support
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
