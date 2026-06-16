import Link from "next/link";
import { Breadcrumbs } from "@/components/plp/Breadcrumbs";

const orders = [
  { id: "AUR-184902", date: "April 2, 2026", status: "Delivered", total: "$1,148.00", items: 3 },
  { id: "AUR-178411", date: "January 18, 2026", status: "Delivered", total: "$420.00", items: 1 },
  { id: "AUR-167203", date: "October 6, 2025", status: "Delivered", total: "$680.00", items: 2 },
];

export default function OrdersPage() {
  return (
    <div className="container-x py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Account", href: "/account" }, { label: "Orders" }]} />
      <h1 className="mt-6 font-serif text-4xl">Your Orders</h1>

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

      <p className="mt-10 text-sm text-ink-muted">
        Looking for help with an order?{" "}
        <Link href="/help/faq" className="underline underline-offset-2">Contact us</Link>.
      </p>
    </div>
  );
}
