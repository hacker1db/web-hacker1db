import { getPostsByTag, getAllTags } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import Link from "next/link";
import { notFound } from "next/navigation";

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tagInfo) => ({
    tag: encodeURIComponent(tagInfo.tag.toLowerCase()),
  }));
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = await getPostsByTag(decodedTag);

  if (posts.length === 0) {
    notFound();
  }

  // Find the actual tag name (with proper casing) from the first post
  const actualTagName =
    posts[0]?.data.tags?.find(
      (tag) => tag.toLowerCase() === decodedTag.toLowerCase(),
    ) || decodedTag;

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ marginBottom: "2rem" }}>
        <Link
          href="/tags"
          style={{
            color: "#9ca3af",
            textDecoration: "none",
            fontSize: "0.875rem",
            display: "inline-flex",
            alignItems: "center",
            marginBottom: "1rem",
            transition: "color 0.2s ease",
          }}
          className="hover:text-white"
        >
          ← Back to all tags
        </Link>

        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            marginBottom: "1rem",
            color: "#ffffff",
          }}
        >
          Posts tagged &ldquo;{actualTagName}&rdquo;
        </h1>

        <div
          style={{
            color: "#9ca3af",
            fontSize: "1rem",
            marginBottom: "3rem",
          }}
        >
          {posts.length} {posts.length === 1 ? "post" : "posts"} • Sorted by
          latest first
        </div>
      </div>

      {/* Grid layout for larger screens, stack on mobile */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "2rem",
          padding: "0 1rem",
        }}
      >
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
