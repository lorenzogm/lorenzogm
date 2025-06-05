'use client';

import { usePiwikPro } from '@piwikpro/next-piwik-pro';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function useAnalytics() {
  const { PageViews, CustomEvent, GoalConversions, SiteSearch } = usePiwikPro();
  const pathname = usePathname();

  useEffect(() => {
    // Track page views on route changes
    PageViews.trackPageView();
  }, [pathname, PageViews]);

  return {
    // Simple wrapper functions to handle the API correctly
    trackEvent: (category: string, action: string, name?: string, value?: number) => {
      try {
        CustomEvent.trackEvent(category, action, name || '', value || 0);
      } catch (error) {
        console.warn('Analytics trackEvent error:', error);
      }
    },
    trackGoal: (goalId: number, customRevenue?: number) => {
      try {
        // GoalConversions.trackGoal expects (goalId, customRevenue?, documentTitle?)
        GoalConversions.trackGoal(goalId, customRevenue || 0);
      } catch (error) {
        console.warn('Analytics trackGoal error:', error);
      }
    },
    trackSiteSearch: (keyword: string, category?: string, resultsCount?: number) => {
      try {
        SiteSearch.trackSiteSearch(keyword, category || '', resultsCount || 0);
      } catch (error) {
        console.warn('Analytics trackSiteSearch error:', error);
      }
    },
    trackPageView: (title?: string) => {
      try {
        if (title) {
          PageViews.trackPageView(title);
        } else {
          PageViews.trackPageView();
        }
      } catch (error) {
        console.warn('Analytics trackPageView error:', error);
      }
    },
  };
}

// Client component for analytics tracking
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useAnalytics(); // This will handle automatic page view tracking
  return <>{children}</>;
}
