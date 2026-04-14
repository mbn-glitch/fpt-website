# Fiper Pro Traders — Website

Marketing website for **Fiper Pro Traders (FPT)** — the prop-trading arm of Fiper Global.

## Stack

- React 19 + React Router 6
- Vite 6
- Tailwind CSS 4
- Framer Motion (animations)
- Lucide React (icons)

## Scripts

```bash
npm install      # install dependencies
npm run dev      # start dev server on http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build locally
```

## Structure

```
public/            static assets (logos, robots.txt, sitemap.xml)
src/
  components/
    brand/        logo
    layout/       navbar, footer
    sections/     home-page sections
    ui/           primitives (button, section, countup, wave bg)
  pages/          routed pages
  data/           pricing data
  App.jsx         router shell
  main.jsx        entry
index.html        shell + meta + schema.org
```

## Deployment

Deployed to Vercel — zero config (Vite is auto-detected).

Project: `fpt-website` · expected URL: `fpt-website.vercel.app`

## External links

- Trader CRM: `https://crm.fptraders.com`
- Fiper Card: `https://fiper-landing-page.vercel.app/`
- Socials / Fiper Global: `https://linktr.ee/fiper`
- Legal: `https://fiper.me/legal-documentation`
