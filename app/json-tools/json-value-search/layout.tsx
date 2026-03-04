import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "JSON Search & Filter Tool Online",
  description: "Search and filter JSON data by key or value with real-time highlight support. Quickly locate matching nodes inside large, complex JSON structures without manual scanning.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-value-search",
  },
};

const tools = [
  {
    "name": "Json Key Extractor",
    "description": "",
    "href": "/json-tools/json-key-extractor"
  },
  {
    "name": "Json Filter",
    "description": "",
    "href": "/json-tools/json-filter"
  },
  {
    "name": "Json Extract Subjson",
    "description": "",
    "href": "/json-tools/json-extract-subjson"
  },
  {
    "name": "Json Remove Keys",
    "description": "",
    "href": "/json-tools/json-remove-keys"
  },
  {
    "name": "Json Rename Keys",
    "description": "",
    "href": "/json-tools/json-rename-keys"
  },
  {
    "name": "Json Transformer",
    "description": "",
    "href": "/json-tools/json-transformer"
  },
  {
    "name": "Json Sorter",
    "description": "",
    "href": "/json-tools/json-sorter"
  },
  {
    "name": "Json Flatten",
    "description": "",
    "href": "/json-tools/json-flatten"
  },
  {
    "name": "Json Unflatten",
    "description": "",
    "href": "/json-tools/json-unflatten"
  },
  {
    "name": "Json Merge",
    "description": "",
    "href": "/json-tools/json-merge"
  },
  {
    "name": "Json Diff",
    "description": "",
    "href": "/json-tools/json-diff"
  },
  {
    "name": "Json Patch Generator",
    "description": "",
    "href": "/json-tools/json-patch-generator"
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4">
      {children}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free JSON Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
