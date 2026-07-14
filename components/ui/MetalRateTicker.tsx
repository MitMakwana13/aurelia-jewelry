"use client";

import { useEffect, useState } from "react";
import type { MetalPrices } from "@/app/api/metal-prices/route";

const REFRESH_INTERVAL = 15 * 60 * 1000;

function formatINR(n: number): string {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);
}

function ChangeIndicator({ percent }: { percent: number }) {
  if (!percent || percent === 0) return <span className="text-ink/30">-</span>;
  const up = percent > 0;
  return (
    <span className={up ? "text-emerald-400" : "text-red-400"} style={{ fontSize: 11 }}>
      {up ? "▲" : "▼"} {Math.abs(percent).toFixed(2)}%
    </span>
  );
}

export function MetalRateTicker() {
  const [prices, setPrices] = useState<MetalPrices | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshedAt, setRefreshedAt] = useState<Date | null>(null);

  const fetchPrices = async () => {
    try {
      const res = await fetch("/api/metal-prices");
      if (res.ok) {
        const data = await res.json();
        if (!data.error) {
          setPrices(data);
          setRefreshedAt(new Date());
        }
      }
    } catch {
      // silent - stale data remains visible
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
    const iv = setInterval(fetchPrices, REFRESH_INTERVAL);
    return () => clearInterval(iv);
  }, []);

  if (loading) {
    return (
      <div className="bg-[#0A0A0A] border-b border-[#1A1A1A] py-2 text-center text-[11px] text-[#444] tracking-wider">
        Loading live rates...
      </div>
    );
  }

  if (!prices) return null;

  return (
    <div className="bg-[#0A0A0A] border-b border-[#1A1A1A] py-2 overflow-hidden">
      <div className="flex items-center justify-center gap-6 md:gap-10 flex-wrap px-4">
        {/* Live pill */}
        <span className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium tracking-widest">
          <span
            className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"
            style={{ animation: "pulse 2s infinite" }}
          />
          LIVE
        </span>

        {/* 22K Gold */}
        <span className="flex items-center gap-2 text-[12px]">
          <span className="text-[#666]">22K Gold</span>
          <span className="text-[#C9A84C] font-medium">₹{formatINR(prices.gold_22k_per_gram)}/g</span>
          <ChangeIndicator percent={prices.gold_change_percent} />
        </span>

        {/* 24K Gold */}
        <span className="flex items-center gap-2 text-[12px]">
          <span className="text-[#666]">24K Gold</span>
          <span className="text-[#C9A84C] font-medium">₹{formatINR(prices.gold_24k_per_gram)}/g</span>
          <ChangeIndicator percent={prices.gold_change_percent} />
        </span>

        {/* Silver */}
        <span className="flex items-center gap-2 text-[12px]">
          <span className="text-[#666]">Silver</span>
          <span className="text-[#B0BEC5] font-medium">₹{formatINR(prices.silver_per_gram)}/g</span>
          <ChangeIndicator percent={prices.silver_change_percent} />
        </span>

        {/* Timestamp */}
        {refreshedAt && (
          <span className="text-[11px] text-[#444] hidden md:block">
            Updated {refreshedAt.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
          </span>
        )}

        {prices.stale && (
          <span className="text-[10px] text-[#666] italic">cached</span>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.25; }
        }
      `}</style>
    </div>
  );
}
