import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { DeleteProductButton } from "./DeleteProductButton";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { variants: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h1 className="font-serif text-3xl text-ink">Products</h1>
          <p className="mt-1 text-sm text-ink/50">{products.length} products in catalog</p>
        </div>
        <Link href="/admin/products/new" className="btn-primary text-center w-full sm:w-auto">
          + Add Product
        </Link>
      </div>

      <div className="bg-white border border-ink/8 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink/8 bg-cream-warm">
                <th className="text-left px-6 py-3 text-[11px] uppercase tracking-[0.16em] text-ink/50 font-medium">Product</th>
                <th className="text-left px-6 py-3 text-[11px] uppercase tracking-[0.16em] text-ink/50 font-medium">Category</th>
                <th className="text-left px-6 py-3 text-[11px] uppercase tracking-[0.16em] text-ink/50 font-medium">Base Price</th>
                <th className="text-left px-6 py-3 text-[11px] uppercase tracking-[0.16em] text-ink/50 font-medium">Variants</th>
                <th className="text-left px-6 py-3 text-[11px] uppercase tracking-[0.16em] text-ink/50 font-medium">Flags</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {products.map((product) => {
                const images = product.images as Array<{ url: string; alt: string }>;
                return (
                  <tr key={product.id} className="hover:bg-cream-warm/40 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {images[0] && (
                          <img
                            src={images[0].url}
                            alt={images[0].alt}
                            className="w-10 h-10 object-cover rounded-sm bg-cream-warm"
                          />
                        )}
                        <div>
                          <p className="font-medium text-ink">{product.title}</p>
                          <p className="text-xs text-ink/40">{product.handle}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-ink/60 capitalize">{product.categorySlug}</td>
                    <td className="px-6 py-4 text-ink">₹{product.basePrice.toLocaleString("en-IN")}</td>
                    <td className="px-6 py-4 text-ink/60">{product.variants.length}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {product.featured && <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Featured</span>}
                        {product.trending && <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Trending</span>}
                        {product.bestseller && <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Bestseller</span>}
                        {product.newArrival && <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">New</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3 justify-end">
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="text-xs uppercase tracking-[0.14em] text-ink/60 hover:text-ink transition"
                        >
                          Edit
                        </Link>
                        <DeleteProductButton id={product.id} title={product.title} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
