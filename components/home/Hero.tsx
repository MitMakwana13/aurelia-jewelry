"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRightIcon } from "@/components/ui/Icons";

const frames = [
  {
    title: "Born Deep\nWithin the Earth",
    subtitle: "Million years of natural creation and energy.",
    // Dark crystal/geological cave formation
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=2400&q=90",
  },
  {
    title: "Hidden Deep.\nPure by Nature.",
    subtitle: "Formed under extreme pressure and time.",
    // Raw rough gemstones / mineral veins in rock
    image: "https://images.unsplash.com/photo-1601887389937-0b02a26b4b3b?auto=format&fit=crop&w=2400&q=90",
  },
  {
    title: "Discovered\nWith Care",
    subtitle: "Responsibly mined from the finest global sources.",
    // Hands carefully handling rough gem/mining
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=2400&q=90",
  },
  {
    title: "From Raw\nto Remarkable",
    subtitle: "Every gem begins as a rough promise.",
    // Collection of rough / raw gemstones
    image: "https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?auto=format&fit=crop&w=2400&q=90",
  },
  {
    title: "Crafted to\nPerfection",
    subtitle: "Expert hands. Precision cut. Perfect symmetry.",
    // Jeweler / craftsman working with gemstone
    image: "https://images.unsplash.com/photo-1599643478524-fb524b0d0f72?auto=format&fit=crop&w=2400&q=90",
  },
  {
    title: "The Culture\nof Craft.",
    subtitle: "Radha Rani Heritage Collection — Crafted in India.",
    // Brilliant polished gemstone / finished jewel
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=2400&q=90",
  },
];

const FRAME_DURATION = 3500; // ms each frame shows

export function Hero() {
  const [current, setCurrent] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => {
        if (prev >= frames.length - 1) {
          clearInterval(intervalRef.current!);
          setIsFinished(true);
          return prev;
        }
        return prev + 1;
      });
    }, FRAME_DURATION);
    return () => clearInterval(intervalRef.current!);
  }, []);

  const frame = frames[current];

  return (
    <section className="relative w-full h-[100vh] min-h-[700px] overflow-hidden bg-black">

      {/* ── Cinematic frame crossfade background ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img
            src={frame.image}
            alt={frame.title}
            className="h-full w-full object-cover"
            loading="eager"
          />
          {/* Dark cinematic gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* ── Step counter top-left ── */}
      <div className="absolute top-32 left-8 md:left-16 z-20 flex flex-col gap-1">
        {!isFinished && (
          <motion.span
            key={`step-${current}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[9px] uppercase tracking-[0.4em] text-white/40"
          >
            {String(current + 1).padStart(2, "0")} / {String(frames.length).padStart(2, "0")}
          </motion.span>
        )}
      </div>

      {/* ── Progress bar ── */}
      {!isFinished && (
        <div className="absolute top-0 left-0 right-0 z-30 h-[2px] bg-white/10">
          <motion.div
            key={current}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: FRAME_DURATION / 1000, ease: "linear" }}
            style={{ originX: 0 }}
            className="h-full bg-[#B8860B]"
          />
        </div>
      )}

      {/* ── Frame step subtitle (top-left area, cinematic) ── */}
      <div className="absolute bottom-32 left-8 md:left-16 z-20 max-w-xs">
        <AnimatePresence mode="wait">
          {!isFinished && (
            <motion.div
              key={`subtitle-${current}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="font-serif text-2xl md:text-3xl text-white leading-tight whitespace-pre-line">
                {frame.title}
              </h2>
              <div className="w-8 h-[1px] bg-[#B8860B] my-3" />
              <p className="text-xs text-white/50 leading-relaxed">{frame.subtitle}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Final frame: main brand overlay ── */}
      <AnimatePresence>
        {isFinished && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-6"
          >
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-[10px] uppercase tracking-[0.4em] text-white/50 mb-8"
            >
              The Heritage Collection
            </motion.p>

            {/* Headline */}
            <div className="overflow-hidden mb-2">
              <motion.h1
                initial={{ y: "110%", rotate: 1 }}
                animate={{ y: 0, rotate: 0 }}
                transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
                className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[7rem] leading-[0.9] text-white tracking-tight"
              >
                The Culture of <br />
                <em className="italic text-white/60 font-light pr-4">Craft.</em>
              </motion.h1>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1 }}
              className="mt-10 max-w-md text-xs md:text-[13px] text-white/55 leading-loose tracking-[0.05em]"
            >
              Discover ethically sourced gemstones and brilliant diamonds.
              Bespoke jewelry tailored to your vision, starting at just 50% advance.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.5 }}
              className="mt-14 flex flex-col sm:flex-row items-center gap-8"
            >
              <Link
                href="/shop/gemstones"
                className="group relative overflow-hidden bg-[#053624] text-cream px-14 py-5 text-[10px] uppercase tracking-[0.25em] transition-transform hover:scale-105 duration-500"
              >
                <span className="relative z-10">Explore Collection</span>
                <div className="absolute inset-0 bg-white/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500" />
              </Link>
              <Link
                href="/custom"
                className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-white/60 hover:text-white transition-colors duration-300"
              >
                Bespoke Inquiry
                <span className="group-hover:translate-x-2 transition-transform duration-500">
                  <ArrowRightIcon width={14} height={14} />
                </span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Scroll indicator (only after film finishes) ── */}
      {isFinished && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20"
        >
          <span className="text-[8px] uppercase tracking-[0.4em] text-white/30">Scroll</span>
          <motion.div
            animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-[1px] h-16 bg-white/20 overflow-hidden"
          >
            <motion.div className="absolute top-0 left-0 w-full bg-white h-full" />
          </motion.div>
        </motion.div>
      )}

      {/* ── Dot navigation ── */}
      <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
        {frames.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrent(i);
              if (i === frames.length - 1) setIsFinished(true);
              else setIsFinished(false);
            }}
            aria-label={`Go to frame ${i + 1}`}
            className={`w-1 h-1 rounded-full transition-all duration-500 ${
              i === current
                ? "bg-[#B8860B] scale-150"
                : i < current
                ? "bg-white/50"
                : "bg-white/20"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
