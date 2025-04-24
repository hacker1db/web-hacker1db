# web-hacker1db

This is a Next.js project migrated from Hugo. It includes TypeScript, Tailwind CSS, and MDX support.

## Getting Started

To run the app locally, follow these steps:

1. Install the dependencies:

   ```bash
   npm install
   ```

2. Run the development server:

   ```bash
   npm run dev
   ```

   Open http://localhost:3000 with your browser to see the result.

3. Build the app for production:

   ```bash
   npm run build
   ```

4. Start the production server:

   ```bash
   npm run start
   ```

## Configuration

The configuration settings have been migrated from the Hugo `config/_default/config.yaml` file to the Next.js configuration. You can find the configuration settings in the following files:

* `next.config.js` (`next.config.js`)
* `tailwind.config.js` (`tailwind.config.js`)
* `next-seo.config.js` (`next-seo.config.js`)
* `next-sitemap.js` (`next-sitemap.js`)

## Commit Message Guidelines

This project follows the Conventional Commits specification. Please use the following types for commit messages:

* `build`
* `chore`
* `ci`
* `docs`
* `feat`
* `fix`
* `perf`
* `refactor`
* `revert`
* `style`
* `test`

For more information, refer to the `commitlint.config.js` file.
