import { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Knowledge Hub",
  description: "Explore the science and heritage of high jewelry. Learn about GIA/IGI certifications, unheated gemstones, and Vedic astrology.",
};

const articles = [
  {
    category: "Astrology & Zodiac",
    title: "The Navratna: Which Gemstone Suits Your Cosmic Alignment?",
    desc: "Vedic astrology relies on 9 primary gemstones to balance planetary frequencies. Discover the difference between wearing Pukhraj for Jupiter and Neelam for Saturn, and why absolute gem purity is required for astrological benefits.",
    image: "https://images.unsplash.com/photo-1599643478524-fb524b0d0f72?auto=format&fit=crop&w=800&q=80",
    href: "/knowledge/gemstones-by-zodiac",
  },
  {
    category: "Gemology 101",
    title: "Heated vs. Unheated: How to Identify an Original Gemstone",
    desc: "Over 95% of sapphires and rubies in the market are heat-treated to improve color. Our master gemologists explain how to read GIA reports and identify the microscopic silk inclusions that prove a stone is completely natural and unheated.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
    href: "/knowledge/identifying-original-gemstones",
  },
  {
    category: "Diamond Education",
    title: "Beyond the 4Cs: What Makes a Diamond Truly Flawless?",
    desc: "While Carat, Cut, Color, and Clarity are standard metrics, the true brilliance of a diamond lies in its crystal structure, fluorescence, and symmetry. Learn how we select syndicate-grade diamonds for our bespoke commissions.",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80",
    href: "/knowledge/diamonds",
  },
  {
    category: "Vedic Science",
    title: "The Transformative Power of Yellow Sapphire (Pukhraj)",
    desc: "Associated with Jupiter (Brihaspati), the Yellow Sapphire is revered for attracting wealth, knowledge, and divine grace. Understand the carat weight and setting rules required to unlock its full potential.",
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800&q=80",
    href: "/knowledge/benefits-of-yellow-sapphire",
  },
];

export default function KnowledgeHubPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-cream">
      <div className="container-x">
        <header className="mb-20 text-center max-w-3xl mx-auto">
          <p className="eyebrow tracking-[0.3em] text-[#053624]/70 mb-4">Education</p>
          <h1 className="font-serif text-4xl md:text-6xl text-ink tracking-tight mb-6">
            The Knowledge Hub
          </h1>
          <p className="text-sm text-ink/60 leading-relaxed">
            True luxury requires transparency. From understanding GIA grading reports to exploring the ancient Vedic science behind the Navratna, our atelier provides absolute clarity on every aspect of high jewelry.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
          {articles.map((article, i) => (
            <article key={i} className="group flex flex-col">
              <Link href={article.href} className="block aspect-[16/9] overflow-hidden mb-6 bg-cream-warm">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </Link>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#053624] font-medium px-2 py-1 bg-[#053624]/5">
                  {article.category}
                </span>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl text-ink leading-snug mb-4 group-hover:text-[#053624] transition-colors duration-300">
                <Link href={article.href}>{article.title}</Link>
              </h2>
              <p className="text-sm text-ink/60 leading-relaxed mb-6 flex-1">
                {article.desc}
              </p>
              <Link 
                href={article.href}
                className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-ink hover:text-[#053624] transition-colors"
              >
                Read Article <ArrowRightIcon width={12} height={12} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
