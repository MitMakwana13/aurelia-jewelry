import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessibility Statement | Radha Rani Heritage Collection",
  description: "Our commitment to ensuring digital accessibility for all users.",
};

export default function AccessibilityPage() {
  return (
    <div className="pt-32 pb-24 lg:pt-40 lg:pb-32">
      <div className="container-x max-w-3xl mx-auto">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink mb-6">Accessibility Statement</h1>
        <p className="text-[10px] uppercase tracking-[0.2em] text-ink/40 mb-12">
          Last Updated: July 2026
        </p>

        <div className="prose prose-stone prose-sm md:prose-base max-w-none prose-headings:font-serif prose-headings:font-normal prose-headings:text-ink prose-p:text-ink/70 prose-a:text-gold-dark hover:prose-a:text-gold prose-strong:text-ink">
          <h2>Our Commitment</h2>
          <p>
            Radha Rani Heritage Collection is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards to guarantee our platform is inclusive and usable by all.
          </p>

          <h2>Measures to Support Accessibility</h2>
          <p>
            We take the following measures to ensure accessibility of the Radha Rani Heritage Collection website:
          </p>
          <ul>
            <li>Include accessibility as a core requirement during our design and development processes.</li>
            <li>Maintain clear, readable typography with appropriate contrast ratios.</li>
            <li>Ensure our inquiry workflows and navigation elements are intuitive.</li>
          </ul>

          <h2>Conformance Status</h2>
          <p>
            We strive to adhere to the Web Content Accessibility Guidelines (WCAG) 2.1 level AA. These guidelines explain how to make web content more accessible for people with disabilities and user-friendly for everyone. While we strive to meet these guidelines, we recognize that there may be areas of our website that require improvement.
          </p>

          <h2>Feedback & Assistance</h2>
          <p>
            We welcome your feedback on the accessibility of our website. If you encounter any accessibility barriers while navigating our collections or attempting to contact our concierge, please let us know. We will make all reasonable efforts to provide you with the information, item, or transaction you seek through an alternate communication method that is accessible for you (for example, through telephone support).
          </p>
          <p>
            Please contact us at:
            <br />
            <strong>Email:</strong> <a href="mailto:radharanigemstone@gmail.com">radharanigemstone@gmail.com</a>
            <br />
            We aim to respond to accessibility feedback within 24 business hours.
          </p>
        </div>
      </div>
    </div>
  );
}
