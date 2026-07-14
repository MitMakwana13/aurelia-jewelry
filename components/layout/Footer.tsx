"use client";

import Link from "next/link";
import { useState } from "react";
import { footerNav } from "@/data/navigation";
import { ArrowRightIcon, InstagramIcon, TiktokIcon, PinterestIcon } from "@/components/ui/Icons";
import { Logo } from "@/components/ui/Logo";

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
    <footer className="bg-ink text-cream border-t border-cream/5">
      <div className="container-x py-24 lg:py-32">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="mb-10 w-max">
                <Logo variant="dark" />
              </div>
              <p className="max-w-xs text-[11px] leading-relaxed tracking-wider text-cream/60 uppercase">
                Ethically sourced gemstones and diamonds crafted into timeless bespoke pieces.
              </p>
            </div>
            
            {/* Newsletter */}
            <div className="mt-16">
              <p className="text-[10px] uppercase tracking-[0.25em] text-cream/40 mb-4">The Concierge Newsletter</p>
              <form onSubmit={handleSubmit} className="flex items-center border-b border-cream/20 pb-2 focus-within:border-cream/80 transition-colors">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="flex-1 bg-transparent text-[11px] uppercase tracking-widest placeholder:text-cream/30 outline-none"
                />
                <button type="submit" aria-label="Subscribe" className="p-1 text-cream/50 hover:text-cream transition-colors">
                  <ArrowRightIcon width={14} height={14} />
                </button>
              </form>
              {submitted && <p className="mt-3 text-[10px] uppercase tracking-widest text-cream/50">Welcome to the inner circle.</p>}
            </div>
          </div>

          {/* Links Index */}
          <div className="lg:col-span-7 lg:col-start-6 grid grid-cols-2 gap-y-12 sm:grid-cols-3">
            {Object.values(footerNav).map((col) => (
              <div key={col.heading}>
                <p className="text-[10px] uppercase tracking-[0.3em] text-cream/30 mb-6">
                  {col.heading}
                </p>
                <ul className="space-y-4">
                  {col.links.map((link, index) => (
                    <li key={`${link.href}-${index}`}>
                      <Link
                        href={link.href}
                        className="text-[10px] uppercase tracking-[0.15em] text-cream/70 hover:text-white transition-colors"
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

        {/* Deep Footer */}
        <div className="mt-24 flex flex-col items-start justify-between gap-8 border-t border-cream/10 pt-8 md:flex-row md:items-center">
          <div className="flex items-center gap-6 text-cream/50">
            <a href="https://www.instagram.com/radharanigemstone?igsh=MWNscnBqN21tNXRoag==" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-cream transition-colors"><InstagramIcon width={16} height={16} /></a>
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-[9px] uppercase tracking-[0.2em] text-cream/40">
            <Link href="/help/privacy" className="hover:text-cream transition-colors">Privacy</Link>
            <Link href="/help/terms" className="hover:text-cream transition-colors">Terms</Link>
            <Link href="/help/accessibility" className="hover:text-cream transition-colors">Accessibility</Link>
            <span>{new Date().getFullYear()} RADHA RANI HERITAGE COLLECTION</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
