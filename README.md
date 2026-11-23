# tarltoncleanteam.com

Custom, mobile-first static homepage redesign concept for **Tarlton Clean Team** (`https://tarltoncleanteam.com/`), prepared for direct static hosting and GitHub Pages deployment.

## Overview

- **Business:** Tarlton Clean Team — commercial cleaning, janitorial, specialized floor care, carpet & upholstery, window washing, disinfection, and building maintenance across South Jersey, Eastern Pennsylvania, and Delaware.
- **Contact:** `(856) 796-3805` (24-hour emergency response; no binding contracts).
- **Stack:** Semantic HTML5, modular CSS3 (custom properties, responsive grid, mobile-first breakpoints), and zero-dependency Vanilla JavaScript (`js/script.js`).
- **Typography:** `Oswald` (display/headings) + `Manrope` (body copy) via Google Fonts.
- **Brand Palette:** Extracted from the original Tarlton Clean Team logo mark — Brick Red (`#A42F2C`), Deep Navy (`#062A38`), Maroon (`#5E2225`), and Warm Bone (`#F4EFE7`).
- **SEO & Demo Safeguard:** Includes `<meta name="robots" content="noindex, nofollow">` so this redesign concept does not compete with the live site in search results.
- **Interactive Scope:** Direct click-to-call (`tel:+18567963805`) and section navigation; no backend-less form or simulated form submission messaging.

## Project Structure

```text
tarltoncleanteam.com/
├── index.html
├── .nojekyll
├── README.md
├── css/
│   └── style.css
├── js/
│   └── script.js
└── assets/
    ├── images/
    │   ├── hero-office.{jpg,webp,-sm.webp}
    │   ├── crew-van.{jpg,webp,-sm.webp}
    │   ├── window-cleaning.{jpg,webp,-sm.webp}
    │   └── originals/
    │       ├── service-van-original.jpg
    │       └── tile-scrub-original.jpg
    └── logo/
        ├── tarlton-clean-team.png
        ├── favicon.png
        └── apple-touch-icon.png
```

## GitHub Pages Compatibility

All stylesheet, script, icon, and image paths are strictly relative (`css/style.css`, `js/script.js`, `assets/...`) and `.nojekyll` is present at the repository root so GitHub Pages serves the static files directly from either a root custom domain or a project subdirectory URL.
