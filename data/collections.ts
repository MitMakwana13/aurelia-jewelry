import type { Collection } from "@/lib/commerce/types";

export const collections: Collection[] = [
  {
    slug: "everyday-essentials",
    name: "Everyday Essentials",
    tagline: "The pieces you'll never take off",
    description: "Foundational jewelry designed for daily wear - understated, comfortable, and crafted to last.",
    heroImage: {
      url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1600&q=80",
      alt: "A minimal set of gold jewelry on a cream surface",
    },
    productHandles: ["slim-band", "dome-ring", "paperclip-chain", "mini-hoops", "tennis-bracelet"],
  },
  {
    slug: "solid-gold",
    name: "Solid Gold",
    tagline: "14k, always",
    description: "Investment pieces cast in solid 14k gold - the rare kind of jewelry that gets better with time.",
    heroImage: {
      url: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1600&q=80",
      alt: "A collection of solid gold rings",
    },
    productHandles: ["signet-ring", "dome-ring", "hoop-large", "chain-rolo", "bangle-cuff"],
  },
  {
    slug: "puzzle",
    name: "Puzzle",
    tagline: "Interlocking forms",
    description: "An architectural series of rings and links designed to fit together in unexpected ways.",
    heroImage: {
      url: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1600&q=80",
      alt: "Geometric gold jewelry arranged on stone",
    },
    productHandles: ["puzzle-ring", "puzzle-pendant", "puzzle-hoops"],
  },
  {
    slug: "dome",
    name: "Dôme",
    tagline: "Rounded silhouettes",
    description: "Sculptural pieces with soft, sculpted curves - polished, smooth, and substantial.",
    heroImage: {
      url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1600&q=80",
      alt: "A polished dome ring on linen",
    },
    productHandles: ["dome-ring", "dome-earrings", "dome-pendant"],
  },
  {
    slug: "birthstones",
    name: "Birthstones",
    tagline: "Twelve months, twelve stones",
    description: "Personal pieces set with ethically sourced gemstones for every month of the year.",
    heroImage: {
      url: "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?auto=format&fit=crop&w=1600&q=80",
      alt: "A birthstone pendant on neutral background",
    },
    productHandles: ["birthstone-pendant", "birthstone-ring", "birthstone-studs"],
  },
  {
    slug: "sterling-silver",
    name: "Sterling Silver",
    tagline: "Cool-toned classics",
    description: "The timeless alternative - fine jewelry in recycled sterling silver.",
    heroImage: {
      url: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&w=1600&q=80",
      alt: "A silver ring stack",
    },
    productHandles: ["silver-band", "silver-hoops", "silver-chain"],
  },
];
