import { getAllPosts, BlogPostMetadata } from '@/lib/blog';
import { BlogCard } from '@/components/patterns/BlogCard';
import { ErrorPage } from '@/components/pages/ErrorPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Lorenzo GM - Blog de Tecnología",
  description: "Las reflexiones de Lorenzo GM sobre desarrollo web, ingeniería de software y prácticas tecnológicas modernas. Explorando Next.js, React, TypeScript y mejores prácticas de desarrollo.",
  keywords: ["Lorenzo GM", "desarrollo web", "Next.js", "React", "TypeScript", "JavaScript", "ingeniería de software", "blog de tecnología"],
  authors: [{ name: "Lorenzo GM" }],
  creator: "Lorenzo GM",
  publisher: "Lorenzo GM",
  alternates: {
    canonical: "/es",
    languages: {
      'en': '/',
      'es': '/es',
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://lorenzogm.com/es",
    title: "Lorenzo GM - Blog de Tecnología",
    description: "Las reflexiones de Lorenzo GM sobre desarrollo web, ingeniería de software y prácticas tecnológicas modernas",
    siteName: "Lorenzo GM - Blog de Tecnología",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lorenzo GM - Blog de Tecnología",
    description: "Las reflexiones de Lorenzo GM sobre desarrollo web, ingeniería de software y prácticas tecnológicas modernas",
    creator: "@lorenzogm",
  },
};

export default async function SpanishHome() {
  let posts: BlogPostMetadata[] = [];
  let hasError = false;
  
  try {
    posts = await getAllPosts('es'); // Spanish posts
  } catch (error) {
    console.error('Error loading Spanish posts:', error);
    hasError = true;
  }

  // Show error page if posts failed to load
  if (hasError) {
    return (
      <ErrorPage 
        title="Error al Cargar los Artículos del Blog"
        message="Estamos teniendo problemas para cargar los artículos del blog en este momento. Por favor, inténtalo de nuevo en unos momentos."
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
            <p className="text-gray-500 text-lg">No se encontraron artículos del blog.</p>
        </div>
      )}
    </>
  );
}