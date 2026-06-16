"use client";

import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";

type Props = {
  returnUrl: string;
  onBack: () => void;
};

export function StripePaymentStep({ returnUrl, onBack }: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    // This will either redirect (3DS / wallets) or stay on page for immediate cards
    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: returnUrl,
      },
    });

    // Only reach here if confirmPayment didn't redirect (unexpected error)
    if (stripeError) {
      setError(stripeError.message ?? "Payment failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border border-border bg-cream-light p-5">
        <PaymentElement
          options={{
            layout: "tabs",
            wallets: { applePay: "auto", googlePay: "auto" },
          }}
        />
      </div>

      {error && (
        <div className="border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <p className="text-xs text-ink-muted flex items-center gap-2">
        <LockIcon />
        Payments are encrypted and processed securely by Stripe. Your card details are never stored on our servers.
      </p>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-xs uppercase tracking-[0.18em] underline underline-offset-4"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={!stripe || !elements || loading}
          className="btn-primary min-w-40"
        >
          {loading ? "Processing…" : "Place Order"}
        </button>
      </div>
    </form>
  );
}

function LockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
