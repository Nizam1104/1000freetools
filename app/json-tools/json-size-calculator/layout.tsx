import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "JSON Size Calculator – Check JSON File Size",
  description: "Calculate the exact size of your JSON in bytes, KB, and MB. Compare minified vs formatted size instantly with our free JSON Size Calculator to optimize data transfer.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-size-calculator",
  },
};

const tools = [
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
    "name": "Json Extract Subjson",
    "description": "",
    "href": "/json-tools/json-extract-subjson"
  },
  {
    "name": "Json Diff",
    "description": "",
    "href": "/json-tools/json-diff"
  },
  {
    "name": "Json To Php",
    "description": "",
    "href": "/json-tools/json-to-php"
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
