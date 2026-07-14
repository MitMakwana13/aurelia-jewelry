"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

export function AccountNav() {
  const pathname = usePathname();

  return (
    <div className="w-full md:w-64 shrink-0">
      <h2 className="font-serif text-2xl mb-8">My Account</h2>
      <nav className="flex md:flex-col gap-6 md:gap-4 overflow-x-auto pb-4 md:pb-0 border-b md:border-b-0 border-border">
        <Link 
          href="/account/dashboard" 
          className={`text-xs uppercase tracking-[0.15em] whitespace-nowrap transition-colors ${pathname === "/account/dashboard" ? "text-ink font-medium" : "text-ink/60 hover:text-ink"}`}
        >
          Dashboard
        </Link>
        <Link 
          href="/account/inquiries" 
          className={`text-xs uppercase tracking-[0.15em] whitespace-nowrap transition-colors ${pathname === "/account/inquiries" ? "text-ink font-medium" : "text-ink/60 hover:text-ink"}`}
        >
          Inquiries
        </Link>
        <Link 
          href="/account/wishlist" 
          className={`text-xs uppercase tracking-[0.15em] whitespace-nowrap transition-colors ${pathname === "/account/wishlist" ? "text-ink font-medium" : "text-ink/60 hover:text-ink"}`}
        >
          Wishlist
        </Link>
        <Link 
          href="/account/profile" 
          className={`text-xs uppercase tracking-[0.15em] whitespace-nowrap transition-colors ${pathname === "/account/profile" ? "text-ink font-medium" : "text-ink/60 hover:text-ink"}`}
        >
          Profile
        </Link>
        <button 
          onClick={() => signOut({ callbackUrl: "/account" })}
          className="text-left text-xs uppercase tracking-[0.15em] whitespace-nowrap text-ink/60 hover:text-ink transition-colors"
        >
          Log Out
        </button>
      </nav>
    </div>
  );
}
