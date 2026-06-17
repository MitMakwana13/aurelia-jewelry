"use client";

import { useState } from "react";
import { BrandIntro } from "@/components/ui/BrandIntro";

export function Preloader() {
  const [done, setDone] = useState(false);

  if (done) return null;

  return <BrandIntro onComplete={() => setDone(true)} />;
}
