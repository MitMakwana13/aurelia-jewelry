"use client";

import type { ShippoRate } from "@/lib/shippo";

type Props = {
  rates: ShippoRate[];
  selected: string | null;
  onSelect: (rateId: string, amountCents: number) => void;
  loading: boolean;
  error: string | null;
};

export function ShippingRateSelector({ rates, selected, onSelect, loading, error }: Props) {
  if (loading) {
    return (
      <div className="py-8 text-center text-sm text-ink-muted">
        <span className="animate-pulse">Fetching live shipping rates…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        Could not fetch rates: {error}. Please check your address and try again.
      </div>
    );
  }

  if (rates.length === 0) {
    return (
      <p className="text-sm text-ink-muted">
        No shipping rates available for this address. Please check the country and postal code.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {rates.map((rate) => {
        const cents = Math.round(parseFloat(rate.amount) * 100);
        const isSelected = selected === rate.object_id;
        return (
          <li key={rate.object_id}>
            <label className={`flex cursor-pointer items-start justify-between gap-4 border p-4 transition ${
              isSelected ? "border-ink bg-cream-warm" : "border-border hover:border-ink/50"
            }`}>
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="shipping-rate"
                  value={rate.object_id}
                  checked={isSelected}
                  onChange={() => onSelect(rate.object_id, cents)}
                  className="mt-0.5 accent-ink"
                />
                <div>
                  <p className="text-sm font-medium">
                    {rate.provider} — {rate.servicelevel.name}
                  </p>
                  {(rate.estimated_days != null || rate.duration_terms) && (
                    <p className="text-xs text-ink-muted mt-0.5">
                      {rate.duration_terms
                        ? rate.duration_terms
                        : `${rate.estimated_days} business day${rate.estimated_days === 1 ? "" : "s"}`}
                    </p>
                  )}
                </div>
              </div>
              <span className="text-sm font-medium whitespace-nowrap">
                {parseFloat(rate.amount) === 0
                  ? "Free"
                  : new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: rate.currency.toUpperCase(),
                    }).format(parseFloat(rate.amount))}
              </span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}
