"use client";

import Link from "next/link";
import { useState } from "react";

export default function AccountPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="container-x py-16">
      <div className="mx-auto max-w-md">
        <h1 className="font-serif text-4xl text-center">
          {mode === "login" ? "Sign In" : "Create an Account"}
        </h1>
        <p className="mt-3 text-center text-sm text-ink-muted">
          {mode === "login"
            ? "Welcome back. Sign in to access your orders and wishlist."
            : "Join the Circle for early access, members-only pieces, and free shipping."}
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 2500);
          }}
          className="mt-10 space-y-5"
        >
          {mode === "register" && (
            <label className="block">
              <span className="eyebrow">Name</span>
              <input className="input-base" required />
            </label>
          )}
          <label className="block">
            <span className="eyebrow">Email</span>
            <input type="email" className="input-base" required autoComplete="email" />
          </label>
          <label className="block">
            <span className="eyebrow">Password</span>
            <input type="password" className="input-base" required minLength={8} autoComplete={mode === "login" ? "current-password" : "new-password"} />
          </label>
          {mode === "login" && (
            <Link href="#" className="block text-xs underline underline-offset-2 text-ink-muted">
              Forgot password?
            </Link>
          )}
          <button type="submit" className="btn-primary w-full">
            {mode === "login" ? "Sign In" : "Create Account"}
          </button>
          {submitted && (
            <p className="text-center text-xs text-ink-muted">
              (Demo) Auth endpoint not wired — see <code>/lib/commerce/shopify-adapter.ts</code> to integrate.
            </p>
          )}
        </form>

        <p className="mt-8 text-center text-sm">
          {mode === "login" ? (
            <>
              New to Aurelia?{" "}
              <button onClick={() => setMode("register")} className="underline underline-offset-2">Create an account</button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button onClick={() => setMode("login")} className="underline underline-offset-2">Sign in</button>
            </>
          )}
        </p>

        <div className="mt-12 grid grid-cols-3 gap-4 border-t border-border pt-8 text-center">
          <Link href="/account/orders" className="block text-xs uppercase tracking-[0.18em] hover:underline">Orders</Link>
          <Link href="/account/wishlist" className="block text-xs uppercase tracking-[0.18em] hover:underline">Wishlist</Link>
          <Link href="/help/faq" className="block text-xs uppercase tracking-[0.18em] hover:underline">Help</Link>
        </div>
      </div>
    </div>
  );
}
