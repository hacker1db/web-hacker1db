import { siteConfig } from "@/lib/config";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: "#1a1d21",
        borderTop: "1px solid #374151",
        padding: "2rem 0",
      }}
    >
      {/* Newsletter CTA */}
      <div
        style={{
          maxWidth: "1024px",
          margin: "0 auto",
          padding: "0 1rem 2rem 1rem",
          textAlign: "center",
          borderBottom: "1px solid #374151",
          marginBottom: "2rem",
        }}
      >
        <h3
          style={{
            color: "#6FC1FF",
            fontSize: "1.125rem",
            fontWeight: "600",
            marginBottom: "0.5rem",
          }}
        >
          📧 Stay in the Loop
        </h3>
        <p
          style={{
            color: "#9ca3af",
            fontSize: "0.875rem",
            marginBottom: "1rem",
            maxWidth: "32rem",
            margin: "0 auto 1rem auto",
          }}
        >
          Join hundreds of security professionals getting weekly insights on
          cybersecurity, DevOps, and secure coding.
        </p>
        <Link
          href="/newsletter"
          style={{
            display: "inline-block",
            backgroundColor: "#6FC1FF",
            color: "#000000",
            textDecoration: "none",
            padding: "0.5rem 1.5rem",
            borderRadius: "6px",
            fontSize: "0.875rem",
            fontWeight: "500",
            transition: "all 0.2s ease",
          }}
          className="hover:bg-[#5FA8E6]"
        >
          Subscribe to Newsletter →
        </Link>
      </div>

      <div
        style={{
          maxWidth: "1024px",
          margin: "0 auto",
          padding: "0 1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div
          style={{
            color: "#9ca3af",
            fontSize: "0.875rem",
          }}
        >
          {siteConfig.footer.left}
        </div>
        <div
          style={{
            color: "#9ca3af",
            fontSize: "0.875rem",
            textAlign: "right",
          }}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: siteConfig.footer.right,
            }}
          />
          <div style={{ marginTop: "0.25rem" }}>
            © {currentYear} {siteConfig.author}
          </div>
        </div>
      </div>
    </footer>
  );
}
