import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "JSON Schema Validator – Validate Against Schema",
  description: "Validate JSON data against any JSON Schema and get detailed error reports. Our free JSON Schema Validator ensures your data conforms to expected types and structures.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-schema-validator",
  },
};

const tools = [
  {
    "name": "Json Formatter Beautifier",
    "description": "",
    "href": "/json-tools/json-formatter-beautifier"
  },
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
