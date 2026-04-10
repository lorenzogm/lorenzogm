import { Link as RouterLink } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useAnalytics } from "@/components/analytics";

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
  className = "",
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
    ? ""
    : "text-blue-600 hover:text-blue-800 underline transition-colors duration-200";

  const combinedClassName = unstyled
    ? className
    : `${defaultStyles} ${className}`.trim();

  // External links
  if (href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a
        className={combinedClassName}
        href={href}
        onClick={handleClick}
        rel={rel || "noopener noreferrer"}
        target={target || "_blank"}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <RouterLink
      className={combinedClassName}
      onClick={handleClick}
      rel={rel}
      target={target}
      to={href}
      {...props}
    >
      {children}
    </RouterLink>
  );
}
