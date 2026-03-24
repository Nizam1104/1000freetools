"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

interface ToolLink {
  name: string;
  description: string;
  href: string;
}

interface CategoryToolsLandingPageProps {
  title: string;
  description: string;
  tools: ToolLink[];
  searchPlaceholder?: string;
}

export default function CategoryToolsLandingPage({
  title,
  description,
  tools,
  searchPlaceholder = "Search tools by name or description",
}: CategoryToolsLandingPageProps) {
  const [query, setQuery] = useState("");

  const filteredTools = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return tools;
    }

    return tools.filter((tool) => {
      return (
        tool.name.toLowerCase().includes(normalizedQuery) ||
        tool.description.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [query, tools]);

  return (
    <main className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <header className="border-b border-zinc-200 pb-6 dark:border-zinc-800">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            Tools Directory
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
          <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">{description}</p>
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
            {tools.length} tool{tools.length === 1 ? "" : "s"} available
          </p>
        </header>

        <section className="space-y-1.5 pt-8" aria-labelledby="search-tools">
          <label
            id="search-tools"
            htmlFor="category-tool-search"
            className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Search tools
          </label>
          <input
            id="category-tool-search"
            type="text"
            placeholder={searchPlaceholder}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
          />
        </section>

        <section className="border-t border-zinc-200 pt-8 dark:border-zinc-800" aria-label={`${title} links`}>
          {filteredTools.length === 0 ? (
            <p className="py-10 text-center text-sm text-zinc-500 dark:text-zinc-400">
              No tools match your search.
            </p>
          ) : (
            <ul className="space-y-3">
              {filteredTools.map((tool) => (
                <li key={tool.href}>
                  <Link
                    href={tool.href}
                    className="block rounded-md border border-zinc-200 px-4 py-3 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
                  >
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{tool.name}</p>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{tool.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </section>
    </main>
  );
}
