"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { mainNav } from "@/data/navigation";
import { useCart } from "@/lib/store/cart-store";
import { useUI } from "@/lib/store/ui-store";
import { MegaMenu } from "./MegaMenu";
import { SearchIcon, UserIcon, BagIcon, MenuIcon } from "@/components/ui/Icons";

export function Header() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const itemCount = useCart((s) => s.lineItems.reduce((n, li) => n + li.quantity, 0));
  const openCart = useCart((s) => s.openDrawer);
  const { openSearch, openMobileNav } = useUI();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeItem = mainNav.find((i) => i.label === hovered);

  return (
    <header
      className={`sticky top-0 z-40 bg-cream-light transition-shadow ${scrolled ? "shadow-[0_1px_0_0_rgba(0,0,0,0.06)]" : ""}`}
      onMouseLeave={() => setHovered(null)}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <button
          aria-label="Open menu"
          onClick={openMobileNav}
          className="lg:hidden p-1 -ml-1"
        >
          <MenuIcon />
        </button>

        <nav className="hidden lg:flex items-center gap-7" aria-label="Main">
          {mainNav.map((item) => (
            <div
              key={item.label}
              onMouseEnter={() => setHovered(item.label)}
              className="py-5"
            >
              <Link
                href={item.href}
                className={`text-xs uppercase tracking-[0.18em] transition-colors ${
                  hovered === item.label ? "text-gold-dark" : "text-ink"
                }`}
              >
                {item.label}
              </Link>
            </div>
          ))}
        </nav>

        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 font-serif text-2xl tracking-[0.02em]"
        >
          Aurelia
        </Link>

        <div className="flex items-center gap-4">
          <button aria-label="Search" onClick={openSearch} className="hidden lg:inline-flex hover:opacity-60 transition">
            <SearchIcon />
          </button>
          <Link href="/account" aria-label="Account" className="hidden lg:inline-flex hover:opacity-60 transition">
            <UserIcon />
          </Link>
          <button aria-label="Search" onClick={openSearch} className="lg:hidden hover:opacity-60 transition">
            <SearchIcon />
          </button>
          <button
            aria-label={`Cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
            onClick={openCart}
            className="relative hover:opacity-60 transition"
          >
            <BagIcon />
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-1 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full bg-ink px-1 text-[10px] text-cream">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {activeItem?.columns && (
        <div onMouseEnter={() => setHovered(activeItem.label)}>
          <MegaMenu columns={activeItem.columns} onNavigate={() => setHovered(null)} />
        </div>
      )}
    </header>
  );
}
