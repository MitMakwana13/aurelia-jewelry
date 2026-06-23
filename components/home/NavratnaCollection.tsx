"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const navratnaStones = [
  { energy: "Sun", english: "Ruby", sanskrit: "Manik", url: "/gemstones/ruby-new.jpg" },
  { energy: "Moon", english: "Pearl", sanskrit: "Moti", url: "/gemstones/pearl.png" },
  { energy: "Mars", english: "Red Coral", sanskrit: "Moonga", url: "/gemstones/red-coral-new.jpg" },
  { energy: "Mercury", english: "Emerald", sanskrit: "Panna", url: "/gemstones/emerald.png" },
  { energy: "Jupiter", english: "Yellow Sapphire", sanskrit: "Pukhraj", url: "/gemstones/yellow-sapphire.png" },
  { energy: "Venus", english: "Diamond", sanskrit: "Heera", url: "/gemstones/diamond.png" },
  { energy: "Saturn", english: "Blue Sapphire", sanskrit: "Neelam", url: "/gemstones/blue-sapphire.png" },
  { energy: "Rahu", english: "Hessonite Garnet", sanskrit: "Gomed", url: "/gemstones/hessonite.png" },
  { energy: "Ketu", english: "Cat's Eye", sanskrit: "Lehsunia", url: "/gemstones/cats-eye.png" },
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
