import Link from "next/link";
import { Post } from "@/types/blog";

interface SeriesNavigationProps {
  seriesName: string;
  currentIndex: number;
  totalPosts: number;
  previousPost: Post | null;
  nextPost: Post | null;
  allSeriesPosts: Post[];
  currentSlug: string;
}

export default function SeriesNavigation({
  seriesName,
  currentIndex,
  totalPosts,
  previousPost,
  nextPost,
  allSeriesPosts,
  currentSlug,
}: SeriesNavigationProps) {
  if (totalPosts === 0) return null;

  const progressPercentage = ((currentIndex + 1) / totalPosts) * 100;

  return (
    <div
      style={{
        backgroundColor: "#1f2937",
        border: "1px solid #374151",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        margin: "2rem 0",
      }}
    >
      {/* Series Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1rem",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <h3
          style={{
            fontSize: "1.25rem",
            fontWeight: "700",
            color: "#ffffff",
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          📚 {seriesName} Series
        </h3>
        <span
          style={{
            backgroundColor: "rgba(111, 193, 255, 0.2)",
            color: "#6FC1FF",
            fontSize: "0.875rem",
            fontWeight: "600",
            padding: "0.25rem 0.75rem",
            borderRadius: "9999px",
            border: "1px solid rgba(111, 193, 255, 0.3)",
          }}
        >
          Part {currentIndex + 1} of {totalPosts}
        </span>
      </div>

      {/* Progress Bar */}
      <div
        style={{
          marginBottom: "1.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "0.5rem",
          }}
        >
          <span
            style={{
              fontSize: "0.875rem",
              color: "#9ca3af",
            }}
          >
            Progress
          </span>
          <span
            style={{
              fontSize: "0.875rem",
              color: "#6FC1FF",
              fontWeight: "600",
            }}
          >
            {Math.round(progressPercentage)}% Complete
          </span>
        </div>
        <div
          style={{
            width: "100%",
            height: "8px",
            backgroundColor: "#374151",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progressPercentage}%`,
              height: "100%",
              background: "linear-gradient(90deg, #6FC1FF 0%, #4F46E5 100%)",
              borderRadius: "4px",
              transition: "width 0.3s ease",
            }}
          />
        </div>
      </div>

      {/* Previous/Next Navigation */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          marginBottom: "1.5rem",
          flexWrap: "wrap",
        }}
      >
        {previousPost ? (
          <Link
            href={`/posts/${previousPost.slug}`}
            style={{
              textDecoration: "none",
              color: "#9ca3af",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1rem",
              backgroundColor: "rgba(156, 163, 175, 0.1)",
              border: "1px solid rgba(156, 163, 175, 0.2)",
              borderRadius: "0.5rem",
              transition: "all 0.2s ease",
              flex: "1",
              minWidth: "0",
            }}
            className="hover:bg-gray-600 hover:text-white"
          >
            <span>←</span>
            <div style={{ minWidth: "0" }}>
              <div
                style={{
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  fontWeight: "600",
                  marginBottom: "0.25rem",
                }}
              >
                Previous
              </div>
              <div
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {previousPost.data.title}
              </div>
            </div>
          </Link>
        ) : (
          <div style={{ flex: "1" }} />
        )}

        {nextPost ? (
          <Link
            href={`/posts/${nextPost.slug}`}
            style={{
              textDecoration: "none",
              color: "#9ca3af",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1rem",
              backgroundColor: "rgba(156, 163, 175, 0.1)",
              border: "1px solid rgba(156, 163, 175, 0.2)",
              borderRadius: "0.5rem",
              transition: "all 0.2s ease",
              flex: "1",
              minWidth: "0",
              textAlign: "right",
            }}
            className="hover:bg-gray-600 hover:text-white"
          >
            <div style={{ minWidth: "0", flex: "1" }}>
              <div
                style={{
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  fontWeight: "600",
                  marginBottom: "0.25rem",
                }}
              >
                Next
              </div>
              <div
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {nextPost.data.title}
              </div>
            </div>
            <span>→</span>
          </Link>
        ) : (
          <div style={{ flex: "1" }} />
        )}
      </div>

      {/* Series Table of Contents */}
      <div>
        <h4
          style={{
            fontSize: "1rem",
            fontWeight: "600",
            color: "#ffffff",
            marginBottom: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          📋 All Posts in Series ({totalPosts})
        </h4>
        <div
          style={{
            display: "grid",
            gap: "0.5rem",
          }}
        >
          {allSeriesPosts.map((post, index) => {
            const isCompleted = index < currentIndex;
            const isCurrent = post.slug === currentSlug;

            return (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                style={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  backgroundColor: isCurrent
                    ? "rgba(111, 193, 255, 0.1)"
                    : "transparent",
                  border: isCurrent
                    ? "1px solid rgba(111, 193, 255, 0.3)"
                    : "1px solid transparent",
                  color: isCurrent ? "#6FC1FF" : "#9ca3af",
                  transition: "all 0.2s ease",
                }}
                className="hover:bg-gray-700"
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    backgroundColor: isCompleted
                      ? "#10B981"
                      : isCurrent
                        ? "#6FC1FF"
                        : "#374151",
                    color: isCompleted || isCurrent ? "#ffffff" : "#9ca3af",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    flexShrink: 0,
                  }}
                >
                  {isCompleted ? "✓" : isCurrent ? "👁" : index + 1}
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: isCurrent ? "600" : "500",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {index + 1}. {post.data.title}
                  </div>
                  {post.data.subtitle && (
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "#6b7280",
                        marginTop: "0.25rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {post.data.subtitle}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Series Overview Link */}
      <div
        style={{
          marginTop: "1.5rem",
          paddingTop: "1rem",
          borderTop: "1px solid #374151",
          textAlign: "center",
        }}
      >
        <Link
          href={`/series/${encodeURIComponent(seriesName.toLowerCase())}`}
          style={{
            textDecoration: "none",
            color: "#6FC1FF",
            fontSize: "0.875rem",
            fontWeight: "500",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.5rem 1rem",
            backgroundColor: "rgba(111, 193, 255, 0.1)",
            border: "1px solid rgba(111, 193, 255, 0.3)",
            borderRadius: "0.5rem",
            transition: "all 0.2s ease",
          }}
          className="hover:bg-blue-600"
        >
          🔍 View Series Overview
        </Link>
      </div>
    </div>
  );
}
