import type { Metadata } from "next";
import Base64EncoderDecoderJavascriptSeo from "@/components/seo-content/javascript-tools/base64-encoder-decoder-javascript";

import ToolLinkCards from "@/components/utils/ToolLinkCards";
import Base64EncoderDecoder from "@/components/javascript-tools/base64-encoder-decoder";

export const metadata: Metadata = {
  title: `Base64 Encoder/Decoder - JavaScript String & File Tool`,
  description: `Free Base64 encoder and decoder for JavaScript. Encode text/files to Base64, decode strings with proper UTF-8 handling. No data leaves your browser.`,
  alternates: {
    canonical: `https://1000freetools.com/javascript-tools/base64-encoder-decoder-javascript`,
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

export default function Base64EncoderDecoderJavascriptPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Encode and Decode Base64 in JavaScript
        </h1>
        <p className="text-muted-foreground">
          Convert text, strings, or files to Base64 encoding and decode back.
          This tool handles JavaScript's UTF-8 encoding properly for web
          development.
        </p>
      </header>
      <div className="mt-8">
        <Base64EncoderDecoder />
      </div>
      <div className="mt-16">
        <Base64EncoderDecoderJavascriptSeo />
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
