import { prisma } from "@/lib/prisma";
import { RatesForm } from "./RatesForm";

export default async function RatesPage() {
  const [latestGold, allGold, exchangeRates] = await Promise.all([
    prisma.goldRate.findFirst({ orderBy: { createdAt: "desc" } }),
    prisma.goldRate.findMany({ orderBy: { createdAt: "desc" }, take: 30 }),
    prisma.exchangeRate.findMany({ orderBy: { currencyCode: "asc" } }),
  ]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-ink">Rates & Pricing</h1>
        <p className="mt-1 text-sm text-ink/50">
          Manage live gold rates and currency exchange rates shown on the site.
        </p>
      </div>

      {/* Current Snapshot */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: "22K Gold / gram", value: latestGold?.gold22kPerGramInr, prefix: "₹" },
          { label: "24K Gold / gram", value: latestGold?.gold24kPerGramInr, prefix: "₹" },
          { label: "Silver / gram", value: latestGold?.silverPerGramInr, prefix: "₹" },
          { label: "Platinum / gram", value: latestGold?.platinumPerGramInr, prefix: "₹" },
        ].map((item) => (
          <div key={item.label} className="bg-white border border-ink/8 p-5 rounded-sm">
            <p className="text-[10px] uppercase tracking-wider text-ink/40 mb-2">{item.label}</p>
            <p className="text-2xl font-semibold text-ink">
              {item.value ? `${item.prefix}${item.value.toLocaleString("en-IN")}` : "—"}
            </p>
          </div>
        ))}
      </div>

      {/* Exchange Rates Current */}
      <div className="mb-10 bg-white border border-ink/8 p-6 rounded-sm">
        <h2 className="font-serif text-lg text-ink mb-4">Current Exchange Rates</h2>
        <div className="grid grid-cols-5 gap-4">
          {exchangeRates.map((r) => (
            <div key={r.currencyCode} className="text-center p-3 bg-cream-warm rounded-sm">
              <p className="text-[10px] uppercase tracking-wider text-ink/40">{r.currencyCode}</p>
              <p className="text-lg font-semibold text-ink mt-1">₹{r.rateToInr.toLocaleString("en-IN")}</p>
              <p className="text-[10px] text-ink/30 mt-0.5">
                {new Date(r.lastUpdated).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <RatesForm />

      {/* History Table */}
      {allGold.length > 0 && (
        <div className="mt-10 bg-white border border-ink/8 rounded-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-ink/8">
            <h2 className="font-serif text-lg text-ink">Gold Rate History (Last 30 Days)</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-ink/10 bg-ink/2">
                <tr>
                  {["Date", "22K Gold/g", "24K Gold/g", "Silver/g", "Platinum/g", "Source"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-ink/50 font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/5">
                {allGold.map((row) => (
                  <tr key={row.id} className="hover:bg-ink/2 transition-colors">
                    <td className="px-4 py-3 text-ink/60 text-xs">
                      {new Date(row.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-4 py-3 font-medium text-ink">₹{row.gold22kPerGramInr?.toLocaleString("en-IN") ?? "—"}</td>
                    <td className="px-4 py-3 font-medium text-ink">₹{row.gold24kPerGramInr?.toLocaleString("en-IN") ?? "—"}</td>
                    <td className="px-4 py-3 text-ink/70">₹{row.silverPerGramInr?.toLocaleString("en-IN") ?? "—"}</td>
                    <td className="px-4 py-3 text-ink/70">₹{row.platinumPerGramInr?.toLocaleString("en-IN") ?? "—"}</td>
                    <td className="px-4 py-3 text-[10px] text-ink/40 italic">{row.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
