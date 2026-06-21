"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const navratnaStones = [
  { energy: "Sun", english: "Ruby", sanskrit: "Manik", url: "https://images.unsplash.com/photo-1601058268499-e52658b8ebf8?auto=format&fit=crop&w=800&q=80" },
  { energy: "Moon", english: "Pearl", sanskrit: "Moti", url: "https://images.unsplash.com/photo-1535556116002-6281ff3e9f36?auto=format&fit=crop&w=800&q=80" },
  { energy: "Mars", english: "Red Coral", sanskrit: "Moonga", url: "https://images.unsplash.com/photo-1599643478524-4f0f622955f1?auto=format&fit=crop&w=800&q=80" },
  { energy: "Mercury", english: "Emerald", sanskrit: "Panna", url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80" },
  { energy: "Jupiter", english: "Yellow Sapphire", sanskrit: "Pukhraj", url: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=800&q=80" },
  { energy: "Venus", english: "Diamond", sanskrit: "Heera", url: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80" },
  { energy: "Saturn", english: "Blue Sapphire", sanskrit: "Neelam", url: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800&q=80" },
  { energy: "Rahu", english: "Hessonite Garnet", sanskrit: "Gomed", url: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&w=800&q=80" },
  { energy: "Ketu", english: "Cat's Eye", sanskrit: "Lehsunia", url: "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?auto=format&fit=crop&w=800&q=80" },
];

export function NavratnaCollection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-white">
      <div className="container-x text-center mb-16">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="eyebrow tracking-[0.3em] mb-4 text-[#053624]"
        >
          The Navratna Collection
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-4xl md:text-5xl font-light tracking-tight text-ink"
        >
          Authentic Gemstones for the <br className="hidden md:block" /> Nine Cosmic Energies
        </motion.h2>
      </div>

      <div className="container-x overflow-hidden">
        <div className="hide-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-12">
          {navratnaStones.map((stone, i) => (
            <motion.div
              key={stone.energy}
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className="w-[70vw] sm:w-[40vw] md:w-[25vw] lg:w-[20vw] flex-shrink-0 snap-start group relative"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-cream">
                <Image
                  src={stone.url}
                  alt={stone.english}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                
                <div className="absolute bottom-6 left-6 right-6 text-cream">
                  <p className="text-[10px] uppercase tracking-[0.2em] mb-2 opacity-80">{stone.energy}</p>
                  <h3 className="font-serif text-2xl mb-1">{stone.english}</h3>
                  <p className="font-serif italic text-lg opacity-80">{stone.sanskrit}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
