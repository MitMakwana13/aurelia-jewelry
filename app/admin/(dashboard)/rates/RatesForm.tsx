"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function RatesForm() {
  const router = useRouter();
  const [tab, setTab] = useState<"gold" | "exchange">("gold");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [gold, setGold] = useState({
    gold22k: "",
    gold24k: "",
    silver: "",
    platinum: "",
  });

  const saveGold = async () => {
    setSaving(true);
    try {
      await fetch("/api/admin/rates/gold", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gold22kPerGramInr: gold.gold22k ? parseFloat(gold.gold22k) : null,
          gold24kPerGramInr: gold.gold24k ? parseFloat(gold.gold24k) : null,
          silverPerGramInr: gold.silver ? parseFloat(gold.silver) : null,
          platinumPerGramInr: gold.platinum ? parseFloat(gold.platinum) : null,
        }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
      setGold({ gold22k: "", gold24k: "", silver: "", platinum: "" });
      router.refresh();
    } finally {
      setSaving(false);
    }
  };

  const refreshLive = async () => {
    setRefreshing(true);
    try {
      const res = await fetch("/api/metal-prices", { cache: "no-store" });
      const data = await res.json();
      if (!data.error) {
        setGold({
          gold22k: data.gold_22k_per_gram?.toString() ?? "",
          gold24k: data.gold_24k_per_gram?.toString() ?? "",
          silver: data.silver_per_gram?.toString() ?? "",
          platinum: "",
        });
        setTab("gold");
      }
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <div>
      {/* Tabs */}
      <div className="flex border-b border-ink/10 mb-8">
        {(["gold", "exchange"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-6 py-3 text-[11px] uppercase tracking-[0.2em] transition border-b-2 ${
              tab === t
                ? "border-ink text-ink font-medium"
                : "border-transparent text-ink/40 hover:text-ink"
            }`}
          >
            {t === "gold" ? "Gold & Metal Rates" : "Exchange Rates"}
          </button>
        ))}
      </div>

      {tab === "gold" && (
        <div className="max-w-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-xl text-ink">Log Today&apos;s Rates</h2>
            <button
              onClick={refreshLive}
              disabled={refreshing}
              className="text-[11px] uppercase tracking-wider border border-emerald-300 text-emerald-600 px-4 py-2 hover:bg-emerald-50 transition disabled:opacity-60"
            >
              {refreshing ? "Fetching..." : "⟳ Pull Live Rates"}
            </button>
          </div>

          <div className="bg-white border border-ink/8 p-6 rounded-sm space-y-5">
            {[
              { key: "gold22k", label: "22K Gold per gram (₹)", placeholder: "e.g. 6850" },
              { key: "gold24k", label: "24K Gold per gram (₹)", placeholder: "e.g. 7470" },
              { key: "silver", label: "Silver per gram (₹)", placeholder: "e.g. 94" },
              { key: "platinum", label: "Platinum per gram (₹)", placeholder: "e.g. 3100" },
            ].map(({ key, label, placeholder }) => (
              <div key={key} className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-ink/50">{label}</label>
                <input
                  type="number"
                  value={gold[key as keyof typeof gold]}
                  onChange={(e) => setGold((prev) => ({ ...prev, [key]: e.target.value }))}
                  placeholder={placeholder}
                  className="w-full border border-ink/20 px-4 py-3 text-sm outline-none focus:border-ink"
                />
              </div>
            ))}

            <button
              onClick={saveGold}
              disabled={saving}
              className="w-full bg-ink text-white py-3.5 text-[11px] uppercase tracking-wider hover:bg-ink/80 transition disabled:opacity-60"
            >
              {saving ? "Saving..." : saved ? "Saved ✓" : "Save Rates"}
            </button>
          </div>
        </div>
      )}

      {tab === "exchange" && (
        <ExchangeRatesTab />
      )}
    </div>
  );
}

function ExchangeRatesTab() {
  const currencies = ["USD", "GBP", "AED", "SGD", "EUR"];
  const symbols: Record<string, string> = { USD: "$", GBP: "£", AED: "د.إ", SGD: "S$", EUR: "€" };
  const [rates, setRates] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<string | null>(null);

  const save = async (code: string) => {
    if (!rates[code]) return;
    setSaving(code);
    try {
      await fetch("/api/admin/rates/exchange", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currencyCode: code, rateToInr: parseFloat(rates[code]) }),
      });
    } finally {
      setSaving(null);
    }
  };

  return (
    <div className="max-w-md space-y-4">
      <h2 className="font-serif text-xl text-ink mb-6">Exchange Rates</h2>
      <p className="text-xs text-ink/50 mb-4">Rate = how many INR per 1 unit of currency</p>
      {currencies.map((code) => (
        <div key={code} className="bg-white border border-ink/8 p-4 rounded-sm flex items-center gap-4">
          <div className="w-16">
            <p className="text-sm font-semibold text-ink">{code}</p>
            <p className="text-[10px] text-ink/40">{symbols[code]}</p>
          </div>
          <input
            type="number"
            step="0.01"
            value={rates[code] ?? ""}
            onChange={(e) => setRates((prev) => ({ ...prev, [code]: e.target.value }))}
            placeholder="Enter rate to INR"
            className="flex-1 border border-ink/20 px-3 py-2 text-sm outline-none focus:border-ink"
          />
          <button
            onClick={() => save(code)}
            disabled={saving === code || !rates[code]}
            className="text-[10px] uppercase tracking-wider bg-ink text-white px-4 py-2 hover:bg-ink/80 transition disabled:opacity-40"
          >
            {saving === code ? "..." : "Save"}
          </button>
        </div>
      ))}
    </div>
  );
}
