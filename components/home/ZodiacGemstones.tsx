"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon } from "@/components/ui/Icons";

const zodiacData = [
  { sign: "Aries", hindi: "Mesh", stone: "Red Coral", stoneHindi: "Moonga", ruling: "Mars" },
  { sign: "Taurus", hindi: "Vrishabh", stone: "Diamond", stoneHindi: "Heera", ruling: "Venus" },
  { sign: "Gemini", hindi: "Mithun", stone: "Emerald", stoneHindi: "Panna", ruling: "Mercury" },
  { sign: "Cancer", hindi: "Karka", stone: "Pearl", stoneHindi: "Moti", ruling: "Moon" },
  { sign: "Leo", hindi: "Simha", stone: "Ruby", stoneHindi: "Manik", ruling: "Sun" },
  { sign: "Virgo", hindi: "Kanya", stone: "Emerald", stoneHindi: "Panna", ruling: "Mercury" },
  { sign: "Libra", hindi: "Tula", stone: "Diamond", stoneHindi: "Heera", ruling: "Venus" },
  { sign: "Scorpio", hindi: "Vrishchik", stone: "Red Coral", stoneHindi: "Moonga", ruling: "Mars" },
  { sign: "Sagittarius", hindi: "Dhanu", stone: "Yellow Sapphire", stoneHindi: "Pukhraj", ruling: "Jupiter" },
  { sign: "Capricorn", hindi: "Makar", stone: "Blue Sapphire", stoneHindi: "Neelam", ruling: "Saturn" },
  { sign: "Aquarius", hindi: "Kumbh", stone: "Blue Sapphire", stoneHindi: "Neelam", ruling: "Saturn" },
  { sign: "Pisces", hindi: "Meen", stone: "Yellow Sapphire", stoneHindi: "Pukhraj", ruling: "Jupiter" },
];

export function ZodiacGemstones() {
  return (
    <section className="py-32 lg:py-40 bg-cream">
      <div className="container-x max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-24">
          <p className="text-[10px] uppercase tracking-[0.3em] mb-6 text-ink/40">
            Cosmic Alignment
          </p>
          <h2 className="font-serif text-5xl md:text-6xl text-ink leading-tight mb-8">
            The Zodiac Guide
          </h2>
          <div className="max-w-xl mx-auto text-ink/60 text-base md:text-lg leading-relaxed font-serif italic">
            For millennia, Vedic master astrologers have mapped the profound resonance between cosmic energies and the earth's rarest gems. Find your alignment below.
          </div>
        </div>

        {/* Ultra-Minimal Menu List */}
        <div className="flex flex-col border-t border-ink/10">
          {zodiacData.map((zodiac) => (
            <div 
              key={zodiac.sign}
              className="group flex flex-col md:flex-row items-start md:items-center justify-between py-8 md:py-10 border-b border-ink/10 hover:bg-ink/[0.02] transition-colors px-4 -mx-4"
            >
              {/* Left: Zodiac & Image */}
              <div className="w-full md:w-1/3 mb-4 md:mb-0 flex items-center gap-6">
                <div className="relative w-16 h-16 md:w-20 md:h-20 shrink-0 overflow-hidden rounded-full border border-ink/10 shadow-sm bg-white">
                  <Image
                    src={`/zodiacs/${zodiac.sign.toLowerCase()}.png`}
                    alt={`${zodiac.sign} symbol`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-3xl md:text-4xl text-ink group-hover:text-[#053624] transition-colors mb-2">
                    {zodiac.sign}
                  </h3>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-ink/40">
                    {zodiac.hindi}
                  </p>
                </div>
              </div>

              {/* Middle: Ruling Planet (Hidden on mobile for cleaner look) */}
              <div className="hidden md:flex w-1/3 justify-center">
                <div className="text-center">
                  <p className="text-[9px] uppercase tracking-[0.25em] text-ink/30 mb-1">Ruling</p>
                  <p className="text-xs uppercase tracking-[0.1em] text-ink/50">{zodiac.ruling}</p>
                </div>
              </div>

              {/* Right: Gemstone */}
              <div className="w-full md:w-1/3 text-left md:text-right flex flex-col md:items-end">
                <p className="font-serif text-2xl md:text-3xl text-ink mb-2">
                  {zodiac.stone}
                </p>
                <p className="font-serif italic text-base text-ink/50">
                  {zodiac.stoneHindi}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-20 flex justify-center">
          <Link
            href="/custom"
            className="group flex flex-col items-center gap-4 text-ink hover:text-[#053624] transition-colors"
          >
            <span className="text-[11px] uppercase tracking-[0.25em] border-b border-ink/20 pb-1">
              Consult a Master Gemologist
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
}
