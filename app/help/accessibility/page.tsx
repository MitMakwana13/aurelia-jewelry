import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessibility Statement | Radha Rani Heritage Collection",
  description: "Our commitment to ensuring digital accessibility for all users.",
};

export default function AccessibilityPage() {
  return (
    <div>
      <h1 className="font-serif text-4xl md:text-5xl">Accessibility Statement</h1>
      <p className="mt-3 text-sm text-ink-muted">Last Updated: July 2026</p>

      <div className="mt-10 border-t border-border pt-8 space-y-10">
        <section>
          <h2 className="font-serif text-2xl mb-4">Our Commitment</h2>
          <p className="text-sm leading-relaxed text-ink-soft">
            Radha Rani Heritage Collection is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards to guarantee our platform is inclusive and usable by all.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl mb-4">Measures to Support Accessibility</h2>
          <p className="text-sm leading-relaxed text-ink-soft mb-3">
            We take the following measures to ensure accessibility of the Radha Rani Heritage Collection website:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed text-ink-soft">
            <li>Include accessibility as a core requirement during our design and development processes.</li>
            <li>Maintain clear, readable typography with appropriate contrast ratios.</li>
            <li>Ensure our inquiry workflows and navigation elements are intuitive.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl mb-4">Conformance Status</h2>
          <p className="text-sm leading-relaxed text-ink-soft">
            We strive to adhere to the Web Content Accessibility Guidelines (WCAG) 2.1 level AA. These guidelines explain how to make web content more accessible for people with disabilities and user-friendly for everyone. While we strive to meet these guidelines, we recognize that there may be areas of our website that require improvement.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl mb-4">Feedback & Assistance</h2>
          <p className="text-sm leading-relaxed text-ink-soft mb-4">
            We welcome your feedback on the accessibility of our website. If you encounter any accessibility barriers while navigating our collections or attempting to contact our concierge, please let us know. We will make all reasonable efforts to provide you with the information, item, or transaction you seek through an alternate communication method that is accessible for you (for example, through telephone support).
          </p>
          <p className="text-sm leading-relaxed text-ink-soft">
            Please contact us at:
            <br />
            <strong className="text-ink">Email:</strong> <a href="mailto:radharanigemstone@gmail.com" className="underline underline-offset-2 hover:text-ink transition-colors">radharanigemstone@gmail.com</a>
            <br />
            We aim to respond to accessibility feedback within 24 business hours.
          </p>
        </section>
      </div>
    </div>
  );
}
