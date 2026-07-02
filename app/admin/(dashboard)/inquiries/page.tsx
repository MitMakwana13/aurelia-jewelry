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

const PRIORITY_COLORS: Record<string, string> = {
  URGENT: "bg-red-200 text-red-800",
  HIGH: "bg-orange-100 text-orange-700",
  NORMAL: "bg-blue-50 text-blue-600",
  LOW: "bg-gray-100 text-gray-500",
};

export default async function InquiriesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const sp = await searchParams;
  const statusFilter = sp.status ?? undefined;
  const typeFilter = sp.type ?? undefined;
  const search = sp.q ?? undefined;

  const [inquiries, totalNew] = await Promise.all([
    prisma.inquiry.findMany({
      where: {
        status: statusFilter,
        type: typeFilter,
        ...(search
          ? {
              OR: [
                { name: { contains: search, mode: "insensitive" } },
                { phone: { contains: search } },
                { email: { contains: search, mode: "insensitive" } },
              ],
            }
          : {}),
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
    prisma.inquiry.count({ where: { status: "NEW" } }),
  ]);

  const statuses = ["NEW", "IN_PROGRESS", "QUOTED", "CONFIRMED", "COMPLETED", "CANCELLED"];
  const types = ["GENERAL", "GEMSTONE", "DIAMOND", "CUSTOM_JEWELRY", "PRODUCT"];

  return (
    <div>
      <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h1 className="font-serif text-3xl text-ink">Inquiries</h1>
          <p className="mt-1 text-sm text-ink/50">
            {totalNew} new unread · {inquiries.length} showing
          </p>
        </div>
        <a
          href="/api/admin/inquiries/export"
          className="btn-primary text-sm py-2.5 px-5 text-center w-full sm:w-auto"
        >
          Export CSV
        </a>
      </div>

      {/* Filters */}
      <form className="mb-6 flex flex-wrap items-end gap-3 bg-white border border-ink/8 p-4 rounded-sm">
        <input
          name="q"
          defaultValue={search}
          placeholder="Search name, phone, email..."
          className="border border-ink/20 px-3 py-2 text-sm outline-none focus:border-ink flex-1 min-w-[200px]"
        />
        <select name="status" defaultValue={statusFilter ?? ""} className="border border-ink/20 px-3 py-2 text-sm outline-none focus:border-ink bg-white">
          <option value="">All Statuses</option>
          {statuses.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
        </select>
        <select name="type" defaultValue={typeFilter ?? ""} className="border border-ink/20 px-3 py-2 text-sm outline-none focus:border-ink bg-white">
          <option value="">All Types</option>
          {types.map((t) => <option key={t} value={t}>{t.replace("_", " ")}</option>)}
        </select>
        <button type="submit" className="bg-ink text-white px-5 py-2 text-sm hover:bg-ink/80 transition">Filter</button>
        <Link href="/admin/inquiries" className="text-sm text-ink/50 hover:text-ink transition">Clear</Link>
      </form>

      {/* Status Pipeline */}
      <div className="mb-8 grid grid-cols-3 md:grid-cols-6 gap-2">
        {statuses.map(async (s) => {
          const count = await prisma.inquiry.count({ where: { status: s } });
          return (
            <Link
              key={s}
              href={`/admin/inquiries?status=${s}`}
              className={`p-3 rounded-sm text-center border transition hover:shadow-sm ${
                statusFilter === s ? "border-ink bg-ink/5" : "border-ink/10 bg-white hover:border-ink/30"
              }`}
            >
              <p className="text-2xl font-semibold text-ink">{count}</p>
              <p className="text-[9px] uppercase tracking-wider text-ink/50 mt-1">{s.replace("_", " ")}</p>
            </Link>
          );
        })}
      </div>

      {/* Table */}
      <div className="bg-white border border-ink/8 rounded-sm overflow-hidden">
        {inquiries.length === 0 ? (
          <div className="py-16 text-center text-sm text-ink/40">No inquiries found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-ink/10 bg-ink/2">
                <tr>
                  {["ID", "Name", "Phone", "Type", "Budget", "Product", "Status", "Priority", "Date", ""].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-ink/50 font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/5">
                {inquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-ink/2 transition-colors">
                    <td className="px-4 py-3 font-mono text-[11px] text-ink/40">{inq.id.slice(0, 8)}</td>
                    <td className="px-4 py-3 font-medium text-ink">{inq.name}</td>
                    <td className="px-4 py-3 text-ink/70">
                      <a href={`tel:${inq.phone}`} className="hover:text-ink transition">{inq.phone}</a>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] uppercase tracking-wide text-ink/60">{inq.type.replace("_", " ")}</span>
                    </td>
                    <td className="px-4 py-3 text-ink/60 text-xs">{inq.budget ?? "—"}</td>
                    <td className="px-4 py-3 text-ink/60 text-xs max-w-[120px] truncate">{inq.productName ?? "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block text-[10px] uppercase tracking-wider px-2 py-1 rounded-full font-medium ${STATUS_COLORS[inq.status] ?? "bg-gray-100 text-gray-600"}`}>
                        {inq.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block text-[10px] uppercase tracking-wider px-2 py-1 rounded-full ${PRIORITY_COLORS[inq.priority] ?? ""}`}>
                        {inq.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-ink/40 text-xs whitespace-nowrap">
                      {new Date(inq.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/inquiries/${inq.id}`}
                        className="text-[10px] uppercase tracking-wider text-ink underline underline-offset-4 hover:text-gold-dark transition"
                      >
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
