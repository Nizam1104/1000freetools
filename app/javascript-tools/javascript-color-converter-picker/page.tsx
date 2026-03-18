import type { Metadata } from "next";
import JavascriptColorConverterPickerSeo from "@/components/seo-content/javascript-tools/javascript-color-converter-picker";

import ToolLinkCards from "@/components/utils/ToolLinkCards";
import JavascriptColorConverter from "@/components/javascript-tools/javascript-color-converter";

export const metadata: Metadata = {
  title: `JavaScript Color Converter - HEX, RGB, HSL & Picker`,
  description: `Convert colors between HEX, RGB, HSL, and named formats. Visual color picker and JavaScript code generation for web development.`,
  alternates: {
    canonical: `https://1000freetools.com/javascript-tools/javascript-color-converter-picker`,
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

export default function JavascriptColorConverterPickerPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Convert Colors and Generate JavaScript Code
        </h1>
        <p className="text-muted-foreground">
          Convert between HEX, RGB, HSL, and named colors. Use the visual picker
          and get ready-to-use JavaScript color code snippets.
        </p>
      </header>
      <div className="mt-8">
        <JavascriptColorConverter />
      </div>
      <div className="mt-16">
        <JavascriptColorConverterPickerSeo />
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
