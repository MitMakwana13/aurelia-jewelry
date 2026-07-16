import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gemstone Buyer's Guide | Radha Rani Heritage Collection",
  description: "The complete guide to choosing, buying, and wearing natural gemstones. Learn about the Navratna stones, Vedic astrology benefits, quality factors, and how to identify authentic gemstones.",
  keywords: [
    "Gemstone Buying Guide India",
    "How to Buy Gemstones",
    "Navratna Gemstones Guide",
    "Vedic Astrology Gemstones",
    "Natural vs Synthetic Gemstone",
    "Gemstone Quality Factors",
  ],
};

const navratnaGuide = [
  { stone: "Ruby (Manik)", planet: "Sun", benefits: "Leadership, vitality, confidence, success in career", wearing: "Ring finger, gold setting, Sunday morning", caution: "Avoid if Sun is malefic in your chart" },
  { stone: "Pearl (Moti)", planet: "Moon", benefits: "Emotional peace, clarity, intuition, good sleep", wearing: "Little finger or ring finger, silver setting, Monday morning", caution: "Consult an astrologer before wearing with Ruby" },
  { stone: "Red Coral (Moonga)", planet: "Mars", benefits: "Courage, energy, health, overcoming obstacles", wearing: "Ring finger, gold or copper setting, Tuesday morning", caution: "Can increase aggression; wear under guidance" },
  { stone: "Emerald (Panna)", planet: "Mercury", benefits: "Intelligence, business, communication, creativity", wearing: "Little finger, gold or silver setting, Wednesday morning", caution: "Not recommended for those with strong Jupiter" },
  { stone: "Yellow Sapphire (Pukhraj)", planet: "Jupiter", benefits: "Wisdom, prosperity, marriage, spiritual growth", wearing: "Index finger, gold setting, Thursday morning", caution: "Ensure Jupiter is benefic in your horoscope" },
  { stone: "Diamond (Heera)", planet: "Venus", benefits: "Love, luxury, beauty, artistic talent, relationships", wearing: "Middle or ring finger, platinum or white gold, Friday morning", caution: "Avoid combining with Ruby or Emerald" },
  { stone: "Blue Sapphire (Neelam)", planet: "Saturn", benefits: "Discipline, career breakthrough, justice, protection", wearing: "Middle finger, gold or silver setting, Saturday morning", caution: "Most powerful Navratna - always test for 3 days first" },
  { stone: "Hessonite (Gomed)", planet: "Rahu", benefits: "Clarity, removing confusion, career advancement, protection from enemies", wearing: "Middle finger, silver or gold, Wednesday or Saturday morning", caution: "Should not be worn with Ruby or Pearl" },
  { stone: "Cat's Eye (Lehsunia)", planet: "Ketu", benefits: "Spiritual growth, psychic protection, moksha, gut instinct", wearing: "Middle or ring finger, silver or gold, Tuesday or Thursday morning", caution: "The most unpredictable Navratna - wear only after astrological consultation" },
];

const qualityFactors = [
  {
    title: "Colour",
    description: "The single most important quality factor for coloured gemstones. Look for richness, saturation, and tone. A ruby should be vivid red, not pink-red or brownish-red. Colour should be evenly distributed.",
    tip: "Compare side-by-side under natural daylight for the truest colour.",
  },
  {
    title: "Clarity",
    description: "Natural gemstones almost always contain inclusions - these are fingerprints of nature. Eye-clean stones (no visible inclusions to the naked eye) command a significant premium. Avoid stones with cracks or fractures.",
    tip: "Some inclusions are characteristic of origin - e.g., silk in Kashmir sapphires is a positive identifier.",
  },
  {
    title: "Cut & Shape",
    description: "A well-cut stone maximises brilliance and light return. The cut should enhance the stone's natural colour and minimise waste. Poorly cut stones appear dull regardless of quality.",
    tip: "Look for symmetry, even facets, and a bright, lively face-up appearance.",
  },
  {
    title: "Carat Weight",
    description: "Price increases exponentially with carat weight for fine stones. A 5-carat ruby of the same quality as a 1-carat ruby can be 25× the price. Larger stones are dramatically rarer.",
    tip: "Prioritise quality over size - a 1-carat vivid unheated ruby is worth far more than a 3-carat heated ruby.",
  },
  {
    title: "Treatment Status",
    description: "Unheated, untreated gemstones are the most valuable and rare. Heat treatment enhances colour in up to 95% of sapphires and rubies on the market. Always ask for documentation.",
    tip: "Insist on a lab report confirming 'no heat' or 'no indications of heating' for premium stones.",
  },
  {
    title: "Origin",
    description: "Geographic origin significantly affects value. Kashmir sapphires, Burma rubies, and Colombian emeralds command the highest premiums due to their legendary quality and rarity.",
    tip: "Origin can only be determined by gemological laboratory analysis - not visual inspection alone.",
  },
];

