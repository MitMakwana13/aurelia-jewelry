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
    <section className="py-20">
      <div className="container-x flex items-end justify-between">
        <div>
          <p className="eyebrow">Customer Favorites</p>
          <h2 className="mt-2 font-serif text-3xl md:text-4xl">{title}</h2>
        </div>
        <div className="flex items-center gap-3">
          <Link href={viewAllHref} className="hidden md:inline-block text-xs uppercase tracking-[0.2em] link-underline">
            View All
          </Link>
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Scroll left"
            className="border border-border p-2 hover:bg-ink hover:text-cream hover:border-ink transition"
          >
            <ArrowLeftIcon width={16} height={16} />
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label="Scroll right"
            className="border border-border p-2 hover:bg-ink hover:text-cream hover:border-ink transition"
          >
            <ArrowRightIcon width={16} height={16} />
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        className="hide-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 md:px-8 lg:px-12"
      >
        {products.map((p) => (
          <div key={p.handle} data-card className="w-[68vw] flex-shrink-0 snap-start sm:w-[40vw] md:w-[28vw] lg:w-[22vw]">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
