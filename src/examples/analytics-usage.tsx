// Example: How to use Piwik PRO analytics in your components

'use client';

import { useAnalytics } from '@/components/Analytics';

export function ExampleComponent() {
  const { trackEvent, trackGoal, trackSiteSearch, trackPageView } = useAnalytics();

  // Example: Track button clicks
  const handleDownload = () => {
    trackEvent('Download', 'PDF', 'React Guide', 1);
    // This will track: Category="Download", Action="PDF", Name="React Guide", Value=1
  };

  // Example: Track newsletter signup (goal conversion)
  const handleNewsletterSignup = () => {
    trackGoal(1); // Goal ID 1 should be configured in Piwik PRO dashboard
    trackEvent('Newsletter', 'Signup', 'Footer Form');
  };

  // Example: Track search functionality
  const handleSearch = (query: string, resultsCount: number) => {
    trackSiteSearch(query, 'blog', resultsCount);
    // This tracks internal site searches
  };

  // Example: Manual page view tracking (usually not needed as it's automatic)
  const handleCustomPageView = () => {
    trackPageView('Custom Page Title');
  };

  return (
    <div className="space-y-4">
      <button 
        onClick={handleDownload}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Download PDF (Tracked)
      </button>
      
      <button 
        onClick={handleNewsletterSignup}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Subscribe Newsletter (Goal + Event)
      </button>
      
      <button 
        onClick={() => handleSearch('next.js tutorial', 5)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Simulate Search (5 results)
      </button>
      
      <button 
        onClick={handleCustomPageView}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Track Custom Page View
      </button>
    </div>
  );
}

// Example: Track external link clicks
export function ExternalLink({ href, children, category = 'External Link' }: {
  href: string;
  children: React.ReactNode;
  category?: string;
}) {
  const { trackEvent } = useAnalytics();

  const handleClick = () => {
    trackEvent(category, 'Click', href);
  };

  return (
    <a 
      href={href} 
      onClick={handleClick}
      target="_blank" 
      rel="noopener noreferrer"
      className="text-red-600 hover:text-red-800 underline"
    >
      {children}
    </a>
  );
}

// Example: Track form submissions
export function ContactForm() {
  const { trackEvent, trackGoal } = useAnalytics();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track form submission event
    trackEvent('Form', 'Submit', 'Contact Form');
    
    // Track conversion goal (if contact form submission is a goal)
    trackGoal(2); // Goal ID 2 for contact form submissions
    
    // Your form submission logic here
    console.log('Form submitted and tracked');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input 
        type="email" 
        placeholder="Email"
        className="w-full p-2 border rounded"
        required
      />
      <textarea 
        placeholder="Message"
        className="w-full p-2 border rounded"
        required
      />
      <button 
        type="submit"
        className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
      >
        Send Message (Tracked)
      </button>
    </form>
  );
}
