import { Link as RouterLink } from "@tanstack/react-router";
import type React from "react";
import { useAnalytics } from "@/components/analytics";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  // Button-specific props
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  // Link-specific props (if href is provided, renders as link)
  href?: string;
  external?: boolean;
  target?: string;
  rel?: string;
  // Analytics and tracking
  event?: {
    category?: string;
    action?: string;
    name?: string;
    value?: number;
  };
}

export function Button({
  children,
  className = "",
  disabled = false,
  type = "button",
  onClick,
  href,
  external = false,
  target,
  rel,
  event,
  ...props
}: ButtonProps) {
  const { trackEvent } = useAnalytics();

  const handleClick = () => {
    // Track analytics if provided
    if (event?.action) {
      const eventName = event.category
        ? `${event.category}: ${event.action}`
        : event.action;
      const data: Record<string, unknown> = {};
      if (event.name) data.name = event.name;
      if (event.value !== undefined) data.value = event.value;
      trackEvent(eventName, Object.keys(data).length > 0 ? data : undefined);
    }

    // Call original onClick
    if (onClick) {
      onClick();
    }
  };

  // Render as link if href is provided
  if (href) {
    // External link
    if (external || href.startsWith("http") || href.startsWith("mailto:")) {
      return (
        <a
          className={className}
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

    // Internal link using TanStack Router Link
    return (
      <RouterLink
        className={className}
        onClick={handleClick}
        to={href}
        {...props}
      >
        {children}
      </RouterLink>
    );
  }

  // Render as button
  return (
    <button
      className={className}
      disabled={disabled}
      onClick={handleClick}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
