import { NextResponse } from 'next/server';

// Uses @fawazahmed0/currency-api — completely free, no key, CDN-backed, updated daily
// XAU = 1 troy oz of gold in target currency
// XAG = 1 troy oz of silver in target currency
// 1 Troy oz = 31.1035 grams

export const revalidate = 900; // Revalidate every 15 minutes

const TROY_OZ_GRAMS = 31.1035;

// Accurate June 2025 fallback values in INR per gram (Indian retail range)
const FALLBACK = {
  gold24k: 8950,  // ₹8,950/gram 24K
  gold22k: 8205,  // ₹8,205/gram 22K (24K × 22/24)
  silver: 96,     // ₹96/gram 999 silver
};

function fmt(n: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n);
}

export async function GET() {
  try {
    const [goldRes, silverRes] = await Promise.all([
      fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/xau.json', {
        next: { revalidate: 900 },
      }),
      fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/xag.json', {
        next: { revalidate: 900 },
      }),
    ]);

    if (!goldRes.ok || !silverRes.ok) throw new Error('Upstream API failed');

    const goldData = await goldRes.json();
    const silverData = await silverRes.json();

    // xau.inr = price of 1 troy oz of gold in INR
    const goldOzInr: number = goldData?.xau?.inr;
    const silverOzInr: number = silverData?.xag?.inr;

    if (!goldOzInr || !silverOzInr) throw new Error('Unexpected API shape');

    const gold24kPerGram = Math.round(goldOzInr / TROY_OZ_GRAMS);
    const gold22kPerGram = Math.round(gold24kPerGram * (22 / 24));
    const silverPerGram  = Math.round(silverOzInr / TROY_OZ_GRAMS);

    return NextResponse.json({
      gold24k:     `${fmt(gold24kPerGram)}/g`,
      gold22k:     `${fmt(gold22kPerGram)}/g`,
      silver:      `${fmt(silverPerGram)}/g`,
      goldPer10g:  `${fmt(gold24kPerGram * 10)} / 10g`,
      silverPerKg: `${fmt(silverPerGram * 1000)} / kg`,
      status: 'live',
      updatedAt: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Metal price error:', error);

    return NextResponse.json({
      gold24k:     `${fmt(FALLBACK.gold24k)}/g`,
      gold22k:     `${fmt(FALLBACK.gold22k)}/g`,
      silver:      `${fmt(FALLBACK.silver)}/g`,
      goldPer10g:  `${fmt(FALLBACK.gold24k * 10)} / 10g`,
      silverPerKg: `${fmt(FALLBACK.silver * 1000)} / kg`,
      status: 'fallback',
      updatedAt: new Date().toISOString(),
    });
  }
}
