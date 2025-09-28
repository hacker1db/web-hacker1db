#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Script to convert markdown (.md) files to MDX (.mdx) files
 * Usage: node scripts-new/convert-to-mdx.js
 */

const postsDirectory = path.join(process.cwd(), 'content/posts');

function convertMarkdownToMdx(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Recursively process subdirectories
      convertMarkdownToMdx(fullPath);
    } else if (file.endsWith('.md') && file !== '_index.md') {
      // Convert .md file to .mdx
      const mdxPath = fullPath.replace(/\.md$/, '.mdx');
      
      console.log(`Converting: ${fullPath} -> ${mdxPath}`);
      
      // Read the original markdown content
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // For now, just copy the content as-is since most markdown is valid MDX
      // You can add additional transformations here if needed
      fs.writeFileSync(mdxPath, content, 'utf8');
      
      console.log(`✅ Converted: ${file} -> ${file.replace('.md', '.mdx')}`);
    }
  }
}

function addNewsletterToExistingMdx(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      addNewsletterToExistingMdx(fullPath);
    } else if (file.endsWith('.mdx')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Check if newsletter link already exists
      if (!content.includes('newsletter.hacker1db.dev')) {
        console.log(`Adding newsletter link to: ${fullPath}`);
        
        const newsletterSection = `

---

## 📧 Stay Connected

Want more insights like this? [**Subscribe to my newsletter**](https://newsletter.hacker1db.dev/) for exclusive cybersecurity tips, development insights, and behind-the-scenes content delivered to your inbox!`;

        const updatedContent = content + newsletterSection;
        fs.writeFileSync(fullPath, updatedContent, 'utf8');
        
        console.log(`✅ Added newsletter link to: ${file}`);
      }
    }
  }
}

console.log('🔄 Converting Markdown files to MDX...');
convertMarkdownToMdx(postsDirectory);

console.log('\n📧 Adding newsletter links to MDX files...');
addNewsletterToExistingMdx(postsDirectory);

console.log('\n✨ Conversion complete!');
console.log('\n📝 Next steps:');
console.log('1. Review the converted .mdx files');
console.log('2. Test your build with: npm run build');
console.log('3. Remove original .md files if everything looks good');
console.log('4. Consider enhancing posts with MDX components!');