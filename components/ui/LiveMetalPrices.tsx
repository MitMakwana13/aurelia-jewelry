"use client";

import { useEffect, useState } from "react";

interface MetalPrices {
  gold: string;
  silver: string;
  status?: string;
  updatedAt?: string;
}

export function LiveMetalPrices() {
  const [prices, setPrices] = useState<MetalPrices | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchPrices() {
    try {
      const res = await fetch('/api/metals');
      const data = await res.json();
      setPrices(data);
    } catch (err) {
      console.error("Failed to fetch metal prices:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPrices();
    // Refresh every 5 minutes
    const interval = setInterval(fetchPrices, 300_000);
    return () => clearInterval(interval);
  }, []);

  const isLive = prices?.status === 'live' || prices?.status === 'live_fallback';

  return (
    <div className="bg-ink text-cream w-full py-1.5 px-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 md:gap-x-12 text-[9px] uppercase tracking-[0.2em] relative z-[60]">
      {/* Live pulse indicator */}
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isLive ? 'bg-emerald-400' : 'bg-cream'}`} />
          <span className={`relative inline-flex rounded-full h-2 w-2 ${isLive ? 'bg-emerald-400' : 'bg-cream'}`} />
        </span>
        <span className="opacity-60 hidden sm:inline-block">
          {loading ? 'Fetching...' : isLive ? 'Live Market' : 'Market Est.'}
        </span>
        <span className="opacity-60 sm:hidden">Live</span>
      </div>

      {/* Prices */}
      {loading ? (
        <span className="opacity-40 animate-pulse">Loading prices...</span>
      ) : prices ? (
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 md:gap-x-6">
          <div className="flex gap-2">
            <span className="opacity-50">Gold 24K:</span>
            <span className="font-medium text-[#B8860B]">{prices.gold}</span>
          </div>
          <div className="flex gap-2">
            <span className="opacity-50">Silver:</span>
            <span className="font-medium text-gray-300">{prices.silver}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
