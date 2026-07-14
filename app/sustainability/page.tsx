import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/plp/Breadcrumbs";

export const metadata: Metadata = {
  title: "Sustainability",
  description: "Our 2026 Impact Report: better materials, fewer emissions, traceable supply.",
};

const pillars = [
  {
    title: "Recycled Metals",
    body: "Every piece is cast in 100% recycled gold and silver with no new mining required.",
    stat: "100%",
  },
  {
    title: "Traceable Stones",
    body: "Every diamond and gemstone we set is fully traceable, ethically sourced, and conflict-free.",
    stat: "100%",
  },
  {
    title: "Carbon Neutral",
    body: "We offset all shipping and operations through verified climate projects.",
    stat: "1.2M lbs",
  },
  {
    title: "Verified Suppliers",
    body: "All 78 of our suppliers are independently audited annually for fair labor and environmental standards.",
    stat: "78",
  },
];

export default function SustainabilityPage() {
  return (
    <>
      <section className="bg-cream-warm py-24">
        <div className="container-x">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Sustainability" }]} />
          <p className="eyebrow mt-6">2026 Impact Report</p>
          <h1 className="mt-4 font-serif text-5xl md:text-7xl leading-[1.05] max-w-3xl">
            A smaller footprint,<br />a fairer supply.
          </h1>
          <p className="mt-6 max-w-xl text-base text-ink-soft">
            Transparency isn't a campaign. Every year we publish our progress and the gaps in full.
            Here's where we are in 2026.
          </p>
        </div>
      </section>

      <section className="container-x py-20">
        <div className="grid gap-8 md:grid-cols-2">
          {pillars.map((p) => (
            <div key={p.title} className="border-t border-border pt-8">
              <p className="font-serif text-6xl">{p.stat}</p>
              <h2 className="mt-4 font-serif text-2xl">{p.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ink py-24 text-cream">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-cream/70">Where we still have work to do</p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">Honest goals.</h2>
          </div>
          <div className="lg:col-span-7 space-y-5 text-cream/85 leading-relaxed">
            <p>
              We're proud of how far we've come and we're not finished. By 2028, we aim
              to make every piece of packaging compostable or reusable, eliminate single-use plastics
              from our entire supply chain, and reach a 50% reduction in operational emissions.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
