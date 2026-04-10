import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArticleDetailPage } from "@/components/pages/article-detail-page";
import { getPostBySlug } from "@/lib/blog";

export const Route = createFileRoute("/es/blog/$slug")({
  loader: async ({ params }) => {
    const post = await getPostBySlug(params.slug, "es");
    if (!post) throw notFound();
    return post;
  },
  component() {
    const post = Route.useLoaderData();
    return <ArticleDetailPage post={post} />;
  },
  notFoundComponent() {
    return (
      <div className="py-16 text-center">
        <h1 className="mb-4 font-bold text-4xl text-gray-900">
          Artículo No Encontrado
        </h1>
        <p className="mb-8 text-gray-600">El artículo que buscas no existe.</p>
        <a className="font-semibold text-red-600 hover:text-red-700" href="/es">
          ← Volver al inicio
        </a>
      </div>
    );
  },
});
