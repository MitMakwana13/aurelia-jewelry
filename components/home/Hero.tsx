"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRightIcon } from "@/components/ui/Icons";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Extreme parallax effect: background moves down half as fast as you scroll
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  // Fades out text as you scroll past
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative w-full h-[100vh] min-h-[700px] overflow-hidden bg-cream">
      
      {/* Parallax Background - Bright Classic Aesthetic */}
      <motion.div style={{ y }} className="absolute inset-0 h-[120%] -top-[10%] w-full bg-cream-warm">
        <img
          src="https://images.unsplash.com/photo-1599643478524-fb524b0d0f72?auto=format&fit=crop&w=2800&q=90" // Deep emerald macro
          alt="Radha Rani — Haute Joaillerie"
          className="h-full w-full object-cover opacity-70 mix-blend-multiply"
        />
        {/* Subtle light gradient for text readability, no dark heavy vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/40 to-transparent" />
      </motion.div>

      {/* Interactive Content Layer */}
      <motion.div 
        style={{ opacity, y: textY }}
        className="relative h-full container-x flex flex-col items-center justify-center text-center z-10"
      >
        
        {/* Animated Eyebrow */}
        <div className="overflow-hidden mb-8">
          <motion.p 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            className="text-[10px] uppercase tracking-[0.4em] text-ink/60"
          >
            The Heritage Collection
          </motion.p>
        </div>

        {/* Theatrical Masked Headline */}
        <div className="overflow-hidden">
          <motion.h1 
            initial={{ y: "110%", rotate: 2 }}
            animate={{ y: 0, rotate: 0 }}
            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[7.5rem] leading-[0.9] text-ink tracking-tight"
          >
            The Culture of <br />
            <em className="italic text-ink/70 font-light pr-4">Craft.</em>
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 1 }}
          className="mt-12 max-w-lg text-xs md:text-[13px] text-ink/70 leading-loose tracking-[0.05em]"
        >
          Discover ethically sourced gemstones and brilliant diamonds.
          Bespoke jewelry tailored to your vision, crafted with centuries of heritage.
        </motion.p>

        {/* Actions */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.5 }}
          className="mt-16 flex flex-col sm:flex-row items-center gap-8"
        >
          {/* Signature Emerald CTA */}
          <Link href="/shop/gemstones" className="group relative overflow-hidden bg-[#053624] text-cream px-14 py-5 text-[10px] uppercase tracking-[0.25em] transition-transform hover:scale-105 duration-500">
            <span className="relative z-10">Explore Collection</span>
            <div className="absolute inset-0 bg-ink translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out-smooth" />
          </Link>
          <Link
            href="/custom"
            className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-ink/70 hover:text-[#053624] transition-colors duration-300"
          >
            Bespoke Inquiry 
            <span className="group-hover:translate-x-2 transition-transform duration-500">
              <ArrowRightIcon width={14} height={14} />
            </span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Decorative scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20"
      >
        <span className="text-[8px] uppercase tracking-[0.4em] text-ink/40">Scroll</span>
        <motion.div 
          animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-[1px] h-16 bg-ink/20 overflow-hidden"
        >
          <motion.div className="absolute top-0 left-0 w-full bg-ink h-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
