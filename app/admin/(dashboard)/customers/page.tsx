"use client";

import { useEffect, useState } from "react";

interface RegisteredUser {
  id: string;
  email: string;
  fullName: string | null;
  phone: string | null;
  role: string;
  onboardingCompleted: boolean;
  isActive: boolean;
  lastLogin: string | null;
  createdAt: string;
  wishlistCount: number;
  inquiriesCount: number;
}

interface Subscriber {
  id: string;
  email: string;
  name: string | null;
  isActive: boolean;
  source: string | null;
  subscribedAt: string;
}

export default function CustomersPage() {
  const [users, setUsers] = useState<RegisteredUser[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"users" | "subscribers">("users");

  useEffect(() => {
    fetch("/api/admin/customers")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load customers data");
        return res.json();
      })
      .then((data) => {
        if (data.registeredUsers) setUsers(data.registeredUsers);
        if (data.subscribers) setSubscribers(data.subscribers);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleExportUsersCSV = () => {
    if (users.length === 0) return;
    const headers = [
      "ID",
      "Full Name",
      "Email Address",
      "Phone Number",
      "Role",
      "Onboarding Completed",
      "Wishlist Saved Items",
      "Inquiries Submitted",
      "Sign Up Date",
      "Last Active Login",
    ];
    const rows = users.map((u) => [
      u.id,
      u.fullName || "N/A",
      u.email,
      u.phone || "N/A",
      u.role,
      u.onboardingCompleted ? "Yes" : "No",
      u.wishlistCount,
      u.inquiriesCount,
      new Date(u.createdAt).toISOString(),
      u.lastLogin ? new Date(u.lastLogin).toISOString() : "Never",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.map((val) => `"${val}"`).join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `registered_users_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportSubscribersCSV = () => {
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

  const filteredUsers = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      u.email.toLowerCase().includes(q) ||
      (u.fullName && u.fullName.toLowerCase().includes(q)) ||
      (u.phone && u.phone.includes(q))
    );
  });

  const filteredSubscribers = subscribers.filter((sub) => {
    const q = search.toLowerCase();
    return sub.email.toLowerCase().includes(q) || (sub.name && sub.name.toLowerCase().includes(q));
  });

  const totalUsers = users.length;
  const usersWithPhone = users.filter((u) => u.phone && u.phone.trim().length > 0).length;
  const onboardingDone = users.filter((u) => u.onboardingCompleted).length;
  const totalSubscribers = subscribers.length;

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#c49a45] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-3xl text-ink">Customers & Registered Accounts</h1>
          <p className="text-sm text-ink/50 mt-1">
            View user profiles, phone numbers, login activity, wishlist counts, and export contact records.
          </p>
        </div>
        <button
          onClick={activeTab === "users" ? handleExportUsersCSV : handleExportSubscribersCSV}
          className="bg-ink text-cream px-5 py-3 text-[10px] uppercase tracking-wider font-semibold hover:bg-gold-dark transition shadow-md"
        >
          Export CSV List ({activeTab === "users" ? "Users" : "Subscribers"})
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-ink/10 p-5 rounded-sm">
          <p className="text-[10px] uppercase tracking-wider text-ink/40 font-semibold">Registered Accounts</p>
          <p className="font-serif text-3xl text-ink mt-1">{totalUsers}</p>
          <p className="text-[10px] text-green-700 mt-1">Logged-in users</p>
        </div>
        <div className="bg-white border border-ink/10 p-5 rounded-sm">
          <p className="text-[10px] uppercase tracking-wider text-ink/40 font-semibold">Phone Collected</p>
          <p className="font-serif text-3xl text-ink mt-1 text-[#053624]">{usersWithPhone}</p>
          <p className="text-[10px] text-ink/50 mt-1">Verified contacts</p>
        </div>
        <div className="bg-white border border-ink/10 p-5 rounded-sm">
          <p className="text-[10px] uppercase tracking-wider text-ink/40 font-semibold">Onboarded Profiles</p>
          <p className="font-serif text-3xl text-ink mt-1">{onboardingDone}</p>
          <p className="text-[10px] text-purple-700 mt-1">Full profile provided</p>
        </div>
        <div className="bg-white border border-ink/10 p-5 rounded-sm">
          <p className="text-[10px] uppercase tracking-wider text-ink/40 font-semibold">Newsletter Contacts</p>
          <p className="font-serif text-3xl text-ink mt-1">{totalSubscribers}</p>
          <p className="text-[10px] text-ink/50 mt-1">Footer subscribers</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-ink/10 flex gap-6 text-sm">
        <button
          onClick={() => setActiveTab("users")}
          className={`pb-3 font-serif transition relative ${
            activeTab === "users"
              ? "text-ink font-semibold border-b-2 border-gold-dark"
              : "text-ink/40 hover:text-ink"
          }`}
        >
          Registered Accounts ({totalUsers})
        </button>
        <button
          onClick={() => setActiveTab("subscribers")}
          className={`pb-3 font-serif transition relative ${
            activeTab === "subscribers"
              ? "text-ink font-semibold border-b-2 border-gold-dark"
              : "text-ink/40 hover:text-ink"
          }`}
        >
          Newsletter Subscribers ({totalSubscribers})
        </button>
      </div>

      {/* Main List */}
      <div className="bg-white border border-ink/10 rounded-sm overflow-hidden">
        <div className="p-4 border-b border-ink/5 bg-cream-light/35 flex items-center justify-between gap-4">
          <input
            type="text"
            placeholder={
              activeTab === "users"
                ? "Search users by name, email, or phone number..."
                : "Search subscribers by email..."
            }
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md border border-ink/10 px-4 py-2 text-xs outline-none focus:border-ink bg-white transition"
          />
          <span className="text-xs text-ink/40 font-mono">
            Showing {activeTab === "users" ? filteredUsers.length : filteredSubscribers.length} record(s)
          </span>
        </div>

        {activeTab === "users" ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-cream-light/20 border-b border-ink/5">
                  <th className="p-4 text-[10px] uppercase tracking-wider text-ink/50 font-bold">User</th>
                  <th className="p-4 text-[10px] uppercase tracking-wider text-ink/50 font-bold">Contact Info</th>
                  <th className="p-4 text-[10px] uppercase tracking-wider text-ink/50 font-bold">Role</th>
                  <th className="p-4 text-[10px] uppercase tracking-wider text-ink/50 font-bold">Wishlist</th>
                  <th className="p-4 text-[10px] uppercase tracking-wider text-ink/50 font-bold">Inquiries</th>
                  <th className="p-4 text-[10px] uppercase tracking-wider text-ink/50 font-bold">Sign Up Date</th>
                  <th className="p-4 text-[10px] uppercase tracking-wider text-ink/50 font-bold">Last Login</th>
                  <th className="p-4 text-[10px] uppercase tracking-wider text-ink/50 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/5">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-cream-light/10 transition">
                    <td className="p-4">
                      <p className="text-xs font-semibold text-ink">{u.fullName || "Name Not Set"}</p>
                      <p className="text-[10px] text-ink/40 uppercase font-mono mt-0.5">ID: {u.id.slice(0, 8)}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-xs text-ink">{u.email}</p>
                      {u.phone ? (
                        <a
                          href={`tel:${u.phone}`}
                          className="text-xs text-gold-dark hover:underline font-mono mt-0.5 block"
                        >
                          {u.phone}
                        </a>
                      ) : (
                        <span className="text-[10px] text-red-500 italic">No phone provided</span>
                      )}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex px-2 py-0.5 text-[8px] uppercase tracking-wider font-bold rounded-full ${
                          u.role === "ADMIN"
                            ? "bg-purple-100 text-purple-800 border border-purple-200"
                            : "bg-blue-50 text-blue-700 border border-blue-200"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-ink">
                      <span className="font-semibold text-gold-dark">{u.wishlistCount}</span> items
                    </td>
                    <td className="p-4 text-xs text-ink">
                      <span className="font-semibold text-ink">{u.inquiriesCount}</span> submitted
                    </td>
                    <td className="p-4 text-xs text-ink/60 whitespace-nowrap">
                      {new Date(u.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="p-4 text-xs text-ink/60 whitespace-nowrap">
                      {u.lastLogin
                        ? new Date(u.lastLogin).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "Never"}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex px-2 py-0.5 text-[8px] uppercase tracking-wider font-bold rounded-full ${
                          u.onboardingCompleted
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-yellow-50 text-yellow-700 border border-yellow-200"
                        }`}
                      >
                        {u.onboardingCompleted ? "Complete" : "Pending Onboarding"}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-xs text-ink/40">
                      No registered account users found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-cream-light/20 border-b border-ink/5">
                  <th className="p-4 text-[10px] uppercase tracking-wider text-ink/50 font-bold">Name</th>
                  <th className="p-4 text-[10px] uppercase tracking-wider text-ink/50 font-bold">Email Address</th>
                  <th className="p-4 text-[10px] uppercase tracking-wider text-ink/50 font-bold">Source</th>
                  <th className="p-4 text-[10px] uppercase tracking-wider text-ink/50 font-bold">Subscribed Date</th>
                  <th className="p-4 text-[10px] uppercase tracking-wider text-ink/50 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/5">
                {filteredSubscribers.map((sub) => (
                  <tr key={sub.id} className="hover:bg-cream-light/10 transition">
                    <td className="p-4 text-xs font-semibold text-ink">{sub.name || "Anonymous Subscriber"}</td>
                    <td className="p-4 text-xs text-ink">{sub.email}</td>
                    <td className="p-4 text-[10px] uppercase tracking-wider text-ink/40 font-medium">
                      {sub.source || "Website Footer"}
                    </td>
                    <td className="p-4 text-xs text-ink/60 whitespace-nowrap">
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
                {filteredSubscribers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-xs text-ink/40">
                      No newsletter contacts found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
