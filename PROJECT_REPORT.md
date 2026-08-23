# Raw Frame Films — Project Evolution Report

**Generated:** 2026-08-23  
**Repository:** [github.com/PremJ-ai/raw-frame-films](https://github.com/PremJ-ai/raw-frame-films)  
**Current Commit:** `34be8e4` (main branch)  
**Deploy Target:** Vercel (auto-deploy from main)

---

## 1. Project Overview

### Stack
- **Framework & Core:** React 19 + TypeScript + Vite 8
- **3D Graphics:** `@react-three/fiber` + `@react-three/drei` (Three.js integration)
- **Animation:** Framer Motion (orchestration, scroll-linked parallax, transforms)
- **Compiler:** React Compiler (`babel-plugin-react-compiler`)
- **Typography:** Bebas Neue, Oswald, Montserrat (via `@fontsource`)
- **Styling:** Custom CSS design token system (`tokens.css` + `App.css`), zero UI framework dependencies

### Architecture
```text
src/
├── App.tsx                      # Root composition: HeroSection + ServiceCarousel + ContactSection
├── main.tsx                     # Entry point, font imports, CSS imports
├── index.css                    # Global reset + design tokens import
├── styles/tokens.css            # CSS custom properties (colors, spacing, easing)
├── App.css                      # Component styles
├── components/
│   ├── HeroSection.tsx          # Split layout with 3D form
│   ├── HeroCameraBackground.tsx # Camera sequence + contact BG blend
│   ├── Hero3DForm.tsx           # R3F Canvas wrapper
│   ├── Hero3DFormCard.tsx       # Volumetric glass form card
│   ├── Hero3DFormFields.tsx     # Form fields in <Html> overlay
│   ├── ServiceCarousel.tsx      # 3D carousel with wheel/hover navigation
│   ├── ContactSection.tsx       # Contact form section
│   ├── ScrollVideoScene.tsx     # Scroll-scrubbed video + Three.js canvas
│   └── scenes/CameraScene.tsx   # REMOVED (was 147 lines)
├── config/services.ts           # Service data (5 services)
├── hooks/useScrollScrub.ts      # Scroll progress hook (0-1)
├── types/services.ts            # Service type definition
└── utils/carousel.ts            # Carousel offset calculation
```

---

## 2. Complete Commit History (Chronological)

| Commit | Date | Message |
| :--- | :--- | :--- |
| `8df5887` | 2026-08-23 13:18 | Initial commit: Raw Frame Films website with HeroSection and ServiceCarousel |
| `899be3c` | 2026-08-23 13:25 | Change project title to include Three.js |
| `650f5fb` | 2026-08-23 14:39 | Add GitHub Pages deploy workflow and update favicon |
| `e727aa5` | 2026-08-23 14:42 | Update App.css, HeroSection, and add logo |
| `a84d171` | 2026-08-23 14:46 | Remove GitHub Pages workflow — using Vercel instead |
| `579ede6` | 2026-08-23 15:04 | Improve service carousel scroll interactions |
| `ff50c8e` | 2026-08-23 17:06 | Update ServiceCarousel |
| `2463026` | 2026-08-23 17:12 | Update HeroSection |
| `abe0fcc` | 2026-08-23 17:25 | Update App.css |
| `ef0d178` | 2026-08-23 21:01 | feat: New immersive split HeroSection with 3D volumetric form card |
| `34be8e4` | 2026-08-23 21:02 | chore: Add hero camera assets, remove unused CameraScene |

**Summary:** 11 commits, ~3,500 lines added/modified across 50+ files.

---

## 3. Detailed Change Log by Phase

### Phase 1: Initial Scaffold (`8df5887`)
- **Scope:** Complete project bootstrap with all core components.
- **Created Files:**
  - `package.json` — React 19, Three.js ecosystem, Framer Motion, Vite, React Compiler
  - `vite.config.ts` — Vite + React Compiler + Babel preset
  - `tsconfig*.json` — TypeScript configuration (strict)
  - `src/main.tsx` — Entry with font imports
  - `src/index.css` — Global reset + token import
  - `src/styles/tokens.css` — Design tokens (ink, muted, night, panel, spacing, motion, easing)
  - `src/App.tsx` — Three-section composition
  - `src/App.css` — 1,219 lines of component styles
  - `src/components/HeroSection.tsx` (333 lines) — Original hero with camera sequence, gradient, grid, particles, stats
  - `src/components/ServiceCarousel.tsx` (88 lines) — Basic 3D carousel
  - `src/components/ContactSection.tsx` (88 lines) — Contact form
  - `src/components/ScrollVideoScene.tsx` (50 lines) — Scroll-scrubbed video + R3F canvas
  - `src/components/scenes/CameraScene.tsx` (147 lines) — Three.js camera model
  - `src/config/services.ts` — 5 services with video/poster/accent
  - `src/hooks/useScrollScrub.ts` — Scroll progress hook
  - `src/utils/carousel.ts` — Carousel offset logic
  - `src/types/services.ts` — Service type
  - Assets: hero images, fonts, placeholder files
- **Key Features:**
  - Hero with 4-image crossfade sequence (2600ms)
  - Service carousel with wheel navigation + auto-rotate on hover
  - Contact form with validation
  - Three.js integration via ScrollVideoScene
  - Design token system

### Phase 2: Title & Deployment Setup (`899be3c` → `a84d171`)
- `899be3c`: `README.md` title updated to include "Three.js".
- `650f5fb`: `.github/workflows/deploy.yml` — GitHub Pages deploy workflow; `index.html` favicon updated to `/logorawframes.png`; `public/logorawframes.png` added.
- `e727aa5`: `App.css` + `HeroSection.tsx` tweaks; `logorawframes.png` added to root.
- `a84d171`: Removed GitHub Pages workflow — switched to Vercel for SPA routing & instant preview builds.

### Phase 3: Component Refinements (`579ede6` → `abe0fcc`)
- `579ede6`: `ServiceCarousel.tsx` — Improved wheel interactions (delta threshold, lock timeout), auto-rotate interval.
- `ff50c8e`: `ServiceCarousel.tsx` — Minor refinements.
- `2463026`: `HeroSection.tsx` — Layout and alignment adjustments.
- `abe0fcc`: `App.css` — Removed legacy hero background/gradient/grid/particles styles in preparation for the split 3D hero system.

### Phase 4: Major Feature — Immersive Split Hero with 3D Form (`ef0d178` + `34be8e4`)
- **New Components Created:**
  - `HeroCameraBackground.tsx` (73 lines): Camera sequence + contact-section blue/cyan base, scroll-linked opacity/blur/merge.
  - `Hero3DForm.tsx` (45 lines): R3F Canvas wrapper with lazy mount (100ms delay) + loading spinner.
  - `Hero3DFormCard.tsx` (67 lines): Volumetric glass card (`Box` + `meshPhysicalMaterial`), idle float animation, scroll response.
  - `Hero3DFormFields.tsx` (106 lines): Form fields (Name, Number, Message) in `<Html>` overlay, inline submit with success toast.
  - `HeroSection.tsx` (236 lines): Split layout orchestrator, Framer Motion scroll transforms, fixed nav.
  - `App.css` (+462 lines): Split grid, background layers, 3D form styles, reduced motion support.
- **Architectural & Design Decisions:**
  1. *Split Layout:* Desktop 50/50 (text left, 3D form right); Mobile stacked (text first, form below).
  2. *Background:* Contact section blue/cyan gradient (`#06172b` + radials) as base, camera images with `mix-blend-mode: screen` on top.
  3. *Text Immersion:* Left column uses `mix-blend-mode: screen` + scroll-linked opacity/blur/parallax.
  4. *3D Form Card:* Glass material (`transmission=0.15`, `clearcoat=1`, `ior=1.5`), edge highlight ring, idle float/rotate.
  5. *Scroll Response:* Card rotates toward viewer (0 → 0.5 rad), scales up (1 → 1.05), moves forward (Z: 0 → 0.3).
  6. *Reduced Motion:* Disables idle animation, simplifies scroll effects via media query.
- **Asset Cleanup (`34be8e4`):**
  - Added 4 camera assets: `cameraimg.jpg`, `camera-sequence-01/02/03.png`.
  - Removed deprecated `src/components/scenes/CameraScene.tsx`.

---

## 4. Current Feature Matrix

| Feature | Status | Location |
| :--- | :--- | :--- |
| Hero: Split layout (text + 3D form) | ✅ Complete | `src/components/HeroSection.tsx` |
| Hero: Camera sequence (4 images) | ✅ Complete | `src/components/HeroCameraBackground.tsx` |
| Hero: Contact-section BG blend | ✅ Complete | `src/components/HeroCameraBackground.tsx` + `src/App.css` |
| Hero: Text immersion (scroll-linked) | ✅ Complete | `src/components/HeroSection.tsx` (Framer Motion) |
| Hero: Fixed top nav | ✅ Complete | `src/components/HeroSection.tsx` |
| Hero: 4 stats bar | ✅ Complete | `src/components/HeroSection.tsx` |
| Hero: Mobile-first stacking | ✅ Complete | `src/App.css` media queries |
| 3D Form: Volumetric glass card | ✅ Complete | `src/components/Hero3DFormCard.tsx` |
| 3D Form: Idle animation | ✅ Complete | `src/components/Hero3DFormCard.tsx` (`useFrame`) |
| 3D Form: Scroll response | ✅ Complete | `src/components/Hero3DFormCard.tsx` (`useFrame`) |
| 3D Form: Inline submit + toast | ✅ Complete | `src/components/Hero3DFormFields.tsx` |
| 3D Form: Lazy Canvas mount | ✅ Complete | `src/components/Hero3DForm.tsx` |
| Service Carousel: Wheel navigation | ✅ Complete | `src/components/ServiceCarousel.tsx` |
| Service Carousel: Auto-rotate on hover | ✅ Complete | `src/components/ServiceCarousel.tsx` |
| Service Carousel: Keyboard accessible | ✅ Complete | `src/components/ServiceCarousel.tsx` |
| Contact Section: Form + validation | ✅ Complete | `src/components/ContactSection.tsx` |
| Scroll Video Scene | ✅ Complete | `src/components/ScrollVideoScene.tsx` |
| Design Token System | ✅ Complete | `src/styles/tokens.css` + `src/App.css` |
| Reduced Motion Support | ✅ Complete | `src/components/HeroCameraBackground.tsx`, `Hero3DFormCard.tsx`, `App.css` |
| Vercel Auto-Deploy | ✅ Configured | Linked to `main` branch |

---

## 5. Technical Debt & Planned Improvements

| Issue | Severity | Notes |
| :--- | :--- | :--- |
| Bundle size: 1.23 MB JS (346 kB gzipped) | Medium | Warning during build; recommend dynamic import / React `lazy()` for the 3D Canvas bundle. |
| `Hero3DFormFields.tsx`: Uses `textOpacity.get()` pattern | Low | Functional but non-reactive; migrate to `useMotionValue` + direct style binding. |
| Form submission: Console log only | Medium | Hook up live endpoint (e.g. Resend, Formspree, or Serverless API route). |
| Camera images: PNGs (300–450 kB each) | Medium | Convert to WebP/AVIF format for faster LCP. |
| `useScroll` offset: `["start start", "end start"]` | Low | Verify viewport coverage across ultra-wide and mobile screen ratios. |
| TypeScript CSS cast typing | Low | Clean up `as React.CSSProperties` interpolations. |

---

## 6. Deployment Configuration

- **Platform:** Vercel
- **Repository:** `PremJ-ai/raw-frame-films`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Trigger:** Automated deploy on push to `main`
- **Production URL:** `https://raw-frame-films.vercel.app`

---

## 7. Build & Development Commands

```bash
# Start Vite development server (port 5173)
npm run dev

# Run TypeScript check & build for production
npm run build

# Preview local production build
npm run preview

# Run ESLint validation
npm run lint
```

---

## 8. Key Design Tokens (`src/styles/tokens.css`)

```css
:root {
  --color-ink: #f4f0e9;        /* Primary text */
  --color-muted: #aaa49a;      /* Secondary text */
  --color-night: #030408;      /* Deep background */
  --color-panel: #151b25;      /* Card/form backgrounds */
  --space-page: clamp(1.25rem, 5vw, 5rem);  /* Responsive page padding */
  --motion-slow: 700ms;        /* Carousel transition */
  --ease-cinematic: cubic-bezier(0.22, 1, 0.36, 1);
}
```

---

## 9. Scroll-Linked Animation Parameters

### Hero Text (Left Column)
- **Opacity:** `1 → 0.6 → 0.1` (at scroll `0`, `0.3`, `0.7`)
- **Blur:** `0 → 4px → 12px` (at scroll `0`, `0.5`, `1.0`)
- **Translate X:** `0 → -60px` (at scroll `0 → 0.5`)
- **Blend Mode:** `screen` (merges smoothly with camera overlay)

### Stats Bar
- **Opacity:** `1 → 0.5 → 0` (at scroll `0`, `0.4`, `0.8`)

### 3D Form Card
- **Rotation Y:** `0 → 0.5 rad`
- **Scale:** `1 → 1.05`
- **Position Z:** `0 → 0.3`

### Camera Background
- **Opacity:** `1 - progress * 0.8`
- **Blur:** `progress * 12px`
- **Merge Layer Opacity:** `progress * 0.6`

---

## 10. Extension Guidelines

### Adding a New Service to Carousel
In `src/config/services.ts`:
```typescript
{
  number: "06",
  title: "New Service",
  description: "Description...",
  video: "https://...mp4",
  poster: "https://...jpg",
  accent: "#hexcolor",
}
```

### Connecting 3D Form to API Endpoint
In `src/components/Hero3DFormFields.tsx` (`handleSubmit`):
```typescript
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(form),
});
```

### Code-Splitting 3D Form (Bundle Optimization)
In `src/components/HeroSection.tsx`:
```tsx
const Hero3DForm = lazy(() => import('./Hero3DForm'));

// Inside render:
<Suspense fallback={<Hero3DFormFallback />}>
  <Hero3DForm scrollProgress={scrollProgress} />
</Suspense>
```

---

## 11. Summary

The project evolved from a single-column marketing page into an interactive split-screen hero experience featuring a volumetric 3D form card, scroll-linked background blending, and text immersion effects — while maintaining performance and full responsiveness across mobile and desktop.
