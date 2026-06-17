"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/ui/Logo";

// The 6 journey frames from the storyboard
const frames = [
  {
    title: "BORN DEEP\nWITHIN THE EARTH",
    subtitle: "Million years of natural creation and energy.",
    image: "https://images.unsplash.com/photo-1578301978018-3005759f48f7?auto=format&fit=crop&w=1400&q=90",
  },
  {
    title: "HIDDEN DEEP.\nPURE BY NATURE.",
    subtitle: "Formed under extreme pressure and time.",
    image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?auto=format&fit=crop&w=1400&q=90",
  },
  {
    title: "DISCOVERED\nWITH CARE",
    subtitle: "Responsibly mined from the finest global sources.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1400&q=90",
  },
  {
    title: "FROM RAW\nTO REMARKABLE",
    subtitle: "Every gem begins as a rough promise.",
    image: "https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?auto=format&fit=crop&w=1400&q=90",
  },
  {
    title: "CRAFTED TO\nPERFECTION",
    subtitle: "Expert hands. Precision cut. Perfect symmetry.",
    image: "https://images.unsplash.com/photo-1599643478524-fb524b0d0f72?auto=format&fit=crop&w=1400&q=90",
  },
  {
    title: "POLISHED TO\nPERFECTION",
    subtitle: "Brilliance revealed. Beauty eternal.",
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1400&q=90",
  },
];

// The 9 Navratna gems
const navratna = [
  { stone: "Ruby", regional: "માણેક", color: "#9B1B30" },
  { stone: "Pearl", regional: "મોતી", color: "#E2DFD8" },
  { stone: "Red Coral", regional: "મૂંગો", color: "#C0392B" },
  { stone: "Emerald", regional: "પન્ના", color: "#053624" },
  { stone: "Yellow Sapphire", regional: "પોખરાજ", color: "#B8860B" },
  { stone: "Diamond", regional: "હીરો", color: "#E5E7EB" },
  { stone: "Blue Sapphire", regional: "નીલમ", color: "#1A3A6B" },
  { stone: "Hessonite", regional: "ગોમેદ", color: "#8B4513" },
  { stone: "Cat's Eye", regional: "લહસુનિયા", color: "#4A3728" },
];

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
    // Show each frame for 1.2s for better readability
    const frameInterval = setInterval(() => {
      setFrameIndex((prev) => {
        if (prev >= frames.length - 1) {
          clearInterval(frameInterval);
          setTimeout(() => setPhase("navratna"), 600);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);

    return () => clearInterval(frameInterval);
  }, []);

  useEffect(() => {
    if (phase === "navratna") {
      setTimeout(() => setPhase("logo"), 1800);
    }
    if (phase === "logo") {
      setTimeout(() => {
        setPhase("done");
        onComplete();
      }, 2500);
    }
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="brand-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] overflow-hidden bg-[#0A0A0A]"
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
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              
              <div className="absolute inset-0 bg-black/70" />
              
              {/* Gold progress bar */}
              <motion.div
                key={`bar-${frameIndex}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, ease: "linear" }}
                style={{ originX: 0 }}
                className="absolute top-0 left-0 right-0 h-[2px] bg-[#B8860B] z-20"
              />

              {/* Grid overlay (storyboard style) */}
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-[1px] z-10 p-2 md:p-8">
                {frames.map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0.1 }}
                    animate={{ opacity: i <= frameIndex ? 1 : 0.1 }}
                    transition={{ duration: 0.4 }}
                    className={`relative overflow-hidden flex items-end p-4 md:p-8 ${
                      i === frameIndex ? "ring-1 ring-[#B8860B]/80 shadow-[0_0_20px_rgba(184,134,11,0.2)]" : ""
                    }`}
                    style={{ background: i <= frameIndex ? "transparent" : "rgba(0,0,0,0.8)" }}
                  >
                    {i <= frameIndex && (
                      <img
                        src={f.image}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover opacity-60"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    
                    <div className="relative z-10 w-full">
                      <p className="font-serif text-white text-[0.65rem] md:text-sm lg:text-lg leading-tight whitespace-pre-line tracking-wide">
                        {f.title}
                      </p>
                      {i === frameIndex && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-2"
                        >
                          <div className="w-6 h-[1px] bg-[#B8860B] mb-2" />
                          <p className="text-white/60 text-[0.5rem] md:text-xs leading-relaxed">{f.subtitle}</p>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* ── PHASE 2: Navratna Gems Row ── */}
          {phase === "navratna" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full flex flex-col items-center justify-center px-6"
            >
              <div className="flex items-center gap-4 justify-center mb-6">
                <div className="h-[1px] w-12 bg-[#B8860B]/60" />
                <p className="text-[10px] uppercase tracking-[0.5em] text-[#B8860B]">The Nine Divine Gems</p>
                <div className="h-[1px] w-12 bg-[#B8860B]/60" />
              </div>
              <h3 className="font-serif text-3xl md:text-4xl text-white tracking-widest mb-16 uppercase">Navratna</h3>

              <div className="flex flex-wrap justify-center gap-6 md:gap-10 max-w-4xl">
                {navratna.map((gem, i) => (
                  <motion.div
                    key={gem.stone}
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center gap-3"
                  >
                    <div
                      className="w-10 h-10 md:w-16 md:h-16 rounded-full shadow-lg relative overflow-hidden"
                      style={{
                        background: `radial-gradient(circle at 35% 35%, ${gem.color}ff, ${gem.color}88)`,
                        boxShadow: `0 0 24px ${gem.color}66`,
                      }}
                    >
                      {/* Gem facets subtle overlay */}
                      <div className="absolute inset-0 opacity-30" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(0,0,0,0.4) 100%)" }} />
                    </div>
                    <p className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-white/80 text-center leading-tight mt-2">
                      {gem.stone}
                    </p>
                    <p className="text-[10px] md:text-[12px] text-[#B8860B] font-sans">{gem.regional}</p>
                    <p className="text-[8px] text-white/30 uppercase tracking-[0.1em] mt-1">{i + 1}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── PHASE 3: Logo Reveal (Using exact Site Logo) ── */}
          {phase === "logo" && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full h-full flex flex-col items-center justify-center relative"
            >
              {/* Radial backdrop */}
              <div
                className="absolute inset-0"
                style={{
                  background: "radial-gradient(ellipse at center, #1a1a1a 0%, #0A0A0A 60%)",
                }}
              />
              
              {/* Gold particles */}
              <div className="absolute inset-0 overflow-hidden opacity-30">
                {[...Array(40)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-[#B8860B]"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
                    transition={{
                      duration: 1.5 + Math.random() * 2,
                      delay: Math.random() * 1,
                      repeat: Infinity,
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10 flex flex-col items-center text-center gap-10">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="w-32 h-[1px] bg-[#B8860B]/60"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Logo variant="dark" noLink={true} className="scale-125 md:scale-150" />
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.2, delay: 1 }}
                  className="text-[#B8860B]/70 text-[9px] uppercase tracking-[0.5em] mt-4"
                >
                  From Earth's Depths to Timeless Luxury
                </motion.p>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
