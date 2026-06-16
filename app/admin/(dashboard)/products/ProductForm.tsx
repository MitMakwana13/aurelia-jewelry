"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ProductFormData = {
  title: string;
  handle: string;
  description: string;
  categorySlug: string;
  basePrice: string;
  tags: string;
  metals: string;
  featured: boolean;
  trending: boolean;
  newArrival: boolean;
  bestseller: boolean;
};

interface ProductFormProps {
  initialData?: Partial<ProductFormData> & { id?: string };
  mode: "create" | "edit";
}

export function ProductForm({ initialData, mode }: ProductFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<ProductFormData>({
    title: initialData?.title ?? "",
    handle: initialData?.handle ?? "",
    description: initialData?.description ?? "",
    categorySlug: initialData?.categorySlug ?? "gemstones",
    basePrice: String(initialData?.basePrice ?? ""),
    tags: initialData?.tags ?? "",
    metals: initialData?.metals ?? "",
    featured: initialData?.featured ?? false,
    trending: initialData?.trending ?? false,
    newArrival: initialData?.newArrival ?? false,
    bestseller: initialData?.bestseller ?? false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
      // Auto-generate handle from title
      if (name === "title" && mode === "create") {
        setForm((prev) => ({
          ...prev,
          title: value,
          handle: value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      ...form,
      basePrice: parseFloat(form.basePrice),
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      metals: form.metals.split(",").map((m) => m.trim()).filter(Boolean),
      sizes: [],
      collectionSlugs: [],
      images: [],
    };

    const url = mode === "create" ? "/api/admin/products" : `/api/admin/products/${initialData?.id}`;
    const method = mode === "create" ? "POST" : "PATCH";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to save product");
      router.push("/admin/products");
      router.refresh();
    } catch {
      setError("Failed to save product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const CATEGORIES = [
    "gemstones", "diamonds", "rings", "necklaces", "earrings",
    "bracelets", "bangles", "pendants",
  ];

  const Field = ({ label, name, type = "text", placeholder }: { label: string; name: keyof ProductFormData; type?: string; placeholder?: string }) => (
    <div className="space-y-1">
      <label className="text-xs uppercase tracking-[0.16em] text-ink/60">{label}</label>
      <input name={name} type={type} value={String(form[name])} onChange={handleChange} placeholder={placeholder}
        className="w-full border border-ink/20 px-4 py-3 text-sm outline-none focus:border-ink transition bg-transparent" />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">{error}</div>}

      <div className="grid grid-cols-2 gap-5">
        <Field label="Product Title *" name="title" placeholder="e.g. Natural Ruby — 2.5ct" />
        <Field label="URL Handle *" name="handle" placeholder="natural-ruby-2-5ct" />
      </div>

      <div className="space-y-1">
        <label className="text-xs uppercase tracking-[0.16em] text-ink/60">Description *</label>
        <textarea name="description" rows={4} value={form.description} onChange={handleChange}
          placeholder="Describe the product — quality, origin, certifications..."
          className="w-full border border-ink/20 px-4 py-3 text-sm outline-none focus:border-ink transition bg-transparent resize-none" />
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="space-y-1">
          <label className="text-xs uppercase tracking-[0.16em] text-ink/60">Category *</label>
          <select name="categorySlug" value={form.categorySlug} onChange={handleChange}
            className="w-full border border-ink/20 px-4 py-3 text-sm bg-transparent outline-none focus:border-ink transition capitalize">
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <Field label="Base Price (₹) *" name="basePrice" type="number" placeholder="e.g. 25000" />
      </div>

      <Field label="Tags (comma-separated)" name="tags" placeholder="ruby, natural, certified, oval" />
      <Field label="Metal / Material Options (comma-separated)" name="metals" placeholder="Gold, Silver, Platinum" />

      {/* Flags */}
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.16em] text-ink/60">Display Flags</p>
        <div className="flex flex-wrap gap-5">
          {(["featured", "trending", "newArrival", "bestseller"] as const).map((flag) => (
            <label key={flag} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name={flag} checked={form[flag] as boolean} onChange={handleChange}
                className="w-4 h-4 border border-ink/30 accent-ink" />
              <span className="text-sm capitalize">{flag.replace(/([A-Z])/g, " $1")}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex gap-4 pt-4 border-t border-ink/10">
        <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60">
          {loading ? "Saving..." : mode === "create" ? "Create Product" : "Save Changes"}
        </button>
        <button type="button" onClick={() => router.back()} className="text-xs uppercase tracking-[0.14em] text-ink/50 hover:text-ink transition">
          Cancel
        </button>
      </div>
    </form>
  );
}
