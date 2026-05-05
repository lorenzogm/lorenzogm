import { Link } from "@tanstack/react-router";
import { ArticleContent } from "@/components/elements/article-content";
import { RelatedArticles } from "@/components/patterns/related-articles";
import { getRelatedPosts, isPublished } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

interface BlogPost {
  author: string;
  content: string;
  date: string;
  excerpt?: string;
  image?: string;
  lang?: string;
  slug?: string;
  tags?: string[];
  title: string;
}

interface ArticleDetailPageProps {
  post: BlogPost;
}

export function ArticleDetailPage({ post }: ArticleDetailPageProps) {
  const lang = post.lang || "en";
  const relatedPosts =
    post.slug && post.tags?.length
      ? getRelatedPosts(post.slug, post.tags, lang).filter((p) =>
          isPublished(p.date)
        )
      : [];

  return (
    <>
      {/* Article Meta and Title */}
      <div className="mb-8">
        <div className="mb-6 flex items-center text-gray-500 text-sm dark:text-zinc-500">
          <time className="font-medium" dateTime={post.date}>
            {formatDate(post.date)}
          </time>
          <span className="mx-3 text-red-400 dark:text-red-500">•</span>
          <span className="font-medium">{post.author}</span>
        </div>

        <h1 className="mb-6 font-bold text-4xl text-gray-900 leading-tight md:text-6xl dark:text-zinc-100">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="mb-8 max-w-3xl text-gray-600 text-xl leading-relaxed md:text-2xl dark:text-zinc-400">
            {post.excerpt}
          </p>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-3">
            {post.tags.map((tag) => (
              <Link
                className="inline-block rounded-full border border-red-200/50 bg-red-50 px-4 py-2 font-semibold text-red-700 text-sm transition-colors hover:bg-red-100 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-300 dark:hover:bg-red-900/40"
                key={tag}
                params={{ lang, topic: tag.toLowerCase() }}
                to="/$lang/topics/$topic"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </div>

      {post.image && (
        <div className="mb-16 overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-zinc-900 dark:shadow-black/50">
          <img
            alt={post.title}
            className="block h-auto w-full"
            height={630}
            src={post.image}
            width={1200}
          />
        </div>
      )}

      <article className="rounded-2xl border border-red-100/50 bg-white/80 p-8 shadow-lg backdrop-blur-sm md:p-16 dark:border-red-900/30 dark:bg-zinc-900/80 dark:shadow-black/40">
        <ArticleContent content={post.content} />
      </article>

      <RelatedArticles lang={lang} posts={relatedPosts} />
    </>
  );
}
