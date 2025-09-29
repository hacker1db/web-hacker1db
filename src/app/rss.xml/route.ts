import { generateRSSFeed } from "@/lib/rss";
import { NextResponse } from "next/server";

// Configure for static export
export const dynamic = "force-static";

export async function GET() {
  try {
    const rssContent = await generateRSSFeed();

    return new NextResponse(rssContent, {
      status: 200,
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600", // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error("Error generating RSS feed:", error);
    return new NextResponse("Error generating RSS feed", { status: 500 });
  }
}
