import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArticleDetailPage } from "@/components/pages/article-detail-page";
import { getPostBySlug } from "@/lib/blog";

function BlogPostPage() {
  const post = Route.useLoaderData();
  return <ArticleDetailPage post={post} />;
}

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = await getPostBySlug(params.slug, "en");
    if (!post) throw notFound();
    return post;
  },
  component: BlogPostPage,
  notFoundComponent() {
    return (
      <div className="py-16 text-center">
        <h1 className="mb-4 font-bold text-4xl text-gray-900">
          Post Not Found
        </h1>
        <p className="mb-8 text-gray-600">
          The blog post you&apos;re looking for doesn&apos;t exist.
        </p>
        <a className="font-semibold text-red-600 hover:text-red-700" href="/">
          ← Back to home
        </a>
      </div>
    );
  },
});
