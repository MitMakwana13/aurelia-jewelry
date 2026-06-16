import Stripe from "stripe";

// Lazy singleton — only instantiated on first call so the build doesn't fail
// when STRIPE_SECRET_KEY is not set in the CI/build environment.
let _stripe: Stripe | null = null;

export function getStripeServer(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("Missing STRIPE_SECRET_KEY environment variable");
    _stripe = new Stripe(key, {
      apiVersion: "2026-04-22.dahlia",
      typescript: true,
    });
  }
  return _stripe;
}

// Named export for convenience — same lazy instance
export const stripe = {
  get paymentIntents() { return getStripeServer().paymentIntents; },
  get webhooks() { return getStripeServer().webhooks; },
};
