import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gem Certification Guide | Radha Rani Heritage Collection",
  description: "Understanding gemstone certificates — GIA, IGI, GRS, and our in-house authenticity reports. Every Radha Rani gemstone ships with full documentation.",
  keywords: ["Gemstone Certificate India", "GIA Certified Gemstone", "IGI Certificate", "Authentic Gemstone Certification", "Radha Rani Certificate"],
};

const labs = [
  {
    name: "GIA",
    full: "Gemological Institute of America",
    description: "The world's most respected gemological authority. GIA reports are the global gold standard for diamonds and precious gemstones, providing an unbiased assessment of the 4Cs and treatments.",
    stones: ["Diamonds", "Sapphires", "Rubies", "Emeralds"],
    link: "https://www.gia.edu",
  },
  {
    name: "IGI",
    full: "International Gemological Institute",
    description: "India's most widely recognized certification body for diamonds. IGI grading reports are accepted by jewellers and customers across India and internationally.",
    stones: ["Diamonds", "Lab-Grown Diamonds", "Colored Stones"],
    link: "https://www.igi.org",
  },
];

const whatWeProvide = [
  {
    icon: "📜",
    title: "Certificate of Authenticity",
    body: "Every gemstone purchase from Radha Rani includes a signed Certificate of Authenticity confirming the stone's natural origin, treatment status, and primary characteristics.",
  },
  {
    icon: "🔬",
    title: "Lab Report (where applicable)",
    body: "High-value stones (typically above ₹1,00,000) are accompanied by a third-party laboratory report from GIA, IGI, or GRS confirming colour, clarity, cut, carat weight, and treatment status.",
  },
];

export default function GemCertificationPage() {
  return (
    <>
      <section className="relative aspect-[16/6] w-full bg-ink overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#053624]/70 to-ink" />
        <div className="container-x relative flex h-full items-center">
          <div className="text-cream max-w-2xl">
            <p className="eyebrow text-cream/60 tracking-[0.3em] mb-4">Transparency & Trust</p>
            <h1 className="font-serif text-5xl md:text-7xl font-light leading-tight">
              Gem Certification
            </h1>
            <p className="mt-4 text-cream/70 max-w-lg leading-relaxed">
              Every natural gemstone at Radha Rani Heritage Collection is authenticated and documented. We believe your stone's story should be as clear as its brilliance.
            </p>
          </div>
        </div>
      </section>

      <div className="container-x py-16 space-y-24">

        {/* What We Provide */}
        <div>
          <p className="eyebrow tracking-[0.3em] mb-4 text-[#053624]">Our Commitment</p>
          <h2 className="font-serif text-3xl md:text-4xl text-ink mb-12">What You Receive with Every Purchase</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {whatWeProvide.map((item) => (
              <div key={item.title} className="border border-border p-6 space-y-4">
                <div className="text-4xl">{item.icon}</div>
                <h3 className="font-serif text-lg text-ink">{item.title}</h3>
                <p className="text-sm text-ink/60 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trusted Labs */}
        <div>
          <p className="eyebrow tracking-[0.3em] mb-4 text-[#053624]">Our Partners</p>
          <h2 className="font-serif text-3xl md:text-4xl text-ink mb-4">Internationally Trusted Laboratories</h2>
          <p className="text-ink/60 max-w-2xl leading-relaxed mb-12">
            We work with the world's most respected gemological laboratories. Reports are issued independently — we have no financial relationship that could compromise their objectivity.
          </p>
          <div className="grid gap-8 md:grid-cols-2">
            {labs.map((lab) => (
              <div key={lab.name} className="border border-border p-8 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-serif text-3xl text-ink">{lab.name}</p>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-ink/40 mt-1">{lab.full}</p>
                  </div>
                  <a
                    href={lab.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] uppercase tracking-[0.15em] text-ink/40 hover:text-ink transition border-b border-transparent hover:border-ink/40 whitespace-nowrap"
                  >
                    Visit Lab →
                  </a>
                </div>
                <p className="text-sm text-ink/60 leading-relaxed">{lab.description}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {lab.stones.map((s) => (
                    <span key={s} className="text-[9px] uppercase tracking-[0.15em] border border-ink/10 px-3 py-1 text-ink/50">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl text-ink mb-8">Common Questions</h2>
          <div className="space-y-6 divide-y divide-border">
            {[
              {
                q: "Do all your gemstones come with certificates?",
                a: "Our Radha Rani Certificate of Authenticity is included with every purchase. Third-party lab reports (GIA/IGI) are included for stones above ₹1,00,000 and are available on request for other stones.",
              },
              {
                q: "What does 'unheated' or 'untreated' mean?",
                a: "Unheated gemstones have not been exposed to high-temperature treatment to enhance colour or clarity. They are significantly rarer and more valuable than heated stones. This status is confirmed by laboratory analysis.",
              },
              {
                q: "Can I request a specific lab report?",
                a: "Yes. If you require a specific laboratory certification (e.g., GIA for a diamond, or IGI for a ruby), please mention it during your inquiry and we will arrange it. Additional fees may apply.",
              },
              {
                q: "How do I verify the authenticity of my certificate?",
                a: "Each third-party lab report has a unique report number that can be verified on the laboratory's official website. Our own certificates include a unique serial number and gemologist signature.",
              },
            ].map((item) => (
              <div key={item.q} className="pt-6">
                <p className="font-serif text-lg text-ink mb-2">{item.q}</p>
                <p className="text-sm text-ink/60 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-ink text-cream p-12 text-center">
          <p className="eyebrow tracking-[0.3em] text-cream/40 mb-4">Questions?</p>
          <h2 className="font-serif text-3xl md:text-4xl mb-4">Speak with a Master Gemologist</h2>
          <p className="text-cream/60 max-w-lg mx-auto mb-8 text-sm leading-relaxed">
            Our certified gemologists are available to walk you through any stone's documentation, history, and energy properties.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="bg-cream text-ink px-8 py-4 text-[11px] uppercase tracking-[0.25em] hover:bg-cream/90 transition">
              Contact Us
            </Link>
            <Link href="/shop/gemstones" className="border border-cream/40 text-cream px-8 py-4 text-[11px] uppercase tracking-[0.25em] hover:border-cream transition">
              Shop Gemstones
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
