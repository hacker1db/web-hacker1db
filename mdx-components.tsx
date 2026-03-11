import Link from "next/link";
import { ReactNode, AnchorHTMLAttributes, ComponentType } from "react";
import CodeBlock from "@/components/CodeBlock";

// MDX components type - using Record for compatibility with next-mdx-remote
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MDXComponents = Record<string, ComponentType<any>>;

interface LinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href?: string;
  children: ReactNode;
}

interface CodeProps {
  children?: ReactNode;
  className?: string;
}

interface PreProps {
  children?: ReactNode;
}

interface BlockquoteProps {
  children: ReactNode;
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Custom link component that uses Next.js Link for internal links
    a: ({ href, children, ...props }: LinkProps) => {
      if (href?.startsWith("/")) {
        return (
          <Link href={href} {...props}>
            {children}
          </Link>
        );
      }
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      );
    },

    // Custom code block with copy functionality and syntax highlighting
    pre: ({ children, ...props }: PreProps) => {
      // Extract code content and language from children
      if (
        children &&
        typeof children === "object" &&
        "props" in children &&
        children.props &&
        typeof children.props === "object" &&
        "children" in children.props
      ) {
        const codeProps = children.props as {
          children?: string;
          className?: string;
        };
        const code =
          typeof codeProps.children === "string"
            ? codeProps.children.trim()
            : "";
        const className = codeProps.className || "";
        const language = className.replace("language-", "") || "text";

        if (code) {
          return (
            <CodeBlock language={language} className={className}>
              {code}
            </CodeBlock>
          );
        }
      }

      // Fallback for complex pre elements
      return (
        <pre
          style={{
            backgroundColor: "#0d1117",
            padding: "1.5rem",
            borderRadius: "0.75rem",
            overflow: "auto",
            margin: "1.5rem 0",
            border: "1px solid #30363d",
            fontFamily: "JetBrains Mono, Fira Code, Monaco, Menlo, monospace",
            fontSize: "0.875rem",
            lineHeight: "1.6",
          }}
          {...props}
        >
          {children}
        </pre>
      );
    },

    // Custom inline code styling
    code: ({ children, className, ...props }: CodeProps) => {
      // For inline code (not in pre blocks - no language class)
      if (!className?.startsWith("language-")) {
        return (
          <code
            style={{
              backgroundColor: "#374151",
              color: "#6FC1FF",
              padding: "0.25rem 0.5rem",
              borderRadius: "0.375rem",
              fontSize: "0.9rem",
              fontFamily:
                "JetBrains Mono, Fira Code, Monaco, Menlo, Courier New, monospace",
              fontWeight: 500,
              border: "1px solid #4b5563",
            }}
            {...props}
          >
            {children}
          </code>
        );
      }

      // For code blocks, this will be handled by the pre component above
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },

    // Custom blockquote styling
    blockquote: ({ children, ...props }: BlockquoteProps) => (
      <blockquote
        style={{
          borderLeft: "4px solid #6FC1FF",
          paddingLeft: "1.5rem",
          margin: "2rem 0",
          fontStyle: "italic",
          backgroundColor: "rgba(111, 193, 255, 0.05)",
          padding: "1.5rem",
          borderRadius: "0.75rem",
        }}
        {...props}
      >
        {children}
      </blockquote>
    ),

    ...components,
  };
}
