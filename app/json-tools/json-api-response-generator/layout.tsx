import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "JSON API Response Generator – Mock API Responses",
  description: "Generate realistic mock API JSON responses with status codes, data payloads, and pagination. Our free tool speeds up frontend development and API testing without a live backend.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-api-response-generator",
  },
};

const tools = [
  {
    "name": "Json Array Generator",
    "description": "",
    "href": "/json-tools/json-array-generator"
  },
  {
    "name": "Json Random Object",
    "description": "",
    "href": "/json-tools/json-random-object"
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
    "name": "Json Api Formatter",
    "description": "",
    "href": "/json-tools/json-api-formatter"
  },
  {
    "name": "Json Api Error Formatter",
    "description": "",
    "href": "/json-tools/json-api-error-formatter"
  },
  {
    "name": "Json Fetch Code Generator",
    "description": "",
    "href": "/json-tools/json-fetch-code-generator"
  },
  {
    "name": "Json Axios Code Generator",
    "description": "",
    "href": "/json-tools/json-axios-code-generator"
  },
  {
    "name": "Json Env Converter",
    "description": "",
    "href": "/json-tools/json-env-converter"
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
