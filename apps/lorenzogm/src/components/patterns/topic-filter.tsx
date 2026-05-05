import { Link } from "@tanstack/react-router";
import { useState } from "react";

interface TopicItem {
  count: number;
  topic: string;
}

interface TopicFilterProps {
  activeTopic: string;
  labels: {
    filterByTopic: string;
    filters: string;
    apply: string;
    clearAll: string;
  };
  params?: Record<string, string>;
  searchRoute: string;
  topics: TopicItem[];
}

function TopicList({
  topics,
  activeTopic,
  searchRoute,
  params,
  onSelect,
}: {
  topics: TopicItem[];
  activeTopic: string;
  searchRoute: string;
  params?: Record<string, string>;
  onSelect?: () => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {topics.map(({ topic: t, count }) => {
        const isActive = t.toLowerCase() === activeTopic.toLowerCase();
        return (
          <Link
            className={`flex items-center justify-between rounded-lg px-3 py-2 font-medium text-sm transition-colors duration-200 ${
              isActive
                ? "bg-red-600 text-white dark:bg-red-500"
                : "text-gray-700 hover:bg-red-50 hover:text-red-700 dark:text-zinc-300 dark:hover:bg-red-950/40 dark:hover:text-red-300"
            }`}
            key={t}
            onClick={onSelect}
            params={params}
            resetScroll={false}
            search={(prev) => ({
              ...prev,
              topic: isActive ? undefined : t,
            })}
            to={searchRoute}
          >
            <span>{t}</span>
            <span
              className={`rounded-full px-2 py-0.5 text-xs ${
                isActive
                  ? "bg-red-500 text-white dark:bg-red-400 dark:text-zinc-900"
                  : "bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300"
              }`}
            >
              {count}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export function TopicFilter({
  topics,
  activeTopic,
  searchRoute,
  params,
  labels,
}: TopicFilterProps) {
  const [open, setOpen] = useState(false);

  if (topics.length === 0) return null;

  return (
    <>
      {/* Mobile: Filter button */}
      <div className="md:hidden">
        <button
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 font-medium text-gray-700 text-sm shadow-sm transition-colors hover:bg-gray-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          onClick={() => setOpen(true)}
          type="button"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <title>{labels.filters}</title>
            <path
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
          {labels.filters}
          {activeTopic && (
            <span className="rounded-full bg-red-600 px-2 py-0.5 text-white text-xs dark:bg-red-500">
              1
            </span>
          )}
        </button>
      </div>

      {/* Mobile: Full-screen modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white md:hidden dark:bg-zinc-950">
          <div className="flex items-center justify-between border-gray-200 border-b px-4 py-4 dark:border-zinc-800">
            <h2 className="font-semibold text-gray-900 text-lg dark:text-zinc-100">
              {labels.filterByTopic}
            </h2>
            <button
              className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
              onClick={() => setOpen(false)}
              type="button"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <title>Close</title>
                <path
                  d="M6 18L18 6M6 6l12 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {activeTopic && (
              <Link
                className="mb-4 inline-flex items-center gap-1 text-red-600 text-sm hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                onClick={() => setOpen(false)}
                params={params}
                search={(prev) => ({ ...prev, topic: undefined })}
                to={searchRoute}
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <title>{labels.clearAll}</title>
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
                {labels.clearAll}
              </Link>
            )}
            <TopicList
              activeTopic={activeTopic}
              onSelect={() => setOpen(false)}
              params={params}
              searchRoute={searchRoute}
              topics={topics}
            />
          </div>
        </div>
      )}

      {/* Desktop: Sidebar */}
      <aside className="hidden w-full shrink-0 md:block md:w-56 lg:w-64">
        <div className="sticky top-8 rounded-xl border border-gray-100 bg-gray-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-4 font-semibold text-gray-900 text-sm uppercase tracking-wide dark:text-zinc-100">
            {labels.filterByTopic}
          </h2>
          <TopicList
            activeTopic={activeTopic}
            params={params}
            searchRoute={searchRoute}
            topics={topics}
          />
        </div>
      </aside>
    </>
  );
}
