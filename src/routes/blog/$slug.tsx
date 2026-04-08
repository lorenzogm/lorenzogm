import { createFileRoute, notFound } from '@tanstack/react-router'
import { getPostBySlug } from '@/lib/blog'
import { ArticleDetailPage } from '@/components/pages/ArticleDetailPage'

export const Route = createFileRoute('/blog/$slug')({
  loader: async ({ params }) => {
    const post = await getPostBySlug(params.slug, 'en')
    if (!post) throw notFound()
    return post
  },
  component: function BlogPost() {
    const post = Route.useLoaderData()
    return <ArticleDetailPage post={post} />
  },
  notFoundComponent: function BlogPostNotFound() {
    return (
      <div className="text-center py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
        <p className="text-gray-600 mb-8">
          The blog post you&apos;re looking for doesn&apos;t exist.
        </p>
        <a href="/" className="text-red-600 hover:text-red-700 font-semibold">
          ← Back to home
        </a>
      </div>
    )
  },
})
