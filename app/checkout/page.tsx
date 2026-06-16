"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { z } from "zod";
import { Elements } from "@stripe/react-stripe-js";
import { getStripe } from "@/lib/stripe/client";
import { useCart, getCartTotals } from "@/lib/store/cart-store";
import { formatMoney } from "@/lib/utils/format";
import { ShippingRateSelector } from "@/components/checkout/ShippingRateSelector";
import { StripePaymentStep } from "@/components/checkout/StripePaymentStep";
import type { ShippoRate } from "@/lib/shippo";

// ── Validation ────────────────────────────────────────────────────────────────
const contactSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

const shippingSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  line1: z.string().min(1, "Required"),
  line2: z.string().optional(),
  city: z.string().min(1, "Required"),
  region: z.string().min(1, "Required"),
  postalCode: z.string().min(2, "Required"),
  country: z.string().min(2, "Required"),
  phone: z.string().optional(),
});

const STEPS = ["Contact", "Shipping", "Delivery", "Payment"] as const;

// ── Main page ─────────────────────────────────────────────────────────────────
export default function CheckoutPage() {
  const { lineItems, clear } = useCart();
  const { subtotal, itemCount } = getCartTotals(lineItems);
  const [step, setStep] = useState(0);

  // Contact
  const [contact, setContact] = useState({ email: "" });

  // Shipping address
  const [shipping, setShipping] = useState({
    firstName: "", lastName: "", line1: "", line2: "",
    city: "", region: "", postalCode: "", country: "US", phone: "",
  });

  // Delivery
  const [rates, setRates] = useState<ShippoRate[]>([]);
  const [ratesLoading, setRatesLoading] = useState(false);
  const [ratesError, setRatesError] = useState<string | null>(null);
  const [selectedRateId, setSelectedRateId] = useState<string | null>(null);
  const [shippingCents, setShippingCents] = useState(0);

  // Payment
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Tax estimate (8%)
  const taxCents = Math.round(subtotal.amount * 100 * 0.08);
  const subtotalCents = Math.round(subtotal.amount * 100);
  const totalCents = subtotalCents + shippingCents + taxCents;

  // Redirect if cart is empty
  if (itemCount === 0 && !clientSecret) {
    return (
      <div className="container-x py-24 text-center">
        <p className="font-serif text-3xl">Your cart is empty.</p>
        <Link href="/shop" className="btn-primary mt-6">Shop All</Link>
      </div>
    );
  }

  // ── Return URL for Stripe redirect after payment ──────────────────────────
  const returnUrl = typeof window !== "undefined"
    ? `${window.location.origin}/checkout/confirmation`
    : "/checkout/confirmation";

  // ── Step advance ──────────────────────────────────────────────────────────
  const advance = async () => {
    setErrors({});

    // Step 0 → 1: Validate contact
    if (step === 0) {
      const r = contactSchema.safeParse(contact);
      if (!r.success) {
        setErrors(Object.fromEntries(r.error.issues.map((i) => [i.path[0], i.message])));
        return;
      }
      setStep(1);
      return;
    }

    // Step 1 → 2: Validate shipping + fetch Shippo rates
    if (step === 1) {
      const r = shippingSchema.safeParse(shipping);
      if (!r.success) {
        setErrors(Object.fromEntries(r.error.issues.map((i) => [i.path[0], i.message])));
        return;
      }
      setStep(2);
      setRatesLoading(true);
      setRatesError(null);
      setRates([]);
      setSelectedRateId(null);
      try {
        const res = await fetch("/api/shipping/rates", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: `${shipping.firstName} ${shipping.lastName}`,
            street1: shipping.line1,
            street2: shipping.line2 || undefined,
            city: shipping.city,
            state: shipping.region,
            zip: shipping.postalCode,
            country: shipping.country,
            phone: shipping.phone || undefined,
            email: contact.email,
          }),
        });
        const data = await res.json();
        if (!res.ok || data.error) throw new Error(data.error ?? "Rates fetch failed");
        setRates(data.rates ?? []);
        // Auto-select cheapest rate
        if (data.rates?.length > 0) {
          setSelectedRateId(data.rates[0].object_id);
          setShippingCents(Math.round(parseFloat(data.rates[0].amount) * 100));
        }
      } catch (err) {
        setRatesError(err instanceof Error ? err.message : "Could not fetch rates");
      } finally {
        setRatesLoading(false);
      }
      return;
    }

    // Step 2 → 3: Validate a rate is selected, create Stripe PaymentIntent
    if (step === 2) {
      if (!selectedRateId) {
        setErrors({ rate: "Please select a delivery method" });
        return;
      }
      setPaymentLoading(true);
      setPaymentError(null);
      try {
        const res = await fetch("/api/stripe/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            subtotalCents,
            shippingCents,
            taxCents,
            currency: subtotal.currency.toLowerCase(),
            email: contact.email,
            shippingAddress: {
              name: `${shipping.firstName} ${shipping.lastName}`,
              line1: shipping.line1,
              line2: shipping.line2 || undefined,
              city: shipping.city,
              state: shipping.region,
              postalCode: shipping.postalCode,
              country: shipping.country,
            },
            lineItems: lineItems.map((li) => ({
              title: li.title,
              quantity: li.quantity,
              priceCents: Math.round(li.price.amount * 100),
            })),
          }),
        });
        const data = await res.json();
        if (!res.ok || data.error) throw new Error(data.error ?? "Could not initialize payment");
        setClientSecret(data.clientSecret);
        setStep(3);
      } catch (err) {
        setPaymentError(err instanceof Error ? err.message : "Payment setup failed");
      } finally {
        setPaymentLoading(false);
      }
      return;
    }
  };

  const back = () => setStep((s) => Math.max(0, s - 1));

  return (
    <div className="container-x py-10">
      {/* Header */}
      <Link href="/" className="font-serif text-2xl">Aurelia</Link>

      <div className="mt-10 grid gap-12 lg:grid-cols-12">
        {/* ── Left: Steps ───────────────────────────────────────────────────── */}
        <div className="lg:col-span-7">
          {/* Step indicator */}
          <ol className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs uppercase tracking-[0.18em]">
            {STEPS.map((label, i) => (
              <li key={label} className="flex items-center gap-3">
                <span className={`inline-flex h-6 w-6 items-center justify-center border text-xs ${
                  i < step ? "border-ink bg-ink text-cream" :
                  i === step ? "border-ink text-ink" :
                  "border-border text-ink-muted"
                }`}>
                  {i < step ? "✓" : i + 1}
                </span>
                <span className={i <= step ? "text-ink" : "text-ink-muted"}>{label}</span>
                {i < STEPS.length - 1 && <span className="opacity-30 hidden sm:inline">—</span>}
              </li>
            ))}
          </ol>

          <div className="mt-10">
            {/* Step 0: Contact */}
            {step === 0 && (
              <section>
                <h2 className="font-serif text-3xl">Contact</h2>
                <div className="mt-6">
                  <Field label="Email" value={contact.email} onChange={(v) => setContact({ email: v })} type="email" autoComplete="email" error={errors.email} />
                </div>
              </section>
            )}

            {/* Step 1: Shipping address */}
            {step === 1 && (
              <section>
                <h2 className="font-serif text-3xl">Shipping Address</h2>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <Field label="First name" value={shipping.firstName} onChange={(v) => setShipping({ ...shipping, firstName: v })} error={errors.firstName} />
                  <Field label="Last name" value={shipping.lastName} onChange={(v) => setShipping({ ...shipping, lastName: v })} error={errors.lastName} />
                  <div className="col-span-2">
                    <Field label="Address" value={shipping.line1} onChange={(v) => setShipping({ ...shipping, line1: v })} error={errors.line1} autoComplete="address-line1" />
                  </div>
                  <div className="col-span-2">
                    <Field label="Apt, suite, etc. (optional)" value={shipping.line2} onChange={(v) => setShipping({ ...shipping, line2: v })} autoComplete="address-line2" />
                  </div>
                  <Field label="City" value={shipping.city} onChange={(v) => setShipping({ ...shipping, city: v })} error={errors.city} />
                  <Field label="State / Region" value={shipping.region} onChange={(v) => setShipping({ ...shipping, region: v })} error={errors.region} />
                  <Field label="Postal code" value={shipping.postalCode} onChange={(v) => setShipping({ ...shipping, postalCode: v })} error={errors.postalCode} autoComplete="postal-code" />
                  <div>
                    <label className="block">
                      <span className="eyebrow">Country</span>
                      <select
                        value={shipping.country}
                        onChange={(e) => setShipping({ ...shipping, country: e.target.value })}
                        className="input-base"
                      >
                        {COUNTRIES.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
                      </select>
                    </label>
                    {errors.country && <p className="mt-1 text-xs text-red-700">{errors.country}</p>}
                  </div>
                  <div className="col-span-2">
                    <Field label="Phone (optional)" value={shipping.phone} onChange={(v) => setShipping({ ...shipping, phone: v })} type="tel" autoComplete="tel" />
                  </div>
                </div>
              </section>
            )}

            {/* Step 2: Delivery method (Shippo rates) */}
            {step === 2 && (
              <section>
                <h2 className="font-serif text-3xl">Delivery Method</h2>
                <p className="mt-2 text-sm text-ink-muted">
                  Live rates from USPS, UPS, FedEx, and DHL.
                </p>
                <div className="mt-6">
                  <ShippingRateSelector
                    rates={rates}
                    selected={selectedRateId}
                    onSelect={(id, cents) => {
                      setSelectedRateId(id);
                      setShippingCents(cents);
                    }}
                    loading={ratesLoading}
                    error={ratesError}
                  />
                  {errors.rate && <p className="mt-3 text-xs text-red-700">{errors.rate}</p>}
                </div>
              </section>
            )}

            {/* Step 3: Stripe Payment */}
            {step === 3 && clientSecret && (
              <section>
                <h2 className="font-serif text-3xl">Payment</h2>
                <div className="mt-6">
                  <Elements
                    stripe={getStripe()}
                    options={{
                      clientSecret,
                      appearance: {
                        theme: "flat",
                        variables: {
                          colorPrimary: "#1a1a1a",
                          colorBackground: "#faf8f4",
                          colorText: "#1a1a1a",
                          colorDanger: "#b91c1c",
                          fontFamily: '"Inter", system-ui, sans-serif',
                          borderRadius: "0",
                          fontSizeBase: "14px",
                          spacingUnit: "4px",
                        },
                        rules: {
                          ".Input": {
                            border: "none",
                            borderBottom: "1px solid #e5e0d8",
                            paddingBottom: "10px",
                            paddingLeft: "0",
                            background: "transparent",
                          },
                          ".Input:focus": {
                            borderBottomColor: "#1a1a1a",
                            boxShadow: "none",
                          },
                          ".Label": {
                            fontSize: "11px",
                            letterSpacing: "0.22em",
                            textTransform: "uppercase",
                            color: "#6b6b6b",
                          },
                          ".Tab": {
                            border: "1px solid #e5e0d8",
                            borderRadius: "0",
                          },
                          ".Tab--selected": {
                            borderColor: "#1a1a1a",
                          },
                        },
                      },
                    }}
                  >
                    <StripePaymentStep returnUrl={returnUrl} onBack={back} />
                  </Elements>
                </div>
              </section>
            )}

            {paymentError && (
              <div className="mt-6 border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {paymentError}
              </div>
            )}
          </div>

          {/* Nav buttons (shown on steps 0–2) */}
          {step < 3 && (
            <div className="mt-10 flex items-center justify-between">
              {step > 0 ? (
                <button onClick={back} className="text-xs uppercase tracking-[0.18em] underline underline-offset-4">
                  Back
                </button>
              ) : (
                <Link href="/cart" className="text-xs uppercase tracking-[0.18em] underline underline-offset-4">
                  Return to cart
                </Link>
              )}
              <button
                onClick={advance}
                disabled={paymentLoading || ratesLoading}
                className="btn-primary min-w-36"
              >
                {paymentLoading
                  ? "Setting up payment…"
                  : step === 2
                  ? "Continue to Payment"
                  : "Continue"}
              </button>
            </div>
          )}
        </div>

        {/* ── Right: Order summary ──────────────────────────────────────────── */}
        <aside className="lg:col-span-5">
          <div className="border border-border bg-cream-light p-6 lg:sticky lg:top-10">
            <h3 className="font-serif text-xl">Order Summary</h3>

            <ul className="mt-5 max-h-80 space-y-4 overflow-y-auto">
              {lineItems.map((li) => (
                <li key={li.variantId} className="flex gap-3">
                  <div className="relative h-16 w-14 overflow-hidden bg-cream-warm flex-shrink-0">
                    <img src={li.image.url} alt={li.image.alt} className="h-full w-full object-cover" />
                    <span className="absolute -right-1 -top-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[10px] text-cream">
                      {li.quantity}
                    </span>
                  </div>
                  <div className="flex flex-1 justify-between">
                    <div className="text-xs">
                      <p className="font-medium">{li.title}</p>
                      <p className="text-ink-muted">{li.variantTitle}</p>
                    </div>
                    <p className="text-xs text-right">{formatMoney({ amount: li.price.amount * li.quantity, currency: li.price.currency })}</p>
                  </div>
                </li>
              ))}
            </ul>

            <dl className="mt-6 space-y-2 border-t border-border pt-5 text-sm">
              <SummaryRow label="Subtotal" value={formatMoney(subtotal)} />
              <SummaryRow
                label="Shipping"
                value={
                  step < 2 ? "Calculated next step"
                  : shippingCents === 0 ? "Free"
                  : formatMoney({ amount: shippingCents / 100, currency: subtotal.currency })
                }
                muted={step < 2}
              />
              <SummaryRow
                label="Tax (est. 8%)"
                value={formatMoney({ amount: taxCents / 100, currency: subtotal.currency })}
              />
            </dl>

            <div className="mt-4 flex justify-between border-t border-border pt-4 text-base font-medium">
              <span>Total</span>
              <span>
                {step >= 2
                  ? formatMoney({ amount: totalCents / 100, currency: subtotal.currency })
                  : "—"}
              </span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

// ── Shared UI helpers ─────────────────────────────────────────────────────────
function Field({
  label, value, onChange, error, type = "text", autoComplete, placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void;
  error?: string; type?: string; autoComplete?: string; placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="eyebrow">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="input-base"
      />
      {error && <span className="mt-1 block text-xs text-red-700">{error}</span>}
    </label>
  );
}

function SummaryRow({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex justify-between">
      <dt>{label}</dt>
      <dd className={muted ? "text-ink-muted" : ""}>{value}</dd>
    </div>
  );
}

// Common countries list
const COUNTRIES = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "GB", name: "United Kingdom" },
  { code: "AU", name: "Australia" },
  { code: "AT", name: "Austria" },
  { code: "BE", name: "Belgium" },
  { code: "DK", name: "Denmark" },
  { code: "FI", name: "Finland" },
  { code: "FR", name: "France" },
  { code: "DE", name: "Germany" },
  { code: "HK", name: "Hong Kong" },
  { code: "IE", name: "Ireland" },
  { code: "IT", name: "Italy" },
  { code: "JP", name: "Japan" },
  { code: "MX", name: "Mexico" },
  { code: "NL", name: "Netherlands" },
  { code: "NZ", name: "New Zealand" },
  { code: "NO", name: "Norway" },
  { code: "PT", name: "Portugal" },
  { code: "SG", name: "Singapore" },
  { code: "ES", name: "Spain" },
  { code: "SE", name: "Sweden" },
  { code: "CH", name: "Switzerland" },
  { code: "AE", name: "UAE" },
];
