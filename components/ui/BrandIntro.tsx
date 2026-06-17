"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// The 6 journey frames from the storyboard
const frames = [
  {
    title: "BORN DEEP\nWITHIN THE EARTH",
    subtitle: "Million years of natural creation and energy.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1400&q=90",
    col: "lg:col-span-4",
  },
  {
    title: "HIDDEN DEEP.\nPURE BY NATURE.",
    subtitle: "Formed under extreme pressure and time.",
    image: "https://images.unsplash.com/photo-1601887389937-0b02a26b4b3b?auto=format&fit=crop&w=1400&q=90",
    col: "lg:col-span-4",
  },
  {
    title: "DISCOVERED\nWITH CARE",
    subtitle: "Responsibly mined from the finest global sources.",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1400&q=90",
    col: "lg:col-span-4",
  },
  {
    title: "FROM RAW\nTO REMARKABLE",
    subtitle: "Every gem begins as a rough promise.",
    image: "https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?auto=format&fit=crop&w=1400&q=90",
    col: "lg:col-span-4",
  },
  {
    title: "CRAFTED TO\nPERFECTION",
    subtitle: "Expert hands. Precision cut. Perfect symmetry.",
    image: "https://images.unsplash.com/photo-1599643478524-fb524b0d0f72?auto=format&fit=crop&w=1400&q=90",
    col: "lg:col-span-4",
  },
  {
    title: "POLISHED TO\nPERFECTION",
    subtitle: "Brilliance revealed. Beauty eternal.",
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1400&q=90",
    col: "lg:col-span-4",
  },
];

// The 9 Navratna gems
const navratna = [
  { stone: "Ruby", hindi: "माणेक", color: "#9B1B30" },
  { stone: "Pearl", hindi: "मोती", color: "#9CA3AF" },
  { stone: "Red Coral", hindi: "मूँगो", color: "#C0392B" },
  { stone: "Emerald", hindi: "पन्ना", color: "#053624" },
  { stone: "Yellow Sapphire", hindi: "पोखराज", color: "#B8860B" },
  { stone: "Diamond", hindi: "हीरो", color: "#6B7280" },
  { stone: "Blue Sapphire", hindi: "नीलम", color: "#1A3A6B" },
  { stone: "Hessonite", hindi: "गोमेट", color: "#8B4513" },
  { stone: "Cat's Eye", hindi: "लहसुनीया", color: "#4A3728" },
];

// Gem dot colors
const gemColors = ["#9B1B30","#D4D0C8","#C0392B","#10B981","#F59E0B","#E5E7EB","#1D4ED8","#B45309","#78716C"];

// Total animation: 0.8s per frame × 6 = 4.8s, then 1.5s for navratna, then 1.5s for logo = ~8s
// We'll run the whole thing in 6 seconds with compressed timing

const TOTAL_MS = 6000;

