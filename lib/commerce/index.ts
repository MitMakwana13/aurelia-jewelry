import { prismaAdapter } from "./prisma-adapter";
import { shopifyAdapter } from "./shopify-adapter";
import { mockAdapter } from "./mock-adapter";
import type { CommerceAdapter } from "./types";

const adapterName = process.env.COMMERCE_ADAPTER ?? "mock"; // Default to mock to serve static bespoke data

export const commerce: CommerceAdapter =
  adapterName === "shopify" ? shopifyAdapter :
  adapterName === "prisma" ? prismaAdapter :
  mockAdapter;

export * from "./types";
