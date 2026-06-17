"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRightIcon } from "@/components/ui/Icons";

// High-end luxury jewelry visuals (models + masterpieces)
const slides = [
  {
    title: "The Culture of\nCraft.",
    subtitle: "Heritage Collection — Masterpieces crafted in India.",
    image: "https://images.unsplash.com/photo-1599643477877-530e5d3e8d69?auto=format&fit=crop&w=2400&q=90",
  },
  {
    title: "Bespoke\nExcellence.",
    subtitle: "Ethically sourced gemstones. Perfectly cut diamonds.",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=2400&q=90",
  },
  {
    title: "Timeless\nElegance.",
    subtitle: "Jewelry tailored to your unique vision.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b6548e?auto=format&fit=crop&w=2400&q=90",
  },
];

const SLIDE_DURATION = 5000;

export function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[100vh] min-h-[700px] overflow-hidden bg-[#0A0A0A]">
      {/* ── Background Slideshow ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].image}
            alt="Hero Background"
            className="h-full w-full object-cover"
            loading="eager"
          />
          {/* Subtle vignette and dark gradient for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60" />
        </motion.div>
      </AnimatePresence>

      {/* ── Main Typography & CTAs (Fixed in center) ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-6 pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={`text-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            {/* Eyebrow */}
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/60 mb-6 md:mb-8">
              Radha Rani
            </p>

            {/* Headline */}
            <h1 className="font-serif text-5xl sm:text-6xl md:text-[6.5rem] lg:text-[7.5rem] leading-[0.9] text-white tracking-tight whitespace-pre-line">
              {slides[current].title}
            </h1>

            {/* Subtitle */}
            <p className="mt-8 max-w-md text-xs md:text-sm text-white/70 leading-loose tracking-[0.05em]">
              {slides[current].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* CTAs (Always visible) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-14 flex flex-col sm:flex-row items-center gap-8"
        >
          <Link
            href="/shop/gemstones"
            className="group relative overflow-hidden bg-[#053624] text-cream px-12 py-4 text-[10px] uppercase tracking-[0.25em] transition-transform hover:scale-105 duration-500"
          >
            <span className="relative z-10">Explore Collection</span>
            <div className="absolute inset-0 bg-white/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500" />
          </Link>
          <Link
            href="/custom"
            className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-white/80 hover:text-white transition-colors duration-300"
          >
            Bespoke Inquiry
            <span className="group-hover:translate-x-2 transition-transform duration-500">
              <ArrowRightIcon width={14} height={14} />
            </span>
          </Link>
        </motion.div>
      </div>

      {/* ── Dot navigation ── */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-0.5 transition-all duration-500 ${
              i === current ? "w-8 bg-white" : "w-4 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
