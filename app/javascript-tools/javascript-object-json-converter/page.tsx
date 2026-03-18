import type { Metadata } from "next";
import JavascriptObjectJsonConverterSeo from "@/components/seo-content/javascript-tools/javascript-object-json-converter";

import ToolLinkCards from "@/components/utils/ToolLinkCards";
import JavascriptObjectToJsonConverter from "@/components/javascript-tools/javascript-object-to-json-converter";

export const metadata: Metadata = {
  title: `JS Object to JSON Converter - Stringify & Parse Online`,
  description: `Convert JavaScript objects to JSON strings and parse JSON back to objects. Supports pretty printing, circular reference detection, and validation.`,
  alternates: {
    canonical: `https://1000freetools.com/javascript-tools/javascript-object-json-converter`,
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

export default function JavascriptObjectJsonConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Convert JavaScript Objects to JSON and Back
        </h1>
        <p className="text-muted-foreground">
          Transform JavaScript object literals into JSON strings and parse JSON
          back into live objects. Handles complex types and formatting options.
        </p>
      </header>
      <div className="mt-8">
        <JavascriptObjectToJsonConverter />
      </div>
      <div className="mt-16">
        <JavascriptObjectJsonConverterSeo />
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
