"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@/components/ui/Icons";

const articles = [
  {
    category: "Astrology & Zodiac",
    title: "Which Gemstone Suits Your Zodiac Sign?",
    desc: "Discover the ruling planets of each zodiac and the precise gemstone that unlocks their highest frequency.",
    image: "https://images.unsplash.com/photo-1599643478524-fb524b0d0f72?auto=format&fit=crop&w=800&q=80",
    href: "/knowledge/gemstones-by-zodiac",
  },
  {
    category: "Gemology 101",
    title: "How to Identify an Original Unheated Gemstone",
    desc: "Our gemologists share the three visual cues that reveal if a stone has been heat-treated or glass-filled.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
    href: "/knowledge/identifying-original-gemstones",
  },
  {
    category: "Vedic Science",
    title: "The Transformative Benefits of Wearing Yellow Sapphire",
    desc: "From financial abundance to spiritual clarity, explore why Pukhraj is considered the most benevolent stone.",
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800&q=80",
    href: "/knowledge/benefits-of-yellow-sapphire",
  },
];

export function GemstoneKnowledgeHub() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="eyebrow tracking-[0.3em] text-[#053624]/70 mb-4">The Library</p>
            <h2 className="font-serif text-3xl md:text-5xl text-ink tracking-tight">Gemstone Knowledge Hub</h2>
          </div>
          <Link
            href="/knowledge"
            className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-ink hover:text-[#053624] transition-colors duration-300"
          >
            Read All Articles
            <span className="group-hover:translate-x-2 transition-transform duration-500">
              <ArrowRightIcon width={14} height={14} />
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link href={article.href} className="group block">
                <div className="aspect-[4/3] overflow-hidden mb-6 bg-cream-warm">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <p className="text-[10px] text-[#053624] uppercase tracking-[0.2em] mb-3">{article.category}</p>
                <h3 className="font-serif text-xl md:text-2xl text-ink leading-snug mb-3 group-hover:text-[#053624] transition-colors duration-300">
                  {article.title}
                </h3>
                <p className="text-sm text-ink/60 leading-relaxed line-clamp-2">
                  {article.desc}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
