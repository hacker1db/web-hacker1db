# Hacker1db.dev Blog

A modern, fast blog built with Next.js, TypeScript, and React. Previously built with Hugo, now migrated to a fully modern stack for better performance and developer experience.

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![pnpm](https://img.shields.io/badge/pnpm-10-orange?logo=pnpm)

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm (`npm install -g pnpm`)

### Installation & Development

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Start the development server**
   ```bash
   pnpm dev
   ```

3. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build & Deploy

1. **Build for production**
   ```bash
   pnpm build
   ```

2. **Start production server**
   ```bash
   pnpm start
   ```

3. **Static export** (for static hosting)
   ```bash
   pnpm build
   # The static site will be in the 'out' directory
   ```

## Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Homepage
│   │   ├── about/              # About page
│   │   └── posts/              # Blog posts
│   │       ├── page.tsx        # Posts listing
│   │       └── [...slug]/      # Dynamic post pages
│   ├── components/             # React components
│   │   ├── Header.tsx          # Navigation
│   │   ├── Footer.tsx          # Site footer
│   │   └── SocialIcons.tsx     # Social media links
│   ├── lib/                    # Utilities and helpers
│   │   ├── config.ts           # Site configuration
│   │   └── posts.ts            # Blog post processing
│   └── types/                  # TypeScript type definitions
├── content/                    # Markdown blog posts
│   ├── about.md                # About page content
│   └── posts/                  # Blog posts organized by category
├── public/                     # Static assets
│   ├── images/                 # Images and media
│   └── fonts/                  # Font files
├── package.json                # Dependencies and scripts
├── next.config.mjs             # Next.js configuration (ESM)
├── pnpm-lock.yaml              # pnpm lock file
└── tsconfig.json               # TypeScript configuration
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with Turbopack (default in Next.js 16) |
| `pnpm build` | Build optimized production bundle via Turbopack |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint for code quality |
| `pnpm type-check` | Run TypeScript type checking |
| `pnpm format` | Format code with Prettier |
| `pnpm clean` | Remove build artifacts |

## Features

- **Fast Performance**: Built with Next.js 16 and Turbopack (stable, default bundler)
- **Markdown Support**: Write posts in Markdown with comprehensive Hugo shortcode support
- **Dark Theme**: Terminal-inspired design with custom CSS
- **Responsive**: Mobile-first responsive design with card-based layout
- **SEO Optimized**: Proper meta tags and Open Graph support
- **Tagging System**: Organize posts with tags and series
- **Social Integration**: Centrally managed social media links with platform-specific styling
- **TypeScript**: Full type safety and IntelliSense
- **Static Generation**: Pre-rendered for optimal performance
- **Media Rich**: Support for YouTube/Vimeo embeds, code highlighting, and interactive content
- **Card Layout**: Modern grid-based post display with hover animations
- **Hugo Compatible**: Seamless migration from Hugo with shortcode processing
- **Local Fonts**: Self-hosted Inter font for faster loading (no external requests)
- **React 19**: Latest React with improved performance and new features

## Writing Posts

Create new blog posts by adding Markdown files to the `content/posts/` directory:

```markdown
---
title: "Your Post Title"
date: 2025-01-12
subtitle: "Optional subtitle"
author: "hacker1db"
tags:
  - "Technology"
  - "Programming"
series:
  - "Getting Started"
---

# Your Post Content

Write your post content here using Markdown syntax.
```

### Supported Frontmatter Fields

- `title`: Post title (required)
- `date`: Publication date in YYYY-MM-DD format (required)
- `subtitle`: Optional subtitle
- `author`: Post author
- `tags`: Array of tags
- `series`: Array of series names
- `toc`: Enable table of contents (boolean)
- `Comments`: Enable comments (boolean)

## Customization

### Site Configuration

Edit `src/lib/config.ts` to customize:
- Site title and description
- Author information
- Footer content

### Social Media Icons

Social media icons and links are centrally managed in `src/lib/socialIcons.ts`. To add or modify social icons:

1. **Add a new icon**: Edit the `socialIconsConfig` object in `src/lib/socialIcons.ts`
2. **Update URLs**: Modify the `url` property for existing icons
3. **Change colors**: Update the `color` property for hover effects
4. **Custom icons**: Add your own SVG path data

Example of adding a new social platform:
```typescript
// In src/lib/socialIcons.ts
linkedin: {
  name: 'linkedin',
  url: 'https://linkedin.com/in/yourprofile',
  color: '#0077B5',
  viewBox: '0 0 24 24',
  path: 'YOUR_SVG_PATH_DATA_HERE'
}
```

The icons will automatically appear on the homepage and use the configured colors on hover.

### Hugo Shortcodes Support

The migration includes comprehensive support for Hugo shortcodes with enhanced functionality:

#### Content Shortcodes
- `{{< param subtitle >}}` - Displays frontmatter parameters
- `{{< highlight language >}}` - Code syntax highlighting (converts to markdown)
- `{{< ref "path" >}}` - Internal links (converted to Next.js routes)
- `{{< relref "path" >}}` - Relative internal links

#### Media Shortcodes
- `{{< youtube VIDEO_ID >}}` - Responsive YouTube embeds
- `{{< vimeo VIDEO_ID >}}` - Responsive Vimeo embeds
- `{{< figure src="image.jpg" alt="Alt text" caption="Caption" >}}` - Enhanced image figures
- `{{< gist username gist_id >}}` - GitHub Gist embeds

#### Interactive Elements
- `{{< newsletter >}}` - Styled newsletter signup with social links

#### Example Usage
```markdown
---
title: "My Post"
subtitle: "Learn Next.js"
---

# {{< param subtitle >}}

{{< youtube dQw4w9WgXcQ >}}

{{< highlight javascript >}}
console.log('Hello World!');
{{< /highlight >}}

{{< newsletter >}}
```

### Card-Style Layout

The blog now features a modern card-based design inspired by [joshmedeski.com](https://www.joshmedeski.com/posts/):

- **Grid layout** - Responsive cards that adapt to screen size
- **Hover animations** - Cards lift and highlight on hover
- **Category badges** - Visual category indicators
- **Enhanced metadata** - Date, author, series, and tag information
- **Read more links** - Clear call-to-action
- **Smart excerpts** - Auto-generated from content (excludes code blocks)

### Styling

The site uses custom CSS located in `src/app/globals.css`. Key customization points:
- Color scheme (currently dark terminal theme)
- Typography and fonts
- Layout and spacing
- Component styles

### Adding New Pages

Create new pages by adding files to the `src/app/` directory following Next.js App Router conventions.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Deploy automatically with zero configuration

### Netlify

1. Build the static site: `pnpm build`
2. Upload the `out` directory to [Netlify](https://netlify.com)

### GitHub Pages

1. Build the static site: `pnpm build`
2. Deploy the `out` directory to GitHub Pages

### Other Static Hosts

The site exports to static files in the `out` directory and can be deployed to any static hosting service.

## Development

### Local Development

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Start development server: `pnpm dev`
4. Make changes and see them reflected instantly

### Adding Dependencies

```bash
# Add a new dependency
pnpm add package-name

# Add a development dependency
pnpm add -D package-name
```

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Contact

- **Website**: [hacker1db.dev](https://hacker1db.dev)
- **Twitter**: [@hacker1db](https://twitter.com/hacker1db)
- **GitHub**: [@hacker1db](https://github.com/hacker1db)

---

Built with Next.js 16, React 19, TypeScript, and pnpm
