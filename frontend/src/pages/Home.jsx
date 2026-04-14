// src/pages/Home.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Shield, AlertTriangle, Activity, ChevronRight, Sparkles,
  Brain, CloudRain, Wind, ThermometerSun, Droplets,
  Zap, Database, BarChart3, ArrowRight, Target,
  Eye, Rocket, Gem, Cpu, Server, Layers, Workflow,
  Users, GitBranch, Terminal, Code2, Globe, Github
} from 'lucide-react';

// Custom hook for intersection observer
const useInView = (options = { triggerOnce: true, threshold: 0.1 }) => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (options.triggerOnce) observer.disconnect();
      }
    }, options);

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options.triggerOnce, options.threshold]);

  return [ref, inView];
};

// Particle Background Component
const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.3 - 0.15;
        this.opacity = Math.random() * 0.4 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 10000);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.05)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.08 * (1 - distance / 150)})`;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

// Live What-If Simulator Component
const WhatIfSimulator = () => {
  const [inputs, setInputs] = useState({
    rainfall: 120,
    temperature: 28,
    humidity: 65
  });
  
  const [result, setResult] = useState({
    riskLevel: 'MEDIUM',
    riskScore: 45,
    reason: 'Moderate rainfall with elevated humidity levels'
  });

  // Rule-based risk calculation (matches backend logic)
  const calculateRisk = (rainfall, temperature, humidity) => {
    let score = 0;
    let reasons = [];
    
    // Rainfall scoring (0-500mm)
    if (rainfall > 300) {
      score += 40;
      reasons.push('Extreme rainfall detected');
    } else if (rainfall > 200) {
      score += 30;
      reasons.push('Heavy rainfall conditions');
    } else if (rainfall > 100) {
      score += 20;
      reasons.push('Moderate rainfall');
    } else if (rainfall > 50) {
      score += 10;
      reasons.push('Light rainfall');
    }
    
    // Humidity scoring (0-100%)
    if (humidity > 90) {
      score += 30;
      reasons.push('Very high humidity');
    } else if (humidity > 75) {
      score += 20;
      reasons.push('High humidity levels');
    } else if (humidity > 60) {
      score += 10;
      reasons.push('Elevated humidity');
    }
    
    // Temperature scoring (-10 to 60°C)
    if (temperature > 40) {
      score += 20;
      reasons.push('Extreme heat conditions');
    } else if (temperature > 35) {
      score += 10;
      reasons.push('High temperature');
    } else if (temperature < 5) {
      score += 15;
      reasons.push('Cold conditions');
    }
    
    // Combined factors
    if (rainfall > 200 && humidity > 80) {
      score += 10;
      reasons.push('Combined rainfall and humidity increase flood risk');
    }
    
    const riskScore = Math.min(score, 100);
    let riskLevel = 'LOW';
    if (riskScore > 60) riskLevel = 'HIGH';
    else if (riskScore > 30) riskLevel = 'MEDIUM';
    
    return {
      riskLevel,
      riskScore,
      reason: reasons.length > 0 ? reasons.join('. ') + '.' : 'Conditions within normal parameters.'
    };
  };

  useEffect(() => {
    setResult(calculateRisk(inputs.rainfall, inputs.temperature, inputs.humidity));
  }, [inputs]);

  const riskColors = {
    LOW: { main: '#22c55e', bg: '#22c55e15', border: '#22c55e40', text: 'Low Risk' },
    MEDIUM: { main: '#f97316', bg: '#f9731615', border: '#f9731640', text: 'Medium Risk' },
    HIGH: { main: '#ef4444', bg: '#ef444415', border: '#ef444440', text: 'High Risk' }
  };

  const currentRisk = riskColors[result.riskLevel];

  const handleSliderChange = (key, value) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative bg-[#0A0A0F]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/30 rounded-lg blur-lg animate-pulse" />
          <div className="relative p-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
            <Activity size={20} className="text-white" />
          </div>
        </div>
        <div>
          <h3 className="text-sm font-mono text-blue-400 tracking-wider">WHAT-IF SIMULATION</h3>
          <p className="text-xs text-gray-500">Real-time risk calculation</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-gray-500">Adjust sliders →</span>
          <Zap size={14} className="text-yellow-400" />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Inputs */}
        <div className="lg:col-span-1 space-y-4">
          {[
            { key: 'rainfall', label: 'Rainfall', unit: 'mm', min: 0, max: 500, value: inputs.rainfall, color: '#22d3ee', icon: CloudRain },
            { key: 'temperature', label: 'Temperature', unit: '°C', min: -10, max: 60, value: inputs.temperature, color: '#f97316', icon: ThermometerSun },
            { key: 'humidity', label: 'Humidity', unit: '%', min: 0, max: 100, value: inputs.humidity, color: '#6366f1', icon: Droplets },
          ].map((input) => (
            <div key={input.key} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <input.icon size={14} color={input.color} />
                  <label className="text-sm text-gray-300">{input.label}</label>
                </div>
                <span 
                  className="text-sm font-mono font-semibold px-2 py-0.5 rounded"
                  style={{ color: input.color, background: `${input.color}15` }}
                >
                  {input.value}{input.unit}
                </span>
              </div>
              <input
                type="range"
                min={input.min}
                max={input.max}
                value={input.value}
                onChange={(e) => handleSliderChange(input.key, Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, ${input.color}40 0%, ${input.color} ${(input.value / input.max) * 100}%, #1c1c2e ${(input.value / input.max) * 100}%, #1c1c2e 100%)`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Results */}
        <div className="lg:col-span-2">
          <div 
            className="h-full rounded-2xl p-6 transition-all duration-500"
            style={{ 
              background: currentRisk.bg,
              border: `1px solid ${currentRisk.border}`
            }}
          >
            {/* Risk Score */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-gray-400 uppercase tracking-wider">Risk Score</span>
                <motion.span 
                  key={result.riskScore}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="text-2xl font-mono font-bold"
                  style={{ color: currentRisk.main }}
                >
                  {result.riskScore}%
                </motion.span>
              </div>
              
              {/* Progress Bar */}
              <div className="relative h-4 bg-white/5 rounded-full overflow-hidden border border-white/10">
                <motion.div
                  className="h-full rounded-full"
                  style={{ 
                    width: `${result.riskScore}%`,
                    background: `linear-gradient(90deg, #22c55e 0%, #f97316 50%, #ef4444 100%)`
                  }}
                  animate={{ width: `${result.riskScore}%` }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                />
              </div>
            </div>

            {/* Risk Level Badge */}
            <div className="flex items-center justify-center mb-6">
              <motion.div
                key={result.riskLevel}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full"
                style={{ 
                  background: currentRisk.bg,
                  border: `2px solid ${currentRisk.border}`
                }}
              >
                <Shield size={20} style={{ color: currentRisk.main }} />
                <span 
                  className="text-xl font-bold"
                  style={{ color: currentRisk.main }}
                >
                  {currentRisk.text}
                </span>
              </motion.div>
            </div>

            {/* Explanation */}
            <motion.div
              key={result.reason}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-white/5 border border-white/10"
            >
              <div className="flex items-start gap-2">
                <Brain size={16} className="text-purple-400 mt-0.5 shrink-0" />
                <p className="text-sm text-gray-300 leading-relaxed">{result.reason}</p>
              </div>
            </motion.div>

            {/* Mini Indicators */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="text-center p-2 rounded-lg bg-white/5">
                <div className="text-[10px] text-gray-500 mb-1">Rainfall Impact</div>
                <div className="text-sm font-mono" style={{ color: inputs.rainfall > 200 ? '#ef4444' : inputs.rainfall > 100 ? '#f97316' : '#22c55e' }}>
                  {inputs.rainfall > 200 ? 'High' : inputs.rainfall > 100 ? 'Med' : 'Low'}
                </div>
              </div>
              <div className="text-center p-2 rounded-lg bg-white/5">
                <div className="text-[10px] text-gray-500 mb-1">Humidity Impact</div>
                <div className="text-sm font-mono" style={{ color: inputs.humidity > 80 ? '#ef4444' : inputs.humidity > 60 ? '#f97316' : '#22c55e' }}>
                  {inputs.humidity > 80 ? 'High' : inputs.humidity > 60 ? 'Med' : 'Low'}
                </div>
              </div>
              <div className="text-center p-2 rounded-lg bg-white/5">
                <div className="text-[10px] text-gray-500 mb-1">Temp Impact</div>
                <div className="text-sm font-mono" style={{ color: inputs.temperature > 35 ? '#ef4444' : inputs.temperature > 30 ? '#f97316' : '#22c55e' }}>
                  {inputs.temperature > 35 ? 'High' : inputs.temperature > 30 ? 'Med' : 'Low'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -5 }}
    className="group relative"
  >
    <div 
      className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{ background: `linear-gradient(135deg, ${color}20, transparent)` }}
    />
    <div className="relative h-full p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-white/20 transition-all">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4">
        <Icon size={24} color={color} />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

// Architecture Flow Component
const ArchitectureFlow = () => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="relative py-8"
  >
    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
      {[
        { icon: Layers, label: 'React UI', desc: 'Input Form + Results', color: '#22d3ee' },
        { icon: ArrowRight, label: 'API Call', desc: 'POST /predict', color: '#6366f1', isArrow: true },
        { icon: Server, label: 'Node.js + Express', desc: 'Backend Server', color: '#f97316' },
        { icon: ArrowRight, label: 'Process', desc: 'Risk Calculation', color: '#a78bfa', isArrow: true },
        { icon: Brain, label: 'ML Logic', desc: 'Rule-based Scoring', color: '#a78bfa' },
        { icon: ArrowRight, label: 'Response', desc: 'JSON Data', color: '#22d3ee', isArrow: true },
        { icon: Activity, label: 'Display', desc: 'Visual Results', color: '#22c55e' },
      ].map((item, i) => (
        <div key={i} className="flex items-center">
          {item.isArrow ? (
            <div className="flex flex-col items-center">
              <item.icon size={24} color={item.color} />
              <span className="text-[10px] text-gray-500 mt-1">{item.desc}</span>
            </div>
          ) : (
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center min-w-[120px]"
            >
              <div className="flex justify-center mb-2">
                <item.icon size={20} color={item.color} />
              </div>
              <h4 className="text-white text-sm font-semibold">{item.label}</h4>
              <p className="text-[10px] text-gray-500">{item.desc}</p>
            </motion.div>
          )}
        </div>
      ))}
    </div>
  </motion.div>
);

