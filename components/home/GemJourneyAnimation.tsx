"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const journey = [
  {
    step: "01",
    title: "Born Deep\nWithin the Earth",
    subtitle: "Million years of natural creation and energy.",
    image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&w=1400&q=90",
    overlay: "from-black/80 via-black/40 to-transparent",
  },
  {
    step: "02",
    title: "Hidden Deep.\nPure by Nature.",
    subtitle: "Formed under extreme pressure and time.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=90",
    overlay: "from-black/70 via-black/30 to-transparent",
  },
  {
    step: "03",
    title: "Discovered\nWith Care",
    subtitle: "Responsibly mined from the finest global sources.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1400&q=90",
    overlay: "from-black/80 via-black/40 to-transparent",
  },
  {
    step: "04",
    title: "From Raw\nto Remarkable",
    subtitle: "Every gem begins as a rough promise.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1400&q=90",
    overlay: "from-black/70 via-black/30 to-transparent",
  },
  {
    step: "05",
    title: "Crafted to\nPerfection",
    subtitle: "Expert hands. Precision cut. Perfect symmetry.",
    image: "https://images.unsplash.com/photo-1599643478524-fb524b0d0f72?auto=format&fit=crop&w=1400&q=90",
    overlay: "from-black/80 via-black/40 to-transparent",
  },
  {
    step: "06",
    title: "Polished to\nPerfection",
    subtitle: "Brilliance revealed. Beauty eternal.",
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1400&q=90",
    overlay: "from-black/70 via-black/20 to-transparent",
  },
];

function JourneyPanel({ item, index }: { item: typeof journey[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-20% 0px -20% 0px" });

  return (
    <motion.div
      ref={ref}
      className="relative aspect-[4/3] md:aspect-auto md:h-full overflow-hidden"
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0.3, scale: 0.97 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Background image with zoom on hover */}
      <motion.img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover"
        animate={isInView ? { scale: 1 } : { scale: 1.06 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        loading="lazy"
      />

      {/* Dark gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r ${item.overlay}`} />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12">
        <motion.span
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[9px] uppercase tracking-[0.4em] text-white/40 mb-5"
        >
          {item.step} / 06
        </motion.span>

        <motion.h3
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight tracking-tight whitespace-pre-line"
        >
          {item.title}
        </motion.h3>

        <motion.div
          animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ originX: 0 }}
          className="w-12 h-[1px] bg-[#B8860B] my-5"
        />

        <motion.p
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-xs text-white/60 leading-relaxed max-w-[180px]"
        >
          {item.subtitle}
        </motion.p>

        {/* Arrow connector (not on last panel) */}
        {index < journey.length - 1 && (
          <motion.div
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B8860B] text-2xl hidden md:block"
          >
            →
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export function GemJourneyAnimation() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const lineWidth = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-28 lg:py-36 bg-[#0A0A0A] overflow-hidden">
      {/* Header */}
      <div className="container-x mb-16 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[10px] uppercase tracking-[0.4em] text-[#B8860B]/80 mb-4"
        >
          From Earth's Depths to Timeless Luxury
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1 }}
          className="font-serif text-4xl md:text-5xl text-white leading-tight tracking-tight"
        >
          The Journey of a<br />
          <em className="font-light italic text-white/50">Sacred Stone.</em>
        </motion.h2>

        {/* Animated progress line */}
        <div className="mt-10 relative w-full max-w-xs mx-auto h-[1px] bg-white/10">
          <motion.div
            style={{ width: lineWidth }}
            className="absolute inset-y-0 left-0 bg-[#B8860B]"
          />
        </div>
      </div>

      {/* Cinematic Grid — 2 rows × 3 cols on desktop, single col on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-white/5">
        {journey.map((item, i) => (
          <JourneyPanel key={item.step} item={item} index={i} />
        ))}
      </div>

      {/* Bottom brand stamp */}
      <div className="container-x mt-16 text-center flex flex-col items-center gap-6">
        <img
          src="/logo.png"
          alt="Radha Rani Heritage Collection"
          className="h-20 w-auto object-contain invert opacity-80"
        />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="text-[10px] uppercase tracking-[0.5em] text-white/20"
        >
          From Earth's Depths to Timeless Luxury
        </motion.p>
      </div>
    </section>
  );
}
