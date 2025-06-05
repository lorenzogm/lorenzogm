import Image from 'next/image'
import { Container } from '@/components/elements/Container'
import { Button } from '@/components/elements/Button'
import { formatDate } from '@/lib/utils'

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
  // Determine variant based on whether the post has an image and tags (full blog post style)
  const variant = post.image && post.tags && post.tags.length > 0 ? 'full' : 'simple'
  const backHref = "/"
  const backLabel = "Back to Blog"
  const eventCategory = variant === 'full' ? "Blog Post" : "Navigation"
  if (variant === 'full') {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-red-50/30">
        {/* Navigation */}
        <nav className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-red-100/50">
          <Container className="py-4">
            <Button
              href={backHref}
              event={{
                category: eventCategory,
                action: "Back Click",
                name: post.title
              }}
              className="inline-flex items-center text-red-600 hover:text-red-700 font-semibold transition-colors duration-200 group"
            >
              <svg className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              {backLabel}
            </Button>
          </Container>
        </nav>

        {/* Article Header */}
        <header className="bg-white/80 backdrop-blur-sm">
          <Container className="py-16">
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
                <div className="flex flex-wrap gap-3">
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
              <div className="relative h-72 md:h-96 w-full rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              </div>
            )}
          </Container>
        </header>

        {/* Article Content */}
        <main>
          <Container className="py-16">
            <article className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 md:p-16 border border-red-100/50">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </article>

            {/* Back Button */}
            <div className="mt-16 text-center">
              <Button
                href={backHref}
                event={{
                  category: eventCategory,
                  action: "Back Button Click",
                  name: post.title
                }}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5 mr-2 transition-transform duration-200 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                Back to All Posts
              </Button>
            </div>
          </Container>
        </main>

        {/* Footer */}
        <footer className="bg-white/80 backdrop-blur-sm border-t border-red-100/50 mt-20">
          <Container className="py-10 text-center">
            <p className="text-gray-600">
              © 2025 Lorenzo GM.
            </p>
          </Container>
        </footer>
      </div>
    )
  }

  // Simple variant
  return (
    <Container>
      <article className="max-w-4xl mx-auto py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <span className="mx-2">•</span>
            <span>{post.author}</span>
          </div>
          {post.excerpt && (
            <p className="text-lg text-gray-600 leading-relaxed">{post.excerpt}</p>
          )}
        </header>

        <div 
          className="prose prose-lg prose-gray max-w-none prose-headings:text-gray-900 prose-a:text-red-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-code:text-red-600 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <footer className="mt-12 pt-8 border-t border-gray-200">
          <Button 
            href={backHref}
            event={{
              category: eventCategory,
              action: backLabel,
              name: post.title
            }}
          >
            <svg className="w-5 h-5 mr-2 transition-transform duration-200 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {backLabel}
          </Button>
        </footer>
      </article>
    </Container>
  )
}
