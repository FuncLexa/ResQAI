import { useNavigate } from "react-router-dom";
import { Brain, Activity, BarChart3, Wind, ArrowRight, Zap, Shield, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Risk Prediction",
    desc: "ML model scores disaster risk 0–100 with real-time classification",
    color: "#6366f1",
  },
  {
    icon: Zap,
    title: "What-if Simulation",
    desc: "Change any factor and watch risk recalculate instantly",
    color: "#22d3ee",
  },
  {
    icon: BarChart3,
    title: "Explainable Insights",
    desc: "Understand exactly why risk is High, Medium, or Low",
    color: "#a78bfa",
  },
  {
    icon: Wind,
    title: "Multi-factor Analysis",
    desc: "Rainfall, humidity, temperature, and wind speed combined",
    color: "#f97316",
  },
];

const steps = [
  { num: "01", label: "Enter Environmental Data", desc: "Input real or simulated weather conditions" },
  { num: "02", label: "AI Analyzes Risk", desc: "Our ML model processes multi-factor inputs" },
  { num: "03", label: "Get Insights & Simulate", desc: "Act on explainable predictions and run what-if scenarios" },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>

      {/* Background grid */}
      <div className="grid-bg" style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
      }} />

      {/* Glow orbs */}
      <div style={{
        position: "absolute", top: -200, left: "50%", transform: "translateX(-50%)",
        width: 600, height: 600,
        background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
        animation: "glow-pulse 4s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", top: 200, right: -100,
        width: 400, height: 400,
        background: "radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>

        {/* ── HERO ── */}
        <div style={{ textAlign: "center", padding: "100px 0 80px" }}>

          {/* Badge */}
          <div className="fade-up-1" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(99,102,241,0.1)",
            border: "1px solid rgba(99,102,241,0.25)",
            borderRadius: 999, padding: "6px 16px", marginBottom: 32,
          }}>
            <Shield size={12} color="#6366f1" />
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#6366f1", letterSpacing: "0.08em" }}>
              AI DISASTER INTELLIGENCE
            </span>
          </div>

          <h1 className="fade-up-2 shimmer-text" style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            marginBottom: 24,
          }}>
            ResQAI — AI Disaster<br />Intelligence System
          </h1>

          <p className="fade-up-3" style={{
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            color: "#64748b",
            fontWeight: 500,
            letterSpacing: "0.1em",
            marginBottom: 40,
            fontFamily: "'Space Mono', monospace",
          }}>
            PREDICT. SIMULATE. ACT.
          </p>

          <div className="fade-up-4" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => navigate("/dashboard")}
              style={{ display: "flex", alignItems: "center", gap: 8 }}>
              Launch Prediction Engine
              <ArrowRight size={14} />
            </button>
            <button onClick={() => document.getElementById('how').scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: "transparent",
                border: "1px solid #1c1c2e",
                color: "#64748b",
                fontFamily: "'Space Mono', monospace",
                fontSize: 13,
                letterSpacing: "0.05em",
                padding: "12px 28px",
                borderRadius: 8,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseOver={e => { e.target.style.borderColor = "#2a2a4a"; e.target.style.color = "#94a3b8"; }}
              onMouseOut={e => { e.target.style.borderColor = "#1c1c2e"; e.target.style.color = "#64748b"; }}
            >
              How it works
            </button>
          </div>

          {/* Stats row */}
          <div className="fade-up-5" style={{
            display: "flex", gap: 48, justifyContent: "center", marginTop: 64,
            paddingTop: 48, borderTop: "1px solid #1c1c2e",
            flexWrap: "wrap",
          }}>
            {[
              { val: "4", label: "Environmental Factors" },
              { val: "3", label: "Risk Levels" },
              { val: "∞", label: "Simulations" },
            ].map(({ val, label }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 32, fontWeight: 700, color: "#6366f1" }}>{val}</div>
                <div style={{ fontSize: 12, color: "#64748b", marginTop: 4, letterSpacing: "0.05em" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── FEATURES ── */}
        <section style={{ padding: "80px 0" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#6366f1", letterSpacing: "0.12em", marginBottom: 12 }}>
              CAPABILITIES
            </p>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
              Built for Real Decisions
            </h2>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 20,
          }}>
            {features.map(({ icon: Icon, title, desc, color }, i) => (
              <div key={i} className="card-glow" style={{
                background: "#0e0e1a",
                border: "1px solid #1c1c2e",
                borderRadius: 16,
                padding: 28,
                animationDelay: `${i * 0.1}s`,
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: `${color}15`,
                  border: `1px solid ${color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 16,
                }}>
                  <Icon size={20} color={color} />
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, letterSpacing: "-0.01em" }}>{title}</h3>
                <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section id="how" style={{ padding: "80px 0 120px" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#6366f1", letterSpacing: "0.12em", marginBottom: 12 }}>
              PROCESS
            </p>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
              How It Works
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 2 }}>
            {steps.map(({ num, label, desc }, i) => (
              <div key={i} style={{
                padding: 36,
                background: i === 1 ? "rgba(99,102,241,0.05)" : "transparent",
                border: "1px solid #1c1c2e",
                borderRadius: 16,
                position: "relative",
                overflow: "hidden",
              }}>
                <div style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 48,
                  fontWeight: 700,
                  color: "#1c1c2e",
                  lineHeight: 1,
                  marginBottom: 16,
                  userSelect: "none",
                }}>{num}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, letterSpacing: "-0.01em" }}>{label}</h3>
                <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6 }}>{desc}</p>
                {i < steps.length - 1 && (
                  <div style={{
                    position: "absolute", right: -12, top: "50%", transform: "translateY(-50%)",
                    color: "#2a2a4a", zIndex: 2, display: "flex",
                  }}>
                    <ArrowRight size={20} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Banner */}
          <div style={{
            marginTop: 60,
            background: "linear-gradient(135deg, rgba(99,102,241,0.1), rgba(34,211,238,0.05))",
            border: "1px solid rgba(99,102,241,0.2)",
            borderRadius: 20,
            padding: "48px 40px",
            textAlign: "center",
          }}>
            <TrendingUp size={32} color="#6366f1" style={{ marginBottom: 16 }} />
            <h3 style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)", fontWeight: 700, marginBottom: 12, letterSpacing: "-0.02em" }}>
              Ready to Analyze Your Risk?
            </h3>
            <p style={{ color: "#64748b", marginBottom: 28, fontSize: 14 }}>
              Enter environmental conditions and get AI-powered disaster risk insights in seconds.
            </p>
            <button className="btn-primary" onClick={() => navigate("/dashboard")}
              style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              Open Dashboard <ArrowRight size={14} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
