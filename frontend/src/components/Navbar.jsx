import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Brain,
  Home,
  LayoutDashboard,
  Radio,
} from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-40 bg-transparent backdrop-blur-md py-4"
      >
        {/* 🔥 Subtle Global Glow (works everywhere) */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-30 pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* GRID CENTERING */}
          <div className="grid grid-cols-3 items-center">

            {/* LEFT — LOGO */}
            <div className="flex justify-start">
              <Link to="/" className="flex items-center gap-2 group">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur-lg opacity-75 group-hover:opacity-100 transition-opacity" />
                  <div className="relative w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                </motion.div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  ResQAI
                </span>
              </Link>
            </div>

            {/* CENTER — NAV */}
            <div className="hidden md:flex justify-center">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = location.pathname === link.path;

                  return (
                    <Link key={link.path} to={link.path}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`relative px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
                          isActive
                            ? "text-white"
                            : "text-gray-400 hover:text-white"
                        }`}
                      >
                        <Icon size={16} />
                        <span className="text-sm font-medium">
                          {link.name}
                        </span>

                        {isActive && (
                          <motion.div
                            layoutId="activeNav"
                            className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full border border-blue-500/30"
                          />
                        )}
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* RIGHT — ACTIONS */}
            <div className="hidden md:flex justify-end items-center gap-3">
              <motion.a
                href="https://github.com/FuncLexa/ResQAI"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all"
              >
                <Radio size={18} />
                <span className="text-sm font-medium">GitHub</span>
              </motion.a>

              <Link to="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-medium text-white shadow-lg shadow-purple-500/30"
                >
                  Launch
                </motion.button>
              </Link>
            </div>

            {/* MOBILE BUTTON */}
            <div className="flex justify-end md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

          </div>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed top-16 right-0 w-full max-w-sm bg-[#0A0A0F]/95 backdrop-blur-xl z-30 p-6"
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link key={link.path} to={link.path}>
                  <div className="flex items-center gap-3 py-3 text-gray-300">
                    <Icon size={20} />
                    {link.name}
                  </div>
                </Link>
              );
            })}

            <div className="mt-4 flex items-center gap-2 text-gray-300">
              <Radio size={16} />
              GitHub
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;