import { ArticleContent } from "@/components/elements/article-content";
import { formatDate } from "@/lib/utils";

interface BlogPost {
  author: string;
  content: string;
  date: string;
  excerpt?: string;
  image?: string;
  tags?: string[];
  title: string;
}

interface ArticleDetailPageProps {
  post: BlogPost;
}

export function ArticleDetailPage({ post }: ArticleDetailPageProps) {
  return (
    <>
      {/* Article Meta and Title */}
      <div className="mb-8">
        <div className="mb-6 flex items-center text-gray-500 text-sm">
          <time className="font-medium" dateTime={post.date}>
            {formatDate(post.date)}
          </time>
          <span className="mx-3 text-red-400">•</span>
          <span className="font-medium">{post.author}</span>
        </div>

        <h1 className="mb-6 font-bold text-4xl text-gray-900 leading-tight md:text-6xl">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="mb-8 max-w-3xl text-gray-600 text-xl leading-relaxed md:text-2xl">
            {post.excerpt}
          </p>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-3">
            {post.tags.map((tag) => (
              <span
                className="inline-block rounded-full border border-red-200/50 bg-red-50 px-4 py-2 font-semibold text-red-700 text-sm"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {post.image && (
        <div className="relative mb-16 h-72 w-full overflow-hidden rounded-2xl shadow-2xl md:h-96">
          <img
            alt={post.title}
            className="absolute inset-0 h-full w-full object-cover"
            height={768}
            src={post.image}
            width={1365}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        </div>
      )}

      <article className="rounded-2xl border border-red-100/50 bg-white/80 p-8 shadow-lg backdrop-blur-sm md:p-16">
        <ArticleContent content={post.content} />
      </article>
    </>
  );
}
