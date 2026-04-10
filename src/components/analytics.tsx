declare global {
  interface Window {
    umami?: {
      track: (eventName: string, data?: Record<string, unknown>) => void;
    };
  }
}

export function useAnalytics() {
  const trackEvent = (eventName: string, data?: Record<string, unknown>) => {
    try {
      window.umami?.track(eventName, data);
    } catch (error) {
      console.warn("Analytics trackEvent error:", error);
    }
  };

  return { trackEvent };
}
