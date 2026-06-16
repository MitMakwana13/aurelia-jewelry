# Aurelia — Fine Jewelry E-commerce (Mejuri-style clone)

A complete, production-shaped e-commerce storefront built with **Next.js 15 (App Router) + TypeScript + Tailwind CSS**. Modeled on the layout, structure, and shopping flow of mejuri.com — built integration-ready so a real commerce backend (Shopify, Medusa, etc.) can be wired in later.

---

## ⚠️ Important: Branding & Assets

This codebase replicates **structure, layout, and aesthetic only** — it does **not** include any trademarked or copyrighted Mejuri assets. You must replace the following before shipping to production:

- **Brand name & logo** — currently uses the placeholder name "Aurelia" (search and replace).
- **Product imagery** — currently pulls from Unsplash for demonstration. Replace with your client's licensed product photography.
- **Product catalog data** — currently uses 25+ generated mock products in `/data/products.ts`. Replace with real catalog data, or wire the Shopify adapter.
- **Marketing copy** — descriptions, taglines, and editorial blurbs are generic placeholders. Rewrite with your client's voice.
- **Fonts** — uses Google Fonts (Inter + Cormorant Garamond) under their open-source licenses. Swap for client brand fonts as needed.

---

## Quick start

```bash
npm install
npm run dev
# → http://localhost:3000
```

Build & start production:

```bash
npm run build
npm start
```

---

## Project structure

```
app/                    # Next.js App Router pages
├── layout.tsx            # Root layout — header, footer, cart drawer, search
├── page.tsx              # Homepage
├── shop/                 # PLP — all jewelry + per-category
├── products/[handle]/    # PDP — product detail
├── collections/          # Collection index + detail
├── cart/                 # Cart page
├── checkout/             # 3-step checkout + confirmation
├── account/              # Login, orders, wishlist (stubs)
├── stores/               # Store locator + services
├── about/                # Brand story
├── sustainability/       # Impact report page
├── help/                 # FAQ / shipping / returns / sizing / care
└── not-found.tsx         # 404

components/
├── layout/               # Header, Footer, MegaMenu, MobileNav, AnnouncementBar, SearchOverlay
├── home/                 # Hero, CategoryGrid, CollectionSpotlight, TrendingCarousel, ServicesStrip, SustainabilityBlock
├── product/              # ProductCard, ProductGallery, ProductDetails, RelatedProducts
├── plp/                  # FilterSidebar, SortDropdown, ProductGrid, Breadcrumbs
├── cart/                 # CartDrawer
└── ui/                   # Icons

lib/
├── commerce/             # Adapter pattern — see "Integrating a real backend"
│   ├── types.ts            # Product, Variant, Cart, Order schema
│   ├── mock-adapter.ts     # Default — reads /data
│   ├── shopify-adapter.ts  # Stub — wire to Shopify Storefront API
│   └── index.ts            # Selects adapter via COMMERCE_ADAPTER env
├── store/                # Zustand: cart-store (persisted), ui-store
└── utils/                # format, filter-products

data/                    # Mock catalog — products, collections, categories, navigation
styles/globals.css       # Tailwind base + design tokens
tailwind.config.ts       # Theme palette, typography
```

---

## Rebranding for your client

Most rebranding happens in three places:

### 1. Brand name & logo
- Search for `Aurelia` and replace with the client's brand name (in `Header.tsx`, `Footer.tsx`, `MobileNav.tsx`, `app/layout.tsx`, `checkout/page.tsx`, mock data, README).
- The header logo is text-based by default — to use an image logo, replace the `<Link>...Aurelia</Link>` block in `components/layout/Header.tsx` with `<Image src="/logo.svg" ... />`.

### 2. Color palette
Edit `tailwind.config.ts`. The site uses semantic tokens:
- `cream` / `cream-light` / `cream-warm` — backgrounds
- `ink` / `ink-soft` / `ink-muted` — text
- `gold` / `gold-dark` — accents
- `sand` / `border` — neutrals

Change these once and the whole site updates.

