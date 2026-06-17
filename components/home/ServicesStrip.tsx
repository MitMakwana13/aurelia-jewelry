import Link from "next/link";

const services = [
  {
    title: "Visit a Store",
    body: "Try on, get fit, and meet our team in 14 cities across North America.",
    image: "https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&w=900&q=80",
    cta: "Find a Store",
    href: "/stores",
  },
  {
    title: "Professional Piercing",
    body: "Expert piercers, sterile needles, and a full ear of fine jewelry to choose from.",
    image: "https://images.unsplash.com/photo-1535556116002-6281ff3e9f36?auto=format&fit=crop&w=900&q=80",
    cta: "Book Now",
    href: "/stores",
  },
  {
    title: "Free Cleaning",
    body: "Bring your pieces back to life. Complimentary cleaning at every Aurelia location.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80",
    cta: "Learn More",
    href: "/stores",
  },
];

export function ServicesStrip() {
  return (
    <section className="container-x py-20">
      <h2 className="font-serif text-3xl md:text-4xl">Stores & Services</h2>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {services.map((s) => (
          <Link key={s.title} href={s.href} className="group block">
            <div className="aspect-[4/3] overflow-hidden bg-cream-warm">
              <img
                src={s.image}
                alt=""
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <h3 className="mt-5 font-serif text-2xl">{s.title}</h3>
            <p className="mt-2 text-sm text-ink-soft leading-relaxed">{s.body}</p>
            <span className="mt-4 inline-block text-xs uppercase tracking-[0.2em] link-underline">
              {s.cta} →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
