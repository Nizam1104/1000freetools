import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "Random JSON Object Generator Online",
  description: "Generate random JSON objects for testing, prototyping, and demos in seconds. Our free JSON Random Object Generator lets you customize fields, types, and nesting depth.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-random-object",
  },
};

const tools = [
  {
    "name": "Json Array Generator",
    "description": "",
    "href": "/json-tools/json-array-generator"
  },
  {
    "name": "Json Datetime Generator",
    "description": "",
    "href": "/json-tools/json-datetime-generator"
  },
  {
    "name": "Json Enum Generator",
    "description": "",
    "href": "/json-tools/json-enum-generator"
  },
  {
    "name": "Json Pagination Generator",
    "description": "",
    "href": "/json-tools/json-pagination-generator"
  },
  {
    "name": "Json Api Response Generator",
    "description": "",
    "href": "/json-tools/json-api-response-generator"
  },
  {
    "name": "Json Schema Example Generator",
    "description": "",
    "href": "/json-tools/json-schema-example-generator"
  },
  {
    "name": "Json Nested Structure",
    "description": "",
    "href": "/json-tools/json-nested-structure"
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
