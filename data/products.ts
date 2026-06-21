import type { Product } from "@/lib/commerce/types";

const INR = "INR";
const img = (id: string, alt: string) => ({
  url: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`,
  alt,
});

const metalPricing: Record<string, number> = {
  "14k Gold": 1,
  "14k Gold Vermeil": 0.45,
  "Sterling Silver": 0.35,
  "Rose Gold": 0.95,
};

function makeVariants(base: number, metals: string[], sizes?: string[]) {
  const variants = [];
  for (const metal of metals) {
    const metalPrice = Math.round(base * (metalPricing[metal] ?? 1));
    if (sizes && sizes.length) {
      for (const size of sizes) {
        variants.push({
          id: `${metal}-${size}`.toLowerCase().replace(/\s+/g, "-"),
          title: `${metal} / ${size}`,
          metal,
          size,
          price: { amount: metalPrice, currency: INR },
          available: true,
          sku: `${metal.slice(0, 3).toUpperCase()}-${size}`,
        });
      }
    } else {
      variants.push({
        id: metal.toLowerCase().replace(/\s+/g, "-"),
        title: metal,
        metal,
        price: { amount: metalPrice, currency: USD },
        available: true,
        sku: `${metal.slice(0, 3).toUpperCase()}`,
      });
    }
  }
  return variants;
}

type Seed = {
  handle: string;
  title: string;
  description: string;
  categorySlug: string;
  collectionSlugs: string[];
  tags: string[];
  metals: string[];
  sizes?: string[];
  basePrice: number;
  images: { id: string; alt: string }[];
  featured?: boolean;
  trending?: boolean;
  newArrival?: boolean;
  bestseller?: boolean;
};

const seeds: Seed[] = [
  {
    handle: "slim-band",
    title: "Slim Band",
    description: "Our thinnest stacking band, designed to layer with any ring. Comfort-fit interior.",
    categorySlug: "rings",
    collectionSlugs: ["everyday-essentials"],
    tags: ["stacker", "minimal"],
    metals: ["14k Gold", "14k Gold Vermeil", "Sterling Silver"],
    sizes: ["5", "6", "7", "8", "9"],
    basePrice: 450,
    images: [
      { id: "photo-1603974372039-adc49044b6bd", alt: "Slim gold band on finger" },
      { id: "photo-1605100804763-247f67b3557e", alt: "Close-up of slim band" },
    ],
    bestseller: true,
    trending: true,
  },
  {
    handle: "dome-ring",
    title: "Dôme Ring",
    description: "A sculpted half-round silhouette, polished to a soft sheen. Substantial without being heavy.",
    categorySlug: "rings",
    collectionSlugs: ["solid-gold", "dome", "everyday-essentials"],
    tags: ["statement", "dome"],
    metals: ["14k Gold", "14k Gold Vermeil"],
    sizes: ["5", "6", "7", "8"],
    basePrice: 680,
    images: [
      { id: "photo-1605100804763-247f67b3557e", alt: "Dome ring on linen" },
      { id: "photo-1515562141207-7a88fb7ce338", alt: "Dome ring stacked" },
    ],
    featured: true,
    trending: true,
  },
  {
    handle: "signet-ring",
    title: "Oval Signet",
    description: "A classic oval signet with a smooth unengraved face, ready to be made your own.",
    categorySlug: "rings",
    collectionSlugs: ["solid-gold"],
    tags: ["signet", "classic"],
    metals: ["14k Gold", "Sterling Silver"],
    sizes: ["5", "6", "7", "8", "9"],
    basePrice: 890,
    images: [
      { id: "photo-1602173574767-37ac01994b2a", alt: "Oval signet ring" },
    ],
    trending: true,
  },
  {
    handle: "puzzle-ring",
    title: "Puzzle Ring",
    description: "Four interlocking bands that come together as one. A modern take on a traditional form.",
    categorySlug: "rings",
    collectionSlugs: ["puzzle"],
    tags: ["architectural", "puzzle"],
    metals: ["14k Gold", "14k Gold Vermeil"],
    sizes: ["5", "6", "7", "8"],
    basePrice: 1250,
    images: [{ id: "photo-1602173574767-37ac01994b2a", alt: "Puzzle ring" }],
    featured: true,
    newArrival: true,
  },
  {
    handle: "pave-band",
    title: "Pavé Band",
    description: "A delicate band set with a continuous row of ethically sourced white diamonds.",
    categorySlug: "rings",
    collectionSlugs: [],
    tags: ["diamond", "pave"],
    metals: ["14k Gold"],
    sizes: ["5", "6", "7", "8"],
    basePrice: 1480,
    images: [{ id: "photo-1515562141207-7a88fb7ce338", alt: "Pave diamond band" }],
    trending: true,
  },
  {
    handle: "birthstone-ring",
    title: "Birthstone Ring",
    description: "A solitaire setting with your choice of ethically sourced gemstone for each month.",
    categorySlug: "rings",
    collectionSlugs: ["birthstones"],
    tags: ["birthstone", "personal"],
    metals: ["14k Gold", "14k Gold Vermeil"],
    sizes: ["5", "6", "7", "8"],
    basePrice: 520,
    images: [{ id: "photo-1589128777073-263566ae5e4d", alt: "Birthstone ring" }],
    newArrival: true,
  },
  {
    handle: "silver-band",
    title: "Silver Band",
    description: "Recycled sterling silver band with a brushed finish.",
    categorySlug: "rings",
    collectionSlugs: ["sterling-silver"],
    tags: ["stacker", "silver"],
    metals: ["Sterling Silver"],
    sizes: ["5", "6", "7", "8"],
    basePrice: 180,
    images: [{ id: "photo-1588444837495-c6cfeb53f32d", alt: "Silver band ring" }],
  },
  {
    handle: "paperclip-chain",
    title: "Paperclip Chain",
    description: "An elongated link chain with a relaxed drape. 16\" with a 2\" extender.",
    categorySlug: "necklaces",
    collectionSlugs: ["everyday-essentials"],
    tags: ["chain", "layering"],
    metals: ["14k Gold", "14k Gold Vermeil", "Sterling Silver"],
    basePrice: 520,
    images: [
      { id: "photo-1611591437281-460bfbe1220a", alt: "Paperclip chain necklace" },
    ],
    bestseller: true,
    trending: true,
  },
  {
    handle: "chain-rolo",
    title: "Rolo Chain",
    description: "A substantial rolo link in solid gold. Adjustable from 16 to 18 inches.",
    categorySlug: "necklaces",
    collectionSlugs: ["solid-gold"],
    tags: ["chain"],
    metals: ["14k Gold"],
    basePrice: 1100,
    images: [{ id: "photo-1611591437281-460bfbe1220a", alt: "Rolo chain" }],
  },
  {
    handle: "puzzle-pendant",
    title: "Puzzle Pendant",
    description: "A geometric pendant that interlocks with the Puzzle Ring. Hung on a fine cable chain.",
    categorySlug: "necklaces",
    collectionSlugs: ["puzzle"],
    tags: ["pendant", "puzzle"],
    metals: ["14k Gold", "14k Gold Vermeil"],
    basePrice: 690,
    images: [{ id: "photo-1602173574767-37ac01994b2a", alt: "Puzzle pendant" }],
    newArrival: true,
  },
  {
    handle: "dome-pendant",
    title: "Dôme Pendant",
    description: "A smooth, rounded pendant on a delicate chain. Catches light from every angle.",
    categorySlug: "necklaces",
    collectionSlugs: ["dome"],
    tags: ["pendant", "dome"],
    metals: ["14k Gold", "14k Gold Vermeil"],
    basePrice: 580,
    images: [{ id: "photo-1605100804763-247f67b3557e", alt: "Dome pendant" }],
  },
  {
    handle: "birthstone-pendant",
    title: "Birthstone Pendant",
    description: "A bezel-set pendant with your birthstone on a 16\" chain.",
    categorySlug: "necklaces",
    collectionSlugs: ["birthstones"],
    tags: ["birthstone", "pendant"],
    metals: ["14k Gold", "14k Gold Vermeil"],
    basePrice: 440,
    images: [{ id: "photo-1589128777073-263566ae5e4d", alt: "Birthstone pendant" }],
    featured: true,
  },
  {
    handle: "silver-chain",
    title: "Silver Curb Chain",
    description: "A classic curb link chain in recycled sterling silver.",
    categorySlug: "necklaces",
    collectionSlugs: ["sterling-silver"],
    tags: ["chain", "silver"],
    metals: ["Sterling Silver"],
    basePrice: 220,
    images: [{ id: "photo-1588444837495-c6cfeb53f32d", alt: "Silver chain" }],
  },
  {
    handle: "diamond-necklace",
    title: "Diamond Solitaire Necklace",
    description: "A single ethically sourced diamond set on a fine gold chain.",
    categorySlug: "necklaces",
    collectionSlugs: [],
    tags: ["diamond", "solitaire"],
    metals: ["14k Gold"],
    basePrice: 980,
    images: [{ id: "photo-1611591437281-460bfbe1220a", alt: "Diamond solitaire necklace" }],
    trending: true,
  },
  {
    handle: "mini-hoops",
    title: "Mini Hoops",
    description: "Our smallest hoops — 10mm, lightweight, and comfortable enough to sleep in.",
    categorySlug: "earrings",
    collectionSlugs: ["everyday-essentials"],
    tags: ["hoops", "everyday"],
    metals: ["14k Gold", "14k Gold Vermeil", "Sterling Silver"],
    basePrice: 280,
    images: [
      { id: "photo-1535556116002-6281ff3e9f36", alt: "Mini gold hoops" },
    ],
    bestseller: true,
    trending: true,
  },
  {
    handle: "hoop-large",
    title: "Bold Hoops",
    description: "30mm statement hoops, tubular and polished.",
    categorySlug: "earrings",
    collectionSlugs: ["solid-gold"],
    tags: ["hoops", "statement"],
    metals: ["14k Gold", "14k Gold Vermeil"],
    basePrice: 850,
    images: [{ id: "photo-1535556116002-6281ff3e9f36", alt: "Bold gold hoops" }],
    featured: true,
  },
  {
    handle: "dome-earrings",
    title: "Dôme Studs",
    description: "Rounded, substantial studs — the perfect single-earring moment.",
    categorySlug: "earrings",
    collectionSlugs: ["dome"],
    tags: ["studs", "dome"],
    metals: ["14k Gold", "14k Gold Vermeil"],
    basePrice: 360,
    images: [{ id: "photo-1605100804763-247f67b3557e", alt: "Dome studs" }],
    trending: true,
  },
  {
    handle: "puzzle-hoops",
    title: "Puzzle Hoops",
    description: "Huggie hoops with an architectural interlocking detail.",
    categorySlug: "earrings",
    collectionSlugs: ["puzzle"],
    tags: ["hoops", "puzzle"],
    metals: ["14k Gold", "14k Gold Vermeil"],
    basePrice: 420,
    images: [{ id: "photo-1602173574767-37ac01994b2a", alt: "Puzzle hoops" }],
    newArrival: true,
  },
  {
    handle: "birthstone-studs",
    title: "Birthstone Studs",
    description: "Tiny bezel-set birthstone studs. Sold as a pair.",
    categorySlug: "earrings",
    collectionSlugs: ["birthstones"],
    tags: ["studs", "birthstone"],
    metals: ["14k Gold", "14k Gold Vermeil"],
    basePrice: 320,
    images: [{ id: "photo-1589128777073-263566ae5e4d", alt: "Birthstone studs" }],
  },
  {
    handle: "silver-hoops",
    title: "Silver Hoops",
    description: "Classic 15mm hoops in recycled sterling silver.",
    categorySlug: "earrings",
    collectionSlugs: ["sterling-silver"],
    tags: ["hoops", "silver"],
    metals: ["Sterling Silver"],
    basePrice: 140,
    images: [{ id: "photo-1588444837495-c6cfeb53f32d", alt: "Silver hoops" }],
  },
  {
    handle: "pearl-drops",
    title: "Pearl Drops",
    description: "Freshwater baroque pearls suspended from a delicate gold chain.",
    categorySlug: "earrings",
    collectionSlugs: [],
    tags: ["pearl", "drop"],
    metals: ["14k Gold Vermeil"],
    basePrice: 190,
    images: [{ id: "photo-1535556116002-6281ff3e9f36", alt: "Pearl drop earrings" }],
    newArrival: true,
  },
  {
    handle: "tennis-bracelet",
    title: "Tennis Bracelet",
    description: "A continuous line of ethically sourced white diamonds set in solid gold.",
    categorySlug: "bracelets",
    collectionSlugs: ["everyday-essentials"],
    tags: ["diamond", "tennis"],
    metals: ["14k Gold"],
    basePrice: 2400,
    images: [{ id: "photo-1622398925373-3f91b1e275f5", alt: "Tennis bracelet" }],
    featured: true,
    trending: true,
  },
  {
    handle: "bangle-cuff",
    title: "Sculpted Cuff",
    description: "A smooth open cuff with a weighted, architectural silhouette.",
    categorySlug: "bracelets",
    collectionSlugs: ["solid-gold"],
    tags: ["cuff", "statement"],
    metals: ["14k Gold", "14k Gold Vermeil"],
    basePrice: 980,
    images: [{ id: "photo-1622398925373-3f91b1e275f5", alt: "Sculpted cuff" }],
  },
  {
    handle: "rolo-bracelet",
    title: "Rolo Bracelet",
    description: "A substantial rolo chain bracelet with a secure lobster clasp. 7\" with 1\" extender.",
    categorySlug: "bracelets",
    collectionSlugs: [],
    tags: ["chain"],
    metals: ["14k Gold", "14k Gold Vermeil", "Sterling Silver"],
    basePrice: 540,
    images: [{ id: "photo-1622398925373-3f91b1e275f5", alt: "Rolo bracelet" }],
    bestseller: true,
  },
  {
    handle: "bead-bracelet",
    title: "Bead Bracelet",
    description: "Tiny polished gold beads strung on a fine chain. Layer with everything.",
    categorySlug: "bracelets",
    collectionSlugs: [],
    tags: ["bead", "delicate"],
    metals: ["14k Gold Vermeil"],
    basePrice: 160,
    images: [{ id: "photo-1622398925373-3f91b1e275f5", alt: "Bead bracelet" }],
    trending: true,
  },
  {
    handle: "id-bracelet",
    title: "ID Bracelet",
    description: "A smooth oval ID plate on a curb chain. Engravable.",
    categorySlug: "bracelets",
    collectionSlugs: [],
    tags: ["id", "personal"],
    metals: ["14k Gold", "Sterling Silver"],
    basePrice: 420,
    images: [{ id: "photo-1622398925373-3f91b1e275f5", alt: "ID bracelet" }],
  },
];

function toProduct(seed: Seed): Product {
  const LUXURY_MULTIPLIER = 1200; // Convert to realistic high-jewelry INR prices
  const variants = makeVariants(seed.basePrice * LUXURY_MULTIPLIER, seed.metals, seed.sizes);
  const prices = variants.map((v) => v.price.amount);
  return {
    id: seed.handle,
    handle: seed.handle,
    title: seed.title,
    description: seed.description,
    categorySlug: seed.categorySlug,
    collectionSlugs: seed.collectionSlugs,
    tags: seed.tags,
    metals: seed.metals,
    sizes: seed.sizes,
    priceRange: {
      min: { amount: Math.min(...prices), currency: "INR" },
      max: { amount: Math.max(...prices), currency: "INR" },
    },
    images: seed.images.map((i) => img(i.id, i.alt)),
    variants,
    featured: seed.featured,
    trending: seed.trending,
    newArrival: seed.newArrival,
    bestseller: seed.bestseller,
  };
}

export const products: Product[] = seeds.map(toProduct);
