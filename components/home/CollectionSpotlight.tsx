import Link from "next/link";
import { collections } from "@/data/collections";

export function CollectionSpotlight() {
  const featured = collections.filter((c) => ["puzzle", "dome"].includes(c.slug));

  return (
    <section className="container-x py-20">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {featured.map((c, i) => (
          <Link
            href={`/collections/${c.slug}`}
            key={c.slug}
            className={`group block ${i === 1 ? "lg:mt-24" : ""}`}
          >
            <div className="relative aspect-[5/6] overflow-hidden bg-cream-warm">
              <img
                src={c.heroImage.url}
                alt={c.heroImage.alt}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="mt-6 max-w-md">
              <p className="eyebrow">Collection</p>
              <h3 className="mt-3 font-serif text-3xl md:text-4xl">{c.name}</h3>
              <p className="mt-3 text-sm text-ink-soft leading-relaxed">{c.description}</p>
              <span className="mt-5 inline-block text-xs uppercase tracking-[0.2em] link-underline">
                Shop {c.name} →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
