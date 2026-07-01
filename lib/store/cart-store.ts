"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LineItem, Product, ProductVariant } from "@/lib/commerce/types";

type CartState = {
  lineItems: LineItem[];
  isOpen: boolean;
  addItem: (product: Product, variant: ProductVariant, qty?: number) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, qty: number) => void;
  clear: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lineItems: [],
      isOpen: false,

      addItem: (product, variant, qty = 1) =>
        set((state) => {
          const existing = state.lineItems.find((li) => li.variantId === variant.id);
          if (existing) {
            return {
              lineItems: state.lineItems.map((li) =>
                li.variantId === variant.id ? { ...li, quantity: li.quantity + qty } : li
              ),
              isOpen: true,
            };
          }
          const newItem: LineItem = {
            variantId: variant.id,
            productHandle: product.handle,
            title: product.title,
            variantTitle: variant.title,
            image: product.images[0],
            price: variant.price,
            quantity: qty,
          };
          return { lineItems: [...state.lineItems, newItem], isOpen: true };
        }),

      removeItem: (variantId) =>
        set((state) => ({
          lineItems: state.lineItems.filter((li) => li.variantId !== variantId),
        })),

      updateQuantity: (variantId, qty) =>
        set((state) => ({
          lineItems:
            qty <= 0
              ? state.lineItems.filter((li) => li.variantId !== variantId)
              : state.lineItems.map((li) =>
                  li.variantId === variantId ? { ...li, quantity: qty } : li
                ),
        })),

      clear: () => set({ lineItems: [] }),
      openDrawer: () => set({ isOpen: true }),
      closeDrawer: () => set({ isOpen: false }),
      toggleDrawer: () => set((s) => ({ isOpen: !s.isOpen })),
    }),
    { name: "radharani-cart" }
  )
);

export function getCartTotals(lineItems: LineItem[]) {
  const subtotalAmount = lineItems.reduce(
    (sum, li) => sum + li.price.amount * li.quantity,
    0
  );
  const itemCount = lineItems.reduce((sum, li) => sum + li.quantity, 0);
  const currency = lineItems[0]?.price.currency ?? "INR";
  return {
    subtotal: { amount: subtotalAmount, currency },
    itemCount,
  };
}
