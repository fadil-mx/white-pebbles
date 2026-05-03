# White Pebbles — Premium Pastry Supplies (Next.js Redesign)

A bold, modern, immersive redesign for **whitepebbles.ae** — Dubai's premium bakery supply company. Built with Next.js 15, Tailwind CSS, and vanilla Three.js.

## Quick Start

```bash
# 1. Delete any old node_modules + lock file (clean start)
rm -rf node_modules package-lock.json

# 2. Install dependencies
npm install

# 3. Run the dev server
npm run dev
```

On Windows, use `rmdir /s /q node_modules` and `del package-lock.json` instead.

Open [http://localhost:3000](http://localhost:3000).

That's it — fonts (Fraunces + Inter) load automatically from Google Fonts, and the 3D scene runs on vanilla Three.js (no react-three-fiber peer dependency issues).

## Features

- **3D Chocolate Orb hero** — cocoa-colored core with two rotating wireframe shells, 5 orbiting golden spheres ("sugar pearls"), 800 floating particles, and a pulsing rose accent light
- **Mouse parallax** on the 3D scene
- **Custom cursor** — cocoa dot that expands to caramel circle on interactive elements
- **Smooth scroll** powered by Lenis
- **Scroll-triggered reveals** on every section
- **Animated counters** ticking up from 0 in the stats section
- **3D tilt** on category cards following the mouse
- **Brand marquee** of all your supplier partners
- **Editorial feature** with massive ghost typography ('savoir-faire')
- **Pulsing WhatsApp button** with ripple animation
- **Grain texture overlay** for warmth
- **Fully responsive**

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| 3D | Vanilla Three.js |
| Smooth scroll | Lenis |
| Fonts | Fraunces (display) + Inter (body) — both Google Fonts |

## Project Structure

```
whitepebbles-nextjs/
├── src/
│   ├── app/
│   │   ├── (home)/
│   │   │   ├── _hero/
│   │   │   │   ├── components/HeroContent.tsx
│   │   │   │   └── index.tsx
│   │   │   ├── _marquee/index.tsx
│   │   │   ├── _stats/index.tsx
│   │   │   ├── _categories/
│   │   │   │   ├── components/CategoryCard.tsx
│   │   │   │   └── index.tsx
│   │   │   ├── _feature/index.tsx
│   │   │   ├── _promises/index.tsx
│   │   │   ├── _cta/index.tsx
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── CustomCursor.tsx
│   │   │   ├── SmoothScroll.tsx
│   │   │   ├── RevealObserver.tsx
│   │   │   └── WhatsAppFloat.tsx
│   │   └── 3d/
│   │       └── ChocolateOrb.tsx
│   └── lib/utils.ts
├── tailwind.config.ts
├── next.config.js
└── package.json
```

## Customization

### Colors (in `tailwind.config.ts`)

- **cream** `#f4ead5` — main background
- **caramel** `#c8893d` — primary accent
- **cocoa** `#3d2817` — text, dark sections
- **espresso** `#0d0805` — hero background
- **gold** `#d4a256` — highlights, badges
- **rose** `#d97757` — CTA glow

### 3D scene tweaks

All 3D parameters live in `src/components/3d/ChocolateOrb.tsx`:
- Particle count (currently 800)
- Orbiting sphere count (currently 5)
- Orb position, colors, light intensities

### Replacing placeholder content

- **Brand list** → `src/app/(home)/_marquee/index.tsx`
- **Stats numbers** → `src/app/(home)/_stats/index.tsx`
- **Categories** → `src/app/(home)/_categories/index.tsx`
- **Editorial copy** → `src/app/(home)/_feature/index.tsx`
- **Promises** → `src/app/(home)/_promises/index.tsx`

## Deployment

Push to GitHub, then deploy to Vercel — zero config needed.
