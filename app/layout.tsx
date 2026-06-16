import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "@/styles/globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { MobileNav } from "@/components/layout/MobileNav";
import { SearchOverlay } from "@/components/layout/SearchOverlay";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Aurelia — Fine Jewelry",
    template: "%s · Aurelia",
  },
  description:
    "Aurelia crafts fine, everyday jewelry in solid 14k gold and recycled sterling silver. Designed to be worn — and never taken off.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  openGraph: {
    title: "Aurelia — Fine Jewelry",
    description: "Fine, everyday jewelry. Solid 14k gold. Recycled sterling silver.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body>
        <AnnouncementBar />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <CartDrawer />
        <MobileNav />
        <SearchOverlay />
      </body>
    </html>
  );
}
