import { motion } from "framer-motion";

const FeatureCard = ({ icon: Icon, title, desc }) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.04 }}
      className="relative group"
    >
      {/* 🔥 PERMANENT SOFT GLOW */}
      <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 opacity-20 blur-xl group-hover:opacity-60 transition duration-500"></div>

      {/* 🔥 HOVER INTENSE GLOW */}
      <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 blur-md transition duration-500"></div>

      {/* CARD */}
      <div className="relative bg-[#111118]/80 backdrop-blur-xl border border-[#1e1e2e] rounded-xl p-6 h-full transition-all duration-300 group-hover:border-transparent">
        
        {/* ICON */}
        <div className="mb-4 w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-indigo-400 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] transition">
          <Icon size={24} />
        </div>

        {/* TITLE */}
        <h3 className="text-lg font-semibold text-white mb-2">
          {title}
        </h3>

        {/* DESC */}
        <p className="text-gray-400 text-sm leading-relaxed">
          {desc}
        </p>

        {/* 🔥 BOTTOM ACCENT LINE */}
        <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-500"></div>
      </div>
    </motion.div>
  );
};

export default FeatureCard;