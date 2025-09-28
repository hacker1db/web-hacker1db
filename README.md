# Hacker1db.dev Blog

A modern, fast blog built with Next.js, TypeScript, and React. Previously built with Hugo, now migrated to a fully modern stack for better performance and developer experience.

![Next.js](https://img.shields.io/badge/Next.js-15.0.4-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue?logo=typescript)
![React](https://img.shields.io/badge/React-18-blue?logo=react)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

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
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build & Deploy

1. **Build for production**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm run start
   ```

3. **Static export** (for static hosting)
   ```bash
   npm run build
   # The static site will be in the 'out' directory
   ```

## 📁 Project Structure

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
├── next.config.js              # Next.js configuration
└── tsconfig.json               # TypeScript configuration
```

## 🛠 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build optimized production bundle |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint for code quality |

## ✨ Features

- **⚡ Fast Performance**: Built with Next.js 15 and optimized for speed
- **📝 Markdown Support**: Write posts in Markdown with frontmatter
- **🎨 Dark Theme**: Terminal-inspired design with custom CSS
- **📱 Responsive**: Mobile-first responsive design
- **🔍 SEO Optimized**: Proper meta tags and Open Graph support
- **🏷️ Tagging System**: Organize posts with tags and series
- **🔗 Social Integration**: Links to social media profiles
- **⚙️ TypeScript**: Full type safety and IntelliSense
- **📊 Static Generation**: Pre-rendered for optimal performance

## 📝 Writing Posts

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

## 🎨 Customization

### Site Configuration

Edit `src/lib/config.ts` to customize:
- Site title and description
- Social media links
- Footer content
- Author information

### Styling

The site uses custom CSS located in `src/app/globals.css`. Key customization points:
- Color scheme (currently dark terminal theme)
- Typography and fonts
- Layout and spacing
- Component styles

### Adding New Pages

Create new pages by adding files to the `src/app/` directory following Next.js App Router conventions.

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Deploy automatically with zero configuration

### Netlify

1. Build the static site: `npm run build`
2. Upload the `out` directory to [Netlify](https://netlify.com)

### GitHub Pages

1. Build the static site: `npm run build`
2. Deploy the `out` directory to GitHub Pages

### Other Static Hosts

The site exports to static files in the `out` directory and can be deployed to any static hosting service.

## 🔧 Development

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

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Contact

- **Website**: [hacker1db.dev](https://hacker1db.dev)
- **Twitter**: [@hacker1db](https://twitter.com/hacker1db)
- **GitHub**: [@hacker1db](https://github.com/hacker1db)

---

Built with ❤️ using Next.js and TypeScript