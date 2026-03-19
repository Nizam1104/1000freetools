import type { Metadata } from "next";

import ToolLinkCards from "@/components/utils/ToolLinkCards";
import JavascriptObfuscator from "@/components/javascript-tools/javascript-obfuscator";

export const metadata: Metadata = {
  title: `JavaScript Obfuscator - Protect JS Source Code Online`,
  description: `Obfuscate your JavaScript to prevent copying and minification. Free tool with name mangling, string encoding, and control flow obfuscation.`,
  alternates: {
    canonical: `https://1000freetools.com/javascript-tools/javascript-obfuscator-protector`,
  },
};

const tools = [
  {
    name: `JavaScript Beautifier & Formatter`,
    description: `Beautify and Format JavaScript Code`,
    href: `/javascript-tools/javascript-beautifier-formatter`,
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

export default function JavascriptObfuscatorProtectorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Obfuscate JavaScript Code for Protection
        </h1>
        <p className="text-muted-foreground">
          Protect your JavaScript source code from theft and reverse
          engineering. Obfuscation transforms your code into a complex,
          unreadable format that still runs perfectly.
        </p>
      </header>
      <div className="mt-8">
        <JavascriptObfuscator />
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
