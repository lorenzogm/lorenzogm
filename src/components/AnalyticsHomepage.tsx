'use client';

import { useAnalytics } from '@/components/Analytics';
import { BlogCard } from '@/components/BlogCard';
import { BlogPostMetadata } from '@/lib/blog';

interface AnalyticsHomepageProps {
  posts: BlogPostMetadata[];
}

export function AnalyticsHomepage({ posts }: AnalyticsHomepageProps) {
  const { trackEvent } = useAnalytics();

  const handleBlogCardClick = (post: BlogPostMetadata, isFeatured: boolean) => {
    trackEvent('Blog', 'Card Click', post.title, isFeatured ? 2 : 1);
    trackEvent('Navigation', 'Blog Post', `${isFeatured ? 'Featured' : 'Regular'}: ${post.title}`);
  };

  return (
    <>
      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-16">
        {/* Blog Posts */}
        <div className="space-y-12">
          {/* Featured Post - Full Width */}
          {posts.length > 0 && (
            <div className="w-full" onClick={() => handleBlogCardClick(posts[0], true)}>
              <BlogCard key={posts[0].slug} post={posts[0]} featured={true} />
            </div>
          )}
          
          {/* Remaining Posts - Grid Layout */}
          {posts.length > 1 && (
            <div className="grid gap-8 md:grid-cols-2">
              {posts.slice(1).map((post) => (
                <div key={post.slug} onClick={() => handleBlogCardClick(post, false)}>
                  <BlogCard post={post} />
                </div>
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
    </>
  );
}
