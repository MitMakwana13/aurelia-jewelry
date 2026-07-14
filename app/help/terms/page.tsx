import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Radha Rani Heritage Collection",
  description: "Terms and conditions for interacting with our bespoke jewelry and gemstone services.",
};

export default function TermsPage() {
  return (
    <div>
      <h1 className="font-serif text-4xl md:text-5xl">Terms of Service</h1>
      <p className="mt-3 text-sm text-ink-muted">Last Updated: July 2026</p>

      <div className="mt-10 border-t border-border pt-8 space-y-10">
        <section>
          <h2 className="font-serif text-2xl mb-4">1. Agreement to Terms</h2>
          <p className="text-sm leading-relaxed text-ink-soft">
            By accessing or using the Radha Rani Heritage Collection website and our bespoke services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl mb-4">2. Concierge and Inquiry-Based Services</h2>
          <p className="text-sm leading-relaxed text-ink-soft">
            Radha Rani Heritage Collection operates on an inquiry-based luxury model. We do not process direct e-commerce transactions on this platform. Submitting an inquiry does not constitute a binding purchase agreement. All final sales, pricing, and fulfillment are handled privately through our dedicated concierge team after initial consultation.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl mb-4">3. Product Availability and Description</h2>
          <p className="text-sm leading-relaxed text-ink-soft">
            Due to the rare and unique nature of our ethically sourced gemstones and bespoke jewelry, availability is strictly subject to prior sale. We make every effort to display the colors, clarity, and descriptions of our products accurately; however, variations may occur due to digital display differences. All carat weights and dimensions provided are approximate unless specifically certified.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl mb-4">4. Pricing</h2>
          <p className="text-sm leading-relaxed text-ink-soft">
            All price estimates provided during consultations are subject to market fluctuations, especially regarding precious metals and rare gemstones. A final, binding quote will be provided directly to the client prior to concluding any transaction offline.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl mb-4">5. Intellectual Property</h2>
          <p className="text-sm leading-relaxed text-ink-soft">
            The website and its original content, features, and functionality—including all jewelry designs, images, text, and branding—are owned by Radha Rani Heritage Collection and are protected by international copyright, trademark, and other intellectual property laws. You may not use our content for commercial purposes without explicit written consent.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl mb-4">6. Bespoke Orders and Returns</h2>
          <p className="text-sm leading-relaxed text-ink-soft">
            Policies regarding deposits, bespoke design approvals, final delivery, and returns will be provided in writing to the client during the direct consultation process. General terms for custom pieces typically require a non-refundable deposit once a design is approved for manufacturing.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl mb-4">7. Contact Information</h2>
          <p className="text-sm leading-relaxed text-ink-soft">
            For any questions regarding these Terms of Service, please reach out to our concierge at:
            <br />
            <a href="mailto:radharanigemstone@gmail.com" className="underline underline-offset-2 hover:text-ink transition-colors">radharanigemstone@gmail.com</a>
          </p>
        </section>
      </div>
    </div>
  );
}
