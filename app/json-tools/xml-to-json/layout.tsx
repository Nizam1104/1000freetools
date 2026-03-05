import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "XML to JSON Converter – Free Online Tool",
  description: "Parse and convert XML into clean, structured JSON while preserving full hierarchy. Our free XML to JSON Converter handles nested elements, attributes, and complex XML documents.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/xml-to-json",
  },
};

const tools = [
  {
    "name": "Csv To Json",
    "description": "",
    "href": "/json-tools/csv-to-json"
  },
  {
    "name": "Yaml To Json",
    "description": "",
    "href": "/json-tools/yaml-to-json"
  },
  {
    "name": "Json Random Object",
    "description": "",
    "href": "/json-tools/json-random-object"
  },
  {
    "name": "Json To Yaml",
    "description": "",
    "href": "/json-tools/json-to-yaml"
  },
  {
    "name": "Json Base64",
    "description": "",
    "href": "/json-tools/json-base64"
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
  },
  {
    "name": "Json Extract Subjson",
    "description": "",
    "href": "/json-tools/json-extract-subjson"
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
