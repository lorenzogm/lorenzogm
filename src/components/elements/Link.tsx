import { ReactNode } from 'react';
import { Link as RouterLink } from '@tanstack/react-router';
import { useAnalytics } from '@/components/Analytics';

interface AnalyticsEvent {
  category: string;
  action: string;
  name?: string;
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
  const { trackEvent } = useAnalytics();

  const handleClick = () => {
    if (event) {
      const eventName = `${event.category}: ${event.action}`;
      trackEvent(eventName, event.name ? { name: event.name } : undefined);
    }
  };

  const defaultStyles = unstyled 
    ? '' 
    : 'text-blue-600 hover:text-blue-800 underline transition-colors duration-200';

  const combinedClassName = unstyled 
    ? className 
    : `${defaultStyles} ${className}`.trim();

  // External links
  if (href.startsWith('http') || href.startsWith('mailto:')) {
    return (
      <a
        href={href}
        className={combinedClassName}
        onClick={handleClick}
        target={target || '_blank'}
        rel={rel || 'noopener noreferrer'}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <RouterLink
      to={href}
      className={combinedClassName}
      onClick={handleClick}
      target={target}
      rel={rel}
      {...props}
    >
      {children}
    </RouterLink>
  );
}
