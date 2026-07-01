export default function ReturnsPage() {
  return (
    <div>
      <h1 className="font-serif text-4xl md:text-5xl">Returns & Exchanges</h1>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-ink-soft">
        <p>
          We want you to love every Radha Rani piece. If something isn't right, you have
          30 days from delivery to return or exchange it for free.
        </p>

        <section>
          <h2 className="font-serif text-2xl text-ink">How it works</h2>
          <ol className="mt-4 space-y-3 list-decimal pl-5">
            <li>Visit your account or use the link in your order confirmation email.</li>
            <li>Select the items you'd like to return or exchange.</li>
            <li>Print the prepaid return label and drop it off at any carrier location.</li>
            <li>Refunds are issued within 5–7 business days of receiving your return.</li>
          </ol>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink">Final Sale & Exclusions</h2>
          <ul className="mt-4 list-disc pl-5 space-y-2">
            <li>Engraved or personalized pieces</li>
            <li>Pierced-only items (per health regulations)</li>
            <li>Pieces clearly marked Final Sale at checkout</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-ink">Damaged or Defective</h2>
          <p className="mt-3">
            Every piece is covered by our lifetime warranty against manufacturing defects.
            If your piece arrives damaged or develops a defect, contact us and we'll repair
            or replace it.
          </p>
        </section>
      </div>
    </div>
  );
}
