import type { Metadata } from "next";
import { InquiryPageClient } from "./InquiryPageClient";

export const metadata: Metadata = {
  title: "Custom Jewelry & Inquiry",
  description:
    "Submit an inquiry for custom jewelry, certified gemstones, or diamonds. Radha Rani Gemstone crafts bespoke pieces to your exact vision.",
  openGraph: {
    title: "Custom Jewelry & Inquiry | Radha Rani Gemstone",
    description: "Bespoke gemstone and diamond jewelry crafted to your vision by Radha Rani Gemstone.",
  },
};

export default function CustomPage() {
  return <InquiryPageClient />;
}
