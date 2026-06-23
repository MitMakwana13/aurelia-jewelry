"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@/components/ui/Icons";

const faqs = [
  {
    q: "How do I know my ring size?",
    a: "We recommend visiting an Aurelia store for a complimentary fitting. If you can't make it in, our Ring Sizing Guide includes a printable measuring tool, plus instructions for measuring an existing ring you already own.",
  },
  {
    q: "What's the difference between solid gold and gold vermeil?",
    a: "Solid 14k gold is gold throughout, meaning the entire piece is solid 14k. Gold vermeil is sterling silver thickly plated with 14k gold (at least 2.5 microns). Both are fine jewelry; vermeil is a more accessible price point.",
  },
  {
    q: "Will my jewelry tarnish?",
    a: "Solid gold won't tarnish. Sterling silver may develop a natural patina over time. This is normal and easily polished. Avoid contact with perfume, lotion, and chlorine to extend the life of any fine jewelry.",
  },
  {
    q: "Can I return or exchange a piece?",
    a: "Yes, we offer free returns and exchanges within 30 days for unworn pieces in their original packaging. Engraved and final-sale items are excluded.",
  },
  {
    q: "Do you ship internationally?",
    a: "We ship to the US, Canada, the UK, the EU, and Australia. International orders are duty-paid and arrive in 5–10 business days.",
  },
  {
    q: "Do you offer engraving?",
    a: "Yes, many of our signets, bands, and ID pieces can be engraved with up to 12 characters. Engraving is added at checkout and adds 3–5 business days to processing.",
  },
  {
    q: "Is my purchase covered by a warranty?",
    a: "Every Aurelia piece comes with a lifetime warranty against manufacturing defects. We also offer free cleaning and minor repairs at any of our retail locations.",
  },
];

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div>
      <h1 className="font-serif text-4xl md:text-5xl">FAQs</h1>
      <p className="mt-3 text-sm text-ink-muted">
        Can't find what you're looking for?{" "}
        <a className="underline underline-offset-2">Contact us</a>.
      </p>

      <div className="mt-10 border-t border-border">
        {faqs.map((f, i) => (
          <div key={i} className="border-b border-border">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between py-5 text-left"
            >
              <span className="font-serif text-lg pr-4">{f.q}</span>
              <ChevronDownIcon
                width={18}
                height={18}
                className={`flex-shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`}
              />
            </button>
            {open === i && (
              <p className="pb-6 text-sm leading-relaxed text-ink-soft">{f.a}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
