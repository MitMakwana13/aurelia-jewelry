"use client";

import { useState } from "react";

const INQUIRY_TYPES = [
  { value: "GEMSTONE", label: "Gemstone", desc: "Specific gemstone by type, cut, or colour" },
  { value: "DIAMOND", label: "Diamond", desc: "Diamond by shape, clarity, carat, or certificate" },
  { value: "CUSTOM_JEWELRY", label: "Custom Jewelry", desc: "Bespoke ring, necklace, or any piece designed for you" },
  { value: "GENERAL", label: "General Inquiry", desc: "Any other question or request" },
];

const BUDGETS = [
  "Under ₹10,000", "₹10,000 – ₹25,000", "₹25,000 – ₹50,000",
  "₹50,000 – ₹1,00,000", "₹1,00,000 – ₹5,00,000", "Above ₹5,00,000",
];

export function InquiryPageClient() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", type: "GENERAL", budget: "", message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSuccess(true);
    } catch {
      setError("Something went wrong. Please call or WhatsApp us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Cinematic Hero */}
      <section className="relative w-full h-[60vh] min-h-[500px] overflow-hidden bg-ink flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1603974372039-adc49044b6bd?auto=format&fit=crop&w=2800&q=80"
          alt="Bespoke Jewelry Craftsmanship"
          className="absolute inset-0 h-full w-full object-cover opacity-50 scale-105 animate-[slow-zoom_20s_ease-in-out_infinite_alternate]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />
        
        <div className="relative text-center px-4 max-w-3xl">
          <p className="eyebrow text-gold tracking-[0.4em] mb-4 opacity-0 animate-[fade-in_1s_ease_forwards]">
            Bespoke Services
          </p>
          <h1 className="font-serif text-5xl md:text-7xl text-cream leading-tight opacity-0 animate-[slide-up_1.2s_ease_0.2s_forwards]">
            Your Vision,<br />
            <em className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#b8945f] via-[#e2c896] to-[#b8945f]">Perfectly Realized.</em>
          </h1>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container-x relative -mt-20 z-10 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Form Column */}
          <div className="lg:col-span-8 bg-white shadow-2xl p-8 md:p-14 border-t-4 border-gold">
            {success ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-6 text-gold animate-bounce">✦</div>
                <h2 className="font-serif text-4xl text-ink mb-4">Inquiry Received</h2>
                <p className="text-ink/60 max-w-md mx-auto text-lg">
                  Thank you for choosing Radharani Gemstone. Our master consultants will contact you within 24 hours.
                </p>
                <div className="mt-10 inline-block bg-cream p-6 border border-gold/20 text-sm text-ink/70">
                  <p>A <strong>50% advance payment</strong> is required to commence craftsmanship.</p>
                  <p className="mt-2">We accept <strong>prepaid payments only</strong>.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <h2 className="font-serif text-3xl text-ink mb-2">Start the Journey</h2>
                  <p className="text-sm text-ink-muted">Please provide details about your desired piece, and our experts will guide you through the process.</p>
                </div>

                {/* Inquiry Type Cards */}
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-ink/60 mb-4">What are you looking for?</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {INQUIRY_TYPES.map((t) => (
                      <label
                        key={t.value}
                        className={`cursor-pointer border p-5 transition-all duration-300 ${
                          form.type === t.value 
                            ? "border-gold bg-cream-warm shadow-md transform -translate-y-1" 
                            : "border-border hover:border-gold/50"
                        }`}
                      >
                        <input type="radio" name="type" value={t.value} checked={form.type === t.value} onChange={handleChange} className="sr-only" />
                        <p className={`font-serif text-xl ${form.type === t.value ? "text-gold-dark" : "text-ink"}`}>{t.label}</p>
                        <p className="text-xs text-ink/50 mt-1">{t.desc}</p>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Personal Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs uppercase tracking-[0.16em] text-ink/60">Full Name *</label>
                    <input name="name" required value={form.name} onChange={handleChange} className="input-base text-lg" placeholder="e.g. Ananya Sharma" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-[0.16em] text-ink/60">Phone Number *</label>
                    <input name="phone" required type="tel" value={form.phone} onChange={handleChange} className="input-base text-lg" placeholder="+91 98765 43210" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-[0.16em] text-ink/60">Email Address *</label>
                    <input name="email" required type="email" value={form.email} onChange={handleChange} className="input-base text-lg" placeholder="you@example.com" />
                  </div>
                </div>

                {/* Budget */}
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-[0.16em] text-ink/60">Estimated Budget (Optional)</label>
                  <select name="budget" value={form.budget} onChange={handleChange} className="input-base text-lg bg-transparent cursor-pointer">
                    <option value="" className="text-ink-muted">Select your budget</option>
                    {BUDGETS.map((b) => <option key={b} value={b} className="text-ink">{b}</option>)}
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-[0.16em] text-ink/60">Your Vision *</label>
                  <textarea name="message" required rows={4} value={form.message} onChange={handleChange} placeholder="Describe the gemstone, cut, diamond specifications, or the custom jewelry design you have in mind..." className="input-base text-lg resize-none" />
                </div>

                {error && <p className="text-red-600 text-sm">{error}</p>}

                <div className="pt-4">
                  <button type="submit" disabled={loading} className="w-full btn-primary py-5 text-sm disabled:opacity-60 text-white bg-gold hover:bg-gold-dark hover:shadow-xl transition-all">
                    {loading ? "Transmitting..." : "Submit Inquiry"}
                  </button>
                  <p className="text-xs text-center text-ink/40 mt-4 tracking-wide">
                    We respond within 24 hours · 50% advance to confirm order
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-4 space-y-8 mt-8 lg:mt-0">
            {/* The Process */}
            <div className="bg-ink text-cream p-10 shadow-2xl">
              <h3 className="font-serif text-2xl mb-6 text-gold">The Process</h3>
              <ol className="space-y-6 text-sm text-cream/80">
                {[
                  "Share your vision and requirements",
                  "Consultation with our master jewelers",
                  "Receive a detailed quote and design mockups",
                  "50% advance to begin the craftsmanship",
                  "Final inspection and balance payment",
                  "Secure delivery of your masterpiece",
                ].map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="font-serif text-gold text-2xl leading-none italic">{i + 1}.</span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Contact Card */}
            <div className="bg-cream-warm border border-gold/20 p-10">
              <h3 className="font-serif text-2xl text-ink mb-6">Concierge</h3>
              <div className="space-y-5 text-sm text-ink/70">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-ink/40 mb-1">WhatsApp / Phone</p>
                  <a href="tel:+919999999999" className="text-lg hover:text-gold-dark transition">+91 99999 99999</a>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-ink/40 mb-1">Email</p>
                  <a href="mailto:info@radharanigemstone.com" className="text-lg hover:text-gold-dark transition">info@radharanigemstone.com</a>
                </div>
                <div className="pt-4 border-t border-gold/20">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-ink/40 mb-1">Boutique Hours</p>
                  <p className="text-base">Mon – Sat, 10:00 AM – 7:00 PM</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
