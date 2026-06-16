"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/commerce/types";
import { formatPriceRange, formatMoney } from "@/lib/utils/format";
import { useCart } from "@/lib/store/cart-store";
import { HeartIcon } from "@/components/ui/Icons";

export function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const addItem = useCart((s) => s.addItem);
  const second = product.images[1] ?? product.images[0];

  return (
    <article
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/products/${product.handle}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-cream-warm">
          <img
            src={product.images[0].url}
            alt={product.images[0].alt}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              hovered && product.images[1] ? "opacity-0" : "opacity-100"
            }`}
            loading="lazy"
          />
          {product.images[1] && (
            <img
              src={second.url}
              alt={second.alt}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                hovered ? "opacity-100" : "opacity-0"
              }`}
              loading="lazy"
            />
          )}

          {product.newArrival && (
            <span className="absolute left-3 top-3 bg-cream-light px-2 py-1 text-[10px] uppercase tracking-[0.18em]">
              New
            </span>
          )}
          {product.bestseller && !product.newArrival && (
            <span className="absolute left-3 top-3 bg-ink px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-cream">
              Bestseller
            </span>
          )}

          <button
            aria-label="Add to wishlist"
            onClick={(e) => {
              e.preventDefault();
            }}
            className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center bg-cream-light/90 opacity-0 transition group-hover:opacity-100 hover:bg-cream-light"
          >
            <HeartIcon width={16} height={16} />
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              addItem(product, product.variants[0]);
            }}
            className="absolute inset-x-3 bottom-3 translate-y-2 bg-ink py-3 text-[11px] uppercase tracking-[0.2em] text-cream opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-ink-soft"
          >
            Quick Add
          </button>
        </div>
      </Link>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <Link href={`/products/${product.handle}`} className="text-sm hover:underline">
            {product.title}
          </Link>
          <p className="mt-1 text-xs text-ink-muted">
            {product.metals.length === 1 ? product.metals[0] : `${product.metals.length} metals`}
          </p>
        </div>
        <p className="text-sm">
          {product.priceRange.min.amount === product.priceRange.max.amount
            ? formatMoney(product.priceRange.min)
            : `From ${formatMoney(product.priceRange.min)}`}
        </p>
      </div>
    </article>
  );
}
