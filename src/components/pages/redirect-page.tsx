import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Link } from "@/components/elements/link";

interface RedirectPageProps {
  redirectTo: string;
  title?: string;
  message?: string;
}

export default function RedirectPage({
  redirectTo,
  title = "Redirecting...",
  message = "You are being redirected to the updated article.",
}: RedirectPageProps) {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the new URL
    navigate({ to: redirectTo, replace: true });
  }, [navigate, redirectTo]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="mb-4 font-bold text-2xl text-gray-900">{title}</h1>
        <p className="text-gray-600">{message}</p>
        <p className="mt-4 text-gray-500 text-sm">
          If you are not redirected automatically,{" "}
          <Link
            event={{
              category: "Redirect",
              action: "Manual Click",
              name: redirectTo,
            }}
            href={redirectTo}
          >
            click here
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
