"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote: "The Navratna ring I commissioned is unlike anything I have ever owned. The stones carry an energy you simply feel. I wore it to my board meeting and closed the deal.",
    name: "Priya Mehta",
    title: "Founder, Mehta Capital",
    location: "Mumbai",
    initial: "P",
    color: "#9B1B30",
  },
  {
    quote: "I was skeptical about buying a Blue Sapphire online, but their gem consultation was extraordinary. They matched the stone to my birth chart precisely. My life changed within weeks.",
    name: "Arjun Sharma",
    title: "Film Director",
    location: "Delhi",
    initial: "A",
    color: "#1A3A6B",
  },
  {
    quote: "I brought them a highly complex bespoke design. With just a 50% advance, they sourced a GIA certified emerald and delivered a masterpiece within weeks.",
    name: "Sunita Birla",
    title: "Philanthropist & Collector",
    location: "Kolkata",
    initial: "S",
    color: "#053624",
  },
  {
    quote: "I gifted my wife a Yellow Sapphire pendant for our anniversary. She cried when she opened the box. The packaging alone is a luxury experience.",
    name: "Vikram Nair",
    title: "Managing Director, Nair Group",
    location: "Bangalore",
    initial: "V",
    color: "#B8860B",
  },
  {
    quote: "As a Vedic astrologer myself, I am deeply particular about stone quality. Radha Rani is one of the very few sources I recommend to my clients without reservation.",
    name: "Dr. Kavita Joshi",
    title: "Vedic Astrologer",
    location: "Pune",
    initial: "K",
    color: "#6B3A1A",
  },
];

export function CustomerStories() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-28 lg:py-36 bg-[#FAF8F5]">
      <div className="container-x">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[10px] uppercase tracking-[0.4em] text-[#053624]/70 mb-4"
          >
            Stories of Transformation
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl text-ink leading-tight tracking-tight"
          >
            Our Collectors Speak
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left — active testimonial */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
              >
                {/* Quote mark */}
                <div
                  className="font-serif text-[8rem] leading-none mb-4 select-none"
                  style={{ color: testimonials[active].color, opacity: 0.15 }}
                >
                  "
                </div>
                <blockquote className="font-serif text-2xl md:text-3xl text-ink leading-relaxed tracking-tight -mt-12">
                  "{testimonials[active].quote}"
                </blockquote>
                <div className="mt-10 flex items-center gap-5">
                  {/* Avatar */}
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-cream font-serif text-xl flex-shrink-0"
                    style={{ background: testimonials[active].color }}
                  >
                    {testimonials[active].initial}
                  </div>
                  <div>
                    <p className="font-medium text-ink text-sm">{testimonials[active].name}</p>
                    <p className="text-xs text-ink/50 mt-0.5">{testimonials[active].title} &nbsp;·&nbsp; {testimonials[active].location}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right — client selector */}
          <div className="lg:col-span-5">
            <div className="flex flex-col gap-0 border-l-2 border-ink/8">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  onClick={() => setActive(i)}
                  className={`text-left pl-6 py-5 transition-all duration-300 border-l-2 -ml-[2px] ${
                    i === active
                      ? "border-[#053624] "
                      : "border-transparent hover:border-ink/20"
                  }`}
                >
                  <p
                    className={`font-medium text-sm transition-colors duration-300 ${
                      i === active ? "text-[#053624]" : "text-ink/40"
                    }`}
                  >
                    {t.name}
                  </p>
                  <p className="text-[10px] text-ink/30 mt-0.5 uppercase tracking-[0.15em]">
                    {t.location}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
