import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: `Unicode Sorting Tool | Text Collation Online`,
  description: `Sort text using Unicode Collation Algorithm (UCA). Compare locale-specific sorting for accurate international lists. Free online collation tool.`,
  alternates: {
    canonical: `https://1000freetools.com/unicode-tools/unicode-sorting-tool`,
  },
};

const tools = [
  {
    name: `Unicode Character Lookup`,
    description: `Unicode Character Lookup`,
    href: `/unicode-tools/unicode-character-lookup`,
  },
  {
    name: `Unicode Text Converter`,
    description: `Unicode Text Converter`,
    href: `/unicode-tools/unicode-text-converter`,
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

export default function UnicodeSortingToolPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Unicode Sorting & Collation Tool
        </h1>
        <p className="text-muted-foreground">
          Sort text correctly according to Unicode rules. Compare how different
          languages and locales order characters, from accents to case
          sensitivity.
        </p>
      </header>
      {/* TODO: add tool component for unicode-sorting-tool */}
      {/* TODO: add seo component for unicode-sorting-tool */}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Other Free Tools
        </h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
