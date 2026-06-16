"use client";

import { useState } from "react";
import type { Image as ImageT } from "@/lib/commerce/types";

export function ProductGallery({ images }: { images: ImageT[] }) {
  // Pad to at least 3 images for editorial scroll layout
  const expanded = images.length >= 3 ? images : [...images, ...images, ...images].slice(0, 3);

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      {expanded.map((img, i) => (
        <div key={i} className={`relative overflow-hidden bg-cream-warm w-full ${i === 0 ? "aspect-[4/5] md:aspect-[3/4]" : "aspect-square md:aspect-[4/5]"}`}>
          <img
            src={img.url}
            alt={img.alt}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2s] hover:scale-105"
            loading={i === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}
    </div>
  );
}
