"use client";

import Link from "next/link";
import { useState } from "react";
import { footerNav } from "@/data/navigation";
import { ArrowRightIcon, InstagramIcon, TiktokIcon, PinterestIcon } from "@/components/ui/Icons";

export function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail("");
    }, 2500);
  };

  return (
    <footer className="bg-ink text-cream mt-24">
      <div className="container-x py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-serif text-3xl">Join the Circle.</p>
            <p className="mt-3 max-w-md text-sm text-cream/70">
              Receive 10% off your first order, early access to new arrivals, and exclusive
              member benefits.
            </p>
            <form onSubmit={handleSubmit} className="mt-6 flex max-w-md items-center border-b border-cream/30 focus-within:border-cream">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="flex-1 bg-transparent py-3 text-sm placeholder:text-cream/50 outline-none"
              />
              <button type="submit" aria-label="Subscribe" className="p-2 hover:opacity-70 transition">
                <ArrowRightIcon />
              </button>
            </form>
            {submitted && <p className="mt-2 text-xs text-cream/70">Welcome — check your inbox.</p>}
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5">
            {Object.values(footerNav).map((col) => (
              <div key={col.heading}>
                <p className="text-[11px] uppercase tracking-[0.22em] text-cream/60 mb-4">
                  {col.heading}
                </p>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-cream/85 hover:text-cream transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-cream/15 pt-8 md:flex-row md:items-center">
          <div className="flex items-center gap-5 text-cream/80">
            <a href="#" aria-label="Instagram" className="hover:text-cream"><InstagramIcon /></a>
            <a href="#" aria-label="TikTok" className="hover:text-cream"><TiktokIcon /></a>
            <a href="#" aria-label="Pinterest" className="hover:text-cream"><PinterestIcon /></a>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-cream/60">
            <select className="bg-transparent border border-cream/30 px-3 py-1.5 text-cream/80" defaultValue="us">
              <option value="us">United States — USD $</option>
              <option value="ca">Canada — CAD $</option>
              <option value="uk">United Kingdom — GBP £</option>
              <option value="eu">Europe — EUR €</option>
            </select>
            <Link href="/help/faq">Privacy</Link>
            <Link href="/help/faq">Terms</Link>
            <Link href="/help/faq">Accessibility</Link>
            <span>© {new Date().getFullYear()} Aurelia Fine Jewelry</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
