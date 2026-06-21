"use client";

import { useEffect, useState } from "react";

interface MetalPrices {
  gold24k: string;
  gold22k: string;
  silver: string;
  status?: string;
}

export function LiveMetalPrices() {
  const [prices, setPrices] = useState<MetalPrices | null>(null);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    async function fetchPrices() {
      try {
        const res = await fetch("/api/metals", { cache: "no-store" });
        const data = await res.json();
        setPrices(data);
        setIsLive(data.status === "live");
      } catch (err) {
        console.error("Failed to fetch metal prices:", err);
      }
    }

    fetchPrices();
    // Poll every 15 minutes — matches server revalidation window
    const interval = setInterval(fetchPrices, 900_000);
    return () => clearInterval(interval);
  }, []);

  if (!prices) return null;

  return (
    <div className="bg-ink text-cream w-full py-1.5 px-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 md:gap-x-10 text-[9px] uppercase tracking-[0.2em] relative z-[60]">

      {/* Live indicator */}
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isLive ? "bg-emerald-400" : "bg-cream"}`} />
          <span className={`relative inline-flex rounded-full h-2 w-2 ${isLive ? "bg-emerald-400" : "bg-cream"}`} />
        </span>
        <span className="opacity-60 hidden sm:inline-block">Today&apos;s Rate</span>
        <span className="opacity-60 sm:hidden">Rate</span>
      </div>

      {/* Prices */}
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 md:gap-x-8">
        <div className="flex items-center gap-2">
          <span className="opacity-50">Gold 24K</span>
          <span className="font-medium text-[#D4AF37]">{prices.gold24k}</span>
        </div>

        <div className="hidden sm:block w-px h-3 bg-cream/20" />

        <div className="flex items-center gap-2">
          <span className="opacity-50">Gold 22K</span>
          <span className="font-medium text-[#C9A94A]">{prices.gold22k}</span>
        </div>

        <div className="hidden sm:block w-px h-3 bg-cream/20" />

        <div className="flex items-center gap-2">
          <span className="opacity-50">Silver</span>
          <span className="font-medium text-gray-300">{prices.silver}</span>
        </div>
      </div>
    </div>
  );
}
