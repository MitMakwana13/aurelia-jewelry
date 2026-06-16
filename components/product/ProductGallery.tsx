"use client";

import { useState } from "react";
import type { Image as ImageT } from "@/lib/commerce/types";

export function ProductGallery({ images }: { images: ImageT[] }) {
  const [active, setActive] = useState(0);
  // Pad to at least 4 images for editorial layout (reuses existing imagery)
  const expanded = images.length >= 4 ? images : [...images, ...images, ...images, ...images].slice(0, 4);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[80px_1fr]">
      <div className="hidden flex-col gap-3 lg:flex">
        {expanded.map((img, i) => (
          <button
            key={i}
            aria-label={`View image ${i + 1}`}
            onClick={() => setActive(i)}
            className={`aspect-square overflow-hidden border bg-cream-warm transition ${
              active === i ? "border-ink" : "border-transparent hover:border-border"
            }`}
          >
            <img src={img.url} alt={img.alt} className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <div className="aspect-[4/5] overflow-hidden bg-cream-warm">
          <img
            src={expanded[active].url}
            alt={expanded[active].alt}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="grid grid-cols-3 gap-3 lg:hidden">
          {expanded.slice(0, 3).map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={`aspect-square overflow-hidden border bg-cream-warm ${
                active === i ? "border-ink" : "border-transparent"
              }`}
            >
              <img src={img.url} alt={img.alt} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
