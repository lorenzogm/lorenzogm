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

  return (
    <Link href={alternativeUrl} unstyled>
      <span className="px-3 py-2 bg-red-600 text-white rounded text-sm font-medium hover:bg-red-700 transition-colors duration-200 cursor-pointer">
        {currentLang.toUpperCase()}
      </span>
    </Link>
  );
}