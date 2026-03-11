import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import JavaScriptArrayObjectSorter from "@/components/javascript-tools/javascript-array-object-sorter";
import JavascriptArrayObjectSorterSeo from "@/components/seo-content/javascript-tools/javascript-array-object-sorter";

export const metadata: Metadata = {
  title: `JavaScript Array Sorter - Sort Objects & Arrays Online`,
  description: `Sort JavaScript arrays and objects online. Sort by property, ascending/descending, or with custom comparator functions. No coding required.`,
  alternates: {
    canonical: `https://1000freetools.com/javascript-tools/javascript-array-object-sorter`,
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

export default function JavascriptArrayObjectSorterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Sort JavaScript Arrays and Objects
        </h1>
        <p className="text-muted-foreground">
          Sort arrays of numbers, strings, or complex objects by any property.
          Define custom sort logic and see the results instantly.
        </p>
      </header>
      <div className="mt-8">
        <JavaScriptArrayObjectSorter />
      </div>
      <div className="mt-8">
        <JavascriptArrayObjectSorterSeo />
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
