"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: "⊞" },
  { label: "Products", href: "/admin/products", icon: "◈" },
  { label: "Inquiries", href: "/admin/inquiries", icon: "✉" },
  { label: "Orders", href: "/admin/orders", icon: "◉" },
  { label: "Settings", href: "/admin/settings", icon: "⚙" },
  { label: "View Site", href: "/", icon: "↗", external: true },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  // Close sidebar on pathname change
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-cream-warm flex items-center justify-center">
        <div className="font-serif text-2xl text-ink/40 animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-[#fafaf8] flex flex-col lg:flex-row">
      {/* Mobile Sticky Header */}
      <header className="lg:hidden sticky top-0 left-0 right-0 h-16 bg-ink text-cream border-b border-cream/10 px-4 flex items-center justify-between z-30">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-10 h-10 flex items-center justify-center text-cream/80 hover:text-cream text-2xl focus:outline-none"
            aria-label="Open menu"
          >
            ☰
          </button>
          <div className="scale-75 origin-left">
            <Logo variant="dark" />
          </div>
        </div>
        <div className="text-[9px] uppercase tracking-wider bg-cream/10 px-2.5 py-1 text-cream/70 rounded-full font-medium">
          Admin
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-ink/40 backdrop-blur-xs z-40 transition-opacity"
        />
      )}

      {/* Sidebar - Desktop and Mobile Drawer Panel */}
      <aside
        className={`w-64 bg-ink text-cream flex flex-col min-h-screen lg:min-h-0 fixed lg:sticky left-0 top-0 bottom-0 z-50 lg:z-10 transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Mobile Close Button */}
        <div className="lg:hidden absolute top-4 right-4">
          <button
            onClick={() => setSidebarOpen(false)}
            className="w-8 h-8 flex items-center justify-center text-cream/60 hover:text-cream text-xl focus:outline-none"
          >
            ✕
          </button>
        </div>

        {/* Logo */}
        <div className="px-6 py-6 border-b border-cream/10">
          <Logo variant="dark" />
          <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-cream/50">Admin Panel</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
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

        {/* User / Sign Out */}
        <div className="px-6 py-5 border-t border-cream/10">
          <p className="text-xs text-cream/50 truncate mb-1">{session.user?.email}</p>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="w-full text-left text-xs text-red-400 hover:text-red-300 transition uppercase tracking-[0.14em] font-medium"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen p-4 sm:p-6 lg:p-8 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
