import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { TrendingCarousel } from "@/components/home/TrendingCarousel";
import { NavratnaCollection } from "@/components/home/NavratnaCollection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { LegacyOfGemstones } from "@/components/home/LegacyOfGemstones";
import { ZodiacGemstones } from "@/components/home/ZodiacGemstones";
import { GemstoneKnowledgeHub } from "@/components/home/GemstoneKnowledgeHub";
import { Marquee } from "@/components/ui/Marquee";
import { MetalRatesCard } from "@/components/ui/MetalRatesCard";
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

      {/* Live Gold & Silver Rates */}
      <section className="container-x py-10">
        <div className="text-center mb-6">
          <p className="text-[10px] uppercase tracking-[0.3em] text-ink/50">Live Market Rates</p>
          <h2 className="font-serif text-2xl text-ink mt-2">Today&apos;s Precious Metal Prices</h2>
        </div>
        <div className="max-w-xl mx-auto">
          <MetalRatesCard />
        </div>
      </section>

      <CategoryGrid />
      <TrendingCarousel products={trending} title="The Masterpieces" viewAllHref="/shop" />
      <LegacyOfGemstones />
      <ZodiacGemstones />
      <GemstoneKnowledgeHub />
    </>
  );
}
