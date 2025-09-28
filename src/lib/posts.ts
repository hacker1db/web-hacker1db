import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { Post, PostMatter } from '@/types/blog';
import { processShortcodes, processFrontmatter } from './shortcodes';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export function getAllPostSlugs(): string[] {
  const allFiles: string[] = [];
  
  function getFilesRecursively(dir: string): void {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        getFilesRecursively(fullPath);
      } else if (file.endsWith('.md') && file !== '_index.md') {
        // Get relative path from posts directory and remove .md extension
        const relativePath = path.relative(postsDirectory, fullPath);
        const slug = relativePath.replace(/\.md$/, '');
        allFiles.push(slug);
      }
    }
  }
  
  if (fs.existsSync(postsDirectory)) {
    getFilesRecursively(postsDirectory);
  }
  
  return allFiles;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Process frontmatter to ensure proper typing
    const processedData = processFrontmatter(data);
    
    // Process Hugo shortcodes before converting to HTML
    const processedContent = processShortcodes(content, processedData);
    
    // Process markdown to HTML
    const processedMarkdown = await remark()
      .use(html, { sanitize: false })
      .process(processedContent);
    const contentHtml = processedMarkdown.toString();
    
    // Create a better excerpt
    const plainText = content.replace(/```[\s\S]*?```/g, '') // Remove code blocks
                           .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to text
                           .replace(/[#*_`]/g, '') // Remove markdown formatting
                           .replace(/\n+/g, ' ') // Replace newlines with spaces
                           .trim();
    const excerpt = plainText.length > 200 ? plainText.substring(0, 200).trim() + '...' : plainText;
    
    return {
      slug,
      content: contentHtml,
      data: processedData,
      excerpt
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = getAllPostSlugs();
  const posts = await Promise.all(
    slugs.map(slug => getPostBySlug(slug))
  );
  
  // Filter out null posts and sort by date
  return posts
    .filter((post): post is Post => post !== null)
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => 
    post.slug.toLowerCase().includes(category.toLowerCase())
  );
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => 
    post.data.tags?.some(postTag => 
      postTag.toLowerCase().includes(tag.toLowerCase())
    )
  );
}