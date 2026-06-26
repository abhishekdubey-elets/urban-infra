# Urban Infrastructure & Investment Summit 2026 — Website

A premium, highly-interactive marketing site for the **9th Elets National Urban
Infrastructure & Investment Summit 2026** (Bengaluru, Karnataka · August 2026).

Built to feel like a flagship international summit — cinematic motion, glassmorphism,
animated skyline, and editorial typography.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (custom brand palette from the logo: green → teal → blue → purple)
- **Framer Motion** — reveals, parallax, magnetic buttons, tilt cards, text reveal
- **Lenis** — buttery smooth scrolling
- **Embla Carousel** — draggable speakers carousel
- **react-countup** — animated statistics
- **lucide-react** — icons

> GSAP / Locomotive / Lottie from the original brief were intentionally dropped —
> Framer Motion + Lenis cover the same effects with less JS weight (better Lighthouse).

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve production build
```

## Editing content

All copy lives in [`lib/content.ts`](lib/content.ts) — speakers, sectors, tracks,
cities, stats, testimonials, CTAs. Edit there to update the whole site.
Brand colors and motion tokens live in [`tailwind.config.ts`](tailwind.config.ts).

## Sections (in order)

Hero · About · Stats · Why It Matters · Why Karnataka (interactive map) ·
Why Now (timeline) · Focus Sectors · Discussion Tracks (accordion) ·
Speakers (carousel) · Who Will Attend (concentric rings) · Why Attend (bento) ·
Past Partners (marquee) · Past Glimpses (masonry + lightbox) · Testimonials ·
CTA · Contact · Footer.

## Logo

The official logo is shown in the navbar and footer via
[`components/ui/Logo.tsx`](components/ui/Logo.tsx), reading from **`public/logo.png`**.

> `public/logo.png` currently holds a **placeholder** — replace it with the real
> artwork (keep the same filename, or update the `src` in `Logo.tsx`).

Because the logo's wordmark is dark navy, it sits on a soft **white badge** so it
stays legible on the dark UI. If you have a white/transparent-text version, pass
`badge={false}` to `<Logo />` to drop the badge.

## Favicon & social share images

Auto-wired via Next's metadata system from static files in `app/`:

- `app/icon.png` (512²) + `app/apple-icon.png` (180²) — a skyline glyph on the brand gradient.
- `app/opengraph-image.png` + `app/twitter-image.png` (1200×630) — the social card, with the logo embedded.

These are **static PNGs** (the dynamic `next/og` renderer throws `Invalid URL` on
Windows + Node 24, so it's avoided). After you replace `public/logo.png` with the
real artwork, regenerate the card so it picks up the new logo:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/generate-images.ps1
```

## Notes

- Custom cursor, scroll-progress bar, and a loading animation are in `components/providers/`.
- All visuals are self-contained SVG/CSS — no external image assets required.
  Drop real speaker photos / gallery images in later by swapping the placeholders
  in `components/sections/Speakers.tsx` and `PastGlimpses.tsx`.
- Fully responsive and `prefers-reduced-motion` aware.
