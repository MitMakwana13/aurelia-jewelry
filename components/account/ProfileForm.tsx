"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ProfileForm({ user }: { user: { fullName: string | null; phone: string | null } }) {
  const router = useRouter();
  const [fullName, setFullName] = useState(user.fullName || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/account/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, phone }),
      });

      if (!res.ok) {
        const data = await res.json();
        setMessage(data.error || "Failed to update profile.");
      } else {
        setMessage("Profile updated successfully!");
        router.refresh();
      }
    } catch (err) {
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[10px] uppercase tracking-[0.18em] text-ink/50 mb-2">Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border border-border px-4 py-3 text-sm bg-transparent outline-none focus:border-ink transition-colors"
          />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-[0.18em] text-ink/50 mb-2">Phone</label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-border px-4 py-3 text-sm bg-transparent outline-none focus:border-ink transition-colors"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-ink text-cream px-6 py-3 text-[11px] uppercase tracking-[0.2em] hover:bg-ink/90 transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
        {message && (
          <span className={`text-xs ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </span>
        )}
      </div>
    </form>
  );
}
