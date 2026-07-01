import type { Metadata } from "next";
import { commerce } from "@/lib/commerce";
import { FilterSidebar } from "@/components/plp/FilterSidebar";
import { SortDropdown } from "@/components/plp/SortDropdown";
import { ProductGrid } from "@/components/plp/ProductGrid";
import { Breadcrumbs } from "@/components/plp/Breadcrumbs";
import { filterAndSort } from "@/lib/utils/filter-products";

export const metadata: Metadata = {
  title: "All Luxury Gemstones & Jewelry",
  description: "Shop authentic, ethically sourced Vedic gemstones, custom diamond rings, and premium heritage jewelry at Radha Rani Gemstone Maison.",
  keywords: [
    "Shop Vedic Gemstones", "Buy Precious Stones Online", "Custom Diamond Jewelry",
    "Radha Rani Shop", "Luxury Jewelry Collection", "Authentic Astrological Rings"
  ],
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const all = await commerce.getProducts();
  const products = filterAndSort(all, params);

  return (
    <div className="container-x py-8 lg:py-12">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "All Jewelry" }]} />
      <div className="mt-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="font-serif text-4xl md:text-5xl">All Jewelry</h1>
          <p className="mt-2 text-sm text-ink-muted">{products.length} pieces</p>
        </div>
        <div className="hidden lg:block">
          <SortDropdown />
        </div>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <FilterSidebar />
        </div>
        <div className="lg:col-span-9">
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
}
