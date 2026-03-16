import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import JavaScriptDateTimeConverter from "@/components/javascript-tools/javascript-date-time-converter";
import JavascriptDateTimeConverterSeo from "@/components/seo-content/javascript-tools/javascript-date-time-converter";

export const metadata: Metadata = {
  title: `JavaScript Date Converter - Timestamp & Format Tool`,
  description: `Free JavaScript date and time converter. Switch between Date objects, Unix timestamps, and formatted strings. Manipulate dates and handle timezones.`,
  alternates: {
    canonical: `https://1000freetools.com/javascript-tools/javascript-date-time-converter`,
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

export default function JavascriptDateTimeConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Convert and Format JavaScript Dates & Times
        </h1>
        <p className="text-muted-foreground">
          Work with JavaScript dates effortlessly. Convert between timestamps,
          date objects, and formatted strings across different timezones.
        </p>
      </header>
      <div className="mt-8">
        <JavaScriptDateTimeConverter />
      </div>
      <div className="mt-8">
        <JavascriptDateTimeConverterSeo />
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
