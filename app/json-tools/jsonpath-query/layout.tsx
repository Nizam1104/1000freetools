import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "JSONPath Query Tool – Run JSONPath Online",
  description: "Execute JSONPath expressions against JSON data and view matching results instantly. Our free JSONPath Query Tool is perfect for testing queries before integrating them in code.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/jsonpath-query",
  },
};

const tools = [
  {
    "name": "Jmespath Query",
    "description": "",
    "href": "/json-tools/jmespath-query"
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
    "name": "Json Extract Subjson",
    "description": "",
    "href": "/json-tools/json-extract-subjson"
  },
  {
    "name": "Json Key Extractor",
    "description": "",
    "href": "/json-tools/json-key-extractor"
  },
  {
    "name": "Csv To Json",
    "description": "",
    "href": "/json-tools/csv-to-json"
  },
  {
    "name": "Json Jwt Decoder",
    "description": "",
    "href": "/json-tools/json-jwt-decoder"
  },
  {
    "name": "Json Linter",
    "description": "",
    "href": "/json-tools/json-linter"
  },
  {
    "name": "Json Flatten",
    "description": "",
    "href": "/json-tools/json-flatten"
  },
  {
    "name": "Json Sorter",
    "description": "",
    "href": "/json-tools/json-sorter"
  },
  {
    "name": "Json Structure Visualizer",
    "description": "",
    "href": "/json-tools/json-structure-visualizer"
  },
  {
    "name": "Json To Swift",
    "description": "",
    "href": "/json-tools/json-to-swift"
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
