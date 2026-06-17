"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const navratna = [
  {
    planet: "☀",
    planetName: "Sun",
    stone: "Ruby",
    hindi: "माणिक्य",
    gujarati: "માણિક",
    transliteration: "Manik",
    color: "#9B1B30",
    bg: "#FFF5F6",
    image: "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?auto=format&fit=crop&w=600&q=80",
    desc: "The sovereign stone of vitality, leadership and self-confidence.",
  },
  {
    planet: "🌙",
    planetName: "Moon",
    stone: "Pearl",
    hindi: "मोती",
    gujarati: "મોતી",
    transliteration: "Moti",
    color: "#7C8FA6",
    bg: "#F5F8FF",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=600&q=80",
    desc: "The gem of tranquility, intuition and emotional harmony.",
  },
  {
    planet: "♂",
    planetName: "Mars",
    stone: "Red Coral",
    hindi: "मूँगा",
    gujarati: "મૂંગો",
    transliteration: "Moonga",
    color: "#C0392B",
    bg: "#FFF5F5",
    image: "https://images.unsplash.com/photo-1535556116002-6281ff3e9f36?auto=format&fit=crop&w=600&q=80",
    desc: "The stone of courage, energy and protective strength.",
  },
  {
    planet: "☿",
    planetName: "Mercury",
    stone: "Emerald",
    hindi: "पन्ना",
    gujarati: "પન્ના",
    transliteration: "Panna",
    color: "#053624",
    bg: "#F2FAF5",
    image: "https://images.unsplash.com/photo-1599643478524-fb524b0d0f72?auto=format&fit=crop&w=600&q=80",
    desc: "The gem of intellect, communication and creative wisdom.",
  },
  {
    planet: "♃",
    planetName: "Jupiter",
    stone: "Yellow Sapphire",
    hindi: "पुखराज",
    gujarati: "પોખરાજ",
    transliteration: "Pukhraj",
    color: "#B8860B",
    bg: "#FFFBF0",
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=600&q=80",
    desc: "The stone of abundance, divine grace and higher knowledge.",
  },
  {
    planet: "♀",
    planetName: "Venus",
    stone: "Diamond",
    hindi: "हीरा",
    gujarati: "હીરો",
    transliteration: "Heera",
    color: "#4A5568",
    bg: "#F7F9FC",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80",
    desc: "The gem of beauty, love, luxury and eternal brilliance.",
  },
  {
    planet: "♄",
    planetName: "Saturn",
    stone: "Blue Sapphire",
    hindi: "नीलम",
    gujarati: "નીલમ",
    transliteration: "Neelam",
    color: "#1A3A6B",
    bg: "#F0F4FF",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80",
    desc: "The most powerful stone of karma, discipline and prosperity.",
  },
  {
    planet: "☊",
    planetName: "Rahu",
    stone: "Hessonite Garnet",
    hindi: "गोमेद",
    gujarati: "ગોમેદ",
    transliteration: "Gomed",
    color: "#6B3A1A",
    bg: "#FFF8F5",
    image: "https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?auto=format&fit=crop&w=600&q=80",
    desc: "The stone of clarity, ambition and cosmic alignment.",
  },
  {
    planet: "☋",
    planetName: "Ketu",
    stone: "Cat's Eye",
    hindi: "लहसुनिया",
    gujarati: "લહસુનીયા",
    transliteration: "Lehsunia",
    color: "#4A3728",
    bg: "#FAF5EE",
    image: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&w=600&q=80",
    desc: "The mystical stone of intuition, moksha and spiritual protection.",
  },
];

export function NavratnaCollection() {
  return (
    <section className="py-28 lg:py-36 bg-white">
      <div className="container-x">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[10px] uppercase tracking-[0.4em] text-[#053624]/70 mb-4"
          >
            The Nine Cosmic Energies
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink leading-tight tracking-tight"
          >
            Navratna Collection
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-6 max-w-xl mx-auto text-sm leading-loose text-ink/60"
          >
            Nine sacred gemstones, each attuned to a celestial body. Authenticated, 
            lab-tested and set by master craftsmen who understand the ancient science of cosmic alignment.
          </motion.p>
        </div>

        {/* 9-stone grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {navratna.map((gem, i) => (
            <motion.div
              key={gem.stone}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.07 }}
            >
              <Link
                href={`/shop?gemstone=${gem.transliteration.toLowerCase()}`}
                className="group block overflow-hidden border border-ink/8 hover:border-[#053624]/30 transition-colors duration-500"
                style={{ background: gem.bg }}
              >
                {/* Image */}
                <div className="relative aspect-[3/2] overflow-hidden">
                  <img
                    src={gem.image}
                    alt={gem.stone}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Planet badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 shadow-sm">
                    <span className="text-sm">{gem.planet}</span>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-ink/60">{gem.planetName}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-serif text-2xl text-ink leading-tight group-hover:text-[#053624] transition-colors duration-300">
                        {gem.stone}
                      </h3>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.22em]" style={{ color: gem.color }}>
                        {gem.transliteration} &nbsp;·&nbsp; <span className="font-sans normal-case tracking-normal text-ink/50">{gem.hindi} / {gem.gujarati}</span>
                      </p>
                    </div>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-[#053624] opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1.5">
                      View →
                    </span>
                  </div>
                  <p className="mt-4 text-xs text-ink/55 leading-relaxed">{gem.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View full CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/shop/gemstones"
            className="group inline-flex items-center gap-4 bg-[#053624] text-cream px-14 py-5 text-[10px] uppercase tracking-[0.3em] hover:bg-ink transition-colors duration-500"
          >
            Explore the Navratna Collection
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
