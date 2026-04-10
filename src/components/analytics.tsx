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
    } catch {
      // noop
    }
  };

  return { trackEvent };
}
