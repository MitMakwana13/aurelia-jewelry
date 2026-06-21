import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/plp/Breadcrumbs";

export const metadata: Metadata = {
  title: "Our Story",
  description: "The story behind Aurelia — fine jewelry, made differently.",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative aspect-[16/8] w-full bg-cream-warm">
        <img
          src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1800&q=85"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/30" />
        <div className="container-x relative flex h-full items-end pb-12 text-cream">
          <div className="max-w-2xl">
            <p className="eyebrow text-cream/80">Our Story</p>
            <h1 className="mt-2 font-serif text-5xl md:text-7xl leading-[1.05]">
              Fine jewelry,<br /> made differently.
            </h1>
          </div>
        </div>
      </section>

      <div className="container-x py-16">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Our Story" }]} />

        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">Founded 2015</p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl leading-tight">
              We believe fine jewelry should be worn — not saved for special occasions.
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-6 text-base leading-relaxed text-ink-soft">
            <p>
              Aurelia began with a simple frustration: traditional fine jewelry was too expensive,
              too occasional, and too often tied to outdated rituals. We set out to make pieces
              women buy for themselves — for everyday, for joy, for the way they want to live now.
            </p>
            <p>
              That meant rethinking the supply chain. We work directly with our makers, removing
              middlemen, and pricing pieces at a fair multiple over cost. It also meant rethinking
              materials: solid 14k gold, recycled silver, ethically sourced stones, and full
              traceability — published openly in our annual Impact Report.
            </p>
            <p>
              A decade in, Aurelia is worn by millions, available in 14 stores across North America
              and the UK, and still run by the same small team that started it.
            </p>
          </div>
        </div>

        <div className="mt-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { stat: "10", label: "Years of craft" },
            { stat: "14", label: "Stores worldwide" },
            { stat: "1.2M+", label: "Customers" },
            { stat: "100%", label: "Recycled metals" },
          ].map((s) => (
            <div key={s.label} className="border-t border-border pt-6">
              <p className="font-serif text-5xl">{s.stat}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-ink-muted">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-24 grid gap-8 lg:grid-cols-2">
          <Link href="/sustainability" className="group block">
            <div className="aspect-[4/3] overflow-hidden bg-cream-warm">
              <img
                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80"
                alt=""
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
            <h3 className="mt-5 font-serif text-2xl">Sustainability</h3>
            <p className="mt-2 text-sm text-ink-soft">Read the 2026 Impact Report.</p>
          </Link>
          <Link href="/stores" className="group block">
            <div className="aspect-[4/3] overflow-hidden bg-cream-warm">
              <img
                src="https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&w=1200&q=80"
                alt=""
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
            <h3 className="mt-5 font-serif text-2xl">Visit Us</h3>
            <p className="mt-2 text-sm text-ink-soft">Find an Aurelia store near you.</p>
          </Link>
        </div>
      </div>
    </>
  );
}
