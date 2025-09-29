"use client";

import Link from "next/link";
import { Post } from "@/types/blog";
import { format } from "date-fns";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  // HACK: Since hideSubtitleInCard isn't working, let's detect it directly here
  // This will work as a fallback until we figure out the serialization issue
  const shouldHideSubtitle =
    post.data.hideSubtitleInCard ||
    (post.data.subtitle &&
      (post.data.title?.includes("Getting Started") ||
        post.data.title?.includes("Five Things") ||
        post.data.subtitle === "I want to learn DevOps" ||
        post.data.subtitle === "Remote Work" ||
        post.data.subtitle === "How to start programing" ||
        post.data.subtitle?.includes("Infosec") ||
        post.data.subtitle?.includes("docker")));

  return (
    <article className="bg-gray-800 rounded-xl p-6 border border-gray-600 transition-all duration-200 cursor-pointer relative overflow-hidden hover:border-gray-500 hover:shadow-lg">
      {/* Category Badge */}
      {post.slug.includes("/") && (
        <div className="absolute top-4 right-4 bg-cursor text-black text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
          {post.slug.split("/")[0]}
        </div>
      )}

      <Link href={`/posts/${post.slug}`} className="no-underline">
        {/* Title */}
        <h2 className={`text-2xl font-bold text-white mb-2 leading-tight transition-colors duration-200 hover:text-cursor ${
          post.slug.includes("/") ? "pr-16" : ""
        }`}>
          {post.data.title}
        </h2>

        {/* Subtitle - only show if not used as heading in content */}
        {post.data.subtitle && !shouldHideSubtitle && (
          <p className="text-base text-gray-300 mb-4 leading-6">
            {post.data.subtitle}
          </p>
        )}

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-gray-400 leading-relaxed mb-6 text-sm">
            {post.excerpt}
          </p>
        )}
      </Link>

      {/* Tags */}
      {post.data.tags && post.data.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {post.data.tags.slice(0, 3).map((tag) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
              className="bg-gray-500/30 text-gray-300 text-xs font-medium px-3 py-1 rounded-md border border-gray-500/20 no-underline transition-all duration-200 hover:bg-gray-500/40 hover:text-white"
            >
              #{tag}
            </Link>
          ))}
          {post.data.tags.length > 3 && (
            <span className="text-gray-400 text-xs font-medium">
              +{post.data.tags.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-600 text-sm text-gray-400">
        <div className="flex items-center gap-3">
          <time dateTime={post.data.date}>
            {format(new Date(post.data.date), "MMM d, yyyy")}
          </time>
          {post.data.author && (
            <>
              <span>•</span>
              <span>{post.data.author}</span>
            </>
          )}
          {post.data.series && post.data.series.length > 0 && (
            <>
              <span>•</span>
              <Link
                href={`/series/${encodeURIComponent(post.data.series[0].toLowerCase())}`}
                className="text-cursor text-xs font-medium no-underline transition-colors duration-200 hover:text-cursor/80"
              >
                Series: {post.data.series[0]}
              </Link>
            </>
          )}
        </div>

        <Link
          href={`/posts/${post.slug}`}
          className="text-cursor no-underline font-medium flex items-center gap-1 transition-colors duration-200 hover:text-cursor/80"
        >
          Read more
          <span className="text-xs">→</span>
        </Link>
      </div>
    </article>
  );
}
