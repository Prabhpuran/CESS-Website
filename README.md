# Spectra’26 · CESS

A responsive event site for Spectra’26, built with Next.js App Router, TypeScript, Tailwind CSS v4, shadcn/ui components, and Bun.

## Local development

```sh
bun install
bun run dev
```

Open http://localhost:3000. For production readiness checks:

```sh
bun run typecheck
bun run build
bun run test:e2e
```

The development server uses Next.js Webpack because the environment restricts Turbopack’s worker port binding.

## Content and artwork

Edit `src/lib/content.ts` to update festival dates, venue, the daily programme, event descriptions, fees, notes, and registration destinations. That file is the source of truth for event cards, detail pages, and registration actions.

Original posters are in `public/images/events/`. Optimized WebP copies used in cards are in `public/images/posters/`. Update the matching `image` and `cardImage` values when replacing event artwork.

Spectra’26 is scheduled for 28–29 October 2026 at Maharaja Ranjit Singh Bhawan, Guru Nanak Dev University, Amritsar. Event registration is handled by the linked external forms or Unstop; the website does not collect or store submissions.

## Pages and interactions

- `/` — the globe and continuously orbiting event cards. Selecting a card plays the flip reveal and opens its event details.
- `/events` — the two-day programme, event search, event cards, and registration links.
- `/events/[slug]` — individual event information and registration.
- `/about` and `/contact` — information about CESS and direct contact details.
- Gallery is intentionally deferred until after Spectra.

The mobile navigation uses a slide-over menu. Event detail dialogs scroll independently on small screens. Respect reduced-motion settings and use touch, pointer, and keyboard input for the event orbit.

## Deployment

Deploy to a Next.js-compatible host with the repository’s Bun lockfile and run `bun run build` as the production build command. Set the production start command to `bun run start` when the host requires one.
