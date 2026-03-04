import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "JSON Empty Field Finder – Find Null & Empty Values",
  description: "Identify null, empty string, and missing values in your JSON data instantly. Our free JSON Empty Field Finder helps you clean datasets and ensure data completeness.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-empty-field-finder",
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
    "name": "Json Duplicate Key Finder",
    "description": "",
    "href": "/json-tools/json-duplicate-key-finder"
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
    "name": "Json Api Formatter",
    "description": "",
    "href": "/json-tools/json-api-formatter"
  },
  {
    "name": "Json To Kotlin",
    "description": "",
    "href": "/json-tools/json-to-kotlin"
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
