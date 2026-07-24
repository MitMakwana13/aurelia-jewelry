"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminNewInquiryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "GENERAL",
    productName: "",
    budget: "",
    message: "",
    status: "NEW",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to create inquiry");

      router.push("/admin/inquiries");
      router.refresh();
    } catch (err) {
      alert("Failed to create inquiry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl text-ink">Record New Inquiry</h1>
          <p className="text-sm text-ink/50 mt-1">Add a bespoke request or customer inquiry manually.</p>
        </div>
        <Link href="/admin/inquiries" className="text-xs uppercase tracking-wider text-ink/60 hover:text-ink">
          ← Back to Inquiries
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-ink/10 p-8 space-y-6 rounded-sm shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wider text-ink/60 font-semibold">Customer Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border border-ink/20 px-3 py-2 text-sm outline-none focus:border-ink"
              placeholder="e.g. Priyanshu Sharma"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wider text-ink/60 font-semibold">Phone Number *</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full border border-ink/20 px-3 py-2 text-sm outline-none focus:border-ink"
              placeholder="+91 98765 43210"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wider text-ink/60 font-semibold">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border border-ink/20 px-3 py-2 text-sm outline-none focus:border-ink"
              placeholder="customer@example.com"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wider text-ink/60 font-semibold">Inquiry Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full border border-ink/20 px-3 py-2 text-sm outline-none focus:border-ink bg-white"
            >
              <option value="GENERAL">General Inquiry</option>
              <option value="BESPOKE">Bespoke / Custom Jewelry</option>
              <option value="PRODUCT">Product Inquiry</option>
              <option value="GEMSTONE">Gemstone Consultation</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wider text-ink/60 font-semibold">Product Name / Interest</label>
            <input
              type="text"
              value={formData.productName}
              onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
              className="w-full border border-ink/20 px-3 py-2 text-sm outline-none focus:border-ink"
              placeholder="e.g. Royal Emerald Ring"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wider text-ink/60 font-semibold">Budget (Estimated)</label>
            <input
              type="text"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="w-full border border-ink/20 px-3 py-2 text-sm outline-none focus:border-ink"
              placeholder="e.g. ₹1,50,000"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs uppercase tracking-wider text-ink/60 font-semibold">Customer Message / Requirements</label>
          <textarea
            rows={3}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full border border-ink/20 p-3 text-sm outline-none focus:border-ink"
            placeholder="Details provided by customer..."
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs uppercase tracking-wider text-ink/60 font-semibold">Internal Notes</label>
          <textarea
            rows={2}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full border border-ink/20 p-3 text-sm outline-none focus:border-ink"
            placeholder="Notes for staff..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-ink text-white py-3 text-xs uppercase tracking-widest font-semibold hover:bg-gold-dark transition disabled:opacity-60"
        >
          {loading ? "Saving Inquiry..." : "Save Inquiry Record"}
        </button>
      </form>
    </div>
  );
}
