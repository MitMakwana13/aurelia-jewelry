import Link from "next/link";

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-ink-muted">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            {item.href ? (
              <Link href={item.href} className="hover:text-ink transition">
                {item.label}
              </Link>
            ) : (
              <span className="text-ink">{item.label}</span>
            )}
            {i < items.length - 1 && <span className="opacity-60">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
