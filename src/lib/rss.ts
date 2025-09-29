import { getAllPosts } from "./posts";
import { siteConfig } from "./config";
import { Post } from "@/types/blog";

export async function generateRSSFeed(): Promise<string> {
  const posts = await getAllPosts();
  const siteUrl = "https://hacker1db.dev";
  const rssUrl = `${siteUrl}/rss.xml`;

  const rssHeader = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(siteConfig.title)}</title>
    <description>${escapeXml(siteConfig.description)}</description>
    <link>${siteUrl}</link>
    <atom:link href="${rssUrl}" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>${siteConfig.author}@hacker1db.dev (${siteConfig.author})</managingEditor>
    <webMaster>${siteConfig.author}@hacker1db.dev (${siteConfig.author})</webMaster>
    <generator>Next.js RSS Generator</generator>
    <image>
      <url>${siteUrl}/images/android-chrome-192x192.png</url>
      <title>${escapeXml(siteConfig.title)}</title>
      <link>${siteUrl}</link>
      <width>192</width>
      <height>192</height>
    </image>`;

  const rssItems = posts
    .slice(0, 50) // Limit to latest 50 posts
    .map((post) => generateRSSItem(post, siteUrl))
    .join("\n");

  const rssFooter = `
  </channel>
</rss>`;

  return rssHeader + "\n" + rssItems + rssFooter;
}

function generateRSSItem(post: Post, siteUrl: string): string {
  const postUrl = `${siteUrl}/posts/${post.slug}`;
  const pubDate = new Date(post.data.date).toUTCString();

  // Create a clean description from excerpt or content
  const description =
    post.excerpt ||
    post.content
      .replace(/<[^>]*>/g, "") // Strip HTML tags
      .replace(/\s+/g, " ") // Normalize whitespace
      .trim()
      .substring(0, 200) + "...";

  // Clean the content for RSS (remove any problematic elements)
  const cleanContent = post.content
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "") // Remove scripts
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "") // Remove styles
    .replace(/{{<[^>]*>}}/g, ""); // Remove Hugo shortcodes if any remain

  const categories = post.data.tags
    ? post.data.tags
        .map((tag) => `    <category>${escapeXml(tag)}</category>`)
        .join("\n")
    : "";

  return `    <item>
      <title>${escapeXml(post.data.title)}</title>
      <description>${escapeXml(description)}</description>
      <content:encoded><![CDATA[${cleanContent}]]></content:encoded>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>${post.data.author || siteConfig.author}</author>
${categories}
    </item>`;
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
