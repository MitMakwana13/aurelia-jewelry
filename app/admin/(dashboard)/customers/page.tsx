"use client";

import { useEffect, useState } from "react";

interface Subscriber {
  id: string;
  email: string;
  name: string | null;
  isActive: boolean;
  source: string | null;
  subscribedAt: string;
}

export default function CustomersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/admin/customers")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load subscribers");
        return res.json();
      })
      .then((data) => setSubscribers(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleExportCSV = () => {
    if (subscribers.length === 0) return;
    const headers = ["ID", "Email", "Name", "Active", "Source", "Subscribed At"];
    const rows = subscribers.map((sub) => [
      sub.id,
      sub.email,
      sub.name || "",
      sub.isActive ? "Yes" : "No",
      sub.source || "",
      new Date(sub.subscribedAt).toISOString(),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.map((val) => `"${val}"`).join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `subscribers_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = subscribers.filter(
    (sub) =>
      sub.email.toLowerCase().includes(search.toLowerCase()) ||
      (sub.name && sub.name.toLowerCase().includes(search.toLowerCase()))
  );

  const totalCount = subscribers.length;
  const activeCount = subscribers.filter((s) => s.isActive).length;
  const last30DaysCount = subscribers.filter((s) => {
    const date = new Date(s.subscribedAt);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return date > thirtyDaysAgo;
  }).length;

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#c49a45] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-3xl text-ink">Customers & Newsletter</h1>
          <p className="text-sm text-ink/50 mt-1">Manage newsletter subscribers, mailing lists, and user exports.</p>
        </div>
        <button
          onClick={handleExportCSV}
          className="bg-[#053624] text-cream px-5 py-3 text-[10px] uppercase tracking-wider font-semibold hover:bg-ink transition shadow-md"
        >
          Export CSV List
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-ink/10 p-6 rounded-sm">
          <p className="text-[10px] uppercase tracking-wider text-ink/40 font-semibold">Total Subscribers</p>
          <p className="font-serif text-3xl text-ink mt-2">{totalCount}</p>
        </div>
        <div className="bg-white border border-ink/10 p-6 rounded-sm">
          <p className="text-[10px] uppercase tracking-wider text-ink/40 font-semibold">Active Contacts</p>
          <p className="font-serif text-3xl text-ink mt-2 text-[#053624]">{activeCount}</p>
        </div>
        <div className="bg-white border border-ink/10 p-6 rounded-sm">
          <p className="text-[10px] uppercase tracking-wider text-ink/40 font-semibold">Signups (Last 30 Days)</p>
          <p className="font-serif text-3xl text-ink mt-2">{last30DaysCount}</p>
        </div>
      </div>

      {/* Search & List */}
      <div className="bg-white border border-ink/10 rounded-sm overflow-hidden">
        <div className="p-4 border-b border-ink/5 bg-cream-light/35 flex items-center">
          <input
            type="text"
            placeholder="Search by name or email address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md border border-ink/10 px-4 py-2 text-xs outline-none focus:border-ink bg-white transition"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-cream-light/10 border-b border-ink/5">
                <th className="p-4 text-[10px] uppercase tracking-wider text-ink/50 font-bold">Name</th>
                <th className="p-4 text-[10px] uppercase tracking-wider text-ink/50 font-bold">Email Address</th>
                <th className="p-4 text-[10px] uppercase tracking-wider text-ink/50 font-bold">Source</th>
                <th className="p-4 text-[10px] uppercase tracking-wider text-ink/50 font-bold">Subscribed Date</th>
                <th className="p-4 text-[10px] uppercase tracking-wider text-ink/50 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {filtered.map((sub) => (
                <tr key={sub.id} className="hover:bg-cream-light/10 transition">
                  <td className="p-4 text-xs font-semibold text-ink">{sub.name || "Anonymous Subscriber"}</td>
                  <td className="p-4 text-xs text-ink">{sub.email}</td>
                  <td className="p-4 text-[10px] uppercase tracking-wider text-ink/40 font-medium">
                    {sub.source || "Website Footer"}
                  </td>
                  <td className="p-4 text-xs text-ink/60">
                    {new Date(sub.subscribedAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex px-2 py-0.5 text-[8px] uppercase tracking-wider font-bold rounded-full ${
                        sub.isActive
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-red-50 text-red-600 border border-red-200"
                      }`}
                    >
                      {sub.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-xs text-ink/40">
                    No newsletter contacts found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
