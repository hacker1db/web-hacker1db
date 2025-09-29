import { getAllSeries } from "@/lib/posts";
import Link from "next/link";

export default async function SeriesPage() {
  const series = await getAllSeries();

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: "700",
          marginBottom: "2rem",
          textAlign: "center",
          color: "#ffffff",
        }}
      >
        Post Series
      </h1>

      <div
        style={{
          textAlign: "center",
          color: "#9ca3af",
          fontSize: "1rem",
          marginBottom: "3rem",
        }}
      >
        Browse posts organized by series • {series.length}{" "}
        {series.length === 1 ? "series" : "series"} available
      </div>

      {series.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            color: "#9ca3af",
            padding: "3rem 0",
            fontSize: "1.125rem",
          }}
        >
          <p>No series found yet. Check back soon!</p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
            marginTop: "2rem",
          }}
        >
          {series.map(({ series: seriesName, count }) => (
            <Link
              key={seriesName}
              href={`/series/${encodeURIComponent(seriesName.toLowerCase())}`}
              style={{
                textDecoration: "none",
                backgroundColor: "#1f2937",
                border: "1px solid #374151",
                borderRadius: "0.75rem",
                padding: "2rem",
                transition: "all 0.2s ease",
                display: "block",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "1rem",
                }}
              >
                <h2
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "#ffffff",
                    margin: 0,
                  }}
                >
                  📚 {seriesName}
                </h2>
                <span
                  style={{
                    backgroundColor: "#6FC1FF",
                    color: "#000000",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "9999px",
                  }}
                >
                  {count} {count === 1 ? "post" : "posts"}
                </span>
              </div>

              <p
                style={{
                  color: "#9ca3af",
                  fontSize: "0.875rem",
                  margin: 0,
                  lineHeight: "1.5",
                }}
              >
                Explore all posts in the &ldquo;{seriesName}&rdquo; series
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
