"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

const zodiacData = [
  { sign: "Aries", hindi: "Mesh", symbol: "♈", stone: "Red Coral", stoneHindi: "Moonga", ruling: "Mars" },
  { sign: "Taurus", hindi: "Vrishabh", symbol: "♉", stone: "Diamond", stoneHindi: "Heera", ruling: "Venus" },
  { sign: "Gemini", hindi: "Mithun", symbol: "♊", stone: "Emerald", stoneHindi: "Panna", ruling: "Mercury" },
  { sign: "Cancer", hindi: "Karka", symbol: "♋", stone: "Pearl", stoneHindi: "Moti", ruling: "Moon" },
  { sign: "Leo", hindi: "Simha", symbol: "♌", stone: "Ruby", stoneHindi: "Manik", ruling: "Sun" },
  { sign: "Virgo", hindi: "Kanya", symbol: "♍", stone: "Emerald", stoneHindi: "Panna", ruling: "Mercury" },
  { sign: "Libra", hindi: "Tula", symbol: "♎", stone: "Diamond", stoneHindi: "Heera", ruling: "Venus" },
  { sign: "Scorpio", hindi: "Vrishchik", symbol: "♏", stone: "Red Coral", stoneHindi: "Moonga", ruling: "Mars" },
  { sign: "Sagittarius", hindi: "Dhanu", symbol: "♐", stone: "Yellow Sapphire", stoneHindi: "Pukhraj", ruling: "Jupiter" },
  { sign: "Capricorn", hindi: "Makar", symbol: "♑", stone: "Blue Sapphire", stoneHindi: "Neelam", ruling: "Saturn" },
  { sign: "Aquarius", hindi: "Kumbh", symbol: "♒", stone: "Blue Sapphire", stoneHindi: "Neelam", ruling: "Saturn" },
  { sign: "Pisces", hindi: "Meen", symbol: "♓", stone: "Yellow Sapphire", stoneHindi: "Pukhraj", ruling: "Jupiter" },
];

export function ZodiacGemstones() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-cream">
      <div className="container-x">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-20">
          <div className="lg:col-span-5">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="eyebrow tracking-[0.3em] mb-6 text-[#053624]"
            >
              Cosmic Alignment
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl font-light tracking-tight text-ink leading-tight"
            >
              Your Celestial Stone
            </motion.h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 flex items-end">
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-ink/60 leading-relaxed font-serif italic text-lg"
            >
              For millennia, Vedic master astrologers have mapped the profound resonance between the nine cosmic energies and the earth&apos;s rarest gems. Find your birthstone below and begin your alignment.
            </motion.p>
          </div>
        </div>

        {/* Animated top rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="h-[1px] bg-ink/15 w-full origin-left"
        />

        {/* Table Column Headers — desktop only */}
        <div className="hidden md:grid grid-cols-12 gap-4 py-4 border-b border-ink/10">
          <p className="col-span-1 text-[9px] uppercase tracking-[0.25em] text-ink/30">#</p>
          <p className="col-span-4 text-[9px] uppercase tracking-[0.25em] text-ink/30">Zodiac Sign</p>
          <p className="col-span-3 text-[9px] uppercase tracking-[0.25em] text-ink/30">Ruling Planet</p>
          <p className="col-span-4 text-[9px] uppercase tracking-[0.25em] text-ink/30">Lucky Gemstone</p>
        </div>

        {/* Rows */}
        <div>
          {zodiacData.map((zodiac, i) => (
            <motion.div
              key={zodiac.sign}
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.05 * i }}
              className="group grid grid-cols-2 md:grid-cols-12 gap-4 items-center py-6 border-b border-ink/10 hover:bg-[#053624]/5 transition-colors px-2 -mx-2 cursor-default"
            >
              {/* Index */}
              <p className="hidden md:block col-span-1 font-serif text-ink/20 text-sm">
                {String(i + 1).padStart(2, "0")}
              </p>

              {/* Zodiac */}
              <div className="col-span-1 md:col-span-4">
                <div className="flex items-center gap-3">
                  <span className="text-ink/20 text-base leading-none select-none">{zodiac.symbol}</span>
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl text-ink group-hover:text-[#053624] transition-colors duration-300">
                      {zodiac.sign}
                    </h3>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-ink/40 mt-0.5">{zodiac.hindi}</p>
                  </div>
                </div>
              </div>

              {/* Planet */}
              <p className="hidden md:block col-span-3 text-[11px] uppercase tracking-[0.15em] text-ink/40">
                {zodiac.ruling}
              </p>

              {/* Gemstone */}
              <div className="col-span-1 md:col-span-4 text-right md:text-left">
                <p className="font-serif text-xl md:text-2xl text-ink">
                  {zodiac.stone}
                </p>
                <p className="font-serif italic text-ink/50 text-sm mt-0.5">{zodiac.stoneHindi}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <p className="text-[11px] uppercase tracking-[0.2em] text-ink/40 max-w-sm">
            Our master gemologists can advise on the ideal stone for your precise birth chart.
          </p>
          <Link
            href="/custom"
            className="text-[11px] uppercase tracking-[0.2em] text-[#053624] border-b border-[#053624]/30 hover:border-[#053624] pb-1 transition-colors whitespace-nowrap"
          >
            Book a Consultation →
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
