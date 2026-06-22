"use client";

import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative w-full h-[85vh] min-h-[600px] overflow-hidden bg-[#f4f4f4]">
      {/* Background Image - Clean Editorial Style */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/hero-clean.png"
          alt="Radha Rani Fine Jewelry"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Very subtle gradient just to ensure text readability if needed, but keeping it minimal like Mejuri */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-transparent to-transparent md:w-1/2" />
      </div>

      {/* Content Container - Left Aligned, Clean */}
      <div className="relative h-full container-x flex flex-col justify-center">
        <div className="max-w-xl text-left pt-12 md:pt-0">
          
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ink tracking-tight leading-tight mb-4">
            THE NEW STANDARD
          </h1>
          
          <p className="font-serif italic text-lg md:text-xl text-ink/80 mb-10">
            Fine jewelry crafted with centuries of heritage.
          </p>

          <Link 
            href="/shop/gemstones" 
            className="inline-block bg-ink text-white px-10 py-4 text-[11px] uppercase tracking-widest font-medium hover:bg-ink/90 transition-colors"
          >
            SHOP ALL
          </Link>

        </div>
      </div>
    </section>
  );
}
