import { Button } from "@/components/elements/button";
import type { BlogPostMetadata } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPostMetadata;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const blogUrl =
    post.lang === "es" ? `/es/blog/${post.slug}` : `/blog/${post.slug}`;
  const readMoreText = post.lang === "es" ? "Leer más" : "Read more";

  return (
    <article className="hover:-translate-y-1 overflow-hidden rounded-xl border border-red-100/50 bg-white shadow-sm transition-all duration-300 hover:shadow-xl">
      <Button
        className="block w-full text-left"
        event={{
          category: "Blog",
          action: "Card Click",
          name: post.title,
          value: featured ? 2 : 1,
        }}
        href={blogUrl}
      >
        <div
          className={`relative w-full ${featured ? "h-64 md:h-80" : "h-48"} overflow-hidden`}
        >
          <img
            alt={post.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            src={post.image}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
        <div className="p-6">
          <div className="mb-3 flex items-center text-gray-500 text-sm">
            <time className="font-medium" dateTime={post.date}>
              {formatDate(post.date)}
            </time>
            <span className="mx-2 text-red-400">•</span>
            <span className="font-medium">{post.author}</span>
          </div>

          <h2
            className={`${featured ? "text-2xl md:text-3xl" : "text-xl"} mb-3 font-bold text-gray-900 leading-tight transition-colors duration-200 hover:text-red-600`}
          >
            {post.title}
          </h2>

          <p className="mb-4 line-clamp-3 text-gray-600 leading-relaxed">
            {post.excerpt}
          </p>

          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                className="inline-block rounded-full border border-red-200/50 bg-red-50 px-3 py-1 font-semibold text-red-700 text-xs transition-colors duration-200 hover:bg-red-100"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="group flex items-center font-semibold text-red-600 text-sm transition-colors duration-200 hover:text-red-700">
            {readMoreText}
            <svg
              className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <title>Read more arrow</title>
              <path
                d="M17 8l4 4m0 0l-4 4m4-4H3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </div>
        </div>
      </Button>
    </article>
  );
}