### 3. Typography
Swap the imports in `app/layout.tsx`:

```ts
import { Inter, Cormorant_Garamond } from "next/font/google";
```

Replace with the client's chosen fonts (any from `next/font/google`, or self-hosted via `next/font/local`).

---

## Integrating a real backend

All commerce reads go through a single interface: `lib/commerce/types.ts → CommerceAdapter`. Two adapters ship:

| Adapter   | Status     | When to use                                     |
| --------- | ---------- | ----------------------------------------------- |
| `mock`    | Default    | Demos, design review, content placeholder.      |
| `shopify` | Stub       | Wire to Shopify Storefront API (GraphQL).       |

### Switching adapters

Set in `.env`:

```
COMMERCE_ADAPTER=shopify
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_TOKEN=shpsa_...
```

### Wiring Shopify

Open `lib/commerce/shopify-adapter.ts`. Each method (`getProducts`, `getProduct`, `getCollections`, etc.) currently throws — replace each with a call to the Shopify Storefront GraphQL API and map the response into the shared types in `types.ts`. The data shapes are intentionally aligned with Shopify's, so mapping is mostly mechanical.

### Cart & Checkout

- The cart is currently a client-side Zustand store persisted to `localStorage` (`lib/store/cart-store.ts`).
- Checkout is a 3-step UI with Zod-validated forms. The "place order" step simulates a delay and clears the cart.
- For production: replace the cart store's `addItem` / `updateQuantity` calls with Shopify Cart API mutations (or Stripe + your own order persistence).
- The payment step is a styled placeholder — wire to **Stripe Elements** or **Shopify Checkout** for real charges.

### Auth

`/account` has working sign-in / register UI that doesn't post anywhere. To wire:

- **Shopify customers** → use the Shopify Customer Account API.
- **Generic** → drop in **NextAuth.js** (`@auth/core`).

---

## What's included

✅ Sticky header with desktop mega-menu and mobile slide-in nav
✅ Animated announcement bar with rotating messages
✅ Site-wide search overlay (instant filter on mock products)
✅ Homepage: Hero, Category Grid, Collection Spotlights, Trending & New Arrivals carousels, Services strip, Sustainability block
✅ Product Listing Pages with URL-synced filters (metal, style, price) and sort
✅ Product Detail Pages with image gallery, variant selectors (metal/size), quantity, accordion details, related products
✅ Cart drawer + dedicated cart page with free-shipping progress bar
✅ 3-step checkout (contact → shipping → payment) with Zod validation
✅ Collections index + detail pages
✅ Account: login/register, orders, wishlist
✅ Stores & services, about, sustainability impact report, help center (5 pages)
✅ 404 page
✅ Static generation (`generateStaticParams`) for all product/collection/category routes
✅ Responsive (375px → 1440px+), accessible (ARIA, keyboard, focus management via Headless UI)
✅ SEO metadata + OpenGraph

---

## Verification checklist

Before handing to the client:

- [ ] `npm run build` succeeds without errors
- [ ] Home → category → filter → product → add to cart → checkout → confirmation flow works
- [ ] Cart persists across page refreshes
- [ ] Mobile nav opens, mega-menu works on desktop
- [ ] Lighthouse: target ≥ 90 performance, ≥ 95 accessibility on home and PDP
- [ ] All Aurelia/placeholder branding swapped for client's
- [ ] Product images replaced with licensed assets
- [ ] Stripe / Shopify wired (or COMMERCE_ADAPTER=mock if launching as a marketing site)

---

## Tech stack

- **Next.js 15** (App Router, RSC, static generation)
- **TypeScript**
- **Tailwind CSS** with custom design tokens
- **Zustand** (cart state, persisted)
- **Headless UI** (accessible Dialog, Menu primitives)
- **Zod** (form validation)
- **Framer Motion** (subtle transitions; available, not heavily used by default)

## License

Code in this repo is delivered to the client as a work-for-hire. Third-party packages are under their respective open-source licenses. Demo Unsplash imagery is referenced via remote URLs and is not owned by you — replace before launch.
