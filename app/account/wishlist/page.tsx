import Link from "next/link";
import { commerce } from "@/lib/commerce";
import { ProductGrid } from "@/components/plp/ProductGrid";
import { Breadcrumbs } from "@/components/plp/Breadcrumbs";
import { AccountNav } from "@/components/account/AccountNav";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { requireOnboarding } from "@/lib/utils/onboarding";

export default async function WishlistPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/account");
  const user = await requireOnboarding(session.user.email);
  const { prisma } = await import("@/lib/prisma");
  const savedItems = await prisma.wishlistItem.findMany({
    where: { userId: user.id },
    select: { productId: true }
  });
  
  const savedProductIds = new Set(savedItems.map(i => i.productId));
  const all = await commerce.getProducts();
  const items = all.filter(p => savedProductIds.has(p.id));
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
