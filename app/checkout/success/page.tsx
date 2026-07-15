import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Inquiry Received | Radha Rani Gemstones",
  description: "Your order inquiry has been received. Our team will follow up on WhatsApp.",
};

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string; email?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const orderId = resolvedSearchParams.orderId ?? "";
  const email = resolvedSearchParams.email ?? "";
  const shortId = orderId ? orderId.slice(0, 8).toUpperCase() : "---";

  return (
    <div className="min-h-screen bg-cream-light flex items-center justify-center">
      <div className="w-full max-w-lg mx-auto px-6 py-16 text-center">
        {/* Success Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-[#053624] rounded-full mb-8">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <p className="eyebrow tracking-[0.3em] text-[#053624] mb-4">Inquiry Received</p>
        <h1 className="font-serif text-4xl md:text-5xl text-ink mb-4">
          Thank you for your interest
        </h1>
        <p className="text-ink/60 leading-relaxed mb-8 max-w-sm mx-auto">
          We have received your order inquiry and will personally reach out on WhatsApp within 24 hours to confirm details and pricing.
        </p>

        {/* Inquiry Details */}
        <div className="bg-white border border-border p-8 mb-8 text-left space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-ink/40 mb-1">Inquiry Reference</p>
              <p className="font-serif text-2xl text-ink">#{shortId}</p>
            </div>
            <span className="text-[10px] uppercase tracking-[0.15em] border border-[#053624]/30 text-[#053624] px-3 py-1.5">
              Received
            </span>
          </div>

          {email && (
            <div className="border-t border-border pt-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-ink/40 mb-1">Submitted by</p>
              <p className="text-sm text-ink">{email}</p>
            </div>
          )}
        </div>

        {/* What Happens Next */}
        <div className="text-left space-y-4 mb-10">
          <p className="text-[10px] uppercase tracking-[0.2em] text-ink/40">What happens next</p>
          {[
            { icon: "📲", title: "WhatsApp Follow-Up", body: "Our team will contact you within 24 hours to confirm gemstone availability and final pricing." },
            { icon: "💰", title: "Payment Confirmation", body: "We'll share secure payment options (UPI, bank transfer, or cash) after confirming your selection." },
            { icon: "💎", title: "Expert Verification", body: "Each stone is verified and re-certified before dispatch. Your certificate will accompany the parcel." },
            { icon: "📦", title: "Insured Dispatch", body: "Your order is carefully packaged and shipped with full insurance and tracking within 2–3 business days." },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-4 border-t border-border pt-4">
              <span className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</span>
              <div>
                <p className="font-medium text-ink text-sm">{item.title}</p>
                <p className="text-xs text-ink/50 leading-relaxed mt-0.5">{item.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link href="/shop/gemstones" className="block w-full bg-ink text-cream py-4 text-[11px] uppercase tracking-[0.25em] hover:bg-ink/90 transition">
            Explore More Gemstones
          </Link>
          <Link href="/contact" className="block w-full border border-border py-4 text-[11px] uppercase tracking-[0.2em] hover:border-ink transition">
            Contact Us
          </Link>
        </div>

        <p className="mt-8 text-[10px] text-ink/30 uppercase tracking-wider">
          Questions? WhatsApp us at +91 79840 62415
        </p>
      </div>
    </div>
  );
}
