import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getPostBySlug, getAllPostSlugs } from '@/lib/blog';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/elements/Button';
import { Container } from '@/components/elements/Container';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const baseUrl = 'https://lorenzogm.com';
  const postUrl = `${baseUrl}/blog/${slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    authors: [{ name: post.author }],
    creator: post.author,
    publisher: 'Lorenzo GM',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      siteName: 'Lorenzo GM - Tech Blog',
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      creator: '@lorenzogm', // Update this to your actual Twitter handle
      images: [post.image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-red-50/30">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-red-100/50">
        <Container className="py-4">
          <Button
            href="/" 
            event={{
              category: "Navigation",
              action: "Back Click",
              name: "Article to Homepage"
            }}
            className="inline-flex items-center text-red-600 hover:text-red-700 font-semibold transition-colors duration-200 group"
          >
            <svg className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to Blog
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
            
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8 max-w-3xl">
              {post.excerpt}
            </p>
            
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
          </div>
          
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

          {/* Back to Blog Button */}
          <div className="mt-16 text-center">
            <Button
              href="/"
              event={{
                category: "Navigation",
                action: "Back Button Click",
                name: "Article to Homepage"
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
  );
}
