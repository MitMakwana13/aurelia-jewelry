"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const articles = [
  {
    tag: "Zodiac Guide",
    title: "Which Gemstone Suits Your Zodiac Sign?",
    excerpt:
      "From fiery Aries to mystical Pisces — discover the sacred stone that amplifies your cosmic energy and brings fortune aligned with your birth chart.",
    image: "https://images.unsplash.com/photo-1599643478524-fb524b0d0f72?auto=format&fit=crop&w=800&q=80",
    readTime: "8 min read",
    href: "/knowledge/gemstone-zodiac-guide",
    color: "#053624",
  },
  {
    tag: "Gem Science",
    title: "How to Identify an Original Gemstone",
    excerpt:
      "Natural vs. synthetic vs. treated — a master gemologist's guide to spotting authentic stones through light refraction, inclusions, and certification reading.",
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800&q=80",
    readTime: "6 min read",
    href: "/knowledge/identify-original-gemstones",
    color: "#1A3A6B",
  },
  {
    tag: "Vedic Wisdom",
    title: "The Ancient Benefits of Gemstone Therapy",
    excerpt:
      "Jyotish Shastra has prescribed cosmic stones for over 5,000 years. Explore the science and spirituality behind each Navratna and how they affect your energy field.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
    readTime: "10 min read",
    href: "/knowledge/benefits-of-gemstone-therapy",
    color: "#9B1B30",
  },
];

export function KnowledgeHub() {
  return (
    <section className="py-28 lg:py-36 bg-[#FAF8F5]">
      <div className="container-x">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-10 items-end mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-[10px] uppercase tracking-[0.4em] text-[#053624]/70 mb-4"
            >
              Wisdom & Knowledge
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl text-ink leading-tight tracking-tight"
            >
              Gemstone<br />
              <em className="font-light italic text-ink/50">Knowledge Hub</em>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-sm leading-loose text-ink/55"
          >
            Ancient Vedic science meets modern gemology. Educate yourself before you 
            invest — our experts share the knowledge that separates true collectors 
            from casual buyers.
          </motion.p>
        </div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {articles.map((article, i) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              <Link href={article.href} className="group block">
                {/* Image */}
                <div className="aspect-[3/2] overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="mt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="text-[8px] uppercase tracking-[0.25em] px-3 py-1"
                      style={{ background: article.color + "15", color: article.color }}
                    >
                      {article.tag}
                    </span>
                    <span className="text-[9px] text-ink/30 uppercase tracking-[0.15em]">
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl text-ink leading-snug group-hover:text-[#053624] transition-colors duration-300 mb-3">
                    {article.title}
                  </h3>
                  <p className="text-xs text-ink/50 leading-relaxed">{article.excerpt}</p>

                  <div className="mt-5 flex items-center gap-2 text-[9px] uppercase tracking-[0.25em] text-[#053624] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Read Article
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View all CTA */}
        <div className="mt-16 border-t border-ink/8 pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-xs text-ink/40 uppercase tracking-[0.2em]">
            Expanding our library every week
          </p>
          <Link
            href="/knowledge"
            className="group inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-ink/70 hover:text-[#053624] transition-colors duration-300"
          >
            View All Articles
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
