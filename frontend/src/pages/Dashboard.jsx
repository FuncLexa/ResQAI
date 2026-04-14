import { useState } from "react";
import axios from "axios";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell,
} from "recharts";
import RiskGauge from "../components/RiskGauge";
import { Cpu, AlertTriangle, Lightbulb, ArrowRightLeft, Loader2 } from "lucide-react";

const INPUTS = [
  { key: "rainfall",    label: "Rainfall",    unit: "mm",   min: 0,   max: 500, color: "#22d3ee" },
  { key: "humidity",    label: "Humidity",    unit: "%",    min: 0,   max: 100, color: "#6366f1" },
  { key: "temperature", label: "Temperature", unit: "°C",   min: -10, max: 60,  color: "#f97316" },
  { key: "windSpeed",   label: "Wind Speed",  unit: "km/h", min: 0,   max: 200, color: "#a78bfa" },
];

function pct(val, min, max) {
  return Math.round(((val - min) / (max - min)) * 100);
}

function InfoCard({ icon: Icon, title, content, color }) {
  return (
    <div style={{
      background: "#0e0e1a",
      border: "1px solid #1c1c2e",
      borderRadius: 12,
      padding: "16px 20px",
      marginTop: 12,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <Icon size={14} color={color} />
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color, letterSpacing: "0.08em" }}>{title}</span>
      </div>
      <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.7 }}>{content}</p>
    </div>
  );
}

