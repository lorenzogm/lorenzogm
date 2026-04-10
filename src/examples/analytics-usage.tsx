// Example: How to use Umami analytics in your components

"use client";

import { useAnalytics } from "@/components/analytics";

export function ExampleComponent() {
  const { trackEvent } = useAnalytics();

  const handleDownload = () => {
    trackEvent("Download: PDF", { name: "React Guide", value: 1 });
  };

  const handleNewsletterSignup = () => {
    trackEvent("Newsletter: Signup", { form: "Footer Form" });
  };

  const handleSearch = (query: string, resultsCount: number) => {
    trackEvent("Search", { query, resultsCount });
  };

  const handleCustomPageView = () => {
    trackEvent("Page View", { title: "Custom Page Title" });
  };

  return (
    <div className="space-y-4">
      <button
        className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        onClick={handleDownload}
        type="button"
      >
        Download PDF (Tracked)
      </button>

      <button
        className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        onClick={handleNewsletterSignup}
        type="button"
      >
        Subscribe Newsletter (Event)
      </button>

      <button
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        onClick={() => handleSearch("next.js tutorial", 5)}
        type="button"
      >
        Simulate Search (5 results)
      </button>

      <button
        className="rounded bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
        onClick={handleCustomPageView}
        type="button"
      >
        Track Custom Page View
      </button>
    </div>
  );
}

export function ExternalLink({
  href,
  children,
  category = "External Link",
}: {
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
      className="text-red-600 underline hover:text-red-800"
      href={href}
      onClick={handleClick}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
}

export function ContactForm() {
  const { trackEvent } = useAnalytics();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent("Form: Submit", { form: "Contact Form" });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input
        className="w-full rounded border p-2"
        placeholder="Email"
        required
        type="email"
      />
      <textarea
        className="w-full rounded border p-2"
        placeholder="Message"
        required
      />
      <button
        className="rounded bg-red-600 px-6 py-2 text-white hover:bg-red-700"
        type="submit"
      >
        Send Message (Tracked)
      </button>
    </form>
  );
}
