import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "JSON Encode & Decode Tool Online",
  description: "Safely encode and decode JSON strings for transport or storage. Our free JSON Encode Decode Tool handles special characters and ensures your data survives serialization correctly.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-encode-decode",
  },
};

const tools = [
  {
    "name": "Json Base64",
    "description": "",
    "href": "/json-tools/json-base64"
  },
  {
    "name": "Json Escape Unescape",
    "description": "",
    "href": "/json-tools/json-escape-unescape"
  },
  {
    "name": "Json Stringify Parse",
    "description": "",
    "href": "/json-tools/json-stringify-parse"
  },
  {
    "name": "Json Obfuscator",
    "description": "",
    "href": "/json-tools/json-obfuscator"
  },
  {
    "name": "Json Sensitive Data Maser",
    "description": "",
    "href": "/json-tools/json-sensitive-data-maser"
  },
  {
    "name": "Json Jwt Decoder",
    "description": "",
    "href": "/json-tools/json-jwt-decoder"
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
