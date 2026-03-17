import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import UnicodeTextConverter from "@/components/unicode-tools/unicode-text-converter";
import UnicodeTextConverterSeo from "@/components/seo-content/unicode-tools/unicode-text-converter";

export const metadata: Metadata = {
  title: `Unicode Text Converter | Encode & Decode Online`,
  description: `Free online Unicode converter. Transform text between UTF-8, UTF-16, UTF-32, HTML entities, and escape sequences instantly. Batch processing supported.`,
  alternates: {
    canonical: `https://1000freetools.com/unicode-tools/unicode-text-converter`,
  },
};

const tools = [
  {
    name: `Unicode Character Lookup`,
    description: `Unicode Character Lookup`,
    href: `/unicode-tools/unicode-character-lookup`,
  },
  {
    name: `Unicode Character Counter`,
    description: `Unicode Character Counter`,
    href: `/unicode-tools/unicode-character-counter`,
  },
  {
    name: `Unicode Whitespace Remover`,
    description: `Unicode Whitespace Remover`,
    href: `/unicode-tools/unicode-whitespace-remover`,
  },
  {
    name: `Unicode Regex Tester`,
    description: `Unicode Regex Tester`,
    href: `/unicode-tools/unicode-regex-tester`,
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

export default function UnicodeTextConverterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Unicode Text Converter</h1>
        <p className="text-muted-foreground">
          Convert text between Unicode encodings like UTF-8, UTF-16, and HTML
          entities. Easily encode or decode text for web development and data
          processing.
        </p>
      </header>
      <div className="mt-8">
        <UnicodeTextConverter />
      </div>
      <div className="mt-8">
        <UnicodeTextConverterSeo />
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
