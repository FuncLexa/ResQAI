// src/components/FeatureCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const FeatureCard = ({ 
  icon: Icon,
  title,
  description,
  gradient = 'from-blue-500 to-purple-500',
  delay = 0,
  onClick
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2 }
      }}
      onClick={onClick}
      className="group relative cursor-pointer"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl"
        style={{
          background: `linear-gradient(135deg, ${gradient.split(' ')[1]}20, ${gradient.split(' ')[3]}20)`
        }}
      />
      
      {/* Card Content */}
      <div className="relative h-full p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300">
        {/* Icon */}
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${gradient} p-0.5 mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <div className="w-full h-full rounded-xl bg-gray-900 flex items-center justify-center">
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Content */}
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all">
          {title}
        </h3>
        <p className="text-gray-400 leading-relaxed mb-4">
          {description}
        </p>

        {/* Learn More */}
        <div className="flex items-center gap-2 text-sm font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          Learn more
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  );
};

export default FeatureCard;