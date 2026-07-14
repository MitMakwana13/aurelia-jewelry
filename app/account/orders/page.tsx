import Link from "next/link";
import { Breadcrumbs } from "@/components/plp/Breadcrumbs";
import { AccountNav } from "@/components/account/AccountNav";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);
  
  // Currently, there is no direct relation between User and Order in the schema, 
  // so for a new account, we display an empty list.
  // In the future, this will fetch from Prisma: 
  // const orders = await prisma.order.findMany({ ... })
  const orders: any[] = []; 

  return (
    <div className="container-x py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Account", href: "/account" }, { label: "Orders" }]} />
      
      <div className="mt-12 flex flex-col md:flex-row gap-12 lg:gap-24">
        <AccountNav />
        
        <div className="flex-1">
          <h1 className="font-serif text-3xl">Your Orders</h1>

          {orders.length === 0 ? (
            <div className="mt-10 border-y border-border py-16 text-center">
              <p className="text-ink/60 mb-6">You haven't placed any orders yet.</p>
              <Link 
                href="/collections/all" 
                className="inline-block bg-ink text-cream px-8 py-3 text-[11px] uppercase tracking-[0.2em] hover:bg-ink/90 transition"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="mt-10 border-y border-border divide-y divide-border">
              {orders.map((o) => (
                <div key={o.id} className="grid grid-cols-2 items-center gap-4 py-5 md:grid-cols-5">
                  <p className="font-medium">{o.id}</p>
                  <p className="text-sm text-ink-muted">{o.date}</p>
                  <p className="text-sm">{o.items} item{o.items === 1 ? "" : "s"}</p>
                  <p className="text-sm">{o.total}</p>
                  <p className="text-right md:text-left">
                    <span className="inline-block bg-cream-warm px-2 py-1 text-[11px] uppercase tracking-[0.16em]">
                      {o.status}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          )}

          <p className="mt-10 text-sm text-ink-muted">
            Looking for help with an order?{" "}
            <Link href="/help/faq" className="underline underline-offset-2 hover:text-ink transition-colors">Contact us</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
