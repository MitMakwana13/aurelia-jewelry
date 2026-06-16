export type NavLink = { label: string; href: string };
export type NavColumn = { heading: string; links: NavLink[] };
export type NavItem = { label: string; href: string; columns?: NavColumn[]; feature?: { title: string; href: string; image: string } };

export const mainNav: NavItem[] = [
  {
    label: "All Jewelry",
    href: "/shop",
    columns: [
      {
        heading: "Shop by Category",
        links: [
          { label: "All Jewelry", href: "/shop" },
          { label: "Rings", href: "/shop/rings" },
          { label: "Necklaces", href: "/shop/necklaces" },
          { label: "Earrings", href: "/shop/earrings" },
          { label: "Bracelets", href: "/shop/bracelets" },
        ],
      },
      {
        heading: "Shop by Material",
        links: [
          { label: "14k Gold", href: "/shop?metal=14k+Gold" },
          { label: "Gold Vermeil", href: "/shop?metal=14k+Gold+Vermeil" },
          { label: "Sterling Silver", href: "/shop?metal=Sterling+Silver" },
          { label: "Diamonds", href: "/shop?tag=diamond" },
        ],
      },
      {
        heading: "Shop by Style",
        links: [
          { label: "Stacking Rings", href: "/shop?tag=stacker" },
          { label: "Hoops", href: "/shop?tag=hoops" },
          { label: "Chains", href: "/shop?tag=chain" },
          { label: "Pendants", href: "/shop?tag=pendant" },
        ],
      },
    ],
  },
  {
    label: "New In",
    href: "/shop?filter=new",
  },
  {
    label: "Gifts",
    href: "/collections/everyday-essentials",
  },
  {
    label: "Collections",
    href: "/collections",
    columns: [
      {
        heading: "Featured",
        links: [
          { label: "Everyday Essentials", href: "/collections/everyday-essentials" },
          { label: "Solid Gold", href: "/collections/solid-gold" },
          { label: "Puzzle", href: "/collections/puzzle" },
          { label: "Dôme", href: "/collections/dome" },
        ],
      },
      {
        heading: "By Material",
        links: [
          { label: "Birthstones", href: "/collections/birthstones" },
          { label: "Sterling Silver", href: "/collections/sterling-silver" },
        ],
      },
    ],
  },
  {
    label: "Stores",
    href: "/stores",
  },
];

export const footerNav = {
  help: {
    heading: "Help",
    links: [
      { label: "FAQs", href: "/help/faq" },
      { label: "Shipping", href: "/help/shipping" },
      { label: "Returns & Exchanges", href: "/help/returns" },
      { label: "Ring Sizing", href: "/help/sizing" },
      { label: "Care Guide", href: "/help/care" },
      { label: "Contact Us", href: "/help/faq" },
    ],
  },
  services: {
    heading: "Stores & Services",
    links: [
      { label: "Store Locator", href: "/stores" },
      { label: "Book an Appointment", href: "/stores" },
      { label: "Piercing", href: "/stores" },
      { label: "Free Cleaning", href: "/stores" },
    ],
  },
  resources: {
    heading: "Resources",
    links: [
      { label: "Style Guide", href: "/about" },
      { label: "Metal Guide", href: "/help/care" },
      { label: "Gift Cards", href: "/collections/everyday-essentials" },
    ],
  },
  company: {
    heading: "Company",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Journal", href: "/about" },
      { label: "Careers", href: "/about" },
    ],
  },
  membership: {
    heading: "Membership",
    links: [
      { label: "Join the Circle", href: "/account" },
      { label: "Member Benefits", href: "/account" },
    ],
  },
};
