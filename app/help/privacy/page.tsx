import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Radha Rani Heritage Collection",
  description: "Our commitment to protecting your privacy and personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-24 lg:pt-40 lg:pb-32">
      <div className="container-x max-w-3xl mx-auto">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink mb-6">Privacy Policy</h1>
        <p className="text-[10px] uppercase tracking-[0.2em] text-ink/40 mb-12">
          Last Updated: July 2026
        </p>

        <div className="prose prose-stone prose-sm md:prose-base max-w-none prose-headings:font-serif prose-headings:font-normal prose-headings:text-ink prose-p:text-ink/70 prose-a:text-gold-dark hover:prose-a:text-gold prose-strong:text-ink">
          <h2>1. Introduction</h2>
          <p>
            At Radha Rani Heritage Collection ("we," "our," or "us"), we respect your privacy and are committed to protecting your personal data. This Privacy Policy outlines how we collect, use, and safeguard your information when you visit our website or interact with our bespoke concierge services.
          </p>

          <h2>2. Information We Collect</h2>
          <p>
            As an inquiry-based luxury platform, we only collect information necessary to provide you with our concierge services. This may include:
          </p>
          <ul>
            <li><strong>Contact Information:</strong> Name, email address, phone number, and any other details you provide when submitting an inquiry or contacting us directly.</li>
            <li><strong>Service Preferences:</strong> Details regarding your gemstone interests, custom jewelry requests, and budget preferences to better serve your bespoke needs.</li>
            <li><strong>Technical Data:</strong> We may collect standard technical data (such as IP address, browser type, and interaction data) to ensure our website functions optimally.</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>
            The information we collect is strictly used to facilitate your luxury shopping experience:
          </p>
          <ul>
            <li>To respond to your inquiries and provide bespoke consultations.</li>
            <li>To schedule appointments or follow up on custom jewelry requests.</li>
            <li>To communicate updates regarding our collections or services (only if you have opted in).</li>
            <li>To improve our website's functionality and user experience.</li>
          </ul>

          <h2>4. Data Sharing and Protection</h2>
          <p>
            We value your discretion. We do <strong>not</strong> sell, rent, or trade your personal information to third parties. Your data is only shared with trusted service providers who assist us in operating our website or conducting our business, so long as those parties agree to keep this information confidential. 
            We implement industry-standard security measures to protect your personal data from unauthorized access, disclosure, or destruction.
          </p>

          <h2>5. Your Rights</h2>
          <p>
            You have the right to request access to the personal data we hold about you, request corrections, or request deletion of your data. If you wish to exercise any of these rights, please contact us using the details below.
          </p>

          <h2>6. Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy, please contact us at:
            <br />
            <a href="mailto:radharanigemstone@gmail.com">radharanigemstone@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}
