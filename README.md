# Woxsen Japan Center

Woxsen Japan Center Site

## Prerequisites

- Node.js (v18+ recommended)
- pnpm (recommended) or npm / yarn

## Installation

1. Clone the repo:

```bash
git clone https://github.com/aircwou/woxsen-japan-center-wou.git
cd woxsen-japan-center-wou
```

2. Install dependencies (pnpm recommended):

```bash
pnpm install
# or
npm install
# or
yarn install
```

## Running locally

- Start development server:

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

- Build for production:

```bash
pnpm build
# or
npm run build
```

- Start production server (after build):

```bash
pnpm start
# or
npm start
```

## Contributing

- Create a feature branch from `main` (or the target branch): `git checkout -b feat/your-feature`
- Push your branch to the repository and open a pull request;
- Keep changes focused and add tests where appropriate.
- Follow existing code style (TypeScript, Tailwind, Next.js conventions).
- Open a pull request with a clear summary and screenshots if UI changes.

Maintainers will review, request changes if needed, and merge when ready.

## Folder structure (overview)

- `app/` - Next.js App Router pages and layouts
  - `globals.css` - global styles
  - `layout.tsx`, `page.tsx` - root layout and entry page
  - subpages: `about/`, `events/`, `gallery/`, `jlpt/`, `join/`, `team/`, `privacy/`, `terms/`
- `components/` - React components and UI primitives
  - `ui/` - smaller UI atoms (button, effects, etc.)
  - `sections/` - page sections (hero, footer, featured, etc.)
- `hooks/` - custom hooks (e.g. `use-mobile.ts`, `use-toast.ts`)
- `lib/` - utility helpers
- `data/` - simple data files (events, etc.)
- `public/` - static assets (images, fonts)
- config files: `next.config.mjs`, `tsconfig.json`, `postcss.config.mjs`, `tailwind` config

This is a high-level view — explore `src/` for the full code layout.

## Notes

- The project uses Next.js `next` v16 and React 19 (see `package.json`).
- If you add environment variables, put them in `.env.local` and do not commit them.

---

