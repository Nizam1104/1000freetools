import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import UnicodeCharacterCounter from "@/components/unicode-tools/unicode-character-counter";
import UnicodeCharacterCounterSeo from "@/components/seo-content/unicode-tools/unicode-character-counter";

export const metadata: Metadata = {
  title: `Unicode Character Counter | Accurate Text Length`,
  description: `Count Unicode characters, code points, and bytes accurately. Supports UTF-8, UTF-16, UTF-32 encodings. Free online character counter tool.`,
  alternates: {
    canonical: `https://1000freetools.com/unicode-tools/unicode-character-counter`,
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

export default function UnicodeCharacterCounterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Unicode Character Counter</h1>
        <p className="text-muted-foreground">
          Accurately count Unicode characters, code points, and bytes.
          Understand the true length of your text across different encodings
          like UTF-8 and UTF-16.
        </p>
      </header>
      <div className="mt-8">
        <UnicodeCharacterCounter />
      </div>
      <div className="mt-8">
        <UnicodeCharacterCounterSeo />
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
