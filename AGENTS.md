# Agents Guide

## Code Standards

- **No `any` types** — All code must be strongly typed. Use proper TypeScript types, interfaces, or generics instead of `any`. The ESLint rule `@typescript-eslint/no-explicit-any` is set to `error`.
- **Run CI locally before committing** — Always run `bun run check && bun run lint && bun run build` before pushing changes.

## Stack

- SvelteKit with Svelte 5 (runes mode)
- TypeScript (strict, no `any`)
- Tailwind CSS v4
- Vite
- Bun (package manager / runtime)
- Shiki (syntax highlighting)
- marked (markdown to HTML)
- @sveltejs/adapter-vercel (deployment)

## Content

- Blog posts use `.svx` format (MDsveX) in `content/posts/`
- Frontmatter fields: `title`, `date`, `thumbnail`, `author`, `subtitle`, `tags`, `series`, `youtube`, `toc`, `draft`
- Hugo shortcodes are processed in `src/lib/shortcodes.ts`

## Project Structure

- `src/routes/` — SvelteKit pages
- `src/components/` — Svelte components
- `src/lib/` — Shared utilities, types, config
- `content/posts/` — Blog post content (.svx files)
- `static/` — Static assets (images, fonts, favicon)
