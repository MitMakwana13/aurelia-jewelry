import Link from "next/link";

const tiles = [
  {
    label: "Rings",
    href: "/shop/rings",
    image: "https://images.unsplash.com/photo-1603974372039-adc49044b6bd?auto=format&fit=crop&w=900&q=80",
    aspect: "aspect-[4/5]",
    span: "lg:row-span-2",
  },
  {
    label: "Birthstones",
    href: "/collections/birthstones",
    image: "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?auto=format&fit=crop&w=900&q=80",
    aspect: "aspect-square",
  },
  {
    label: "Solid Gold",
    href: "/collections/solid-gold",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80",
    aspect: "aspect-square",
  },
  {
    label: "Hoops",
    href: "/shop?tag=hoops",
    image: "https://images.unsplash.com/photo-1535556116002-6281ff3e9f36?auto=format&fit=crop&w=900&q=80",
    aspect: "aspect-square",
  },
  {
    label: "Sterling Silver",
    href: "/collections/sterling-silver",
    image: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&w=900&q=80",
    aspect: "aspect-square",
  },
];

export function CategoryGrid() {
  return (
    <section className="container-x py-20">
      <div className="flex items-end justify-between">
        <h2 className="font-serif text-3xl md:text-4xl">Shop by Category</h2>
        <Link href="/shop" className="text-xs uppercase tracking-[0.2em] link-underline">View All</Link>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:grid-rows-2">
        {tiles.map((tile, i) => (
          <Link
            key={tile.label}
            href={tile.href}
            className={`group relative block overflow-hidden bg-cream-warm ${tile.aspect} ${
              i === 0 ? "col-span-2 lg:col-span-2 lg:row-span-2 lg:aspect-auto" : ""
            }`}
          >
            <img
              src={tile.image}
              alt={tile.label}
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
            <span className="absolute bottom-5 left-5 font-serif text-2xl text-cream md:text-3xl">
              {tile.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
