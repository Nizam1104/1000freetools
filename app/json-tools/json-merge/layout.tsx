import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "JSON Merge Tool – Combine JSON Objects Online",
  description: "Merge multiple JSON objects using configurable merge strategies. Our free JSON Merge Tool handles deep merges, overwrites, and conflict resolution for complex data structures.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-merge",
  },
};

const tools = [
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
    "name": "Json Key Extractor",
    "description": "",
    "href": "/json-tools/json-key-extractor"
  },
  {
    "name": "Json Value Search",
    "description": "",
    "href": "/json-tools/json-value-search"
  },
  {
    "name": "Json Filter",
    "description": "",
    "href": "/json-tools/json-filter"
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
    "name": "Json Diff",
    "description": "",
    "href": "/json-tools/json-diff"
  },
  {
    "name": "Json Patch Generator",
    "description": "",
    "href": "/json-tools/json-patch-generator"
  },
  {
    "name": "Json Map Reduce",
    "description": "",
    "href": "/json-tools/json-map-reduce"
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
