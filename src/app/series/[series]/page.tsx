import { getPostsBySeries, getAllSeries } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import Link from "next/link";
import { notFound } from "next/navigation";

interface SeriesPageProps {
  params: Promise<{
    series: string;
  }>;
}

export async function generateStaticParams() {
  const series = await getAllSeries();
  return series.map((seriesInfo) => ({
    series: encodeURIComponent(seriesInfo.series.toLowerCase()),
  }));
}

export default async function SeriesPage({ params }: SeriesPageProps) {
  const { series } = await params;
  const decodedSeries = decodeURIComponent(series);
  const posts = await getPostsBySeries(decodedSeries);

  if (posts.length === 0) {
    notFound();
  }

  // Find the actual series name (with proper casing) from the first post
  const actualSeriesName =
    posts[0]?.data.series?.find(
      (series) => series.toLowerCase() === decodedSeries.toLowerCase(),
    ) || decodedSeries;

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ marginBottom: "2rem" }}>
        <Link
          href="/series"
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
          ← Back to all series
        </Link>

        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            marginBottom: "1rem",
            color: "#ffffff",
          }}
        >
          📚 {actualSeriesName} Series
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
