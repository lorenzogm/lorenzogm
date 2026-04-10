import { createFileRoute } from "@tanstack/react-router";
import { BlogCard } from "@/components/patterns/blog-card";
import { type BlogPostMetadata, getAllPosts } from "@/lib/blog";

function SpanishHome() {
  const posts: BlogPostMetadata[] = getAllPosts("es");

  return (
    <>
      {/* Blog Posts */}
      <div className="space-y-12">
        {/* Featured Post - Full Width */}
        {posts.length > 0 && (
          <BlogCard featured={true} key={posts[0].slug} post={posts[0]} />
        )}

        {/* Remaining Posts - Grid Layout */}
        {posts.length > 1 && (
          <div className="grid gap-8 md:grid-cols-2">
            {posts.slice(1).map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>

      {posts.length === 0 && (
        <div className="py-16 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-8 w-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </div>
          <p className="text-gray-500 text-lg">
            No se encontraron artículos del blog.
          </p>
        </div>
      )}
    </>
  );
}

export const Route = createFileRoute("/es/")({
  component: SpanishHome,
});
