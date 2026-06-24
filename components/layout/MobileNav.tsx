"use client";

import { Dialog, DialogPanel, DialogBackdrop } from "@headlessui/react";
import Link from "next/link";
import { useState } from "react";
import { mainNav } from "@/data/navigation";
import { useUI } from "@/lib/store/ui-store";
import { CloseIcon, ChevronRightIcon, ArrowLeftIcon } from "@/components/ui/Icons";
import { Logo } from "@/components/ui/Logo";
import { CurrencySelector } from "@/components/ui/CurrencySelector";

export function MobileNav() {
  const { mobileNavOpen, closeMobileNav } = useUI();
  const [active, setActive] = useState<string | null>(null);

  const close = () => {
    setActive(null);
    closeMobileNav();
  };

  const activeItem = mainNav.find((i) => i.label === active);

  return (
    <Dialog open={mobileNavOpen} onClose={close} className="relative z-50 lg:hidden">
      <DialogBackdrop className="fixed inset-0 bg-ink/30" />
      <div className="fixed inset-0 flex">
        <DialogPanel className="w-full max-w-sm bg-cream flex flex-col">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            {activeItem ? (
              <button onClick={() => setActive(null)} className="flex items-center gap-2 text-sm">
                <ArrowLeftIcon width={16} height={16} /> Back
              </button>
            ) : (
              <div className="scale-75 origin-left">
                <Logo variant="dark" />
              </div>
            )}
            <button aria-label="Close menu" onClick={close}>
              <CloseIcon />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto">
            {!activeItem ? (
              <ul className="divide-y divide-border">
                {mainNav.map((item) => (
                  <li key={item.label}>
                    {item.columns ? (
                      <button
                        onClick={() => setActive(item.label)}
                        className="flex w-full items-center justify-between px-5 py-4 text-left text-base"
                      >
                        {item.label}
                        <ChevronRightIcon width={18} height={18} />
                      </button>
                    ) : (
                      <Link href={item.href} onClick={close} className="block px-5 py-4 text-base">
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
                <li>
                  <Link href="/account" onClick={close} className="block px-5 py-4 text-base">
                    Account
                  </Link>
                </li>
              </ul>
            ) : (
              <div className="p-5 space-y-8">
                <p className="font-serif text-3xl">{activeItem.label}</p>
                {activeItem.columns?.map((col) => (
                  <div key={col.heading}>
                    <p className="eyebrow mb-3">{col.heading}</p>
                    <ul className="space-y-3">
                      {col.links.map((link) => (
                        <li key={link.href}>
                          <Link href={link.href} onClick={close} className="text-base">
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </nav>

          <div className="border-t border-border p-5 space-y-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.18em] text-ink/40">Currency</span>
              <CurrencySelector />
            </div>
            <div className="space-y-2 pt-2 border-t border-border">
              <Link href="/custom" onClick={close} className="block py-1">Book Consultation</Link>
              <Link href="/contact" onClick={close} className="block py-1">Contact Us</Link>
              <Link href="/help/faq" onClick={close} className="block py-1">Help</Link>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
