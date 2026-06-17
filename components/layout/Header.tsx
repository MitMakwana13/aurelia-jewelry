"use client";

import { useEffect, useState } from "react";
import { mainNav } from "@/data/navigation";
import { useCart } from "@/lib/store/cart-store";
import { useUI } from "@/lib/store/ui-store";
import { MegaMenu } from "./MegaMenu";
import { SearchIcon, UserIcon, BagIcon, MenuIcon } from "@/components/ui/Icons";
import { Logo } from "@/components/ui/Logo";
import { LiveMetalPrices } from "@/components/ui/LiveMetalPrices";

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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ease-in-out ${
        scrolled 
          ? "bg-cream/95 backdrop-blur-md shadow-sm py-3" 
          : "bg-gradient-to-b from-black/60 to-transparent py-6"
      }`}
      onMouseLeave={() => setHovered(null)}
    >
      {/* 3-column grid: left-nav | logo | right-actions */}
      <div className="container-x grid grid-cols-3 items-center">

        {/* ── Col 1: Left nav (desktop) + Mobile trigger ── */}
        <div className="flex items-center gap-6">
          {/* Mobile */}
          <button aria-label="Open menu" onClick={openMobileNav} className={`lg:hidden p-1 -ml-1 transition-colors ${scrolled ? "text-ink" : "text-white"}`}>
            <MenuIcon />
          </button>
          {/* Desktop: first 3 nav items */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {mainNav.slice(0, 3).map((item) => (
              <div key={item.label} onMouseEnter={() => setHovered(item.label)} className="relative py-2">
                <a
                  href={item.href}
                  className={`text-[9px] font-medium uppercase tracking-[0.25em] transition-colors whitespace-nowrap ${
                    scrolled ? "text-ink hover:text-ink/60" : "text-white/90 hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
                {/* Micro-interaction underline */}
                <div className={`absolute bottom-0 left-0 h-[1px] transition-all duration-500 ease-out-smooth ${
                  scrolled ? "bg-ink" : "bg-white"
                } ${
                  hovered === item.label ? "w-full opacity-100" : "w-0 opacity-0"
                }`} />
              </div>
            ))}
          </nav>
        </div>

        {/* ── Col 2: Logo — perfectly centered ── */}
        <div className="flex justify-center transition-transform duration-700 ease-out-smooth">
          <Logo variant={scrolled ? "light" : "dark"} className={scrolled ? "scale-[0.80]" : "scale-100"} />
        </div>

        {/* ── Col 3: Right nav + icons ── */}
        <div className="flex items-center justify-end gap-6">
          {/* Desktop: last 3 nav items */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Secondary navigation">
            {mainNav.slice(3).map((item) => (
              <div key={item.label} onMouseEnter={() => setHovered(item.label)} className="relative py-2">
                <a
                  href={item.href}
                  className={`text-[9px] font-medium uppercase tracking-[0.25em] transition-colors whitespace-nowrap ${
                    scrolled ? "text-ink hover:text-ink/60" : "text-white/90 hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
                {/* Micro-interaction underline */}
                <div className={`absolute bottom-0 left-0 h-[1px] transition-all duration-500 ease-out-smooth ${
                  scrolled ? "bg-ink" : "bg-white"
                } ${
                  hovered === item.label ? "w-full opacity-100" : "w-0 opacity-0"
                }`} />
              </div>
            ))}
          </nav>

          {/* Icons */}
          <div className={`flex items-center gap-5 transition-colors ${scrolled ? "text-ink" : "text-white"}`}>
            <button aria-label="Search" onClick={openSearch} className="hidden lg:inline-flex hover:opacity-60 transition">
              <SearchIcon />
            </button>
            <a href="/account" aria-label="Account" className="hidden lg:inline-flex hover:opacity-60 transition">
              <UserIcon />
            </a>
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
                <span className={`absolute -right-2 -top-1 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[9px] ${
                  scrolled ? "bg-ink text-cream" : "bg-white text-ink"
                }`}>
                  {itemCount}
                </span>
              )}
            </button>
          </div>
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
