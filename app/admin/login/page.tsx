"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/ui/Logo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);
    if (result?.error) {
      setError("Invalid email or password. Admin access only.");
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-cream-warm flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Logo />
          <p className="mt-3 text-xs uppercase tracking-[0.22em] text-ink/60">Admin Portal</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-ink/10 p-10 space-y-6 shadow-sm"
        >
          <h1 className="font-serif text-2xl text-ink">Sign In</h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs uppercase tracking-[0.16em] text-ink/60">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-ink/20 px-4 py-3 text-sm outline-none focus:border-gold-dark transition"
              placeholder="admin@radharanigemstone.com"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs uppercase tracking-[0.16em] text-ink/60">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-ink/20 px-4 py-3 text-sm outline-none focus:border-gold-dark transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3.5 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
