import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav style={{
      position: "sticky",
      top: 0,
      zIndex: 50,
      borderBottom: "1px solid #1c1c2e",
      background: "rgba(7,7,15,0.85)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
    }}>
      <div style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "0 24px",
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "linear-gradient(135deg, #6366f1, #22d3ee)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, fontWeight: 700, color: "#fff",
            boxShadow: "0 0 16px rgba(99,102,241,0.5)",
          }}>R</div>
          <span style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: 18,
            color: "#f1f5f9",
            letterSpacing: "-0.02em",
          }}>
            Res<span style={{ color: "#6366f1" }}>Q</span>AI
          </span>
        </Link>

        {/* Nav links */}
        <div style={{ display: "flex", gap: 8 }}>
          {[{ to: "/", label: "Home" }, { to: "/dashboard", label: "Dashboard" }].map(({ to, label }) => (
            <Link key={to} to={to} style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 12,
              letterSpacing: "0.05em",
              padding: "6px 16px",
              borderRadius: 6,
              textDecoration: "none",
              transition: "all 0.2s",
              background: pathname === to ? "rgba(99,102,241,0.15)" : "transparent",
              color: pathname === to ? "#6366f1" : "#64748b",
              border: pathname === to ? "1px solid rgba(99,102,241,0.3)" : "1px solid transparent",
            }}>
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
