"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

const articles = [
  {
    title: "Zodiac & Cosmic Resonance",
    description: "Discover which Navratna gemstone aligns with your astrological chart to unlock prosperity, health, and balance.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
    category: "Astrology",
    href: "/help/gem-guide#the-navratna-guide",
  },
  {
    title: "The Art of Identification",
    description: "A masterclass on recognizing natural inclusions, unheated clarity, and absolute authenticity in fine gemstones.",
    image: "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?auto=format&fit=crop&w=800&q=80",
    category: "Gemology",
    href: "/help/gem-guide#quality-factors",
  },
  {
    title: "Certification & Trust",
    description: "How GIA, IGI, and GRS reports protect you — and what every Radha Rani gemstone includes in its documentation package.",
    image: "https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?auto=format&fit=crop&w=800&q=80",
    category: "Documentation",
    href: "/help/gem-certification",
  },
];

export function GemstoneKnowledgeHub() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-white">
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="eyebrow tracking-[0.3em] mb-4 text-[#053624]"
            >
              The Archives
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-3xl md:text-5xl font-light tracking-tight text-ink"
            >
              Gemstone Knowledge Hub
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href="/help/gem-guide" className="text-[10px] uppercase tracking-[0.2em] text-ink link-underline">
              View Full Gem Guide
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {articles.map((article, i) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="group cursor-pointer"
            >
              <Link href={article.href} className="block">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream mb-6">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-[#053624] mb-3">{article.category}</p>
                <h3 className="font-serif text-2xl text-ink mb-3 group-hover:text-[#053624] transition-colors">
                  {article.title}
                </h3>
                <p className="text-ink/60 leading-relaxed text-sm">
                  {article.description}
                </p>
                <p className="mt-4 text-[10px] uppercase tracking-[0.15em] text-ink/40 group-hover:text-[#053624] transition-colors">
                  Read More →
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
