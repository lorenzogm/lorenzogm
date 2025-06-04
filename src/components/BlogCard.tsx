import Link from 'next/link';
import Image from 'next/image';
import { BlogPostMetadata } from '@/lib/blog';
import { formatDate } from '@/lib/utils';

interface BlogCardProps {
  post: BlogPostMetadata;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <article className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-red-100/50">
      <Link href={`/blog/${post.slug}`}>
        <div className={`relative w-full ${featured ? 'h-64 md:h-80' : 'h-48'} overflow-hidden`}>
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
        <div className="p-6">
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <time dateTime={post.date} className="font-medium">{formatDate(post.date)}</time>
            <span className="mx-2 text-red-400">•</span>
            <span className="font-medium">{post.author}</span>
          </div>
          
          <h2 className={`${featured ? 'text-2xl md:text-3xl' : 'text-xl'} font-bold text-gray-900 mb-3 hover:text-red-600 transition-colors duration-200 leading-tight`}>
            {post.title}
          </h2>
          
          <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
            {post.excerpt}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-red-50 text-red-700 text-xs font-semibold px-3 py-1 rounded-full border border-red-200/50 hover:bg-red-100 transition-colors duration-200"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center text-red-600 font-semibold text-sm hover:text-red-700 transition-colors duration-200 group">
            Read more 
            <svg className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </Link>
    </article>
  );
}
