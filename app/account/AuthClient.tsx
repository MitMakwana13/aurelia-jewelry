"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export default function AuthClient() {
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
      router.push("/account/dashboard");
      router.refresh(); // Ensure the layout refreshes session state
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
    router.push("/account/dashboard");
    router.refresh(); // Ensure layout refreshes session state
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

        {/* Google OAuth Button */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/account/dashboard" })}
          className="mt-6 w-full flex items-center justify-center gap-3 border border-border py-3.5 text-[11px] uppercase tracking-[0.2em] text-ink hover:border-ink hover:bg-cream-warm transition-all duration-300"
        >
          <GoogleIcon />
          Continue with Google
        </button>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-border" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-ink/30">or</span>
          <div className="flex-1 h-px bg-border" />
        </div>
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
                placeholder="+91 79840 62415"
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

      </div>
    </div>
  );
}
