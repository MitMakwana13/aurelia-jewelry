import { NextResponse } from "next/server";
import { trackShipment } from "@/lib/shippo";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const carrier = searchParams.get("carrier");
  const tracking = searchParams.get("tracking");

  if (!carrier || !tracking) {
    return NextResponse.json(
      { error: "carrier and tracking query params are required" },
      { status: 400 }
    );
  }

  try {
    const data = await trackShipment(carrier, tracking);
    return NextResponse.json(data);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Tracking lookup failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
