"use client";

import { motion } from "framer-motion";

export type TimelineItem = {
  year: string;
  title: string;
  description: string;
  image?: string;
};

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="relative mx-auto max-w-5xl py-20 px-4 md:px-0">
      {/* Central Line */}
      <div className="absolute left-4 top-20 bottom-20 w-px bg-ink/10 md:left-1/2 md:-ml-px" />

      <div className="space-y-24">
        {items.map((item, index) => {
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className={`relative flex flex-col md:flex-row md:items-start justify-between w-full ${
                isEven ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-4 top-0 md:top-6 md:left-1/2 w-3 h-3 bg-cream border-2 border-ink rounded-full transform -translate-x-[5px] md:-translate-x-1.5 mt-2 md:mt-0 z-10" />

              {/* Content Panel */}
              <div className="w-full pl-12 md:pl-0 md:w-5/12">
                <div className={`flex flex-col ${isEven ? "md:items-start" : "md:items-end md:text-right"}`}>
                  <span className="font-serif text-3xl md:text-5xl text-ink/20 font-light tracking-widest mb-4">
                    {item.year}
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl text-ink mb-4">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-soft mb-6 max-w-md">
                    {item.description}
                  </p>
                  
                  {item.image && (
                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-cream-warm">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Empty Space for the other side */}
              <div className="hidden md:block w-5/12" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
