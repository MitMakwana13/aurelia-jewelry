"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const stories = [
  {
    id: "bachchan",
    title: "The Comeback Sapphire",
    subject: "A Bollywood Legend",
    excerpt: "Among India's most talked-about gemstone stories is that of a legendary actor who embraced a Neelam (Blue Sapphire) during a challenging period, later witnessing a remarkable comeback.",
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1200&q=80",
    align: "left",
  },
  {
    id: "ambani",
    title: "Vision & Tradition",
    subject: "A Business Titan",
    excerpt: "Legends of Indian entrepreneurship often include stories of visionaries who combined determination with timeless traditions, including the strategic use of Pukhraj (Yellow Sapphire) to clear obstacles.",
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1200&q=80",
    align: "right",
  },
  {
    id: "maharajas",
    title: "The Royal Emeralds",
    subject: "Maharajas of Jaipur",
    excerpt: "From the royal courts of Rajasthan to modern collectors, lush green emeralds have remained the ultimate symbol of prestige, wisdom, and timeless elegance.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80",
    align: "left",
  },
];

export function LegacyOfGemstones() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section ref={sectionRef} className="py-24 lg:py-40 bg-cream">
      <div className="container-x mb-20 md:mb-32 max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="eyebrow tracking-[0.3em] mb-6 text-[#053624]"
        >
          Stories & Heritage
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-ink mb-8"
        >
          The Legacy of Gemstones
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-ink/60 leading-relaxed max-w-2xl mx-auto"
        >
          Throughout history, leaders, royalty, entrepreneurs, and cultural icons have treasured natural gemstones as symbols of prosperity, wisdom, and personal transformation.
        </motion.p>
      </div>

      <div className="container-x flex flex-col gap-24 lg:gap-40">
        {stories.map((story, i) => (
          <div key={story.id} className={`flex flex-col gap-8 md:gap-16 lg:gap-24 items-center ${story.align === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
            
            <motion.div 
              initial={{ opacity: 0, x: story.align === 'right' ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-1/2"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-white">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full md:w-1/2 flex flex-col justify-center"
            >
              <p className="text-[10px] uppercase tracking-[0.25em] text-ink/40 mb-4">{story.subject}</p>
              <h3 className="font-serif text-3xl md:text-4xl text-ink mb-6 leading-tight">{story.title}</h3>
              <p className="text-ink/70 leading-relaxed text-lg font-serif italic mb-8 border-l border-[#053624]/20 pl-6">
                &ldquo;{story.excerpt}&rdquo;
              </p>
              <button className="self-start text-[10px] uppercase tracking-[0.2em] text-[#053624] link-underline pb-1">
                Read the Full Story
              </button>
            </motion.div>

          </div>
        ))}
      </div>
    </section>
  );
}
