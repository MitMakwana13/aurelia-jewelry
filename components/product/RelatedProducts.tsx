import type { Product } from "@/lib/commerce/types";
import { ProductCard } from "./ProductCard";

export function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <section className="container-x py-20">
      <h2 className="font-serif text-3xl md:text-4xl">You May Also Like</h2>
      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        {products.slice(0, 4).map((p) => (
          <ProductCard key={p.handle} product={p} />
        ))}
      </div>
    </section>
  );
}
