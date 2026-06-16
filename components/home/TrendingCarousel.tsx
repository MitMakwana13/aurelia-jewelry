"use client";

import { useRef } from "react";
import Link from "next/link";
import type { Product } from "@/lib/commerce/types";
import { ProductCard } from "@/components/product/ProductCard";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/Icons";

export function TrendingCarousel({ products, title = "Trending Now", viewAllHref = "/shop" }: {
  products: Product[];
  title?: string;
  viewAllHref?: string;
}) {
  const scroller = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector("[data-card]") as HTMLElement | null;
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.6;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };
  return (
    <section className="py-24 lg:py-32 bg-cream">
      <div className="container-x flex items-end justify-between">
        <div>
          <p className="eyebrow tracking-[0.3em]">Signature Collection</p>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl font-light tracking-tight">{title}</h2>
        </div>
        <div className="flex items-center gap-4">
          <Link href={viewAllHref} className="hidden md:inline-block text-[10px] uppercase tracking-[0.25em] link-underline">
            View All
          </Link>
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Scroll left"
            className="border border-ink/20 p-3 hover:bg-[#053624] hover:text-cream hover:border-[#053624] transition-colors duration-300 rounded-full"
          >
            <ArrowLeftIcon width={16} height={16} />
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label="Scroll right"
            className="border border-ink/20 p-3 hover:bg-[#053624] hover:text-cream hover:border-[#053624] transition-colors duration-300 rounded-full"
          >
            <ArrowRightIcon width={16} height={16} />
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        className="hide-scrollbar mt-12 flex snap-x snap-mandatory gap-8 md:gap-12 overflow-x-auto px-5 md:px-8 lg:px-12 pb-12"
      >
        {products.map((p) => (
          <div key={p.handle} data-card className="w-[85vw] flex-shrink-0 snap-start sm:w-[45vw] md:w-[32vw] lg:w-[28vw]">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
