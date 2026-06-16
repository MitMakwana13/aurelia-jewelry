import type { CommerceAdapter } from "./types";

// Stub Shopify Storefront adapter. Drop in your fetch calls to the
// Shopify Storefront GraphQL API and map responses into the shared types.
// Required env: SHOPIFY_STORE_DOMAIN, SHOPIFY_STOREFRONT_TOKEN.

const notWired = (method: string) => {
  throw new Error(
    `[shopify-adapter] ${method} is not implemented yet. ` +
      `Wire it to the Shopify Storefront API or keep COMMERCE_ADAPTER=mock.`
  );
};

export const shopifyAdapter: CommerceAdapter = {
  async getProducts() {
    notWired("getProducts");
    return [];
  },
  async getProduct() {
    notWired("getProduct");
    return null;
  },
  async getCategories() {
    notWired("getCategories");
    return [];
  },
  async getCategory() {
    notWired("getCategory");
    return null;
  },
  async getCollections() {
    notWired("getCollections");
    return [];
  },
  async getCollection() {
    notWired("getCollection");
    return null;
  },
  async searchProducts() {
    notWired("searchProducts");
    return [];
  },
};
