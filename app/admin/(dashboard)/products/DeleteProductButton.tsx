"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function DeleteProductButton({ id, title }: { id: string; title: string }) {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    router.refresh();
    setLoading(false);
    setConfirming(false);
  };

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <button onClick={() => setConfirming(false)} className="text-xs text-ink/50 hover:text-ink transition">Cancel</button>
        <button onClick={handleDelete} disabled={loading} className="text-xs text-red-600 hover:text-red-700 transition font-medium">
          {loading ? "Deleting..." : "Confirm Delete"}
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="text-xs uppercase tracking-[0.14em] text-red-400 hover:text-red-600 transition"
    >
      Delete
    </button>
  );
}
