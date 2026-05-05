import { useLocation } from "@tanstack/react-router";
import { LanguageSwitcher } from "@/components/elements/language-switcher";
import { Link } from "@/components/elements/link";
import { ThemeToggle } from "@/components/elements/theme-toggle";

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
        {/* Desktop language switcher + theme toggle - positioned at top right */}
        <div className="absolute top-0 right-0 hidden items-center gap-3 md:flex">
          <LanguageSwitcher currentLang={currentLang} />
          <ThemeToggle lang={currentLang} />
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
          <h1 className="mb-3 font-bold text-5xl text-gray-900 md:text-6xl dark:text-zinc-100">
            Lorenzo<span className="text-red-600 dark:text-red-400"> GM</span>
          </h1>
        </Link>
        <p className="mx-auto max-w-2xl text-gray-600 text-xl leading-relaxed dark:text-zinc-400">
          {subtitle}
        </p>
        <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-red-500 to-red-600 dark:from-red-400 dark:to-red-500" />
      </div>
      {/* Mobile language switcher + theme toggle - positioned below the red line */}
      <div className="mt-4 flex items-center justify-center gap-3 md:hidden">
        <LanguageSwitcher currentLang={currentLang} />
        <ThemeToggle lang={currentLang} />
      </div>
    </div>
  );
}
