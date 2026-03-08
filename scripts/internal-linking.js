const fs = require("fs");
const path = require("path");

// Create a reverse mapping from ID to slug for easy lookup
const idToSlug = {};
for (const slug in converters) {
  idToSlug[converters[slug].id] = slug;
}

const generateLayout = (toolName, { h1, p }, category = "unit-converters") => {
  const canonical = `https://1000freetools.com/${category}/${toolName}`;

  // Get the ID of the current tool
  const currentToolId = converters[toolName]?.id;

  let linkedToolSlugs = [];
  if (currentToolId && links[currentToolId]) {
    // Map the linked IDs to their corresponding slugs
    linkedToolSlugs = links[currentToolId]
      .map((id) => idToSlug[id])
      .filter(Boolean); // Filter out any undefined slugs if an ID is missing from converters
  }

  // Generate tools array for ToolLinkCards based on the mapping
  const otherTools = linkedToolSlugs.map((slug) => ({
    name: toolMetadata[slug].h1,
    description: toolMetadata[slug].p,
    href: `/${category}/${slug}`,
  }));

  const toolsJson = JSON.stringify(otherTools, null, 2);

  return `import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "${h1}",
  description: "${p}",
  alternates: {
    canonical: "${canonical}",
  },
};

const tools = ${toolsJson};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
    <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">${toolName}</h1>
        <p className="text-muted-foreground">
          ${p}
        </p>
      </div>
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
`;
};


// The rest of the file generation loop remains the same
for (const [toolName, meta] of Object.entries(toolMetadata)) {
  const category = cssToolSlugs.includes(toolName)
    ? "css-tools"
    : "unit-converters";
  const dir = path.join("app", category, toolName);
  const filePath = path.join(dir, "layout.tsx");

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, generateLayout(toolName, meta, category), "utf-8");

  console.log(`✅ Created: ${filePath}`);
}

console.log("\nDone! All layout files generated.");
