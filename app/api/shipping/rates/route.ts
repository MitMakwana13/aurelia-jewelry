import { NextResponse } from "next/server";
import { z } from "zod";
import { getShippoRates } from "@/lib/shippo";

const schema = z.object({
  name: z.string().min(1),
  street1: z.string().min(1),
  street2: z.string().optional(),
  city: z.string().min(1),
  state: z.string().min(1),
  zip: z.string().min(2),
  country: z.string().min(2),
  phone: z.string().optional(),
  email: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const address = schema.parse(body);
    const rates = await getShippoRates(address);
    return NextResponse.json({ rates });
  } catch (err) {
    const msg = err instanceof z.ZodError
      ? err.issues[0].message
      : err instanceof Error
      ? err.message
      : "Failed to fetch shipping rates";
    console.error("[/api/shipping/rates]", msg);
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
