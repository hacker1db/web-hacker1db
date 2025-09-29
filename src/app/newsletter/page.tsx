import type { Metadata } from "next";
import NewsletterSignup from "@/components/NewsletterSignup";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Newsletter - Hacker1db.dev",
  description:
    "Subscribe to get weekly cybersecurity insights, DevOps tips, and secure coding practices delivered to your inbox.",
};

export default function NewsletterPage() {
  return (
    <div style={{ maxWidth: "42rem", margin: "0 auto", padding: "0 1rem" }}>
      {/* Back to Home Link */}
      <div className="mb-6">
        <Link
          href="/"
          className="text-cursor"
          style={{
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.5rem 0",
            transition: "all 0.2s ease",
          }}
        >
          ← Back to Home
        </Link>
      </div>

      {/* Page Header */}
      <header style={{ marginBottom: "3rem", textAlign: "center" }}>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            marginBottom: "1rem",
            background: "linear-gradient(135deg, #6FC1FF 0%, #ffffff 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
        >
          📧 Newsletter Subscription
        </h1>
        <p
          style={{
            fontSize: "1.25rem",
            color: "#d1d5db",
            maxWidth: "32rem",
            margin: "0 auto",
          }}
        >
          Join the community of security professionals and developers who stay
          ahead of the curve.
        </p>
      </header>

      {/* Main Newsletter Signup */}
      <NewsletterSignup
        size="large"
        title="🔒 Weekly Security & DevOps Insights"
        description="Get exclusive content on cybersecurity threats, secure coding practices, DevOps automation, and industry insights delivered every week."
      />

      {/* Content Benefits */}
      <div style={{ marginTop: "3rem", marginBottom: "3rem" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "1.5rem",
            color: "#6FC1FF",
            textAlign: "center",
          }}
        >
          What You'll Get
        </h2>

        <div
          style={{
            display: "grid",
            gap: "1.5rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          }}
        >
          <div
            style={{
              padding: "1.5rem",
              borderRadius: "8px",
              border: "1px solid #374151",
              backgroundColor: "rgba(31, 41, 55, 0.5)",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🛡️</div>
            <h3
              style={{
                color: "#6FC1FF",
                marginBottom: "0.5rem",
                fontSize: "1.125rem",
              }}
            >
              Cybersecurity Updates
            </h3>
            <p style={{ color: "#d1d5db", fontSize: "0.875rem", margin: "0" }}>
              Latest threats, vulnerabilities, and defense strategies to keep
              your systems secure.
            </p>
          </div>

          <div
            style={{
              padding: "1.5rem",
              borderRadius: "8px",
              border: "1px solid #374151",
              backgroundColor: "rgba(31, 41, 55, 0.5)",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>⚙️</div>
            <h3
              style={{
                color: "#6FC1FF",
                marginBottom: "0.5rem",
                fontSize: "1.125rem",
              }}
            >
              DevOps Best Practices
            </h3>
            <p style={{ color: "#d1d5db", fontSize: "0.875rem", margin: "0" }}>
              Automation tools, CI/CD pipelines, and infrastructure as code
              techniques.
            </p>
          </div>

          <div
            style={{
              padding: "1.5rem",
              borderRadius: "8px",
              border: "1px solid #374151",
              backgroundColor: "rgba(31, 41, 55, 0.5)",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>💻</div>
            <h3
              style={{
                color: "#6FC1FF",
                marginBottom: "0.5rem",
                fontSize: "1.125rem",
              }}
            >
              Secure Coding Tips
            </h3>
            <p style={{ color: "#d1d5db", fontSize: "0.875rem", margin: "0" }}>
              Code examples, security patterns, and development best practices.
            </p>
          </div>

          <div
            style={{
              padding: "1.5rem",
              borderRadius: "8px",
              border: "1px solid #374151",
              backgroundColor: "rgba(31, 41, 55, 0.5)",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🎯</div>
            <h3
              style={{
                color: "#6FC1FF",
                marginBottom: "0.5rem",
                fontSize: "1.125rem",
              }}
            >
              Exclusive Content
            </h3>
            <p style={{ color: "#d1d5db", fontSize: "0.875rem", margin: "0" }}>
              Behind-the-scenes insights, tool recommendations, and
              subscriber-only resources.
            </p>
          </div>
        </div>
      </div>

      {/* Social Proof & Frequency */}
      <div
        style={{
          textAlign: "center",
          padding: "2rem",
          backgroundColor: "rgba(31, 41, 55, 0.3)",
          borderRadius: "8px",
          border: "1px solid #374151",
          marginBottom: "3rem",
        }}
      >
        <h3 style={{ color: "#6FC1FF", marginBottom: "1rem" }}>
          📊 Newsletter Details
        </h3>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#ffffff",
              }}
            >
              Weekly
            </div>
            <div style={{ fontSize: "0.875rem", color: "#9ca3af" }}>
              Delivery
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#ffffff",
              }}
            >
              5-10 min
            </div>
            <div style={{ fontSize: "0.875rem", color: "#9ca3af" }}>
              Read Time
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#ffffff",
              }}
            >
              No Spam
            </div>
            <div style={{ fontSize: "0.875rem", color: "#9ca3af" }}>
              Guaranteed
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div style={{ marginBottom: "3rem" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "1.5rem",
            color: "#6FC1FF",
            textAlign: "center",
          }}
        >
          Frequently Asked Questions
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <details
            style={{
              backgroundColor: "rgba(31, 41, 55, 0.3)",
              border: "1px solid #374151",
              borderRadius: "8px",
              padding: "1rem",
            }}
          >
            <summary
              style={{
                cursor: "pointer",
                fontWeight: "500",
                color: "#6FC1FF",
                marginBottom: "0.5rem",
              }}
            >
              How often will I receive emails?
            </summary>
            <p style={{ color: "#d1d5db", fontSize: "0.875rem", margin: "0" }}>
              You'll receive one email per week, typically on Wednesdays. No
              daily spam or excessive emails.
            </p>
          </details>

          <details
            style={{
              backgroundColor: "rgba(31, 41, 55, 0.3)",
              border: "1px solid #374151",
              borderRadius: "8px",
              padding: "1rem",
            }}
          >
            <summary
              style={{
                cursor: "pointer",
                fontWeight: "500",
                color: "#6FC1FF",
                marginBottom: "0.5rem",
              }}
            >
              Can I unsubscribe anytime?
            </summary>
            <p style={{ color: "#d1d5db", fontSize: "0.875rem", margin: "0" }}>
              Absolutely! Every email includes an easy unsubscribe link. No
              questions asked.
            </p>
          </details>

          <details
            style={{
              backgroundColor: "rgba(31, 41, 55, 0.3)",
              border: "1px solid #374151",
              borderRadius: "8px",
              padding: "1rem",
            }}
          >
            <summary
              style={{
                cursor: "pointer",
                fontWeight: "500",
                color: "#6FC1FF",
                marginBottom: "0.5rem",
              }}
            >
              Is my email address safe?
            </summary>
            <p style={{ color: "#d1d5db", fontSize: "0.875rem", margin: "0" }}>
              Your privacy is important. I never share email addresses with
              third parties and follow GDPR compliance standards.
            </p>
          </details>
        </div>
      </div>

      {/* Footer CTA */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <p style={{ color: "#9ca3af", fontSize: "0.875rem" }}>
          Ready to level up your security and development skills?
        </p>
        <Link
          href="/posts"
          style={{
            display: "inline-block",
            marginTop: "1rem",
            color: "#6FC1FF",
            textDecoration: "none",
            fontWeight: "500",
            padding: "0.5rem 1rem",
            border: "1px solid #6FC1FF",
            borderRadius: "6px",
            transition: "all 0.2s ease",
          }}
          className="hover:bg-[rgba(111,193,255,0.1)]"
        >
          Browse All Posts →
        </Link>
      </div>
    </div>
  );
}
