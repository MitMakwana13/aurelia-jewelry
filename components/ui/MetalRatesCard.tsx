"use client";

import { useEffect, useState } from "react";
import type { MetalPrices } from "@/app/api/metal-prices/route";

function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);
}

function arrow(p: number) {
  if (p > 0) return "▲";
  if (p < 0) return "▼";
  return "—";
}

function arrowColor(p: number) {
  if (p > 0) return "#4CAF50";
  if (p < 0) return "#f44336";
  return "#666";
}

export function MetalRatesCard() {
  const [prices, setPrices] = useState<MetalPrices | null>(null);
  const [loading, setLoading] = useState(true);

  const load = () =>
    fetch("/api/metal-prices")
      .then((r) => r.json())
      .then((d) => { if (!d.error) setPrices(d); })
      .catch(() => {})
      .finally(() => setLoading(false));

  useEffect(() => {
    load();
    const iv = setInterval(load, 15 * 60 * 1000);
    return () => clearInterval(iv);
  }, []);

  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  if (loading) {
    return (
      <div
        style={{
          background: "#111",
          borderRadius: 12,
          padding: 24,
          border: "1px solid #222",
          color: "#555",
          textAlign: "center",
          fontSize: 13,
        }}
      >
        Loading today&apos;s rates...
      </div>
    );
  }

  if (!prices) return null;

  const metals = [
    {
      label: "22K Gold",
      value: `₹${formatINR(prices.gold_22k_per_gram)}`,
      change: prices.gold_change_percent,
      color: "#C9A84C",
    },
    {
      label: "24K Gold",
      value: `₹${formatINR(prices.gold_24k_per_gram)}`,
      change: prices.gold_change_percent,
      color: "#D4AF37",
    },
    {
      label: "Silver",
      value: `₹${formatINR(prices.silver_per_gram)}`,
      change: prices.silver_change_percent,
      color: "#B0BEC5",
    },
  ];

  return (
    <div
      style={{
        background: "#0F0F0F",
        border: "1px solid #222",
        borderRadius: 12,
        padding: 24,
        fontFamily: "inherit",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 20,
        }}
      >
        <div>
          <p
            style={{
              color: "#888",
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            Today&apos;s Rates
          </p>
          <p
            style={{
              color: "#C9A84C",
              fontSize: 13,
              margin: "4px 0 0",
              fontFamily: "serif",
            }}
          >
            {today}
          </p>
        </div>
        <span
          style={{
            background: "#0A2A0A",
            color: "#4CAF50",
            fontSize: 10,
            fontWeight: 600,
            padding: "4px 10px",
            borderRadius: 99,
            letterSpacing: "0.1em",
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "#4CAF50",
              display: "inline-block",
            }}
          />
          LIVE
        </span>
      </div>

      {/* Rate Grid */}
      <div
        style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}
      >
        {metals.map((m) => (
          <div
            key={m.label}
            style={{
              background: "#1A1A1A",
              borderRadius: 8,
              padding: "16px 10px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                color: "#666",
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                margin: "0 0 8px",
              }}
            >
              {m.label}
            </p>
            <p
              style={{
                color: m.color,
                fontSize: 16,
                fontWeight: 500,
                margin: "0 0 2px",
                fontFamily: "serif",
              }}
            >
              {m.value}
            </p>
            <p style={{ color: "#555", fontSize: 10, margin: "0 0 8px" }}>per gram</p>
            <span style={{ color: arrowColor(m.change), fontSize: 11, fontWeight: 500 }}>
              {arrow(m.change)}{" "}
              {m.change !== 0 ? `${Math.abs(m.change).toFixed(2)}%` : ""}
            </span>
          </div>
        ))}
      </div>

      <p
        style={{
          color: "#444",
          fontSize: 10,
          margin: "16px 0 0",
          textAlign: "center",
          lineHeight: 1.6,
        }}
      >
        International spot price · Actual retail prices include making charges &amp; taxes ·{" "}
        <span style={{ color: "#C9A84C" }}>Contact us for an exact quote</span>
      </p>
    </div>
  );
}
