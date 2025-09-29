"use client";

import { useState, FormEvent } from "react";

interface NewsletterSignupProps {
  title?: string;
  description?: string;
  className?: string;
  size?: "small" | "medium" | "large";
}

export default function NewsletterSignup({
  title = "📧 Stay Updated with Security Insights",
  description = "Get weekly tips on cybersecurity, DevOps automation, and secure coding practices directly to your inbox.",
  className = "",
  size = "medium",
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatus("error");
      setMessage("Please enter your email address.");
      return;
    }

    if (!validateEmail(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    // Simulate async operation without making the handler async
    Promise.resolve()
      .then(() => new Promise((resolve) => setTimeout(resolve, 1000)))
      .then(() => {
        setStatus("success");
        setMessage(
          "Thanks for subscribing! Check your email for confirmation.",
        );
        setEmail("");
      })
      .catch(() => {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      });
  };

  const sizeStyles = {
    small: {
      padding: "1rem",
      fontSize: "0.875rem",
      titleSize: "1rem",
    },
    medium: {
      padding: "1.5rem",
      fontSize: "1rem",
      titleSize: "1.25rem",
    },
    large: {
      padding: "2rem",
      fontSize: "1.125rem",
      titleSize: "1.5rem",
    },
  };

  const currentSize = sizeStyles[size];

  return (
    <div
      className={className}
      style={{
        border: "2px solid #6FC1FF",
        borderRadius: "12px",
        padding: currentSize.padding,
        margin: "2rem 0",
        background:
          "linear-gradient(135deg, rgba(111, 193, 255, 0.1) 0%, rgba(111, 193, 255, 0.05) 100%)",
        textAlign: "center" as const,
      }}
    >
      <h3
        style={{
          marginTop: "0",
          color: "#6FC1FF",
          fontSize: currentSize.titleSize,
          fontWeight: "600",
          marginBottom: "0.5rem",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          marginBottom: "1.5rem",
          color: "#d1d5db",
          fontSize: currentSize.fontSize,
        }}
      >
        {description}
      </p>

      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "400px", margin: "0 auto" }}
      >
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            disabled={status === "loading"}
            style={{
              flex: "1",
              padding: "0.75rem 1rem",
              borderRadius: "6px",
              border: "1px solid #374151",
              backgroundColor: "#1f2937",
              color: "#ffffff",
              fontSize: currentSize.fontSize,
              outline: "none",
              transition: "all 0.2s ease",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#6FC1FF";
              e.target.style.boxShadow = "0 0 0 2px rgba(111, 193, 255, 0.2)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#374151";
              e.target.style.boxShadow = "none";
            }}
          />

          <button
            type="submit"
            disabled={status === "loading"}
            style={{
              backgroundColor: status === "loading" ? "#6FC1FF80" : "#6FC1FF",
              color: "#000000",
              border: "none",
              padding: "0.75rem 1.5rem",
              borderRadius: "6px",
              fontSize: currentSize.fontSize,
              fontWeight: "500",
              cursor: status === "loading" ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
              whiteSpace: "nowrap" as const,
            }}
            onMouseOver={(e) => {
              if (status !== "loading") {
                e.currentTarget.style.backgroundColor = "#5FA8E6";
              }
            }}
            onMouseOut={(e) => {
              if (status !== "loading") {
                e.currentTarget.style.backgroundColor = "#6FC1FF";
              }
            }}
          >
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </button>
        </div>

        {message && (
          <div
            style={{
              padding: "0.5rem",
              borderRadius: "4px",
              fontSize: "0.875rem",
              backgroundColor:
                status === "success"
                  ? "rgba(34, 197, 94, 0.1)"
                  : "rgba(239, 68, 68, 0.1)",
              color: status === "success" ? "#22c55e" : "#ef4444",
              border: `1px solid ${status === "success" ? "rgba(34, 197, 94, 0.3)" : "rgba(239, 68, 68, 0.3)"}`,
              marginBottom: "1rem",
            }}
          >
            {message}
          </div>
        )}
      </form>

      <p
        style={{
          marginTop: "1rem",
          marginBottom: "0",
          fontSize: "0.75rem",
          color: "#9ca3af",
        }}
      >
        No spam. Unsubscribe anytime. See our{" "}
        <a
          href="/privacy"
          style={{
            color: "#6FC1FF",
            textDecoration: "none",
          }}
        >
          privacy policy
        </a>
        .
      </p>
    </div>
  );
}
