import { formatDate } from '@/lib/utils'
import { ArticleContent } from '@/components/elements/ArticleContent'

interface BlogPost {
  title: string
  date: string
  author: string
  excerpt?: string
  content: string
  image?: string
  tags?: string[]
}

interface ArticleDetailPageProps {
  post: BlogPost
}

export function ArticleDetailPage({ post }: ArticleDetailPageProps) {
  return (
    <>
        {/* Article Meta and Title */}
        <div className="mb-8">
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <time dateTime={post.date} className="font-medium">{formatDate(post.date)}</time>
            <span className="mx-3 text-red-400">•</span>
            <span className="font-medium">{post.author}</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>
          
          {post.excerpt && (
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8 max-w-3xl">
              {post.excerpt}
            </p>
          )}
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block bg-red-50 text-red-700 text-sm font-semibold px-4 py-2 rounded-full border border-red-200/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        
        {post.image && (
          <div className="relative h-72 md:h-96 w-full rounded-2xl overflow-hidden shadow-2xl mb-16">
            <img
              src={post.image}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
          </div>
        )}

        <article className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 md:p-16 border border-red-100/50">
          <ArticleContent content={post.content} />
        </article>
    </>
  )
}
