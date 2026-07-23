# OPENXMLJSON — Shopify theme

A custom Shopify (Online Store 2.0) theme for the **OPENXMLJSON** digital product —
a fast viewer for very large JSON, XML and CSV files. Landing-page design modelled on
the Therabot layout; brand palette (dark navy + terracotta) taken from the app icon.

## What's inside

- **Homepage** (`templates/index.json`) — hero, format strip, how-it-works,
  performance stats, benchmark bars, 9-feature grid, comparison table,
  editions/pricing (Free / Premium / NARIK), testimonials, FAQ, CTA.
- **Commerce templates** — product (license), collection, cart, search,
  list-collections, page, blog, article, 404, password.
- Fully editable in **Online Store → Themes → Customize** (every section has schema).

## Install

1. Zip: use the provided `openxmljson-shopify-theme.zip` (its root already contains
   `layout/`, `sections/`, `templates/`, etc.).
2. Shopify admin → **Online Store → Themes → Add theme → Upload zip file**.
3. Click **Customize** to edit copy, colours, menus and the pricing tiers.
4. Set the header/hero **Download** and **Buy** buttons to your product or collection URLs.

## Selling the license (digital product)

1. **Products → Add product**: create "OPENXMLJSON Premium License" etc.
   Set it as a **digital product** (uncheck "This is a physical product" so no shipping).
2. For automatic license/file delivery, install a digital-downloads app
   (e.g. Shopify **Digital Downloads**, free) and attach the license file or key.
3. Point the theme's Buy buttons and the pricing section's plan URLs at these products.

## Payments — enabling Stripe

Shopify runs its own checkout, so Stripe is configured in **admin**, not in theme code:

- **Preferred:** Settings → **Payments → Shopify Payments** (Shopify Payments is
  powered by Stripe under the hood). Activate it to accept cards, Apple Pay,
  Google Pay and Shop Pay. Available in Stripe-supported countries.
- **Direct Stripe gateway:** if Shopify Payments isn't available in your country,
  Settings → Payments → **Add payment methods → search "Stripe" →** connect your
  Stripe account as a third-party provider.
- The cart's Checkout button (`sections/main-cart.liquid`) already routes to
  Shopify's secure checkout, which uses whichever gateway you enable above.

No API keys go in the theme — that's by design and keeps you PCI-compliant.

## Customise brand colours

Theme editor → **Theme settings → Colors** (accent + background), or edit the
CSS variables at the top of `assets/base.css`.
