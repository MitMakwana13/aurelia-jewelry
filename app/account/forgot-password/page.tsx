"use client";

import { useState } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/plp/Breadcrumbs";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to request password reset.");
      } else {
        setSuccess("If that email address is in our system, you will receive a password reset link shortly.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-x py-10 md:py-20">
      <div className="mx-auto max-w-md">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Account", href: "/account" }, { label: "Forgot Password" }]} />
        
        <h1 className="font-serif text-3xl text-center mt-8 mb-4">Reset Password</h1>
        <p className="text-center text-sm text-ink/60 mb-10">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.18em] text-ink/50 mb-2">Email</label>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="Enter your email"
              className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-ink bg-transparent transition"
            />
          </div>

          {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-3">{error}</p>}
          {success && <p className="text-sm text-[#053624] bg-green-50 border border-green-200 px-4 py-3">{success}</p>}

          <button
            type="submit"
            disabled={loading || !!success}
            className="w-full bg-ink text-cream py-4 text-[11px] uppercase tracking-[0.25em] hover:bg-ink/90 transition disabled:opacity-60"
          >
            {loading ? "Sending link..." : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-12 text-center border-t border-border pt-8">
          <Link href="/account" className="text-xs uppercase tracking-[0.15em] hover:underline underline-offset-4 text-ink/60 hover:text-ink transition-colors">
            Return to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
