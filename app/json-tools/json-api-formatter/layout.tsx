import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "JSON API Formatter – Standardize API Responses",
  description: "Format JSON API responses into a consistent, readable structure following best practices. Our free JSON API Formatter helps teams maintain uniform response formats across all endpoints.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-api-formatter",
  },
};

const tools = [
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
    "name": "Json To Kotlin",
    "description": "",
    "href": "/json-tools/json-to-kotlin"
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
