"use client";

import { useState } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/plp/Breadcrumbs";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong");
      setSent(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-x py-10 md:py-20">
      <div className="mx-auto max-w-md">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Account", href: "/account" }, { label: "Reset Password" }]} />

        <h1 className="font-serif text-3xl text-center mt-8 mb-4">Reset Password</h1>

        {sent ? (
          <div className="text-center py-8 space-y-4">
            {/* Success state */}
            <div className="w-16 h-16 mx-auto rounded-full bg-green-50 border border-green-200 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="font-serif text-xl text-ink">Check your inbox</p>
            <p className="text-sm text-ink/60 max-w-xs mx-auto">
              A password reset link has been sent to <strong>{email}</strong>. Check your inbox and spam folder.
            </p>
            <div className="pt-6 border-t border-border mt-8">
              <Link href="/account" className="text-xs uppercase tracking-[0.15em] hover:underline underline-offset-4 text-ink/60 hover:text-ink transition-colors">
                Return to Sign In
              </Link>
            </div>
          </div>
        ) : (
          <>
            <p className="text-center text-sm text-ink/60 mb-10">
              Enter your registered email address and we'll send you a secure link to reset your password.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.18em] text-ink/50 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="priya@example.com"
                  autoComplete="email"
                  className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-ink bg-transparent transition"
                />
              </div>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-2">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-ink text-cream py-4 text-[11px] uppercase tracking-[0.25em] hover:bg-ink/90 transition disabled:opacity-60"
              >
                {loading ? "Sending…" : "Send Reset Link"}
              </button>
            </form>

            <div className="mt-10 text-center border-t border-border pt-8">
              <Link href="/account" className="text-xs uppercase tracking-[0.15em] hover:underline underline-offset-4 text-ink/60 hover:text-ink transition-colors">
                Return to Sign In
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
