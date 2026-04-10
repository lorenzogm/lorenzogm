import { useLocation, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export function SearchBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isSpanish = location.pathname.startsWith("/es");
  const currentLang = isSpanish ? "es" : "en";
  const [query, setQuery] = useState("");

  const placeholder = isSpanish ? "Buscar artículos..." : "Search articles...";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    navigate({
      to: "/$lang/search",
      params: { lang: currentLang },
      search: trimmed ? { q: trimmed } : {},
    });
  }

  function handleClear() {
    setQuery("");
    navigate({
      to: "/$lang/search",
      params: { lang: currentLang },
      search: {},
    });
  }

  return (
    <form className="mx-auto w-full max-w-xl" onSubmit={handleSubmit}>
      <div className="relative">
        <input
          className="w-full rounded-full border border-gray-300 bg-gray-50 py-3 pr-20 pl-5 text-gray-900 placeholder-gray-400 transition-colors focus:border-red-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-200"
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          type="text"
          value={query}
        />
        {query && (
          <button
            className="absolute top-1/2 right-10 -translate-y-1/2 rounded-full p-1 text-gray-400 transition-colors hover:text-gray-600"
            onClick={handleClear}
            type="button"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <title>{isSpanish ? "Borrar" : "Clear"}</title>
              <path
                d="M6 18L18 6M6 6l12 12"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </button>
        )}
        <button
          className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-gray-400 transition-colors hover:text-red-600"
          type="submit"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <title>Search</title>
            <path
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </button>
      </div>
    </form>
  );
}
