import type { Product } from "@/lib/commerce/types";
import { ProductCard } from "@/components/product/ProductCard";

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="font-serif text-2xl">No products match those filters.</p>
        <p className="mt-2 text-sm text-ink-muted">Try clearing a filter or browsing all jewelry.</p>
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
