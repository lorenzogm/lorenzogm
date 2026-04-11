import { useLocation } from "@tanstack/react-router";
import { Link } from "@/components/elements/link";

interface LanguageSwitcherProps {
  currentLang: "en" | "es";
}

const EN_PREFIX = /^\/en/;
const ES_PREFIX = /^\/es/;

export function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  const location = useLocation();
  const pathname = location.pathname;

  // Generate the alternative URL for the other language
  const getAlternativeUrl = () => {
    if (currentLang === "en") {
      return pathname.replace(EN_PREFIX, "/es");
    }
    return pathname.replace(ES_PREFIX, "/en");
  };

  const alternativeUrl = getAlternativeUrl();
  const isEnglish = currentLang === "en";

  const englishLabel = isEnglish ? "English" : "Inglés";
  const spanishLabel = isEnglish ? "Spanish" : "Español";

  return (
    <div className="flex items-center space-x-2 text-sm">
      <span
        className={`rounded px-2 py-1 ${isEnglish ? "bg-red-600 text-white" : "text-gray-600 hover:text-gray-900"}`}
      >
        {isEnglish ? (
          englishLabel
        ) : (
          <Link
            event={{
              category: "Navigation",
              action: "Language Switch",
              name: "English",
            }}
            href={alternativeUrl}
            unstyled
          >
            {englishLabel}
          </Link>
        )}
      </span>
      <span className="text-gray-400">|</span>
      <span
        className={`rounded px-2 py-1 ${isEnglish ? "text-gray-600 hover:text-gray-900" : "bg-red-600 text-white"}`}
      >
        {isEnglish ? (
          <Link
            event={{
              category: "Navigation",
              action: "Language Switch",
              name: "Spanish",
            }}
            href={alternativeUrl}
            unstyled
          >
            {spanishLabel}
          </Link>
        ) : (
          spanishLabel
        )}
      </span>
    </div>
  );
}
