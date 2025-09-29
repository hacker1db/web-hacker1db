import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

async function getAboutContent() {
  try {
    // Try .mdx first, then .md for backward compatibility
    let fullPath = path.join(process.cwd(), "content/about.mdx");
    if (!fs.existsSync(fullPath)) {
      fullPath = path.join(process.cwd(), "content/about.md");
    }
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Process markdown to HTML
    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(content);
    const contentHtml = processedContent.toString();

    return {
      data,
      content: contentHtml,
    };
  } catch (error) {
    console.error("Error reading about content:", error);
    return null;
  }
}

export default async function AboutPage() {
  const aboutContent = await getAboutContent();

  return (
    <div className="max-w-3xl mx-auto">
      {aboutContent ? (
        <>
          <h1 className="text-4xl font-bold mb-8 text-center">
            {aboutContent.data.title || "About Me"}
          </h1>

          <div
            className="prose prose-invert prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: aboutContent.content }}
          />
        </>
      ) : (
        <>
          <h1 className="text-4xl font-bold mb-8 text-center">About Me</h1>

          <div className="prose prose-invert prose-lg max-w-none">
            <h2>$WhoIs</h2>

            <p>
              Cyber Security Professional, Software Engineer, Traveler, Music
              lover, Coffee Nerd.
            </p>

            <ul>
              <li>Cyber Security</li>
              <li>Software Engineer</li>
              <li>Travel</li>
              <li>Coffee</li>
              <li>Music</li>
              <li>Random Thoughts and words of wisdom</li>
            </ul>

            <blockquote>
              <p>Live, Learn, Travel, Never forget your hobbies!</p>
            </blockquote>
          </div>
        </>
      )}
    </div>
  );
}
