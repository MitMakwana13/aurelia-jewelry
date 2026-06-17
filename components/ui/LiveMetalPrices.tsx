"use client";

import { useEffect, useState, useRef } from "react";

interface MetalPrices {
  gold: string;
  silver: string;
  status?: string;
}

export function LiveMetalPrices() {
  const [basePrices, setBasePrices] = useState<{ gold: number; silver: number } | null>(null);
  const [displayPrices, setDisplayPrices] = useState<{ gold: number; silver: number } | null>(null);

  useEffect(() => {
    async function fetchPrices() {
      try {
        const res = await fetch('/api/metals');
        const data = await res.json();
        
        // Extract the raw integers from "₹ 72,540 / 10g"
        const gStr = data.gold.split('/')[0].replace(/\D/g, '');
        const sStr = data.silver.split('/')[0].replace(/\D/g, '');
        
        const goldVal = parseInt(gStr, 10);
        const silverVal = parseInt(sStr, 10);
        
        if (!isNaN(goldVal) && !isNaN(silverVal)) {
          setBasePrices({ gold: goldVal, silver: silverVal });
          setDisplayPrices({ gold: goldVal, silver: silverVal });
        }
      } catch (err) {
        console.error("Failed to fetch metal prices:", err);
      }
    }

    fetchPrices();
    
    // Poll the backend every 5 minutes for true market shifts
    const backendInterval = setInterval(fetchPrices, 300000); 
    return () => clearInterval(backendInterval);
  }, []);

  // Simulate ultra-fast live market micro-volatility every second
  useEffect(() => {
    if (!basePrices) return;

    const tickInterval = setInterval(() => {
      setDisplayPrices(prev => {
        if (!prev) return prev;
        // Fluctuate gold by -₹5 to +₹5
        const goldShift = Math.floor(Math.random() * 11) - 5;
        // Fluctuate silver by -₹10 to +₹10
        const silverShift = Math.floor(Math.random() * 21) - 10;
        
        // Keep it anchored near the base price so it doesn't drift away
        return {
          gold: Math.abs(prev.gold - basePrices.gold) > 50 ? basePrices.gold : prev.gold + goldShift,
          silver: Math.abs(prev.silver - basePrices.silver) > 100 ? basePrices.silver : prev.silver + silverShift
        };
      });
    }, 1000);

    return () => clearInterval(tickInterval);
  }, [basePrices]);

  if (!displayPrices) return null;

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
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 md:gap-x-6 transition-all duration-300">
        <div className="flex gap-2">
          <span className="opacity-50">Gold 24K:</span>
          <span className="font-medium text-gold tabular-nums transition-colors duration-300">
            ₹ {displayPrices.gold.toLocaleString("en-IN")} / 10g
          </span>
        </div>
        <div className="flex gap-2">
          <span className="opacity-50">Silver:</span>
          <span className="font-medium text-gray-300 tabular-nums transition-colors duration-300">
            ₹ {displayPrices.silver.toLocaleString("en-IN")} / kg
          </span>
        </div>
      </div>
    </div>
  );
}
