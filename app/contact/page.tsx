import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/plp/Breadcrumbs";

export const metadata: Metadata = {
  title: "Contact Us | Radha Rani Heritage Collection",
  description: "Reach out to Radha Rani Heritage Collection for gemstone inquiries, custom jewelry consultations, and expert guidance. Call, WhatsApp, or email us.",
  keywords: ["Contact Radha Rani", "Gemstone Inquiry India", "Custom Jewelry Consultation", "Buy Gemstones Surat"],
};

export default function ContactPage() {
  const whatsappLink = "https://wa.me/917984062415?text=Hello%2C%20I%20have%20an%20inquiry%20about%20your%20gemstones%20%26%20jewelry.";

  return (
    <>
      {/* Hero */}
      <section className="relative w-full pt-12 md:pt-20 bg-cream">
        <div className="container-x">
          <div className="max-w-2xl">
            <p className="eyebrow text-ink/60 tracking-[0.3em] mb-4">Get in Touch</p>
            <h1 className="font-serif text-5xl md:text-7xl text-ink font-light leading-tight">
              Contact Us
            </h1>
            <p className="mt-4 text-ink-soft max-w-lg leading-relaxed">
              Our master gemologists and concierge team are available six days a week to assist with gemstone selection, custom jewelry, and bespoke consultations.
            </p>
          </div>
        </div>
      </section>

      <div className="container-x py-16">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact Us" }]} />

        <div className="mt-12 grid gap-16 lg:grid-cols-2">
          {/* Contact Cards */}
          <div className="space-y-8">
            <h2 className="font-serif text-3xl text-ink">Reach Us Directly</h2>

            {/* WhatsApp */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-6 border border-border p-6 hover:border-ink/40 transition-colors"
            >
              <div className="mt-1 text-[#25D366] opacity-80 group-hover:opacity-100 transition-opacity">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-ink/40 mb-1">Fastest Response</p>
                <p className="font-serif text-xl text-ink mb-1">WhatsApp Inquiry</p>
                <p className="text-sm text-ink/60">+91 79840 62415 · Typically responds within 2 hours</p>
                <p className="mt-3 text-[10px] uppercase tracking-[0.15em] text-[#25D366] group-hover:underline">Chat Now →</p>
              </div>
            </a>

            {/* Phone */}
            <a
              href="tel:+917984062415"
              className="group flex items-start gap-6 border border-border p-6 hover:border-ink/40 transition-colors"
            >
              <div className="mt-1 text-ink/50">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.61A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-ink/40 mb-1">Call Us</p>
                <p className="font-serif text-xl text-ink mb-1">+91 79840 62415</p>
                <p className="text-sm text-ink/60">Mon – Sat · 10 AM – 7 PM IST</p>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:radharanigemstone@gmail.com"
              className="group flex items-start gap-6 border border-border p-6 hover:border-ink/40 transition-colors"
            >
              <div className="mt-1 text-ink/50">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M2 7l10 7 10-7" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-ink/40 mb-1">Email</p>
                <p className="font-serif text-xl text-ink mb-1">radharanigemstone@gmail.com</p>
                <p className="text-sm text-ink/60">We respond within 24 business hours</p>
              </div>
            </a>


          </div>

          {/* Inquiry Form */}
          <div>
            <h2 className="font-serif text-3xl text-ink mb-8">Send an Inquiry</h2>
            <div className="bg-ink p-8 text-cream space-y-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-cream/40">Quick Inquiry Form</p>
              <p className="font-serif text-lg text-cream/80 leading-relaxed">
                Fill the form below and our team will contact you within 24 hours.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.18em] text-cream/40 block mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full bg-transparent border border-cream/20 px-4 py-3 text-sm text-cream placeholder:text-cream/30 outline-none focus:border-cream/60 transition"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.18em] text-cream/40 block mb-2">Phone</label>
                    <input
                      type="tel"
                      placeholder="+91 00000 00000"
                      className="w-full bg-transparent border border-cream/20 px-4 py-3 text-sm text-cream placeholder:text-cream/30 outline-none focus:border-cream/60 transition"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.18em] text-cream/40 block mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="you@email.com"
                      className="w-full bg-transparent border border-cream/20 px-4 py-3 text-sm text-cream placeholder:text-cream/30 outline-none focus:border-cream/60 transition"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.18em] text-cream/40 block mb-2">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us what you're looking for - gemstone type, occasion, custom design, etc."
                    className="w-full bg-transparent border border-cream/20 px-4 py-3 text-sm text-cream placeholder:text-cream/30 outline-none focus:border-cream/60 transition resize-none"
                  />
                </div>
                <Link
                  href="/custom"
                  className="block w-full text-center bg-cream text-ink py-4 text-[11px] uppercase tracking-[0.25em] hover:bg-cream/90 transition"
                >
                  Submit Inquiry via Custom Page →
                </Link>
                <p className="text-center text-[10px] text-cream/30 uppercase tracking-wider">
                  Or WhatsApp us for an instant response
                </p>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full border border-[#25D366] text-[#25D366] py-3 text-[11px] uppercase tracking-[0.2em] hover:bg-[#25D366] hover:text-white transition"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
