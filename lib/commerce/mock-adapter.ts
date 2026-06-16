import { categories } from "@/data/categories";
import { collections } from "@/data/collections";
import { products } from "@/data/products";
import type { CommerceAdapter } from "./types";

export const mockAdapter: CommerceAdapter = {
  async getProducts(opts = {}) {
    let list = [...products];
    if (opts.category) list = list.filter((p) => p.categorySlug === opts.category);
    if (opts.collection) list = list.filter((p) => p.collectionSlugs.includes(opts.collection!));
    if (opts.limit) list = list.slice(0, opts.limit);
    return list;
  },

  async getProduct(handle) {
    return products.find((p) => p.handle === handle) ?? null;
  },

  async getCategories() {
    return categories;
  },

  async getCategory(slug) {
    return categories.find((c) => c.slug === slug) ?? null;
  },

  async getCollections() {
    return collections;
  },

  async getCollection(slug) {
    return collections.find((c) => c.slug === slug) ?? null;
  },

  async searchProducts(query) {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return products.filter((p) =>
      [p.title, p.description, ...p.tags, p.categorySlug].some((s) => s.toLowerCase().includes(q))
    );
  },
};
