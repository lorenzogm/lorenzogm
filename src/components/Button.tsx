'use client';

import React from 'react';
import Link from 'next/link';
import { useAnalytics } from '@/components/Analytics';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  // Button-specific props
  type?: 'button' | 'submit' | 'reset';
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
    goalId?: number;
    goalRevenue?: number;
  };
}

export function Button({
  children,
  className = '',
  disabled = false,
  type = 'button',
  onClick,
  href,
  external = false,
  target,
  rel,
  event,
  ...props
}: ButtonProps) {
  const { trackEvent, trackGoal } = useAnalytics();

  const handleClick = () => {
    // Track analytics if provided
    if (event?.category && event?.action) {
      trackEvent(event.category, event.action, event.name, event.value);
    }
    
    // Track goal if provided
    if (event?.goalId) {
      trackGoal(event.goalId, event.goalRevenue);
    }
    
    // Call original onClick
    if (onClick) {
      onClick();
    }
  };

  // Render as link if href is provided
  if (href) {
    // External link
    if (external || href.startsWith('http') || href.startsWith('mailto:')) {
      return (
        <a
          href={href}
          onClick={handleClick}
          target={target || '_blank'}
          rel={rel || 'noopener noreferrer'}
          className={className}
          {...props}
        >
          {children}
        </a>
      );
    }

    // Internal link using Next.js Link
    return (
      <Link
        href={href}
        onClick={handleClick}
        className={className}
        {...props}
      >
        {children}
      </Link>
    );
  }

  // Render as button
  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
}
