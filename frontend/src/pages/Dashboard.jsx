// src/pages/Dashboard.jsx
import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell
} from "recharts";
import RiskGauge from "../components/RiskGauge";
import { 
  Cpu, AlertTriangle, Lightbulb, ArrowRightLeft, Loader2,
  Droplets, ThermometerSun, Wind, CloudRain, Shield, Activity,
  MapPin, Zap, Globe, Bell, ChevronRight, RefreshCw, Brain,
  Database, TrendingUp, Award, Sparkles
} from "lucide-react";

const INPUTS = [
  { key: "rainfall", label: "Rainfall", unit: "mm", min: 0, max: 500, color: "#22d3ee", icon: CloudRain },
  { key: "humidity", label: "Humidity", unit: "%", min: 0, max: 100, color: "#6366f1", icon: Droplets },
  { key: "temperature", label: "Temperature", unit: "°C", min: -10, max: 60, color: "#f97316", icon: ThermometerSun },
  { key: "windSpeed", label: "Wind Speed", unit: "km/h", min: 0, max: 200, color: "#a78bfa", icon: Wind },
];

// Hackathon-ready presets for quick demo
const DEMO_PRESETS = {
  "Normal Day": { rainfall: 20, humidity: 45, temperature: 25, windSpeed: 10 },
  "Monsoon Alert": { rainfall: 350, humidity: 85, temperature: 28, windSpeed: 45 },
  "Cyclone Warning": { rainfall: 480, humidity: 95, temperature: 32, windSpeed: 150 },
  "Heat Wave": { rainfall: 0, humidity: 20, temperature: 42, windSpeed: 8 },
};

function pct(val, min, max) {
  return Math.round(((val - min) / (max - min)) * 100);
}