export function BrandIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"frames" | "navratna" | "logo" | "done">("frames");
  const [frameIndex, setFrameIndex] = useState(0);

  // Lock body scroll during intro
  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    // Show each frame for 0.7s
    const frameInterval = setInterval(() => {
      setFrameIndex((prev) => {
        if (prev >= frames.length - 1) {
          clearInterval(frameInterval);
          setTimeout(() => setPhase("navratna"), 300);
          return prev;
        }
        return prev + 1;
      });
    }, 700);

    return () => clearInterval(frameInterval);
  }, []);

  useEffect(() => {
    if (phase === "navratna") {
      setTimeout(() => setPhase("logo"), 1400);
    }
    if (phase === "logo") {
      setTimeout(() => {
        setPhase("done");
        onComplete();
      }, 2000);
    }
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="brand-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] overflow-hidden"
          style={{ background: "#0A0A0A" }}
        >
          {/* ── PHASE 1: Journey Frames (6 panels cycling) ── */}
          {phase === "frames" && (
            <div className="relative w-full h-full">
              {/* Background image crossfade */}
              <AnimatePresence mode="sync">
                <motion.img
                  key={frameIndex}
                  src={frames[frameIndex].image}
                  alt=""
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/65" />
              
              {/* Gold progress bar */}
              <motion.div
                key={`bar-${frameIndex}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, ease: "linear" }}
                style={{ originX: 0 }}
                className="absolute top-0 left-0 right-0 h-[2px] bg-[#B8860B]"
              />

              {/* 6-panel grid overlay (storyboard style) */}
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-[1px]">
                {frames.map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0.1 }}
                    animate={{ opacity: i <= frameIndex ? 1 : 0.1 }}
                    transition={{ duration: 0.4 }}
                    className={`relative overflow-hidden flex items-end p-4 md:p-6 ${
                      i === frameIndex ? "ring-1 ring-[#B8860B]/60" : ""
                    }`}
                    style={{ background: i <= frameIndex ? "transparent" : "rgba(0,0,0,0.6)" }}
                  >
                    {i <= frameIndex && (
                      <img
                        src={f.image}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover opacity-70"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    
                    <div className="relative z-10">
                      <p className="font-serif text-white text-[0.6rem] md:text-sm lg:text-base leading-tight whitespace-pre-line" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>
                        {f.title}
                      </p>
                      {i === frameIndex && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-1"
                        >
                          <div className="w-4 h-[1px] bg-[#B8860B] mb-1" />
                          <p className="text-white/50 text-[0.45rem] md:text-[0.6rem] leading-tight">{f.subtitle}</p>
                        </motion.div>
                      )}
                    </div>
                    
                    {/* Arrow connector (not last in row) */}
                    {(i === 0 || i === 1 || i === 3 || i === 4) && (
                      <div className="absolute right-1 top-1/2 -translate-y-1/2 text-[#B8860B]/60 text-xs z-20">→</div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Step counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-[0.4em] text-white/30">
                {String(frameIndex + 1).padStart(2, "0")} / 06
              </div>
            </div>
          )}

          {/* ── PHASE 2: Navratna Gems Row ── */}
          {phase === "navratna" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full h-full flex flex-col items-center justify-center px-6"
            >
              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-10"
              >
                <div className="flex items-center gap-4 justify-center mb-3">
                  <div className="h-[1px] w-12 bg-[#B8860B]/60" />
                  <p className="text-[9px] uppercase tracking-[0.5em] text-[#B8860B]">The Nine Divine Gems</p>
                  <div className="h-[1px] w-12 bg-[#B8860B]/60" />
                </div>
                <h3 className="font-serif text-2xl md:text-3xl text-white tracking-wide">Navratna</h3>
              </motion.div>

              {/* 9 gem circles */}
              <div className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-2xl">
                {navratna.map((gem, i) => (
                  <motion.div
                    key={gem.stone}
                    initial={{ opacity: 0, scale: 0, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center gap-2"
                  >
                    {/* Gem circle */}
                    <div
                      className="w-8 h-8 md:w-12 md:h-12 rounded-full shadow-lg"
                      style={{
                        background: `radial-gradient(circle at 35% 35%, ${gemColors[i]}ee, ${gemColors[i]}55)`,
                        boxShadow: `0 0 16px ${gemColors[i]}55`,
                      }}
                    />
                    <p className="text-[7px] md:text-[9px] uppercase tracking-[0.15em] text-white/60 text-center leading-tight">
                      {gem.stone}
                    </p>
                    <p className="text-[8px] md:text-[10px] text-white/40 font-sans">{gem.hindi}</p>
                    <p className="text-[7px] text-white/20 uppercase tracking-[0.1em]">{i + 1}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── PHASE 3: Logo Reveal ── */}
          {phase === "logo" && (
            <div className="w-full h-full flex items-center justify-center">
              {/* Radiant background glow */}
              <div
                className="absolute inset-0"
                style={{
                  background: "radial-gradient(ellipse at center, #1a0a00 0%, #0A0A0A 70%)",
                }}
              />
              {/* Gold particle shimmer */}
              <div className="absolute inset-0 overflow-hidden opacity-20">
                {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-0.5 h-0.5 rounded-full bg-[#B8860B]"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
                    transition={{
                      duration: 1.5 + Math.random(),
                      delay: Math.random() * 0.5,
                      repeat: Infinity,
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10 flex flex-col items-center text-center gap-6">
                {/* Gold horizontal rule */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="w-24 h-[1px] bg-[#B8860B]"
                />

                {/* Logo image */}
                <motion.img
                  src="/logo.png"
                  alt="Radha Rani"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="h-24 md:h-32 w-auto object-contain invert"
                />

                {/* Brand name */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="flex flex-col items-center gap-3"
                >
                  <h1
                    className="text-white uppercase tracking-[0.18em]"
                    style={{
                      fontFamily: '"Cormorant Garamond", Georgia, serif',
                      fontSize: "clamp(1.4rem, 4vw, 2.2rem)",
                      fontWeight: 400,
                    }}
                  >
                    Radha Rani
                  </h1>
                  <p
                    className="text-[#B8860B]/80 uppercase"
                    style={{
                      fontFamily: '"Inter", sans-serif',
                      fontSize: "0.55rem",
                      letterSpacing: "0.55em",
                      fontWeight: 300,
                    }}
                  >
                    The Heritage Collection
                  </p>
                </motion.div>

                {/* Tagline */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.9 }}
                  className="text-white/25 text-[9px] uppercase tracking-[0.4em]"
                >
                  From Earth's Depths to Timeless Luxury
                </motion.p>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="w-24 h-[1px] bg-[#B8860B]"
                />
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
