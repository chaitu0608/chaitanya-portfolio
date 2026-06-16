# Chaitanya Dhamdhere — Portfolio

Terminal-inspired engineer log portfolio built with React, Vite, TypeScript, and Tailwind CSS.

**Live:** [cdhamdhere.xyz](https://www.cdhamdhere.xyz)

## Sections

- **About** — identity dossier, typewriter bio, polaroid photos
- **Experience** — roles + education
- **Projects** — flagship work with live previews
- **Skills** — logo marquee by category
- **Contact** — email, socials, message form

## Tech stack

- React 19 + Vite 5 + TypeScript
- Tailwind CSS + Framer Motion
- React Router (SPA)
- Vercel Analytics
- Vercel serverless `/api/contact` + Resend

## Project structure

```
src/
├── components/
│   ├── log/          # Main sections (About, Work, Experience, Skills, Contact, LogNav, …)
│   ├── loader/       # Boot gate + pen signature
│   ├── ui/           # shadcn-style primitives
│   ├── ContactModal.tsx
│   └── CommandPalette.tsx
├── data/
│   ├── portfolio.ts  # Personal info, experience, projects
│   ├── skills.ts     # Skill categories
│   └── photos.ts     # Polaroid album
├── lib/
│   └── resume.ts     # Resume URL helpers
├── pages/
│   ├── Index.tsx
│   └── NotFound.tsx
api/
└── contact.ts        # Resend email handler
public/
└── ChaitanyaResume.pdf
```

## Local development

```bash
npm install --legacy-peer-deps
npm run dev          # http://localhost:8000
npm run build
npm run typecheck
npm run lint
```

**Contact API locally:** `npx vercel dev` (plain `npm run dev` does not serve `/api/contact`).

## Deployment (Vercel)

1. Connect repo to Vercel
2. Build: `npm run build` · Output: `dist`
3. [`vercel.json`](vercel.json) includes SPA rewrites and security headers

### Contact form env vars

Add in Vercel → Settings → Environment Variables (see [`.env.example`](.env.example)):

| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` | Resend API key |
| `CONTACT_TO_EMAIL` | Your inbox |
| `CONTACT_FROM_EMAIL` | Verified sender |

Redeploy after adding variables. Test **Send a message** on the live site.

## Keyboard shortcuts

| Key | Action |
|-----|--------|
| `⌘K` / `/` | Command palette |
| `j` / `k` | Next / prev section |
| `g` then `a/w/e/s/c` | Jump to about / work / experience / skills / contact |

## License

Private — © Chaitanya Dhamdhere
