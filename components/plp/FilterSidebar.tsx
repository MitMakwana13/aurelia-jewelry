"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition } from "react";
import { ChevronDownIcon } from "@/components/ui/Icons";

const METALS = ["14k Gold", "14k Gold Vermeil", "Sterling Silver", "Rose Gold"];
const TAGS = ["stacker", "hoops", "chain", "pendant", "diamond", "birthstone"];
const PRICES = [
  { label: "Under $250", min: 0, max: 250 },
  { label: "$250 – $500", min: 250, max: 500 },
  { label: "$500 – $1,000", min: 500, max: 1000 },
  { label: "$1,000+", min: 1000, max: 100000 },
];

export function FilterSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [, startTransition] = useTransition();

  const update = (key: string, value: string | null) => {
    const next = new URLSearchParams(params.toString());
    if (value === null) next.delete(key);
    else next.set(key, value);
    startTransition(() => {
      router.replace(`${pathname}?${next.toString()}`, { scroll: false });
    });
  };

  const isActive = (key: string, value: string) => params.get(key) === value;

  return (
    <aside className="space-y-8 lg:sticky lg:top-24">
      <FilterGroup title="Metal">
        <ul className="space-y-2">
          {METALS.map((m) => (
            <li key={m}>
              <label className="flex cursor-pointer items-center gap-3 text-sm">
                <input
                  type="radio"
                  name="metal"
                  checked={isActive("metal", m)}
                  onChange={() => update("metal", m)}
                  className="h-3 w-3 accent-ink"
                />
                {m}
              </label>
            </li>
          ))}
          {params.get("metal") && (
            <li>
              <button onClick={() => update("metal", null)} className="text-xs underline underline-offset-2">
                Clear
              </button>
            </li>
          )}
        </ul>
      </FilterGroup>

      <FilterGroup title="Style">
        <ul className="space-y-2">
          {TAGS.map((t) => (
            <li key={t}>
              <label className="flex cursor-pointer items-center gap-3 text-sm capitalize">
                <input
                  type="radio"
                  name="tag"
                  checked={isActive("tag", t)}
                  onChange={() => update("tag", t)}
                  className="h-3 w-3 accent-ink"
                />
                {t}
              </label>
            </li>
          ))}
          {params.get("tag") && (
            <li>
              <button onClick={() => update("tag", null)} className="text-xs underline underline-offset-2">
                Clear
              </button>
            </li>
          )}
        </ul>
      </FilterGroup>

      <FilterGroup title="Price">
        <ul className="space-y-2">
          {PRICES.map((p) => {
            const value = `${p.min}-${p.max}`;
            return (
              <li key={p.label}>
                <label className="flex cursor-pointer items-center gap-3 text-sm">
                  <input
                    type="radio"
                    name="price"
                    checked={isActive("price", value)}
                    onChange={() => update("price", value)}
                    className="h-3 w-3 accent-ink"
                  />
                  {p.label}
                </label>
              </li>
            );
          })}
          {params.get("price") && (
            <li>
              <button onClick={() => update("price", null)} className="text-xs underline underline-offset-2">
                Clear
              </button>
            </li>
          )}
        </ul>
      </FilterGroup>
    </aside>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details open className="group border-b border-border pb-6 [&[open]>summary>svg]:rotate-180">
      <summary className="mb-4 flex cursor-pointer items-center justify-between text-sm uppercase tracking-[0.18em]">
        {title}
        <ChevronDownIcon width={14} height={14} className="transition-transform" />
      </summary>
      {children}
    </details>
  );
}
