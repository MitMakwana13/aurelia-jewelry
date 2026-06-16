"use client";

import { useState } from "react";
import { CloseIcon } from "@/components/ui/Icons";

type InquiryType = "GENERAL" | "GEMSTONE" | "DIAMOND" | "CUSTOM_JEWELRY";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId?: string;
  productName?: string;
  defaultType?: InquiryType;
}

const INQUIRY_TYPES: { value: InquiryType; label: string }[] = [
  { value: "GEMSTONE", label: "Gemstone" },
  { value: "DIAMOND", label: "Diamond" },
  { value: "CUSTOM_JEWELRY", label: "Custom Jewelry" },
  { value: "GENERAL", label: "General Inquiry" },
];

const BUDGETS = [
  "Under ₹10,000",
  "₹10,000 – ₹25,000",
  "₹25,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000 – ₹5,00,000",
  "Above ₹5,00,000",
];

export function InquiryModal({ isOpen, onClose, productId, productName, defaultType = "GENERAL" }: InquiryModalProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    type: defaultType,
    budget: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          productId,
          productName,
        }),
      });

      if (!res.ok) throw new Error("Submission failed");
      setSuccess(true);
    } catch {
      setError("Something went wrong. Please try WhatsApp or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-cream-light w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-ink text-cream px-6 py-5 flex items-start justify-between">
          <div>
            <h2 className="font-serif text-xl">Send Inquiry</h2>
            {productName ? (
              <p className="text-xs text-cream/70 mt-0.5">For: {productName}</p>
            ) : (
              <p className="text-xs text-cream/70 mt-0.5">Divine Energy, Timeless Luxury</p>
            )}
          </div>
          <button onClick={onClose} aria-label="Close" className="p-1 hover:opacity-70 transition mt-0.5">
            <CloseIcon width={18} height={18} />
          </button>
        </div>

        {success ? (
          <div className="px-6 py-12 text-center">
            <div className="text-4xl mb-4">✦</div>
            <h3 className="font-serif text-2xl text-ink mb-2">Thank You!</h3>
            <p className="text-sm text-ink/60 max-w-xs mx-auto">
              We have received your inquiry. Our team will contact you within 24 hours to discuss your requirements.
            </p>
            <p className="mt-4 text-xs text-ink/40">A 50% advance is required to begin crafting your piece.</p>
            <button onClick={onClose} className="mt-6 btn-primary">Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
            {/* Notice */}
            <div className="bg-amber-50 border border-amber-200 px-4 py-3 text-xs text-amber-800 leading-relaxed">
              <strong>How it works:</strong> Submit your inquiry → We contact you directly → 50% advance to confirm your order → Balance on delivery. <strong>Prepaid only.</strong>
            </div>

            {/* Inquiry Type */}
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-[0.16em] text-ink/60">Inquiry Type</label>
              <select name="type" value={form.type} onChange={handleChange} className="w-full border border-ink/20 px-4 py-3 text-sm bg-transparent outline-none focus:border-gold-dark transition">
                {INQUIRY_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>

            {/* Name */}
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-[0.16em] text-ink/60">Full Name *</label>
              <input name="name" required value={form.name} onChange={handleChange} placeholder="Your full name" className="w-full border border-ink/20 px-4 py-3 text-sm outline-none focus:border-gold-dark transition bg-transparent" />
            </div>

            {/* Phone + Email */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-[0.16em] text-ink/60">Phone *</label>
                <input name="phone" required type="tel" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" className="w-full border border-ink/20 px-4 py-3 text-sm outline-none focus:border-gold-dark transition bg-transparent" />
              </div>
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-[0.16em] text-ink/60">Email *</label>
                <input name="email" required type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className="w-full border border-ink/20 px-4 py-3 text-sm outline-none focus:border-gold-dark transition bg-transparent" />
              </div>
            </div>

            {/* Budget */}
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-[0.16em] text-ink/60">Budget Range</label>
              <select name="budget" value={form.budget} onChange={handleChange} className="w-full border border-ink/20 px-4 py-3 text-sm bg-transparent outline-none focus:border-gold-dark transition">
                <option value="">Select budget (optional)</option>
                {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>

            {/* Message */}
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-[0.16em] text-ink/60">Message / Requirements *</label>
              <textarea name="message" required rows={4} value={form.message} onChange={handleChange} placeholder="Describe what you're looking for — stone type, size, colour, occasion, or any specific design ideas..." className="w-full border border-ink/20 px-4 py-3 text-sm outline-none focus:border-gold-dark transition bg-transparent resize-none" />
            </div>

            {error && <p className="text-red-600 text-xs">{error}</p>}

            <button type="submit" disabled={loading} className="w-full btn-primary py-4 disabled:opacity-60">
              {loading ? "Sending..." : "Send Inquiry →"}
            </button>

            <p className="text-center text-xs text-ink/40">We respond within 24 hours · Prepaid only · No COD</p>
          </form>
        )}
      </div>
    </div>
  );
}
