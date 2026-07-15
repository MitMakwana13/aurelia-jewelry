export type NavLink = { label: string; href: string };
export type NavColumn = { heading: string; links: NavLink[] };
export type NavItem = { label: string; href: string; columns?: NavColumn[]; feature?: { title: string; href: string; image: string } };

export const mainNav: NavItem[] = [
  {
    label: "Gemstones",
    href: "/shop/gemstones",
    columns: [
      {
        heading: "Shop by Type",
        links: [
          { label: "All Gemstones", href: "/shop/gemstones" },
          { label: "Rare Rubies", href: "/shop/gemstones?type=ruby" },
          { label: "Yellow Sapphires", href: "/shop/gemstones?type=yellow-sapphire" },
          { label: "Red Coral", href: "/shop/gemstones?type=red-coral" },
        ],
      },
      {
        heading: "Collections",
        links: [
          { label: "Rare & Precious", href: "/collections/rare" },
          { label: "New Arrivals", href: "/shop?filter=new" },
        ],
      },
    ],
  },
  {
    label: "Bespoke Jewelry",
    href: "/shop/jewelry",
    columns: [
      {
        heading: "Shop by Category",
        links: [
          { label: "All Jewelry", href: "/shop/jewelry" },
          { label: "Rings", href: "/shop/rings" },
          { label: "Necklaces", href: "/shop/necklaces" },
          { label: "Bracelets", href: "/shop/bracelets" },
          { label: "Bangles", href: "/shop/bangles" },
        ],
      },
    ],
  },
  {
    label: "Custom Inquiry",
    href: "/custom",
  },
  {
    label: "Collections",
    href: "/collections",
    columns: [
      {
        heading: "Featured",
        links: [
          { label: "Rare & Precious", href: "/collections/rare" },
          { label: "Bespoke Rings", href: "/collections/bespoke-rings" },
          { label: "Bespoke Necklaces", href: "/collections/bespoke-necklaces" },
        ],
      },
      {
        heading: "More Bespoke",
        links: [
          { label: "Bespoke Bangles", href: "/collections/bespoke-bangles" },
          { label: "Bespoke Bracelets", href: "/collections/bespoke-bracelets" },
        ],
      },
    ],
  },
  {
    label: "About",
    href: "/about",
  },
];

export const footerNav = {
  help: {
    heading: "Help",
    links: [
      { label: "FAQs", href: "/help/faq" },
      { label: "Returns & Exchanges", href: "/help/returns" },
      { label: "Ring Sizing", href: "/help/sizing" },
      { label: "Care Guide", href: "/help/care" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  services: {
    heading: "Services",
    links: [
      { label: "Custom Jewelry", href: "/custom" },
      { label: "Book Consultation", href: "/custom" },
      { label: "Gem Certification", href: "/help/gem-certification" },
    ],
  },
  resources: {
    heading: "Resources",
    links: [
      { label: "Gem Guide", href: "/help/gem-guide" },
    ],
  },
  company: {
    heading: "Company",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Craftsmanship", href: "/about" },
    ],
  },
};
