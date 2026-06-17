import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { CollectionSpotlight } from "@/components/home/CollectionSpotlight";
import { TrendingCarousel } from "@/components/home/TrendingCarousel";
import { ServicesStrip } from "@/components/home/ServicesStrip";
import { NavratnaCollection } from "@/components/home/NavratnaCollection";
import { GemJourneyAnimation } from "@/components/home/GemJourneyAnimation";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { CustomerStories } from "@/components/home/CustomerStories";
import { KnowledgeHub } from "@/components/home/KnowledgeHub";
import { Marquee } from "@/components/ui/Marquee";
import { commerce } from "@/lib/commerce";

export default async function HomePage() {
  const all = await commerce.getProducts();
  const trending = all.filter((p) => p.trending);
  const newArrivals = all.filter((p) => p.newArrival);

  return (
    <>
      {/* 1. Hero — The Culture of Craft */}
      <Hero />

      {/* 2. Brand marquee ticker */}
      <Marquee />

      {/* 3. Category grid — Gemstones, Diamonds, Jewelry */}
      <CategoryGrid />

      {/* 4. Navratna Collection — The Nine Cosmic Energies */}
      <NavratnaCollection />

      {/* 5. Cinematic gem journey animation */}
      <GemJourneyAnimation />

      {/* 6. Heritage Collection spotlight */}
      <CollectionSpotlight />

      {/* 7. Signature product carousel */}
      <TrendingCarousel products={trending} title="The Masterpieces" viewAllHref="/shop" />

      {newArrivals.length > 0 && (
        <TrendingCarousel
          products={newArrivals}
          title="New Arrivals"
          viewAllHref="/shop?filter=new"
        />
      )}

      {/* 8. Why Choose Us — emerald backdrop */}
      <WhyChooseUs />

      {/* 9. Customer Stories testimonials */}
      <CustomerStories />

      {/* 10. Gemstone Knowledge Hub */}
      <KnowledgeHub />

      {/* 11. White-glove services */}
      <ServicesStrip />
    </>
  );
}
