import { NextResponse } from 'next/server';

export const revalidate = 3600; // Re-fetch at most once per hour

// ── Helpers ──────────────────────────────────────────────────────────────────

// Exchange rate: 1 USD → INR (approximate, updated periodically)
// We fetch this live from open.er-api.com (free, no key)
async function getUSDToINR(): Promise<number> {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD', {
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    return data?.rates?.INR ?? 83.5;
  } catch {
    return 83.5;
  }
}

// ── Route Handler ─────────────────────────────────────────────────────────────
export async function GET() {
  try {
    // Step 1: Get USD→INR exchange rate
    const usdToInr = await getUSDToINR();

    // Step 2: Fetch Gold & Silver spot prices in USD from metals.live (no key required)
    const metalsRes = await fetch('https://metals.live/api/spot', {
      next: { revalidate: 3600 },
    });

    if (!metalsRes.ok) throw new Error('metals.live unavailable');

    const metalsData = await metalsRes.json();

    // metals.live returns: [{ metal: "gold", price: 2341.50 }, ...]
    const goldUSD = metalsData.find((m: { metal: string }) => m.metal === 'gold')?.price;
    const silverUSD = metalsData.find((m: { metal: string }) => m.metal === 'silver')?.price;

    if (!goldUSD || !silverUSD) throw new Error('Metal data missing');

    // Convert: Gold per troy oz → per 10g (1 troy oz = 31.1035g)
    const goldPer10gINR = (goldUSD / 31.1035) * 10 * usdToInr;
    // Silver per troy oz → per kg
    const silverPerKgINR = (silverUSD / 31.1035) * 1000 * usdToInr;

    return NextResponse.json({
      gold: `₹ ${Math.round(goldPer10gINR).toLocaleString('en-IN')} / 10g`,
      silver: `₹ ${Math.round(silverPerKgINR).toLocaleString('en-IN')} / kg`,
      goldRaw: Math.round(goldPer10gINR),
      silverRaw: Math.round(silverPerKgINR),
      status: 'live',
      updatedAt: new Date().toISOString(),
    });

  } catch (primaryError) {
    // ── Fallback: try metalpriceapi.com free tier ──────────────────────────
    try {
      const API_KEY = process.env.GOLD_API_KEY; // optional, still works without
      const goldRes = await fetch(
        `https://api.metalpriceapi.com/v1/latest?api_key=${API_KEY ?? 'demo'}&base=XAU&currencies=INR`,
        { next: { revalidate: 3600 } }
      );
      if (!goldRes.ok) throw new Error('fallback API failed');
      const goldData = await goldRes.json();

      const goldPricePerOzINR = goldData?.rates?.INR;
      if (!goldPricePerOzINR) throw new Error('No INR rate');

      const goldPer10g = (goldPricePerOzINR / 31.1035) * 10;

      // Approximate silver: gold/silver ratio ~90
      const silverPerKg = (goldPricePerOzINR / 90 / 31.1035) * 1000;

      return NextResponse.json({
        gold: `₹ ${Math.round(goldPer10g).toLocaleString('en-IN')} / 10g`,
        silver: `₹ ${Math.round(silverPerKg).toLocaleString('en-IN')} / kg`,
        status: 'live_fallback',
        updatedAt: new Date().toISOString(),
      });

    } catch {
      // ── Last resort: use realistic static values that match current market ──
      const usdToInr = await getUSDToINR();
      // Gold ~$3320/oz as of June 2026 → ~₹7,500/g → ~₹75,000/10g
      const goldPer10g = Math.round((3320 / 31.1035) * 10 * usdToInr);
      // Silver ~$33/oz → ~₹88,000/kg
      const silverPerKg = Math.round((33 / 31.1035) * 1000 * usdToInr);

      return NextResponse.json({
        gold: `₹ ${goldPer10g.toLocaleString('en-IN')} / 10g`,
        silver: `₹ ${silverPerKg.toLocaleString('en-IN')} / kg`,
        status: 'estimated',
        updatedAt: new Date().toISOString(),
      });
    }
  }
}
