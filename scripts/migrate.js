const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { execSync } = require('child_process');

const hugoContentDir = path.join(__dirname, '../content');
const nextContentDir = path.join(__dirname, '../pages/posts');
const hugoThemeDir = path.join(__dirname, '../assets/scss');
const nextThemeDir = path.join(__dirname, '../styles');

function convertHugoToNext() {
  // Create Next.js content directory if it doesn't exist
  if (!fs.existsSync(nextContentDir)) {
    fs.mkdirSync(nextContentDir, { recursive: true });
  }

  // Copy Hugo content to Next.js content directory
  fs.readdirSync(hugoContentDir).forEach((file) => {
    const filePath = path.join(hugoContentDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    const nextFilePath = path.join(nextContentDir, `${data.title}.mdx`);
    const nextFileContent = `---
${Object.entries(data)
  .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
  .join('\n')}
---

${content}`;

    fs.writeFileSync(nextFilePath, nextFileContent);
  });

  // Create Next.js theme directory if it doesn't exist
  if (!fs.existsSync(nextThemeDir)) {
    fs.mkdirSync(nextThemeDir, { recursive: true });
  }

  // Copy Hugo theme to Next.js theme directory
  fs.readdirSync(hugoThemeDir).forEach((file) => {
    const filePath = path.join(hugoThemeDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const nextFilePath = path.join(nextThemeDir, file);
    fs.writeFileSync(nextFilePath, fileContent);
  });

  // Install Next.js, React, React-DOM, and Tailwind CSS
  execSync('npm install next react react-dom tailwindcss');

  // Install MDX and MD support
  execSync('npm install @next/mdx @mdx-js/loader');

  // Install SEO optimizations
  execSync('npm install next-seo');

  console.log('Migration from Hugo to Next.js completed successfully.');
}

convertHugoToNext();
