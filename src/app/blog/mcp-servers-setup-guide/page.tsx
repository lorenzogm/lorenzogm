'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export const metadata = {
  title: 'Redirecting... | Lorenzo GM',
  robots: {
    index: false,
    follow: false,
  },
};

export default function RedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the new URL
    router.replace('/blog/mcp-servers-cheatsheet');
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Redirecting...</h1>
        <p className="text-gray-600">
          You are being redirected to the updated article.
        </p>
        <p className="text-sm text-gray-500 mt-4">
          If you are not redirected automatically,{' '}
          <Link 
            href="/blog/mcp-servers-cheatsheet" 
            className="text-blue-600 hover:text-blue-800 underline"
          >
            click here
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
