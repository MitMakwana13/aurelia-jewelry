"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/commerce/types";
import { useCurrency } from "@/context/CurrencyContext";
import { HeartIcon } from "@/components/ui/Icons";
import { InquiryModal } from "@/components/inquiry/InquiryModal";

export function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const { formatPrice } = useCurrency();
  const second = product.images[1] ?? product.images[0];

  const inferType = () => {
    const cat = product.categorySlug?.toLowerCase() ?? "";
    if (cat.includes("diamond") || product.tags?.includes("diamond")) return "DIAMOND" as const;
    if (cat.includes("gemstone") || cat.includes("gem")) return "GEMSTONE" as const;
    return "GENERAL" as const;
  };

  return (
    <>
      <article
        className="group relative flex flex-col transition-all duration-700 ease-out-smooth"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Link href={`/products/${product.handle}`} className="block relative bg-cream-warm">
          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src={product.images[0].url}
              alt={product.images[0].alt}
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1.5s] ease-out-smooth ${
                hovered && product.images[1] ? "scale-105 opacity-0" : "scale-100 opacity-100"
              }`}
              loading="lazy"
            />
            {product.images[1] && (
              <img
                src={second.url}
                alt={second.alt}
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1.5s] ease-out-smooth ${
                  hovered ? "scale-100 opacity-100" : "scale-105 opacity-0"
                }`}
                loading="lazy"
              />
            )}

            {/* Subtle Gradient Overlay on Hover for Button Readability */}
            <div className={`absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent transition-opacity duration-1000 ${hovered ? "opacity-100" : "opacity-0"}`} />

            {/* Tags */}
            <div className="absolute left-4 top-4 flex flex-col gap-2">
              {product.newArrival && (
                <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 text-[8px] uppercase tracking-[0.25em] text-ink shadow-sm">
                  Bespoke
                </span>
              )}
              {product.bestseller && !product.newArrival && (
                <span className="bg-[#053624]/90 backdrop-blur-sm px-3 py-1.5 text-[8px] uppercase tracking-[0.25em] text-cream shadow-sm">
                  Masterpiece
                </span>
              )}
            </div>

            {/* Wishlist */}
            <button
              aria-label="Add to wishlist"
              onClick={(e) => { e.preventDefault(); }}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/50 backdrop-blur-md opacity-0 transition-all duration-500 hover:bg-white group-hover:opacity-100"
            >
              <HeartIcon width={14} height={14} />
            </button>

            {/* Inquiry Button */}
            <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 transition-all duration-700 ease-out-smooth group-hover:translate-y-0 group-hover:opacity-100">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setInquiryOpen(true);
                }}
                className="w-full bg-white/90 backdrop-blur-md border border-ink/10 py-3.5 text-[10px] uppercase tracking-[0.25em] text-ink hover:bg-ink hover:text-white transition-colors duration-500 shadow-lg"
              >
                Inquire
              </button>
            </div>
          </div>
        </Link>

        {/* Details Below Image */}
        <div className="mt-6 text-center px-2">
          <Link href={`/products/${product.handle}`} className="block">
            <h3 className="font-serif text-xl md:text-2xl text-ink leading-tight transition-colors hover:text-[#053624]">
              {product.title}
            </h3>
          </Link>
          <div className="mt-3 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.2em] text-ink/50">
            <span>{product.metals.length === 1 ? product.metals[0] : `${product.metals.length} Metals`}</span>
            <span className="w-1 h-1 rounded-full bg-ink/20" />
            <span>
              {product.priceRange.min.amount === product.priceRange.max.amount
                ? formatPrice(product.priceRange.min.amount)
                : `${formatPrice(product.priceRange.min.amount)} – ${formatPrice(product.priceRange.max.amount)}`}
            </span>
          </div>
        </div>
      </article>

      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        productId={product.id}
        productName={product.title}
        defaultType={inferType()}
      />
    </>
  );
}
