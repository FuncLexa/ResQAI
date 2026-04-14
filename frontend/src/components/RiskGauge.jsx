// src/components/RiskGauge.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, Activity } from 'lucide-react';

const RiskGauge = ({ score = 0, level = 'LOW', confidence = 85 }) => {
  const riskConfig = {
    LOW: {
      color: '#22c55e',
      gradient: 'from-green-500 to-emerald-500',
      icon: Shield,
      description: 'Normal conditions. No immediate threat.'
    },
    MEDIUM: {
      color: '#f97316',
      gradient: 'from-orange-500 to-amber-500',
      icon: Activity,
      description: 'Elevated risk. Monitor situation closely.'
    },
    HIGH: {
      color: '#ef4444',
      gradient: 'from-red-500 to-rose-500',
      icon: AlertTriangle,
      description: 'Critical risk. Take immediate action.'
    }
  };

  const config = riskConfig[level] || riskConfig.LOW;
  const Icon = config.icon;
  const percentage = score || (level === 'LOW' ? 25 : level === 'MEDIUM' ? 55 : 85);

  return (
    <div className="w-full max-w-xs">
      {/* Level Badge */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <div 
          className="p-2 rounded-lg"
          style={{ background: `${config.color}20` }}
        >
          <Icon size={20} color={config.color} />
        </div>
        <span 
          className="text-lg font-bold"
          style={{ color: config.color }}
        >
          {level} RISK
        </span>
      </div>

      {/* Gauge Circle */}
      <div className="relative w-48 h-48 mx-auto mb-4">
        <svg className="w-full h-full transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="96"
            cy="96"
            r="88"
            fill="none"
            stroke="#1c1c2e"
            strokeWidth="12"
          />
          {/* Animated progress circle */}
          <motion.circle
            cx="96"
            cy="96"
            r="88"
            fill="none"
            stroke={config.color}
            strokeWidth="12"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: percentage / 100 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              strokeDasharray: `${2 * Math.PI * 88}`,
              strokeDashoffset: `${2 * Math.PI * 88 * (1 - percentage / 100)}`,
            }}
          />
        </svg>
        
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-4xl font-bold text-white"
          >
            {percentage}%
          </motion.span>
          <span className="text-xs text-gray-400 mt-1">Risk Score</span>
        </div>
      </div>

      {/* Confidence */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full">
          <Shield size={12} className="text-blue-400" />
          <span className="text-xs text-gray-400">
            Confidence: <span className="text-blue-400 font-semibold">{confidence}%</span>
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          {config.description}
        </p>
      </div>
    </div>
  );
};

export default RiskGauge;