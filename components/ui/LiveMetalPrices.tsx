"use client";

import { useEffect, useState } from "react";

interface MetalPrices {
  gold: string;
  silver: string;
  status?: string;
}

export function LiveMetalPrices() {
  const [prices, setPrices] = useState<MetalPrices | null>(null);

  useEffect(() => {
    async function fetchPrices() {
      try {
        const res = await fetch('/api/metals');
        const data = await res.json();
        setPrices(data);
      } catch (err) {
        console.error("Failed to fetch metal prices:", err);
      }
    }

    fetchPrices();
    
    // Poll the internal API every 5 minutes so it stays live without needing a page refresh
    const interval = setInterval(fetchPrices, 300000); 

    return () => clearInterval(interval);
  }, []);

  if (!prices) return null;

  return (
    <div className="bg-ink text-cream w-full py-1.5 px-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 md:gap-x-12 text-[9px] uppercase tracking-[0.2em] relative z-[60]">
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cream opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cream"></span>
        </span>
        <span className="opacity-60 hidden sm:inline-block">Live Market</span>
        <span className="opacity-60 sm:hidden">Live</span>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 md:gap-x-6">
        <div className="flex gap-2">
          <span className="opacity-50">Gold 24K:</span>
          <span className="font-medium text-gold">{prices.gold}</span>
        </div>
        <div className="flex gap-2">
          <span className="opacity-50">Silver:</span>
          <span className="font-medium text-gray-300">{prices.silver}</span>
        </div>
      </div>
    </div>
  );
}
