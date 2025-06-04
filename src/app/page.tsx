import { getAllPosts, BlogPostMetadata } from '@/lib/blog';
import { BlogCard } from '@/components/BlogCard';

export default async function Home() {
  console.log('Home component is being rendered');
  let posts: BlogPostMetadata[] = [];
  
  try {
    posts = await getAllPosts();
    console.log('Posts loaded successfully:', posts.length);
  } catch (error) {
    console.error('Error loading posts:', error);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Lorenzo GM</h1>
          <p className="text-lg text-gray-600">
            Insights on web development, software engineering, and modern tech practices
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Latest Posts</h2>
          <p className="text-gray-600">Stay up to date with the latest in web development</p>
        </div>

        {/* Blog Posts */}
        <div className="space-y-8">
          {/* Featured Post - Full Width */}
          {posts.length > 0 && (
            <div className="w-full">
              <BlogCard key={posts[0].slug} post={posts[0]} featured={true} />
            </div>
          )}
          
          {/* Remaining Posts - Grid Layout */}
          {posts.length > 1 && (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
              {posts.slice(1).map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No blog posts found.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <p className="text-gray-600">
            © 2025 Tech Blog. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
