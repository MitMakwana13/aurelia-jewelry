import { NextResponse } from 'next/server';

// Accurate gold/silver spot prices in USD per troy ounce (June 2025 market)
const GOLD_USD_OZ = 3320;   // ~$3,320/oz — Gold at all-time highs, Jun 2025
const SILVER_USD_OZ = 32.5; // ~$32.50/oz — Silver Jun 2025
const TROY_OZ_GRAMS = 31.1035;

export const revalidate = 1800;

export async function GET() {
  // Try to get live USD→INR exchange rate (free, no key required)
  let usdToInr = 84.5; // accurate fallback for Jun 2025
  try {
    const fxRes = await fetch('https://api.frankfurter.app/latest?from=USD&to=INR', {
      next: { revalidate: 1800 },
    });
    if (fxRes.ok) {
      const fxData = await fxRes.json();
      usdToInr = fxData?.rates?.INR ?? 84.5;
    }
  } catch {
    // Use fallback rate
  }

  // If goldapi.io key is provided, use live spot prices
  const API_KEY = process.env.GOLD_API_KEY;
  if (API_KEY) {
    try {
      const [gRes, sRes] = await Promise.all([
        fetch('https://www.goldapi.io/api/XAU/INR', {
          headers: { 'x-access-token': API_KEY },
          next: { revalidate: 1800 },
        }),
        fetch('https://www.goldapi.io/api/XAG/INR', {
          headers: { 'x-access-token': API_KEY },
          next: { revalidate: 1800 },
        }),
      ]);
      if (gRes.ok && sRes.ok) {
        const [g, s] = await Promise.all([gRes.json(), sRes.json()]);
        const gold10g = Math.round((g.price / TROY_OZ_GRAMS) * 10);
        const silverKg = Math.round((s.price / TROY_OZ_GRAMS) * 1000);
        return NextResponse.json({
          gold: `₹${gold10g.toLocaleString('en-IN')} / 10g`,
          silver: `₹${silverKg.toLocaleString('en-IN')} / kg`,
          status: 'live',
        });
      }
    } catch { /* fall through */ }
  }

  // Compute from known USD spot × live exchange rate
  const gold10g = Math.round((GOLD_USD_OZ / TROY_OZ_GRAMS) * 10 * usdToInr);
  const silverKg = Math.round((SILVER_USD_OZ / TROY_OZ_GRAMS) * 1000 * usdToInr);

  return NextResponse.json({
    gold: `₹${gold10g.toLocaleString('en-IN')} / 10g`,
    silver: `₹${silverKg.toLocaleString('en-IN')} / kg`,
    status: 'computed',
  });
}
