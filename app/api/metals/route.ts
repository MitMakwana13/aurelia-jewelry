import { NextResponse } from 'next/server';

export const revalidate = 3600; // Cache for 1 hour to prevent API limit exhaustion

export async function GET() {
  const API_KEY = process.env.GOLD_API_KEY;

  // If no API key is provided, return a highly realistic fallback to ensure the UI remains perfect.
  if (!API_KEY) {
    return NextResponse.json({
      gold: "₹ 72,540 / 10g",
      silver: "₹ 91,200 / kg",
      status: "simulated_no_key"
    });
  }

  try {
    // Example using goldapi.io (You can sign up for a free tier)
    // Fetch Gold (XAU) in INR
    const goldRes = await fetch("https://www.goldapi.io/api/XAU/INR", {
      headers: { "x-access-token": API_KEY },
      next: { revalidate: 3600 }
    });
    
    // Fetch Silver (XAG) in INR
    const silverRes = await fetch("https://www.goldapi.io/api/XAG/INR", {
      headers: { "x-access-token": API_KEY },
      next: { revalidate: 3600 }
    });

    if (!goldRes.ok || !silverRes.ok) {
      throw new Error("Failed to fetch from metal API");
    }

    const goldData = await goldRes.json();
    const silverData = await silverRes.json();

    // goldData.price is usually per ounce. Convert to 10 grams.
    // 1 Troy Ounce = 31.1035 grams
    const goldPer10g = (goldData.price / 31.1035) * 10;
    
    // silverData.price is per ounce. Convert to 1 kg.
    const silverPerKg = (silverData.price / 31.1035) * 1000;

    return NextResponse.json({
      gold: `₹ ${Math.round(goldPer10g).toLocaleString("en-IN")} / 10g`,
      silver: `₹ ${Math.round(silverPerKg).toLocaleString("en-IN")} / kg`,
      status: "live"
    });

  } catch (error) {
    console.error("Metal API Error:", error);
    // Graceful fallback if the API is down
    return NextResponse.json({
      gold: "₹ 72,540 / 10g",
      silver: "₹ 91,200 / kg",
      status: "fallback_error"
    }, { status: 200 });
  }
}
