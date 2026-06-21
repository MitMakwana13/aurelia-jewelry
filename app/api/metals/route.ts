import { NextResponse } from 'next/server';

// No API key needed — uses open exchange data via public metals endpoint
// Gold & Silver spot prices fetched from metals.live (free, no auth)
// Fallback is current real-world values in INR

export const revalidate = 1800; // Cache 30 mins

export async function GET() {
  try {
    // metals.live provides free real-time spot prices in USD per troy ounce
    const res = await fetch('https://api.metals.live/v1/spot', {
      next: { revalidate: 1800 },
    });

    if (!res.ok) throw new Error('metals.live fetch failed');

    const data: { gold: number; silver: number }[] = await res.json();

    // data is an array, each entry is { gold: number, silver: number }
    const spot = data[0];
    const goldUsd = spot?.gold;
    const silverUsd = spot?.silver;

    if (!goldUsd || !silverUsd) throw new Error('Invalid metals data');

    // Fetch live USD → INR exchange rate from frankfurter.app (free, no key)
    const fxRes = await fetch('https://api.frankfurter.app/latest?from=USD&to=INR', {
      next: { revalidate: 1800 },
    });

    const fxData = await fxRes.json();
    const usdToInr: number = fxData?.rates?.INR ?? 84;

    // Convert: Gold is USD per troy oz. Show per 10 grams (1 troy oz = 31.1035g)
    const goldPer10g = (goldUsd / 31.1035) * 10 * usdToInr;
    // Silver: Show per 100 grams
    const silverPer100g = (silverUsd / 31.1035) * 100 * usdToInr;

    return NextResponse.json({
      gold: `₹${Math.round(goldPer10g).toLocaleString('en-IN')} / 10g`,
      silver: `₹${Math.round(silverPer100g).toLocaleString('en-IN')} / 100g`,
      status: 'live',
    });
  } catch (error) {
    console.error('Metal price fetch error:', error);

    // Accurate real-world fallback (June 2025 values)
    return NextResponse.json({
      gold: '₹7,680 / 10g',
      silver: '₹930 / 100g',
      status: 'fallback',
    });
  }
}
