# Marlowby

Website for BPA 365 Website Design and Development Team. Topic: "Marlowby: Explore Your City, One Box at a Time."

Stack: React, Vite, React Router, Tailwind CSS, Fuse.js (search), Firebase Auth (optional), Firebase Hosting.

New to the code? Read `docs/HOW_IT_WORKS.md` first. It maps every file and explains how they connect. Each source file also starts with a plain-English comment.

## Run it

```
npm install
npm run dev
```

Open the address Vite prints (usually http://localhost:5173).

Production build: `npm run build`, then `npm run preview` to test it.

## Demo mode and Firebase

With no `.env` file the site runs in demo mode: accounts live in the browser's localStorage and a demo account is built in.

- Email: `demo@marlowby.test`
- Password: `Marlowby2026!`

To use real Firebase Auth:

1. Create a project at https://console.firebase.google.com and add a Web app.
2. Turn on Authentication > Sign-in method > Email/Password.
3. Copy `.env.example` to `.env` and fill in the four values.
4. Create a demo user in the console and put its credentials in your submission PDF.

## Deploy (Firebase Hosting)

```
npm install -g firebase-tools
firebase login
firebase init hosting   # public directory: dist, single-page app: yes
npm run build
firebase deploy
```

Then replace `YOUR-SITE.web.app` in `public/sitemap.xml` and `public/robots.txt` with your real address. The site must stay live through judging (April 1, 2027 for nationals; check New Mexico's earlier state deadline).

## Before you submit: content

- `src/data/cities.js` holds sample content. City names are real, partner businesses are fictional placeholders. Replace them with real partners you have permission to feature, or keep them clearly fictional and say so on your Works Cited page.
- Pricing is in `src/data/plans.js`.
- Plans differ by perks (guide, shipping, early city announcement, city vote), listed in `src/data/plans.js`. Edit them there.
- City photos live in `public/images/` and are listed in `src/data/cities.js`. The logo and favicon are made from `public/logo.png`. Credit every photo and the logo in `docs/WORKS_CITED.md`.

## Rubric checklist

- Page layout: consistent header, footer and spacing on every page.
- Graphics: original flat city art and favicon, no stock images.
- Content: all six required features are present (homepage, plans, featured cities, local business info, sign-up call to action, about and mission).
- Technical: validate with https://validator.w3.org, test Chrome, Firefox, Edge and Safari, run Lighthouse.
- Navigation: check every link works. Header, footer and breadcrumbs are on every relevant page.
- Accessibility: skip link, labels, visible focus, aria-live status text, reduced-motion support. Run axe DevTools and WAVE.
- SEO: unique title and description per page (set in each page component), sitemap, robots.txt, JSON-LD in `index.html`.
- Search: header search box (Fuse.js) over cities, items and partners.

## Submission reminders

- One PDF named `WDT-TeamID.pdf` with the clickable URL (plus login credentials), Works Cited, BPA release forms and the AI Usage and Documentation Form.
- Fill in `docs/AI_USAGE_LOG.md` and `docs/WORKS_CITED.md` as you go.
- The team captain submits. Nothing can change after submission.
- Bring a hotspot and a local build (`npm run preview`) as a backup, since there is no venue internet.
