import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const isBuild = process.env.NEXT_PHASE === "phase-production-build";

export const prisma = isBuild
  ? (new Proxy({}, {
      get(target, prop) {
        if (prop === "$connect") return async () => {};
        if (prop === "$disconnect") return async () => {};
        return new Proxy({}, {
          get(target2, prop2) {
            return async () => {
              if (prop2.toString().startsWith("findMany")) return [];
              if (prop2.toString().startsWith("count")) return 0;
              return null;
            };
          },
        });
      },
    }) as unknown as PrismaClient)
  : (globalForPrisma.prisma ||
    new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    }));

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
