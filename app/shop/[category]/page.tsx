import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { commerce } from "@/lib/commerce";
import { FilterSidebar } from "@/components/plp/FilterSidebar";
import { SortDropdown } from "@/components/plp/SortDropdown";
import { ProductGrid } from "@/components/plp/ProductGrid";
import { Breadcrumbs } from "@/components/plp/Breadcrumbs";
import { filterAndSort } from "@/lib/utils/filter-products";

export async function generateStaticParams() {
  const categories = await commerce.getCategories();
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = await commerce.getCategory(category);
  if (!cat) return { title: "Not Found" };
  return { 
    title: `${cat.name} | Radha Rani Gemstone Maison`, 
    description: cat.description,
    keywords: [
      `Buy ${cat.name} India`,
      `${cat.name} Gemstones online`,
      `Authentic ${cat.name}`,
      `Astrological ${cat.name}`,
      "Luxury Custom Jewelry"
    ]
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const [{ category }, sp] = await Promise.all([params, searchParams]);
  const cat = await commerce.getCategory(category);
  if (!cat) notFound();

  const all = await commerce.getProducts({ category });
  const products = filterAndSort(all, sp);

  return (
    <>
      <section className="relative aspect-[16/7] w-full bg-cream-warm">
        <img src={cat.heroImage.url} alt={cat.heroImage.alt} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent" />
        <div className="container-x relative flex h-full items-end pb-10">
          <div className="text-cream">
            <p className="eyebrow text-cream/80">Category</p>
            <h1 className="mt-2 font-serif text-4xl md:text-6xl">{cat.name}</h1>
            <p className="mt-3 max-w-xl text-sm md:text-base">{cat.description}</p>
          </div>
        </div>
      </section>

      <div className="container-x py-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "All Jewelry", href: "/shop" },
            { label: cat.name },
          ]}
        />
        <div className="mt-6 flex items-end justify-between gap-4">
          <p className="text-sm text-ink-muted">{products.length} pieces</p>
          <SortDropdown />
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
    </>
  );
}
