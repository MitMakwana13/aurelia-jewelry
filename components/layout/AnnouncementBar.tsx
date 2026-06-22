"use client";

import { useState } from "react";
import { CloseIcon } from "@/components/ui/Icons";

const messages = [
  "Complimentary shipping on orders over ₹5,000",
  "Festival Special: up to 25% off on all diamond pieces",
  "Free customization consultation. Book your appointment today",
];

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);
  const [index, setIndex] = useState(0);
  if (dismissed) return null;

  return (
    <div className="relative bg-ink text-cream">
      <div className="container-x flex items-center justify-center py-2.5 text-[11px] tracking-[0.18em] uppercase">
        <button
          aria-label="Previous announcement"
          onClick={() => setIndex((i) => (i - 1 + messages.length) % messages.length)}
          className="px-2 opacity-60 hover:opacity-100 transition"
        >
          ‹
        </button>
        <span className="px-3 text-center">{messages[index]}</span>
        <button
          aria-label="Next announcement"
          onClick={() => setIndex((i) => (i + 1) % messages.length)}
          className="px-2 opacity-60 hover:opacity-100 transition"
        >
          ›
        </button>
        <button
          aria-label="Dismiss"
          onClick={() => setDismissed(true)}
          className="absolute right-4 opacity-60 hover:opacity-100 transition"
        >
          <CloseIcon width={14} height={14} />
        </button>
      </div>
    </div>
  );
}
