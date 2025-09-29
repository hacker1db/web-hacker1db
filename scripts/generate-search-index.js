const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { remark } = require('remark');
const remarkRehype = require('remark-rehype');
const rehypeHighlight = require('rehype-highlight');
const rehypeStringify = require('rehype-stringify');

const postsDirectory = path.join(process.cwd(), 'content/posts');
const outputFile = path.join(process.cwd(), 'public/search-index.json');

function getAllPostSlugsRecursive(dir = postsDirectory, basePath = '') {
  const slugs = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      // Recursively get slugs from subdirectories
      const subDirSlugs = getAllPostSlugsRecursive(
        path.join(dir, entry.name),
        basePath ? `${basePath}/${entry.name}` : entry.name
      );
      slugs.push(...subDirSlugs);
    } else if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))) {
      // Skip _index files as they're usually directory descriptors
      if (!entry.name.startsWith('_index')) {
        const slug = basePath 
          ? `${basePath}/${entry.name.replace(/\.mdx?$/, '')}`
          : entry.name.replace(/\.mdx?$/, '');
        slugs.push(slug);
      }
    }
  }

  return slugs;
}

// Simple frontmatter processing
function processFrontmatter(data) {
  const processed = { ...data };

  // Normalize title
  if (data.Title && !data.title) {
    processed.title = data.Title;
  }

  // Normalize tags
  if (typeof data.tags === 'string') {
    processed.tags = data.tags.split(',').map(tag => tag.trim());
  } else if (typeof data.Tags === 'string') {
    processed.tags = data.Tags.split(',').map(tag => tag.trim());
  } else if (Array.isArray(data.Tags) && !data.tags) {
    processed.tags = data.Tags;
  }

  // Normalize series
  if (typeof data.series === 'string') {
    processed.series = [data.series];
  }

  return processed;
}

// Simple shortcode processing (basic functionality)
function processShortcodes(content, frontmatter) {
  let processedContent = content;

  // Process {{< param key >}} shortcodes
  processedContent = processedContent.replace(
    /\{\{<\s*param\s+(\w+)\s*>\}\}/g,
    (match, paramKey) => {
      const value = frontmatter[paramKey];
      return value ? String(value) : match;
    }
  );

  // Process {{< highlight language >}} shortcodes
  processedContent = processedContent.replace(
    /\{\{<\s*highlight\s+(\w+)\s*>\}\}([\s\S]*?)\{\{<\s*\/highlight\s*>\}\}/g,
    (match, language, code) => {
      const cleanCode = code.trim();
      return `\`\`\`${language}\n${cleanCode}\n\`\`\``;
    }
  );

  return processedContent;
}

async function getPostBySlug(slug) {
  try {
    // Try .mdx first, then .md
    let fullPath = path.join(postsDirectory, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) {
      fullPath = path.join(postsDirectory, `${slug}.md`);
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Process frontmatter
    const processedData = processFrontmatter(data);

    // Process shortcodes (basic)
    const processedContent = processShortcodes(content, processedData);

    return {
      slug,
      content: processedContent, // Keep as markdown for now
      data: processedData,
    };
  } catch (error) {
    console.error(`Error processing ${slug}:`, error);
    return null;
  }
}

async function generateSearchIndex() {
  console.log('Generating search index...');
  
  try {
    const slugs = getAllPostSlugsRecursive();
    console.log(`Found ${slugs.length} posts`);

    const posts = [];
    for (const slug of slugs) {
      const post = await getPostBySlug(slug);
      if (post) {
        posts.push(post);
      }
    }

    // Sort by date
    posts.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

    // Generate search index
    const searchIndex = posts.map((post) => {
      // Extract category from slug
      const pathParts = post.slug.split('/');
      const category = pathParts.length > 1 ? pathParts[0] : 'General';
      
      // Create excerpt from content (first 200 characters, clean markdown)
      const excerpt = post.content
        .replace(/^\s*---[\s\S]*?---\s*/m, '') // Remove frontmatter
        .replace(/#+\s+/g, '') // Remove markdown headers
        .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
        .replace(/\*(.*?)\*/g, '$1') // Remove italic
        .replace(/`([^`]*)`/g, '$1') // Remove inline code
        .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // Remove links, keep text
        .replace(/\n/g, ' ') // Replace newlines with spaces
        .substring(0, 200)
        .trim();
      
      // Get series - use first series if multiple exist
      const series = post.data.series && post.data.series.length > 0 
        ? post.data.series[0] 
        : undefined;
      
      return {
        id: post.slug,
        title: post.data.title,
        content: post.content.replace(/#+\s+/g, ''), // Strip markdown headers for searching
        excerpt,
        tags: post.data.tags || [],
        category,
        series,
        slug: post.slug,
        date: post.data.date,
      };
    });

    // Ensure public directory exists
    const publicDir = path.dirname(outputFile);
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Write search index to public directory
    fs.writeFileSync(outputFile, JSON.stringify(searchIndex, null, 2));
    console.log(`Search index generated with ${searchIndex.length} entries`);
    console.log(`Written to: ${outputFile}`);
    
  } catch (error) {
    console.error('Error generating search index:', error);
    process.exit(1);
  }
}

// Run the script
generateSearchIndex();