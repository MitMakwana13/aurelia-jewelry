import Link from "next/link";

export function SustainabilityBlock() {
  return (
    <section className="bg-cream-warm py-24">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow">Made Responsibly</p>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl leading-tight">
            Better materials,<br /> a smaller footprint.
          </h2>
        </div>
        <div className="lg:col-span-7">
          <p className="text-base leading-relaxed text-ink-soft">
            Every piece is crafted from recycled metals and ethically sourced stones,
            traceable from mine to making. We publish a public Impact Report every year —
            because transparency isn't a campaign, it's a standard.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3">
            {[
              { stat: "100%", label: "Recycled metals" },
              { stat: "78", label: "Verified suppliers" },
              { stat: "1.2M", label: "Lbs CO₂ offset" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-serif text-3xl">{s.stat}</p>
                <p className="mt-1 text-xs text-ink-muted uppercase tracking-[0.18em]">{s.label}</p>
              </div>
            ))}
          </div>
          <Link
            href="/sustainability"
            className="mt-8 inline-block text-xs uppercase tracking-[0.2em] link-underline"
          >
            Read the 2026 Impact Report →
          </Link>
        </div>
      </div>
    </section>
  );
}
