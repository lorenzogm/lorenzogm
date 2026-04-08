import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Link } from '@/components/elements/Link';

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
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the new URL
    navigate({ to: redirectTo, replace: true });
  }, [navigate, redirectTo]);

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
            event={{ category: 'Redirect', action: 'Manual Click', name: redirectTo }}
          >
            click here
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
