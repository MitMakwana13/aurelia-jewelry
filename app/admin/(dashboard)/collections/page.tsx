"use client";

import { useEffect, useState } from "react";

interface Collection {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  productCount: number;
}

interface Product {
  id: string;
  title: string;
  collectionSlugs: string[];
}

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCollection, setActiveCollection] = useState<Collection | null>(null);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/collections").then((res) => res.json()),
      fetch("/api/admin/products?limit=100").then((res) => res.json()),
    ])
      .then(([colsData, prodsData]) => {
        setCollections(colsData);
        setProducts(prodsData.products || prodsData || []);
      })
      .catch((err) => console.error("Failed to load collections data:", err))
      .finally(() => setLoading(false));
  }, []);

  const openManager = (col: Collection) => {
    setActiveCollection(col);
    // Find all products that have this collection slug
    const ids = products
      .filter((p) => p.collectionSlugs.includes(col.slug))
      .map((p) => p.id);
    setSelectedProductIds(ids);
    setMessage(null);
  };

  const toggleProduct = (productId: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const handleSave = async () => {
    if (!activeCollection) return;
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/collections", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: activeCollection.slug,
          productIds: selectedProductIds,
        }),
      });

      if (!res.ok) throw new Error("Failed to save");

      // Update local products list to match the saved state
      setProducts((prev) =>
        prev.map((p) => {
          const isSelected = selectedProductIds.includes(p.id);
          const hasSlug = p.collectionSlugs.includes(activeCollection.slug);

          let newSlugs = [...p.collectionSlugs];
          if (isSelected && !hasSlug) {
            newSlugs.push(activeCollection.slug);
          } else if (!isSelected && hasSlug) {
            newSlugs = newSlugs.filter((s) => s !== activeCollection.slug);
          }

          return { ...p, collectionSlugs: newSlugs };
        })
      );

      // Re-fetch counts
      const updatedCols = await fetch("/api/admin/collections").then((res) => res.json());
      setCollections(updatedCols);

      setMessage("Collection products updated successfully.");
      setTimeout(() => setActiveCollection(null), 1500);
    } catch (err) {
      console.error(err);
      setMessage("Failed to update collection products.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#c49a45] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl text-ink">Collections Management</h1>
        <p className="text-sm text-ink/50 mt-1">Organize products into curated thematic sets.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((col) => (
          <div key={col.slug} className="bg-white border border-ink/10 p-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between border-b border-ink/5 pb-2">
                <h2 className="font-serif text-lg text-ink font-semibold">{col.name}</h2>
                <span className="bg-[#053624]/10 text-[#053624] px-2 py-0.5 text-[8px] uppercase tracking-wider font-semibold rounded-full">
                  {col.productCount} pieces
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-wider text-[#c49a45] mt-2 font-medium">{col.tagline}</p>
              <p className="text-xs text-ink/60 mt-1 leading-relaxed line-clamp-2">{col.description}</p>
            </div>

            <button
              onClick={() => openManager(col)}
              className="w-full border border-ink/20 py-2.5 text-[10px] uppercase tracking-wider text-ink hover:bg-ink hover:text-white transition duration-300 font-semibold text-center"
            >
              Manage Products
            </button>
          </div>
        ))}
      </div>

      {/* Modal/Drawer for managing collection products */}
      {activeCollection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 backdrop-blur-sm p-4">
          <div className="bg-cream-light border border-ink/10 max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-ink/5 flex justify-between items-center">
              <div>
                <h3 className="font-serif text-xl text-ink">Manage {activeCollection.name}</h3>
                <p className="text-[10px] uppercase tracking-wider text-ink/40 font-semibold">{activeCollection.tagline}</p>
              </div>
              <button
                onClick={() => setActiveCollection(null)}
                className="text-ink hover:opacity-60 text-lg"
              >
                ✕
              </button>
            </div>

            {message && (
              <div className="mx-6 mt-4 p-3 text-[10px] uppercase tracking-wider font-semibold text-center bg-[#053624]/10 text-[#053624] border border-[#053624]/20">
                {message}
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <p className="text-xs text-ink/60 mb-2">Select the products you want to assign to this collection:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {products.map((prod) => {
                  const isSelected = selectedProductIds.includes(prod.id);
                  return (
                    <button
                      key={prod.id}
                      onClick={() => toggleProduct(prod.id)}
                      className={`flex items-center justify-between p-3 border text-left transition duration-300 ${
                        isSelected
                          ? "border-[#053624] bg-[#053624]/5 text-ink"
                          : "border-ink/10 hover:border-ink/30 text-ink/70"
                      }`}
                    >
                      <span className="text-xs font-medium">{prod.title}</span>
                      <span
                        className={`h-4 w-4 border flex items-center justify-center text-[10px] rounded-sm ${
                          isSelected ? "bg-[#053624] border-[#053624] text-white" : "border-ink/20"
                        }`}
                      >
                        {isSelected && "✓"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-6 border-t border-ink/5 flex justify-end gap-3 bg-white">
              <button
                onClick={() => setActiveCollection(null)}
                className="px-5 py-3 border border-ink/20 text-[10px] uppercase tracking-wider font-semibold hover:bg-cream-warm transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-[#053624] text-cream px-6 py-3 text-[10px] uppercase tracking-wider font-semibold hover:bg-ink transition disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Assignments"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
