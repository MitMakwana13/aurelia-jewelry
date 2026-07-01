import Link from "next/link";
import type { Product } from "@/lib/commerce/types";
import { ProductCard } from "@/components/product/ProductCard";

export function ProductGrid({ products, category }: { products: Product[]; category?: string }) {
  if (products.length === 0) {
    const isGemstones = category === "gemstones";
    return (
      <div className="py-24 text-center">
        <p className="font-serif text-3xl text-ink">No products found.</p>
        <p className="mt-3 text-sm text-ink/50 max-w-sm mx-auto">
          {isGemstones
            ? "No gemstones match this filter. Try a different stone type or clear all filters."
            : "No items match those filters. Try adjusting your selection."}
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href={isGemstones ? "/shop/gemstones" : "/shop"}
            className="text-[10px] uppercase tracking-[0.2em] border border-ink px-6 py-3 hover:bg-ink hover:text-cream transition"
          >
            {isGemstones ? "View All Gemstones" : "Clear Filters"}
          </Link>
          <Link
            href="/custom"
            className="text-[10px] uppercase tracking-[0.2em] text-ink/50 hover:text-ink transition"
          >
            Request Custom →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.handle} product={p} />
      ))}
    </div>
  );
}
