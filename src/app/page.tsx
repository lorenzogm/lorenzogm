import { getAllPosts, BlogPostMetadata } from '@/lib/blog';
import { BlogCard } from '@/components/BlogCard';

export default async function Home() {
  let posts: BlogPostMetadata[] = [];
  
  try {
    posts = await getAllPosts();
  } catch (error) {
    console.error('Error loading posts:', error);
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header>
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-3">
              Lorenzo<span className="text-red-600"> GM</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Insights on web development, software engineering, and modern tech practices
            </p>
            <div className="mt-6 w-20 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto rounded-full"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-16">
        {/* Blog Posts */}
        <div className="space-y-12">
          {/* Featured Post - Full Width */}
          {posts.length > 0 && (
            <BlogCard key={posts[0].slug} post={posts[0]} featured={true} />
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
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">No blog posts found.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20">
        <div className="max-w-5xl mx-auto px-4 py-10 text-center">
          <p className="text-gray-600">
            © 2025 Lorenzo GM.
          </p>
        </div>
      </footer>
    </div>
  );
}
