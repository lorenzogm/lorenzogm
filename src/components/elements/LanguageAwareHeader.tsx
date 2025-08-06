'use client';

import { usePathname } from 'next/navigation';
import { Link } from '@/components/elements/Link';
import { LanguageSwitcher } from '@/components/elements/LanguageSwitcher';

export function LanguageAwareHeader() {
  const pathname = usePathname();
  const isSpanish = pathname.startsWith('/es');
  const currentLang = isSpanish ? 'es' : 'en';
  
  const homeUrl = isSpanish ? '/es' : '/';
  const subtitle = isSpanish 
    ? 'Reflexiones sobre desarrollo web, ingeniería de software y prácticas tecnológicas modernas'
    : 'Insights on web development, software engineering, and modern tech practices';

  return (
    <div className="text-center relative">
      <div className="absolute top-0 right-0">
        <LanguageSwitcher currentLang={currentLang} />
      </div>
      <Link 
        href={homeUrl} 
        unstyled 
        className="inline-block hover:opacity-80 transition-opacity duration-200"
        event={{
          category: "Navigation",
          action: "Logo Click",
          name: `Header Logo ${currentLang.toUpperCase()}`
        }}
      >
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-3">
          Lorenzo<span className="text-red-600"> GM</span>
        </h1>
      </Link>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
        {subtitle}
      </p>
      <div className="mt-6 w-20 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto rounded-full"></div>
    </div>
  );
}