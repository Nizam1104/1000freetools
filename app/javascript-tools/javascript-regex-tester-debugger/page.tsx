import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import JavascriptRegexTester from "@/components/javascript-tools/javascript-regex-tester";

export const metadata: Metadata = {
  title: `JavaScript Regex Tester - Debug Regular Expressions`,
  description: `Interactive JavaScript regex tester. Visualize matches, test flags, perform substitutions, and debug complex patterns with instant feedback.`,
  alternates: {
    canonical: `https://1000freetools.com/javascript-tools/javascript-regex-tester-debugger`,
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

export default function JavascriptRegexTesterDebuggerPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Test and Debug JavaScript Regular Expressions
        </h1>
        <p className="text-muted-foreground">
          Build, test, and debug regex patterns for JavaScript in real-time. See
          matches, groups, and substitutions instantly against your sample text.
        </p>
      </header>
      <div className="mt-8">
        <JavascriptRegexTester />
      </div>
      {/* TODO: add seo component for javascript-regex-tester-debugger */}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Other Free Tools
        </h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
