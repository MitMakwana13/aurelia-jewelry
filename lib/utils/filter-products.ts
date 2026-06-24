import type { Product } from "@/lib/commerce/types";

export type ProductFilters = {
  metal?: string;
  tag?: string;
  type?: string;
  price?: string;
  sort?: string;
  filter?: string;
};

export function filterAndSort(products: Product[], filters: ProductFilters): Product[] {
  let list = [...products];

  if (filters.metal) {
    list = list.filter((p) => p.metals.includes(filters.metal!));
  }
  if (filters.tag) {
    list = list.filter((p) => p.tags.includes(filters.tag!) || p.categorySlug === filters.tag);
  }
  // Gemstone type filter — e.g. ?type=ruby filters by that specific tag
  if (filters.type) {
    list = list.filter((p) => p.tags.includes(filters.type!));
  }
  if (filters.price) {
    const [min, max] = filters.price.split("-").map(Number);
    list = list.filter((p) => p.priceRange.min.amount >= min && p.priceRange.min.amount <= max);
  }
  if (filters.filter === "new") {
    list = list.filter((p) => p.newArrival);
  }

  switch (filters.sort) {
    case "price-asc":
      list.sort((a, b) => a.priceRange.min.amount - b.priceRange.min.amount);
      break;
    case "price-desc":
      list.sort((a, b) => b.priceRange.max.amount - a.priceRange.max.amount);
      break;
    case "bestseller":
      list.sort((a, b) => Number(!!b.bestseller) - Number(!!a.bestseller));
      break;
    case "new":
      list.sort((a, b) => Number(!!b.newArrival) - Number(!!a.newArrival));
      break;
    default:
      list.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
  }
  return list;
}
