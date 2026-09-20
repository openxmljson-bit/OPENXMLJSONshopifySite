# OPENXMLJSON — Shopify theme

A custom Shopify (Online Store 2.0) theme for the **OPENXMLJSON** digital product —
a fast viewer for very large JSON, XML and CSV files. Warm light design system: an
off-white canvas with soft gradient meshes, a terracotta→amber primary and an
electric-blue secondary, taken from the app icon. The app mock and the NARIKJSON
tier stay dark on purpose — that contrast is what makes them read as product.

## What's inside

- **Homepage** (`templates/index.liquid`) — hero with an animated app mock,
  scrolling format marquee, adoption counters, how-it-works (with an SVG pipeline
  diagram), performance stats, benchmark bars, 9-feature grid, comparison table,
  testimonials, FAQ, CTA.
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

## Motion & animation

`assets/global.js` is a progressive-enhancement layer — the page renders fully
without it (see the `.no-js` rules in `base.css`), and every effect is skipped
under `prefers-reduced-motion`. It provides:

- **Scroll reveal** — add `data-reveal` (or `data-reveal="left|right|zoom"`) to any
  element, or `data-stagger="70"` to a container to cascade its children.
  Offset a single element with `style="--reveal-delay:120ms"`.
- **Animated counters** — `<span data-count="6500">0</span>` counts up when it
  scrolls into view. Optional `data-count-prefix`, `data-count-suffix`,
  `data-count-decimals`, `data-count-duration`.
- Benchmark bars, cursor spotlight on cards, hero 3D tilt (`data-tilt`),
  seamless marquee (`data-marquee`), sticky-header state and scroll progress rail.

## Adoption counters

The downloads / files-opened tallies are a section: **Adoption counters**
(`sections/adoption-counters.liquid`). Every number, label, chip, icon and accent
colour is editable per block in the theme editor. The homepage renders its own
copy inline; add the section to any other page from **Add section**.

`sections/stats.liquid` also supports counting up — fill in a block's
**Animate to** field, or leave it blank for static text.

## Customise brand colours

Theme editor → **Theme settings → Colors** — primary accent, accent *text* tone,
accent highlight, secondary accent and page background. For anything deeper, edit
the CSS custom properties in the `:root` block at the top of `assets/base.css`.

Two brand ramps exist on purpose, and they are not interchangeable:

| Token | Use |
|---|---|
| `--accent` / `--grad-warm` | **Fills** — buttons, badges, icon tiles. Carries dark label text. |
| `--accent-ink` / `--grad-ink` | **Text** — any brand-coloured type on the light canvas. |

Using a fill colour as small text on white drops below 4.5:1, which is why the
darker `--accent-ink` exists. Every pairing in the shipped palette is verified
against WCAG AA.
