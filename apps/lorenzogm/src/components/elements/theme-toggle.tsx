import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "theme";

function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "system";
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === "light" || v === "dark" ? v : "system";
}

function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = theme === "dark" || (theme === "system" && prefersDark);
  document.documentElement.classList.toggle("dark", isDark);
}

export function ThemeToggle({ lang }: { lang: "en" | "es" }) {
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  // Read the stored preference once on mount.
  useEffect(() => {
    setTheme(getStoredTheme());
    setMounted(true);
  }, []);

  // Track OS preference changes when in `system` mode.
  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyTheme("system");
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  function cycle() {
    const next: Theme =
      theme === "system" ? "light" : theme === "light" ? "dark" : "system";
    setTheme(next);
    if (next === "system") {
      window.localStorage.removeItem(STORAGE_KEY);
    } else {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
    applyTheme(next);
  }

  const labels = {
    en: {
      system: "Theme: system",
      light: "Theme: light",
      dark: "Theme: dark",
      action: "Switch theme",
    },
    es: {
      system: "Tema: sistema",
      light: "Tema: claro",
      dark: "Tema: oscuro",
      action: "Cambiar tema",
    },
  } as const;

  const t = labels[lang];
  const current = mounted ? theme : "system";
  const label =
    current === "light" ? t.light : current === "dark" ? t.dark : t.system;

  return (
    <button
      aria-label={t.action}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-colors hover:border-red-300 hover:text-red-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-red-500/60 dark:hover:text-red-400"
      onClick={cycle}
      title={label}
      type="button"
    >
      {/* Sun icon (light mode) */}
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
      {/* Moon icon (dark mode) */}
      <svg
        aria-hidden="true"
        className={`h-5 w-5 ${current === "dark" ? "" : "hidden"}`}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <title>Dark</title>
        <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
      </svg>
      {/* Monitor icon (system mode) */}
      <svg
        aria-hidden="true"
        className={`h-5 w-5 ${current === "system" ? "" : "hidden"}`}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <title>System</title>
        <rect height="12" rx="2" width="18" x="3" y="4" />
        <path d="M8 20h8M12 16v4" />
      </svg>
    </button>
  );
}
