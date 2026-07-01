"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition } from "react";
import { ChevronDownIcon } from "@/components/ui/Icons";

const METALS = ["14k Gold", "14k Gold Vermeil", "Sterling Silver", "Rose Gold"];

const GEMSTONE_TYPES = [
  { label: "Ruby (Manik)", value: "ruby" },
  { label: "Pearl (Moti)", value: "pearl" },
  { label: "Red Coral (Moonga)", value: "red-coral" },
  { label: "Emerald (Panna)", value: "emerald" },
  { label: "Yellow Sapphire (Pukhraj)", value: "yellow-sapphire" },
  { label: "Diamond (Heera)", value: "diamond-gem" },
  { label: "Blue Sapphire (Neelam)", value: "blue-sapphire" },
  { label: "Hessonite Garnet (Gomed)", value: "hessonite" },
  { label: "Cat's Eye (Lehsunia)", value: "cats-eye" },
];

const JEWELRY_TAGS = ["stacker", "hoops", "chain", "pendant", "diamond", "birthstone"];

const PRICES = [
  { label: "Under ₹5,000", min: 0, max: 5000 },
  { label: "₹5,000 – ₹15,000", min: 5000, max: 15000 },
  { label: "₹15,000 – ₹50,000", min: 15000, max: 50000 },
  { label: "₹50,000+", min: 50000, max: 999999999 },
];

export function FilterSidebar({ category }: { category?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [, startTransition] = useTransition();

  const isGemstones = category === "gemstones" || pathname.includes("/shop/gemstones");

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

      {isGemstones ? (
        <FilterGroup title="Gemstone Type">
          <ul className="space-y-2">
            {GEMSTONE_TYPES.map((t) => (
              <li key={t.value}>
                <label className="flex cursor-pointer items-center gap-3 text-sm">
                  <input
                    type="radio"
                    name="type"
                    checked={isActive("type", t.value)}
                    onChange={() => update("type", t.value)}
                    className="h-3 w-3 accent-ink"
                  />
                  {t.label}
                </label>
              </li>
            ))}
            {params.get("type") && (
              <li>
                <button onClick={() => update("type", null)} className="text-xs underline underline-offset-2">
                  Clear
                </button>
              </li>
            )}
          </ul>
        </FilterGroup>
      ) : (
        <FilterGroup title="Style">
          <ul className="space-y-2">
            {JEWELRY_TAGS.map((t) => (
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
      )}

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
