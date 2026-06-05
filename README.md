# Chaitanya Dhamdhere — Portfolio

A modern single-page portfolio built with React, TypeScript, Vite, and Tailwind CSS. Features glassmorphism UI, Framer Motion animations, Lenis smooth scrolling, and a bento-style projects grid.

**Live:** [cdhamdhere.xyz](https://www.cdhamdhere.xyz/)

## Features

- **Sections:** About (hero), Projects, Experience, Skills, Contact
- **UI:** Dark theme, glass panels, section marquees, scroll progress rails
- **Interactions:** Contact modal (mailto), photo album, floating dock navigation
- **Performance:** Lazy-loaded sections, optimized fonts, local skill icons
- **Content:** Centralized in `src/data/portfolio.ts`

## Tech Stack

| Layer | Tools |
|-------|--------|
| Framework | React 19, TypeScript |
| Build | Vite 5, SWC |
| Styling | Tailwind CSS 3, shadcn/ui (Radix) |
| Animation | Framer Motion |
| Scroll | Lenis |
| Deploy | Vercel |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install & run

```bash
git clone <repository-url>
cd chaitu-portfolio
npm install
npm run dev
```

Open [http://localhost:8000](http://localhost:8000) (port configured in `vite.config.ts`).

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── components/       # Page sections + UI
│   ├── About.tsx
│   ├── Projects.tsx
│   ├── Experience.tsx
│   ├── Skills.tsx
│   ├── Contact.tsx
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   ├── LoadingScreen.tsx
│   ├── ContactModal.tsx
│   ├── PhotoAlbum.tsx
│   └── ui/           # shadcn primitives
├── context/          # ScrollProvider (Lenis)
├── data/
│   └── portfolio.ts  # All content (projects, experience, skills, contact)
├── hooks/
├── lib/              # Utils, scroll, resume href, image fallbacks
├── pages/
│   ├── Index.tsx     # Main page
│   └── NotFound.tsx
├── App.tsx
├── main.tsx
└── index.css         # Design tokens & global styles
public/
├── og.png
├── ChaitanyaResume.pdf
├── robots.txt
└── sitemap.xml
```

## Content Management

Edit **`src/data/portfolio.ts`** for:

- `personalInfo` — name, title, description
- `contactInfo` — email, phone, social links, resume path
- `projects` — bento grid (use `size`: hero | tall | wide | half | third)
- `experiences` — roles and achievements
- `techCategories` — skills grouped by category
- `navItems` — section navigation

### Adding images

Place assets in `public/` (e.g. `profile-photo.png`, project thumbnails). Components use graceful fallbacks (initials / placeholders) when files are missing.

## Deployment

### Vercel (recommended)

1. Connect the GitHub repo to Vercel
2. Build command: `npm run build`
3. Output directory: `dist`

`vercel.json` is included for SPA routing.

### Contact form email notifications

The contact modal POSTs to `/api/contact` (Vercel serverless + [Resend](https://resend.com)). Without env vars it falls back to opening the visitor's mail app (`mailto:`), which does **not** notify you unless they actually send.

In Vercel → **Settings → Environment Variables**, add (see `.env.example`):

| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` | Resend API key |
| `CONTACT_TO_EMAIL` | Your inbox (e.g. `c.dhamdhere@somaiya.edu`) |
| `CONTACT_FROM_EMAIL` | Verified sender (use `onboarding@resend.dev` until domain is verified) |

Redeploy after adding variables. Test with **Send message** in the contact modal on the live site.

Local API testing: run `npx vercel dev` (not plain `npm run dev`).

## Contact

**Chaitanya Dhamdhere**

- Email: c.dhamdhere@somaiya.edu
- GitHub: [@chaitu0608](https://github.com/chaitu0608)
- LinkedIn: [chaitanya-dhamdhere](https://www.linkedin.com/in/chaitanya-dhamdhere/)
