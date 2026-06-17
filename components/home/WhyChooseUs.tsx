"use client";

import { motion } from "framer-motion";

const reasons = [
  {
    icon: "✦",
    title: "Certified Authentic Stones",
    desc: "Every gemstone comes with a verified certificate from recognised gem labs — GIA, IGI, or GGL. No compromises, no shortcuts.",
  },
  {
    icon: "🔬",
    title: "Lab-Tested Quality",
    desc: "Each stone undergoes rigorous spectrographic analysis to confirm natural origin, treatment status, and colour grade before it reaches you.",
  },
  {
    icon: "✈",
    title: "Worldwide Shipping",
    desc: "Fully insured, discreet luxury packaging delivered to your door — anywhere in the world, from Mumbai to Manhattan.",
  },
  {
    icon: "🪬",
    title: "Expert Gem Consultation",
    desc: "Our Vedic gem advisors help you select the right stone for your birth chart, lifestyle and intention — online or in-person.",
  },
  {
    icon: "♾",
    title: "Luxury Packaging",
    desc: "Every order arrives in a handcrafted velvet box with a hand-written note — because the unboxing is part of the ritual.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-28 lg:py-36" style={{ background: "#053624" }}>
      <div className="container-x">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-16 items-end mb-20">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-[10px] uppercase tracking-[0.4em] text-cream/50 mb-4"
            >
              The Radha Rani Promise
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl text-cream leading-tight tracking-tight"
            >
              Why Collectors<br />
              <em className="font-light italic text-cream/70">Choose Us.</em>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-sm leading-loose text-cream/60 lg:max-w-md"
          >
            Trust is the foundation of every gem transaction. We've built ours over 
            years of sourcing directly from mines and delivering masterpieces that 
            exceed expectation — every single time.
          </motion.p>
        </div>

        {/* Reasons grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-cream/10">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="p-8 lg:p-10 flex flex-col gap-6 group hover:bg-cream/5 transition-colors duration-500"
            >
              <span className="text-2xl">{r.icon}</span>
              <div>
                <h3 className="font-serif text-lg text-cream leading-snug mb-3">{r.title}</h3>
                <p className="text-xs text-cream/50 leading-relaxed">{r.desc}</p>
              </div>
              <div className="mt-auto">
                <div className="w-8 h-[1px] bg-cream/20 group-hover:w-16 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
