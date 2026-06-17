import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { CollectionSpotlight } from "@/components/home/CollectionSpotlight";
import { TrendingCarousel } from "@/components/home/TrendingCarousel";
import { ServicesStrip } from "@/components/home/ServicesStrip";
import { NavratnaCollection } from "@/components/home/NavratnaCollection";
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
      {/* 1. Hero — Cinematic animated video (Born Deep → The Culture of Craft) */}
      <Hero />

      {/* 2. Brand marquee — brief scrolling introduction */}
      <Marquee />

      {/* 3. Category grid — Gemstones, Diamonds, Jewelry intro */}
      <CategoryGrid />

      {/* ── YOUR FOUR SECTIONS ─────────────────────────────── */}

      {/* 4. Navratna Collection — The Nine Cosmic Energies */}
      <NavratnaCollection />

      {/* 5. Why Choose Us */}
      <WhyChooseUs />

      {/* 6. Customer Stories */}
      <CustomerStories />

      {/* 7. Gemstone Knowledge Hub */}
      <KnowledgeHub />

      {/* ── PRODUCT SECTIONS ────────────────────────────────── */}

      {/* 8. Heritage Collection spotlight */}
      <CollectionSpotlight />

      {/* 9. Signature product carousel */}
      <TrendingCarousel products={trending} title="The Masterpieces" viewAllHref="/shop" />

      {newArrivals.length > 0 && (
        <TrendingCarousel
          products={newArrivals}
          title="New Arrivals"
          viewAllHref="/shop?filter=new"
        />
      )}

      {/* 10. White-glove concierge services */}
      <ServicesStrip />
    </>
  );
}
