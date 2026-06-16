import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { CollectionSpotlight } from "@/components/home/CollectionSpotlight";
import { TrendingCarousel } from "@/components/home/TrendingCarousel";
import { ServicesStrip } from "@/components/home/ServicesStrip";
import { SustainabilityBlock } from "@/components/home/SustainabilityBlock";
import { commerce } from "@/lib/commerce";

export default async function HomePage() {
  const all = await commerce.getProducts();
  const trending = all.filter((p) => p.trending);
  const newArrivals = all.filter((p) => p.newArrival);

  return (
    <>
      <Hero />
      <CategoryGrid />
      <CollectionSpotlight />
      <TrendingCarousel products={trending} title="Trending Now" viewAllHref="/shop" />
      {newArrivals.length > 0 && (
        <TrendingCarousel
          products={newArrivals}
          title="Just In"
          viewAllHref="/shop?filter=new"
        />
      )}
      <ServicesStrip />
      <SustainabilityBlock />
    </>
  );
}
