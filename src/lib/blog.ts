import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import html from "remark-html";

// Import all markdown files at build time using Vite's import.meta.glob
const enMarkdownFiles = import.meta.glob("/content/*.en.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const esMarkdownFiles = import.meta.glob("/content/*.es.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function getFilesForLang(lang: string): Record<string, string> {
  return lang === "es" ? esMarkdownFiles : enMarkdownFiles;
}

function slugFromPath(filePath: string, lang: string): string {
  return filePath.replace(/^\/content\//, "").replace(`.${lang}.md`, "");
}

export interface BlogPost {
  author: string;
  content: string;
  date: string;
  excerpt: string;
  image: string;
  lang: string;
  slug: string;
  tags: string[];
  title: string;
}

export interface BlogPostMetadata {
  author: string;
  date: string;
  excerpt: string;
  image: string;
  lang: string;
  slug: string;
  tags: string[];
  title: string;
}

function normalizeDate(rawDate: unknown): string {
  if (!rawDate) return new Date().toISOString().split("T")[0];
  if (rawDate instanceof Date) return rawDate.toISOString().split("T")[0];
  return String(rawDate);
}

export function getAllPosts(lang = "en"): BlogPostMetadata[] {
  const files = getFilesForLang(lang);
  const allPostsData: BlogPostMetadata[] = [];

  for (const [filePath, content] of Object.entries(files)) {
    try {
      const slug = slugFromPath(filePath, lang);
      const matterResult = matter(content);

      // Generate excerpt from content if not provided
      const excerpt =
        matterResult.data.excerpt ||
        matterResult.data.description ||
        `${matterResult.content.slice(0, 150)}...`;

      allPostsData.push({
        slug,
        title: matterResult.data.title || "Untitled",
        date: normalizeDate(matterResult.data.date),
        excerpt,
        image: matterResult.data.image || "/placeholder-image.jpg",
        author: matterResult.data.author || "Lorenzo GM",
        tags: matterResult.data.tag
          ? matterResult.data.tag.split(", ")
          : matterResult.data.tags || [],
        lang,
      });
    } catch {
      // Skip malformed markdown files.
    }
  }

  // Filter out posts with future dates (scheduled posts)
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const publishedPosts = allPostsData.filter(
    (post) => new Date(post.date) <= now
  );

  // Sort posts by date (newest first)
  return publishedPosts.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
}

export async function getPostBySlug(
  slug: string,
  lang = "en"
): Promise<BlogPost | null> {
  try {
    const files = getFilesForLang(lang);
    const filePath = `/content/${slug}.${lang}.md`;
    const content = files[filePath];

    if (!content) return null;

    const matterResult = matter(content);

    // Convert markdown to HTML
    const processedContent = await remark()
      .use(remarkGfm)
      .use(html, { sanitize: false })
      .process(matterResult.content);

    const contentHtml = processedContent.toString();

    // Generate excerpt from content if not provided
    const excerpt =
      matterResult.data.excerpt ||
      matterResult.data.description ||
      `${matterResult.content.slice(0, 150)}...`;

    const postDate = normalizeDate(matterResult.data.date);

    // Do not return posts with future dates (scheduled posts)
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    if (new Date(postDate) > now) {
      return null;
    }

    return {
      slug,
      title: matterResult.data.title || "Untitled",
      date: postDate,
      excerpt,
      image: matterResult.data.image || "/placeholder-image.jpg",
      author: matterResult.data.author || "Lorenzo GM",
      tags: matterResult.data.tag
        ? matterResult.data.tag.split(", ")
        : matterResult.data.tags || [],
      content: contentHtml,
      lang,
    };
  } catch {
    return null;
  }
}

export function getAllPostSlugs(lang = "en"): string[] {
  const files = getFilesForLang(lang);
  return Object.keys(files).map((filePath) => slugFromPath(filePath, lang));
}
