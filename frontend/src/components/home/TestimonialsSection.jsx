// src/components/home/TestimonialsSection.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "Director of Emergency Management",
      organization: "Pacific Disaster Center",
      content: "DisasterGuard AI has revolutionized our early warning systems. The accuracy of predictions has helped us save countless lives and resources.",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=1"
    },
    {
      name: "Marcus Rodriguez",
      role: "Chief Resilience Officer",
      organization: "Coastal City Authority",
      content: "The real-time monitoring and instant alerts have been game-changing for our community preparedness. We can now respond to threats before they escalate.",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=2"
    },
    {
      name: "Dr. Emily Watson",
      role: "Climate Scientist",
      organization: "Global Climate Institute",
      content: "The AI's ability to process multiple data streams and provide accurate risk assessments is unprecedented. It's become an essential tool in our research.",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=3"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Trusted by{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Experts
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            See what disaster management professionals say about our platform
          </p>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="relative p-8 md:p-12 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl"
            >
              <Quote className="absolute top-8 right-8 w-16 h-16 text-blue-500/20" />
              
              <div className="flex flex-col md:flex-row gap-8 items-center">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-75" />
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="relative w-24 h-24 rounded-full border-2 border-white/20"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex justify-center md:justify-start gap-1 mb-4">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  
                  <p className="text-lg text-gray-300 mb-6 italic">
                    "{testimonials[currentIndex].content}"
                  </p>
                  
                  <div>
                    <h4 className="text-xl font-semibold text-white">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-gray-400">
                      {testimonials[currentIndex].role}
                    </p>
                    <p className="text-sm text-blue-400">
                      {testimonials[currentIndex].organization}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 p-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 p-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-gradient-to-r from-blue-500 to-purple-500'
                    : 'w-2 bg-white/20 hover:bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;