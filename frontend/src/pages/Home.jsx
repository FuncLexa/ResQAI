import { useNavigate } from "react-router-dom";
import { Brain, Activity, BarChart3, Wind } from "lucide-react";
import FeatureCard from "../components/FeatureCard";

function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "AI Risk Prediction",
      desc: "Predict disaster risk using machine learning models.",
    },
    {
      icon: Activity,
      title: "Simulation Engine",
      desc: "Analyze how changes affect disaster outcomes.",
    },
    {
      icon: BarChart3,
      title: "Explainable Insights",
      desc: "Understand why the AI predicts certain risks.",
    },
    {
      icon: Wind,
      title: "Multi-factor Analysis",
      desc: "Uses rainfall, humidity, temperature & wind speed.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white px-6 py-16 flex flex-col items-center relative overflow-hidden">

      {/* 🔥 BACKGROUND GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-cyan-500/20 blur-[140px] rounded-full"></div>

      {/* HERO */}
      <div className="text-center max-w-3xl relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
          ResQAI — AI Disaster Intelligence System
        </h1>

        <p className="mt-4 text-gray-400 text-lg">
          Predict. Simulate. Act.
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-8 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg shadow-indigo-500/30 hover:scale-105 transition-all duration-300"
        >
          🚀 Launch Prediction Engine
        </button>
      </div>

      {/* FEATURES */}
      <div className="relative mt-20 w-full max-w-6xl">

        {/* 🔥 GLOW BEHIND CARDS */}
        <div className="absolute inset-0 flex justify-center">
          <div className="w-[800px] h-[500px] bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-cyan-500/20 blur-[120px] rounded-full"></div>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <FeatureCard
              key={i}
              icon={f.icon}
              title={f.title}
              desc={f.desc}
            />
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="mt-24 text-center relative z-10">
        <h2 className="text-3xl font-semibold text-white">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-10 text-gray-400 max-w-4xl">
          <div className="p-4 bg-[#111118] border border-[#1e1e2e] rounded-lg">
            1. Enter Environmental Data
          </div>

          <div className="p-4 bg-[#111118] border border-[#1e1e2e] rounded-lg">
            2. AI Analyzes Risk
          </div>

          <div className="p-4 bg-[#111118] border border-[#1e1e2e] rounded-lg">
            3. Get Insights & Simulate
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <p className="mt-20 text-xs text-gray-500 relative z-10">
        Built for FusionX Hackathon 2026 • Powered by ML + Simulation
      </p>
    </div>
  );
}

export default Home;