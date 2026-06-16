import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/server";
import { createShippoLabel } from "@/lib/shippo";

// Stripe requires the RAW body for webhook signature verification.
// Next.js App Router gives us a Web Request, so we read as text() first.
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return NextResponse.json(
      { error: "Webhook signature or secret missing" },
      { status: 400 }
    );
  }

  let event: ReturnType<typeof stripe.webhooks.constructEvent>;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Webhook verification failed";
    console.error("[stripe/webhook] Signature verification failed:", msg);
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  // ── Handle events ────────────────────────────────────────────────────────────
  switch (event.type) {
    case "payment_intent.succeeded": {
      const pi = event.data.object as {
        id: string;
        amount: number;
        receipt_email: string | null;
        shipping: {
          name: string;
          address: {
            line1: string;
            line2?: string | null;
            city: string;
            state: string;
            postal_code: string;
            country: string;
          };
        } | null;
        metadata: Record<string, string>;
      };

      console.log(`[stripe/webhook] PaymentIntent succeeded: ${pi.id} — $${(pi.amount / 100).toFixed(2)}`);

      // ── Create Shippo shipping label ─────────────────────────────────────────
      if (pi.shipping?.address) {
        try {
          const label = await createShippoLabel({
            toName: pi.shipping.name,
            toStreet1: pi.shipping.address.line1,
            toStreet2: pi.shipping.address.line2 ?? undefined,
            toCity: pi.shipping.address.city,
            toState: pi.shipping.address.state,
            toZip: pi.shipping.address.postal_code,
            toCountry: pi.shipping.address.country,
            toPhone: pi.metadata.phone ?? undefined,
            orderRef: pi.id,
          });

          console.log(`[stripe/webhook] Shippo label created:`, label.tracking_number);

          // TODO: Save label.tracking_number + label.label_url to your order
          //       database record keyed by pi.id so the customer gets a tracking email.
          //       Example (Prisma / Supabase / Firebase):
          //       await db.orders.update({ where: { stripePaymentId: pi.id }, data: { trackingNumber: label.tracking_number } })
        } catch (err) {
          console.error(`[stripe/webhook] Shippo label creation failed:`, err);
          // Don't reject the webhook — payment succeeded, handle label failure separately.
        }
      }

      break;
    }

    case "payment_intent.payment_failed": {
      const pi = event.data.object as { id: string; last_payment_error?: { message?: string } };
      console.warn(`[stripe/webhook] Payment failed: ${pi.id}`, pi.last_payment_error?.message);
      break;
    }

    default:
      // Ignore unhandled events
      break;
  }

  return NextResponse.json({ received: true });
}
