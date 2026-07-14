import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { commerce } from "@/lib/commerce";
import { FilterSidebar } from "@/components/plp/FilterSidebar";
import { SortDropdown } from "@/components/plp/SortDropdown";
import { ProductGrid } from "@/components/plp/ProductGrid";
import { Breadcrumbs } from "@/components/plp/Breadcrumbs";
import { filterAndSort } from "@/lib/utils/filter-products";

// Navratna stone metadata for the type-filtered view
const GEMSTONE_TYPES: Record<string, { name: string; sanskrit: string; image: string; description: string }> = {
  ruby: {
    name: "Ruby (Manik)",
    sanskrit: "Sun · Surya",
    image: "/gemstones/ruby-new.jpg",
    description: "The Sun's stone - commanding confidence, leadership, and vitality. Unheated natural rubies sourced from Burma.",
  },
  pearl: {
    name: "Pearl (Moti)",
    sanskrit: "Moon · Chandra",
    image: "/gemstones/pearl.png",
    description: "The Moon's stone - fostering emotional balance, clarity of mind, and inner peace. Ethically sourced freshwater pearls.",
  },
  "red-coral": {
    name: "Red Coral (Moonga)",
    sanskrit: "Mars · Mangal",
    image: "/gemstones/red-coral-new.jpg",
    description: "Mars's stone - empowering courage, health, and decisive action. Vivid Mediterranean red coral.",
  },
  emerald: {
    name: "Emerald (Panna)",
    sanskrit: "Mercury · Budha",
    image: "/gemstones/emerald.png",
    description: "Mercury's stone - enhancing intellect, communication, and business acumen. Untreated Colombian emeralds.",
  },
  "yellow-sapphire": {
    name: "Yellow Sapphire (Pukhraj)",
    sanskrit: "Jupiter · Brihaspati",
    image: "/gemstones/yellow-sapphire.png",
    description: "Jupiter's stone - bringing wisdom, prosperity, and spiritual growth. Unheated sapphires from Ceylon.",
  },
  "diamond-gem": {
    name: "Diamond (Heera)",
    sanskrit: "Venus · Shukra",
    image: "/gemstones/diamond.png",
    description: "Venus's stone - enhancing love, luxury, and artistic creativity. GIA-certified, ethically sourced diamonds.",
  },
  "blue-sapphire": {
    name: "Blue Sapphire (Neelam)",
    sanskrit: "Saturn · Shani",
    image: "/gemstones/blue-sapphire.png",
    description: "Saturn's most powerful stone - known to rapidly transform destiny. Unheated Kashmir blue sapphires.",
  },
  hessonite: {
    name: "Hessonite Garnet (Gomed)",
    sanskrit: "Rahu · Shadow Planet",
    image: "/gemstones/hessonite.png",
    description: "Rahu's stone - dispelling confusion, removing obstacles, and bringing clarity. Honey-hued hessonite garnets.",
  },
  "cats-eye": {
    name: "Cat's Eye (Lehsunia)",
    sanskrit: "Ketu · Shadow Planet",
    image: "/gemstones/cats-eye.png",
    description: "Ketu's stone - protecting against unseen forces and accelerating spiritual growth. Phenomenon-grade chrysoberyl.",
  },
};

export async function generateStaticParams() {
  const categories = await commerce.getCategories();
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
}): Promise<Metadata> {
  const [{ category }, sp] = await Promise.all([params, searchParams]);
  const cat = await commerce.getCategory(category);
  if (!cat) return { title: "Not Found" };

  // If filtering by gemstone type, use that as the title
  const typeInfo = sp.type ? GEMSTONE_TYPES[sp.type] : null;
  const pageTitle = typeInfo ? `${typeInfo.name} | Radha Rani Gemstone Maison` : `${cat.name} | Radha Rani Gemstone Maison`;

  return {
    title: pageTitle,
    description: typeInfo?.description ?? cat.description,
    keywords: [
      `Buy ${typeInfo?.name ?? cat.name} India`,
      `${typeInfo?.name ?? cat.name} online`,
      `Authentic ${typeInfo?.name ?? cat.name}`,
      `Astrological ${typeInfo?.name ?? cat.name}`,
      "Luxury Custom Jewelry",
    ],
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

  // Detect if filtering by a specific gemstone type
  const activeType = sp.type ? GEMSTONE_TYPES[sp.type] : null;

  // Hero image & title: use the gemstone-specific image if a type filter is active
  const heroImage = activeType
    ? { url: activeType.image, alt: activeType.name }
    : cat.heroImage;
  const heroTitle = activeType ? activeType.name : cat.name;
  const heroSubtitle = activeType ? activeType.sanskrit : "Category";
  const heroDesc = activeType ? activeType.description : cat.description;

  return (
    <>
      <section className="relative aspect-[16/7] w-full bg-cream-warm">
        <img
          src={heroImage.url}
          alt={heroImage.alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
        <div className="container-x relative flex h-full items-end pb-10">
          <div className="text-cream">
            <p className="eyebrow text-cream/80">{heroSubtitle}</p>
            <h1 className="mt-2 font-serif text-4xl md:text-6xl">{heroTitle}</h1>
            <p className="mt-3 max-w-xl text-sm md:text-base opacity-90">{heroDesc}</p>
          </div>
        </div>
      </section>

      <div className="container-x py-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Gemstones", href: "/shop/gemstones" },
            ...(activeType ? [{ label: activeType.name }] : [{ label: cat.name }]),
          ]}
        />
        <div className="mt-6 flex items-end justify-between gap-4">
          <div>
            {activeType && (
              <p className="text-[10px] uppercase tracking-[0.2em] text-ink/40 mb-1">{activeType.sanskrit}</p>
            )}
            <p className="text-sm text-ink-muted">{products.length} pieces</p>
          </div>
          <div className="hidden lg:block">
            <SortDropdown />
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <FilterSidebar category={category} />
          </div>
          <div className="lg:col-span-9">
            <ProductGrid products={products} category={category} />
          </div>
        </div>
      </div>
    </>
  );
}
