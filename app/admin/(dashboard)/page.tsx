import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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

  let userCount = 0;
  let subscriberCount = 0;
  let productCount = 0;
  let totalInquiries = 0;
  let newInquiries = 0;
  let recentInquiries: any[] = [];
  let recentUsers: any[] = [];

  try {
    userCount = await prisma.user.count();
  } catch (e) {
    console.error("Error fetching user count:", e);
  }

  try {
    subscriberCount = await prisma.newsletterSubscriber.count();
  } catch (e) {
    console.error("Error fetching subscriber count:", e);
  }

  try {
    productCount = await prisma.product.count({ where: { isActive: true } });
  } catch (e) {
    console.error("Error fetching product count:", e);
  }

  try {
    totalInquiries = await prisma.inquiry.count();
  } catch (e) {
    console.error("Error fetching total inquiries:", e);
  }

  try {
    newInquiries = await prisma.inquiry.count({ where: { status: "NEW" } });
  } catch (e) {
    console.error("Error fetching new inquiries count:", e);
  }

  try {
    recentInquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
    });
  } catch (e) {
    console.error("Error fetching recent inquiries:", e);
  }

  try {
    recentUsers = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
      select: {
        id: true,
        email: true,
        fullName: true,
        phone: true,
        onboardingCompleted: true,
        createdAt: true,
        lastLogin: true,
      },
    });
  } catch (e) {
    console.error("Error fetching recent users:", e);
  }

  const kpis = [
    { label: "Registered Accounts", value: userCount, icon: "👥", color: "text-blue-600", bg: "bg-blue-50", href: "/admin/customers" },
    { label: "Total Inquiries", value: totalInquiries, icon: "✉", color: "text-purple-600", bg: "bg-purple-50", href: "/admin/inquiries" },
    { label: "New Unread", value: newInquiries, icon: "✦", color: "text-red-600", bg: "bg-red-50", urgent: newInquiries > 0, href: "/admin/inquiries?status=NEW" },
    { label: "Active Products", value: productCount, icon: "◈", color: "text-green-600", bg: "bg-green-50", href: "/admin/products" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h1 className="font-serif text-3xl text-ink">Dashboard Overview</h1>
          <p className="mt-1 text-sm text-ink/50">
            {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Link href="/admin/inquiries/new" className="flex-1 sm:flex-initial text-center text-xs uppercase tracking-wider font-semibold border border-ink/20 px-4 py-2.5 hover:border-ink transition">
            + Record Inquiry
          </Link>
          <Link href="/admin/products/new" className="flex-1 sm:flex-initial text-center text-xs uppercase tracking-wider font-semibold bg-ink text-white px-4 py-2.5 hover:bg-gold-dark transition">
            + Add Product
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
        {kpis.map((k) => (
          <Link
            key={k.label}
            href={k.href}
            className={`bg-white border p-5 rounded-sm transition hover:shadow-md ${k.urgent ? "border-red-200 shadow-xs shadow-red-100" : "border-ink/10"}`}
          >
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-lg mb-3 ${k.bg} ${k.color}`}>
              {k.icon}
            </div>
            <p className="text-2xl lg:text-3xl font-semibold text-ink">{k.value}</p>
            <p className="text-[10px] text-ink/50 mt-1 uppercase tracking-[0.14em] truncate">{k.label}</p>
            {k.urgent && <p className="text-[10px] text-red-500 mt-1 font-medium">Needs attention</p>}
          </Link>
        ))}
      </div>

      {/* Main Grid: Registered Users & Recent Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Registered Users */}
        <div className="bg-white border border-ink/10 rounded-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="px-6 py-4 border-b border-ink/8 bg-cream-light/20 flex items-center justify-between">
              <div>
                <h2 className="font-serif text-lg text-ink">Recent Logged-in Accounts</h2>
                <p className="text-xs text-ink/50">Registered customers and signed-in profiles</p>
              </div>
              <Link href="/admin/customers" className="text-[10px] uppercase tracking-[0.14em] font-semibold text-gold-dark hover:underline">
                View All ({userCount}) →
              </Link>
            </div>

            {recentUsers.length === 0 ? (
              <div className="px-6 py-12 text-center text-sm text-ink/40">No registered account users yet.</div>
            ) : (
              <div className="divide-y divide-ink/5">
                {recentUsers.map((u) => (
                  <div key={u.id} className="px-6 py-3.5 flex items-center justify-between hover:bg-cream-light/10 transition">
                    <div className="min-w-0 flex-1 pr-4">
                      <p className="text-xs font-semibold text-ink truncate">{u.fullName || "Name Not Provided"}</p>
                      <p className="text-[11px] text-ink/60 truncate">{u.email}</p>
                      {u.phone && <p className="text-[10px] font-mono text-gold-dark mt-0.5">{u.phone}</p>}
                    </div>
                    <div className="text-right whitespace-nowrap">
                      <span className={`inline-flex px-2 py-0.5 text-[8px] uppercase tracking-wider font-bold rounded-full ${
                        u.onboardingCompleted ? "bg-green-50 text-green-700 border border-green-200" : "bg-yellow-50 text-yellow-700 border border-yellow-200"
                      }`}>
                        {u.onboardingCompleted ? "Active" : "Pending Profile"}
                      </span>
                      <p className="text-[10px] text-ink/40 mt-1">
                        Joined {new Date(u.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="p-4 border-t border-ink/5 bg-cream-light/10 text-center">
            <Link href="/admin/customers" className="text-xs text-ink/60 hover:text-ink font-medium">
              Manage all {userCount} registered accounts & {subscriberCount} subscribers →
            </Link>
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="bg-white border border-ink/10 rounded-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="px-6 py-4 border-b border-ink/8 bg-cream-light/20 flex items-center justify-between">
              <div>
                <h2 className="font-serif text-lg text-ink">Recent Inquiries</h2>
                <p className="text-xs text-ink/50">Custom jewelry and product consultations</p>
              </div>
              <Link href="/admin/inquiries" className="text-[10px] uppercase tracking-[0.14em] font-semibold text-gold-dark hover:underline">
                View All ({totalInquiries}) →
              </Link>
            </div>

            {recentInquiries.length === 0 ? (
              <div className="px-6 py-12 text-center text-sm text-ink/40">No customer inquiries yet.</div>
            ) : (
              <div className="divide-y divide-ink/5">
                {recentInquiries.map((inq) => (
                  <Link key={inq.id} href={`/admin/inquiries/${inq.id}`} className="px-6 py-3.5 flex items-center justify-between hover:bg-cream-light/10 transition group">
                    <div className="min-w-0 flex-1 pr-4">
                      <p className="text-xs font-semibold text-ink group-hover:text-gold-dark transition truncate">{inq.name}</p>
                      <p className="text-[11px] text-ink/60">{inq.phone} · {inq.type.replace("_", " ")}</p>
                    </div>
                    <div className="text-right whitespace-nowrap">
                      <span className={`inline-flex px-2 py-0.5 text-[8px] uppercase tracking-wider font-bold rounded-full ${STATUS_COLORS[inq.status] ?? "bg-gray-100 text-gray-600"}`}>
                        {inq.status.replace("_", " ")}
                      </span>
                      <p className="text-[10px] text-ink/40 mt-1">
                        {new Date(inq.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="p-4 border-t border-ink/5 bg-cream-light/10 text-center">
            <Link href="/admin/inquiries/new" className="text-xs text-ink/60 hover:text-ink font-medium">
              + Record new phone/walk-in inquiry →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
