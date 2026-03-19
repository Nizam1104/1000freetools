import type { Metadata } from "next";

import ToolLinkCards from "@/components/utils/ToolLinkCards";
import JavascriptBeautifier from "@/components/javascript-tools/javascript-beautifier";

export const metadata: Metadata = {
  title: `JavaScript Beautifier - Format & Pretty Print JS Code`,
  description: `Free online JavaScript beautifier to format minified, ugly, or compressed code. Improve readability with customizable indentation and structure.`,
  alternates: {
    canonical: `https://1000freetools.com/javascript-tools/javascript-beautifier-formatter`,
  },
};

const tools = [
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
    name: `Base64 Encoder & Decoder for JavaScript`,
    description: `Encode and Decode Base64 in JavaScript`,
    href: `/javascript-tools/base64-encoder-decoder-javascript`,
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

export default function JavascriptBeautifierFormatterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Beautify and Format JavaScript Code
        </h1>
        <p className="text-muted-foreground">
          Make your minified or messy JavaScript readable again. This formatter
          adds proper indentation and line breaks to improve code clarity and
          maintainability.
        </p>
      </header>
      <div className="mt-8">
        <JavascriptBeautifier />
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
