'use client';

import { usePathname } from 'next/navigation';
import { Link } from '@/components/elements/Link';

interface LanguageSwitcherProps {
  currentLang: 'en' | 'es';
}

export function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  const pathname = usePathname();
  
  // Generate the alternative URL for the other language
  const getAlternativeUrl = () => {
    if (currentLang === 'en') {
      // Switch to Spanish
      if (pathname === '/') {
        return '/es';
      }
      if (pathname.startsWith('/blog/')) {
        return `/es${pathname}`;
      }
      return `/es${pathname}`;
    } else {
      // Switch to English
      if (pathname === '/es') {
        return '/';
      }
      if (pathname.startsWith('/es/blog/')) {
        return pathname.replace('/es', '');
      }
      if (pathname.startsWith('/es/')) {
        return pathname.replace('/es', '');
      }
      return pathname.replace('/es', '');
    }
  };

  const alternativeUrl = getAlternativeUrl();
  const isEnglish = currentLang === 'en';

  return (
    <div className="flex items-center space-x-2 text-sm">
      <span className={`px-2 py-1 rounded ${isEnglish ? 'bg-red-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}>
        {isEnglish ? (
          'English'
        ) : (
          <Link href={alternativeUrl} unstyled>
            English
          </Link>
        )}
      </span>
      <span className="text-gray-400">|</span>
      <span className={`px-2 py-1 rounded ${!isEnglish ? 'bg-red-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}>
        {!isEnglish ? (
          'Spanish'
        ) : (
          <Link href={alternativeUrl} unstyled>
            Spanish
          </Link>
        )}
      </span>
    </div>
  );
}