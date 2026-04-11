import { BlogCard } from "@/components/patterns/blog-card";
import type { BlogPostMetadata } from "@/lib/blog";

interface RelatedArticlesProps {
  lang: string;
  posts: BlogPostMetadata[];
}

export function RelatedArticles({ posts, lang }: RelatedArticlesProps) {
  if (posts.length === 0) return null;

  const heading = lang === "es" ? "Artículos relacionados" : "Related Articles";

  return (
    <section className="mt-16">
      <h2 className="mb-8 font-bold text-3xl text-gray-900">{heading}</h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
