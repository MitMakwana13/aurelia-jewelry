import type { Metadata } from "next";
import { commerce } from "@/lib/commerce";
import { ProductGrid } from "@/components/plp/ProductGrid";

export const metadata: Metadata = {
  title: "The Masterpieces",
  description: "Explore the Radha Rani Heritage Collection. Exceptional GIA/IGI certified high jewelry.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const products = await commerce.getProducts();

  return (
    <div className="pt-32 pb-24 min-h-screen bg-cream">
      <div className="container-x">
        <header className="mb-20 text-center max-w-3xl mx-auto">
          <p className="eyebrow tracking-[0.3em] text-[#053624]/70 mb-4">The Collection</p>
          <h1 className="font-serif text-4xl md:text-6xl text-ink tracking-tight mb-6">
            Masterpieces
          </h1>
          <p className="text-sm text-ink/60 leading-relaxed">
            A curated exhibition of our most exceptional works. Each piece represents hundreds of hours of 
            master craftsmanship and features strictly unheated, GIA/IGI certified gemstones.
          </p>
        </header>

        <div className="max-w-7xl mx-auto">
          <ProductGrid products={products} />
        </div>
        
        <div className="mt-32 text-center border-t border-ink/5 pt-16">
          <p className="font-serif text-2xl text-ink mb-4">Seeking something specific?</p>
          <p className="text-sm text-ink/60 mb-8 max-w-md mx-auto">
            Our private concierge is available to source specific gemstones or begin a fully bespoke commission.
          </p>
          <a 
            href="/custom"
            className="inline-block bg-[#053624] text-cream px-10 py-4 text-[10px] uppercase tracking-[0.2em] hover:bg-ink transition-colors"
          >
            Request Consultation
          </a>
        </div>
      </div>
    </div>
  );
}
