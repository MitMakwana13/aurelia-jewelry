"use client";

import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/Icons";

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
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="container-x">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-20">
          <div className="max-w-xl">
            <p className="text-[10px] uppercase tracking-[0.3em] mb-4 text-ink/50">
              Cosmic Alignment
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-ink leading-tight">
              The Zodiac Guide
            </h2>
          </div>
          <div className="max-w-md text-ink/70 text-sm leading-relaxed pb-2">
            For millennia, Vedic master astrologers have mapped the profound resonance between cosmic energies and the earth's rarest gems. Find your alignment below.
          </div>
        </div>

        {/* Architectural Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 border-t border-l border-ink/10">
          {zodiacData.map((zodiac) => (
            <div 
              key={zodiac.sign}
              className="group relative flex flex-col justify-between aspect-square p-8 border-b border-r border-ink/10 hover:bg-ink transition-colors duration-500 cursor-default overflow-hidden"
            >
              {/* Top Row: Symbol & Planet */}
              <div className="flex justify-between items-start z-10">
                <span className="text-2xl text-ink/40 group-hover:text-white/40 transition-colors duration-500">
                  {zodiac.symbol}
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-ink/40 group-hover:text-white/40 transition-colors duration-500">
                  {zodiac.ruling}
                </span>
              </div>

              {/* Huge Background Symbol (Decorative) */}
              <div className="absolute -bottom-10 -right-6 text-[12rem] text-ink/[0.02] group-hover:text-white/[0.04] transition-colors duration-500 select-none pointer-events-none font-serif leading-none">
                {zodiac.symbol}
              </div>

              {/* Bottom Row: Zodiac & Stone */}
              <div className="z-10">
                <div className="mb-6">
                  <h3 className="font-serif text-2xl text-ink group-hover:text-white transition-colors duration-500 mb-1">
                    {zodiac.sign}
                  </h3>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-ink/50 group-hover:text-white/50 transition-colors duration-500">
                    {zodiac.hindi}
                  </p>
                </div>
                
                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-ink/40 group-hover:text-white/40 transition-colors duration-500 mb-1">
                    Gemstone
                  </p>
                  <p className="font-serif text-lg text-ink group-hover:text-white transition-colors duration-500">
                    {zodiac.stone} <span className="italic text-sm text-ink/60 group-hover:text-white/60">({zodiac.stoneHindi})</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 flex justify-center">
          <Link
            href="/custom"
            className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-ink hover:text-ink/70 transition-colors"
          >
            Consult a Gemologist 
            <span className="group-hover:translate-x-2 transition-transform duration-300">
              <ArrowRightIcon width={14} height={14} />
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
}
