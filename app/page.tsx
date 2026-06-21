import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { TrendingCarousel } from "@/components/home/TrendingCarousel";
import { NavratnaCollection } from "@/components/home/NavratnaCollection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { LegacyOfGemstones } from "@/components/home/LegacyOfGemstones";
import { ZodiacGemstones } from "@/components/home/ZodiacGemstones";
import { GemstoneKnowledgeHub } from "@/components/home/GemstoneKnowledgeHub";
import { Marquee } from "@/components/ui/Marquee";
import { commerce } from "@/lib/commerce";

export default async function HomePage() {
  const all = await commerce.getProducts();
  const trending = all.filter((p) => p.trending);
  const newArrivals = all.filter((p) => p.newArrival);

  return (
    <>
      <Hero />
      <Marquee />
      <NavratnaCollection />
      <WhyChooseUs />
      <CategoryGrid />
      <TrendingCarousel products={trending} title="The Masterpieces" viewAllHref="/shop" />
      <LegacyOfGemstones />
      {newArrivals.length > 0 && (
        <TrendingCarousel
          products={newArrivals}
          title="Haute Joaillerie"
          viewAllHref="/shop?filter=new"
        />
      )}
      <ZodiacGemstones />
      <GemstoneKnowledgeHub />
    </>
  );
}
