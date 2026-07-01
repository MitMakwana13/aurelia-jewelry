"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart, getCartTotals } from "@/lib/store/cart-store";
import { useCurrency } from "@/context/CurrencyContext";

// ─── Step Types ────────────────────────────────────────────────────────────────
type Step = 1 | 2 | 3;

type ContactForm = { firstName: string; lastName: string; email: string; phone: string };
type AddressForm = {
  line1: string; line2: string; city: string;
  state: string; pincode: string; country: string;
};

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana",
  "Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur",
  "Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana",
  "Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Delhi","Jammu & Kashmir","Ladakh",
];

// ─── Component ─────────────────────────────────────────────────────────────────
export default function CheckoutPage() {
  const router = useRouter();
  const { lineItems, clear } = useCart();
  const { formatPrice } = useCurrency();
  const { subtotal, itemCount } = getCartTotals(lineItems);

  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notes, setNotes] = useState("");

  const [contact, setContact] = useState<ContactForm>({
    firstName: "", lastName: "", email: "", phone: "",
  });
  const [address, setAddress] = useState<AddressForm>({
    line1: "", line2: "", city: "", state: "Maharashtra", pincode: "", country: "India",
  });

  // Redirect if cart empty
  useEffect(() => {
    if (lineItems.length === 0) router.replace("/shop");
  }, [lineItems, router]);

  if (lineItems.length === 0) return null;

  const totalAmount = subtotal.amount;

  // ─── Inquiry Submission Handler ───────────────────────────────────────────────
  const handleSubmitInquiry = async () => {
    setLoading(true);
    setError("");

    try {
      const itemsSummary = lineItems
        .map((li) => `${li.title} (${li.variantTitle}) x${li.quantity} — ${formatPrice(li.price.amount * li.quantity)}`)
        .join("\n");

      const shippingAddress = [address.line1, address.line2, address.city, address.state, address.pincode, address.country]
        .filter(Boolean)
        .join(", ");

      const message = [
        `Cart Items:\n${itemsSummary}`,
        `\nEstimated Total: ${formatPrice(totalAmount)}`,
        shippingAddress ? `\nShipping Address: ${shippingAddress}` : "",
        notes ? `\nNotes: ${notes}` : "",
      ].filter(Boolean).join("\n");

      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${contact.firstName} ${contact.lastName}`.trim(),
          email: contact.email,
          phone: contact.phone,
          type: "PRODUCT",
          message,
          source: "checkout",
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Failed to submit inquiry. Please try again.");
      }

      const { id: inquiryId } = await res.json();
      clear(); // Clear cart
      router.push(`/checkout/success?orderId=${inquiryId}&email=${encodeURIComponent(contact.email)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ─── Step Progress ──────────────────────────────────────────────────────────
  const STEPS = ["Contact", "Address", "Confirm"];

  return (
    <div className="min-h-screen bg-cream-light">
      {/* Header */}
      <header className="border-b border-border bg-cream">
        <div className="container-x flex items-center justify-between py-5">
          <Link href="/" className="font-serif text-xl text-ink">Radha Rani</Link>
          <div className="flex items-center gap-2">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <button
                  onClick={() => i + 1 < step && setStep((i + 1) as Step)}
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium transition ${
                    step === i + 1
                      ? "bg-ink text-cream"
                      : i + 1 < step
                      ? "bg-[#053624] text-cream cursor-pointer"
                      : "border border-border text-ink-muted"
                  }`}
                >
                  {i + 1 < step ? "✓" : i + 1}
                </button>
                <span className={`hidden sm:block text-xs ${step === i + 1 ? "text-ink font-medium" : "text-ink-muted"}`}>
                  {s}
                </span>
                {i < STEPS.length - 1 && <div className="mx-2 h-px w-8 bg-border" />}
              </div>
            ))}
          </div>
          <Link href="/cart" className="text-xs text-ink-muted hover:text-ink">← Back to cart</Link>
        </div>
      </header>

      <div className="container-x py-10">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Form Area */}
          <div className="lg:col-span-7">

            {/* STEP 1 — Contact */}
            {step === 1 && (
              <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-6">
                <h1 className="font-serif text-3xl text-ink">Contact Information</h1>
                <p className="text-sm text-ink/60">We'll use this to send your order inquiry details and follow-up updates.</p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.18em] text-ink/50 mb-2">First Name *</label>
                    <input
                      required value={contact.firstName}
                      onChange={(e) => setContact((p) => ({ ...p, firstName: e.target.value }))}
                      placeholder="Priya"
                      className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-ink bg-white transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.18em] text-ink/50 mb-2">Last Name *</label>
                    <input
                      required value={contact.lastName}
                      onChange={(e) => setContact((p) => ({ ...p, lastName: e.target.value }))}
                      placeholder="Sharma"
                      className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-ink bg-white transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.18em] text-ink/50 mb-2">Email Address *</label>
                  <input
                    required type="email" value={contact.email}
                    onChange={(e) => setContact((p) => ({ ...p, email: e.target.value }))}
                    placeholder="priya@example.com"
                    className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-ink bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.18em] text-ink/50 mb-2">WhatsApp / Phone *</label>
                  <input
                    required type="tel" value={contact.phone}
                    onChange={(e) => setContact((p) => ({ ...p, phone: e.target.value }))}
                    placeholder="+91 98765 43210"
                    className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-ink bg-white transition"
                  />
                  <p className="mt-1 text-[10px] text-ink/40">We'll reach out on WhatsApp to confirm your order and pricing.</p>
                </div>

                <button type="submit" className="w-full bg-ink text-cream py-4 text-[11px] uppercase tracking-[0.25em] hover:bg-ink/90 transition">
                  Continue →
                </button>
              </form>
            )}

            {/* STEP 2 — Delivery Address */}
            {step === 2 && (
              <form onSubmit={(e) => { e.preventDefault(); setStep(3); }} className="space-y-6">
                <h2 className="font-serif text-3xl text-ink">Delivery Address</h2>
                <p className="text-sm text-ink/60">Your address helps us provide an accurate shipping quote when we follow up.</p>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.18em] text-ink/50 mb-2">Address Line 1 *</label>
                  <input
                    required value={address.line1}
                    onChange={(e) => setAddress((p) => ({ ...p, line1: e.target.value }))}
                    placeholder="Flat 4B, Sunrise Apartments"
                    className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-ink bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.18em] text-ink/50 mb-2">Address Line 2</label>
                  <input
                    value={address.line2}
                    onChange={(e) => setAddress((p) => ({ ...p, line2: e.target.value }))}
                    placeholder="Near City Mall, Bandra West (optional)"
                    className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-ink bg-white transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.18em] text-ink/50 mb-2">City *</label>
                    <input
                      required value={address.city}
                      onChange={(e) => setAddress((p) => ({ ...p, city: e.target.value }))}
                      placeholder="Mumbai"
                      className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-ink bg-white transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.18em] text-ink/50 mb-2">PIN Code *</label>
                    <input
                      required value={address.pincode}
                      onChange={(e) => setAddress((p) => ({ ...p, pincode: e.target.value }))}
                      placeholder="400050"
                      pattern="[0-9]{6}"
                      className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-ink bg-white transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.18em] text-ink/50 mb-2">State *</label>
                    <select
                      required value={address.state}
                      onChange={(e) => setAddress((p) => ({ ...p, state: e.target.value }))}
                      className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-ink bg-white transition"
                    >
                      {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.18em] text-ink/50 mb-2">Country</label>
                    <input
                      value="India" disabled
                      className="w-full border border-border px-4 py-3 text-sm bg-cream text-ink/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.18em] text-ink/50 mb-2">Special Notes / Requirements</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    placeholder="e.g. Vedic consultation required, specific ratti weight, ring size, auspicious date for delivery..."
                    className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-ink bg-white transition resize-none"
                  />
                </div>

                <div className="flex gap-4">
                  <button type="button" onClick={() => setStep(1)} className="flex-1 border border-border py-4 text-[11px] uppercase tracking-[0.2em] hover:border-ink transition">
                    ← Back
                  </button>
                  <button type="submit" className="flex-[2] bg-ink text-cream py-4 text-[11px] uppercase tracking-[0.25em] hover:bg-ink/90 transition">
                    Review Inquiry →
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3 — Review & Confirm */}
            {step === 3 && (
              <div className="space-y-8">
                <h2 className="font-serif text-3xl text-ink">Review & Confirm</h2>

                {/* Summary blocks */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="border border-border p-5">
                    <div className="flex justify-between mb-3">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-ink/40">Contact</p>
                      <button onClick={() => setStep(1)} className="text-[10px] underline text-ink/40 hover:text-ink">Edit</button>
                    </div>
                    <p className="text-sm text-ink">{contact.firstName} {contact.lastName}</p>
                    <p className="text-sm text-ink/60">{contact.email}</p>
                    <p className="text-sm text-ink/60">{contact.phone}</p>
                  </div>
                  <div className="border border-border p-5">
                    <div className="flex justify-between mb-3">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-ink/40">Deliver To</p>
                      <button onClick={() => setStep(2)} className="text-[10px] underline text-ink/40 hover:text-ink">Edit</button>
                    </div>
                    <p className="text-sm text-ink">{address.line1}</p>
                    {address.line2 && <p className="text-sm text-ink/60">{address.line2}</p>}
                    <p className="text-sm text-ink/60">{address.city}, {address.state} {address.pincode}</p>
                    <p className="text-sm text-ink/60">{address.country}</p>
                  </div>
                </div>

                {notes && (
                  <div className="border border-border p-5">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-ink/40 mb-2">Your Notes</p>
                    <p className="text-sm text-ink/70 leading-relaxed">{notes}</p>
                  </div>
                )}

                {/* Info notice */}
                <div className="bg-[#053624]/5 border border-[#053624]/20 p-4 text-xs text-[#053624] space-y-1 rounded-sm">
                  <p className="font-semibold">📋 Inquiry-Based Order</p>
                  <p>Our team will review your selection, confirm availability, and reach out on WhatsApp within 24 hours with final pricing and payment details.</p>
                </div>

                {error && <p className="text-red-600 text-sm border border-red-200 bg-red-50 p-4">{error}</p>}

                <div className="flex gap-4">
                  <button onClick={() => setStep(2)} className="flex-1 border border-border py-4 text-[11px] uppercase tracking-[0.2em] hover:border-ink transition">
                    ← Back
                  </button>
                  <button
                    onClick={handleSubmitInquiry}
                    disabled={loading}
                    className="flex-[2] bg-[#053624] text-cream py-4 text-[11px] uppercase tracking-[0.25em] hover:bg-[#053624]/90 transition disabled:opacity-60"
                  >
                    {loading ? "Submitting..." : "Submit Order Inquiry →"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-border p-6 lg:sticky lg:top-8">
              <h2 className="font-serif text-xl text-ink mb-6">Your Selection</h2>
              <ul className="space-y-4 divide-y divide-border">
                {lineItems.map((li) => (
                  <li key={li.variantId} className="flex gap-4 pt-4 first:pt-0">
                    <div className="relative h-20 w-16 overflow-hidden bg-cream flex-shrink-0">
                      <img src={li.image.url} alt={li.image.alt} className="h-full w-full object-cover" />
                      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-cream text-[10px]">
                        {li.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-ink leading-tight">{li.title}</p>
                      <p className="text-xs text-ink/50 mt-1">{li.variantTitle}</p>
                      <p className="text-sm text-ink mt-auto">{formatPrice(li.price.amount * li.quantity)}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 space-y-3 border-t border-border pt-6">
                <div className="flex justify-between text-sm">
                  <span className="text-ink/60">Subtotal ({itemCount} item{itemCount !== 1 ? "s" : ""})</span>
                  <span>{formatPrice(subtotal.amount)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-ink/60">Shipping</span>
                  <span className="text-[#053624]">To be confirmed</span>
                </div>
                <div className="flex justify-between font-medium border-t border-border pt-3">
                  <span>Indicative Total</span>
                  <span className="font-serif text-lg">{formatPrice(totalAmount)}</span>
                </div>
                <p className="text-[10px] text-ink/40 leading-relaxed">
                  Final price including shipping will be confirmed by our team via WhatsApp before payment.
                </p>
              </div>

              {/* Trust signals */}
              <div className="mt-6 space-y-3 border-t border-border pt-6">
                {[
                  { icon: "📜", text: "Certificate of Authenticity included" },
                  { icon: "💎", text: "IGI / GIA certified natural gemstones" },
                  { icon: "🔐", text: "Secure WhatsApp-confirmed payment" },
                  { icon: "↩️", text: "7-day return policy" },
                ].map((t) => (
                  <p key={t.text} className="text-[11px] text-ink/50 flex items-center gap-2">
                    <span>{t.icon}</span> {t.text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
