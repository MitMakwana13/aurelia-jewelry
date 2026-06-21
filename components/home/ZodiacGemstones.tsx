"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const zodiacData = [
  { sign: "Aries", hindi: "Mesh", symbol: "♈", stone: "Red Coral", stoneHindi: "Moonga" },
  { sign: "Taurus", hindi: "Vrishabh", symbol: "♉", stone: "Diamond", stoneHindi: "Heera" },
  { sign: "Gemini", hindi: "Mithun", symbol: "♊", stone: "Emerald", stoneHindi: "Panna" },
  { sign: "Cancer", hindi: "Karka", symbol: "♋", stone: "Pearl", stoneHindi: "Moti" },
  { sign: "Leo", hindi: "Simha", symbol: "♌", stone: "Ruby", stoneHindi: "Manik" },
  { sign: "Virgo", hindi: "Kanya", symbol: "♍", stone: "Emerald", stoneHindi: "Panna" },
  { sign: "Libra", hindi: "Tula", symbol: "♎", stone: "Diamond", stoneHindi: "Heera" },
  { sign: "Scorpio", hindi: "Vrishchik", symbol: "♏", stone: "Red Coral", stoneHindi: "Moonga" },
  { sign: "Sagittarius", hindi: "Dhanu", symbol: "♐", stone: "Yellow Sapphire", stoneHindi: "Pukhraj" },
  { sign: "Capricorn", hindi: "Makar", symbol: "♑", stone: "Blue Sapphire", stoneHindi: "Neelam" },
  { sign: "Aquarius", hindi: "Kumbh", symbol: "♒", stone: "Blue Sapphire", stoneHindi: "Neelam" },
  { sign: "Pisces", hindi: "Meen", symbol: "♓", stone: "Yellow Sapphire", stoneHindi: "Pukhraj" },
];

export function ZodiacGemstones() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-ink text-cream relative overflow-hidden">
      {/* Decorative astrological circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-cream/5 rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-cream/5 rounded-full pointer-events-none" />

      <div className="container-x relative z-10">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="eyebrow tracking-[0.3em] mb-4 text-cream/60"
          >
            Cosmic Alignment
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl font-light tracking-tight text-white mb-6"
          >
            Your Astrological Resonance
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-cream/50 leading-relaxed font-serif italic text-lg"
          >
            For millennia, master astrologers have mapped the profound connection between the celestial bodies and the earth&apos;s rarest gems. Discover the singular stone destined to harmonize with your zodiac signature, amplifying your natural prosperity and shielding your legacy.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {zodiacData.map((zodiac, i) => (
            <motion.div
              key={zodiac.sign}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * (i % 4) }}
              className="group relative p-6 border border-cream/10 bg-cream/5 hover:bg-cream/10 transition-colors flex flex-col items-center text-center cursor-pointer"
            >
              <div className="text-3xl text-cream/30 group-hover:text-[#053624] transition-colors mb-4 font-light">
                {zodiac.symbol}
              </div>
              <h3 className="text-[11px] uppercase tracking-[0.25em] text-white mb-1">
                {zodiac.sign}
              </h3>
              <p className="text-[9px] uppercase tracking-[0.2em] text-cream/40 mb-6">
                {zodiac.hindi}
              </p>
              
              <div className="w-8 h-[1px] bg-cream/20 mb-6 group-hover:bg-[#053624] transition-colors" />
              
              <p className="font-serif text-lg text-cream/90 group-hover:text-white transition-colors">
                {zodiac.stone}
              </p>
              <p className="font-serif italic text-cream/50">
                {zodiac.stoneHindi}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
