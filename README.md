# Spectra’26 · CESS

A phone-first event website built with Next.js App Router, TypeScript, Tailwind CSS v4, and shadcn/ui. Bun manages dependencies and scripts.

## Run locally

```sh
bun install
bun dev
```

Open http://localhost:3000.

```sh
bun run typecheck
bun run build
bun run start
```

The development server uses Next.js Webpack because the environment restricts Turbopack’s worker port binding.

## Event information and artwork

Edit `src/lib/content.ts` to update the six events, event descriptions, dates, venue, and Google Form URLs. Add an event's HTTPS form link to show its registration action on that event's details.

Original event posters are kept as SVGs in `public/images/events/`. The carousel and event grid use small WebP poster copies in `public/images/posters/` for faster loading; event detail views use the original SVG artwork. Update the matching `image` and `cardImage` paths in `src/lib/content.ts` when replacing a poster.

Spectra’26 is scheduled for 28–29 October 2026 at Maharaja Ranjit Singh Bhawan, Guru Nanak Dev University, Amritsar.

## Pages and interactions

- Home (`/`) features the event carousel and an introduction to Spectra.
- Events (`/events`) provides search, category filters, and event details.
- Individual event pages are generated from the event data (`/events/[slug]`).
- About (`/about`) and Contact (`/contact`) provide CESS information and contact details.
- Gallery will be added after Spectra has finished.

The carousel places event cards on a 3D orbit around the globe, grows and spins the selected card into its event details, and supports dragging, arrows, slide selection, keyboard use, and reduced-motion preferences. Automatic motion pauses while the carousel has keyboard focus, event details are open, or the page is hidden; animation frames stop when the carousel is idle.

Deploy with a Next.js-compatible host using `bun run build`. Registration forms are external Google Forms; the website does not store submissions.
