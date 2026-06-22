"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const features = [
  {
    title: "Certified Authentic",
    description: "Every gemstone is ethically sourced, guaranteed natural, and accompanied by a certificate of origin.",
  },
  {
    title: "Lab-Tested",
    description: "Rigorously analyzed by leading gemological laboratories for purity and integrity.",
  },
  {
    title: "Expert Consultation",
    description: "Master gemologists offer bespoke guidance tailored to your specific requirements.",
  },
  {
    title: "Heritage Packaging",
    description: "Delivered in handcrafted presentation boxes.",
  },
  {
    title: "Global Logistics",
    description: "Fully insured, secure, and discreet worldwide delivery.",
  },
];

export function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-[#053624] text-cream relative overflow-hidden">
      {/* Decorative watermark/pattern */}
      <div className="absolute -top-[20%] -right-[10%] w-[50vw] h-[50vw] rounded-full border border-cream/5 opacity-50 blur-3xl pointer-events-none" />
      
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          <div className="lg:col-span-4">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="eyebrow tracking-[0.3em] mb-6 text-cream/60"
            >
              The Standard
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl font-light tracking-tight text-white leading-tight"
            >
              Why Choose <br className="hidden lg:block" /> Radha Rani
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-[1px] w-24 bg-cream/30 mt-8 origin-left"
            />
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-16">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="relative pl-6"
              >
                <div className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-cream/40" />
                <h3 className="text-[12px] uppercase tracking-[0.2em] text-white mb-3">{feature.title}</h3>
                <p className="font-serif text-lg text-cream/70 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
