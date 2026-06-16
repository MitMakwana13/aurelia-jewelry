"use client";

import { useMemo, useState } from "react";
import type { Product, ProductVariant } from "@/lib/commerce/types";
import { useCart } from "@/lib/store/cart-store";
import { formatMoney } from "@/lib/utils/format";
import { PlusIcon, MinusIcon, HeartIcon, ChevronDownIcon } from "@/components/ui/Icons";

const ACCORDION = [
  {
    title: "Description",
    field: "description" as const,
  },
  {
    title: "Materials & Care",
    body: "Crafted from solid 14k gold or recycled 925 sterling silver. Avoid contact with perfume, lotion, and chlorine. Polish with a soft cloth — bring it into any Aurelia store for complimentary professional cleaning.",
  },
  {
    title: "Shipping & Returns",
    body: "Complimentary carbon-neutral shipping on orders over $150. 30-day free returns and exchanges. Final-sale pieces are clearly marked at checkout.",
  },
];

export function ProductDetails({ product }: { product: Product }) {
  const addItem = useCart((s) => s.addItem);
  const [metal, setMetal] = useState(product.metals[0]);
  const [size, setSize] = useState(product.sizes?.[0]);
  const [qty, setQty] = useState(1);
  const [open, setOpen] = useState<string | null>("Description");
  const [adding, setAdding] = useState(false);

  const variant = useMemo<ProductVariant | undefined>(() => {
    return product.variants.find((v) => v.metal === metal && (!size || v.size === size));
  }, [product.variants, metal, size]);

  const handleAdd = () => {
    if (!variant) return;
    setAdding(true);
    addItem(product, variant, qty);
    setTimeout(() => setAdding(false), 800);
  };

  return (
    <div className="lg:pl-6 xl:pl-12">
      <p className="eyebrow">{product.categorySlug}</p>
      <h1 className="mt-3 font-serif text-3xl md:text-4xl leading-tight">{product.title}</h1>
      <p className="mt-4 text-lg">
        {variant ? formatMoney(variant.price) : formatMoney(product.priceRange.min)}
      </p>

      <div className="mt-8 space-y-6">
        <div>
          <p className="eyebrow mb-3">Material — <span className="text-ink normal-case tracking-normal">{metal}</span></p>
          <div className="flex flex-wrap gap-2">
            {product.metals.map((m) => (
              <button
                key={m}
                onClick={() => setMetal(m)}
                className={`border px-4 py-2 text-xs uppercase tracking-[0.16em] transition ${
                  metal === m ? "border-ink bg-ink text-cream" : "border-border hover:border-ink"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {product.sizes && (
          <div>
            <div className="mb-3 flex items-center justify-between">
              <p className="eyebrow">Size — <span className="text-ink normal-case tracking-normal">{size}</span></p>
              <button className="text-xs underline underline-offset-2">Size Guide</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`h-10 min-w-10 border px-3 text-sm transition ${
                    size === s ? "border-ink bg-ink text-cream" : "border-border hover:border-ink"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          <div className="inline-flex items-center border border-border">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="p-3 hover:bg-cream-warm"
              aria-label="Decrease"
            >
              <MinusIcon width={14} height={14} />
            </button>
            <span className="w-10 text-center text-sm">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="p-3 hover:bg-cream-warm"
              aria-label="Increase"
            >
              <PlusIcon width={14} height={14} />
            </button>
          </div>
          <button onClick={handleAdd} disabled={!variant || adding} className="btn-primary flex-1">
            {adding ? "Added ✓" : "Add to Bag"}
          </button>
          <button
            aria-label="Add to wishlist"
            className="border border-border p-3 hover:border-ink transition"
          >
            <HeartIcon />
          </button>
        </div>

        <p className="text-xs text-ink-muted">
          Ships in 1–3 business days · Complimentary returns within 30 days
        </p>
      </div>

      <div className="mt-12 border-t border-border">
        {ACCORDION.map((row) => (
          <div key={row.title} className="border-b border-border">
            <button
              onClick={() => setOpen(open === row.title ? null : row.title)}
              className="flex w-full items-center justify-between py-5 text-left text-sm uppercase tracking-[0.16em]"
            >
              {row.title}
              <ChevronDownIcon
                width={16}
                height={16}
                className={`transition-transform ${open === row.title ? "rotate-180" : ""}`}
              />
            </button>
            {open === row.title && (
              <p className="pb-6 text-sm leading-relaxed text-ink-soft">
                {"field" in row ? product.description : row.body}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
