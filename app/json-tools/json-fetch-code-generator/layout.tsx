import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "JSON to Fetch Code Generator – Generate JS Fetch",
  description: "Generate JavaScript Fetch API code snippets from JSON request definitions. Our free tool saves development time by auto-generating ready-to-use HTTP request code.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-fetch-code-generator",
  },
};

const tools = [
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
    "name": "Json Api Response Generator",
    "description": "",
    "href": "/json-tools/json-api-response-generator"
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
  },
  {
    "name": "Json Config Validator",
    "description": "",
    "href": "/json-tools/json-config-validator"
  },
  {
    "name": "Json Patch Generator",
    "description": "",
    "href": "/json-tools/json-patch-generator"
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
    "name": "Json Unflatten",
    "description": "",
    "href": "/json-tools/json-unflatten"
  },
  {
    "name": "Json Sensitive Data Maser",
    "description": "",
    "href": "/json-tools/json-sensitive-data-maser"
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
