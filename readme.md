# Muhammad Ahmad — portfolio

One site: a software engineer who is a computer engineer by degree. Pages are Home (`/`), Work, About, Services, Notes, and Contact. Older `/academic` and `/freelance` addresses redirect.

Palette: regal navy `#0D3B66`, lemon chiffon `#FAF0CA`, red `#C8312B`. The page is chiffon with navy ink, a navy header and footer, and red accents.

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

- `src/pages` — Home, Work, About, Services, Notes, Contact
- `src/layouts` — the single site frame
- `src/components/site`, `src/motion`, `src/art` — shared pieces, motion helpers, hand-drawn art
- `src/data` — person, academic and freelance content
- `src/content/blogs` — Markdown notes, loaded by `src/lib/blog.ts`
- `public` — SEO files, resume (`cv/`), project media
