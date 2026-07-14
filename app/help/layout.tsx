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
      <div className="grid gap-12 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <p className="font-serif text-2xl hidden lg:block">Help Center</p>
          <nav className="lg:mt-6 -mx-5 px-5 lg:mx-0 lg:px-0">
            <ul className="flex overflow-x-auto gap-6 pb-4 lg:pb-0 lg:flex-col lg:gap-0 lg:space-y-2 hide-scrollbar">
              {links.map((l) => (
                <li key={l.href} className="shrink-0">
                  <Link href={l.href} className="text-sm text-ink/70 hover:text-ink hover:underline underline-offset-2 whitespace-nowrap">
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
