import type { Metadata } from "next";
import JavascriptUrlParserQueryStringBuilderSeo from "@/components/seo-content/javascript-tools/javascript-url-parser-query-string-builder";

import ToolLinkCards from "@/components/utils/ToolLinkCards";
import JavascriptUrlParser from "@/components/javascript-tools/javascript-url-parser";

export const metadata: Metadata = {
  title: `JavaScript URL Parser - Analyze & Build URLs Online`,
  description: `Parse URLs into components and build query strings. Extract protocol, host, path, and parameters. Encode/decode values for web development.`,
  alternates: {
    canonical: `https://1000freetools.com/javascript-tools/javascript-url-parser-query-string-builder`,
  },
};

const tools = [
  {
    name: `JavaScript Beautifier & Formatter`,
    description: `Beautify and Format JavaScript Code`,
    href: `/javascript-tools/javascript-beautifier-formatter`,
  },
  {
    name: `JavaScript Obfuscator & Protector`,
    description: `Obfuscate JavaScript Code for Protection`,
    href: `/javascript-tools/javascript-obfuscator-protector`,
  },
  {
    name: `JSON Validator & Formatter`,
    description: `Validate and Format JSON Data`,
    href: `/javascript-tools/json-validator-formatter`,
  },
  {
    name: `JavaScript Regex Tester & Debugger`,
    description: `Test and Debug JavaScript Regular Expressions`,
    href: `/javascript-tools/javascript-regex-tester-debugger`,
  },
  {
    name: `ASCII to Hex Converter`,
    description: `ASCII to Hex Converter: Text to Hexadecimal Translator`,
    href: `/ascii-tools/ascii-to-hex-converter`,
  },
  {
    name: `Barcode Generator`,
    description: `Free Barcode Generator`,
    href: `/barcode-tools/barcode-generator`,
  },
  {
    name: `Binary to Text Converter`,
    description: `Binary to Text Converter`,
    href: `/binary-tools/binary-to-text-converter`,
  },
  {
    name: `Free Printable Calendar Maker`,
    description: `Create & Print Your Custom Calendar`,
    href: `/calendar-tools/printable-calendar-maker`,
  },
  {
    name: `Pie Chart Maker`,
    description: `Free Pie Chart Maker Online`,
    href: `/chart-tools/pie-chart-maker`,
  },
];

export default function JavascriptUrlParserQueryStringBuilderPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Parse URLs and Build Query Strings in JavaScript
        </h1>
        <p className="text-muted-foreground">
          Deconstruct any URL into its components or build a new one from
          scratch. Manipulate query parameters and hash fragments with ease.
        </p>
      </header>
      <div className="mt-8">
        <JavascriptUrlParser />
      </div>
      <div className="mt-16">
        <JavascriptUrlParserQueryStringBuilderSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Other Free Tools
        </h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
