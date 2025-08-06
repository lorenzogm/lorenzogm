import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPostSlugs } from '@/lib/blog';
import { ArticleDetailPage } from '@/components/pages/ArticleDetailPage';

interface SpanishBlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs('es'); // Spanish posts
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: SpanishBlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug, 'es'); // Spanish post
  
  if (!post) {
    return {
      title: 'Artículo No Encontrado',
    };
  }

  const baseUrl = 'https://lorenzogm.com';
  const postUrl = `${baseUrl}/es/blog/${slug}`;

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
      languages: {
        'en': `${baseUrl}/blog/${slug}`,
        'es': postUrl,
      },
    },
    other: {
      'og:url': postUrl,
      'og:type': 'article',
      'og:title': post.title,
      'og:description': post.excerpt,
      'og:image': post.image,
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:alt': post.title,
      'og:site_name': 'Lorenzo GM - Blog de Tecnología',
      'article:published_time': post.date,
      'article:author': post.author,
      'article:tag': post.tags.join(','),
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      siteName: 'Lorenzo GM - Blog de Tecnología',
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: 'es_ES',
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      creator: '@lorenzogm',
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

export default async function SpanishBlogPostPage({ params }: SpanishBlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug, 'es'); // Spanish post

  if (!post) {
    notFound();
  }

  return (
    <ArticleDetailPage 
      post={post}
    />
  );
}