"use client";

import Link from "next/link";
import { useCart, getCartTotals } from "@/lib/store/cart-store";
import { formatMoney } from "@/lib/utils/format";
import { PlusIcon, MinusIcon } from "@/components/ui/Icons";
import { Breadcrumbs } from "@/components/plp/Breadcrumbs";

export default function CartPage() {
  const { lineItems, removeItem, updateQuantity } = useCart();
  const { subtotal, itemCount } = getCartTotals(lineItems);
  const shippingMin = 150;
  const remaining = Math.max(0, shippingMin - subtotal.amount);

  if (itemCount === 0) {
    return (
      <div className="container-x py-24 text-center">
        <p className="font-serif text-4xl">Your cart is empty</p>
        <p className="mt-3 text-sm text-ink-muted">Begin with a piece you'll wear forever.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/shop" className="btn-primary">Shop All</Link>
          <Link href="/collections" className="btn-outline">Explore Collections</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-x py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cart" }]} />
      <h1 className="mt-6 font-serif text-4xl md:text-5xl">Your Cart</h1>
      <p className="mt-2 text-sm text-ink-muted">{itemCount} item{itemCount === 1 ? "" : "s"}</p>

      <div className="mt-12 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <ul className="divide-y divide-border border-y border-border">
            {lineItems.map((li) => (
              <li key={li.variantId} className="flex gap-6 py-6">
                <Link href={`/products/${li.productHandle}`} className="block">
                  <div className="h-32 w-28 overflow-hidden bg-cream-warm">
                    <img src={li.image.url} alt={li.image.alt} className="h-full w-full object-cover" />
                  </div>
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between gap-2">
                    <Link href={`/products/${li.productHandle}`} className="font-serif text-lg hover:underline">
                      {li.title}
                    </Link>
                    <span className="text-sm">{formatMoney({ amount: li.price.amount * li.quantity, currency: li.price.currency })}</span>
                  </div>
                  <p className="mt-1 text-xs text-ink-muted">{li.variantTitle}</p>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="inline-flex items-center border border-border">
                      <button
                        aria-label="Decrease"
                        onClick={() => updateQuantity(li.variantId, li.quantity - 1)}
                        className="p-2 hover:bg-cream-warm"
                      >
                        <MinusIcon width={14} height={14} />
                      </button>
                      <span className="w-10 text-center text-sm">{li.quantity}</span>
                      <button
                        aria-label="Increase"
                        onClick={() => updateQuantity(li.variantId, li.quantity + 1)}
                        className="p-2 hover:bg-cream-warm"
                      >
                        <PlusIcon width={14} height={14} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(li.variantId)}
                      className="text-xs text-ink-muted underline underline-offset-2 hover:text-ink"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <aside className="lg:col-span-4">
          <div className="border border-border bg-cream-light p-6 lg:sticky lg:top-24">
            <h2 className="font-serif text-2xl">Order Summary</h2>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd>{formatMoney(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Shipping</dt>
                <dd className="text-ink-muted">
                  {remaining > 0 ? `+${formatMoney({ amount: 12, currency: subtotal.currency })}` : "Free"}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt>Estimated tax</dt>
                <dd className="text-ink-muted">Calculated at checkout</dd>
              </div>
            </dl>
            <div className="mt-5 border-t border-border pt-5 flex justify-between text-base font-medium">
              <span>Total</span>
              <span>{formatMoney({ amount: subtotal.amount + (remaining > 0 ? 12 : 0), currency: subtotal.currency })}</span>
            </div>
            <Link href="/checkout" className="btn-primary mt-6 w-full">Checkout</Link>
            <Link href="/shop" className="block text-center mt-4 text-xs uppercase tracking-[0.18em] underline underline-offset-4">
              Continue Shopping
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
