// src/components/home/StatsSection.jsx
import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const StatsSection = () => {
  const stats = [
    { value: 99.9, label: "Prediction Accuracy", suffix: "%", color: "blue" },
    { value: 500000, label: "Lives Protected", suffix: "+", color: "green" },
    { value: 50, label: "Countries Covered", suffix: "+", color: "purple" },
    { value: 24, label: "Real-time Monitoring", suffix: "/7", color: "orange" }
  ];

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ stat, index }) => {
  const [count, setCount] = useState(0);
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
      const duration = 2000;
      const steps = 60;
      const increment = stat.value / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          setCount(stat.value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [inView, stat.value, controls]);

  const gradients = {
    blue: "from-blue-500 to-cyan-500",
    green: "from-green-500 to-emerald-500",
    purple: "from-purple-500 to-pink-500",
    orange: "from-orange-500 to-red-500"
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { delay: index * 0.1, duration: 0.5 }
        }
      }}
      className="relative group"
    >
      <div className="text-center">
        <div className={`text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-r ${gradients[stat.color]} bg-clip-text text-transparent`}>
          {count}{stat.suffix}
        </div>
        <div className="text-gray-400 text-sm sm:text-base">
          {stat.label}
        </div>
      </div>
    </motion.div>
  );
};

export default StatsSection;