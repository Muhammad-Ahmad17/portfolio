# Muhammad Ahmad — portfolio

One site, two rooms: an **academic** record (`/academic`) and a **freelance** practice (`/freelance`), joined by a landing page (`/`).

Palette: regal navy `#0D3B66`, lemon chiffon `#FAF0CA`, red `#C8312B`. The academic side is chiffon with navy and red; the freelance side is navy and red with chiffon ink.

## Stack

Vite, React 18, TypeScript, Tailwind CSS 3, framer-motion, react-router.

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
npm run lint
```

## Layout

- `src/pages` — landing, `academic/*`, `freelance/*`
- `src/layouts` — shared section frame and the two layouts
- `src/components/site`, `src/motion`, `src/art` — shared pieces, motion helpers, hand-drawn art
- `src/data` — person, academic and freelance content
- `src/content/blogs` — Markdown notes, loaded by `src/lib/blog.ts`
- `public` — SEO files, resume (`cv/`), project media
