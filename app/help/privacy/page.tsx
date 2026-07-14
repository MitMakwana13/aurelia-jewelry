import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Radha Rani Heritage Collection",
  description: "Our commitment to protecting your privacy and personal information.",
};

export default function PrivacyPage() {
  return (
    <div>
      <h1 className="font-serif text-4xl md:text-5xl">Privacy Policy</h1>
      <p className="mt-3 text-sm text-ink-muted">Last Updated: July 2026</p>

      <div className="mt-10 border-t border-border pt-8 space-y-10">
        <section>
          <h2 className="font-serif text-2xl mb-4">1. Introduction</h2>
          <p className="text-sm leading-relaxed text-ink-soft">
            At Radha Rani Heritage Collection ("we," "our," or "us"), we respect your privacy and are committed to protecting your personal data. This Privacy Policy outlines how we collect, use, and safeguard your information when you visit our website or interact with our bespoke concierge services.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl mb-4">2. Information We Collect</h2>
          <p className="text-sm leading-relaxed text-ink-soft mb-3">
            As an inquiry-based luxury platform, we only collect information necessary to provide you with our concierge services. This may include:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed text-ink-soft">
            <li><strong className="text-ink">Contact Information:</strong> Name, email address, phone number, and any other details you provide when submitting an inquiry or contacting us directly.</li>
            <li><strong className="text-ink">Service Preferences:</strong> Details regarding your gemstone interests, custom jewelry requests, and budget preferences to better serve your bespoke needs.</li>
            <li><strong className="text-ink">Technical Data:</strong> We may collect standard technical data (such as IP address, browser type, and interaction data) to ensure our website functions optimally.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl mb-4">3. How We Use Your Information</h2>
          <p className="text-sm leading-relaxed text-ink-soft mb-3">
            The information we collect is strictly used to facilitate your luxury shopping experience:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed text-ink-soft">
            <li>To respond to your inquiries and provide bespoke consultations.</li>
            <li>To schedule appointments or follow up on custom jewelry requests.</li>
            <li>To communicate updates regarding our collections or services (only if you have opted in).</li>
            <li>To improve our website's functionality and user experience.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl mb-4">4. Data Sharing and Protection</h2>
          <p className="text-sm leading-relaxed text-ink-soft">
            We value your discretion. We do <strong className="text-ink">not</strong> sell, rent, or trade your personal information to third parties. Your data is only shared with trusted service providers who assist us in operating our website or conducting our business, so long as those parties agree to keep this information confidential. We implement industry-standard security measures to protect your personal data from unauthorized access, disclosure, or destruction.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl mb-4">5. Your Rights</h2>
          <p className="text-sm leading-relaxed text-ink-soft">
            You have the right to request access to the personal data we hold about you, request corrections, or request deletion of your data. If you wish to exercise any of these rights, please contact us using the details below.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl mb-4">6. Contact Us</h2>
          <p className="text-sm leading-relaxed text-ink-soft">
            If you have any questions or concerns about this Privacy Policy, please contact us at:
            <br />
            <a href="mailto:radharanigemstone@gmail.com" className="underline underline-offset-2 hover:text-ink transition-colors">radharanigemstone@gmail.com</a>
          </p>
        </section>
      </div>
    </div>
  );
}
