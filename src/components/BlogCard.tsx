import Link from 'next/link';
import Image from 'next/image';
import { BlogPostMetadata } from '@/lib/blog';
import { formatDate } from '@/lib/utils';

interface BlogCardProps {
  post: BlogPostMetadata;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative h-48 w-full">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="mx-2">•</span>
            <span>{post.author}</span>
          </div>
          
          <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors duration-200">
            {post.title}
          </h2>
          
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {post.excerpt}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="text-blue-600 font-medium text-sm hover:text-blue-800 transition-colors duration-200">
            Read more →
          </div>
        </div>
      </Link>
    </article>
  );
}
