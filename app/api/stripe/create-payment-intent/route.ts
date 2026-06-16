import { NextResponse } from "next/server";
import { z } from "zod";
import { stripe } from "@/lib/stripe/server";

const schema = z.object({
  subtotalCents: z.number().int().positive(),
  shippingCents: z.number().int().min(0),
  taxCents: z.number().int().min(0),
  currency: z.string().length(3).default("usd"),
  email: z.string().email(),
  shippingAddress: z.object({
    name: z.string(),
    line1: z.string(),
    line2: z.string().optional(),
    city: z.string(),
    state: z.string(),
    postalCode: z.string(),
    country: z.string(),
  }),
  lineItems: z.array(
    z.object({ title: z.string(), quantity: z.number(), priceCents: z.number() })
  ),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const totalCents = data.subtotalCents + data.shippingCents + data.taxCents;

    const intent = await stripe.paymentIntents.create({
      amount: totalCents,
      currency: data.currency.toLowerCase(),
      receipt_email: data.email,
      metadata: {
        subtotal: data.subtotalCents,
        shipping: data.shippingCents,
        tax: data.taxCents,
        email: data.email,
        items: data.lineItems
          .map((li) => `${li.quantity}x ${li.title}`)
          .join(", ")
          .slice(0, 450), // Stripe metadata limit: 500 chars per value
      },
      shipping: {
        name: data.shippingAddress.name,
        address: {
          line1: data.shippingAddress.line1,
          line2: data.shippingAddress.line2 ?? undefined,
          city: data.shippingAddress.city,
          state: data.shippingAddress.state,
          postal_code: data.shippingAddress.postalCode,
          country: data.shippingAddress.country,
        },
      },
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({ clientSecret: intent.client_secret });
  } catch (err) {
    const msg = err instanceof z.ZodError
      ? err.issues[0].message
      : err instanceof Error
      ? err.message
      : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
