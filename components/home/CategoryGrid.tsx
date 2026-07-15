"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const CATEGORIES = [
  {
    title: "Heritage Collection Rings",
    href: "/shop/rings",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b6548e?auto=format&fit=crop&w=800&q=80",
    color: "bg-ink",
    textColor: "text-cream",
  },
  {
    title: "Bespoke Necklaces",
    href: "/shop/necklaces",
    image:
      "https://images.unsplash.com/photo-1599643477877-530e5d3e8d69?auto=format&fit=crop&w=800&q=80",
    color: "bg-cream-warm",
    textColor: "text-ink",
  },
  {
    title: "Masterpiece Earrings",
    href: "/shop/earrings",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
    color: "bg-cream-light",
    textColor: "text-ink",
  },
];

export function CategoryGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Asymmetrical parallax: Left/Right move up slower, Center moves up faster
  const yOuter = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const yInner = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);

  return (
    <section ref={containerRef} className="container-x py-16 lg:py-24 overflow-hidden bg-cream">
      <div className="mb-32 text-center">
        <h2 className="font-serif text-4xl md:text-6xl text-ink font-light tracking-tight">The Exhibition</h2>
        <p className="mt-6 text-[10px] tracking-[0.3em] uppercase text-ink/40">Curated Masterpieces</p>
      </div>

      {/* Museum-style vast negative space */}
      <div className="grid gap-12 md:gap-24 md:grid-cols-3 items-start px-4 md:px-12">
        {CATEGORIES.map((cat, i) => {
          const isCenter = i === 1;
          const yTransform = isCenter ? yInner : yOuter;
          const marginTop = isCenter ? "mt-24 md:mt-48" : "mt-0";

          return (
            <motion.div key={cat.title} style={{ y: yTransform }} className={marginTop}>
              <Link
                href={cat.href}
                className="group relative block overflow-hidden bg-cream-warm aspect-[3/4] md:aspect-[4/5]"
              >
                {/* Cartier-style minimalist inner frame on hover */}
                <div className="absolute inset-4 md:inset-6 border border-[#053624]/0 transition-colors duration-1000 ease-out-smooth group-hover:border-[#053624]/30 z-20 pointer-events-none" />

                {/* Image Scale on Hover */}
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-90 mix-blend-multiply transition-transform duration-[3s] ease-out-smooth group-hover:scale-[1.03]"
                />

                {/* Content Fade In */}
                <div className="absolute inset-0 flex flex-col items-center justify-end p-10 text-center opacity-0 translate-y-4 transition-all duration-1000 ease-out-smooth group-hover:opacity-100 group-hover:translate-y-0 z-30">
                  <h3 className="font-serif text-3xl text-[#053624]">
                    {cat.title}
                  </h3>
                  <span className="mt-4 inline-block border-b border-[#053624]/40 pb-1 text-[9px] uppercase tracking-[0.25em] text-[#053624]/80 transition-colors hover:text-[#053624] hover:border-[#053624]">
                    Discover
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