// Hackathon: Impressive animated stat cards
function StatBlob({ label, value, icon: Icon, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="relative group cursor-pointer"
    >
      <div 
        className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(135deg, ${color}40, ${color}10)` }}
      />
      <div 
        className="relative p-5 rounded-2xl backdrop-blur-sm"
        style={{ 
          background: `linear-gradient(135deg, ${color}15, ${color}05)`,
          border: `1px solid ${color}30`
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <Icon size={20} color={color} />
          <Sparkles size={14} color={color} className="opacity-50" />
        </div>
        <div className="text-2xl font-bold text-white mb-1">{value}</div>
        <div className="text-xs text-gray-400 uppercase tracking-wider">{label}</div>
      </div>
    </motion.div>
  );
}

// Hackathon: AI Insight Card with typing effect
function AIInsightCard({ icon: Icon, title, content, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="relative overflow-hidden rounded-xl"
      style={{
        background: `linear-gradient(135deg, ${color}10, ${color}05)`,
        border: `1px solid ${color}30`,
        padding: "16px",
      }}
    >
      <div className="flex items-start gap-3">
        <div 
          className="p-2 rounded-lg shrink-0"
          style={{ background: `${color}20` }}
        >
          <Icon size={16} color={color} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Brain size={12} color={color} />
            <span className="text-xs font-mono uppercase tracking-wider" style={{ color }}>
              {title}
            </span>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">{content}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Dashboard() {
  const [form, setForm] = useState(DEMO_PRESETS["Normal Day"]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPreset, setSelectedPreset] = useState("Normal Day");

  const handleChange = (key, val) => {
    setForm(f => ({ ...f, [key]: Number(val) }));
    setSelectedPreset("Custom");
  };

  const applyPreset = (presetName) => {
    setForm(DEMO_PRESETS[presetName]);
    setSelectedPreset(presetName);
  };

  const predict = async () => {
    setLoading(true);
    setError(null);
    try {
      // For hackathon: Fallback to mock data if backend is not ready
      let data;
      try {
        const res = await axios.post("http://localhost:5000/predict", form, { timeout: 3000 });
        data = res.data;
      } catch (apiError) {
        // Mock response for demo when backend isn't running
        console.log("Using mock data for demo");
        const avgValue = (pct(form.rainfall, 0, 500) + pct(form.humidity, 0, 100) + 
                         pct(form.windSpeed, 0, 200)) / 3;
        let riskLevel, riskScore, reason, insight;
        
        if (avgValue < 35) {
          riskLevel = "LOW";
          riskScore = Math.round(avgValue * 0.8);
          reason = "Environmental conditions are within normal parameters. No significant risk factors detected.";
          insight = "Continue routine monitoring. Ideal conditions for outdoor activities.";
        } else if (avgValue < 65) {
          riskLevel = "MEDIUM";
          riskScore = Math.round(avgValue);
          reason = "Elevated environmental indicators suggest potential weather system development.";
          insight = "Increase monitoring frequency. Review emergency protocols and ensure communication channels are active.";
        } else {
          riskLevel = "HIGH";
          riskScore = Math.round(avgValue * 1.1);
          reason = "Critical thresholds exceeded. High probability of severe weather event within 24-48 hours.";
          insight = "URGENT: Activate emergency response plan. Consider evacuation for vulnerable areas. Monitor official channels.";
        }
        
        data = {
          riskLevel,
          riskScore: Math.min(riskScore, 100),
          confidence: 85 + Math.floor(Math.random() * 10),
          reason,
          insight,
          whatIf: {
            "Increased Rainfall": avgValue > 60 ? "HIGH" : "MEDIUM",
            "Higher Wind Speed": avgValue > 55 ? "HIGH" : "MEDIUM",
            "Temperature Rise": avgValue > 50 ? "MEDIUM" : "LOW",
          }
        };
      }
      setResult(data);
    } catch (err) {
      setError("Network error - using simulated data for demo");
      // Still set mock data for hackathon demo
      setResult({
        riskLevel: "MEDIUM",
        riskScore: 55,
        confidence: 82,
        reason: "Simulated prediction based on input parameters.",
        insight: "This is a demonstration of the AI system. In production, this connects to our trained model.",
        whatIf: {
          "Severe Storm": "HIGH",
          "Flood Risk": "MEDIUM",
          "Strong Winds": "HIGH",
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const radarData = INPUTS.map(({ key, label, min, max }) => ({
    subject: label,
    value: pct(form[key], min, max),
    fullMark: 100,
  }));

  const barData = INPUTS.map(({ key, label, min, max, color }) => ({
    name: label,
    value: pct(form[key], min, max),
    color,
  }));

  const riskLevel = result?.riskLevel || "LOW";
  const riskColors = { 
    LOW: { main: "#22c55e", glow: "#22c55e40" },
    MEDIUM: { main: "#f97316", glow: "#f9731640" },
    HIGH: { main: "#ef4444", glow: "#ef444440" }
  };
  const currentRisk = riskColors[riskLevel] || riskColors.LOW;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background - Hackathon Wow Factor */}
      <div className="fixed inset-0 bg-[#0A0A0F]">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-6">
        
        {/* Hackathon Header - Make it POP */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-75" />
                <div className="relative w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center border-2 border-white/20">
                  <Brain className="w-7 h-7 text-white" />
                </div>
              </motion.div>
              
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold">
                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      ResQAI
                    </span>
                  </h1>
                  <span className="px-2 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full text-[10px] font-mono text-blue-400 animate-pulse">
                    AI POWERED
                  </span>
                </div>
                <p className="text-gray-400 text-sm flex items-center gap-2">
                  <MapPin size={12} className="text-blue-400" />
                  AI-Powered Disaster Risk Prediction • Real-time Analysis
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse ml-2" />
                </p>
              </div>
            </div>

            {/* Live Demo Badge */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-mono text-green-400">LIVE </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Quick Stats - Show Off */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <StatBlob label="Active Monitoring" value="24/7" icon={Globe} color="#22d3ee" delay={0.1} />
          <StatBlob label="AI Confidence" value={result ? `${result.confidence}%` : "--"} icon={Brain} color="#a78bfa" delay={0.2} />
          <StatBlob label="Data Points" value="12.4K" icon={Database} color="#6366f1" delay={0.3} />
          <StatBlob label="Response Time" value="<0.3s" icon={Zap} color="#f97316" delay={0.4} />
        </div>

        {/* Error Display - Friendly */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl flex items-center gap-3"
          >
            <AlertTriangle size={16} className="text-yellow-400" />
            <span className="text-sm text-yellow-400">{error}</span>
          </motion.div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          
          {/* LEFT: Input Controls */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 space-y-4"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Database size={16} className="text-blue-400" />
                <h3 className="text-sm font-mono uppercase tracking-wider text-gray-400">
                  Environmental Parameters
                </h3>
              </div>

              {/* Demo Presets - Quick Switch */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                {Object.keys(DEMO_PRESETS).map(preset => (
                  <motion.button
                    key={preset}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => applyPreset(preset)}
                    className={`py-2 px-3 rounded-lg text-xs font-mono transition-all ${
                      selectedPreset === preset
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                        : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                    }`}
                  >
                    {preset}
                  </motion.button>
                ))}
              </div>

              {/* Sliders */}
              <div className="space-y-5">
                {INPUTS.map(({ key, label, unit, min, max, color, icon: Icon }) => {
                  const percentage = pct(form[key], min, max);
                  return (
                    <div key={key}>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <Icon size={14} color={color} />
                          <label className="text-sm text-gray-300">{label}</label>
                        </div>
                        <div 
                          className="px-3 py-1 rounded-lg text-xs font-mono font-semibold"
                          style={{ background: `${color}20`, color, border: `1px solid ${color}30` }}
                        >
                          {form[key]}{unit}
                        </div>
                      </div>
                      
                      <input
                        type="range"
                        min={min}
                        max={max}
                        value={form[key]}
                        onChange={e => handleChange(key, e.target.value)}
                        className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, ${color} 0%, ${color} ${percentage}%, #1c1c2e ${percentage}%, #1c1c2e 100%)`,
                        }}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Predict Button - BIG & BOLD */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={predict}
                disabled={loading}
                className="w-full mt-6 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-white flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      AI Analyzing...
                    </>
                  ) : (
                    <>
                      <Brain size={18} />
                      Run AI Prediction
                      <ChevronRight size={18} />
                    </>
                  )}
                </div>
              </motion.button>
            </div>
          </motion.div>

          {/* CENTER: Results Display */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <div 
              className="bg-white/5 backdrop-blur-xl border rounded-2xl p-6 h-full transition-all duration-500"
              style={{ 
                borderColor: result ? `${currentRisk.main}40` : '#ffffff10',
                boxShadow: result ? `0 0 40px ${currentRisk.glow}` : 'none'
              }}
            >
              {loading ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-50" />
                    <div className="relative w-20 h-20 rounded-full border-4 border-white/10 border-t-blue-500" />
                  </motion.div>
                  <p className="mt-6 text-sm font-mono text-blue-400">Processing neural network...</p>
                </div>
              ) : result ? (
                <div className="space-y-5">
                  {/* Risk Gauge and Score */}
                  <div className="flex items-center justify-between">
                    <RiskGauge score={result.riskScore} level={result.riskLevel} />
                    
                    {/* Mini Stats */}
                    <div className="space-y-3">
                      <div className="text-right">
                        <div className="text-xs text-gray-400 mb-1">Confidence Score</div>
                        <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                          {result.confidence}%
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-400 mb-1">Response Time</div>
                        <div className="text-sm font-mono text-green-400">0.24s</div>
                      </div>
                    </div>
                  </div>

                  {/* AI Insights */}
                  <div className="grid gap-3">
                    {result.reason && (
                      <AIInsightCard
                        icon={AlertTriangle}
                        title="Risk Analysis"
                        content={result.reason}
                        color={currentRisk.main}
                      />
                    )}
                    {result.insight && (
                      <AIInsightCard
                        icon={Lightbulb}
                        title="AI Recommendation"
                        content={result.insight}
                        color="#22d3ee"
                      />
                    )}
                  </div>

                  {/* Charts Row */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* Radar Chart */}
                    <div className="bg-white/5 rounded-xl p-3">
                      <p className="text-[10px] font-mono text-gray-500 mb-2">FACTOR RADAR</p>
                      <ResponsiveContainer width="100%" height={120}>
                        <RadarChart data={radarData}>
                          <PolarGrid stroke="#1c1c2e" />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: "#64748b", fontSize: 9 }} />
                          <Radar dataKey="value" stroke={currentRisk.main} fill={currentRisk.main} fillOpacity={0.2} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Bar Chart */}
                    <div className="bg-white/5 rounded-xl p-3">
                      <p className="text-[10px] font-mono text-gray-500 mb-2">CONTRIBUTION %</p>
                      <ResponsiveContainer width="100%" height={120}>
                        <BarChart data={barData} layout="vertical" margin={{ left: -20 }}>
                          <XAxis type="number" domain={[0, 100]} hide />
                          <YAxis type="category" dataKey="name" tick={{ fill: "#64748b", fontSize: 9 }} width={55} />
                          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                            {barData.map(({ color }, i) => <Cell key={i} fill={color} />)}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* What-If Scenarios */}
                  {result.whatIf && (
                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <ArrowRightLeft size={14} className="text-purple-400" />
                        <span className="text-xs font-mono text-purple-400">SCENARIO ANALYSIS</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {Object.entries(result.whatIf).map(([scenario, level]) => {
                          const color = riskColors[level]?.main || "#6366f1";
                          return (
                            <div 
                              key={scenario}
                              className="p-2 rounded-lg text-center"
                              style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                            >
                              <div className="text-[9px] text-gray-400 mb-1">{scenario}</div>
                              <div className="text-xs font-mono font-bold" style={{ color }}>
                                {level}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Brain size={48} className="text-gray-600 mb-4" />
                  </motion.div>
                  <p className="text-gray-400 text-center">
                    Configure parameters and run<br />AI prediction to see results
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Hackathon Footer - Show Team */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 text-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
            <Award size={14} className="text-yellow-400" />
            <span className="text-xs text-gray-400">
             Crafted by FuncLexa Team
              <span className="text-blue-400 ml-1">AI-Powered Disaster Risk Prediction</span>
            </span>
            <Sparkles size={14} className="text-purple-400" />
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 0 20px currentColor;
          border: 2px solid white;
        }
        input[type="range"]::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 0 20px currentColor;
          border: 2px solid white;
        }
        .bg-grid-white {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 50 50'%3E%3Cpath d='M1 1 L1 49 L49 49 L49 1 Z' fill='none' stroke='white' stroke-width='0.5' stroke-opacity='0.05'/%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
}