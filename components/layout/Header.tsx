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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-cream/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.05)] pb-2" 
          : "bg-transparent pb-4"
      }`}
      onMouseLeave={() => setHovered(null)}
    >
      {/* Live Market Price Ticker */}
      <div className={`transition-all duration-500 overflow-hidden ${scrolled ? "h-0 opacity-0" : "h-auto opacity-100"}`}>
        <LiveMetalPrices />
      </div>

      {/* 3-column grid: left-nav | logo | right-actions */}
      <div className={`container-x grid grid-cols-3 items-center transition-all duration-500 ${scrolled ? "pt-2" : "pt-4"}`}>

        {/* ── Col 1: Left nav (desktop) + Mobile trigger ── */}
        <div className="flex items-center gap-6">
          {/* Mobile */}
          <button aria-label="Open menu" onClick={openMobileNav} className="lg:hidden p-1 -ml-1 transition-colors text-ink">
            <MenuIcon />
          </button>
          {/* Desktop: first 3 nav items */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {mainNav.slice(0, 3).map((item) => (
              <div key={item.label} onMouseEnter={() => setHovered(item.label)} className="relative py-2">
                <a
                  href={item.href}
                  className="text-[10px] uppercase tracking-[0.2em] transition-colors whitespace-nowrap text-ink hover:text-ink/60"
                >
                  {item.label}
                </a>
                {/* Micro-interaction underline */}
                <div className={`absolute bottom-0 left-0 h-[1px] bg-ink transition-all duration-500 ease-out-smooth ${
                  hovered === item.label ? "w-full opacity-100" : "w-0 opacity-0"
                }`} />
              </div>
            ))}
          </nav>
        </div>

        {/* ── Col 2: Logo — perfectly centered ── */}
        <div className="flex justify-center transition-transform duration-500">
          <Logo variant="light" className={scrolled ? "scale-[0.85]" : "scale-100"} />
        </div>

        {/* ── Col 3: Right nav + icons ── */}
        <div className="flex items-center justify-end gap-6">
          {/* Desktop: last 3 nav items */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Secondary navigation">
            {mainNav.slice(3).map((item) => (
              <div key={item.label} onMouseEnter={() => setHovered(item.label)} className="relative py-2">
                <a
                  href={item.href}
                  className="text-[10px] uppercase tracking-[0.2em] transition-colors whitespace-nowrap text-ink hover:text-ink/60"
                >
                  {item.label}
                </a>
                {/* Micro-interaction underline */}
                <div className={`absolute bottom-0 left-0 h-[1px] bg-ink transition-all duration-500 ease-out-smooth ${
                  hovered === item.label ? "w-full opacity-100" : "w-0 opacity-0"
                }`} />
              </div>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4 transition-colors text-ink">
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
                <span className="absolute -right-2 -top-1 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[9px] bg-ink text-cream">
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
