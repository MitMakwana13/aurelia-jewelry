import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Radha Rani Heritage Collection",
  description: "Terms and conditions for interacting with our bespoke jewelry and gemstone services.",
};

export default function TermsPage() {
  return (
    <div className="pt-32 pb-24 lg:pt-40 lg:pb-32">
      <div className="container-x max-w-3xl mx-auto">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink mb-6">Terms of Service</h1>
        <p className="text-[10px] uppercase tracking-[0.2em] text-ink/40 mb-12">
          Last Updated: July 2026
        </p>

        <div className="prose prose-stone prose-sm md:prose-base max-w-none prose-headings:font-serif prose-headings:font-normal prose-headings:text-ink prose-p:text-ink/70 prose-a:text-gold-dark hover:prose-a:text-gold prose-strong:text-ink">
          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing or using the Radha Rani Heritage Collection website and our bespoke services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
          </p>

          <h2>2. Concierge and Inquiry-Based Services</h2>
          <p>
            Radha Rani Heritage Collection operates on an inquiry-based luxury model. We do not process direct e-commerce transactions on this platform. Submitting an inquiry does not constitute a binding purchase agreement. All final sales, pricing, and fulfillment are handled privately through our dedicated concierge team after initial consultation.
          </p>

          <h2>3. Product Availability and Description</h2>
          <p>
            Due to the rare and unique nature of our ethically sourced gemstones and bespoke jewelry, availability is strictly subject to prior sale. We make every effort to display the colors, clarity, and descriptions of our products accurately; however, variations may occur due to digital display differences. All carat weights and dimensions provided are approximate unless specifically certified.
          </p>

          <h2>4. Pricing</h2>
          <p>
            All price estimates provided during consultations are subject to market fluctuations, especially regarding precious metals and rare gemstones. A final, binding quote will be provided directly to the client prior to concluding any transaction offline.
          </p>

          <h2>5. Intellectual Property</h2>
          <p>
            The website and its original content, features, and functionality—including all jewelry designs, images, text, and branding—are owned by Radha Rani Heritage Collection and are protected by international copyright, trademark, and other intellectual property laws. You may not use our content for commercial purposes without explicit written consent.
          </p>

          <h2>6. Bespoke Orders and Returns</h2>
          <p>
            Policies regarding deposits, bespoke design approvals, final delivery, and returns will be provided in writing to the client during the direct consultation process. General terms for custom pieces typically require a non-refundable deposit once a design is approved for manufacturing.
          </p>

          <h2>7. Contact Information</h2>
          <p>
            For any questions regarding these Terms of Service, please reach out to our concierge at:
            <br />
            <a href="mailto:radharanigemstone@gmail.com">radharanigemstone@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}
