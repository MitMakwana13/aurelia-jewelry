"use client";

import { Dialog, DialogPanel, DialogBackdrop } from "@headlessui/react";
import Link from "next/link";
import { useCart, getCartTotals } from "@/lib/store/cart-store";
import { formatMoney } from "@/lib/utils/format";
import { CloseIcon, PlusIcon, MinusIcon, BagIcon } from "@/components/ui/Icons";

const FREE_SHIPPING_THRESHOLD = 150;

export function CartDrawer() {
  const { lineItems, isOpen, closeDrawer, removeItem, updateQuantity } = useCart();
  const { subtotal, itemCount } = getCartTotals(lineItems);
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal.amount);
  const progress = Math.min(100, (subtotal.amount / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <Dialog open={isOpen} onClose={closeDrawer} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-ink/40 transition-opacity" />
      <div className="fixed inset-0 flex justify-end">
        <DialogPanel className="flex w-full max-w-md flex-col bg-cream-light shadow-xl">
          <div className="flex items-center justify-between border-b border-border px-6 py-5">
            <p className="font-serif text-xl">
              Cart {itemCount > 0 && <span className="text-ink-muted text-base">({itemCount})</span>}
            </p>
            <button aria-label="Close cart" onClick={closeDrawer}>
              <CloseIcon />
            </button>
          </div>

          {itemCount > 0 && (
            <div className="border-b border-border px-6 py-4">
              <div className="flex justify-between text-xs">
                <span>{remaining > 0 ? "Add" : "Congrats!"}</span>
                <span className="text-ink-muted">
                  {remaining > 0
                    ? `${formatMoney({ amount: remaining, currency: subtotal.currency })} away from free shipping`
                    : "You unlocked free shipping"}
                </span>
              </div>
              <div className="mt-2 h-1 w-full bg-border">
                <div className="h-full bg-ink transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto">
            {lineItems.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                <BagIcon width={32} height={32} />
                <p className="mt-4 font-serif text-2xl">Your cart is empty</p>
                <p className="mt-2 text-sm text-ink-muted">Begin with a piece you'll wear forever.</p>
                <Link
                  href="/shop"
                  onClick={closeDrawer}
                  className="btn-primary mt-6"
                >
                  Shop All
                </Link>
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {lineItems.map((li) => (
                  <li key={li.variantId} className="flex gap-4 px-6 py-5">
                    <Link href={`/products/${li.productHandle}`} onClick={closeDrawer} className="block">
                      <div className="h-24 w-20 overflow-hidden bg-cream-warm">
                        <img src={li.image.url} alt={li.image.alt} className="h-full w-full object-cover" />
                      </div>
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between gap-2">
                        <Link
                          href={`/products/${li.productHandle}`}
                          onClick={closeDrawer}
                          className="text-sm font-medium hover:underline"
                        >
                          {li.title}
                        </Link>
                        <span className="text-sm">{formatMoney({ amount: li.price.amount * li.quantity, currency: li.price.currency })}</span>
                      </div>
                      <p className="text-xs text-ink-muted">{li.variantTitle}</p>
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <div className="inline-flex items-center border border-border">
                          <button
                            aria-label="Decrease quantity"
                            onClick={() => updateQuantity(li.variantId, li.quantity - 1)}
                            className="p-2 hover:bg-cream-warm"
                          >
                            <MinusIcon width={14} height={14} />
                          </button>
                          <span className="w-8 text-center text-xs">{li.quantity}</span>
                          <button
                            aria-label="Increase quantity"
                            onClick={() => updateQuantity(li.variantId, li.quantity + 1)}
                            className="p-2 hover:bg-cream-warm"
                          >
                            <PlusIcon width={14} height={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(li.variantId)}
                          className="text-xs text-ink-muted hover:text-ink underline underline-offset-2"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {lineItems.length > 0 && (
            <div className="border-t border-border px-6 py-5 space-y-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{formatMoney(subtotal)}</span>
              </div>
              <p className="text-xs text-ink-muted">
                Shipping and taxes calculated at checkout.
              </p>
              <Link
                href="/checkout"
                onClick={closeDrawer}
                className="btn-primary w-full"
              >
                Checkout
              </Link>
              <Link
                href="/cart"
                onClick={closeDrawer}
                className="block text-center text-xs uppercase tracking-[0.18em] underline underline-offset-4"
              >
                View Cart
              </Link>
            </div>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
