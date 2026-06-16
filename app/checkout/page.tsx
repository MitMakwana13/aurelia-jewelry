"use client";

import Link from "next/link";
import { InquiryModal } from "@/components/inquiry/InquiryModal";
import { useState } from "react";

// Checkout page is redirected to the inquiry flow.
// Direct ordering will be enabled once the business is ready to take online payments.
export default function CheckoutPage() {
  const [open, setOpen] = useState(true);

  return (
    <div className="container-x py-24 text-center">
      <p className="eyebrow">Radharani Gemstone</p>
      <h1 className="font-serif text-4xl mt-4 text-ink">Ready to Order?</h1>
      <p className="mt-6 max-w-md mx-auto text-ink/60 leading-relaxed">
        We process all orders through a personal inquiry process to ensure the perfect piece is crafted just for you.
        Submit an inquiry and our team will reach out within 24 hours.
      </p>
      <div className="mt-8 flex flex-wrap gap-4 justify-center">
        <button onClick={() => setOpen(true)} className="btn-primary">
          Send Inquiry →
        </button>
        <Link href="/shop/gemstones" className="btn-secondary">
          Continue Browsing
        </Link>
      </div>
      <p className="mt-6 text-xs text-ink/40">Prepaid only · 50% advance to confirm · No COD</p>

      <InquiryModal isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
}
