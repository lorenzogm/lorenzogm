import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';

const postsDirectory = path.join(process.cwd(), 'content');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  author: string;
  tags: string[];
  content: string;
}

export interface BlogPostMetadata {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  author: string;
  tags: string[];
}

export async function getAllPosts(): Promise<BlogPostMetadata[]> {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);

        // Generate excerpt from content if not provided
        const excerpt = matterResult.data.excerpt || 
          matterResult.data.description || 
          matterResult.content.substring(0, 150) + '...';

        return {
          slug,
          title: matterResult.data.title || 'Untitled',
          date: matterResult.data.date || new Date().toISOString().split('T')[0],
          excerpt,
          image: matterResult.data.image || '/placeholder-image.jpg',
          author: matterResult.data.author || 'Lorenzo GM',
          tags: matterResult.data.tag ? matterResult.data.tag.split(', ') : (matterResult.data.tags || []),
        };
      });

    // Sort posts by date (newest first) - convert to Date objects for proper comparison
    return allPostsData.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  } catch (error) {
    console.error('Error loading posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    // Convert markdown to HTML
    const processedContent = await remark()
      .use(remarkGfm)
      .use(html, { sanitize: false })
      .process(matterResult.content);
    
    const contentHtml = processedContent.toString();

    // Generate excerpt from content if not provided
    const excerpt = matterResult.data.excerpt || 
      matterResult.data.description || 
      matterResult.content.substring(0, 150) + '...';

    return {
      slug,
      title: matterResult.data.title || 'Untitled',
      date: matterResult.data.date || new Date().toISOString().split('T')[0],
      excerpt,
      image: matterResult.data.image || '/placeholder-image.jpg',
      author: matterResult.data.author || 'Lorenzo GM',
      tags: matterResult.data.tag ? matterResult.data.tag.split(', ') : (matterResult.data.tags || []),
      content: contentHtml,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function getAllPostSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''));
}
