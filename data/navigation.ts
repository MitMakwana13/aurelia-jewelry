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
          { label: "Ruby (Manik)", href: "/shop/gemstones?type=ruby" },
          { label: "Emerald (Panna)", href: "/shop/gemstones?type=emerald" },
          { label: "Blue Sapphire (Neelam)", href: "/shop/gemstones?type=blue-sapphire" },
          { label: "Yellow Sapphire (Pukhraj)", href: "/shop/gemstones?type=yellow-sapphire" },
          { label: "Pearl (Moti)", href: "/shop/gemstones?type=pearl" },
        ],
      },
      {
        heading: "More Navratna Stones",
        links: [
          { label: "Red Coral (Moonga)", href: "/shop/gemstones?type=red-coral" },
          { label: "Diamond (Heera)", href: "/shop/gemstones?type=diamond-gem" },
          { label: "Hessonite (Gomed)", href: "/shop/gemstones?type=hessonite" },
          { label: "Cat's Eye (Lehsunia)", href: "/shop/gemstones?type=cats-eye" },
        ],
      },
      {
        heading: "Collections",
        links: [
          { label: "Birthstones", href: "/collections/birthstones" },
          { label: "Rare & Precious", href: "/collections/rare" },
          { label: "New Arrivals", href: "/shop?filter=new" },
        ],
      },
    ],
  },
  {
    label: "Diamonds",
    href: "/shop/diamonds",
    columns: [
      {
        heading: "Shop by Shape",
        links: [
          { label: "All Diamonds", href: "/shop/diamonds" },
          { label: "Round Brilliant", href: "/shop/diamonds?shape=round" },
          { label: "Princess Cut", href: "/shop/diamonds?shape=princess" },
          { label: "Cushion Cut", href: "/shop/diamonds?shape=cushion" },
          { label: "Marquise", href: "/shop/diamonds?shape=marquise" },
          { label: "Pear Shape", href: "/shop/diamonds?shape=pear" },
        ],
      },
      {
        heading: "By Quality",
        links: [
          { label: "IF / FL (Flawless)", href: "/shop/diamonds?clarity=fl" },
          { label: "VVS1 / VVS2", href: "/shop/diamonds?clarity=vvs" },
          { label: "VS1 / VS2", href: "/shop/diamonds?clarity=vs" },
          { label: "Solitaires", href: "/shop/diamonds?type=solitaire" },
        ],
      },
    ],
  },
  {
    label: "Jewelry",
    href: "/shop/jewelry",
    columns: [
      {
        heading: "Shop by Category",
        links: [
          { label: "All Jewelry", href: "/shop/jewelry" },
          { label: "Rings", href: "/shop/jewelry/rings" },
          { label: "Necklaces", href: "/shop/jewelry/necklaces" },
          { label: "Earrings", href: "/shop/jewelry/earrings" },
          { label: "Bracelets", href: "/shop/jewelry/bracelets" },
          { label: "Bangles", href: "/shop/jewelry/bangles" },
        ],
      },
      {
        heading: "By Metal",
        links: [
          { label: "Gold", href: "/shop/jewelry?metal=gold" },
          { label: "Rose Gold", href: "/shop/jewelry?metal=rose-gold" },
          { label: "Silver", href: "/shop/jewelry?metal=silver" },
          { label: "Platinum", href: "/shop/jewelry?metal=platinum" },
        ],
      },
      {
        heading: "Coming Soon",
        links: [
          { label: "Bridal Collection", href: "/shop/jewelry" },
          { label: "Festive Specials", href: "/shop/jewelry" },
        ],
      },
    ],
  },
  {
    label: "Custom",
    href: "/custom",
  },
  {
    label: "Collections",
    href: "/collections",
    columns: [
      {
        heading: "Featured",
        links: [
          { label: "Birthstones", href: "/collections/birthstones" },
          { label: "Solitaires", href: "/collections/solitaire" },
          { label: "Wedding", href: "/collections/wedding" },
          { label: "Everyday Wear", href: "/collections/everyday" },
        ],
      },
      {
        heading: "By Occasion",
        links: [
          { label: "Gifting", href: "/collections/gifting" },
          { label: "Festivals", href: "/collections/festivals" },
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
