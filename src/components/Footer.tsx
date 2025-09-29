import { siteConfig } from "@/lib/config";

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
