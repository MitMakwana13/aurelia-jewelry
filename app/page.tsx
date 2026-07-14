import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";

import { NavratnaCollection } from "@/components/home/NavratnaCollection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { LegacyOfGemstones } from "@/components/home/LegacyOfGemstones";
import { ZodiacGemstones } from "@/components/home/ZodiacGemstones";

import { Marquee } from "@/components/ui/Marquee";
import { commerce } from "@/lib/commerce";

export default async function HomePage() {
  const all = await commerce.getProducts();
  const trending = all.filter((p) => p.trending);

  return (
    <>
      <Hero />
      <Marquee />
      <NavratnaCollection />
      <WhyChooseUs />
      <CategoryGrid />

      <LegacyOfGemstones />
      <ZodiacGemstones />

    </>
  );
}
