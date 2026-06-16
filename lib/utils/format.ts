import type { Money } from "@/lib/commerce/types";

export function formatMoney(money: Money): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: money.amount % 1 === 0 ? 0 : 2,
  }).format(money.amount);
}

export function formatPriceRange(min: Money, max: Money): string {
  if (min.amount === max.amount) return formatMoney(min);
  return `${formatMoney(min)} – ${formatMoney(max)}`;
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
