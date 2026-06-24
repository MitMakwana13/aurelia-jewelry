import Link from "next/link";

const links = [
  { label: "FAQs", href: "/help/faq" },
  { label: "Returns", href: "/help/returns" },
  { label: "Ring Sizing", href: "/help/sizing" },
  { label: "Care Guide", href: "/help/care" },
  { label: "Gem Guide", href: "/help/gem-guide" },
  { label: "Gem Certification", href: "/help/gem-certification" },
];

export default function HelpLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-x py-12">
      <div className="grid gap-12 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <p className="font-serif text-2xl">Help Center</p>
          <nav className="mt-6">
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm hover:underline underline-offset-2">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <div className="lg:col-span-9">{children}</div>
      </div>
    </div>
  );
}
