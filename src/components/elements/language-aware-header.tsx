import { useLocation } from "@tanstack/react-router";
import { LanguageSwitcher } from "@/components/elements/language-switcher";
import { Link } from "@/components/elements/link";

export function LanguageAwareHeader() {
  const location = useLocation();
  const isSpanish = location.pathname.startsWith("/es");
  const currentLang = isSpanish ? "es" : "en";

  const homeUrl = `/${currentLang}`;
  const subtitle = isSpanish
    ? "Reflexiones sobre desarrollo web, ingeniería de software y prácticas tecnológicas modernas"
    : "Insights on web development, software engineering, and modern tech practices";

  return (
    <div className="text-center">
      <div className="relative">
        {/* Desktop language switcher - positioned at top right */}
        <div className="absolute top-0 right-0 hidden md:block">
          <LanguageSwitcher currentLang={currentLang} />
        </div>
        <Link
          className="inline-block transition-opacity duration-200 hover:opacity-80"
          event={{
            category: "Navigation",
            action: "Logo Click",
            name: `Header Logo ${currentLang.toUpperCase()}`,
          }}
          href={homeUrl}
          unstyled
        >
          <h1 className="mb-3 font-bold text-5xl text-gray-900 md:text-6xl">
            Lorenzo<span className="text-red-600"> GM</span>
          </h1>
        </Link>
        <p className="mx-auto max-w-2xl text-gray-600 text-xl leading-relaxed">
          {subtitle}
        </p>
        <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-red-500 to-red-600" />
      </div>
      {/* Mobile language switcher - positioned below the red line */}
      <div className="mt-4 flex justify-center md:hidden">
        <LanguageSwitcher currentLang={currentLang} />
      </div>
    </div>
  );
}
