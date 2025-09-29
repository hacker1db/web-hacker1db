import { PostMatter } from "@/types/blog";

/**
 * Process Hugo shortcodes in markdown content
 */
export function processShortcodes(
  content: string,
  frontmatter: PostMatter,
): string {
  let processedContent = content;

  // Process {{< param key >}} shortcodes
  processedContent = processedContent.replace(
    /\{\{<\s*param\s+(\w+)\s*>\}\}/g,
    (match, paramKey) => {
      // Look up the parameter in frontmatter
      const value = (frontmatter as any)[paramKey];
      return value ? String(value) : match; // Return original if not found
    },
  );

  // Process {{< highlight language >}} shortcodes with proper line breaks
  processedContent = processedContent.replace(
    /\{\{<\s*highlight\s+(\w+)\s*>\}\}([\s\S]*?)\{\{<\s*\/highlight\s*>\}\}/g,
    (match, language, code) => {
      // Clean up the code content and convert to markdown code block
      const cleanCode = code.trim();
      return `\`\`\`${language}\n${cleanCode}\n\`\`\``;
    },
  );

  // Process {{< youtube id >}} shortcode
  processedContent = processedContent.replace(
    /\{\{<\s*youtube\s+([^\s>]+)\s*>\}\}/g,
    (match, videoId) => {
      return `
<div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%; margin: 2rem 0;">
  <iframe 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0; border-radius: 8px;"
    src="https://www.youtube.com/embed/${videoId}"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>
</div>`;
    },
  );

  // Process {{< vimeo id >}} shortcode
  processedContent = processedContent.replace(
    /\{\{<\s*vimeo\s+([^\s>]+)\s*>\}\}/g,
    (match, videoId) => {
      return `
<div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%; margin: 2rem 0;">
  <iframe 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0; border-radius: 8px;"
    src="https://player.vimeo.com/video/${videoId}"
    title="Vimeo video player"
    frameborder="0"
    allow="autoplay; fullscreen; picture-in-picture"
    allowfullscreen>
  </iframe>
</div>`;
    },
  );

  // Process {{< newsletter >}} shortcode
  processedContent = processedContent.replace(
    /\{\{<\s*newsletter\s*>\}\}/g,
    () => {
      return `
<div style="border: 2px solid #6FC1FF; border-radius: 12px; padding: 2rem; margin: 2rem 0; background: linear-gradient(135deg, rgba(111, 193, 255, 0.1) 0%, rgba(111, 193, 255, 0.05) 100%);">
  <h3 style="margin-top: 0; color: #6FC1FF; font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem;">📧 Stay Updated</h3>
  <p style="margin-bottom: 1rem; color: #d1d5db;">Follow me on social media for the latest posts and updates!</p>
  <div style="display: flex; gap: 0.75rem; margin-top: 1rem;">
    <a href="https://twitter.com/hacker1db" target="_blank" style="color: #6FC1FF; text-decoration: none; font-weight: 500;">Twitter</a>
    <a href="https://github.com/hacker1db" target="_blank" style="color: #6FC1FF; text-decoration: none; font-weight: 500;">GitHub</a>
    <a href="https://youtube.com/channel/UCApwUq9I-WDU_L2-Z4Tc1Aw" target="_blank" style="color: #6FC1FF; text-decoration: none; font-weight: 500;">YouTube</a>
  </div>
</div>`;
    },
  );

  // Process {{< figure src="..." alt="..." caption="..." >}} shortcode
  processedContent = processedContent.replace(
    /\{\{<\s*figure\s+src="([^"]+)"(?:\s+alt="([^"]*)")?(?:\s+caption="([^"]*)")?\s*>\}\}/g,
    (match, src, alt = "", caption = "") => {
      const figureHtml = `
<figure style="margin: 2rem 0; text-align: center;">
  <img src="${src}" alt="${alt}" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);" />
  ${caption ? `<figcaption style="margin-top: 0.5rem; font-style: italic; color: #9ca3af; font-size: 0.875rem;">${caption}</figcaption>` : ""}
</figure>`;
      return figureHtml;
    },
  );

  // Process {{< gist username gist_id >}} shortcode
  processedContent = processedContent.replace(
    /\{\{<\s*gist\s+([^\s]+)\s+([^\s>]+)\s*>\}\}/g,
    (match, username, gistId) => {
      return `
<div style="margin: 2rem 0; padding: 1rem; border: 1px solid #374151; border-radius: 8px; background-color: #1f2937;">
  <script src="https://gist.github.com/${username}/${gistId}.js"></script>
  <noscript>
    <p><a href="https://gist.github.com/${username}/${gistId}" target="_blank" style="color: #6FC1FF;">View this gist on GitHub</a></p>
  </noscript>
</div>`;
    },
  );

  // Process {{< ref "path" >}} shortcodes (convert to relative links)
  processedContent = processedContent.replace(
    /\{\{<\s*ref\s+"([^"]+)"\s*>\}\}/g,
    (match, path) => {
      // Convert Hugo ref to Next.js route
      const cleanPath = path.replace(/\.md$/, "").replace(/^\//, "");
      return `/posts/${cleanPath}`;
    },
  );

  // Process {{< relref "path" >}} shortcodes (convert to relative links)
  processedContent = processedContent.replace(
    /\{\{<\s*relref\s+"([^"]+)"\s*>\}\}/g,
    (match, path) => {
      const cleanPath = path.replace(/\.md$/, "").replace(/^\//, "");
      return `/posts/${cleanPath}`;
    },
  );

  // Process basic HTML video tags for better styling
  processedContent = processedContent.replace(
    /<video([^>]*)>/g,
    '<video$1 style="width: 100%; max-width: 100%; border-radius: 8px; margin: 1rem 0;">',
  );

  return processedContent;
}

/**
 * Extract and process Hugo-style frontmatter parameters
 */
export function processFrontmatter(data: any, content?: string): PostMatter {
  // Auto-detect if subtitle should be hidden in card when it's used as a param in content
  const hasSubtitleParam = content
    ? /\{\{<\s*param\s+subtitle\s*>\}\}/g.test(content)
    : false;

  // Handle both 'tags' and 'Tags' (case insensitive)
  const tags = data.tags || data.Tags || [];

  const processed: PostMatter = {
    title: data.title || data.Title || "",
    date: data.date || "",
    subtitle: data.subtitle || "",
    author: data.author || "",
    toc: data.toc || false,
    Comments: data.Comments || false,
    series: Array.isArray(data.series)
      ? data.series
      : data.series
        ? [data.series]
        : [],
    tags: Array.isArray(tags) ? tags : tags ? [tags] : [],
    category: data.category || "",
    // Explicitly set to true if subtitle param is detected
    hideSubtitleInCard: Boolean(data.hideSubtitleInCard || hasSubtitleParam),
  };

  return processed;
}
