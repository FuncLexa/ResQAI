// src/pages/Monitoring.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend, PieChart, Pie, Cell
} from 'recharts';
import {
  Activity, MapPin, CloudRain, Wind, ThermometerSun,
  Droplets, AlertTriangle, Shield, TrendingUp, TrendingDown,
  RefreshCw, Eye, Zap, Radio, Satellite, Globe, Clock
} from 'lucide-react';

// Simulated real-time data generator
const generateRealtimeData = () => {
  const now = new Date();
  return Array.from({ length: 24 }, (_, i) => {
    const time = new Date(now - (23 - i) * 3600000);
    return {
      time: time.getHours() + ':00',
      rainfall: Math.floor(Math.random() * 50) + (i > 18 ? 30 : 10),
      temperature: Math.floor(Math.random() * 10) + 22,
      humidity: Math.floor(Math.random() * 30) + 50,
      windSpeed: Math.floor(Math.random() * 30) + 5,
      riskScore: Math.floor(Math.random() * 40) + (i > 18 ? 40 : 20)
    };
  });
};

const COLORS = ['#22d3ee', '#6366f1', '#f97316', '#a78bfa', '#22c55e'];

const Monitoring = () => {
  const [data, setData] = useState(generateRealtimeData());
  const [selectedZone, setSelectedZone] = useState('Mumbai Coastal');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    let interval;
    if (autoRefresh) {
      interval = setInterval(() => {
        setData(generateRealtimeData());
        setLastUpdate(new Date());
      }, 10000);
    }
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const currentData = data[data.length - 1];
  
  const riskZones = [
    { zone: 'Mumbai Coastal', risk: 'MEDIUM', score: 45, trend: 'up' },
    { zone: 'Chennai Region', risk: 'HIGH', score: 72, trend: 'up' },
    { zone: 'Kolkata Area', risk: 'LOW', score: 23, trend: 'down' },
    { zone: 'Delhi NCR', risk: 'LOW', score: 18, trend: 'stable' },
  ];

  const pieData = riskZones.map(zone => ({
    name: zone.zone.split(' ')[0],
    value: zone.score
  }));

  const stats = [
    {
      label: 'Active Monitoring',
      value: '4 Zones',
      icon: Radio,
      color: '#22d3ee',
      change: '+2'
    },
    {
      label: 'Avg Risk Score',
      value: '39.5%',
      icon: Activity,
      color: '#f97316',
      change: '-5.2%'
    },
    {
      label: 'Alert Level',
      value: 'Medium',
      icon: AlertTriangle,
      color: '#ef4444',
      change: '1 Active'
    },
    {
      label: 'Data Points',
      value: '2,847',
      icon: Satellite,
      color: '#a78bfa',
      change: '+342'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-green-500/30 rounded-xl blur-lg animate-pulse" />
                <div className="relative p-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl">
                  <Radio size={24} className="text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                  Live Environmental Monitor
                  <span className="flex items-center gap-1 px-2 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs font-mono text-green-400">LIVE</span>
                  </span>
                </h1>
                <p className="text-gray-400 flex items-center gap-2 mt-1">
                  <MapPin size={14} />
                  {selectedZone} • Real-time data streaming
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
              >
                {riskZones.map(z => (
                  <option key={z.zone}>{z.zone}</option>
                ))}
              </select>
              
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`p-2.5 rounded-lg border transition-all ${
                  autoRefresh
                    ? 'bg-green-500/20 border-green-500/40 text-green-400'
                    : 'bg-white/5 border-white/10 text-gray-400'
                }`}
              >
                <RefreshCw size={18} className={autoRefresh ? 'animate-spin-slow' : ''} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -3 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-white/5">
                  <stat.icon size={18} color={stat.color} />
                </div>
                <div className={`flex items-center gap-1 text-xs ${
                  stat.change.includes('+') ? 'text-green-400' : 
                  stat.change.includes('-') ? 'text-red-400' : 'text-gray-400'
                }`}>
                  {stat.change.includes('+') ? <TrendingUp size={12} /> : 
                   stat.change.includes('-') ? <TrendingDown size={12} /> : null}
                  {stat.change}
                </div>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Main Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Risk Score Trend */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-mono text-gray-400 uppercase tracking-wider">
                Risk Score Trend (24h)
              </h3>
              <Activity size={16} className="text-purple-400" />
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1c1c2e" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    background: '#0A0A0F',
                    border: '1px solid #1c1c2e',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="riskScore"
                  stroke="#ef4444"
                  strokeWidth={2}
                  fill="url(#riskGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Multi-Parameter Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-mono text-gray-400 uppercase tracking-wider">
                Environmental Parameters
              </h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-[#22d3ee]" />
                  <span className="text-[10px] text-gray-500">Rain</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-[#f97316]" />
                  <span className="text-[10px] text-gray-500">Temp</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-[#6366f1]" />
                  <span className="text-[10px] text-gray-500">Humid</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1c1c2e" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    background: '#0A0A0F',
                    border: '1px solid #1c1c2e',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Line type="monotone" dataKey="rainfall" stroke="#22d3ee" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="temperature" stroke="#f97316" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="humidity" stroke="#6366f1" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Bottom Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Current Readings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
          >
            <h3 className="text-sm font-mono text-gray-400 uppercase tracking-wider mb-4">
              Current Readings
            </h3>
            <div className="space-y-4">
              {[
                { icon: CloudRain, label: 'Rainfall', value: currentData.rainfall, unit: 'mm', color: '#22d3ee', max: 100 },
                { icon: ThermometerSun, label: 'Temperature', value: currentData.temperature, unit: '°C', color: '#f97316', max: 40 },
                { icon: Droplets, label: 'Humidity', value: currentData.humidity, unit: '%', color: '#6366f1', max: 100 },
                { icon: Wind, label: 'Wind Speed', value: currentData.windSpeed, unit: 'km/h', color: '#a78bfa', max: 50 },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <item.icon size={14} color={item.color} />
                      <span className="text-sm text-gray-300">{item.label}</span>
                    </div>
                    <span className="text-sm font-mono font-semibold" style={{ color: item.color }}>
                      {item.value}{item.unit}
                    </span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.value / item.max) * 100}%` }}
                      className="h-full rounded-full"
                      style={{ background: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Risk Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
          >
            <h3 className="text-sm font-mono text-gray-400 uppercase tracking-wider mb-4">
              Risk Distribution by Zone
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: '#0A0A0F',
                    border: '1px solid #1c1c2e',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {pieData.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: COLORS[i] }} />
                  <span className="text-xs text-gray-400">{item.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Zone Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
          >
            <h3 className="text-sm font-mono text-gray-400 uppercase tracking-wider mb-4">
              Zone Status
            </h3>
            <div className="space-y-3">
              {riskZones.map((zone, i) => {
                const riskColors = {
                  LOW: '#22c55e',
                  MEDIUM: '#f97316',
                  HIGH: '#ef4444'
                };
                const color = riskColors[zone.risk];
                
                return (
                  <motion.div
                    key={i}
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-all cursor-pointer"
                    onClick={() => setSelectedZone(zone.zone)}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ background: color }}
                      />
                      <div>
                        <div className="text-sm text-white">{zone.zone.split(' ')[0]}</div>
                        <div className="text-[10px] text-gray-500">{zone.zone}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-mono font-semibold" style={{ color }}>
                        {zone.risk}
                      </div>
                      <div className="text-[10px] text-gray-500">{zone.score}%</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Last Update */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
            <Clock size={12} className="text-gray-400" />
            <span className="text-xs text-gray-400">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </span>
            {autoRefresh && (
              <>
                <span className="text-gray-600">•</span>
                <span className="text-xs text-green-400 flex items-center gap-1">
                  <RefreshCw size={10} className="animate-spin-slow" />
                  Auto-refresh 10s
                </span>
              </>
            )}
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Monitoring;