# SOLVEN — Next-Generation Interactive Luxury Fashion Commerce

**SOLVEN** (*Paris · Tokyo*) is a modern, interactive digital fashion flagship engineered with **React 19**, **Vite**, **Tailwind CSS**, and **Framer Motion**. Designed around a spatial, mobile-first boutique rail experience, SOLVEN bridges tactile garment presentation with fluid digital commerce.

---

## Core Experience & Features

### 1. Interactive 3D Boutique Clothes Rails
- **Four Curated Showroom Rails**:
  - **Rail 01 — Heavyweight Hoodies**
  - **Rail 02 — Ladies Tops**
  - **Rail 03 — Baggy Jeans**
  - **Rail 04 — Men's Formal Shirts**
- **Natural Pendulum Sway & 3D Perspective**: Isolated transparent WebP garments hang from sculpted wooden hangers along a curved steel rail, gently swaying with staggered CSS pendulum physics.
- **Two-Tap Discovery Flow**:
  - **1st Tap**: Smoothly glides the selected garment into the horizontal center of the rail and flips it forward (`0deg`) for clean inspection.
  - **2nd Tap**: Navigates directly to that garment's dedicated product detail page.

### 2. Dedicated Product Detail Page (`/product/:id`)
- **8-Angle Studio Gallery**: Interactive multi-angle gallery (`Studio Front`, `Upper Detail`, `3/4 Silhouette`, `Fabric Weave`, `Hem & Stitch`, `Rear Profile`, `Atelier Look`, `Monochrome Study`) with an 8-thumbnail selector strip and directional navigation.
- **Variant Customization**: Interactive colorway swatches, size selector (`XS`–`XL` / `28`–`34`), quantity stepper, and collapsible technical specifications.
- **Sticky Bottom Action Bar**: Mobile-optimized thumb-zone bar featuring live INR pricing, **Add to Cart**, and **Buy Now** (instant checkout).

### 3. Shopping Bag & INR Commerce
- **Indian Rupee (`₹` / `INR`) Formatting**: Consistent `en-IN` currency formatting across rails, tags, product pages, cart, and checkout.
- **Persistent Cart & Wishlist**: Powered by React Context and `localStorage` (`solven_cart_v2`, `solven_wishlist_v2`), ensuring only user-selected garments appear in the bag.
- **Promo Code Engine**: Expandable discount accordion supporting `SOLVEN20` (20% off), `FIRST10` (10% off), and `FREESHIP`.

### 4. Multi-Step Checkout Terminal (`/checkout`)
- **4-Step Progressive Flow**: `Address` → `Delivery` → `Payment` → `Confirmed`.
- **Indian Delivery & Payment Options**: Support for Indian PIN codes, BlueDart Express Air / Next-Day Metro Concierge, **UPI (GPay / PhonePe / Paytm)**, **Card (Visa / Mastercard / RuPay)**, and **Cash on Delivery (COD)**.
- **Order Confirmation**: Generates a unique order identifier (`SLV-2026-XXXXX`) with an itemized receipt and celebration animation.

### 5. Search, Lookbook & Responsive Design
- **Live Search Overlay**: Instant filtering by product name, category, tagline, or material with popular search chips.
- **Editorial Lookbook (`/lookbook`)**: High-fashion campaign pairings with direct garment inspection.
- **Mobile-First Architecture**: Zero horizontal overflow across `320px`–`430px` viewports and dedicated multi-column layouts for desktop (`1024px`–`1920px`).

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | React 19 + Vite 8 |
| **Routing** | React Router DOM 7 |
| **Styling** | Tailwind CSS 3.4 |
| **Animations** | Framer Motion 14 + GPU CSS Transforms |
| **Icons** | Lucide React |
| **Effects** | Canvas Confetti |
| **Typography** | Plus Jakarta Sans, Playfair Display, JetBrains Mono |

---

## Project Structure

```text
├── public/
│   └── garments/          # Optimized transparent WebP studio garment assets
├── src/
│   ├── animations/        # Framer Motion spring & transition presets
│   ├── components/
│   │   ├── cart/          # Slide-over CartDrawer & promo code UI
│   │   ├── home/          # InteractiveRail, HangerSvg, PriceTag, CategoryCircles, ProductGrid
│   │   ├── layout/        # Header, MobileNavigation, Footer
│   │   ├── product/       # ProductQuickModal
│   │   └── search/        # Live SearchOverlay
│   ├── context/           # CartContext (cart, wishlist, UI modals)
│   ├── data/              # Categories and SOLVEN product catalog
│   ├── pages/             # Home, ProductPage, CheckoutPage, LookbookPage
│   ├── utils/             # INR currency formatter & discount codes
│   ├── App.jsx
│   └── main.jsx
└── README.md
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

**Designed & Developed by Karan Kacha**  
Software Engineer | Creative Developer
