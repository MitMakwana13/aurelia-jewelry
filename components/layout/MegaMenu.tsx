"use client";

import Link from "next/link";
import type { NavColumn } from "@/data/navigation";

export function MegaMenu({ columns, onNavigate }: { columns: NavColumn[]; onNavigate?: () => void }) {
  return (
    <div className="absolute left-0 right-0 top-full bg-cream-light border-t border-border shadow-[0_24px_40px_-30px_rgba(0,0,0,0.18)]">
      <div className="container-x grid grid-cols-12 gap-10 py-12">
        <div className="col-span-8 grid grid-cols-3 gap-10">
          {columns.map((col) => (
            <div key={col.heading}>
              <p className="eyebrow mb-5">{col.heading}</p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onNavigate}
                      className="text-sm text-ink hover:text-gold-dark transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="col-span-4">
          <div className="aspect-[4/5] w-full overflow-hidden bg-cream-warm">
            <img
              src="/products/rubies/IMG_7489.JPG"
              alt="Vivid Pigeon Blood Ruby — Bespoke Collection"
              className="h-full w-full object-cover"
            />
          </div>
          <p className="eyebrow mt-4">Featured</p>
          <Link href="/shop/gemstones?type=ruby" className="mt-2 block font-serif text-2xl link-underline">
            Rare Rubies →
          </Link>
        </div>
      </div>
    </div>
  );
}
