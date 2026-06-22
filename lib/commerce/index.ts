import { prismaAdapter } from "./prisma-adapter";
import { shopifyAdapter } from "./shopify-adapter";
import type { CommerceAdapter } from "./types";

const adapterName = process.env.COMMERCE_ADAPTER ?? "prisma";

export const commerce: CommerceAdapter =
  adapterName === "shopify" ? shopifyAdapter : prismaAdapter;

export * from "./types";
