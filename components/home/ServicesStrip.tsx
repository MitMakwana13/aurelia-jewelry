import Link from "next/link";

const services = [
  {
    title: "Expert Gem Consultation",
    body: "Our Vedic gem advisors help you select the right stone for your birth chart — online or in-person, in Hindi or English.",
    image: "https://images.unsplash.com/photo-1599643478524-fb524b0d0f72?auto=format&fit=crop&w=900&q=80",
    cta: "Book a Consultation",
    href: "/custom",
  },
  {
    title: "Bespoke Jewelry Atelier",
    body: "From sketch to masterpiece — commission a one-of-a-kind piece set with your chosen Navratna stone. Starting at 50% advance.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80",
    cta: "Begin Your Commission",
    href: "/custom",
  },
  {
    title: "Worldwide Concierge Shipping",
    body: "Fully insured, discreet luxury packaging delivered anywhere in the world. Every shipment is tracked and guaranteed.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80",
    cta: "Shipping Information",
    href: "/help/shipping",
  },
];

export function ServicesStrip() {
  return (
    <section className="container-x py-28 lg:py-36">
      <div className="flex items-end justify-between mb-14">
        <div>
          <p className="eyebrow tracking-[0.3em] mb-3">White-Glove Services</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight">Our Concierge</h2>
        </div>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {services.map((s) => (
          <Link key={s.title} href={s.href} className="group block">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={s.image}
                alt={s.title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <h3 className="mt-6 font-serif text-xl text-ink group-hover:text-[#053624] transition-colors duration-300">{s.title}</h3>
            <p className="mt-2 text-xs text-ink/50 leading-relaxed">{s.body}</p>
            <span className="mt-4 inline-block text-[9px] uppercase tracking-[0.25em] text-[#053624] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {s.cta} →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
