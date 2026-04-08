import { createFileRoute, notFound } from '@tanstack/react-router'
import { getPostBySlug } from '@/lib/blog'
import { ArticleDetailPage } from '@/components/pages/ArticleDetailPage'

export const Route = createFileRoute('/es/blog/$slug')({
  loader: async ({ params }) => {
    const post = await getPostBySlug(params.slug, 'es')
    if (!post) throw notFound()
    return post
  },
  component: function SpanishBlogPost() {
    const post = Route.useLoaderData()
    return <ArticleDetailPage post={post} />
  },
  notFoundComponent: function SpanishBlogPostNotFound() {
    return (
      <div className="text-center py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Artículo No Encontrado
        </h1>
        <p className="text-gray-600 mb-8">
          El artículo que buscas no existe.
        </p>
        <a href="/es" className="text-red-600 hover:text-red-700 font-semibold">
          ← Volver al inicio
        </a>
      </div>
    )
  },
})
