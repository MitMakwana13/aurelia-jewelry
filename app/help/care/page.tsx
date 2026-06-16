export default function CarePage() {
  return (
    <div>
      <h1 className="font-serif text-4xl md:text-5xl">Care Guide</h1>
      <p className="mt-4 max-w-xl text-sm text-ink-soft">
        Fine jewelry is built to last — with the right care, it gets better with time.
      </p>

      <div className="mt-12 space-y-12">
        <section className="grid gap-8 lg:grid-cols-3">
          {[
            {
              title: "Daily Wear",
              body: "Solid gold and silver are durable, but contact with chlorine, perfume, and lotion can dull the finish over time. Put your jewelry on last — and take it off first.",
            },
            {
              title: "Cleaning",
              body: "Polish gently with a soft cloth. For a deeper clean, soak in warm water with a drop of unscented soap, then rinse and dry. Or stop by an Aurelia store for free professional cleaning.",
            },
            {
              title: "Storage",
              body: "Store each piece separately in a soft cloth pouch or lined box. This prevents tangling and protects against scratches.",
            },
          ].map((c) => (
            <div key={c.title} className="border-t border-border pt-6">
              <h2 className="font-serif text-2xl">{c.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{c.body}</p>
            </div>
          ))}
        </section>

        <section>
          <h2 className="font-serif text-2xl">By Material</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              { name: "Solid 14k Gold", note: "Will not tarnish. Polish occasionally with a soft cloth." },
              { name: "14k Gold Vermeil", note: "Avoid contact with water and chemicals to preserve the gold layer." },
              { name: "Sterling Silver", note: "May develop a natural patina. Polish regularly to maintain shine." },
              { name: "Diamonds & Gemstones", note: "Clean with warm water and mild soap. Avoid ultrasonic cleaners on softer stones." },
            ].map((m) => (
              <div key={m.name} className="border border-border bg-cream-light p-5">
                <p className="font-serif text-lg">{m.name}</p>
                <p className="mt-2 text-sm text-ink-soft">{m.note}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