export default function Dashboard() {
  const [form, setForm] = useState({ rainfall: 100, humidity: 50, temperature: 25, windSpeed: 20 });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (key, val) => setForm(f => ({ ...f, [key]: Number(val) }));

  const predict = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post("http://localhost:5000/predict", form);
      setResult(res.data);
    } catch {
      setError("Could not reach prediction server. Make sure the backend is running on port 5000.");
    }
    setLoading(false);
  };

  const radarData = INPUTS.map(({ key, label, min, max }) => ({
    subject: label,
    A: pct(form[key], min, max),
    fullMark: 100,
  }));

  const barData = INPUTS.map(({ key, label, min, max, color }) => ({
    name: label,
    value: pct(form[key], min, max),
    color,
  }));

  const riskLevel = result?.riskLevel || "LOW";
  const riskColors = { LOW: "#22c55e", MEDIUM: "#f97316", HIGH: "#ef4444" };
  const riskColor = riskColors[(riskLevel || "").toUpperCase()] || "#6366f1";

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 24px" }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <Cpu size={16} color="#6366f1" />
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#6366f1", letterSpacing: "0.1em" }}>
            PREDICTION ENGINE
          </span>
        </div>
        <h1 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
          Risk Analysis Dashboard
        </h1>
        <p style={{ color: "#64748b", fontSize: 13, marginTop: 4 }}>
          Configure environmental inputs and run the AI model
        </p>
      </div>

      {/* Error */}
      {error && (
        <div style={{
          background: "rgba(239,68,68,0.08)",
          border: "1px solid rgba(239,68,68,0.25)",
          borderRadius: 10,
          padding: "12px 16px",
          marginBottom: 24,
          display: "flex", alignItems: "center", gap: 10,
          fontSize: 13, color: "#ef4444",
        }}>
          <AlertTriangle size={14} /> {error}
        </div>
      )}

      {/* Main 3-col grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>

        {/* ── LEFT: Inputs ── */}
        <div style={{
          background: "#0e0e1a",
          border: "1px solid #1c1c2e",
          borderRadius: 16,
          padding: 24,
        }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, marginBottom: 24, letterSpacing: "0.05em", color: "#94a3b8" }}>
            ENVIRONMENTAL INPUTS
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {INPUTS.map(({ key, label, unit, min, max, color }) => (
              <div key={key}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#f1f5f9" }}>{label}</label>
                  <div style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 12,
                    color,
                    background: `${color}15`,
                    border: `1px solid ${color}30`,
                    borderRadius: 6,
                    padding: "2px 10px",
                  }}>
                    {form[key]} <span style={{ opacity: 0.6 }}>{unit}</span>
                  </div>
                </div>

                {/* Custom slider track with fill */}
                <div style={{ position: "relative", marginBottom: 8 }}>
                  <input
                    type="range"
                    min={min} max={max}
                    value={form[key]}
                    onChange={e => handleChange(key, e.target.value)}
                    style={{
                      width: "100%",
                      accentColor: color,
                    }}
                  />
                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 11, color: "#2a2a4a", fontFamily: "'Space Mono', monospace" }}>{min}</span>
                  <input
                    type="number"
                    min={min} max={max}
                    value={form[key]}
                    onChange={e => handleChange(key, e.target.value)}
                    style={{ width: 80, textAlign: "center" }}
                  />
                  <span style={{ fontSize: 11, color: "#2a2a4a", fontFamily: "'Space Mono', monospace" }}>{max}</span>
                </div>
              </div>
            ))}
          </div>

          <button
            className="btn-primary"
            onClick={predict}
            disabled={loading}
            style={{
              width: "100%",
              marginTop: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? (
              <>
                <Loader2 size={14} style={{ animation: "spin-slow 1s linear infinite" }} />
                Analyzing...
              </>
            ) : (
              <><Cpu size={14} /> Predict Risk</>
            )}
          </button>
        </div>

        {/* ── CENTER: Results ── */}
        <div style={{
          background: "#0e0e1a",
          border: `1px solid ${result ? riskColor + "30" : "#1c1c2e"}`,
          borderRadius: 16,
          padding: 24,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transition: "border-color 0.5s",
          boxShadow: result ? `0 0 40px ${riskColor}10` : "none",
        }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, marginBottom: 24, letterSpacing: "0.05em", color: "#94a3b8", alignSelf: "flex-start" }}>
            PREDICTION RESULT
          </h2>

          {loading ? (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
              <div style={{
                width: 48, height: 48, borderRadius: "50%",
                border: "3px solid #1c1c2e",
                borderTop: "3px solid #6366f1",
                animation: "spin-slow 0.8s linear infinite",
              }} />
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#64748b" }}>
                Running model...
              </p>
            </div>
          ) : result ? (
            <div style={{ width: "100%" }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <RiskGauge score={result.riskScore} level={result.riskLevel} />
              </div>

              {result.reason && (
                <InfoCard
                  icon={AlertTriangle}
                  title="REASONING"
                  content={result.reason}
                  color="#f97316"
                />
              )}
              {result.insight && (
                <InfoCard
                  icon={Lightbulb}
                  title="RECOMMENDED ACTION"
                  content={result.insight}
                  color="#22d3ee"
                />
              )}
            </div>
          ) : (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, color: "#2a2a4a" }}>
              <Cpu size={40} />
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#2a2a4a", textAlign: "center" }}>
                Set inputs and click<br />Predict Risk to begin
              </p>
            </div>
          )}
        </div>

        {/* ── RIGHT: Charts ── */}
        <div style={{
          background: "#0e0e1a",
          border: "1px solid #1c1c2e",
          borderRadius: 16,
          padding: 24,
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.05em", color: "#94a3b8" }}>
            FACTOR ANALYSIS
          </h2>

          {/* Radar */}
          <div>
            <p style={{ fontSize: 11, color: "#2a2a4a", fontFamily: "'Space Mono', monospace", marginBottom: 8 }}>RADAR MAP</p>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#1c1c2e" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#64748b", fontSize: 11 }} />
                <Radar dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.25} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Bar chart */}
          <div>
            <p style={{ fontSize: 11, color: "#2a2a4a", fontFamily: "'Space Mono', monospace", marginBottom: 8 }}>CONTRIBUTION (%)</p>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={barData} layout="vertical" margin={{ left: 0, right: 8 }}>
                <XAxis type="number" domain={[0, 100]} tick={{ fill: "#64748b", fontSize: 10 }} />
                <YAxis type="category" dataKey="name" tick={{ fill: "#94a3b8", fontSize: 11 }} width={72} />
                <Tooltip
                  contentStyle={{ background: "#0e0e1a", border: "1px solid #1c1c2e", borderRadius: 8, fontSize: 12 }}
                  formatter={v => [`${v}%`]}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {barData.map(({ color }, i) => <Cell key={i} fill={color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ── SIMULATION ── */}
      {result?.whatIf && (
        <div style={{
          marginTop: 20,
          background: "#0e0e1a",
          border: "1px solid rgba(99,102,241,0.2)",
          borderRadius: 16,
          padding: 28,
          boxShadow: "0 0 30px rgba(99,102,241,0.05)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <ArrowRightLeft size={16} color="#6366f1" />
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#6366f1", letterSpacing: "0.1em" }}>
              WHAT-IF SIMULATION
            </span>
          </div>

          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {Object.entries(result.whatIf).map(([scenario, level]) => {
              const c = riskColors[(level || "").toUpperCase()] || "#6366f1";
              return (
                <div key={scenario} style={{
                  background: "#13131f",
                  border: "1px solid #1c1c2e",
                  borderRadius: 10,
                  padding: "16px 20px",
                  flex: "1 1 200px",
                }}>
                  <p style={{ fontSize: 12, color: "#64748b", marginBottom: 10 }}>
                    {scenario.replace(/([A-Z])/g, " $1").trim()}
                  </p>
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    background: `${c}15`, border: `1px solid ${c}30`,
                    borderRadius: 999, padding: "4px 14px",
                  }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: c }} />
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: c }}>
                      {(level || "").toUpperCase()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
