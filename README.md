# Hacker1db.dev Blog

A modern, fast blog built with SvelteKit, TypeScript, and MDsveX. Previously built with Hugo, now migrated to a fully modern stack for better performance and developer experience.

![SvelteKit](https://img.shields.io/badge/SvelteKit-2.x-orange?logo=svelte)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![MDsveX](https://img.shields.io/badge/MDsveX-0.x-purple)
![npm](https://img.shields.io/badge/npm-10-red?logo=npm)

## Quick Start

### Prerequisites

- Node.js 18+
- npm

### Installation & Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to [http://localhost:5173](http://localhost:5173)

### Build & Deploy

1. **Build for production**
   ```bash
   npm run build
   ```

2. **Preview production build**
   ```bash
   npm run preview
   ```

3. **Static export** (for static hosting)
   ```bash
   npm run build
   # The static site will be in the 'build' directory
   ```

## Project Structure

```
├── src/
│   ├── routes/                 # SvelteKit file-based routing
│   │   ├── +layout.svelte      # Root layout with SearchModal and Cmd+K
│   │   ├── +layout.server.ts   # Load searchable posts at build time
│   │   ├── +page.svelte        # Homepage
│   │   ├── about/              # About page
│   │   ├── posts/              # Blog posts listing
│   │   ├── series/             # Series listing pages
│   │   └── tags/               # Tag listing pages
│   ├── components/             # Svelte components
│   │   ├── Header.svelte       # Navigation with search button
│   │   ├── Footer.svelte       # Site footer
│   │   ├── SearchModal.svelte  # Cmd+K search with keyboard nav
│   │   ├── PostCard.svelte     # Blog post card
│   │   ├── CodeBlock.svelte    # Syntax-highlighted code blocks
│   │   └── SocialIcons.svelte  # Social media links
│   ├── lib/                    # Utilities and helpers
│   │   ├── config.ts           # Site configuration
│   │   ├── posts.ts            # Blog post processing
│   │   ├── types.ts            # TypeScript type definitions
│   │   ├── shortcodes.ts       # Hugo shortcode processing
│   │   └── socialIcons.ts      # Social media icon config
│   └── posts/                  # MDsveX blog post source files (.svx)
├── content/                    # Additional content assets
├── static/                     # Static assets (images, fonts)
├── package.json                # Dependencies and scripts
├── svelte.config.js            # SvelteKit + MDsveX configuration
├── vite.config.ts              # Vite configuration
└── tsconfig.json               # TypeScript configuration
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build optimized production bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality |
| `npm run check` | Run Svelte type checking |
| `npm run format` | Format code with Prettier |

## Features

- **Fast Performance**: Built with SvelteKit and Vite
- **Markdown Support**: Write posts in MDsveX (.svx) with Svelte components inline
- **Client-Side Search**: Cmd+K modal with keyboard navigation and instant results
- **Dark Theme**: Terminal-inspired design with custom CSS
- **Responsive**: Mobile-first responsive design with card-based layout
- **SEO Optimized**: Proper meta tags and Open Graph support
- **Tagging System**: Organize posts with tags and series
- **Social Integration**: Centrally managed social media links with platform-specific styling
- **TypeScript**: Full type safety and IntelliSense
- **Static Generation**: Pre-rendered for optimal performance
- **Media Rich**: Support for YouTube/Vimeo embeds, code highlighting, and interactive content
- **Local Fonts**: Self-hosted fonts for faster loading (no external requests)

## Writing Posts

Create new blog posts by adding `.svx` files to the `src/posts/` directory:

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
You can also use Svelte components directly in .svx files!
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

### Hugo Shortcodes Support

The migration includes comprehensive support for Hugo shortcodes:

#### Content Shortcodes
- `{{< param subtitle >}}` - Displays frontmatter parameters
- `{{< highlight language >}}` - Code syntax highlighting
- `{{< ref "path" >}}` - Internal links
- `{{< relref "path" >}}` - Relative internal links

#### Media Shortcodes
- `{{< youtube VIDEO_ID >}}` - Responsive YouTube embeds
- `{{< vimeo VIDEO_ID >}}` - Responsive Vimeo embeds
- `{{< figure src="image.jpg" alt="Alt text" caption="Caption" >}}` - Enhanced image figures
- `{{< gist username gist_id >}}` - GitHub Gist embeds

#### Interactive Elements
- `{{< newsletter >}}` - Styled newsletter signup with social links

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Deploy automatically with zero configuration

### Netlify

1. Build the static site: `npm run build`
2. Upload the `build` directory to [Netlify](https://netlify.com)

### GitHub Pages

1. Build the static site: `npm run build`
2. Deploy the `build` directory to GitHub Pages

### Other Static Hosts

The site exports to static files in the `build` directory and can be deployed to any static hosting service.

## Development

### Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Make changes and see them reflected instantly

### Adding Dependencies

```bash
# Add a new dependency
npm install package-name

# Add a development dependency
npm install -D package-name
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

Built with SvelteKit, MDsveX, TypeScript, and Vite
