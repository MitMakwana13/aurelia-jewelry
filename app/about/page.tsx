import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Atelier",
  description: "Discover Radha Rani Heritage Collection. A modern atelier dedicated to uncompromising craftsmanship, bespoke design, and certified Indian high jewelry.",
};

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-cream overflow-hidden">
      <div className="container-x">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-24">
          <p className="eyebrow tracking-[0.3em] text-[#053624]/70 mb-4">Our Story</p>
          <h1 className="font-serif text-5xl md:text-7xl text-ink tracking-tight leading-[1.1] mb-8">
            The modern benchmark for Indian <em className="italic font-light">High Jewelry</em>.
          </h1>
          <p className="text-base md:text-lg text-ink/70 leading-relaxed max-w-2xl mx-auto">
            Radha Rani was established with a singular, uncompromising vision: to elevate bespoke jewelry from a simple transaction to an exclusive, highly personalized art form. We are an independent modern atelier serving discerning clients worldwide.
          </p>
        </div>

        {/* Feature Image */}
        <div className="aspect-video w-full bg-cream-warm mb-32 relative">
          <img 
            src="https://images.unsplash.com/photo-1599643478524-fb524b0d0f72?auto=format&fit=crop&w=2000&q=80" 
            alt="Radha Rani Atelier Craftsmanship" 
            className="w-full h-full object-cover mix-blend-multiply opacity-80"
          />
        </div>

        {/* Three Pillars */}
        <div className="grid md:grid-cols-3 gap-16 md:gap-12 mb-32">
          <div>
            <span className="block text-4xl mb-6">🔍</span>
            <h3 className="font-serif text-2xl text-ink mb-4">Uncompromising Sourcing</h3>
            <p className="text-sm text-ink/60 leading-relaxed">
              We bypass traditional middlemen to source stones directly from trusted mines and lapidaries. From unheated Sri Lankan Pukhraj to Zambian Emeralds, every stone we acquire is sent to GIA or IGI for rigorous certification before it ever reaches our design desk.
            </p>
          </div>
          <div>
            <span className="block text-4xl mb-6">✋</span>
            <h3 className="font-serif text-2xl text-ink mb-4">Master Craftsmanship</h3>
            <p className="text-sm text-ink/60 leading-relaxed">
              Mass production destroys the soul of jewelry. Every piece that leaves our atelier is forged by master artisans using traditional Indian techniques—like intricate Jadau and Meenakari—fused with modern, micro-pavé precision. 
            </p>
          </div>
          <div>
            <span className="block text-4xl mb-6">🏛️</span>
            <h3 className="font-serif text-2xl text-ink mb-4">The Bespoke Experience</h3>
            <p className="text-sm text-ink/60 leading-relaxed">
              We do not just sell jewelry; we execute commissions. Operating strictly on a 50% advance model, we dedicate our full attention to a limited number of clients per month, ensuring your vision is realized flawlessly.
            </p>
          </div>
        </div>

        {/* Closing CTA */}
        <div className="bg-[#053624] text-cream p-12 md:p-24 text-center">
          <h2 className="font-serif text-3xl md:text-5xl mb-6">Ready to create your masterpiece?</h2>
          <p className="text-sm text-cream/70 mb-10 max-w-xl mx-auto leading-relaxed">
            Whether you are looking for an astrological Navratna ring or a complete bridal trousseau, our concierge is ready to assist you.
          </p>
          <Link 
            href="/custom"
            className="inline-block bg-cream text-ink px-12 py-4 text-[10px] uppercase tracking-[0.2em] hover:bg-cream/90 transition-colors"
          >
            Request Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
