"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";

interface Tool {
  name: string;
  description?: string;
  href: string;
}

interface ToolLinkCardsProps {
  tools: Tool[];
}

const ToolLinkCards: React.FC<ToolLinkCardsProps> = ({ tools }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) {
      return tools;
    }
    const query = searchQuery.toLowerCase();
    return tools.filter(
      (tool) =>
        tool.name.toLowerCase().includes(query) ||
        tool.description?.toLowerCase().includes(query),
    );
  }, [tools, searchQuery]);

  const showSearch = tools.length > 5;

  return (
    <section className="w-full">
      {showSearch && (
        <div className="mb-6 max-w-md">
          <div className="space-y-1.5">
            <label
              htmlFor="tool-search"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Search tools
            </label>
            <input
              id="tool-search"
              type="text"
              placeholder="Search by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2.5 text-sm bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTools.map((tool, index) => (
          <Link
            key={index}
            href={tool.href}
            rel="noopener noreferrer"
            className="group block p-4 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
          >
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {tool.name}
            </h3>
            {tool.description && (
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1.5 line-clamp-2">
                {tool.description}
              </p>
            )}
          </Link>
        ))}
      </div>
      {filteredTools.length === 0 && searchQuery && (
        <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center py-8">
          No tools found for &ldquo;{searchQuery}&rdquo;
        </p>
      )}
    </section>
  );
};

export default ToolLinkCards;
