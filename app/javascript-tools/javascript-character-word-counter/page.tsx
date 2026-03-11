import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import JavaScriptCharacterWordCounter from "@/components/javascript-tools/javascript-character-word-counter";
import JavascriptCharacterWordCounterSeo from "@/components/seo-content/javascript-tools/javascript-character-word-counter";

export const metadata: Metadata = {
  title: `JavaScript Character Counter - Count Words & Lines Online`,
  description: `Free character, word, line, and sentence counter for JavaScript code and text. Real-time analysis with reading time estimation.`,
  alternates: {
    canonical: `https://1000freetools.com/javascript-tools/javascript-character-word-counter`,
  },
};

const tools = [
  {
    name: `JavaScript Minifier & Compressor`,
    description: `Minify and Compress JavaScript Code`,
    href: `/javascript-tools/javascript-minifier-compressor`,
  },
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

export default function JavascriptCharacterWordCounterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Count Characters, Words, and Lines in JavaScript
        </h1>
        <p className="text-muted-foreground">
          Analyze your JavaScript code or any text with precise counts. Get
          character, word, line, and sentence totals instantly as you type or
          paste.
        </p>
      </header>
      <div className="mt-8">
        <JavaScriptCharacterWordCounter />
      </div>
      <div className="mt-8">
        <JavascriptCharacterWordCounterSeo />
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
