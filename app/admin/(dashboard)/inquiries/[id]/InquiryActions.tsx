"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const STATUSES = ["NEW", "IN_PROGRESS", "QUOTED", "CONFIRMED", "COMPLETED", "CANCELLED"];
const PRIORITIES = ["LOW", "NORMAL", "HIGH", "URGENT"];

interface Inquiry {
  id: string;
  status: string;
  priority: string;
  notes: string | null;
  quotedAmount: number | null;
  advancePaid: number | null;
  assignedTo: string | null;
}

export function InquiryActions({ inquiry }: { inquiry: Inquiry }) {
  const router = useRouter();
  const [status, setStatus] = useState(inquiry.status);
  const [priority, setPriority] = useState(inquiry.priority);
  const [notes, setNotes] = useState(inquiry.notes ?? "");
  const [quotedAmount, setQuotedAmount] = useState(inquiry.quotedAmount?.toString() ?? "");
  const [advancePaid, setAdvancePaid] = useState(inquiry.advancePaid?.toString() ?? "");
  const [assignedTo, setAssignedTo] = useState(inquiry.assignedTo ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      await fetch(`/api/admin/inquiries/${inquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          priority,
          notes,
          quotedAmount: quotedAmount ? parseFloat(quotedAmount) : null,
          advancePaid: advancePaid ? parseFloat(advancePaid) : null,
          assignedTo,
        }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      router.refresh();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white border border-ink/8 p-6 rounded-sm space-y-5">
      <h2 className="font-serif text-lg text-ink">Admin Panel</h2>

      <div className="space-y-1">
        <label className="text-[10px] uppercase tracking-wider text-ink/50">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border border-ink/20 px-3 py-2.5 text-sm outline-none focus:border-ink bg-white"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s.replace("_", " ")}</option>
          ))}
        </select>
      </div>

      <div className="space-y-1">
        <label className="text-[10px] uppercase tracking-wider text-ink/50">Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full border border-ink/20 px-3 py-2.5 text-sm outline-none focus:border-ink bg-white"
        >
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      <div className="space-y-1">
        <label className="text-[10px] uppercase tracking-wider text-ink/50">Quoted Amount (₹)</label>
        <input
          type="number"
          value={quotedAmount}
          onChange={(e) => setQuotedAmount(e.target.value)}
          placeholder="e.g. 250000"
          className="w-full border border-ink/20 px-3 py-2.5 text-sm outline-none focus:border-ink"
        />
      </div>

      <div className="space-y-1">
        <label className="text-[10px] uppercase tracking-wider text-ink/50">Advance Paid (₹)</label>
        <input
          type="number"
          value={advancePaid}
          onChange={(e) => setAdvancePaid(e.target.value)}
          placeholder="e.g. 125000"
          className="w-full border border-ink/20 px-3 py-2.5 text-sm outline-none focus:border-ink"
        />
      </div>

      <div className="space-y-1">
        <label className="text-[10px] uppercase tracking-wider text-ink/50">Assigned To</label>
        <input
          type="text"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          placeholder="Staff name"
          className="w-full border border-ink/20 px-3 py-2.5 text-sm outline-none focus:border-ink"
        />
      </div>

      <div className="space-y-1">
        <label className="text-[10px] uppercase tracking-wider text-ink/50">Internal Notes</label>
        <textarea
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add notes visible only to admin..."
          className="w-full border border-ink/20 px-3 py-2.5 text-sm outline-none focus:border-ink resize-none"
        />
      </div>

      <button
        onClick={save}
        disabled={saving}
        className="w-full bg-ink text-white py-3 text-[11px] uppercase tracking-wider hover:bg-ink/80 transition disabled:opacity-60"
      >
        {saving ? "Saving..." : saved ? "Saved ✓" : "Save Changes"}
      </button>
    </div>
  );
}
