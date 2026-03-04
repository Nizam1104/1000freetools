import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "JSON Formatter & Beautifier Online",
  description: "Format and beautify raw JSON instantly with our free online JSON Formatter. Customize indentation, collapse nodes, and download clean, readable JSON in one click.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-formatter-beautifier",
  },
};

const tools = [
  {
    "name": "Json Pretty Print",
    "description": "",
    "href": "/json-tools/json-pretty-print"
  },
  {
    "name": "Json Viewer",
    "description": "",
    "href": "/json-tools/json-viewer"
  },
  {
    "name": "Json Playground",
    "description": "",
    "href": "/json-tools/json-playground"
  },
  {
    "name": "Json Minifier",
    "description": "",
    "href": "/json-tools/json-minifier"
  },
  {
    "name": "Json Structure Visualizer",
    "description": "",
    "href": "/json-tools/json-structure-visualizer"
  },
  {
    "name": "Json Step By Step Parser",
    "description": "",
    "href": "/json-tools/json-step-by-step-parser"
  },
  {
    "name": "Json Depth Analyzer",
    "description": "",
    "href": "/json-tools/json-depth-analyzer"
  },
  {
    "name": "Json Linter",
    "description": "",
    "href": "/json-tools/json-linter"
  },
  {
    "name": "Json Validator",
    "description": "",
    "href": "/json-tools/json-validator"
  },
  {
    "name": "Json Schema Validator",
    "description": "",
    "href": "/json-tools/json-schema-validator"
  },
  {
    "name": "Json Explainer",
    "description": "",
    "href": "/json-tools/json-explainer"
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
