# Thyme Product Experience

An interactive product-commerce prototype for Thyme, a home-appliance concept built around calm utility, premium visual storytelling, and responsive product discovery.

The primary showcase lives at [`public/thyme.html`](public/thyme.html). It is intentionally kept as a standalone page inside a Vite/TanStack project so the experience can be opened directly during reviews while still fitting into a modern frontend workspace.

## Highlights

- Immersive brand intro with scroll-synced logo docking and contrast-aware navigation.
- Product catalog rendered from structured JavaScript data rather than duplicated markup.
- Modal product detail views with feature blocks, lifestyle galleries, specifications, care guidance, and related products.
- Responsive storytelling sections including product journey, lifestyle carousel, customer wall, and animated footer wordmark.
- Accessibility-minded controls: skip link, semantic sections, keyboard-openable product cards, focus states, reduced-motion handling, labeled modal, and live form feedback.
- Clean asset separation: HTML, CSS, and JavaScript now live in dedicated files for reviewability and maintenance.

## Project Structure

```text
Prototype-5/
├── public/
│   ├── thyme.html              # Standalone Thyme product experience
│   ├── styles/thyme.css        # Page styles and responsive layout
│   ├── scripts/thyme.js        # Product data, rendering, interaction logic
│   └── assets/                 # Product, lifestyle, brand, and video assets
├── src/                        # Existing TanStack/Vite application shell
├── package.json
└── vite.config.ts
```

## Running Locally

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Then open:

```text
http://localhost:5173/thyme.html
```

Build for production:

```bash
npm run build
```

## Engineering Notes

- Product data is centralized in `public/scripts/thyme.js`, making it straightforward to add products, categories, gallery images, and related-product relationships.
- The page avoids inline scripts, inline style blocks, and static inline presentation so reviewers can inspect structure, styling, and behavior independently.
- Missing prototype asset references were replaced with checked-in files from `public/assets`, preventing broken images in generated product cards.
- CSS custom properties define the brand system and animation timing, keeping the visual language consistent across sections.

## Review Checklist

- Run `npm run lint` before sharing changes.
- Run `npm run build` to confirm the Vite application still compiles.
- Manually review `/thyme.html` on desktop and mobile widths, especially the product modal, mobile menu, carousel controls, and newsletter forms.
