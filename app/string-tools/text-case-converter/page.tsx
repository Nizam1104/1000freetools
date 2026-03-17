import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import TextCaseConverter from "@/components/string-tools/text-case-converter";
import TextCaseConverterSeo from "@/components/seo-content/string-tools/text-case-converter";

export const metadata: Metadata = {
  title: `Text Case Converter - Uppercase, Lowercase & More | 1000FreeTools`,
  description: `Free online tool to convert text case. Change to uppercase, lowercase, title case, camelCase, snake_case, kebab-case and more. No registration required.`,
  alternates: {
    canonical: `https://1000freetools.com/string-tools/text-case-converter`,
  },
};

const tools = [
  {
    name: `Word Counter & Character Counter`,
    description: `Word Counter & Character Counter Tool`,
    href: `/string-tools/word-counter-character-counter`,
  },
  {
    name: `String Reverse Tool`,
    description: `Reverse Text & String Online Tool`,
    href: `/string-tools/string-reverse`,
  },
  {
    name: `Text Compare & Diff Checker`,
    description: `Text Compare & Difference Checker`,
    href: `/string-tools/text-compare-diff-checker`,
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
  {
    name: `CRON Expression Generator`,
    description: `Free CRON Expression Generator`,
    href: `/cron-expression-tools/cron-expression-generator`,
  },
];

export default function TextCaseConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Free Text Case Converter Tool
        </h1>
        <p className="text-muted-foreground">
          Instantly convert your text between different letter cases. This free
          tool supports all major case styles including uppercase, lowercase,
          title case, and programming cases like camelCase and snake_case.
          Perfect for formatting documents, code, or data.
        </p>
      </header>
      <div className="mt-8">
        <TextCaseConverter />
      </div>
      <div className="mt-8">
        <TextCaseConverterSeo />
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
