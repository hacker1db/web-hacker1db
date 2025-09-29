import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/posts";
import { generateAtomFeed } from "@/lib/rss";

// Required for static export
export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  try {
    // Get all posts sorted by date (most recent first)
    const posts = await getAllPosts();
    
    // Generate Atom feed
    const atomXml = generateAtomFeed(posts);
    
    // Return Atom XML with proper headers
    return new NextResponse(atomXml, {
      status: 200,
      headers: {
        "Content-Type": "application/atom+xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error generating Atom feed:", error);
    return new NextResponse("Error generating Atom feed", { status: 500 });
  }
}