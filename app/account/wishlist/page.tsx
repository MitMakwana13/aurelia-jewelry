import Link from "next/link";
import { commerce } from "@/lib/commerce";
import { ProductGrid } from "@/components/plp/ProductGrid";
import { Breadcrumbs } from "@/components/plp/Breadcrumbs";
import { AccountNav } from "@/components/account/AccountNav";

export default async function WishlistPage() {
  const all = await commerce.getProducts();
  // Demo: pick 4 as example saved items.
  const items = all.filter((p) => p.featured).slice(0, 4);

  return (
    <div className="container-x py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Account", href: "/account" }, { label: "Wishlist" }]} />
      
      <div className="mt-12 flex flex-col md:flex-row gap-12 lg:gap-24">
        <AccountNav />
        
        <div className="flex-1">
          <h1 className="font-serif text-3xl">Wishlist</h1>
          {items.length === 0 ? (
            <div className="mt-12 text-center">
              <p className="text-sm">You haven't saved anything yet.</p>
              <Link href="/shop" className="btn-primary mt-6">Start Shopping</Link>
            </div>
          ) : (
            <div className="mt-10">
              <ProductGrid products={items} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
