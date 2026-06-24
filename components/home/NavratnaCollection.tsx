"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

const navratnaStones = [
  { energy: "Sun", english: "Ruby", sanskrit: "Manik", url: "/gemstones/ruby-new.jpg", slug: "ruby" },
  { energy: "Moon", english: "Pearl", sanskrit: "Moti", url: "/gemstones/pearl.png", slug: "pearl" },
  { energy: "Mars", english: "Red Coral", sanskrit: "Moonga", url: "/gemstones/red-coral-new.jpg", slug: "red-coral" },
  { energy: "Mercury", english: "Emerald", sanskrit: "Panna", url: "/gemstones/emerald.png", slug: "emerald" },
  { energy: "Jupiter", english: "Yellow Sapphire", sanskrit: "Pukhraj", url: "/gemstones/yellow-sapphire.png", slug: "yellow-sapphire" },
  { energy: "Venus", english: "Diamond", sanskrit: "Heera", url: "/gemstones/diamond.png", slug: "diamond-gem" },
  { energy: "Saturn", english: "Blue Sapphire", sanskrit: "Neelam", url: "/gemstones/blue-sapphire.png", slug: "blue-sapphire" },
  { energy: "Rahu", english: "Hessonite Garnet", sanskrit: "Gomed", url: "/gemstones/hessonite.png", slug: "hessonite" },
  { energy: "Ketu", english: "Cat's Eye", sanskrit: "Lehsunia", url: "/gemstones/cats-eye.png", slug: "cats-eye" },
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
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-sm text-ink/50 max-w-xl mx-auto"
        >
          Click a gemstone to explore all products for that cosmic energy.
        </motion.p>
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
              <Link
                href={`/shop/gemstones?type=${stone.slug}`}
                className="block relative aspect-[3/4] w-full overflow-hidden bg-cream"
              >
                <Image
                  src={stone.url}
                  alt={stone.english}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Hover CTA */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-cream/80 bg-ink/50 px-2 py-1">
                    Shop →
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 text-cream">
                  <p className="text-[10px] uppercase tracking-[0.2em] mb-2 opacity-80">{stone.energy}</p>
                  <h3 className="font-serif text-2xl mb-1">{stone.english}</h3>
                  <p className="font-serif italic text-lg opacity-80">{stone.sanskrit}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
