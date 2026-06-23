import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// In-memory cache — survives multiple requests within the same serverless instance
let cache: { data: MetalPrices | null; fetchedAt: number } = {
  data: null,
  fetchedAt: 0,
};

const CACHE_DURATION_MS = 15 * 60 * 1000; // 15 minutes

export interface MetalPrices {
  gold_22k_per_gram: number;
  gold_24k_per_gram: number;
  silver_per_gram: number;
  gold_change_percent: number;
  silver_change_percent: number;
  gold_high_today: number;
  gold_low_today: number;
  last_updated: string;
  source: string;
  stale?: boolean;
}

async function fetchFromGoldAPI(): Promise<MetalPrices> {
  const apiKey = process.env.GOLDAPI_KEY;
  if (!apiKey) throw new Error("GOLDAPI_KEY not configured");

  const headers = {
    "x-access-token": apiKey,
    "Content-Type": "application/json",
  };

  const [goldRes, silverRes] = await Promise.all([
    fetch("https://www.goldapi.io/api/XAU/INR", { headers, cache: "no-store" }),
    fetch("https://www.goldapi.io/api/XAG/INR", { headers, cache: "no-store" }),
  ]);

  if (!goldRes.ok) throw new Error(`GoldAPI gold failed: ${goldRes.status}`);
  if (!silverRes.ok) throw new Error(`GoldAPI silver failed: ${silverRes.status}`);

  const gold = await goldRes.json();
  const silver = await silverRes.json();

  return {
    gold_22k_per_gram: Math.round(gold.price_gram_22k),
    gold_24k_per_gram: Math.round(gold.price_gram_24k),
    // GoldAPI returns silver as troy oz price; price_gram_24k gives per-gram
    silver_per_gram: Math.round(silver.price_gram_24k ?? silver.price / 31.1035),
    gold_change_percent: parseFloat((gold.chp ?? 0).toFixed(2)),
    silver_change_percent: parseFloat((silver.chp ?? 0).toFixed(2)),
    gold_high_today: Math.round((gold.high_price ?? 0) / 31.1035),
    gold_low_today: Math.round((gold.low_price ?? 0) / 31.1035),
    last_updated: new Date().toISOString(),
    source: "goldapi.io",
  };
}

async function saveToDb(prices: MetalPrices) {
  try {
    // Use upsert-by-date logic: create a new row for today
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const existing = await prisma.goldRate.findFirst({
      where: { date: { gte: todayStart } },
    });

    if (existing) {
      await prisma.goldRate.update({
        where: { id: existing.id },
        data: {
          gold22kPerGramInr: prices.gold_22k_per_gram,
          gold24kPerGramInr: prices.gold_24k_per_gram,
          silverPerGramInr: prices.silver_per_gram,
          source: "goldapi.io-auto",
        },
      });
    } else {
      await prisma.goldRate.create({
        data: {
          gold22kPerGramInr: prices.gold_22k_per_gram,
          gold24kPerGramInr: prices.gold_24k_per_gram,
          silverPerGramInr: prices.silver_per_gram,
          source: "goldapi.io-auto",
        },
      });
    }
  } catch (err) {
    // Non-fatal
    console.error("Failed to save rates to DB:", err);
  }
}

async function getFromDb(): Promise<MetalPrices | null> {
  try {
    const row = await prisma.goldRate.findFirst({
      orderBy: { createdAt: "desc" },
    });
    if (!row) return null;
    return {
      gold_22k_per_gram: row.gold22kPerGramInr ?? 6850,
      gold_24k_per_gram: row.gold24kPerGramInr ?? 7470,
      silver_per_gram: row.silverPerGramInr ?? 94,
      gold_change_percent: 0,
      silver_change_percent: 0,
      gold_high_today: 0,
      gold_low_today: 0,
      last_updated: row.createdAt.toISOString(),
      source: "db-fallback",
    };
  } catch {
    return null;
  }
}

export async function GET() {
  const now = Date.now();

  // Return fresh cache
  if (cache.data && now - cache.fetchedAt < CACHE_DURATION_MS) {
    return NextResponse.json(cache.data, {
      headers: {
        "Cache-Control": "public, s-maxage=900, stale-while-revalidate=60",
        "X-Cache": "HIT",
        "X-Cache-Age": String(Math.floor((now - cache.fetchedAt) / 1000)),
      },
    });
  }

  // No API key — fall back to DB immediately
  if (!process.env.GOLDAPI_KEY) {
    const dbData = await getFromDb();
    if (dbData) return NextResponse.json({ ...dbData, source: "db-no-api-key" });
    return NextResponse.json(
      { error: "GOLDAPI_KEY not configured and no stored rates found." },
      { status: 503 }
    );
  }

  try {
    const prices = await fetchFromGoldAPI();
    cache = { data: prices, fetchedAt: now };
    // Save in background, non-blocking
    saveToDb(prices);

    return NextResponse.json(prices, {
      headers: {
        "Cache-Control": "public, s-maxage=900, stale-while-revalidate=60",
        "X-Cache": "MISS",
      },
    });
  } catch (error) {
    console.error("Metal prices fetch error:", error);

    // Return stale cache rather than failing
    if (cache.data) {
      return NextResponse.json(
        { ...cache.data, stale: true },
        { headers: { "X-Cache": "STALE" } }
      );
    }

    // Last resort: Prisma DB
    const dbData = await getFromDb();
    if (dbData) return NextResponse.json(dbData);

    return NextResponse.json({ error: "Unable to fetch metal prices" }, { status: 503 });
  }
}
