// src/components/home/HowItWorksSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Database, 
  BrainCircuit, 
  BarChart3, 
  BellRing,
  ArrowRight
} from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Database,
      title: "Data Collection",
      description: "Real-time data gathered from satellites, weather stations, and IoT sensors worldwide.",
      color: "blue",
      details: ["Satellite Imagery", "Weather Patterns", "Seismic Activity", "Ocean Data"]
    },
    {
      icon: BrainCircuit,
      title: "AI Processing",
      description: "Advanced neural networks analyze patterns and predict potential disaster scenarios.",
      color: "purple",
      details: ["Deep Learning", "Pattern Recognition", "Risk Modeling", "Predictive Analysis"]
    },
    {
      icon: BarChart3,
      title: "Risk Assessment",
      description: "Comprehensive risk evaluation with confidence scores and impact projections.",
      color: "green",
      details: ["Risk Scoring", "Impact Analysis", "Vulnerability Mapping", "Resource Planning"]
    },
    {
      icon: BellRing,
      title: "Alert & Response",
      description: "Instant notifications and actionable insights for rapid response coordination.",
      color: "orange",
      details: ["Real-time Alerts", "Evacuation Routes", "Resource Allocation", "Team Coordination"]
    }
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            How It{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Our sophisticated AI system processes vast amounts of data to provide accurate predictions and actionable insights
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 hidden lg:block" 
               style={{ transform: 'translateY(-50%)' }} />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:left-0 lg:-translate-x-1/2 z-10">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className={`w-12 h-12 rounded-full bg-gradient-to-r from-${step.color}-500 to-${step.color}-600 flex items-center justify-center border-4 border-[#0A0A0F] shadow-xl`}
                  >
                    <span className="text-white font-bold">{index + 1}</span>
                  </motion.div>
                </div>

                {/* Card */}
                <div className="pt-8 lg:pt-0">
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="relative p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300"
                  >
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-r from-${step.color}-500/20 to-${step.color}-600/20 flex items-center justify-center mb-4`}>
                      <step.icon className={`w-7 h-7 text-${step.color}-400`} />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 mb-4">
                      {step.description}
                    </p>

                    {/* Details List */}
                    <ul className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                          <ArrowRight className="w-4 h-4 text-blue-400" />
                          {detail}
                        </li>
                      ))}
                    </ul>

                    {/* Progress Indicator for Mobile */}
                    {index < steps.length - 1 && (
                      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 lg:hidden">
                        <ArrowRight className="w-6 h-6 text-gray-600 rotate-90" />
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;