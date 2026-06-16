import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/plp/Breadcrumbs";

export const metadata: Metadata = {
  title: "Stores & Services",
  description: "Find an Aurelia store, book an appointment, or schedule a piercing.",
};

const stores = [
  { city: "New York", address: "84 Spring Street, SoHo", hours: "Mon–Sat 11am–7pm · Sun 12pm–6pm" },
  { city: "Los Angeles", address: "8120 Melrose Avenue", hours: "Mon–Sat 11am–7pm · Sun 12pm–6pm" },
  { city: "Toronto", address: "166 Cumberland Street", hours: "Mon–Sat 11am–7pm · Sun 12pm–6pm" },
  { city: "London", address: "12 Marylebone High Street", hours: "Mon–Sat 10am–7pm · Sun closed" },
  { city: "Chicago", address: "925 West Armitage Avenue", hours: "Mon–Sat 11am–7pm · Sun 12pm–5pm" },
  { city: "Boston", address: "165 Newbury Street", hours: "Mon–Sat 11am–7pm · Sun 12pm–6pm" },
  { city: "San Francisco", address: "2127 Fillmore Street", hours: "Mon–Sat 11am–7pm · Sun 12pm–6pm" },
  { city: "Vancouver", address: "1100 Robson Street", hours: "Mon–Sat 11am–7pm · Sun 12pm–6pm" },
];

const services = [
  { name: "Free Cleaning", body: "Walk in any time during open hours.", price: "Complimentary" },
  { name: "Professional Piercing", body: "By appointment with our certified piercers.", price: "From $35" },
  { name: "Engraving", body: "Custom hand-engraved messages on signets and bands.", price: "From $40" },
  { name: "Repairs & Resizing", body: "Lifetime care on every piece.", price: "Quoted in store" },
];

export default function StoresPage() {
  return (
    <>
      <section className="relative aspect-[16/7] w-full bg-cream-warm">
        <img
          src="https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&w=1800&q=85"
          alt="Inside an Aurelia retail store"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
        <div className="container-x relative flex h-full items-end pb-12">
          <div className="text-cream max-w-xl">
            <p className="eyebrow text-cream/80">Visit Us</p>
            <h1 className="mt-2 font-serif text-5xl md:text-6xl">Stores & Services</h1>
          </div>
        </div>
      </section>

      <div className="container-x py-12">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Stores & Services" }]} />

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-3xl">Find a Store</h2>
            <ul className="mt-8 divide-y divide-border border-y border-border">
              {stores.map((s) => (
                <li key={s.city} className="py-5">
                  <p className="font-serif text-2xl">{s.city}</p>
                  <p className="mt-1 text-sm">{s.address}</p>
                  <p className="text-xs text-ink-muted">{s.hours}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-3xl">Services</h2>
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
              <h3 className="font-serif text-2xl">Book an Appointment</h3>
              <p className="mt-2 text-sm text-cream/80">
                Reserve one-on-one styling, piercing, or engraving at any Aurelia location.
              </p>
              <Link href="#" className="btn-outline mt-6 border-cream text-cream hover:bg-cream hover:text-ink">
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
