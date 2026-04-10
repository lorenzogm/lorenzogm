import { Button } from "@/components/elements/button";

interface ErrorPageProps {
  title?: string;
  message?: string;
  showRetryButton?: boolean;
  onRetry?: () => void;
}

export function ErrorPage({
  title = "Something went wrong",
  message = "We're sorry, but something unexpected happened. Please try again later.",
  showRetryButton = true,
  onRetry,
}: ErrorPageProps) {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="py-16 text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
        <svg
          className="h-8 w-8 text-red-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <title>Error icon</title>
          <path
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      </div>

      <h2 className="mb-4 font-bold text-2xl text-gray-900">{title}</h2>
      <p className="mx-auto mb-8 max-w-md text-gray-600 text-lg leading-relaxed">
        {message}
      </p>

      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        <Button
          className="hover:-translate-y-0.5 inline-flex transform items-center rounded-xl bg-gradient-to-r from-red-600 to-red-700 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:from-red-700 hover:to-red-800 hover:shadow-xl"
          event={{ category: "Error Page", action: "Go Home" }}
          href="/"
        >
          <svg
            className="mr-2 h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <title>Home icon</title>
            <path
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
          Go Home
        </Button>

        {showRetryButton && (
          <Button
            className="hover:-translate-y-0.5 inline-flex transform items-center rounded-xl border-2 border-red-200 bg-white px-6 py-3 font-semibold text-red-600 shadow-lg transition-all duration-200 hover:border-red-300 hover:bg-red-50 hover:shadow-xl"
            event={{ category: "Error Page", action: "Try Again" }}
            onClick={handleRetry}
          >
            <svg
              className="mr-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <title>Retry icon</title>
              <path
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
}
