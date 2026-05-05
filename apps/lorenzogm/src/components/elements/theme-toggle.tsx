import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

function resolveInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function ThemeToggle({ lang }: { lang: "en" | "es" }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(resolveInitialTheme());
    setMounted(true);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  }

  const labels = {
    en: { light: "Switch to dark theme", dark: "Switch to light theme" },
    es: { light: "Cambiar a tema oscuro", dark: "Cambiar a tema claro" },
  } as const;

  const current = mounted ? theme : "light";
  const label = current === "dark" ? labels[lang].dark : labels[lang].light;

  return (
    <button
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-colors hover:border-red-300 hover:text-red-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-red-500/60 dark:hover:text-red-400"
      onClick={toggle}
      title={label}
      type="button"
    >
      {/* Sun icon shown in light mode (click to go dark) */}
      <svg
        aria-hidden="true"
        className={`h-5 w-5 ${current === "light" ? "" : "hidden"}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <title>Light</title>
        <circle cx="12" cy="12" r="4" />
        <path
          d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
          strokeLinecap="round"
        />
      </svg>
      {/* Moon icon shown in dark mode (click to go light) */}
      <svg
        aria-hidden="true"
        className={`h-5 w-5 ${current === "dark" ? "" : "hidden"}`}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <title>Dark</title>
        <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
      </svg>
    </button>
  );
}
