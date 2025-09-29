import { getAllTags } from "@/lib/posts";
import Link from "next/link";

export default async function TagsPage() {
  const tags = await getAllTags();

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: "700",
          marginBottom: "2rem",
          textAlign: "center",
          color: "#ffffff",
        }}
      >
        All Tags
      </h1>

      <div
        style={{
          textAlign: "center",
          marginBottom: "3rem",
          color: "#9ca3af",
          fontSize: "1rem",
        }}
      >
        {tags.length} {tags.length === 1 ? "tag" : "tags"} • Browse posts by
        topic
      </div>

      {tags.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            color: "#9ca3af",
            padding: "3rem 0",
            fontSize: "1.125rem",
          }}
        >
          <p>No tags found.</p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
            padding: "0 1rem",
          }}
        >
          {tags.map(({ tag, count }) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
              style={{
                display: "block",
                padding: "1.5rem",
                backgroundColor: "rgba(31, 41, 55, 0.5)",
                border: "1px solid rgba(75, 85, 99, 0.3)",
                borderRadius: "12px",
                textDecoration: "none",
                transition: "all 0.2s ease",
                cursor: "pointer",
              }}
              className="hover:bg-gray-600/70 hover:border-gray-500/50 hover:-translate-y-0.5"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: "#ffffff",
                    margin: 0,
                  }}
                >
                  {tag}
                </h3>
                <span
                  style={{
                    backgroundColor: "rgba(99, 102, 241, 0.2)",
                    color: "#a5b4fc",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "9999px",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                  }}
                >
                  {count} {count === 1 ? "post" : "posts"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
