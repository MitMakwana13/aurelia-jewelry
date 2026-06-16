import { prisma } from "@/lib/prisma";
import Link from "next/link";

const STATUS_COLORS: Record<string, string> = {
  NEW: "bg-amber-100 text-amber-700",
  CONTACTED: "bg-blue-100 text-blue-700",
  QUOTED: "bg-purple-100 text-purple-700",
  CLOSED: "bg-green-100 text-green-700",
};

const TYPE_LABELS: Record<string, string> = {
  GEMSTONE: "Gemstone",
  DIAMOND: "Diamond",
  CUSTOM_JEWELRY: "Custom Jewelry",
  GENERAL: "General",
};

export default async function AdminInquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  const counts = {
    NEW: inquiries.filter((i) => i.status === "NEW").length,
    CONTACTED: inquiries.filter((i) => i.status === "CONTACTED").length,
    QUOTED: inquiries.filter((i) => i.status === "QUOTED").length,
    CLOSED: inquiries.filter((i) => i.status === "CLOSED").length,
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-ink">Inquiries</h1>
        <p className="mt-1 text-sm text-ink/50">{inquiries.length} total inquiries</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {Object.entries(counts).map(([status, count]) => (
          <div key={status} className="bg-white border border-ink/8 px-5 py-4 rounded-sm">
            <p className="text-2xl font-semibold text-ink">{count}</p>
            <span className={`inline-block text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full mt-1 ${STATUS_COLORS[status]}`}>
              {status}
            </span>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-ink/8 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink/8 bg-cream-warm">
                {["Name", "Phone", "Email", "Type", "Product", "Budget", "Status", "Date", ""].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-[11px] uppercase tracking-[0.14em] text-ink/50 font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {inquiries.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center text-sm text-ink/40">No inquiries yet.</td>
                </tr>
              )}
              {inquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-cream-warm/30 transition">
                  <td className="px-5 py-4 font-medium text-ink">{inq.name}</td>
                  <td className="px-5 py-4">
                    <a href={`tel:${inq.phone}`} className="text-ink/70 hover:text-ink transition">{inq.phone}</a>
                  </td>
                  <td className="px-5 py-4">
                    <a href={`mailto:${inq.email}`} className="text-ink/70 hover:text-ink transition truncate max-w-[160px] block">{inq.email}</a>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs text-ink/60">{TYPE_LABELS[inq.type] ?? inq.type}</span>
                  </td>
                  <td className="px-5 py-4 text-ink/60 max-w-[120px] truncate">{inq.productName ?? "—"}</td>
                  <td className="px-5 py-4 text-ink/60 whitespace-nowrap">{inq.budget ?? "—"}</td>
                  <td className="px-5 py-4">
                    <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full ${STATUS_COLORS[inq.status] ?? "bg-gray-100 text-gray-700"}`}>
                      {inq.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs text-ink/40 whitespace-nowrap">
                    {new Date(inq.createdAt).toLocaleDateString("en-IN")}
                  </td>
                  <td className="px-5 py-4">
                    <Link href={`/admin/inquiries/${inq.id}`} className="text-xs uppercase tracking-[0.12em] text-ink/50 hover:text-ink transition">
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
