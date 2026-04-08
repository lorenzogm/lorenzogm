# Analytics Setup - Umami

This project uses [Umami](https://umami.is/) for privacy-friendly website analytics.

## Setup Instructions

### 1. Configure Environment Variables

Copy the example environment file and add your Umami configuration:

```bash
cp .env.example .env.local
```

Then edit `.env.local` and add your Umami details:

```env
# Your Umami website ID (UUID format, found in Umami dashboard under Settings → Websites)
VITE_UMAMI_WEBSITE_ID=your-website-id-here

# Your Umami script URL
# For Umami Cloud use: https://cloud.umami.is/script.js
# For self-hosted use: https://your-umami-instance.com/script.js
VITE_UMAMI_URL=https://cloud.umami.is/script.js
```

### 2. Umami Account Setup

If you don't have an Umami account yet:

1. **Sign up**: Visit [cloud.umami.is](https://cloud.umami.is/) and create a free account
2. **Add website**: Add your website in the Umami dashboard
3. **Get Website ID**: Find your Website ID under Settings → Websites

### 3. How It Works

The Umami script is injected into the `<head>` of every page via the root route (`src/routes/__root.tsx`). It uses the `VITE_UMAMI_WEBSITE_ID` and `VITE_UMAMI_URL` environment variables set at build time.

- **Automatic page view tracking**: Umami automatically tracks page views, including SPA navigation
- **Event tracking**: Use the `useAnalytics` hook from `@/components/Analytics` to track custom events

### 4. Custom Event Tracking

Use the `useAnalytics` hook for custom event tracking:

```tsx
import { useAnalytics } from '@/components/Analytics';

function MyComponent() {
  const { trackEvent } = useAnalytics();

  const handleClick = () => {
    trackEvent('Button Click', { name: 'CTA Button' });
  };

  return <button onClick={handleClick}>Click me</button>;
}
```

## Privacy Features

Umami is privacy-focused by default:
- **No cookies**: Uses a cookieless tracking approach
- **GDPR compliant**: Does not collect personal data
- **Open source**: Fully transparent tracking code
- **Self-hostable**: Can be run on your own infrastructure

## Troubleshooting

1. **No data in dashboard**: Ensure `VITE_UMAMI_WEBSITE_ID` is set correctly and matches the ID in your Umami dashboard
2. **Script not loading**: Check that `VITE_UMAMI_URL` points to the correct Umami instance
3. **Events not tracking**: Verify `window.umami` is available before calling track methods
