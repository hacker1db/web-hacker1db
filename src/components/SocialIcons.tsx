"use client";

import { SocialLink } from "@/types/blog";
import { socialIconsConfig } from "@/lib/socialIcons";

interface SocialIconsProps {
  links: SocialLink[];
}

export default function SocialIcons({ links }: SocialIconsProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        justifyContent: "center",
        marginTop: "1.5rem",
      }}
    >
      {links.map((link) => {
        const iconData = socialIconsConfig[link.name.toLowerCase()];

        if (!iconData) {
          // Fallback for unknown icons
          return null;
        }

        const iconStyle = {
          width: "1.5rem",
          height: "1.5rem",
          fill: "currentColor",
        };

        return (
          <a
            key={link.name}
            href={iconData.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#9ca3af",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = iconData.color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#9ca3af";
            }}
            aria-label={`Visit ${iconData.name} profile`}
            title={`Visit ${iconData.name} profile`}
          >
            <svg
              style={iconStyle}
              viewBox={iconData.viewBox}
              fill="currentColor"
            >
              <path d={iconData.path} />
            </svg>
          </a>
        );
      })}
    </div>
  );
}
