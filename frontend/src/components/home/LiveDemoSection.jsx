// src/components/home/LiveDemoSection.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  AlertTriangle, 
  Shield, 
  Activity,
  MapPin,
  Wind,
  Droplets,
  ThermometerSun
} from 'lucide-react';

const LiveDemoSection = () => {
  const [riskLevel, setRiskLevel] = useState('medium');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const riskColors = {
    low: 'from-green-500 to-emerald-500',
    medium: 'from-yellow-500 to-orange-500',
    high: 'from-red-500 to-rose-500'
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const risks = ['low', 'medium', 'high'];
      setRiskLevel(risks[Math.floor(Math.random() * risks.length)]);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Experience It{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Live
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Try our interactive demo and see how our AI analyzes environmental data to predict disaster risks
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Demo Interface */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl"
          >
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
              <Activity className="w-6 h-6 text-blue-400" />
              Environmental Data Input
            </h3>

            {/* Input Fields */}
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-gray-400">
                    <ThermometerSun className="w-4 h-4" />
                    Temperature (°C)
                  </label>
                  <input
                    type="number"
                    defaultValue="28"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-gray-400">
                    <Droplets className="w-4 h-4" />
                    Humidity (%)
                  </label>
                  <input
                    type="number"
                    defaultValue="75"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-gray-400">
                    <Wind className="w-4 h-4" />
                    Wind Speed (km/h)
                  </label>
                  <input
                    type="number"
                    defaultValue="45"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-gray-400">
                    <MapPin className="w-4 h-4" />
                    Location
                  </label>
                  <select className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors">
                    <option value="coastal">Coastal Region</option>
                    <option value="mountain">Mountain Area</option>
                    <option value="urban">Urban Center</option>
                    <option value="forest">Forest Zone</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Analyze Button */}
            <motion.button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold text-white relative overflow-hidden group ${
                isAnalyzing ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isAnalyzing ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Run Risk Analysis
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          </motion.div>

          {/* Results Display */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl"
          >
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
              <Shield className="w-6 h-6 text-purple-400" />
              Risk Assessment Results
            </h3>

            {/* Risk Gauge */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Risk Level</span>
                <span className={`text-lg font-semibold capitalize bg-gradient-to-r ${riskColors[riskLevel]} bg-clip-text text-transparent`}>
                  {riskLevel}
                </span>
              </div>
              <div className="relative h-4 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: riskLevel === 'low' ? '30%' : riskLevel === 'medium' ? '60%' : '90%' }}
                  transition={{ duration: 1 }}
                  className={`absolute inset-y-0 left-0 bg-gradient-to-r ${riskColors[riskLevel]} rounded-full`}
                />
              </div>
            </div>

            {/* Recommendations */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                Recommendations
              </h4>
              <ul className="space-y-3">
                {riskLevel === 'low' && (
                  <>
                    <li className="flex items-start gap-2 text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2" />
                      Monitor weather updates regularly
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2" />
                      Review emergency preparedness plans
                    </li>
                  </>
                )}
                {riskLevel === 'medium' && (
                  <>
                    <li className="flex items-start gap-2 text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                      Stay alert for official warnings
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                      Prepare emergency supplies
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2" />
                      Identify safe evacuation routes
                    </li>
                  </>
                )}
                {riskLevel === 'high' && (
                  <>
                    <li className="flex items-start gap-2 text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2" />
                      Follow evacuation orders immediately
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2" />
                      Secure important documents
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2" />
                      Contact emergency services if needed
                    </li>
                  </>
                )}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LiveDemoSection;