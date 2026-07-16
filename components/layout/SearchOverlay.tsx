"use client";

import { Dialog, DialogPanel, DialogBackdrop } from "@headlessui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUI } from "@/lib/store/ui-store";
import { products } from "@/data/products";
import { CloseIcon, SearchIcon } from "@/components/ui/Icons";
import type { Product } from "@/lib/commerce/types";

const POPULAR = ["Rings", "Necklaces", "Bangles", "Bespoke", "Diamonds"];

export function SearchOverlay() {
  const { searchOpen, closeSearch } = useUI();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  useEffect(() => {
    if (!searchOpen) setQuery("");
  }, [searchOpen]);

  useEffect(() => {
    const q = query.toLowerCase().trim();
    if (!q) return setResults([]);
    setResults(
      products
        .filter((p) =>
          [p.title, p.description, ...p.tags, p.categorySlug].some((s) => s.toLowerCase().includes(q))
        )
        .slice(0, 8)
    );
  }, [query]);

  return (
    <Dialog open={searchOpen} onClose={closeSearch} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-ink/40" />
      <div className="fixed inset-x-0 top-0">
        <DialogPanel className="bg-cream-light">
          <div className="container-x py-8">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex flex-1 items-center gap-3">
                <SearchIcon />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search jewelry, collections, materials..."
                  className="w-full bg-transparent py-2 text-lg outline-none placeholder:text-ink-muted"
                />
              </div>
              <button aria-label="Close search" onClick={closeSearch}>
                <CloseIcon />
              </button>
            </div>

            {!query && (
              <div className="grid grid-cols-1 gap-10 py-10 md:grid-cols-2">
                <div>
                  <p className="eyebrow mb-4">Popular Searches</p>
                  <ul className="flex flex-wrap gap-2">
                    {POPULAR.map((term) => (
                      <li key={term}>
                        <button
                          onClick={() => setQuery(term)}
                          className="border border-border px-4 py-2 text-sm hover:bg-ink hover:text-cream transition"
                        >
                          {term}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="eyebrow mb-4">Bestsellers</p>
                  <ul className="grid grid-cols-3 gap-3">
                    {products.filter((p) => p.featured || p.trending).slice(0, 3).map((p) => (
                      <li key={p.handle}>
                        <Link href={`/products/${p.handle}`} onClick={closeSearch} className="block">
                          <div className="aspect-square overflow-hidden bg-cream-warm">
                            <img src={p.images[0].url} alt={p.images[0].alt} className="h-full w-full object-cover" />
                          </div>
                          <p className="mt-2 text-xs">{p.title}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {query && (
              <div className="py-8">
                <p className="eyebrow mb-5">{results.length} results</p>
                {results.length === 0 ? (
                  <p className="text-sm text-ink-muted">No results for "{query}". Try another term.</p>
                ) : (
                  <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {results.map((p) => (
                      <li key={p.handle}>
                        <Link href={`/products/${p.handle}`} onClick={closeSearch} className="group block">
                          <div className="aspect-square overflow-hidden bg-cream-warm">
                            <img
                              src={p.images[0].url}
                              alt={p.images[0].alt}
                              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                            />
                          </div>
                          <p className="mt-2 text-sm">{p.title}</p>
                          <p className="text-[10px] uppercase tracking-wider text-ink-muted">Price Upon Request</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
