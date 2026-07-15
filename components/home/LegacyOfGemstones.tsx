"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const stories = [
  {
    id: "bachchan",
    slug: "the-comeback-sapphire",
    title: "The Comeback Sapphire",
    subject: "A Bollywood Legend",
    excerpt: "A legendary actor embraced the Neelam (Blue Sapphire) during a challenging period, sparking a comeback that redefined an era.",
    image: "/stories/actor-portrait.jpg",
    align: "left",
  },
  {
    id: "ambani",
    slug: "vision-and-tradition",
    title: "Vision & Tradition",
    subject: "A Business Titan",
    excerpt: "Visionaries combine determination with timeless tradition. The strategic use of Pukhraj (Yellow Sapphire) is renowned for clearing obstacles and inviting abundance.",
    image: "/stories/titan-portrait.jpg",
    align: "right",
  },
  {
    id: "maharajas",
    slug: "the-royal-emeralds",
    title: "The Royal Emeralds",
    subject: "Maharajas of Jaipur",
    excerpt: "The great Maharajas assembled the world's finest emerald collections. These stones remain enduring symbols of cosmic wisdom and royal authority.",
    image: "/stories/maharaja-portrait.png",
    align: "left",
  },
];

export function LegacyOfGemstones() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} className="py-12 lg:py-20 bg-cream">
      <div className="container-x mb-20 md:mb-32 max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="eyebrow tracking-[0.3em] mb-6 text-[#053624]"
        >
          Stories &amp; Heritage
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-ink mb-8"
        >
          The Legacy of Gemstones
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-ink/60 leading-relaxed max-w-2xl mx-auto"
        >
          Throughout history, leaders, royalty, entrepreneurs, and cultural icons have treasured natural gemstones as symbols of prosperity, wisdom, and personal transformation.
        </motion.p>
      </div>

      <div className="container-x flex flex-col gap-24 lg:gap-40">
        {stories.map((story) => (
          <div
            key={story.id}
            className={`flex flex-col gap-8 md:gap-16 lg:gap-24 items-center ${
              story.align === "right" ? "md:flex-row-reverse" : "md:flex-row"
            }`}
          >
            {/* Image with link */}
            <motion.div
              initial={{ opacity: 0, x: story.align === "right" ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-1/2"
            >
              <Link href={`/stories/${story.slug}`} className="group block relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors duration-500" />
                <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white border-b border-white/60 pb-1">
                    Read Full Story
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full md:w-1/2 flex flex-col justify-center"
            >
              <p className="text-[10px] uppercase tracking-[0.25em] text-ink/40 mb-4">{story.subject}</p>
              <h3 className="font-serif text-3xl md:text-4xl text-ink mb-6 leading-tight">{story.title}</h3>
              <p className="text-ink/70 leading-relaxed text-lg font-serif italic mb-8 border-l border-[#053624]/20 pl-6">
                &ldquo;{story.excerpt}&rdquo;
              </p>
              <Link
                href={`/stories/${story.slug}`}
                className="self-start text-[10px] uppercase tracking-[0.2em] text-[#053624] border-b border-[#053624]/40 hover:border-[#053624] pb-1 transition-colors"
              >
                Read the Full Story →
              </Link>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
