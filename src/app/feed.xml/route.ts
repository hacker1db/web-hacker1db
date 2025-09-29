import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/posts";
import { generateRSSFeed } from "@/lib/rss";

// Required for static export
export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  try {
    // Get all posts sorted by date (most recent first)
    const posts = await getAllPosts();

    // Generate RSS feed
    const rssXml = generateRSSFeed(posts);

    // Return RSS XML with proper headers
    return new NextResponse(rssXml, {
      status: 200,
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error generating RSS feed:", error);
    return new NextResponse("Error generating RSS feed", { status: 500 });
  }
}
