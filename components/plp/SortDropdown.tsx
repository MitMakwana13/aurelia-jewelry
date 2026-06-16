"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChevronDownIcon } from "@/components/ui/Icons";

const OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Bestselling", value: "bestseller" },
  { label: "New Arrivals", value: "new" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

export function SortDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const current = params.get("sort") ?? "featured";
  const currentLabel = OPTIONS.find((o) => o.value === current)?.label ?? "Sort";

  const setSort = (value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value === "featured") next.delete("sort");
    else next.set("sort", value);
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  };

  return (
    <Menu as="div" className="relative">
      <MenuButton className="inline-flex items-center gap-2 border border-border px-4 py-2 text-xs uppercase tracking-[0.18em] hover:bg-cream-warm transition">
        Sort: {currentLabel}
        <ChevronDownIcon width={14} height={14} />
      </MenuButton>
      <MenuItems className="absolute right-0 z-20 mt-1 w-56 origin-top-right border border-border bg-cream-light shadow-md focus:outline-none">
        {OPTIONS.map((o) => (
          <MenuItem key={o.value}>
            <button
              onClick={() => setSort(o.value)}
              className={`block w-full px-4 py-2.5 text-left text-sm hover:bg-cream-warm ${
                current === o.value ? "bg-cream-warm" : ""
              }`}
            >
              {o.label}
            </button>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}
