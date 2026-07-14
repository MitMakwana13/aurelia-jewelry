"use client";

import { useMemo, useState } from "react";
import type { Product, ProductVariant } from "@/lib/commerce/types";
import { InquiryModal } from "@/components/inquiry/InquiryModal";
import { useCurrency } from "@/context/CurrencyContext";
import { HeartIcon, ChevronDownIcon } from "@/components/ui/Icons";

const ACCORDION = [
  { title: "Description", field: "description" as const },
  {
    title: "Materials & Care",
    body: "Crafted from solid 14k gold or recycled 925 sterling silver. Avoid contact with perfume, lotion, and chlorine. Polish with a soft cloth. Bring it to any Radha Rani boutique for complimentary professional cleaning.",
  },
  {
    title: "Shipping & Returns",
    body: "Complimentary carbon-neutral shipping on orders over ₹15,000. 30-day free returns and exchanges. Final-sale pieces are clearly marked at checkout.",
  },
  {
    title: "Certificate of Authenticity",
    body: "Every piece from Radha Rani Heritage Collection comes with a certificate of authenticity, gemstone grading report where applicable, and a handwritten note from our atelier.",
  },
];

export function ProductDetails({ product }: { product: Product }) {
  // Default to cheapest metal - same price the listing card shows
  const cheapestVariant = product.variants.reduce(
    (min, v) => (v.price.amount < min.price.amount ? v : min),
    product.variants[0]
  );
  const cheapestMetal = cheapestVariant?.metal ?? product.metals[0];

  const [metal, setMetal] = useState(cheapestMetal);
  const [size, setSize] = useState(product.sizes?.[0]);
  const [open, setOpen] = useState<string | null>("Description");
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const { formatPrice } = useCurrency();

  const variant = useMemo<ProductVariant | undefined>(
    () => product.variants.find((v) => v.metal === metal && (!size || v.size === size)),
    [product.variants, metal, size]
  );

  const displayPrice = variant?.price ?? product.priceRange.min;

  const whatsappMessage = encodeURIComponent(
    `Hello, I'm interested in the *${product.title}*. Could you please share more details and pricing?`
  );
  const whatsappUrl = `https://wa.me/919876543210?text=${whatsappMessage}`;

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
          <div className="mt-6">
            <p className="text-sm uppercase tracking-[0.2em] text-ink/60">Price Upon Request</p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Material Selection */}
          <div className="border-t border-ink/10 pt-6">
            <p className="text-[10px] uppercase tracking-[0.2em] text-ink/50 mb-4">Select Material</p>
            <div className="flex flex-wrap gap-3">
              {product.metals.map((m) => {
                const mv = product.variants.find((v) => v.metal === m && (!size || v.size === size));
                return (
                  <button
                    key={m}
                    onClick={() => setMetal(m)}
                    className={`border px-5 py-3 text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
                      metal === m ? "border-ink bg-ink text-white shadow-md" : "border-ink/20 hover:border-ink/60"
                    }`}
                  >
                    {m}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Size Selection */}
          {product.sizes && (
            <div className="border-t border-ink/10 pt-6">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-[10px] uppercase tracking-[0.2em] text-ink/50">Select Size</p>
                <a href="/help/sizing" className="text-[10px] uppercase tracking-[0.2em] text-ink underline underline-offset-4 hover:text-gold-dark transition-colors">
                  Size Guide
                </a>
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
          <div className="border-t border-ink/10 pt-8 space-y-3">
            <button
              onClick={() => setInquiryOpen(true)}
              className="w-full bg-ink text-white py-5 text-[11px] uppercase tracking-[0.25em] hover:bg-gold-dark hover:shadow-xl transition-all duration-500"
            >
              Send Inquiry
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 border-2 border-[#25D366] text-[#25D366] py-4 text-[11px] uppercase tracking-[0.2em] hover:bg-[#25D366] hover:text-white transition-all duration-500"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Inquiry
            </a>

            <div className="flex items-center gap-2">
              <a
                href="tel:+919876543210"
                className="flex-1 flex items-center justify-center gap-2 border border-ink/20 py-3.5 text-[10px] uppercase tracking-[0.2em] text-ink hover:border-ink transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.61A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                Call Us
              </a>
              <button
                aria-label="Save to wishlist"
                className="border border-ink/20 w-14 flex items-center justify-center h-[46px] hover:border-ink transition-colors"
              >
                <HeartIcon />
              </button>
            </div>
          </div>

          <p className="text-[10px] uppercase tracking-[0.1em] text-ink/40 text-center leading-relaxed">
            All inquiries responded to within 24 hours. <br /> 50% advance required to confirm bespoke orders.
          </p>
        </div>

        {/* Accordion */}
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
              <div className={`overflow-hidden transition-all duration-500 ${open === row.title ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
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
        productName={`${product.title} (${metal}${size ? `, Size: ${size}` : ""})`}
        defaultType={inferType()}
      />
    </>
  );
}
