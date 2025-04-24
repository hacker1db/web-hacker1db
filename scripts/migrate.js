const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { execSync } = require('child_process');

const hugoContentDir = path.join(__dirname, '..', 'content');
const nextContentDir = path.join(__dirname, '..', 'next-content');
const hugoConfigPath = path.join(__dirname, '..', 'config', '_default', 'config.yaml');
const nextConfigPath = path.join(__dirname, '..', 'next.config.js');
const tailwindConfigPath = path.join(__dirname, '..', 'tailwind.config.js');

function migrateContent() {
  if (!fs.existsSync(nextContentDir)) {
    fs.mkdirSync(nextContentDir);
  }

  const files = fs.readdirSync(hugoContentDir);

  files.forEach(file => {
    const filePath = path.join(hugoContentDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    const newContent = `---
${Object.keys(data).map(key => `${key}: ${data[key]}`).join('\n')}
---

${content}`;

    const newFilePath = path.join(nextContentDir, file);
    fs.writeFileSync(newFilePath, newContent);
  });
}

function migrateConfig() {
  const hugoConfig = fs.readFileSync(hugoConfigPath, 'utf8');
  const nextConfig = `
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['hacker1db.dev'],
  },
  env: {
    SITE_TITLE: 'Hacker1db.dev blog',
    AUTHOR: 'hacker1db',
    DESCRIPTION: 'Hack Your Life One Day At a Time',
    KEYWORDS: 'Homepage, Blog, Programming, Cyber Security, DevSecOps, Music, Travel, Coffee',
  },
};
`;

  fs.writeFileSync(nextConfigPath, nextConfig);
}

function migrateTailwindConfig() {
  const tailwindConfig = `
module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        lightBackground: '#fff',
        lightBackgroundSecondary: '#eaeaea',
        lightBackgroundHeader: '#fafafa',
        lightColor: '#222',
        lightColorVariant: 'black',
        lightColorSecondary: '#999',
        lightBorderColor: '#dcdcdc',
        lightTableColor: '#dcdcdc',
        darkBackground: '#232425',
        darkBackgroundSecondary: '#3b3d42',
        darkBackgroundHeader: '#1b1c1d',
        darkColor: '#a9a9b3',
        darkColorVariant: 'white',
        darkColorSecondary: '#b3b3bd',
        darkBorderColor: '#4e4e57',
        darkTableColor: '#4e4e57',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
`;

  fs.writeFileSync(tailwindConfigPath, tailwindConfig);
}

function installDependencies() {
  execSync('npm install next react react-dom tailwindcss postcss autoprefixer typescript @types/react @types/node mdx-js/loader next-mdx-remote');
}

function main() {
  migrateContent();
  migrateConfig();
  migrateTailwindConfig();
  installDependencies();
}

main();
