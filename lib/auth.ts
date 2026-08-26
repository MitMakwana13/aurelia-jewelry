import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";



if (!process.env.NEXTAUTH_URL) {
  if (process.env.VERCEL_URL) {
    process.env.NEXTAUTH_URL = `https://${process.env.VERCEL_URL}`;
  } else if (process.env.NEXT_PUBLIC_SITE_URL) {
    process.env.NEXTAUTH_URL = process.env.NEXT_PUBLIC_SITE_URL;
  } else {
    process.env.NEXTAUTH_URL = "http://localhost:3000";
  }
}

if (!process.env.NEXTAUTH_SECRET) {
  process.env.NEXTAUTH_SECRET = "a7419e3e13dff83bddc29424cb652782dfdc86d0f9e719bb65ab3dbab7eee3e0";
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        adminOnly: { label: "Admin Only", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Fail-safe auto-seed/sync for primary admin account
        if (
          credentials.email === "radharanigemstone@gmail.com" &&
          credentials.password === "RadhaRani@2025"
        ) {
          try {
            const hashedPassword = await bcrypt.hash("RadhaRani@2025", 12);
            const admin = await prisma.user.upsert({
              where: { email: "radharanigemstone@gmail.com" },
              update: { password: hashedPassword, role: "ADMIN" },
              create: {
                email: "radharanigemstone@gmail.com",
                password: hashedPassword,
                role: "ADMIN",
                fullName: "Admin",
              },
            });
            return {
              id: admin.id,
              email: admin.email,
              name: admin.fullName ?? "Admin",
              role: admin.role,
            };
          } catch (e) {
            console.error("Admin auto-seed error:", e);
          }
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        if (credentials.adminOnly === "true") {
          if (user.role !== "ADMIN" || (user.email !== "radharanigemstone@gmail.com" && user.email !== "admin@radharanigemstone.com")) return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.fullName ?? undefined,
          role: user.role,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, account }) {
      if (user.email) {
        try {
          const existing = await prisma.user.findUnique({ where: { email: user.email } });
          if (!existing && account?.provider === "google") {
            await prisma.user.create({
              data: {
                email: user.email,
                fullName: user.name ?? "",
                password: "",
                role: "CUSTOMER",
                lastLogin: new Date(),
              },
            });
          } else if (existing) {
            await prisma.user.update({
              where: { email: user.email },
              data: { lastLogin: new Date() },
            });
          }
        } catch (e) {
          console.error("Sign-in DB error:", e);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { id: string; email: string; role: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string; role?: string }).id = token.id as string;
        (session.user as { id?: string; role?: string }).role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/account",
  },
  secret: process.env.NEXTAUTH_SECRET || "a7419e3e13dff83bddc29424cb652782dfdc86d0f9e719bb65ab3dbab7eee3e0",
};
