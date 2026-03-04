import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: "JSON Obfuscator – Obfuscate JSON Online",
  description: "Minify and obfuscate JSON keys and values for safer sharing and publishing. Our free JSON Obfuscator helps protect data structure and logic from casual inspection.",
  alternates: {
    canonical: "https://1000freetools.com/json-tools/json-obfuscator",
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
    "name": "Json Encode Decode",
    "description": "",
    "href": "/json-tools/json-encode-decode"
  },
  {
    "name": "Json Stringify Parse",
    "description": "",
    "href": "/json-tools/json-stringify-parse"
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
  },
  {
    "name": "Json Diff",
    "description": "",
    "href": "/json-tools/json-diff"
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
