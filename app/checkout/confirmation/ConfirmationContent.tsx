"use client";

// Stripe has been removed. Order confirmation is now handled via inquiry flow.
export default function ConfirmationPage() {
  return (
    <div className="container-x py-24 text-center">
      <div className="text-4xl mb-6">✦</div>
      <h1 className="font-serif text-4xl text-ink">Thank You!</h1>
      <p className="mt-4 text-ink/60 max-w-md mx-auto">
        Your inquiry has been received. Our team will contact you within 24 hours.
      </p>
      <a href="/shop/gemstones" className="btn-primary mt-8 inline-block">
        Continue Browsing
      </a>
    </div>
  );
}
