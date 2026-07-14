"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AccountPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ── Login handler ──────────────────────────────────────────────────────
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);
    if (result?.error) {
      // Differentiate between admin-only accounts and wrong credentials
      setError("Invalid email or password. Please try again.");
    } else {
      router.push("/account/orders");
    }
  };

  // ── Register handler ───────────────────────────────────────────────────
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);

    const password = form.get("password") as string;
    const confirm = form.get("confirmPassword") as string;
    if (password !== confirm) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: form.get("fullName"),
        email: form.get("email"),
        phone: form.get("phone"),
        password,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Registration failed. Please try again.");
      return;
    }

    setSuccess("Account created! Signing you in…");

    // Auto sign-in after registration
    await signIn("credentials", {
      email: form.get("email"),
      password,
      redirect: false,
    });
    router.push("/account/orders");
  };

  return (
    <div className="container-x py-20">
      <div className="mx-auto max-w-md">
        {/* Mode Toggle */}
        <div className="flex mb-10 border-b border-border">
          {(["login", "register"] as const).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(""); setSuccess(""); }}
              className={`flex-1 pb-3 text-[10px] uppercase tracking-[0.2em] transition-colors ${
                mode === m
                  ? "border-b-2 border-ink text-ink"
                  : "text-ink/40 hover:text-ink"
              }`}
            >
              {m === "login" ? "Sign In" : "Create Account"}
            </button>
          ))}
        </div>

        <h1 className="font-serif text-4xl text-center mb-2">
          {mode === "login" ? "Welcome Back" : "Join the Circle"}
        </h1>
        <p className="text-center text-sm text-ink/50 mb-10">
          {mode === "login"
            ? "Sign in to access your orders and wishlist."
            : "Members receive early access, exclusive pieces, and free shipping."}
        </p>

        {/* ── LOGIN FORM ─────────────────────────────────────────────────── */}
        {mode === "login" && (
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.18em] text-ink/50 mb-2">Email</label>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="priya@example.com"
                className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-ink bg-transparent transition"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.18em] text-ink/50 mb-2">Password</label>
              <input
                name="password"
                type="password"
                required
                minLength={8}
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-ink bg-transparent transition"
              />
            </div>

            {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-2">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-ink text-cream py-4 text-[11px] uppercase tracking-[0.25em] hover:bg-ink/90 transition disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>

            <Link href="/account/forgot-password" className="block text-center text-xs text-ink/40 hover:text-ink underline underline-offset-4 transition-colors">
              Forgot your password?
            </Link>
          </form>
        )}

        {/* ── REGISTER FORM ──────────────────────────────────────────────── */}
        {mode === "register" && (
          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.18em] text-ink/50 mb-2">Full Name</label>
              <input
                name="fullName"
                required
                placeholder="Priya Sharma"
                className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-ink bg-transparent transition"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.18em] text-ink/50 mb-2">Email</label>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="priya@example.com"
                className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-ink bg-transparent transition"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.18em] text-ink/50 mb-2">Phone (optional)</label>
              <input
                name="phone"
                type="tel"
                placeholder="+91 98765 43210"
                className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-ink bg-transparent transition"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.18em] text-ink/50 mb-2">Password</label>
              <input
                name="password"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                placeholder="Min. 8 characters"
                className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-ink bg-transparent transition"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.18em] text-ink/50 mb-2">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                placeholder="Re-enter password"
                className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-ink bg-transparent transition"
              />
            </div>

            {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-2">{error}</p>}
            {success && <p className="text-sm text-[#053624] bg-green-50 border border-green-200 px-4 py-2">{success}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-ink text-cream py-4 text-[11px] uppercase tracking-[0.25em] hover:bg-ink/90 transition disabled:opacity-60"
            >
              {loading ? "Creating Account…" : "Create Account"}
            </button>

            <p className="text-[10px] text-center text-ink/30 leading-relaxed">
              By creating an account, you agree to our Terms of Service and Privacy Policy.
            </p>
          </form>
        )}

        {/* Quick Links */}
        <div className="mt-12 grid grid-cols-3 gap-4 border-t border-border pt-8 text-center">
          <Link href="/account/orders" className="block text-xs uppercase tracking-[0.18em] hover:underline underline-offset-4 text-ink/60 hover:text-ink">Orders</Link>
          <Link href="/account/wishlist" className="block text-xs uppercase tracking-[0.18em] hover:underline underline-offset-4 text-ink/60 hover:text-ink">Wishlist</Link>
          <Link href="/help/faq" className="block text-xs uppercase tracking-[0.18em] hover:underline underline-offset-4 text-ink/60 hover:text-ink">Help</Link>
        </div>
      </div>
    </div>
  );
}
