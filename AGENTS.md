# AGENTS.md — hacker1db.dev Blog

Personal technical blog built with SvelteKit, deployed to Vercel. Covers cybersecurity, DevOps, programming, and tooling. Terminal-inspired dark theme throughout.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | SvelteKit 2 + TypeScript (strict) |
| Styling | TailwindCSS 4 + Typography plugin |
| Markdown | mdsvex (`.svx` files), gray-matter |
| Syntax Highlighting | Shiki |
| Deployment | Vercel (`@sveltejs/adapter-vercel`, Node 22) |
| Package Manager | pnpm / bun |

Path aliases: `$lib` → `src/lib/`, `$components` → `src/components/`

---

## Project Layout

```
src/
  routes/               # SvelteKit file-based routing
    +layout.server.ts   # Root load fn — provides posts to all routes
    +layout.svelte      # Global shell: header, footer, search modal
    +page.svelte        # Homepage
    posts/              # Post listing + dynamic [...slug] pages
    series/             # Series index + individual series pages
    tags/               # Tag index + individual tag pages
    about/              # About page
  components/
    Header.svelte       # Nav + search trigger (⌘K hint)
    Footer.svelte       # Footer with tag cloud
    PostCard.svelte     # Card layout for post listings
    SearchModal.svelte  # Full-screen keyboard-navigable search UI
    CodeBlock.svelte    # Shiki syntax-highlighted code blocks
    SocialIcons.svelte  # Social media link row
  lib/
    types.ts            # Core TypeScript interfaces
    posts.ts            # Content I/O: load, filter, sort posts
    config.ts           # Site branding, author, social links
    shortcodes.ts       # Hugo-compatible shortcode processor
    socialIcons.ts      # Social media metadata
content/
  posts/                # Blog posts organized by category
    CyberSecurity/
    DevOps/
    Programing/
    Testing/
  about.svx
static/                 # Images, fonts, other static assets
```

---

## Key Interfaces (`src/lib/types.ts`)

```typescript
PostMatter      // Frontmatter fields: title, subtitle, date, tags, series, category, draft
Post            // Full post: slug + content + data (PostMatter) + excerpt
SearchablePost  // Lightweight: slug, title, subtitle, category, tags, series, excerpt
SiteConfig      // Site-wide: name, author, description, social links
```

---

## Content Pipeline

1. **Source**: Markdown files under `content/posts/**/*.{md,mdx,svx}`
2. **Loading** (`src/lib/posts.ts`):
   - `getAllPostSlugs()` — recursive glob for content files
   - `getPostBySlug(slug)` — reads file, parses frontmatter with gray-matter
   - `getAllPosts()` — all posts sorted descending by date, drafts excluded
   - `getPostsByTag(tag)` / `getPostsBySeries(series)` — filtered views
   - Excerpts are auto-generated (200 chars stripped of markdown)
3. **Shortcodes** (`src/lib/shortcodes.ts`): Hugo-compatible syntax processed at load time
   - `{{< param key >}}` — frontmatter value injection
   - `{{< highlight lang >}}` — fenced code block conversion
   - `{{< youtube ID >}}` / `{{< vimeo ID >}}` — responsive embeds
   - `{{< figure src="..." >}}` — captioned images
   - `{{< newsletter >}}` — CTA box

---

## Search Feature (`feature/addsearch`)

Search is client-side, data loaded once at the root layout level.

**Data flow:**
```
+layout.server.ts  →  maps getAllPosts() to SearchablePost[]
+layout.svelte     →  receives data.searchPosts, passes to SearchModal
Header.svelte      →  fires onsearch callback on button click
+layout.svelte     →  listens for Cmd+K / Ctrl+K globally
SearchModal.svelte →  filters across title, subtitle, category, excerpt, tags, series
```

**Search UX:**
- Keyboard shortcut: `Cmd+K` (macOS) / `Ctrl+K` (Windows/Linux)
- Arrow keys navigate results; Enter follows the link; Escape closes
- Max 8 results; body scroll locked while open
- Clicking the backdrop closes the modal
- Terminal-style UI matching site theme

---

## Design System

The site uses a terminal-inspired dark aesthetic. Adhere to these conventions when touching styles:

| Token | Value |
|---|---|
| Background | `#1a1d21` |
| Accent / cyan | `#6FC1FF` |
| Text primary | `#e0e0e0` |
| Font | Monospace stack |

All new components should use TailwindCSS utility classes. Do not introduce external UI libraries.

---

## Development Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm check        # svelte-kit sync + svelte-check (type checking)
pnpm lint         # ESLint
pnpm deploy       # vercel --prod
```

Run `pnpm check` and `pnpm lint` before considering any change complete. There are no automated tests; manually verify affected routes in the browser.

---

## Agent Guidelines

### General
- Read a file before editing it — never assume content.
- Prefer editing existing files over creating new ones.
- Keep components focused: one concern per file.
- Do not add comments to code unless logic is non-obvious.

### TypeScript
- Strict mode is enabled. All new code must be fully typed.
- Add new shared interfaces to `src/lib/types.ts`.
- Do not use `any`; prefer `unknown` with narrowing if the type is genuinely dynamic.

### Svelte / SvelteKit
- Use SvelteKit file conventions (`+page.svelte`, `+layout.server.ts`, etc.).
- Server-side data loading belongs in `+layout.server.ts` or `+page.server.ts` load functions — not in component `onMount`.
- Prefer `$props()` rune syntax for component props (SvelteKit 2 / Svelte 5 runes style).
- Keyboard event handlers must be paired with equivalent pointer event handlers for accessibility.

### Content & Routing
- Blog post slugs are derived from the file path relative to `content/posts/`. Do not hardcode slugs.
- All post URLs use the `/posts/{slug}/` pattern — the `posts/` prefix must not be doubled.
- The `draft: true` frontmatter field hides a post from all listings.

### Styling
- Use TailwindCSS utility classes. Do not write raw CSS unless absolutely necessary.
- New components must be visually consistent with the terminal dark theme (see Design System above).
- Do not alter `app.css` global styles without understanding their site-wide impact.

### Search
- `SearchablePost` is intentionally lightweight — do not add full content to it.
- Search filtering runs synchronously on the client; keep it O(n) with early exits.
- The 8-result cap is intentional for visual clarity.

---

## Common Pitfalls

- **Duplicate `posts/` prefix**: The shortcode processor previously doubled the path prefix. The fix lives in `src/lib/shortcodes.ts` — do not revert it.
- **Draft posts**: `getAllPosts()` filters drafts; individual slug lookups do not — be careful when fetching by slug directly.
- **mdsvex vs gray-matter**: Frontmatter in `.svx` files is processed by both mdsvex (for rendering) and gray-matter (for metadata extraction). Keep frontmatter valid YAML.
- **Static prerendering**: Most routes are prerendered. Avoid runtime-only APIs (e.g., `window`, `localStorage`) outside of `onMount` or browser guards (`if (browser)`).
