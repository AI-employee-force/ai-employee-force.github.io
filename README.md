# AI Employee Force — org website

Enterprise marketing site and **agent marketplace** UI for **AI Employee Force**, built with Angular 20 (standalone components), strict TypeScript, **Tailwind CSS v4**, and **light / dark** theme support (light defaults).

## Scripts

- `npm start` — dev server (`http://localhost:4200/`)
- `npm run build` — production build to `dist/ai-employee-force`
- `npm run watch` — build with watch

## Styling

- **Tailwind CSS v4** via `@tailwindcss/postcss`
- **Important:** The Angular CLI only auto-loads PostCSS from **`postcss.config.json`** or **`.postcssrc.json`** (not `postcss.config.mjs`). This repo uses `postcss.config.json` so Tailwind runs during `ng build` / `ng serve`. Without it, browsers receive raw `@import "tailwindcss"` and **no utilities apply**.
- Global styles: `src/styles.css` (`@import "tailwindcss"`, `@source` for templates, `@custom-variant dark`)
- Per-component styling uses Tailwind utility classes in templates

## Theme (light / dark)

- Preference stored in `localStorage` under key `aef-theme` (`light` | `dark`; default **light**)
- **`ThemeService`** (`src/app/core/services/theme.service.ts`) toggles the `dark` class on `<html>`, updates `meta[name="theme-color"]`, and `data-theme`
- **FOUC guard**: inline script in `src/index.html` applies the initial theme before the app boots
- Header includes a **theme toggle** button (sun/moon icons; desktop + mobile) bound to the same preference

## Structure

- `src/app/core` — models, constants, mock data, services (`AgentCatalogService`, `SeoService`, `ThemeService`)
- `src/app/shared` — reusable layout and presentational components
- `src/app/features` — routed pages: landing, agents (directory + profile), company (about, contact), demo

Routes: `/`, `/agents`, `/agents/:slug`, `/about`, `/demo`, `/contact`.

## Next steps

- Wire contact/demo forms to your API or CRM
- Optionally add SSR/prerender for SEO
- Swap mock agent data in `AgentCatalogService` for a CMS or backend
