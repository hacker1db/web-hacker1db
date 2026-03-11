import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post } from "@/types/blog";
import { processShortcodes, processFrontmatter } from "./shortcodes";

const postsDirectory = path.join(process.cwd(), "content/posts");

export function getAllPostSlugs(): string[] {
  const allFiles: string[] = [];

  function getFilesRecursively(dir: string): void {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        getFilesRecursively(fullPath);
      } else if (
        (file.endsWith(".md") || file.endsWith(".mdx")) &&
        !file.startsWith("_index.")
      ) {
        // Get relative path from posts directory and remove .md/.mdx extension
        const relativePath = path.relative(postsDirectory, fullPath);
        const slug = relativePath.replace(/\.mdx?$/, "");
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
    // Try .mdx first, then .md
    let fullPath = path.join(postsDirectory, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) {
      fullPath = path.join(postsDirectory, `${slug}.md`);
    }
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Process frontmatter to ensure proper typing and auto-detect card subtitle hiding
    const processedData = processFrontmatter(data, content);

    // Process Hugo shortcodes in the content
    // The MDX will be compiled at render time by next-mdx-remote
    const processedContent = processShortcodes(content, processedData);

    // Create a better excerpt
    const plainText = content
      .replace(/```[\s\S]*?```/g, "") // Remove code blocks
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Convert links to text
      .replace(/[#*_`]/g, "") // Remove markdown formatting
      .replace(/\n+/g, " ") // Replace newlines with spaces
      .trim();
    const excerpt =
      plainText.length > 200
        ? plainText.substring(0, 200).trim() + "..."
        : plainText;

    return {
      slug,
      content: processedContent, // Return raw MDX content, not HTML
      data: processedData,
      excerpt,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = getAllPostSlugs();
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)));

  // Filter out null posts and sort by date
  return posts
    .filter((post): post is Post => post !== null)
    .sort(
      (a, b) =>
        new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
    );
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) =>
    post.slug.toLowerCase().includes(category.toLowerCase()),
  );
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) =>
    post.data.tags?.some((postTag) =>
      postTag.toLowerCase().includes(tag.toLowerCase()),
    ),
  );
}

export async function getAllTags(): Promise<{ tag: string; count: number }[]> {
  const allPosts = await getAllPosts();
  const tagMap = new Map<string, number>();

  allPosts.forEach((post) => {
    if (post.data.tags) {
      post.data.tags.forEach((tag) => {
        const normalizedTag = tag.trim();
        if (normalizedTag) {
          tagMap.set(normalizedTag, (tagMap.get(normalizedTag) || 0) + 1);
        }
      });
    }
  });

  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count); // Sort by count descending, then alphabetically
}

export async function getPostsBySeries(series: string): Promise<Post[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) =>
    post.data.series?.some((postSeries) =>
      postSeries.toLowerCase().includes(series.toLowerCase()),
    ),
  );
}

export async function getAllSeries(): Promise<
  { series: string; count: number }[]
> {
  const allPosts = await getAllPosts();
  const seriesMap = new Map<string, number>();

  allPosts.forEach((post) => {
    if (post.data.series) {
      post.data.series.forEach((series) => {
        const normalizedSeries = series.trim();
        if (normalizedSeries) {
          seriesMap.set(
            normalizedSeries,
            (seriesMap.get(normalizedSeries) || 0) + 1,
          );
        }
      });
    }
  });

  return Array.from(seriesMap.entries())
    .map(([series, count]) => ({ series, count }))
    .sort((a, b) => b.count - a.count);
}
