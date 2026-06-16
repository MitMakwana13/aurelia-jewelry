import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-x py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 font-serif text-5xl">Page not found.</h1>
      <p className="mt-3 text-sm text-ink-muted">The page you're looking for doesn't exist or has moved.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/" className="btn-primary">Return Home</Link>
        <Link href="/shop" className="btn-outline">Shop All</Link>
      </div>
    </div>
  );
}
