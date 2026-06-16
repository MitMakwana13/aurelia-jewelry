import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const [productCount, orderCount, paidOrders, customCount] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.order.count({ where: { status: "PAID" } }),
    prisma.customRequest.count(),
  ]);

  const recentOrders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const stats = [
    { label: "Total Products", value: productCount, icon: "◈", color: "bg-amber-50 text-amber-700" },
    { label: "Total Orders", value: orderCount, icon: "◉", color: "bg-blue-50 text-blue-700" },
    { label: "Paid Orders", value: paidOrders, icon: "✓", color: "bg-green-50 text-green-700" },
    { label: "Custom Requests", value: customCount, icon: "✦", color: "bg-purple-50 text-purple-700" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-ink">Dashboard</h1>
        <p className="mt-1 text-sm text-ink/50">Welcome back, Admin · Radharani Gemstone</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white border border-ink/8 p-6 rounded-sm">
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-lg mb-4 ${stat.color}`}>
              {stat.icon}
            </div>
            <p className="text-3xl font-semibold text-ink">{stat.value}</p>
            <p className="text-xs text-ink/50 mt-1 uppercase tracking-[0.14em]">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white border border-ink/8 rounded-sm">
        <div className="px-6 py-4 border-b border-ink/8 flex items-center justify-between">
          <h2 className="font-serif text-lg text-ink">Recent Orders</h2>
          <a href="/admin/orders" className="text-xs uppercase tracking-[0.14em] text-ink/50 hover:text-ink transition">View All →</a>
        </div>
        {recentOrders.length === 0 ? (
          <div className="px-6 py-12 text-center text-sm text-ink/40">No orders yet.</div>
        ) : (
          <div className="divide-y divide-ink/5">
            {recentOrders.map((order) => {
              const customer = (order.customerDetails as { firstName?: string; email?: string }) ?? {};
              return (
                <div key={order.id} className="px-6 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-ink">{customer.firstName ?? "Customer"}</p>
                    <p className="text-xs text-ink/50">{customer.email ?? "—"}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-ink">₹{order.amount.toLocaleString("en-IN")}</p>
                    <span className={`inline-block text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full mt-1 ${
                      order.status === "PAID" ? "bg-green-100 text-green-700" :
                      order.status === "SHIPPED" ? "bg-blue-100 text-blue-700" :
                      "bg-amber-100 text-amber-700"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
