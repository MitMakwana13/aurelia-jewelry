"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/commerce/types";
import { useCurrency } from "@/context/CurrencyContext";
import { HeartIcon } from "@/components/ui/Icons";
import { InquiryModal } from "@/components/inquiry/InquiryModal";
import { useWishlistStore } from "@/lib/stores/wishlist";

export function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [wishlistMsg, setWishlistMsg] = useState("");
  const { data: session } = useSession();
  const router = useRouter();
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
              aria-label="Toggle wishlist"
              onClick={async (e) => {
                e.preventDefault();
                if (!session) {
                  setWishlistMsg("Please sign in to save");
                  setTimeout(() => setWishlistMsg(""), 2500);
                  setTimeout(() => router.push("/account"), 1000);
                  return;
                }
                
                const isAdding = !useWishlistStore.getState().items.has(product.id);
                // Optimistic UI update
                useWishlistStore.getState().toggleItem(product.id);
                setWishlistMsg(isAdding ? "Added to wishlist" : "Removed from wishlist");
                setTimeout(() => setWishlistMsg(""), 2500);
                
                try {
                  await fetch("/api/wishlist", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ productId: product.id }),
                  });
                } catch (err) {
                  // Revert if failed
                  useWishlistStore.getState().toggleItem(product.id);
                  console.error("Failed to toggle wishlist", err);
                }
              }}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/50 backdrop-blur-md opacity-100 transition-all duration-500 hover:bg-white group-hover:opacity-100"
            >
              {useWishlistStore(s => s.items.has(product.id)) ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-red-500">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              ) : (
                <HeartIcon width={14} height={14} />
              )}
            </button>

            {/* Login/Success toast */}
            {wishlistMsg && (
              <div className="absolute right-4 top-14 z-20 bg-ink text-cream text-[9px] uppercase tracking-[0.18em] px-3 py-2 shadow-lg whitespace-nowrap">
                {wishlistMsg}
              </div>
            )}

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
            <span>Price Upon Request</span>
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