const Home = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="relative min-h-screen bg-[#0A0A0F] overflow-x-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50 origin-left"
        style={{ scaleX }}
      />
      
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Gradient Orbs */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Hero Section */}
      {/* <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20"> */}
        <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Project Name with Caption */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="mb-8"
            >
              <motion.div
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: [0.5, 1, 0.5] }}
  transition={{ duration: 1.5, repeat: Infinity }}
  className="mb-2 flex justify-center"
>
  <span className="px-4 py-1 text-xs sm:text-sm font-mono tracking-widest 
    text-blue-400 border border-blue-500/30 rounded-full 
    bg-blue-500/10 backdrop-blur-sm shadow-[0_0_15px_rgba(59,130,246,0.4)]">
    ⚡ AI-First Risk Prediction
  </span>
</motion.div>
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
                  ResQAI
                </span>
              </h1>
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-500/50" />
                <p className="text-lg sm:text-xl text-gray-400 font-light">
                  AI-Powered Disaster Risk Prediction
                </p>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-500/50" />
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg leading-relaxed"
            >
              Real-time risk assessment combining environmental data with intelligent scoring 
              to predict disaster risks and provide actionable insights.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <Link to="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-white overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Launch Dashboard
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              </Link>
              
              <motion.a
                href="#simulator"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl font-semibold text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                <Eye className="w-5 h-5" />
                Try Simulator
              </motion.a>
            </motion.div>

            {/* Team Info - 2 Members */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-4 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full"
            >
              <Users size={16} className="text-blue-400" />
              <span className="text-sm text-gray-300">Built by team</span>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">FuncLexa</span>
              <span className="text-sm text-gray-300">developers</span>
              <GitBranch size={16} className="text-purple-400 ml-2" />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* What-If Simulator Section */}
      <section id="simulator" className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Interactive <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Risk Simulator</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Adjust the parameters to see how risk levels change in real-time
            </p>
          </motion.div>
          
          <WhatIfSimulator />
        </div>
      </section>

      {/* System Architecture Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              System <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Architecture</span>
            </h2>
            <p className="text-gray-400">Simple, efficient, and focused</p>
          </motion.div>

          <ArchitectureFlow />

          {/* Tech Stack */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-blue-500/20 rounded-2xl p-6"
            >
              <Code2 size={24} className="text-blue-400 mb-4" />
              <h3 className="text-white font-semibold mb-2">Frontend</h3>
              <p className="text-gray-400 text-sm mb-3">Modern, responsive UI</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-mono">React</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-mono">Tailwind CSS</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-mono">Framer Motion</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-orange-500/5 to-red-500/5 border border-orange-500/20 rounded-2xl p-6"
            >
              <Server size={24} className="text-orange-400 mb-4" />
              <h3 className="text-white font-semibold mb-2">Backend</h3>
              <p className="text-gray-400 text-sm mb-3">Fast and lightweight</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-xs font-mono">Node.js</span>
                <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-xs font-mono">Express</span>
                <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-xs font-mono">REST API</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/20 rounded-2xl p-6"
            >
              <Brain size={24} className="text-purple-400 mb-4" />
              <h3 className="text-white font-semibold mb-2">ML Logic</h3>
              <p className="text-gray-400 text-sm mb-3">Rule-based scoring</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-mono">Threshold Logic</span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-mono">Multi-factor</span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-mono">Real-time</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Key <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Features</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={Target}
              title="Risk Prediction"
              description="Calculate risk scores (Low/Medium/High) based on environmental parameters using intelligent threshold logic."
              color="#22d3ee"
            />
            <FeatureCard
              icon={Zap}
              title="What-if Simulation"
              description="Real-time risk updates as you adjust inputs. See how changing conditions affect risk levels instantly."
              color="#f97316"
            />
            <FeatureCard
              icon={BarChart3}
              title="Visual Indicators"
              description="Color-coded risk levels, progress bars, and clear explanations for actionable insights."
              color="#a78bfa"
            />
          </div>
        </div>
      </section>

      {/* API Endpoint Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Simple <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">API</span>
            </h2>
            <p className="text-gray-400">One endpoint. Clear response.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#0A0A0F] border border-white/10 rounded-2xl overflow-hidden"
          >
            <div className="border-b border-white/10 px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded text-xs font-mono">POST</span>
                <code className="text-gray-300 text-sm">/api/predict</code>
              </div>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-3">Request Body</h4>
                  <pre className="bg-black/30 p-4 rounded-lg text-xs font-mono text-gray-300 overflow-x-auto">
{`{
  "rainfall": 120,
  "temperature": 28,
  "humidity": 65
}`}
                  </pre>
                </div>
                <div>
                  <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-3">Response</h4>
                  <pre className="bg-black/30 p-4 rounded-lg text-xs font-mono text-gray-300 overflow-x-auto">
{`{
  "riskLevel": "MEDIUM",
  "riskScore": 45,
  "reason": "Moderate rainfall..."
}`}
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative p-12 md:p-16 rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10" />
            <div className="absolute inset-0 bg-[#0A0A0F]/80 backdrop-blur-xl" />
            
            <div className="relative z-10">
              <Rocket className="w-12 h-12 text-blue-400 mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to See It in Action?
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                Experience real-time disaster risk prediction with our interactive dashboard.
              </p>
              <Link to="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(59, 130, 246, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-white overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Launch Dashboard
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <Brain size={20} className="text-blue-400" />
              <span className="text-sm text-gray-400">ResQAI - AI Disaster Risk Prediction</span>
            </div>
            
            <div className="flex items-center gap-4">
              <a 
                href="https://github.com/FuncLexa/ResQAI" 
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <Github size={18} />
                <span className="text-sm">GitHub</span>
              </a>
            </div>

            <div className="text-sm text-gray-500">
             Engineered for intelligent disaster response
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 8s linear infinite;
        }
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 0 20px currentColor;
          border: 2px solid white;
        }
        input[type="range"]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 0 20px currentColor;
          border: 2px solid white;
        }
      `}</style>
    </div>
  );
};

export default Home;