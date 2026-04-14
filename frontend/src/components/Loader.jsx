// src/components/Loader.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const Loader = ({ fullScreen = true }) => {
  const loaderContent = (
    <div className="flex flex-col items-center justify-center gap-6">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-75" />
        <div className="relative w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
          <Shield className="w-10 h-10 text-white" />
        </div>
      </motion.div>
      
      <div className="flex flex-col items-center gap-2">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-white font-semibold text-lg"
        >
          Loading DisasterGuard AI
        </motion.div>
        
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.1,
              }}
              className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-[#0A0A0F] z-50 flex items-center justify-center">
        {loaderContent}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      {loaderContent}
    </div>
  );
};

export default Loader;