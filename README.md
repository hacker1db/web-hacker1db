# web-hacker1db

This project is a migration of the [hacker1db.dev](https://www.hacker1db.dev/) site from Hugo to Next.js. The site is hosted on Vercel and uses Tailwind CSS for styling. The content is written in Markdown (MD) and MDX.

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/hacker1db/web-hacker1db.git
cd web-hacker1db
```

2. Install the dependencies:

```bash
npm install
```

3. Run the migration script to convert Hugo content and theme to Next.js:

```bash
node scripts/migrate.js
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building for Production

To build the project for production, run the following command:

```bash
npm run build
```

This will create an optimized production build in the `.next` directory.

## Running in Production

To run the project in production mode, use the following command:

```bash
npm start
```

This will start the Next.js server in production mode.

## SEO Optimizations

The project uses the `next-seo` package for SEO optimizations. You can configure the SEO settings in the `next-seo.config.js` file.

## Tailwind CSS

The project uses Tailwind CSS for styling. You can configure the Tailwind CSS settings in the `tailwind.config.js` file and add global styles in the `styles/globals.css` file.

## TypeScript

The project is written in TypeScript. You can configure the TypeScript settings in the `tsconfig.json` file.

## Contributing

If you would like to contribute to the project, please create a pull request with your changes. Make sure to follow the existing code style and include tests for any new features or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
