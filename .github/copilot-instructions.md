# GitHub Copilot Instructions for Hacker1db Blog

This is a **Next.js 15 static blog** migrated from Hugo, featuring MDX content processing and terminal-inspired design.

## Architecture Overview

- **Static Export**: Uses `output: 'export'` in `next.config.js` for GitHub Pages deployment
- **Content System**: Markdown/MDX files in `content/posts/` with Hugo shortcode compatibility
- **Processing Pipeline**: `gray-matter` → Hugo shortcode processing → Markdown → HTML with syntax highlighting
- **Routing**: Dynamic routes via `app/posts/[...slug]/page.tsx` with nested directory support

## Key Files & Patterns

### Content Management (`src/lib/posts.ts`)
```typescript
// Main content processing workflow
getAllPostSlugs() → getPostBySlug() → processShortcodes() → remark/rehype
```

### Hugo Shortcode Processing (`src/lib/shortcodes.ts`)
- **YouTube/Vimeo**: `{{< youtube VIDEO_ID >}}` → responsive iframe
- **Code blocks**: `{{< highlight lang >}}` → markdown code blocks  
- **Parameters**: `{{< param subtitle >}}` → frontmatter values
- **Newsletter**: `{{< newsletter >}}` → styled social links component
- **Images**: `{{< figure src="..." alt="..." caption="..." >}}` → styled figure elements

### PostCard Logic (`src/components/PostCard.tsx`)
**Critical Pattern**: `hideSubtitleInCard` detection prevents duplicate subtitles when they're used as `{{< param subtitle >}}` in content. The component has hardcoded fallback logic for specific posts.

### Site Configuration (`src/lib/config.ts`)
- Centralized site metadata in `siteConfig` object
- Social icons managed via `src/lib/socialIcons.ts` with platform-specific styling

## Development Workflows

### Scripts (package.json)
- `npm run dev` - Development with hot reload
- `npm run build` - Static export to `out/` directory  
- `npm run ci` - Full CI pipeline (type-check + lint + build)
- `npm run precommit` - Auto-fix linting before commits

### Content Creation
1. Add `.md`/`.mdx` files to `content/posts/[category]/`
2. Use frontmatter: `title`, `date`, `subtitle`, `author`, `tags`, `series`
3. Hugo shortcodes are automatically processed
4. Category badges derived from folder structure

### ESLint Configuration
- **Modern setup**: Uses `eslint.config.mts` with TypeScript type-aware rules
- **Multi-format**: Lints JS/TS, JSON, Markdown, and CSS files
- **Next.js integration**: Core Web Vitals rules enabled

## Project-Specific Conventions

### Frontmatter Processing
```yaml
---
title: "Post Title"
subtitle: "Optional subtitle" 
date: 2025-01-12
tags: ["Tag1", "Tag2"]
series: ["Series Name"]
author: "hacker1db"
hideSubtitleInCard: true  # Prevents duplicate when used as {{< param subtitle >}}
---
```

### Styling Approach
- **Hybrid approach** - Tailwind CSS configured alongside traditional CSS
- **Dark terminal theme** with `#6FC1FF` accent color (cursor blue)
- **Inline styles** for complex components, Tailwind classes for simple utilities
- **Enhanced code blocks** with copy functionality via `CodeBlock` component
- **Card-based layout** with hover animations and transitions
- **Comprehensive CSS** in `globals.css` ensures all styling works properly

### Static Generation Patterns
- All content pre-rendered at build time
- Dynamic routes generated via `generateStaticParams()`
- Images marked `unoptimized: true` for static hosting compatibility

## Common Tasks

### Adding New Posts
Create in `content/posts/[Category]/post-name.mdx` - category becomes badge, file name becomes slug.

### Shortcode Development  
Extend `processShortcodes()` in `src/lib/shortcodes.ts` with regex replacement patterns.

### Component Updates
- **PostCard**: Uses hardcoded subtitle detection - update conditional logic when adding posts with subtitle params
- **CodeBlock**: Enhanced with copy-to-clipboard functionality and language labels
- **MDXProvider**: Handles code block rendering with `CodeBlock` component for enhanced UX

### Build Troubleshooting
- Check `npm run type-check` for TypeScript errors
- Verify MDX processing with `npm run dev` locally
- Static export outputs to `out/` directory