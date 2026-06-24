"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function RatesForm() {
  const router = useRouter();
  const [tab, setTab] = useState<"gold" | "exchange" | "markup">("gold");
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
        {(["gold", "exchange", "markup"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-6 py-3 text-[11px] uppercase tracking-[0.2em] transition border-b-2 ${
              tab === t
                ? "border-ink text-ink font-medium"
                : "border-transparent text-ink/40 hover:text-ink"
            }`}
          >
            {t === "gold" ? "Gold & Metal Rates" : t === "exchange" ? "Exchange Rates" : "Bulk Markup"}
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

      {tab === "markup" && (
        <BulkMarkupTab />
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

function BulkMarkupTab() {
  const [type, setType] = useState<"percentage" | "flat">("percentage");
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("all");
  const [direction, setDirection] = useState<"increase" | "decrease">("increase");
  const [adjusting, setAdjusting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const applyAdjustment = async () => {
    const numVal = parseFloat(value);
    if (isNaN(numVal) || numVal <= 0) {
      setMessage({ type: "error", text: "Please enter a valid positive number." });
      return;
    }

    setAdjusting(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/rates/markup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          value: numVal,
          category,
          direction,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to apply markup");

      setMessage({ type: "success", text: data.message || "Markup adjustment applied successfully." });
      setValue("");
    } catch (err: any) {
      console.error(err);
      setMessage({ type: "error", text: err.message || "Failed to adjust prices." });
    } finally {
      setAdjusting(false);
    }
  };

  return (
    <div className="max-w-xl space-y-6">
      <h2 className="font-serif text-xl text-ink">Bulk Markup Adjustment</h2>
      <p className="text-xs text-ink/50">
        Adjust prices across multiple products and variants instantly. This operation modifies database values permanently.
      </p>

      {message && (
        <div
          className={`p-4 text-xs font-semibold uppercase tracking-wider ${
            message.type === "success"
              ? "bg-[#053624]/10 text-[#053624] border border-[#053624]/20"
              : "bg-red-50 text-red-700 border border-[#053624]/20"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="bg-white border border-ink/8 p-6 rounded-sm space-y-5">
        <div className="grid grid-cols-2 gap-4">
          {/* Direction */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-wider text-ink/50">Direction</label>
            <select
              value={direction}
              onChange={(e) => setDirection(e.target.value as any)}
              className="w-full border border-ink/20 px-3 py-2 text-xs bg-white outline-none focus:border-ink"
            >
              <option value="increase">Markup (Increase)</option>
              <option value="decrease">Discount (Decrease)</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-wider text-ink/50">Category Filter</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-ink/20 px-3 py-2 text-xs bg-white outline-none focus:border-ink"
            >
              <option value="all">All Products</option>
              <option value="jewelry">Jewelry</option>
              <option value="gemstones">Gemstones</option>
              <option value="diamonds">Diamonds</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Adjustment Type */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-wider text-ink/50">Adjustment Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="w-full border border-ink/20 px-3 py-2 text-xs bg-white outline-none focus:border-ink"
            >
              <option value="percentage">Percentage (%)</option>
              <option value="flat">Flat Amount (INR)</option>
            </select>
          </div>

          {/* Value */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-wider text-ink/50">
              Value {type === "percentage" ? "(%)" : "(₹)"}
            </label>
            <input
              type="number"
              placeholder={type === "percentage" ? "e.g. 5 for +5%" : "e.g. 1000 for +₹1000"}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full border border-ink/20 px-3 py-2 text-xs outline-none focus:border-ink"
            />
          </div>
        </div>

        <button
          onClick={applyAdjustment}
          disabled={adjusting || !value}
          className="w-full bg-[#053624] text-cream py-3.5 text-[11px] uppercase tracking-wider hover:bg-ink transition font-semibold disabled:opacity-55"
        >
          {adjusting ? "Applying..." : "Apply Price Adjustment"}
        </button>
      </div>
    </div>
  );
}

