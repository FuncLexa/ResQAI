// src/components/common/GlowingCard.jsx
import React from 'react';
import { motion } from 'framer-motion';

const GlowingCard = ({ children, className = '', glowColor = 'blue' }) => {
  const glowColors = {
    blue: 'from-blue-500/20 to-cyan-500/20',
    purple: 'from-purple-500/20 to-pink-500/20',
    green: 'from-green-500/20 to-emerald-500/20',
    orange: 'from-orange-500/20 to-red-500/20'
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`relative p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300 ${className}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${glowColors[glowColor]} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl`} />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default GlowingCard;