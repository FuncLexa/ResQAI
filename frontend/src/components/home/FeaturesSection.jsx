// src/components/home/FeaturesSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  CloudLightning, 
  MapPin, 
  Bell, 
  Database, 
  Shield,
  TrendingUp,
  Users
} from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Predictions",
      description: "Advanced machine learning algorithms analyze multiple data points for accurate risk assessment.",
      gradient: "from-blue-500 to-cyan-500",
      delay: 0.1
    },
    {
      icon: CloudLightning,
      title: "Real-time Weather Data",
      description: "Continuous monitoring of weather patterns and environmental conditions worldwide.",
      gradient: "from-purple-500 to-pink-500",
      delay: 0.2
    },
    {
      icon: MapPin,
      title: "Geographic Intelligence",
      description: "Precise location-based risk mapping with satellite imagery integration.",
      gradient: "from-green-500 to-emerald-500",
      delay: 0.3
    },
    {
      icon: Bell,
      title: "Instant Alert System",
      description: "Immediate notifications for high-risk areas with evacuation recommendations.",
      gradient: "from-red-500 to-orange-500",
      delay: 0.4
    },
    {
      icon: Database,
      title: "Historical Analysis",
      description: "Comprehensive database of past disasters for pattern recognition and trend analysis.",
      gradient: "from-yellow-500 to-amber-500",
      delay: 0.5
    },
    {
      icon: Shield,
      title: "Community Protection",
      description: "Tools and resources for local authorities to implement preventive measures.",
      gradient: "from-indigo-500 to-purple-500",
      delay: 0.6
    },
    {
      icon: TrendingUp,
      title: "Risk Forecasting",
      description: "7-day advanced forecasting with confidence scores and scenario planning.",
      gradient: "from-teal-500 to-green-500",
      delay: 0.7
    },
    {
      icon: Users,
      title: "Collaborative Network",
      description: "Connect with emergency services and disaster response teams seamlessly.",
      gradient: "from-pink-500 to-rose-500",
      delay: 0.8
    }
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Cutting-Edge{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Features
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Empowering communities with state-of-the-art technology for disaster preparedness and response
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: feature.delay }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.2 }
              }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl"
                style={{
                  background: `linear-gradient(135deg, ${feature.gradient.split(' ')[1]}20, ${feature.gradient.split(' ')[3]}20)`
                }}
              />
              
              <div className="relative h-full p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.gradient} p-0.5 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="w-full h-full rounded-xl bg-gray-900 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* Learn More Link */}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Learn more →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;