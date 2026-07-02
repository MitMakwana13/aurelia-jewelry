import { prisma } from "@/lib/prisma";
import Link from "next/link";

const STATUS_COLORS: Record<string, string> = {
  NEW: "bg-red-100 text-red-700",
  IN_PROGRESS: "bg-yellow-100 text-yellow-700",
  QUOTED: "bg-blue-100 text-blue-700",
  CONFIRMED: "bg-green-100 text-green-700",
  COMPLETED: "bg-gray-100 text-gray-600",
  CANCELLED: "bg-gray-200 text-gray-500",
};

export default async function AdminDashboard() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [
    productCount,
    inquiriesToday,
    inquiriesMonth,
    newInquiries,
    recentInquiries,
    latestGoldRate,
  ] = await Promise.all([
    prisma.product.count({ where: { isActive: true } }),
    prisma.inquiry.count({ where: { createdAt: { gte: today } } }),
    prisma.inquiry.count({
      where: { createdAt: { gte: new Date(today.getFullYear(), today.getMonth(), 1) } },
    }),
    prisma.inquiry.count({ where: { status: "NEW" } }),
    prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
    prisma.goldRate.findFirst({ orderBy: { createdAt: "desc" } }),
  ]);

  const statuses = ["NEW", "IN_PROGRESS", "QUOTED", "CONFIRMED", "COMPLETED"];
  const statusCounts = await Promise.all(
    statuses.map((s) => prisma.inquiry.count({ where: { status: s } }))
  );

  const kpis = [
    { label: "Inquiries Today", value: inquiriesToday, icon: "◉", color: "text-blue-600", bg: "bg-blue-50" },
    { label: "This Month", value: inquiriesMonth, icon: "◈", color: "text-purple-600", bg: "bg-purple-50" },
    { label: "New Unread", value: newInquiries, icon: "✦", color: "text-red-600", bg: "bg-red-50", urgent: newInquiries > 0 },
    { label: "Active Products", value: productCount, icon: "⊞", color: "text-green-600", bg: "bg-green-50" },
  ];

  return (
    <div>
      <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h1 className="font-serif text-3xl text-ink">Dashboard</h1>
          <p className="mt-1 text-sm text-ink/50">
            {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Link href="/admin/inquiries/new" className="flex-1 sm:flex-initial text-center text-sm border border-ink/20 px-4 py-2 hover:border-ink transition">
            + New Inquiry
          </Link>
          <Link href="/admin/products/new" className="flex-1 sm:flex-initial text-center text-sm bg-ink text-white px-4 py-2 hover:bg-ink/80 transition">
            + Add Product
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mb-10">
        {kpis.map((k) => (
          <div key={k.label} className={`bg-white border p-4 lg:p-6 rounded-sm ${k.urgent ? "border-red-200 shadow-sm shadow-red-100" : "border-ink/8"}`}>
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-lg mb-3 lg:mb-4 ${k.bg} ${k.color}`}>
              {k.icon}
            </div>
            <p className="text-2xl lg:text-3xl font-semibold text-ink">{k.value}</p>
            <p className="text-[10px] text-ink/50 mt-1 uppercase tracking-[0.14em] truncate">{k.label}</p>
            {k.urgent && <p className="text-[10px] text-red-500 mt-1">Needs attention</p>}
          </div>
        ))}
      </div>

      {/* Status Pipeline */}
      <div className="mb-10">
        <h2 className="font-serif text-lg text-ink mb-4">Inquiry Pipeline</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {statuses.map((s, i) => (
            <Link
              key={s}
              href={`/admin/inquiries?status=${s}`}
              className="bg-white border border-ink/8 p-4 rounded-sm text-center hover:border-ink/30 transition group flex flex-col justify-between"
            >
              <div>
                <p className="text-2xl font-semibold text-ink group-hover:text-gold-dark transition">{statusCounts[i]}</p>
                <p className="text-[9px] uppercase tracking-wider text-ink/40 mt-1">{s.replace("_", " ")}</p>
              </div>
              {i < statuses.length - 1 && (
                <p className="hidden lg:block text-ink/20 text-xs mt-2">→</p>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Inquiries */}
        <div className="lg:col-span-2 bg-white border border-ink/8 rounded-sm">
          <div className="px-6 py-4 border-b border-ink/8 flex items-center justify-between">
            <h2 className="font-serif text-lg text-ink">Recent Inquiries</h2>
            <Link href="/admin/inquiries" className="text-xs uppercase tracking-[0.14em] text-ink/50 hover:text-ink transition">
              View All →
            </Link>
          </div>
          {recentInquiries.length === 0 ? (
            <div className="px-6 py-12 text-center text-sm text-ink/40">No inquiries yet.</div>
          ) : (
            <div className="divide-y divide-ink/5">
              {recentInquiries.map((inq) => (
                <Link key={inq.id} href={`/admin/inquiries/${inq.id}`} className="px-6 py-4 flex items-center justify-between hover:bg-ink/2 transition group">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-ink truncate">{inq.name}</p>
                    <p className="text-xs text-ink/50 mt-0.5">{inq.phone} · {inq.type.replace("_", " ")} · {inq.budget ?? "No budget"}</p>
                  </div>
                  <div className="ml-4 flex items-center gap-3">
                    <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-full ${STATUS_COLORS[inq.status] ?? "bg-gray-100 text-gray-600"}`}>
                      {inq.status.replace("_", " ")}
                    </span>
                    <span className="text-xs text-ink/30 whitespace-nowrap">
                      {new Date(inq.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Today's Rates */}
        <div className="bg-white border border-ink/8 rounded-sm">
          <div className="px-6 py-4 border-b border-ink/8 flex items-center justify-between">
            <h2 className="font-serif text-lg text-ink">Today's Rates</h2>
            <Link href="/admin/rates" className="text-xs uppercase tracking-[0.14em] text-ink/50 hover:text-ink transition">
              Update →
            </Link>
          </div>
          <div className="px-6 py-5 space-y-4">
            {latestGoldRate ? (
              <>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-ink/50 uppercase tracking-wider">22K Gold / gram</p>
                  <p className="text-sm font-semibold text-ink">₹{latestGoldRate.gold22kPerGramInr?.toLocaleString("en-IN") ?? "—"}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-ink/50 uppercase tracking-wider">24K Gold / gram</p>
                  <p className="text-sm font-semibold text-ink">₹{latestGoldRate.gold24kPerGramInr?.toLocaleString("en-IN") ?? "—"}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-ink/50 uppercase tracking-wider">Silver / gram</p>
                  <p className="text-sm font-semibold text-ink">₹{latestGoldRate.silverPerGramInr?.toLocaleString("en-IN") ?? "—"}</p>
                </div>
                <p className="text-[10px] text-ink/30 mt-2">
                  Source: {latestGoldRate.source} · {new Date(latestGoldRate.createdAt).toLocaleDateString("en-IN")}
                </p>
              </>
            ) : (
              <div className="text-center py-6">
                <p className="text-sm text-ink/40 mb-3">No rates logged yet.</p>
                <Link href="/admin/rates" className="text-xs uppercase tracking-wider text-ink underline">
                  Add Rates →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