export default function GemGuidePage() {
  return (
    <>
      <section className="relative w-full bg-ink overflow-hidden rounded-sm">
        <div className="absolute inset-0 bg-ink-light/20" />
        <div className="relative flex flex-col justify-center px-8 py-16 md:py-24 md:px-12 lg:px-16">
          <div className="text-cream max-w-2xl">
            <p className="eyebrow text-cream/60 tracking-[0.3em] mb-4">The Knowledge Vault</p>
            <h1 className="font-serif text-5xl md:text-7xl font-light leading-tight">
              Gemstone Guide
            </h1>
            <p className="mt-4 text-cream/70 max-w-xl leading-relaxed">
              Everything you need to know about selecting, evaluating, and wearing natural gemstones - written by master gemologists with decades of experience.
            </p>
          </div>
        </div>
      </section>

      <div className="container-x py-16 space-y-24">

        {/* Quick Jump Navigation */}
        <div className="border border-border p-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-ink/40 mb-4">Contents</p>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {["Quality Factors", "The Navratna Guide", "Natural vs Synthetic", "How to Buy"].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, "-")}`} className="text-sm text-ink/60 hover:text-ink underline-offset-4 hover:underline transition">
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* Quality Factors */}
        <div id="quality-factors">
          <p className="eyebrow tracking-[0.3em] mb-4 text-[#053624]">The Six Cs</p>
          <h2 className="font-serif text-3xl md:text-5xl text-ink mb-6 font-light">Quality Factors That Determine Value</h2>
          <p className="text-ink/60 max-w-2xl leading-relaxed mb-12">
            Unlike diamonds (which use GIA's standardized 4Cs), coloured gemstones are evaluated using a broader set of quality factors. Understanding these helps you make confident purchasing decisions.
          </p>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {qualityFactors.map((factor, i) => (
              <div key={factor.title} className="border border-border p-6 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="font-serif text-4xl text-ink/10">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-serif text-xl text-ink">{factor.title}</h3>
                </div>
                <p className="text-sm text-ink/60 leading-relaxed">{factor.description}</p>
                <div className="border-t border-border pt-3">
                  <p className="text-[10px] uppercase tracking-[0.15em] text-[#053624] mb-1">Expert Tip</p>
                  <p className="text-xs text-ink/50 leading-relaxed">{factor.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navratna Guide */}
        <div id="the-navratna-guide">
          <p className="eyebrow tracking-[0.3em] mb-4 text-[#053624]">Vedic Wisdom</p>
          <h2 className="font-serif text-3xl md:text-5xl text-ink mb-4 font-light">The Nine Navratna Stones</h2>
          <p className="text-ink/60 max-w-2xl leading-relaxed mb-12">
            In Vedic astrology, the nine planets each govern different aspects of life. Wearing the associated gemstone is believed to strengthen that planet's positive influence. Each stone must be chosen based on your personal birth chart.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 pr-6 text-[10px] uppercase tracking-[0.2em] text-ink/40 font-normal">Gemstone</th>
                  <th className="text-left py-3 pr-6 text-[10px] uppercase tracking-[0.2em] text-ink/40 font-normal">Planet</th>
                  <th className="text-left py-3 pr-6 text-[10px] uppercase tracking-[0.2em] text-ink/40 font-normal hidden md:table-cell">Benefits</th>
                  <th className="text-left py-3 pr-6 text-[10px] uppercase tracking-[0.2em] text-ink/40 font-normal hidden lg:table-cell">Wearing Protocol</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {navratnaGuide.map((item) => (
                  <tr key={item.stone} className="hover:bg-cream-light transition-colors">
                    <td className="py-4 pr-6 font-serif text-base text-ink">{item.stone}</td>
                    <td className="py-4 pr-6 text-ink/60">{item.planet}</td>
                    <td className="py-4 pr-6 text-ink/60 hidden md:table-cell">{item.benefits}</td>
                    <td className="py-4 pr-6 text-ink/50 text-xs hidden lg:table-cell">{item.wearing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-xs text-ink/40 italic">
            * Always consult a qualified Vedic astrologer before selecting a gemstone based on planetary alignment. Wearing the wrong stone can have adverse effects.
          </p>
        </div>

        {/* Natural vs Synthetic */}
        <div id="natural-vs-synthetic" className="grid gap-12 lg:grid-cols-2 items-start">
          <div>
            <p className="eyebrow tracking-[0.3em] mb-4 text-[#053624]">Buyer Awareness</p>
            <h2 className="font-serif text-3xl md:text-4xl text-ink mb-6 font-light">Natural vs Synthetic vs Simulant</h2>
            <div className="space-y-6">
              <div className="border-l-2 border-[#053624] pl-6">
                <p className="font-serif text-lg text-ink mb-2">Natural Gemstones</p>
                <p className="text-sm text-ink/60 leading-relaxed">Formed over millions of years in the earth. Each is unique, with natural inclusions. These are the most valuable and the only type considered astrologically effective in Vedic tradition.</p>
              </div>
              <div className="border-l-2 border-ink/20 pl-6">
                <p className="font-serif text-lg text-ink mb-2">Synthetic / Lab-Grown Gemstones</p>
                <p className="text-sm text-ink/60 leading-relaxed">Chemically identical to natural stones but grown in a laboratory in weeks. Significantly cheaper, but considered ineffective for astrological purposes. GIA-certified lab diamonds are now widely accepted for jewelry.</p>
              </div>
              <div className="border-l-2 border-ink/10 pl-6">
                <p className="font-serif text-lg text-ink mb-2">Simulants (Imitations)</p>
                <p className="text-sm text-ink/60 leading-relaxed">Stones that look like a gemstone but are chemically different (e.g., glass, cubic zirconia, synthetic spinel sold as sapphire). These have no astrological value and should be avoided entirely.</p>
              </div>
            </div>
          </div>
          <div className="bg-ink text-cream p-8 space-y-6">
            <p className="text-[10px] uppercase tracking-[0.2em] text-cream/40">At Radha Rani</p>
            <h3 className="font-serif text-2xl text-cream">Our Promise</h3>
            <p className="text-sm text-cream/70 leading-relaxed">
              Every gemstone we sell is 100% natural origin. We do not sell synthetic or lab-grown gemstones (except certified lab diamonds where explicitly stated). Our certification and documentation guarantee this.
            </p>
            <Link href="/help/gem-certification" className="inline-block border border-cream/40 text-cream px-6 py-3 text-[10px] uppercase tracking-[0.2em] hover:border-cream transition">
              View Our Certification Process →
            </Link>
          </div>
        </div>

        {/* How to Buy */}
        <div id="how-to-buy">
          <p className="eyebrow tracking-[0.3em] mb-4 text-[#053624]">Step by Step</p>
          <h2 className="font-serif text-3xl md:text-4xl text-ink mb-10 font-light">How to Buy a Gemstone from Radha Rani</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "01", title: "Get Your Birth Chart Read", body: "Consult a Vedic astrologer to identify which planets need strengthening and which gemstones are suitable for you personally." },
              { step: "02", title: "Browse & Inquire", body: "Explore our collection and send an inquiry via the product page, WhatsApp, or our contact form. Our gemologists will guide you." },
              { step: "03", title: "Review Documentation", body: "We share the stone's lab certificate, images, and full quality breakdown before you commit to any purchase." },
              { step: "04", title: "Confirm & Receive", body: "Pay a 50% advance to confirm your order. Your gemstone is shipped insured with full documentation and a Certificate of Authenticity." },
            ].map((item) => (
              <div key={item.step} className="relative pl-12 border-t border-border pt-6">
                <span className="absolute left-0 top-6 font-serif text-5xl text-ink/8 leading-none">{item.step}</span>
                <h3 className="font-serif text-lg text-ink mb-3">{item.title}</h3>
                <p className="text-sm text-ink/60 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col md:flex-row gap-4">
          <Link href="/shop/gemstones" className="flex-1 text-center bg-ink text-cream py-5 text-[11px] uppercase tracking-[0.25em] hover:bg-ink/80 transition">
            Shop All Gemstones
          </Link>
          <Link href="/contact" className="flex-1 text-center border border-ink text-ink py-5 text-[11px] uppercase tracking-[0.25em] hover:bg-ink hover:text-cream transition">
            Speak with a Gemologist
          </Link>
        </div>
      </div>
    </>
  );
}
