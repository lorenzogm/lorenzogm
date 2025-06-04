'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface RedirectPageProps {
  redirectTo: string;
  title?: string;
  message?: string;
}

export default function RedirectPage({ 
  redirectTo, 
  title = "Redirecting...",
  message = "You are being redirected to the updated article."
}: RedirectPageProps) {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the new URL
    router.replace(redirectTo);
  }, [router, redirectTo]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-gray-600">
          {message}
        </p>
        <p className="text-sm text-gray-500 mt-4">
          If you are not redirected automatically,{' '}
          <Link 
            href={redirectTo}
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
