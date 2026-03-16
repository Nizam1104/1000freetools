import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: `JSON Validator and Formatter - Check & Beautify JSON`,
  description: `Free online JSON validator and formatter. Check syntax errors, format with indentation, and switch between compact and pretty views instantly.`,
  alternates: {
    canonical: `https://1000freetools.com/javascript-tools/json-validator-formatter`,
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

export default function JsonValidatorFormatterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Validate and Format JSON Data</h1>
        <p className="text-muted-foreground">Check your JSON for errors and format it for readability. This validator identifies syntax issues and beautifies valid JSON with customizable indentation.</p>
      </header>
      {/* TODO: add tool component for json-validator-formatter */}
      {/* TODO: add seo component for json-validator-formatter */}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
