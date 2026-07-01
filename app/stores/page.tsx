import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/plp/Breadcrumbs";

export const metadata: Metadata = {
  title: "Contact & Consultations | Radha Rani Gemstones",
  description: "Book a gemstone consultation or visit our store. Radha Rani Gemstones — natural certified gemstones and custom jewelry.",
};

const services = [
  { name: "Gemstone Consultation", body: "Personalized astrology-based guidance to find the right gemstone for your birth chart.", price: "Complimentary" },
  { name: "Custom Jewelry Design", body: "Work with our craftsmen to create bespoke rings, pendants, and jewelry in gold or silver.", price: "By Quote" },
  { name: "Certification Verification", body: "All stones come with IGI / GIA lab certificates. We verify authenticity before every dispatch.", price: "Included" },
  { name: "Resizing & Repairs", body: "Expert resizing and repair services for all jewelry purchased from us.", price: "By Quote" },
];

export default function StoresPage() {
  return (
    <>
      <section className="relative aspect-[16/7] w-full bg-cream-warm">
        <img
          src="https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&w=1800&q=85"
          alt="Radha Rani Gemstones consultation studio"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
        <div className="container-x relative flex h-full items-end pb-12">
          <div className="text-cream max-w-xl">
            <p className="eyebrow text-cream/80">Visit & Consult</p>
            <h1 className="mt-2 font-serif text-5xl md:text-6xl">Our Services</h1>
          </div>
        </div>
      </section>

      <div className="container-x py-12">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services & Contact" }]} />

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          {/* Contact Info */}
          <div>
            <h2 className="font-serif text-3xl">Get in Touch</h2>
            <p className="mt-4 text-sm text-ink-soft leading-relaxed max-w-md">
              We operate by appointment and WhatsApp consultation. Whether you need a Vedic gemstone recommendation or a custom jewelry design, reach us directly and we'll guide you personally.
            </p>

            <ul className="mt-8 divide-y divide-border border-y border-border">
              {[
                { label: "WhatsApp", value: "+91 98765 43210", href: "https://wa.me/919876543210" },
                { label: "Email", value: "contact@radharani.in", href: "mailto:contact@radharani.in" },
                { label: "Consultation Hours", value: "Mon–Sat · 10am–7pm IST" },
                { label: "Location", value: "Mumbai, Maharashtra, India" },
              ].map((item) => (
                <li key={item.label} className="py-5 flex items-start gap-4">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-ink/40 mt-1 w-36 flex-shrink-0">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-sm text-ink hover:text-[#053624] transition underline underline-offset-2">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm text-ink">{item.value}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-3xl">Our Services</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {services.map((s) => (
                <li key={s.name} className="border border-border bg-cream-light p-6">
                  <p className="font-serif text-xl">{s.name}</p>
                  <p className="mt-2 text-sm text-ink-soft">{s.body}</p>
                  <p className="mt-4 eyebrow">{s.price}</p>
                </li>
              ))}
            </ul>

            <div className="mt-10 border border-border bg-ink p-8 text-cream">
              <h3 className="font-serif text-2xl">Book a Consultation</h3>
              <p className="mt-2 text-sm text-cream/80">
                Speak with our gemstone experts for personalized astrology guidance and custom jewelry creation.
              </p>
              <Link href="/custom" className="btn-outline mt-6 border-cream text-cream hover:bg-cream hover:text-ink">
                Request Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
