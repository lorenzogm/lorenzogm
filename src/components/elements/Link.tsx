
'use client'
import { ReactNode } from 'react';
import NextLink from 'next/link';

interface AnalyticsEvent {
  category: string;
  action: string;
  name?: string;
  value?: number;
}

interface LinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  unstyled?: boolean;
  event?: AnalyticsEvent;
  target?: string;
  rel?: string;
}

export function Link({ 
  href, 
  children, 
  className = '', 
  unstyled = false,
  event,
  target,
  rel,
  ...props 
}: LinkProps) {
  const handleClick = () => {
    if (event && typeof window !== 'undefined') {
      // Track analytics event if available
      if (window.gtag) {
        window.gtag('event', event.action, {
          event_category: event.category,
          event_label: event.name,
          value: event.value,
        });
      }
      
      // Track with PiwikPro if available
      if (window._paq) {
        window._paq.push(['trackEvent', event.category, event.action, event.name, event.value]);
      }
    }
  };

  const defaultStyles = unstyled 
    ? '' 
    : 'text-blue-600 hover:text-blue-800 underline transition-colors duration-200';

  const combinedClassName = unstyled 
    ? className 
    : `${defaultStyles} ${className}`.trim();

  return (
    <NextLink 
      href={href} 
      className={combinedClassName}
      onClick={handleClick}
      target={target}
      rel={rel}
      {...props}
    >
      {children}
    </NextLink>
  );
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag?: (command: string, action: string, parameters?: Record<string, unknown>) => void;
    _paq?: Array<Array<string | number | undefined>>;
  }
}
