import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { commerce } from "@/lib/commerce";
import { ProductGrid } from "@/components/plp/ProductGrid";
import { Breadcrumbs } from "@/components/plp/Breadcrumbs";

export async function generateStaticParams() {
  const collections = await commerce.getCollections();
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = await commerce.getCollection(slug);
  if (!c) return { title: "Not Found" };
  return { title: c.name, description: c.description };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = await commerce.getCollection(slug);
  if (!collection) notFound();

  const products = await commerce.getProducts({ collection: slug });

  return (
    <>
      <section className="relative aspect-[16/8] w-full bg-cream-warm">
        <img src={collection.heroImage.url} alt={collection.heroImage.alt} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/40" />
        <div className="container-x relative flex h-full items-end pb-12">
          <div className="text-cream max-w-2xl">
            <p className="eyebrow text-cream/80">Collection</p>
            <h1 className="mt-2 font-serif text-5xl md:text-7xl">{collection.name}</h1>
            <p className="mt-4 text-base">{collection.tagline}</p>
          </div>
        </div>
      </section>

      <div className="container-x py-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Collections", href: "/collections" },
            { label: collection.name },
          ]}
        />
        <div className="mt-10 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-serif text-2xl leading-relaxed">{collection.description}</p>
          </div>
          <div className="lg:col-span-8">
            <ProductGrid products={products} />
          </div>
        </div>
      </div>
    </>
  );
}
