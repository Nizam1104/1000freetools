"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";

interface Tool {
  name: string;
  description: string;
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
        tool.description.toLowerCase().includes(query),
    );
  }, [tools, searchQuery]);

  const showSearch = tools.length > 10;

  return (
    <div className="mt-4 w-full">
      {showSearch && (
        <div className="mb-4 max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-1 sm:gap-y-2 md:gap-y-3 gap-x-1 sm:gap-x-2 md:gap-x-3">
        {filteredTools.map((tool, index) => (
          <Link
            key={index}
            href={tool.href}
            rel="noopener noreferrer"
            className="bg-card rounded-lg p-4 hover:shadow-xl border"
          >
            <div className="">
              <h2 className="text-primary text-base md:text-xl font-semibold">
                {tool.name}
              </h2>
              <p className="text-muted-foreground text-sm md:text-base">
                {tool.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ToolLinkCards;
