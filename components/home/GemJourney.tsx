"use client";

import { motion } from "framer-motion";

const journeySteps = [
  {
    title: "BORN DEEP WITHIN THE EARTH",
    desc: "Million years of natural creation and energy.",
    img: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&w=800&q=80", // earth from space / glowing earth
  },
  {
    title: "HIDDEN DEEP. PURE BY NATURE.",
    desc: "Formed under extreme pressure and time.",
    img: "https://images.unsplash.com/photo-1682687982501-1e58f8147d33?auto=format&fit=crop&w=800&q=80", // cave/crystals
  },
  {
    title: "DISCOVERED WITH CARE",
    desc: "Responsibly mined from the finest global sources.",
    img: "https://images.unsplash.com/photo-1579275542618-a1dfed5f54ba?auto=format&fit=crop&w=800&q=80", // rocks/mining
  },
  {
    title: "FROM RAW TO REMARKABLE",
    desc: "Every gem begins as a rough promise.",
    img: "https://images.unsplash.com/photo-1599643478524-fb524b0d0f72?auto=format&fit=crop&w=800&q=80", // rough gemstone macro
  },
  {
    title: "CRAFTED TO PERFECTION",
    desc: "Expert hands. Precision cut. Perfect symmetry.",
    img: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800&q=80", // cutting/crafting
  },
  {
    title: "POLISHED TO PERFECTION",
    desc: "Brilliance revealed. Beauty eternal.",
    img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80", // final polished gem
  },
];

export function GemJourney() {
  return (
    <section className="py-24 bg-[#0a0a0a] text-[#f5f5f0]">
      <div className="container-x max-w-7xl">
        <div className="text-center mb-16">
          <p className="eyebrow tracking-[0.4em] text-[#d4af37]/80 mb-4">The Journey</p>
          <h2 className="font-serif text-3xl md:text-5xl text-[#f5f5f0] tracking-wide">
            From Earth's Depths to Timeless Luxury
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/10">
          {journeySteps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group relative aspect-[4/3] border-r border-b border-white/10 overflow-hidden flex items-end p-8"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={step.img} 
                  alt={step.title}
                  className="w-full h-full object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 w-full text-center">
                <h3 className="font-serif text-[#d4af37] text-lg tracking-widest mb-3 uppercase drop-shadow-lg">
                  {step.title}
                </h3>
                <p className="text-white/70 text-xs md:text-sm tracking-wide font-light">
                  {step.desc}
                </p>
              </div>
              
              {/* Decorative Number */}
              <div className="absolute top-6 left-6 text-white/10 font-serif text-5xl">
                0{i + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
