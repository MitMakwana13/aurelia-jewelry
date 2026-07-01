"use client";

import Link from "next/link";
import { useCart, getCartTotals } from "@/lib/store/cart-store";
import { useCurrency } from "@/context/CurrencyContext";

export default function CartPage() {
  const { lineItems, removeItem, updateQuantity } = useCart();
  const { formatPrice } = useCurrency();
  const { subtotal, itemCount } = getCartTotals(lineItems);

  return (
    <div className="min-h-screen bg-cream-light py-12 md:py-20">
      <div className="container-x">
        <h1 className="font-serif text-3xl md:text-5xl text-ink mb-10 tracking-tight">Shopping Bag</h1>

        {lineItems.length === 0 ? (
          <div className="bg-white border border-border p-10 md:p-16 text-center space-y-6 max-w-xl mx-auto rounded-sm">
            <p className="text-ink/60 text-sm leading-relaxed">
              Your shopping bag is currently empty. Settle on a keepsake that truly belongs to you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <Link
                href="/shop/gemstones"
                className="btn-primary px-8 py-3.5 text-center text-xs uppercase tracking-[0.2em]"
              >
                Explore Gemstones
              </Link>
              <Link
                href="/shop/jewelry"
                className="border border-ink text-ink hover:bg-ink hover:text-cream transition px-8 py-3.5 text-center text-xs uppercase tracking-[0.2em]"
              >
                Explore Jewelry
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            {/* Items List */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white border border-border rounded-sm overflow-hidden">
                <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-4 border-b border-border text-[10px] uppercase tracking-[0.2em] text-ink/40 font-medium">
                  <div className="col-span-6">Product Details</div>
                  <div className="col-span-3 text-center">Quantity</div>
                  <div className="col-span-3 text-right">Total Price</div>
                </div>

                <ul className="divide-y divide-border">
                  {lineItems.map((li) => (
                    <li key={li.variantId} className="p-6">
                      <div className="grid grid-cols-12 gap-4 sm:gap-6 items-center">
                        {/* Image and Info */}
                        <div className="col-span-12 sm:col-span-6 flex gap-4">
                          <div className="relative h-24 w-20 overflow-hidden bg-cream flex-shrink-0 border border-border">
                            <img
                              src={li.image.url}
                              alt={li.image.alt}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex flex-col justify-between py-1 min-w-0">
                            <div>
                              <Link
                                href={`/products/${li.productHandle}`}
                                className="text-sm font-medium text-ink hover:text-ink/70 transition leading-tight block truncate"
                              >
                                {li.title}
                              </Link>
                              <p className="text-xs text-ink/50 mt-1">{li.variantTitle}</p>
                            </div>
                            <button
                              onClick={() => removeItem(li.variantId)}
                              className="text-[10px] uppercase tracking-[0.16em] text-red-600 hover:text-red-700 transition self-start mt-2"
                            >
                              Remove
                            </button>
                          </div>
                        </div>

                        {/* Quantity controls */}
                        <div className="col-span-6 sm:col-span-3 flex justify-start sm:justify-center">
                          <div className="flex items-center border border-border bg-white rounded-sm">
                            <button
                              onClick={() => updateQuantity(li.variantId, li.quantity - 1)}
                              className="p-2.5 text-ink/60 hover:text-ink transition outline-none"
                              aria-label="Decrease quantity"
                            >
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                              </svg>
                            </button>
                            <span className="px-3 text-xs font-mono text-ink select-none">{li.quantity}</span>
                            <button
                              onClick={() => updateQuantity(li.variantId, li.quantity + 1)}
                              className="p-2.5 text-ink/60 hover:text-ink transition outline-none"
                              aria-label="Increase quantity"
                            >
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12M6 12h12" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="col-span-6 sm:col-span-3 text-right">
                          <p className="text-sm font-medium text-ink">
                            {formatPrice(li.price.amount * li.quantity)}
                          </p>
                          {li.quantity > 1 && (
                            <p className="text-[10px] text-ink-muted mt-0.5">
                              ({formatPrice(li.price.amount)} each)
                            </p>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-between items-center pt-2">
                <Link
                  href="/shop"
                  className="text-xs uppercase tracking-[0.2em] text-ink/60 hover:text-ink transition"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>

            {/* Checkout Card */}
            <div className="lg:col-span-4 bg-white border border-border p-6 rounded-sm space-y-6">
              <h2 className="font-serif text-xl text-ink">Selection Summary</h2>
              
              <div className="space-y-3 divide-y divide-border text-sm">
                <div className="flex justify-between pb-3 text-ink/60">
                  <span>Subtotal ({itemCount} item{itemCount !== 1 ? "s" : ""})</span>
                  <span className="font-medium text-ink">{formatPrice(subtotal.amount)}</span>
                </div>
                
                <div className="flex justify-between pt-3 pb-3 text-ink/60">
                  <span>Shipping & Valuation</span>
                  <span className="text-[#053624] font-medium">To be confirmed</span>
                </div>

                <div className="flex justify-between pt-4 font-medium text-ink">
                  <span>Estimated Total</span>
                  <span className="font-serif text-lg">{formatPrice(subtotal.amount)}</span>
                </div>
              </div>

              {/* Notice */}
              <div className="bg-[#053624]/5 border border-[#053624]/20 p-4 text-xs text-[#053624] space-y-1 rounded-sm leading-relaxed">
                <p className="font-semibold">📋 Inquiry-Based Order</p>
                <p>Payment and custom metal configuration will be discussed directly with our consultants via WhatsApp after your inquiry is submitted.</p>
              </div>

              <Link
                href="/checkout"
                className="block w-full bg-[#053624] text-cream py-4 text-center text-[11px] uppercase tracking-[0.25em] hover:bg-[#053624]/90 transition"
              >
                Proceed to Checkout →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
