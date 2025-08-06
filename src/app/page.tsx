import { getAllPosts, BlogPostMetadata } from '@/lib/blog';
import { BlogCard } from '@/components/patterns/BlogCard';
import { ErrorPage } from '@/components/pages/ErrorPage';

export default async function Home() {
  let posts: BlogPostMetadata[] = [];
  let hasError = false;
  
  try {
    posts = await getAllPosts('en'); // Default to English
  } catch (error) {
    console.error('Error loading posts:', error);
    hasError = true;
  }

  // Show error page if posts failed to load
  if (hasError) {
    return (
      <ErrorPage 
        title="Failed to Load Blog Posts"
        message="We're having trouble loading the blog posts right now. Please try again in a few moments."
        showRetryButton={true}
      />
    );
  }

  return (
    <>
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
    </>
  );
}
