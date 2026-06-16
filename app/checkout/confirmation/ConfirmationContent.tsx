"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getStripe } from "@/lib/stripe/client";
import { useCart } from "@/lib/store/cart-store";

type Status = "loading" | "success" | "processing" | "failed";

export function ConfirmationContent() {
  const searchParams = useSearchParams();
  const { clear } = useCart();
  const [status, setStatus] = useState<Status>("loading");
  const [orderId, setOrderId] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const clientSecret = searchParams.get("payment_intent_client_secret");

    // Direct visit or demo (no Stripe redirect)
    if (!clientSecret) {
      const fallback =
        searchParams.get("order") ??
        `AUR-${Math.floor(Math.random() * 900000 + 100000)}`;
      setOrderId(fallback);
      setStatus("success");
      clear();
      return;
    }

    // Stripe redirect back — verify the intent
    getStripe().then(async (stripe) => {
      if (!stripe) {
        setStatus("failed");
        setError("Stripe could not be loaded. Please contact support.");
        return;
      }

      const { paymentIntent, error: stripeError } =
        await stripe.retrievePaymentIntent(clientSecret);

      if (stripeError) {
        setStatus("failed");
        setError(stripeError.message ?? "Payment verification failed.");
        return;
      }

      switch (paymentIntent?.status) {
        case "succeeded":
          setOrderId(`AUR-${paymentIntent.id.slice(-8).toUpperCase()}`);
          setStatus("success");
          clear();
          break;
        case "processing":
          setOrderId(`AUR-${paymentIntent.id.slice(-8).toUpperCase()}`);
          setStatus("processing");
          clear();
          break;
        default:
          setStatus("failed");
          setError("Payment was not completed. No charge was made.");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === "loading") {
    return (
      <div className="container-x py-24 text-center">
        <p className="font-serif text-3xl animate-pulse">Verifying payment…</p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="container-x py-24 text-center">
        <p className="eyebrow text-red-600">Payment failed</p>
        <h1 className="mt-4 font-serif text-4xl">Something went wrong.</h1>
        <p className="mt-3 text-sm text-ink-muted max-w-sm mx-auto">
          {error ?? "Your payment could not be completed. You were not charged."}
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/checkout" className="btn-primary">Try Again</Link>
          <Link href="/help/faq" className="btn-outline">Contact Support</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-x py-24 text-center">
      <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center border-2 border-ink rounded-full">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <p className="eyebrow">
        {status === "processing" ? "Payment Processing" : "Order Confirmed"}
      </p>
      <h1 className="mt-4 font-serif text-4xl md:text-5xl">
        {status === "processing"
          ? "We're processing your payment."
          : "Thank you."}
      </h1>
      <p className="mt-4 max-w-lg mx-auto text-sm text-ink-soft">
        {status === "processing" ? (
          "Your payment is being processed. You'll receive an email confirmation once complete."
        ) : (
          <>
            Order <span className="font-medium">{orderId}</span> confirmed.
            A receipt and shipping notification will arrive at your email shortly.
          </>
        )}
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link href="/shop" className="btn-primary">Continue Shopping</Link>
        <Link href="/account/orders" className="btn-outline">View Orders</Link>
      </div>

      <div className="mt-20 mx-auto max-w-md border border-border bg-cream-light p-6 text-left">
        <p className="eyebrow">What happens next</p>
        <ol className="mt-4 space-y-3 text-sm text-ink-soft">
          <li>1. We carefully prepare and quality-check your piece.</li>
          <li>
            2. A Shippo shipping label is generated and a tracking link sent
            within 1–3 business days.
          </li>
          <li>3. Your order arrives in our signature recyclable box.</li>
        </ol>
      </div>
    </div>
  );
}
