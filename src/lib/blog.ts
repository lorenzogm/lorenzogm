import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';

// Import all markdown files at build time using Vite's import.meta.glob
const enMarkdownFiles = import.meta.glob('/content/*.en.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const esMarkdownFiles = import.meta.glob('/content/*.es.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function getFilesForLang(lang: string): Record<string, string> {
  return lang === 'es' ? esMarkdownFiles : enMarkdownFiles;
}

function slugFromPath(filePath: string, lang: string): string {
  return filePath
    .replace(/^\/content\//, '')
    .replace(`.${lang}.md`, '');
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  author: string;
  tags: string[];
  content: string;
  lang: string;
}

export interface BlogPostMetadata {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  author: string;
  tags: string[];
  lang: string;
}

export function getAllPosts(lang: string = 'en'): BlogPostMetadata[] {
  try {
    const files = getFilesForLang(lang);
    const allPostsData = Object.entries(files).map(([filePath, content]) => {
      const slug = slugFromPath(filePath, lang);
      const matterResult = matter(content);

      // Generate excerpt from content if not provided
      const excerpt =
        matterResult.data.excerpt ||
        matterResult.data.description ||
        matterResult.content.substring(0, 150) + '...';

      return {
        slug,
        title: matterResult.data.title || 'Untitled',
        date:
          matterResult.data.date || new Date().toISOString().split('T')[0],
        excerpt,
        image: matterResult.data.image || '/placeholder-image.jpg',
        author: matterResult.data.author || 'Lorenzo GM',
        tags: matterResult.data.tag
          ? matterResult.data.tag.split(', ')
          : matterResult.data.tags || [],
        lang,
      };
    });

    // Filter out posts with future dates (scheduled posts)
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const publishedPosts = allPostsData.filter(
      (post) => new Date(post.date) <= now,
    );

    // Sort posts by date (newest first)
    return publishedPosts.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  } catch (error) {
    console.error('Error loading posts:', error);
    return [];
  }
}

export async function getPostBySlug(
  slug: string,
  lang: string = 'en',
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
      matterResult.content.substring(0, 150) + '...';

    const postDate =
      matterResult.data.date || new Date().toISOString().split('T')[0];

    // Do not return posts with future dates (scheduled posts)
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    if (new Date(postDate) > now) {
      return null;
    }

    return {
      slug,
      title: matterResult.data.title || 'Untitled',
      date: postDate,
      excerpt,
      image: matterResult.data.image || '/placeholder-image.jpg',
      author: matterResult.data.author || 'Lorenzo GM',
      tags: matterResult.data.tag
        ? matterResult.data.tag.split(', ')
        : matterResult.data.tags || [],
      content: contentHtml,
      lang,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function getAllPostSlugs(lang: string = 'en'): string[] {
  const files = getFilesForLang(lang);
  return Object.keys(files).map((filePath) => slugFromPath(filePath, lang));
}
