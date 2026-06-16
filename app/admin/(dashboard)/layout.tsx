"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: "⊞" },
  { label: "Products", href: "/admin/products", icon: "◈" },
  { label: "Orders", href: "/admin/orders", icon: "◉" },
  { label: "Custom Requests", href: "/admin/custom-requests", icon: "✦" },
  { label: "View Site", href: "/", icon: "↗", external: true },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-cream-warm flex items-center justify-center">
        <div className="font-serif text-2xl text-ink/40 animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-[#fafaf8] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-ink text-cream flex flex-col min-h-screen fixed left-0 top-0">
        {/* Logo */}
        <div className="px-6 py-6 border-b border-cream/10">
          <Logo variant="dark" />
          <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-cream/50">Admin Panel</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                className={`flex items-center gap-3 px-4 py-3 text-sm transition rounded-sm ${
                  isActive
                    ? "bg-cream/10 text-cream"
                    : "text-cream/60 hover:text-cream hover:bg-cream/5"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="px-6 py-5 border-t border-cream/10">
          <p className="text-xs text-cream/50 truncate">{session.user?.email}</p>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="mt-2 text-xs text-cream/60 hover:text-cream transition uppercase tracking-[0.14em]"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 min-h-screen p-8">
        {children}
      </main>
    </div>
  );
}
