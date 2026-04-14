/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1",
        danger: "#ef4444",
        warning: "#f97316",
        safe: "#22c55e",
        background: "#0a0a0f",
        card: "#111118",
        border: "#1e1e2e",
        textPrimary: "#f1f5f9",
        textMuted: "#64748b",
      },
    },
  },
  plugins: [],
};