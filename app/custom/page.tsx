import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bespoke Commissions",
  description: "Request a custom jewelry piece. Radha Rani offers an exclusive bespoke service starting at a 50% advance.",
};

export default function CustomJewelryPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-cream">
      <div className="container-x max-w-4xl">
        <header className="mb-16 text-center">
          <p className="eyebrow tracking-[0.3em] text-[#053624]/70 mb-4">The Atelier</p>
          <h1 className="font-serif text-4xl md:text-6xl text-ink tracking-tight mb-6">
            Bespoke Commissions
          </h1>
          <p className="text-sm text-ink/60 leading-relaxed max-w-2xl mx-auto">
            Our most exclusive service. Work directly with our master craftsmen and gemologists to create a one-of-a-kind masterpiece. We source the rarest GIA/IGI certified stones specifically for your vision.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-16 mb-24">
          <div className="aspect-[4/5] bg-cream-warm">
            <img 
              src="https://images.unsplash.com/photo-1599643478524-fb524b0d0f72?auto=format&fit=crop&w=800&q=80" 
              alt="Bespoke Sketching" 
              className="w-full h-full object-cover mix-blend-multiply opacity-80"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="font-serif text-3xl mb-8">The Process</h2>
            <div className="space-y-8">
              {[
                { step: "01", title: "Consultation", desc: "Share your vision, references, or astrological requirements with our concierge." },
                { step: "02", title: "Gem Sourcing", desc: "We present a curated selection of unheated, certified stones for your approval." },
                { step: "03", title: "50% Advance", desc: "Once the design and stones are finalized, a 50% advance secures the commission." },
                { step: "04", title: "Master Craftsmanship", desc: "Our artisans spend weeks bringing the design to life using traditional techniques." },
                { step: "05", title: "White-Glove Delivery", desc: "The final masterpiece is delivered securely, complete with all lab certifications." },
              ].map((s) => (
                <div key={s.step} className="flex gap-6">
                  <span className="font-serif text-xl text-[#053624]">{s.step}</span>
                  <div>
                    <h3 className="font-medium text-ink mb-1">{s.title}</h3>
                    <p className="text-sm text-ink/60">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-10 md:p-16 border border-ink/5">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl mb-3">Begin a Commission</h2>
            <p className="text-sm text-ink/60">Fill out the details below to request a private consultation.</p>
          </div>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-ink/60">First Name</label>
                <input type="text" className="border-b border-ink/20 py-2 bg-transparent outline-none focus:border-[#053624] transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-ink/60">Last Name</label>
                <input type="text" className="border-b border-ink/20 py-2 bg-transparent outline-none focus:border-[#053624] transition-colors" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-ink/60">Email</label>
                <input type="email" className="border-b border-ink/20 py-2 bg-transparent outline-none focus:border-[#053624] transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-ink/60">Phone</label>
                <input type="tel" className="border-b border-ink/20 py-2 bg-transparent outline-none focus:border-[#053624] transition-colors" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest text-ink/60">Commission Details / Stone Preference</label>
              <textarea rows={4} className="border-b border-ink/20 py-2 bg-transparent outline-none focus:border-[#053624] transition-colors resize-none"></textarea>
            </div>
            <button type="submit" className="w-full bg-[#053624] text-cream py-4 text-[10px] uppercase tracking-[0.2em] hover:bg-ink transition-colors mt-8">
              Submit Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
