import { PostMatter } from "@/types/blog";

interface FrontmatterData {
  title?: string;
  Title?: string;
  date?: string;
  subtitle?: string;
  author?: string;
  toc?: boolean;
  Comments?: boolean;
  series?: string | string[];
  tags?: string | string[];
  Tags?: string | string[];
  category?: string;
  hideSubtitleInCard?: boolean;
  [key: string]: unknown;
}

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
    (match, paramKey: string) => {
      // Look up the parameter in frontmatter
      const value = frontmatter[paramKey as keyof PostMatter];
      return value ? String(value) : match; // Return original if not found
    },
  );

  // Process {{< highlight language >}} shortcodes with proper line breaks
  processedContent = processedContent.replace(
    /\{\{<\s*highlight\s+(\w+)\s*>\}\}([\s\S]*?)\{\{<\s*\/highlight\s*>\}\}/g,
    (match, language: string, code: string) => {
      // Clean up the code content and convert to markdown code block
      const cleanCode = code.trim();
      return `\`\`\`${language}\n${cleanCode}\n\`\`\``;
    },
  );

  // Process {{< youtube id >}} shortcode
  processedContent = processedContent.replace(
    /\{\{<\s*youtube\s+([^\s>]+)\s*>\}\}/g,
    (match, videoId: string) => {
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
    (match, videoId: string) => {
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
<div style="border: 2px solid #6FC1FF; border-radius: 12px; padding: 2rem; margin: 2rem 0; background: linear-gradient(135deg, rgba(111, 193, 255, 0.1) 0%, rgba(111, 193, 255, 0.05) 100%); text-align: center;">
  <h3 style="margin-top: 0; color: #6FC1FF; font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem;">📧 Stay Updated with Security Insights</h3>
  <p style="margin-bottom: 1.5rem; color: #d1d5db;">Get weekly tips on cybersecurity, DevOps automation, and secure coding practices directly to your inbox.</p>
  
  <form style="max-width: 400px; margin: 0 auto; margin-bottom: 1.5rem;" onsubmit="handleNewsletterSubmit(event)">
    <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
      <input 
        type="email" 
        name="email"
        placeholder="your.email@example.com" 
        required
        style="flex: 1; padding: 0.75rem 1rem; border-radius: 6px; border: 1px solid #374151; background-color: #1f2937; color: #ffffff; font-size: 1rem; outline: none; transition: all 0.2s ease;"
        onfocus="this.style.borderColor='#6FC1FF'; this.style.boxShadow='0 0 0 2px rgba(111, 193, 255, 0.2)';"
        onblur="this.style.borderColor='#374151'; this.style.boxShadow='none';"
      />
      <button 
        type="submit"
        style="background-color: #6FC1FF; color: #000000; border: none; padding: 0.75rem 1.5rem; border-radius: 6px; font-size: 1rem; font-weight: 500; cursor: pointer; transition: all 0.2s ease; white-space: nowrap;"
        onmouseover="this.style.backgroundColor='#5FA8E6';"
        onmouseout="this.style.backgroundColor='#6FC1FF';"
      >
        Subscribe
      </button>
    </div>
    <div id="newsletter-message" style="display: none; padding: 0.5rem; border-radius: 4px; font-size: 0.875rem; margin-bottom: 1rem;"></div>
  </form>

  <div style="display: flex; gap: 0.75rem; justify-content: center; margin-bottom: 1rem; flex-wrap: wrap;">
    <a href="https://twitter.com/hacker1db" target="_blank" style="color: #6FC1FF; text-decoration: none; font-weight: 500;">Twitter</a>
    <a href="https://github.com/hacker1db" target="_blank" style="color: #6FC1FF; text-decoration: none; font-weight: 500;">GitHub</a>
    <a href="https://youtube.com/channel/UCApwUq9I-WDU_L2-Z4Tc1Aw" target="_blank" style="color: #6FC1FF; text-decoration: none; font-weight: 500;">YouTube</a>
  </div>

  <p style="margin: 0; font-size: 0.75rem; color: #9ca3af;">
    No spam. Unsubscribe anytime. See our <a href="/privacy" style="color: #6FC1FF; text-decoration: none;">privacy policy</a>.
  </p>
</div>

<script>
async function handleNewsletterSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const emailInput = form.email;
  const messageDiv = document.getElementById('newsletter-message');
  const submitButton = form.querySelector('button[type="submit"]');
  
  const email = emailInput.value.trim();
  if (!email) {
    showMessage('Please enter your email address.', 'error');
    return;
  }
  
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  if (!emailRegex.test(email)) {
    showMessage('Please enter a valid email address.', 'error');
    return;
  }
  
  // Show loading state
  submitButton.textContent = 'Subscribing...';
  submitButton.disabled = true;
  submitButton.style.backgroundColor = '#6FC1FF80';
  submitButton.style.cursor = 'not-allowed';
  
  try {
    // Simulate API call - in production, this would call your newsletter service
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    showMessage('Thanks for subscribing! Check your email for confirmation.', 'success');
    emailInput.value = '';
  } catch (error) {
    showMessage('Something went wrong. Please try again.', 'error');
  } finally {
    // Reset button state
    submitButton.textContent = 'Subscribe';
    submitButton.disabled = false;
    submitButton.style.backgroundColor = '#6FC1FF';
    submitButton.style.cursor = 'pointer';
  }
}

function showMessage(message, type) {
  const messageDiv = document.getElementById('newsletter-message');
  messageDiv.style.display = 'block';
  messageDiv.textContent = message;
  
  if (type === 'success') {
    messageDiv.style.backgroundColor = 'rgba(34, 197, 94, 0.1)';
    messageDiv.style.color = '#22c55e';
    messageDiv.style.border = '1px solid rgba(34, 197, 94, 0.3)';
  } else {
    messageDiv.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
    messageDiv.style.color = '#ef4444';
    messageDiv.style.border = '1px solid rgba(239, 68, 68, 0.3)';
  }
  
  // Hide message after 5 seconds for success messages
  if (type === 'success') {
    setTimeout(() => {
      messageDiv.style.display = 'none';
    }, 5000);
  }
}
</script>`;
    },
  );

  // Process {{< figure src="..." alt="..." caption="..." >}} shortcode
  processedContent = processedContent.replace(
    /\{\{<\s*figure\s+src="([^"]+)"(?:\s+alt="([^"]*)")?(?:\s+caption="([^"]*)")?\s*>\}\}/g,
    (match, src: string, alt = "", caption = "") => {
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
    (match, username: string, gistId: string) => {
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
    (match, path: string) => {
      // Convert Hugo ref to Next.js route
      const cleanPath = path.replace(/\.md$/, "").replace(/^\//, "");
      return `/posts/${cleanPath}`;
    },
  );

  // Process {{< relref "path" >}} shortcodes (convert to relative links)
  processedContent = processedContent.replace(
    /\{\{<\s*relref\s+"([^"]+)"\s*>\}\}/g,
    (match, path: string) => {
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
export function processFrontmatter(
  data: FrontmatterData,
  content?: string,
): PostMatter {
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
