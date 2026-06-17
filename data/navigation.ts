export type NavLink = { label: string; href: string };
export type NavColumn = { heading: string; links: NavLink[] };
export type NavItem = { label: string; href: string; columns?: NavColumn[]; feature?: { title: string; href: string; image: string } };

export const mainNav: NavItem[] = [
  {
    label: "High Jewelry",
    href: "/shop/jewelry",
    columns: [
      {
        heading: "The Heritage Collection",
        links: [
          { label: "View All Masterpieces", href: "/shop/jewelry" },
          { label: "Bridal Trousseau", href: "/shop/jewelry?filter=bridal" },
          { label: "Kundan & Polki", href: "/shop/jewelry?filter=kundan" },
          { label: "Diamond Solitaires", href: "/shop/jewelry?filter=diamond" },
        ],
      },
      {
        heading: "By Category",
        links: [
          { label: "Necklaces & Chokers", href: "/shop/jewelry?category=necklaces" },
          { label: "Rings", href: "/shop/jewelry?category=rings" },
          { label: "Bangles & Bracelets", href: "/shop/jewelry?category=bracelets" },
          { label: "Earrings", href: "/shop/jewelry?category=earrings" },
        ],
      },
    ],
  },
  {
    label: "Astrological Gems",
    href: "/shop/gemstones",
    columns: [
      {
        heading: "The Navratna",
        links: [
          { label: "Yellow Sapphire (Pukhraj)", href: "/shop/gemstones?type=pukhraj" },
          { label: "Blue Sapphire (Neelam)", href: "/shop/gemstones?type=neelam" },
          { label: "Ruby (Manik)", href: "/shop/gemstones?type=manik" },
          { label: "Emerald (Panna)", href: "/shop/gemstones?type=panna" },
          { label: "View All 9 Cosmic Stones", href: "/shop/gemstones" },
        ],
      },
      {
        heading: "Certifications",
        links: [
          { label: "GIA Certified", href: "/shop/gemstones?cert=gia" },
          { label: "IGI Certified", href: "/shop/gemstones?cert=igi" },
          { label: "Unheated & Untreated", href: "/shop/gemstones?filter=unheated" },
        ],
      },
    ],
  },
  {
    label: "Bespoke Commissions",
    href: "/custom",
  },
  {
    label: "Knowledge Hub",
    href: "/knowledge",
  },
  {
    label: "The Atelier",
    href: "/about",
  },
];

export const footerNav = {
  atelier: {
    heading: "The Atelier",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Bespoke Process", href: "/custom" },
      { label: "Gem Certifications", href: "/knowledge/certifications" },
      { label: "Careers", href: "/about" },
    ],
  },
  services: {
    heading: "Client Services",
    links: [
      { label: "Request Consultation", href: "/custom" },
      { label: "Shipping & Insurance", href: "/help/shipping" },
      { label: "Returns Policy", href: "/help/returns" },
      { label: "Care & Maintenance", href: "/help/care" },
    ],
  },
  knowledge: {
    heading: "Knowledge",
    links: [
      { label: "Zodiac Gemstones", href: "/knowledge/gemstones-by-zodiac" },
      { label: "Identifying Unheated Gems", href: "/knowledge/identifying-original-gemstones" },
      { label: "Diamond 4Cs", href: "/knowledge/diamonds" },
    ],
  },
  contact: {
    heading: "Contact",
    links: [
      { label: "WhatsApp Concierge", href: "#" },
      { label: "Email Us", href: "mailto:concierge@radharani-jewelry.com" },
      { label: "Book Showroom Appointment", href: "/custom" },
    ],
  },
};
