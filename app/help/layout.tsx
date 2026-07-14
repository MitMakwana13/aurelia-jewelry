import Link from "next/link";

const links = [
  { label: "FAQs", href: "/help/faq" },
  { label: "Returns", href: "/help/returns" },
  { label: "Ring Sizing", href: "/help/sizing" },
  { label: "Care Guide", href: "/help/care" },
  { label: "Gem Guide", href: "/help/gem-guide" },
  { label: "Gem Certification", href: "/help/gem-certification" },
  { label: "Privacy Policy", href: "/help/privacy" },
  { label: "Terms of Service", href: "/help/terms" },
  { label: "Accessibility", href: "/help/accessibility" },
];

export default function HelpLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-x py-12">
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12">
        <aside className="order-2 lg:order-1 lg:col-span-3">
          <div className="border-t border-border pt-12 lg:border-t-0 lg:pt-0">
            <p className="font-serif text-2xl mb-6">Help Center</p>
            <nav>
              <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:flex lg:flex-col lg:gap-0 lg:space-y-3">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-ink/70 hover:text-ink hover:underline underline-offset-2">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>
        <div className="order-1 lg:order-2 lg:col-span-9">{children}</div>
      </div>
    </div>
  );
}
