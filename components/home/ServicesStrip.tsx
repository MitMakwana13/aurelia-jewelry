import Link from "next/link";

const services = [
  {
    title: "Vedic Consultation",
    body: "Get expert astrology-based guidance to discover the gemstone that aligns with your cosmic energy.",
    image: "https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&w=900&q=80",
    cta: "Book Consultation",
    href: "/custom",
  },
  {
    title: "100% Certified Stones",
    body: "Complete transparency and peace of mind with trusted lab certifications such as IGI and GIA.",
    image: "https://images.unsplash.com/photo-1535556116002-6281ff3e9f36?auto=format&fit=crop&w=900&q=80",
    cta: "Verify Certification",
    href: "/help/gem-certification",
  },
  {
    title: "Bespoke Jewelry",
    body: "Work directly with our master craftsmen to create custom rings, pendants, and jewelry designs.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80",
    cta: "Start Designing",
    href: "/custom",
  },
];

export function ServicesStrip() {
  return (
    <section className="container-x py-20">
      <h2 className="font-serif text-3xl md:text-4xl text-center mb-2">Our Services</h2>
      <p className="text-ink-soft text-sm text-center max-w-lg mx-auto mb-12">
        Rooted in trust, craftsmanship, and personal guidance, we create jewelry that truly belongs to you.
      </p>
      <div className="grid gap-6 md:grid-cols-3">
        {services.map((s) => (
          <Link key={s.title} href={s.href} className="group block">
            <div className="aspect-[4/3] overflow-hidden bg-cream-warm">
              <img
                src={s.image}
                alt={s.title}
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
