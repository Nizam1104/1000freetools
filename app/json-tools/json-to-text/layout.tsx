import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "JSON to Plain Text Converter Online",
  description: "Flatten JSON into readable plain text key-value pairs for reports, logs, or documentation. Our free JSON to Text Converter makes complex JSON data human-readable in seconds.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-to-text",
  },
};

const tools = [
  {
    "name": "Json To Typescript",
    "description": "",
    "href": "/json-tools/json-to-typescript"
  },
  {
    "name": "Json To Javascript",
    "description": "",
    "href": "/json-tools/json-to-javascript"
  },
  {
    "name": "Json To Python",
    "description": "",
    "href": "/json-tools/json-to-python"
  },
  {
    "name": "Json To Java",
    "description": "",
    "href": "/json-tools/json-to-java"
  },
  {
    "name": "Json To Csharp",
    "description": "",
    "href": "/json-tools/json-to-csharp"
  },
  {
    "name": "Json To Kotlin",
    "description": "",
    "href": "/json-tools/json-to-kotlin"
  },
  {
    "name": "Json To Swift",
    "description": "",
    "href": "/json-tools/json-to-swift"
  },
  {
    "name": "Json To Go",
    "description": "",
    "href": "/json-tools/json-to-go"
  },
  {
    "name": "Json To Php",
    "description": "",
    "href": "/json-tools/json-to-php"
  },
  {
    "name": "Json To Graphql",
    "description": "",
    "href": "/json-tools/json-to-graphql"
  },
  {
    "name": "Json To Xml",
    "description": "",
    "href": "/json-tools/json-to-xml"
  },
  {
    "name": "Json To Yaml",
    "description": "",
    "href": "/json-tools/json-to-yaml"
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
