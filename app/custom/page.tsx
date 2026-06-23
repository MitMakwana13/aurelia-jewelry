import type { Metadata } from "next";
import { InquiryPageClient } from "./InquiryPageClient";

export const metadata: Metadata = {
  title: "Custom Jewelry & Inquiry",
  description:
    "Submit an inquiry for custom jewelry, gemstones, or diamonds. Radharani Gemstone crafts bespoke pieces. Share your vision and we will create it for you. 50% advance to begin.",
  openGraph: {
    title: "Custom Jewelry & Inquiry · Radharani Gemstone",
    description: "Bespoke gemstone and diamond jewelry crafted to your vision. Contact us to begin.",
  },
};

export default function CustomPage() {
  return <InquiryPageClient />;
}
