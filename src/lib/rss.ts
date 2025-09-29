import { Post } from "@/types/blog";
import { siteConfig } from "./config";

export interface RSSItem {
  title: string;
  description: string;
  content: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  categories: string[];
}

export function generateRSSFeed(posts: Post[]): string {
  const siteUrl = "https://hacker1db.dev";
  const feedUrl = `${siteUrl}/feed.xml`;

  // Convert posts to RSS items
  const rssItems: RSSItem[] = posts.map((post) => ({
    title: post.data.title,
    description: post.excerpt || post.data.subtitle || "",
    content: post.content,
    pubDate: new Date(post.data.date).toUTCString(),
    link: `${siteUrl}/posts/${post.slug}`,
    guid: `${siteUrl}/posts/${post.slug}`,
    author: post.data.author || siteConfig.author,
    categories: [
      ...(post.data.tags || []),
      ...(post.data.series || []),
      // Extract category from slug (first part before /)
      post.slug.includes("/") ? post.slug.split("/")[0] : "",
    ].filter(Boolean),
  }));

  // Generate RSS XML
  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.title)}</title>
    <description>${escapeXml(siteConfig.description)}</description>
    <link>${siteUrl}</link>
    <language>en</language>
    <managingEditor>${siteConfig.author}@hacker1db.dev (${siteConfig.author})</managingEditor>
    <webMaster>${siteConfig.author}@hacker1db.dev (${siteConfig.author})</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>
    <generator>Next.js RSS Generator</generator>
    <image>
      <url>${siteUrl}/images/favicon-192x192.png</url>
      <title>${escapeXml(siteConfig.title)}</title>
      <link>${siteUrl}</link>
    </image>
    ${rssItems
      .map(
        (item) => `
    <item>
      <title>${escapeXml(item.title)}</title>
      <description>${escapeXml(item.description)}</description>
      <content:encoded><![CDATA[${item.content}]]></content:encoded>
      <link>${item.link}</link>
      <guid isPermaLink="true">${item.guid}</guid>
      <pubDate>${item.pubDate}</pubDate>
      <author>${escapeXml(item.author)}</author>
      ${item.categories
        .map((category) => `<category>${escapeXml(category)}</category>`)
        .join("")}
    </item>`,
      )
      .join("")}
  </channel>
</rss>`;

  return rssXml.trim();
}

export function generateAtomFeed(posts: Post[]): string {
  const siteUrl = "https://hacker1db.dev";
  const feedUrl = `${siteUrl}/atom.xml`;

  // Convert posts to Atom entries
  const atomEntries = posts.map((post) => {
    const categories = [
      ...(post.data.tags || []),
      ...(post.data.series || []),
      post.slug.includes("/") ? post.slug.split("/")[0] : "",
    ].filter(Boolean);

    return `
    <entry>
      <title type="html">${escapeXml(post.data.title)}</title>
      <link href="${siteUrl}/posts/${post.slug}" rel="alternate" type="text/html"/>
      <id>${siteUrl}/posts/${post.slug}</id>
      <updated>${new Date(post.data.date).toISOString()}</updated>
      <published>${new Date(post.data.date).toISOString()}</published>
      <author>
        <name>${escapeXml(post.data.author || siteConfig.author)}</name>
      </author>
      <summary type="html">${escapeXml(post.excerpt || post.data.subtitle || "")}</summary>
      <content type="html"><![CDATA[${post.content}]]></content>
      ${categories
        .map((category) => `<category term="${escapeXml(category)}"/>`)
        .join("")}
    </entry>`;
  });

  const atomXml = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escapeXml(siteConfig.title)}</title>
  <description>${escapeXml(siteConfig.description)}</description>
  <link href="${siteUrl}" rel="alternate" type="text/html"/>
  <link href="${feedUrl}" rel="self" type="application/atom+xml"/>
  <id>${siteUrl}</id>
  <updated>${new Date().toISOString()}</updated>
  <generator uri="https://nextjs.org" version="15.5.4">Next.js</generator>
  <author>
    <name>${escapeXml(siteConfig.author)}</name>
  </author>
  ${atomEntries.join("")}
</feed>`;

  return atomXml.trim();
}

function escapeXml(unsafe: string): string {
  if (typeof unsafe !== "string") return "";
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
