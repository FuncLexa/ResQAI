export default function RiskGauge({ score = 0, level = "LOW" }) {
  const colors = {
    LOW: { primary: "#22c55e", glow: "rgba(34,197,94,0.4)", bg: "rgba(34,197,94,0.1)" },
    MEDIUM: { primary: "#f97316", glow: "rgba(249,115,22,0.4)", bg: "rgba(249,115,22,0.1)" },
    HIGH: { primary: "#ef4444", glow: "rgba(239,68,68,0.4)", bg: "rgba(239,68,68,0.1)" },
  };

  const key = (level || "LOW").toUpperCase();
  const { primary, glow, bg } = colors[key] || colors["LOW"];

  // SVG arc math
  const radius = 80;
  const cx = 110;
  const cy = 110;
  const startAngle = -210;
  const totalAngle = 240;
  const pct = Math.min(Math.max(score, 0), 100) / 100;
  const endAngle = startAngle + totalAngle * pct;

  function polar(angleDeg, r) {
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  }

  function arcPath(start, end, r) {
    const s = polar(start, r);
    const e = polar(end, r);
    const large = end - start > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      <svg width={220} height={180} viewBox="0 0 220 180">
        {/* Track */}
        <path
          d={arcPath(startAngle, startAngle + totalAngle, radius)}
          fill="none"
          stroke="#1c1c2e"
          strokeWidth={12}
          strokeLinecap="round"
        />
        {/* Active arc */}
        {score > 0 && (
          <path
            d={arcPath(startAngle, endAngle, radius)}
            fill="none"
            stroke={primary}
            strokeWidth={12}
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 8px ${glow})`, transition: "all 0.8s ease" }}
          />
        )}
        {/* Tick marks */}
        {[0, 25, 50, 75, 100].map((val) => {
          const a = startAngle + (val / 100) * totalAngle;
          const inner = polar(a, radius - 16);
          const outer = polar(a, radius - 8);
          return (
            <line
              key={val}
              x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y}
              stroke="#2a2a4a" strokeWidth={2} strokeLinecap="round"
            />
          );
        })}
        {/* Center score */}
        <text x={cx} y={cy + 8} textAnchor="middle"
          style={{ fontFamily: "'Space Mono', monospace", fontSize: 36, fontWeight: 700, fill: primary, transition: "fill 0.5s" }}>
          {Math.round(score)}
        </text>
        <text x={cx} y={cy + 28} textAnchor="middle"
          style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, fill: "#64748b", letterSpacing: "0.1em" }}>
          RISK SCORE
        </text>
      </svg>

      {/* Level badge */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        background: bg,
        border: `1px solid ${primary}40`,
        borderRadius: 999,
        padding: "8px 24px",
        boxShadow: `0 0 20px ${glow}`,
        transition: "all 0.5s",
      }}>
        <div style={{
          width: 8, height: 8, borderRadius: "50%",
          background: primary,
          boxShadow: `0 0 6px ${primary}`,
          animation: key === "HIGH" ? "pulse-ring 1.5s infinite" : "none",
        }} />
        <span style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 14,
          fontWeight: 700,
          color: primary,
          letterSpacing: "0.1em",
        }}>
          {key} RISK
        </span>
      </div>
    </div>
  );
}
