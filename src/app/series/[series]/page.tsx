import { getPostsBySeries, getAllSeries, getSeriesMeta } from "@/lib/posts";
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

  // Get series metadata
  const seriesMeta = await getSeriesMeta(actualSeriesName);

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
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            alignItems: "center",
            color: "#9ca3af",
            fontSize: "1rem",
            marginBottom: "2rem",
          }}
        >
          <span>
            {posts.length} {posts.length === 1 ? "post" : "posts"}
          </span>
          <span>•</span>
          <span>~{seriesMeta.estimatedReadingTime} min read time</span>
          <span>•</span>
          <span>Sorted by date</span>
        </div>

        {/* Series Description */}
        <div
          style={{
            backgroundColor: "#1f2937",
            border: "1px solid #374151",
            borderRadius: "0.75rem",
            padding: "1.5rem",
            marginBottom: "3rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1rem",
            }}
          >
            <span style={{ fontSize: "1.5rem" }}>📖</span>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                color: "#ffffff",
                margin: 0,
              }}
            >
              About This Series
            </h2>
          </div>
          <p
            style={{
              color: "#9ca3af",
              lineHeight: "1.6",
              margin: 0,
            }}
          >
            {seriesMeta.description}
          </p>
        </div>

        {/* Series Overview */}
        <div
          style={{
            backgroundColor: "#1f2937",
            border: "1px solid #374151",
            borderRadius: "0.75rem",
            padding: "1.5rem",
            marginBottom: "3rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1.5rem",
            }}
          >
            <span style={{ fontSize: "1.5rem" }}>📋</span>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                color: "#ffffff",
                margin: 0,
              }}
            >
              Series Overview
            </h2>
          </div>

          {/* Series Table of Contents */}
          <div
            style={{
              display: "grid",
              gap: "0.75rem",
            }}
          >
            {posts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                style={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1rem",
                  borderRadius: "0.5rem",
                  backgroundColor: "rgba(156, 163, 175, 0.05)",
                  border: "1px solid rgba(156, 163, 175, 0.1)",
                  color: "#9ca3af",
                  transition: "all 0.2s ease",
                }}
                className="hover:bg-gray-700"
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: "#6FC1FF",
                    color: "#ffffff",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    flexShrink: 0,
                  }}
                >
                  {index + 1}
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div
                    style={{
                      fontSize: "1rem",
                      fontWeight: "600",
                      color: "#ffffff",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {post.data.title}
                  </div>
                  {post.data.subtitle && (
                    <div
                      style={{
                        fontSize: "0.875rem",
                        color: "#9ca3af",
                      }}
                    >
                      {post.data.subtitle}
                    </div>
                  )}
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "#6b7280",
                      marginTop: "0.25rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <span>{new Date(post.data.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>~5 min read</span>
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "1.25rem",
                    color: "#6FC1FF",
                  }}
                >
                  →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "2rem", textAlign: "center" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: "#ffffff",
            marginBottom: "1rem",
          }}
        >
          All Posts in This Series
        </h2>
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
