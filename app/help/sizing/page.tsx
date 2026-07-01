export default function SizingPage() {
  return (
    <div>
      <h1 className="font-serif text-4xl md:text-5xl">Ring Sizing Guide</h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div className="space-y-6 text-sm leading-relaxed text-ink-soft">
          <section>
            <h2 className="font-serif text-2xl text-ink">Visit a Store</h2>
            <p className="mt-3">
              The most accurate way to find your size is in person. Walk into our
              store or contact us for a complimentary professional fitting.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink">Measure at Home</h2>
            <ol className="mt-3 list-decimal pl-5 space-y-2">
              <li>Wrap a strip of paper or string around the base of your finger.</li>
              <li>Mark where it meets and measure the length in millimeters.</li>
              <li>Match the millimeter measurement to the chart at right.</li>
              <li>If you're between sizes, size up as fingers swell slightly during the day.</li>
            </ol>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-ink">Free Resizing</h2>
            <p className="mt-3">
              Most rings can be resized once for free within 90 days of purchase. Eternity
              and pavé bands cannot be resized.
            </p>
          </section>
        </div>

        <div>
          <h3 className="font-serif text-xl">US Size Chart</h3>
          <div className="mt-4 border border-border">
            <table className="w-full text-sm">
              <thead className="bg-cream-warm">
                <tr>
                  <th className="px-4 py-3 text-left">US Size</th>
                  <th className="px-4 py-3 text-left">Diameter (mm)</th>
                  <th className="px-4 py-3 text-left">Circumference (mm)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ["4", "14.9", "46.8"],
                  ["5", "15.7", "49.3"],
                  ["6", "16.5", "51.9"],
                  ["7", "17.3", "54.4"],
                  ["8", "18.1", "57.0"],
                  ["9", "18.9", "59.5"],
                  ["10", "19.8", "62.1"],
                ].map((r) => (
                  <tr key={r[0]}>
                    <td className="px-4 py-3">{r[0]}</td>
                    <td className="px-4 py-3">{r[1]}</td>
                    <td className="px-4 py-3">{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
