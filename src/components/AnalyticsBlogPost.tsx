'use client';

import { useEffect } from 'react';
import { useAnalytics } from '@/components/Analytics';
import Link from 'next/link';
import { BlogPost } from '@/lib/blog';

interface AnalyticsBlogPostProps {
  post: BlogPost;
}

export function AnalyticsBlogPost({ post }: AnalyticsBlogPostProps) {
  const { trackEvent, trackGoal } = useAnalytics();

  useEffect(() => {
    // Track blog post read event
    trackEvent('Blog', 'Article View', post.title);
    
    // Track reading goal (if configured in Piwik PRO)
    trackGoal(1); // Assuming goal ID 1 is for blog post reads
    
    // Track article category/tags
    post.tags.forEach(tag => {
      trackEvent('Blog', 'Tag View', tag);
    });
  }, [post, trackEvent, trackGoal]);

  const handleBackClick = () => {
    trackEvent('Navigation', 'Back Click', 'Article to Homepage');
  };

  const handleNavigationClick = () => {
    trackEvent('Navigation', 'Header Back', 'Article Navigation');
  };

  return (
    <>
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-red-100/50">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <Link 
            href="/" 
            onClick={handleNavigationClick}
            className="inline-flex items-center text-red-600 hover:text-red-700 font-semibold transition-colors duration-200 group"
          >
            <svg className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to Blog
          </Link>
        </div>
      </nav>

      {/* Back to Blog Button */}
      <div className="mt-16 text-center">
        <Link 
          href="/"
          onClick={handleBackClick}
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 group"
        >
          <svg className="w-5 h-5 mr-2 transition-transform duration-200 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          Back to All Posts
        </Link>
      </div>
    </>
  );
}
