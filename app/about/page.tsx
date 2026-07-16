import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/plp/Breadcrumbs";
import { Timeline, TimelineItem } from "@/components/ui/Timeline";

const timelineData: TimelineItem[] = [
  {
    year: "1990",
    title: "The Inception",
    description: "Our journey began with a profound dedication to sourcing the finest natural gemstones from the heart of legendary mining regions. Armed with generational knowledge, we established our first trading house.",
    image: "/products/rings/IMG_7587.JPG"
  },
  {
    year: "2005",
    title: "Master Craftsmanship",
    description: "We expanded our vision from loose gemstones to bespoke jewelry. We partnered with master artisans who utilize traditional techniques passed down through centuries to create pieces of unparalleled beauty.",
    image: "/products/bangles/IMG_7653.jpg"
  },
  {
    year: "2015",
    title: "Astrological Precision",
    description: "Recognizing the deep cultural and astrological significance of Navratna gemstones, we integrated certified Vedic gemology into our consultation services, ensuring every stone perfectly aligns with its wearer.",
    image: "/gemstones/ruby-new.jpg"
  },
  {
    year: "Present",
    title: "The Heritage Collection",
    description: "Today, Radha Rani stands as a pinnacle of trust and luxury. From rare unheated sapphires to flawless bespoke diamond pieces, our Maison continues to craft heirlooms for the modern era.",
    image: "/products/necklaces/IMG_7616.JPG"
  }
];

export const metadata: Metadata = {
  title: "Our Story | Radha Rani Gemstones",
  description: "The story behind Radha Rani Gemstones: natural certified gemstones & custom jewelry.",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative aspect-[16/8] w-full bg-cream-warm">
        <img
          src="/products/bangles/IMG_7649.JPG"
          alt="Radha Rani Gemstones Craftsmanship"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/30" />
        <div className="container-x relative flex h-full items-end pb-12 text-cream">
          <div className="max-w-2xl">
            <p className="eyebrow text-cream/80">Our Story</p>
            <h1 className="mt-2 font-serif text-5xl md:text-7xl leading-[1.05]">
              Natural Gemstones,<br /> Crafted with Care.
            </h1>
          </div>
        </div>
      </section>

      <div className="container-x py-16">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Our Story" }]} />

        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">Trust & Transparency</p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl leading-tight">
              Astrology-based guidance and authentic natural gemstones.
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-6 text-base leading-relaxed text-ink-soft">
            <p>
              At Radha Rani Gemstones, we believe that every gemstone and every piece of jewelry carries a personal meaning.
            </p>
            <p>
              We offer natural, certified gemstones along with astrology-based guidance to help individuals find the gemstone that best suits their needs. Every gemstone is accompanied by trusted certifications such as IGI and GIA, ensuring authenticity and transparency.
            </p>
            <p>
              Along with gemstones, we also create custom jewelry in gold, silver, and other precious metals. Whether you have a design in mind or wish to create something unique, each piece is crafted with care and attention to detail.
            </p>
            <p>
              Rooted in trust, craftsmanship, and personal guidance, our work is centered around creating jewelry that truly belongs to you.
            </p>
          </div>
        </div>

        <div className="mt-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { stat: "100%", label: "Natural Certified Stones" },
            { stat: "IGI / GIA", label: "Trusted Labs" },
            { stat: "Astrology", label: "Expert Guidance" },
            { stat: "Customized", label: "Metal Crafting" },
          ].map((s) => (
            <div key={s.label} className="border-t border-border pt-6">
              <p className="font-serif text-3.5xl md:text-4xl">{s.stat}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-ink-muted">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-32">
          <div className="text-center mb-16">
            <p className="eyebrow text-ink/60 mb-4">Our Legacy</p>
            <h2 className="font-serif text-4xl md:text-5xl text-ink">A Journey of Craftsmanship</h2>
          </div>
          <Timeline items={timelineData} />
        </div>

        <div className="mt-32 grid gap-8 lg:grid-cols-2">
          <Link href="/shop/gemstones" className="group block">
            <div className="aspect-[4/3] overflow-hidden bg-cream-warm">
              <img
                src="/products/rubies/IMG_7489.JPG"
                alt="Navratna Gemstones Collection"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
            <h3 className="mt-5 font-serif text-2xl">Explore Gemstones</h3>
            <p className="mt-2 text-sm text-ink-soft">View our natural certified Navratna catalog.</p>
          </Link>
          <Link href="/custom" className="group block">
            <div className="aspect-[4/3] overflow-hidden bg-cream-warm">
              <img
                src="/products/necklaces/IMG_7368.JPG"
                alt="Bespoke Jewelry Customization"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
            <h3 className="mt-5 font-serif text-2xl">Bespoke Jewelry</h3>
            <p className="mt-2 text-sm text-ink-soft">Book a personalization consultation.</p>
          </Link>
        </div>
      </div>
    </>
  );
}
