import type { Metadata } from "next";
import Link from "next/link";
import { commerce } from "@/lib/commerce";
import { Breadcrumbs } from "@/components/plp/Breadcrumbs";

export const metadata: Metadata = {
  title: "Collections",
  description: "Discover Aurelia's curated collections.",
};

export default async function CollectionsPage() {
  const collections = await commerce.getCollections();

  return (
    <div className="container-x py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Collections" }]} />
      <h1 className="mt-6 font-serif text-4xl md:text-5xl">Collections</h1>
      <p className="mt-3 max-w-xl text-sm text-ink-soft">
        Each collection is built around an idea — an object, a material, a way of wearing.
        Together, they tell the story of Aurelia.
      </p>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {collections.map((c, i) => (
          <Link key={c.slug} href={`/collections/${c.slug}`} className={`group block ${i % 2 === 1 ? "lg:mt-12" : ""}`}>
            <div className="aspect-[4/5] overflow-hidden bg-cream-warm">
              <img src={c.heroImage.url} alt={c.heroImage.alt} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <p className="eyebrow mt-5">{c.tagline}</p>
            <h2 className="mt-2 font-serif text-2xl">{c.name}</h2>
            <p className="mt-2 text-sm text-ink-soft">{c.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
