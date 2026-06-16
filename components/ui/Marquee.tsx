"use client";

import { motion } from "framer-motion";

export function Marquee() {
  const text = "MAISON RADHA RANI — HAUTE JOAILLERIE — ";
  
  return (
    <div className="relative w-full overflow-hidden bg-cream py-10 flex items-center select-none pointer-events-none">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-cream to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-cream to-transparent z-10" />
      
      <motion.div
        animate={{ x: [0, -1035] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 20,
        }}
        className="flex whitespace-nowrap"
      >
        <span className="font-serif text-[8rem] md:text-[12rem] text-ink/[0.03] leading-none tracking-tighter pr-8">
          {text}
        </span>
        <span className="font-serif text-[8rem] md:text-[12rem] text-ink/[0.03] leading-none tracking-tighter pr-8">
          {text}
        </span>
        <span className="font-serif text-[8rem] md:text-[12rem] text-ink/[0.03] leading-none tracking-tighter pr-8">
          {text}
        </span>
      </motion.div>
    </div>
  );
}
