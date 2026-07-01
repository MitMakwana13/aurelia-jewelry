"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition, useState, useEffect } from "react";
import { ChevronDownIcon, CloseIcon } from "@/components/ui/Icons";
import { AnimatePresence, motion } from "framer-motion";

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

const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Bestselling", value: "bestseller" },
  { label: "New Arrivals", value: "new" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

export function FilterSidebar({ category }: { category?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [, startTransition] = useTransition();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isGemstones = category === "gemstones" || pathname.includes("/shop/gemstones");

  // Prevent scroll when mobile filter is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  const update = (key: string, value: string | null) => {
    const next = new URLSearchParams(params.toString());
    if (value === null) next.delete(key);
    else next.set(key, value);
    startTransition(() => {
      router.replace(`${pathname}?${next.toString()}`, { scroll: false });
    });
  };

  const clearAll = () => {
    const next = new URLSearchParams();
    if (params.get("sort")) {
      next.set("sort", params.get("sort")!);
    }
    startTransition(() => {
      router.replace(`${pathname}?${next.toString()}`, { scroll: false });
    });
  };

  const isActive = (key: string, value: string) => params.get(key) === value;

  const activeCount = [
    params.get("metal"),
    params.get("type"),
    params.get("tag"),
    params.get("price"),
  ].filter(Boolean).length;

  const filterContent = (isMobile = false) => (
    <div className="space-y-6">
      {/* Active filters clear summary */}
      {activeCount > 0 && (
        <div className="flex items-center justify-between border-b border-border pb-4">
          <span className="text-xs text-ink/60 font-medium">{activeCount} filter{activeCount > 1 ? "s" : ""} active</span>
          <button onClick={clearAll} className="text-xs text-[#053624] font-semibold underline underline-offset-2 hover:text-ink transition">
            Clear All
          </button>
        </div>
      )}

      {/* Sort Option inside Mobile Drawer for unified control */}
      {isMobile && (
        <FilterGroup title="Sort By" defaultOpen={true}>
          <ul className="space-y-2">
            {SORT_OPTIONS.map((o) => (
              <li key={o.value}>
                <label className="flex cursor-pointer items-center gap-3 text-sm py-1">
                  <input
                    type="radio"
                    name="mobile-sort"
                    checked={(params.get("sort") ?? "featured") === o.value}
                    onChange={() => update("sort", o.value === "featured" ? null : o.value)}
                    className="h-4 w-4 accent-[#053624]"
                  />
                  <span className={(params.get("sort") ?? "featured") === o.value ? "font-medium text-ink" : "text-ink/75"}>
                    {o.label}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </FilterGroup>
      )}

      {/* Metal Filter */}
      <FilterGroup title="Metal" defaultOpen={!isMobile}>
        <ul className="space-y-2">
          {METALS.map((m) => (
            <li key={m}>
              <label className="flex cursor-pointer items-center gap-3 text-sm py-1">
                <input
                  type="radio"
                  name="metal"
                  checked={isActive("metal", m)}
                  onChange={() => update("metal", m)}
                  className="h-4 w-4 accent-[#053624]"
                />
                <span className={isActive("metal", m) ? "font-medium text-ink" : "text-ink/75"}>{m}</span>
              </label>
            </li>
          ))}
          {params.get("metal") && (
            <li className="pt-2">
              <button onClick={() => update("metal", null)} className="text-xs text-[#053624] underline underline-offset-2">
                Clear Metal
              </button>
            </li>
          )}
        </ul>
      </FilterGroup>

      {/* Gemstone Type vs Jewelry Style */}
      {isGemstones ? (
        <FilterGroup title="Gemstone" defaultOpen={true}>
          <ul className="space-y-2">
            {GEMSTONE_TYPES.map((t) => (
              <li key={t.value}>
                <label className="flex cursor-pointer items-center gap-3 text-sm py-1">
                  <input
                    type="radio"
                    name="type"
                    checked={isActive("type", t.value)}
                    onChange={() => update("type", t.value)}
                    className="h-4 w-4 accent-[#053624]"
                  />
                  <span className={isActive("type", t.value) ? "font-medium text-ink" : "text-ink/75"}>{t.label}</span>
                </label>
              </li>
            ))}
            {params.get("type") && (
              <li className="pt-2">
                <button onClick={() => update("type", null)} className="text-xs text-[#053624] underline underline-offset-2">
                  Clear Gemstone
                </button>
              </li>
            )}
          </ul>
        </FilterGroup>
      ) : (
        <FilterGroup title="Style" defaultOpen={!isMobile}>
          <ul className="space-y-2">
            {JEWELRY_TAGS.map((t) => (
              <li key={t}>
                <label className="flex cursor-pointer items-center gap-3 text-sm py-1 capitalize">
                  <input
                    type="radio"
                    name="tag"
                    checked={isActive("tag", t)}
                    onChange={() => update("tag", t)}
                    className="h-4 w-4 accent-[#053624]"
                  />
                  <span className={isActive("tag", t) ? "font-medium text-ink" : "text-ink/75"}>{t}</span>
                </label>
              </li>
            ))}
            {params.get("tag") && (
              <li className="pt-2">
                <button onClick={() => update("tag", null)} className="text-xs text-[#053624] underline underline-offset-2">
                  Clear Style
                </button>
              </li>
            )}
          </ul>
        </FilterGroup>
      )}

      {/* Price Filter */}
      <FilterGroup title="Price" defaultOpen={!isMobile}>
        <ul className="space-y-2">
          {PRICES.map((p) => {
            const value = `${p.min}-${p.max}`;
            return (
              <li key={p.label}>
                <label className="flex cursor-pointer items-center gap-3 text-sm py-1">
                  <input
                    type="radio"
                    name="price"
                    checked={isActive("price", value)}
                    onChange={() => update("price", value)}
                    className="h-4 w-4 accent-[#053624]"
                  />
                  <span className={isActive("price", value) ? "font-medium text-ink" : "text-ink/75"}>{p.label}</span>
                </label>
              </li>
            );
          })}
          {params.get("price") && (
            <li className="pt-2">
              <button onClick={() => update("price", null)} className="text-xs text-[#053624] underline underline-offset-2">
                Clear Price
              </button>
            </li>
          )}
        </ul>
      </FilterGroup>
    </div>
  );

  return (
    <>
      {/* Desktop View (Sidebar) */}
      <aside className="hidden lg:block space-y-8 lg:sticky lg:top-24">
        <h3 className="text-xs uppercase tracking-[0.2em] font-serif text-ink mb-6">Filter By</h3>
        {filterContent(false)}
      </aside>

      {/* Mobile Floating Action Button */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 lg:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-3 rounded-full bg-ink px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-cream shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <span>Filters {activeCount > 0 ? `(${activeCount})` : ""}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cream/30" />
          <span>Sort</span>
        </button>
      </div>

      {/* Mobile slide-over drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 bg-black/55 backdrop-blur-sm"
            />

            {/* Slide-over panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="absolute inset-y-0 right-0 w-[85%] max-w-sm bg-cream-light h-full shadow-2xl flex flex-col"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-border flex items-center justify-between bg-cream">
                <div>
                  <h3 className="font-serif text-lg text-ink font-semibold">Filters & Sorting</h3>
                  <p className="text-[10px] text-ink-muted uppercase tracking-wider mt-0.5">Refine Your Selection</p>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 -mr-2 text-ink hover:opacity-75 transition"
                  aria-label="Close filters"
                >
                  <CloseIcon width={18} height={18} />
                </button>
              </div>

              {/* Drawer Body (Scrollable) */}
              <div className="flex-1 overflow-y-auto p-6 pb-24">
                {filterContent(true)}
              </div>

              {/* Drawer Footer Actions */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-cream border-t border-border flex gap-3">
                {activeCount > 0 && (
                  <button
                    onClick={() => {
                      clearAll();
                      setMobileOpen(false);
                    }}
                    className="flex-1 border border-border bg-white text-ink text-[10px] uppercase tracking-[0.2em] py-4 font-semibold hover:border-ink transition"
                  >
                    Reset
                  </button>
                )}
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex-[2] bg-ink text-cream text-[10px] uppercase tracking-[0.2em] py-4 font-semibold hover:bg-ink/90 transition shadow-md"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function FilterGroup({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  return (
    <details open={defaultOpen} className="group border-b border-border pb-5 [&[open]>summary>svg]:rotate-180">
      <summary className="mb-3 flex cursor-pointer items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-ink/80 select-none">
        {title}
        <ChevronDownIcon width={12} height={12} className="transition-transform duration-300 text-ink/40" />
      </summary>
      <div className="pl-1 pt-1">{children}</div>
    </details>
  );
}
