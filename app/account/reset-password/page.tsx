"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/plp/Breadcrumbs";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!token) {
    return (
      <div className="text-center">
        <p className="text-sm text-red-600 mb-6">Invalid or missing reset token.</p>
        <Link href="/account/forgot-password" className="btn-primary">Request a New Link</Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const form = new FormData(e.currentTarget);
    const password = form.get("password") as string;
    const confirm = form.get("confirmPassword") as string;

    if (password !== confirm) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to reset password.");
      } else {
        setSuccess("Your password has been successfully reset. You can now sign in.");
        setTimeout(() => {
          router.push("/account");
        }, 3000);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-[10px] uppercase tracking-[0.18em] text-ink/50 mb-2">New Password</label>
        <input
          name="password"
          type="password"
          required
          minLength={8}
          placeholder="••••••••"
          className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-ink bg-transparent transition"
        />
      </div>
      <div>
        <label className="block text-[10px] uppercase tracking-[0.18em] text-ink/50 mb-2">Confirm New Password</label>
        <input
          name="confirmPassword"
          type="password"
          required
          minLength={8}
          placeholder="••••••••"
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
        {loading ? "Resetting..." : "Reset Password"}
      </button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="container-x py-10 md:py-20">
      <div className="mx-auto max-w-md">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Account", href: "/account" }, { label: "Reset Password" }]} />
        
        <h1 className="font-serif text-3xl text-center mt-8 mb-10">Reset Your Password</h1>
        
        <Suspense fallback={<div className="text-center text-sm">Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>

      </div>
    </div>
  );
}
