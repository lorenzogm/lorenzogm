# Analytics Setup - Piwik PRO

This project is configured to use Piwik PRO analytics for privacy-friendly website tracking with advanced features and GDPR compliance.

## Setup Instructions

### 1. Configure Environment Variables

Copy the example environment file and add your Piwik PRO configuration:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` and add your Piwik PRO details:

```env
# Your Piwik PRO container URL (without trailing slash)
NEXT_PUBLIC_PIWIK_PRO_CONTAINER_URL=https://yourcontainer.containers.piwik.pro

# Your Piwik PRO container ID (UUID format)
NEXT_PUBLIC_PIWIK_PRO_CONTAINER_ID=your-container-id-here

# Optional: Set to 'false' to disable analytics in development
NEXT_PUBLIC_ANALYTICS_ENABLED=true
```

### 2. Piwik PRO Account Setup

If you don't have a Piwik PRO account yet:

1. **Sign up**: Visit [piwik.pro](https://piwik.pro/) and create a free Core account
2. **Create a container**: Set up a new website/app container in your dashboard
3. **Get credentials**: Find your container URL and container ID in the administration panel

### 3. Find Your Container Details

1. Log into your Piwik PRO dashboard
2. Go to Administration → Sites & apps
3. Your Container URL and Container ID will be displayed
4. The Container ID is in UUID format (e.g., `2f838906-bc3f-479b-815b-ea0852900468`)

### 4. Verify Setup

After configuration, the analytics will automatically:
- Track page views on all pages
- Track route changes in the SPA
- Respect user privacy settings
- Work in production only (unless you enable it in development)
- Provide GDPR-compliant tracking

## Real Analytics Implementation

This project uses analytics-enabled components that track user interactions automatically. The analytics are integrated seamlessly into the UI components without affecting the existing page structure.

### Button Component with Analytics

The project includes a `Button` component that automatically tracks clicks, conversions, and other events:

```tsx
import { Button } from '@/components/Button';

// Example: Blog card with automatic click tracking
<Button
  href={`/blog/${post.slug}`}
  event={{
    category: "Blog",
    action: "Card Click",
    name: post.title,
    value: featured ? 2 : 1,
    goalId: 1 // Optional: track conversion goal
  }}
  className="block w-full text-left"
>
  Read Article
</Button>

// Example: Download button with event tracking
<Button
  onClick={handleDownload}
  event={{
    category: "Download",
    action: "PDF",
    name: "React Guide",
    goalId: 2
  }}
  className="inline-flex items-center px-6 py-3 bg-white text-red-600 font-semibold rounded-xl border-2 border-red-600 hover:bg-red-50 transition-all duration-200"
>
  Download PDF
</Button>

// Example: External link tracking
<Button
  href="https://github.com/lorenzogm"
  external
  event={{
    category: "External Link",
    action: "GitHub",
    name: "Profile"
  }}
  className="inline-flex items-center text-red-600 hover:text-red-700 font-semibold transition-colors duration-200"
>
  View on GitHub
</Button>
```

### Button Component

The `Button` component is a unified component that renders either a button or link based on whether an `href` prop is provided:

- When `href` is provided, it renders as a link (using Next.js `Link` for internal URLs or `<a>` for external)
- When no `href` is provided, it renders as a button
- All variants automatically track analytics when analytics props are provided

### Event Object

The Button component accepts an optional `event` object prop for analytics tracking:

```tsx
event?: {
  category?: string;    // Event category (e.g., 'Blog', 'Download', 'Navigation')
  action?: string;      // Event action (e.g., 'Click', 'View', 'Submit')
  name?: string;        // Event name/label (e.g., post title, file name)
  value?: number;       // Numeric value (e.g., 1 for regular, 2 for featured)
  goalId?: number;      // Goal ID for conversion tracking (configured in Piwik PRO)
  goalRevenue?: number; // Optional revenue value for the goal
}
```

### Page View Tracking

Page views are tracked automatically on all pages through the `AnalyticsProvider` component in the root layout. No additional code is needed for basic page view analytics.

## Privacy Features

Piwik PRO is privacy-focused by default and includes:
- **GDPR compliance**: Built-in consent management
- **HIPAA compliance**: Available for healthcare organizations
- **Cookie-less tracking**: Optional cookieless analytics
- **Data residency**: Choose where your data is stored
- **IP anonymization**: Automatic IP address anonymization
- **Do Not Track respect**: Honors browser DNT headers
- **Custom consent**: Flexible consent management options

## Development vs Production

- Analytics are disabled in development by default
- Set `NEXT_PUBLIC_ANALYTICS_ENABLED=true` to enable in development
- Always enabled in production when properly configured
- Automatic page view tracking on route changes

## Piwik PRO Features

This implementation provides access to:
- **Web Analytics**: Page views, sessions, user behavior
- **Tag Manager**: Manage marketing tags without code changes
- **Customer Data Platform**: Unified customer profiles
- **Consent Manager**: GDPR-compliant consent collection
- **Server-side tracking**: Enhanced privacy and reliability

## Troubleshooting

### Common Issues

1. **Analytics not working**: Check that environment variables are set correctly
2. **TypeScript errors**: Ensure `@piwikpro/next-piwik-pro` is installed
3. **Console errors**: Verify container URL and ID are correct
4. **No data in dashboard**: Check that the website URL matches your domain

### Debug Mode

Enable debug logging in development:

```tsx
// In your component
const { trackEvent } = useAnalytics();

// Events will show warnings in console if they fail
trackEvent('Debug', 'Test Event');
```

## Additional Resources

- [Piwik PRO Documentation](https://developers.piwik.pro/)
- [Next.js Integration Guide](https://developers.piwik.pro/docs/nextjs)
- [Privacy Compliance](https://piwik.pro/privacy-compliance/)
- [GDPR Compliance Guide](https://piwik.pro/gdpr/)
