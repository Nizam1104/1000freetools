import React from "react";
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
  return (
    <div>
      <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-2 mt-4 sm:mt-6 md:mt-8">
        Explore More tools
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-1 sm:gap-y-2 md:gap-y-3 gap-x-1 sm:gap-x-2 md:gap-x-3">
        {tools.map((tool, index) => (
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
