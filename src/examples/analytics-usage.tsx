// Example: How to use Umami analytics in your components

'use client';

import { useAnalytics } from '@/components/Analytics';

export function ExampleComponent() {
  const { trackEvent } = useAnalytics();

  // Example: Track button clicks
  const handleDownload = () => {
    trackEvent('Download: PDF', { name: 'React Guide', value: 1 });
    // This will track the event name "Download: PDF" with additional data
  };

  // Example: Track newsletter signup
  const handleNewsletterSignup = () => {
    trackEvent('Newsletter: Signup', { form: 'Footer Form' });
  };

  // Example: Track search functionality
  const handleSearch = (query: string, resultsCount: number) => {
    trackEvent('Search', { query, resultsCount });
  };

  // Example: Manual page view tracking
  const handleCustomPageView = () => {
    trackEvent('Page View', { title: 'Custom Page Title' });
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
        Subscribe Newsletter (Event)
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
    trackEvent(`${category}: Click`, { href });
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
  const { trackEvent } = useAnalytics();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track form submission event
    trackEvent('Form: Submit', { form: 'Contact Form' });
    
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
