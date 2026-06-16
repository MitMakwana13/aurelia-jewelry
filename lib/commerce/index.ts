import { mockAdapter } from "./mock-adapter";
import { shopifyAdapter } from "./shopify-adapter";
import type { CommerceAdapter } from "./types";

const adapterName = process.env.COMMERCE_ADAPTER ?? "mock";

export const commerce: CommerceAdapter =
  adapterName === "shopify" ? shopifyAdapter : mockAdapter;

export * from "./types";
