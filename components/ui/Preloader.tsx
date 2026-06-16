"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lock body scroll while loading
    document.body.style.overflow = "hidden";
    
    // Simulate loading of high-res assets
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "";
      window.scrollTo(0, 0); // Ensure we start at the top
    }, 2500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-cream"
        >
          {/* Animated SVG Geometric Diamond */}
          <div className="w-24 h-24 mb-8">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                d="M50 5 L90 40 L75 90 L25 90 L10 40 Z" // Outer Diamond
                stroke="#1A1A1A" // Dark ink color for cream background
                strokeWidth="2"
              />
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                d="M50 20 L75 45 L65 75 L35 75 L25 45 Z" // Inner Cut
                stroke="#1A1A1A"
                strokeWidth="1"
              />
            </svg>
          </div>

          {/* Classic Wordmark Reveal */}
          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
              style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
              className="text-4xl md:text-5xl tracking-[0.08em] text-ink uppercase"
            >
              RADHA RANI
            </motion.h1>
          </div>
          
          <div className="overflow-hidden mb-12">
            <motion.p
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.5 }}
              className="text-[9px] uppercase tracking-[0.6em] text-ink/60"
            >
              High Jewelry
            </motion.p>
          </div>
          
          {/* Progress Line */}
          <motion.div 
            className="absolute bottom-20 w-48 h-[1px] bg-ink/10 overflow-hidden"
          >
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="w-full h-full bg-ink"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
