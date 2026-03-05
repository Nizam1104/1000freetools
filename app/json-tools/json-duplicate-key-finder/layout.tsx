import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "JSON Duplicate Key Finder – Detect Duplicate Keys",
  description: "Find and flag duplicate keys in JSON objects that could cause silent data loss. Our free JSON Duplicate Key Finder helps you write cleaner, safer, and more reliable JSON.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-duplicate-key-finder",
  },
};

const tools = [
  {
    "name": "Json Size Calculator",
    "description": "",
    "href": "/json-tools/json-size-calculator"
  },
  {
    "name": "Json Key Frequency",
    "description": "",
    "href": "/json-tools/json-key-frequency"
  },
  {
    "name": "Json Array Object Counter",
    "description": "",
    "href": "/json-tools/json-array-object-counter"
  },
  {
    "name": "Json Empty Field Finder",
    "description": "",
    "href": "/json-tools/json-empty-field-finder"
  },
  {
    "name": "Json Depth Analyzer",
    "description": "",
    "href": "/json-tools/json-depth-analyzer"
  },
  {
    "name": "Json Structure Visualizer",
    "description": "",
    "href": "/json-tools/json-structure-visualizer"
  },
  {
    "name": "Json To Xml",
    "description": "",
    "href": "/json-tools/json-to-xml"
  },
  {
    "name": "Json Rename Keys",
    "description": "",
    "href": "/json-tools/json-rename-keys"
  },
  {
    "name": "Json Pretty Print",
    "description": "",
    "href": "/json-tools/json-pretty-print"
  },
  {
    "name": "Json Datetime Generator",
    "description": "",
    "href": "/json-tools/json-datetime-generator"
  },
  {
    "name": "Json To Text",
    "description": "",
    "href": "/json-tools/json-to-text"
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
