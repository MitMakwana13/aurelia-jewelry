"use client";

import { useMemo, useState } from "react";
import type { Product, ProductVariant } from "@/lib/commerce/types";
import { useCart } from "@/lib/store/cart-store";
import { InquiryModal } from "@/components/inquiry/InquiryModal";
import { formatMoney } from "@/lib/utils/format";
import { PlusIcon, MinusIcon, HeartIcon, ChevronDownIcon } from "@/components/ui/Icons";

const ACCORDION = [
  {
    title: "Description",
    field: "description" as const,
  },
  {
    title: "Materials & Care",
    body: "Crafted from solid 14k gold or recycled 925 sterling silver. Avoid contact with perfume, lotion, and chlorine. Polish with a soft cloth. Bring it to any Radha Rani boutique for complimentary professional cleaning.",
  },
  {
    title: "Shipping & Returns",
    body: "Complimentary carbon-neutral shipping on orders over ₹15,000. 30-day free returns and exchanges. Final-sale pieces are clearly marked at checkout.",
  },
];

export function ProductDetails({ product }: { product: Product }) {
  const [metal, setMetal] = useState(product.metals[0]);
  const [size, setSize] = useState(product.sizes?.[0]);
  const [open, setOpen] = useState<string | null>("Description");
  const [inquiryOpen, setInquiryOpen] = useState(false);

  const variant = useMemo<ProductVariant | undefined>(() => {
    return product.variants.find((v) => v.metal === metal && (!size || v.size === size));
  }, [product.variants, metal, size]);

  const inferType = () => {
    const cat = product.categorySlug?.toLowerCase() ?? "";
    if (cat.includes("diamond") || product.tags?.includes("diamond")) return "DIAMOND" as const;
    if (cat.includes("gemstone") || cat.includes("gem")) return "GEMSTONE" as const;
    return "GENERAL" as const;
  };

  return (
    <>
      <div className="lg:pl-6 xl:pl-16 space-y-10">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-ink/50 mb-4">{product.categorySlug}</p>
          <h1 className="font-serif text-4xl md:text-5xl leading-tight text-ink">{product.title}</h1>
          <p className="mt-6 text-xl tracking-wide text-ink">
            {variant ? formatMoney(variant.price) : formatMoney(product.priceRange.min)}
          </p>
        </div>

        <div className="space-y-8">
          {/* Material Selection */}
          <div className="border-t border-ink/10 pt-6">
            <p className="text-[10px] uppercase tracking-[0.2em] text-ink/50 mb-4">Select Material</p>
            <div className="flex flex-wrap gap-3">
              {product.metals.map((m) => (
                <button
                  key={m}
                  onClick={() => setMetal(m)}
                  className={`border px-5 py-3 text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
                    metal === m ? "border-ink bg-ink text-white shadow-md" : "border-ink/20 hover:border-ink/60"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          {product.sizes && (
            <div className="border-t border-ink/10 pt-6">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-[10px] uppercase tracking-[0.2em] text-ink/50">Select Size</p>
                <button className="text-[10px] uppercase tracking-[0.2em] text-ink underline underline-offset-4 hover:text-gold-dark transition-colors">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`h-12 min-w-[3rem] border px-4 text-xs transition-all duration-300 ${
                      size === s ? "border-ink bg-ink text-white shadow-md" : "border-ink/20 hover:border-ink/60"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="border-t border-ink/10 pt-8 flex gap-4">
            <button 
              onClick={() => setInquiryOpen(true)} 
              className="flex-1 bg-ink text-white py-5 text-[11px] uppercase tracking-[0.25em] hover:bg-gold-dark hover:shadow-xl transition-all duration-500"
            >
              Send Inquiry
            </button>
            <button
              aria-label="Add to wishlist"
              className="border border-ink/20 w-14 flex items-center justify-center hover:border-ink transition-colors"
            >
              <HeartIcon />
            </button>
          </div>

          <p className="text-[10px] uppercase tracking-[0.1em] text-ink/40 text-center leading-relaxed">
            All inquiries responded to within 24 hours. <br/> 50% advance required to confirm bespoke orders.
          </p>
        </div>

        {/* Specifications Accordion */}
        <div className="border-t border-ink/10">
          {ACCORDION.map((row) => (
            <div key={row.title} className="border-b border-ink/10">
              <button
                onClick={() => setOpen(open === row.title ? null : row.title)}
                className="flex w-full items-center justify-between py-6 text-left text-[11px] uppercase tracking-[0.2em] text-ink hover:text-gold-dark transition-colors"
              >
                {row.title}
                <ChevronDownIcon
                  width={14}
                  height={14}
                  className={`transition-transform duration-500 ${open === row.title ? "rotate-180" : ""}`}
                />
              </button>
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${open === row.title ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                <p className="pb-8 text-sm leading-relaxed text-ink/70 max-w-lg">
                  {"field" in row ? product.description : row.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

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
