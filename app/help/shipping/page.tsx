export default function ShippingPage() {
  return (
    <div className="prose-aurelia">
      <h1 className="font-serif text-4xl md:text-5xl">Shipping</h1>

      <div className="mt-10 space-y-10">
        <section>
          <h2 className="font-serif text-2xl">Domestic (US & Canada)</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex justify-between border-b border-border pb-3">
              <span>Standard (5–7 business days)</span>
              <span className="text-ink-muted">$12 · Free over $150</span>
            </li>
            <li className="flex justify-between border-b border-border pb-3">
              <span>Express (2–3 business days)</span>
              <span className="text-ink-muted">$25</span>
            </li>
            <li className="flex justify-between border-b border-border pb-3">
              <span>Overnight</span>
              <span className="text-ink-muted">$45</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl">International</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex justify-between border-b border-border pb-3">
              <span>UK & Europe (5–10 business days)</span>
              <span className="text-ink-muted">$25 (duties included)</span>
            </li>
            <li className="flex justify-between border-b border-border pb-3">
              <span>Australia (7–12 business days)</span>
              <span className="text-ink-muted">$30 (duties included)</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl">Carbon Neutral</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            All shipments are carbon neutral. We offset 100% of shipping emissions
            through verified climate projects.
          </p>
        </section>
      </div>
    </div>
  );
}
