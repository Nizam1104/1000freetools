import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import StringReverse from "@/components/string-tools/string-reverse";
import StringReverseToolSeo from "@/components/seo-content/string-tools/string-reverse";

export const metadata: Metadata = {
  title: `Reverse String Online - Text & Word Reverser | Free Tool`,
  description: `Free online tool to reverse strings and text. Reverse characters, reverse words, or flip entire text. Handles Unicode and preserves formatting. Instant results.`,
  alternates: {
    canonical: `https://1000freetools.com/string-tools/string-reverse`,
  },
};

const tools = [
  {
    name: `Text Case Converter`,
    description: `Free Text Case Converter Tool`,
    href: `/string-tools/text-case-converter`,
  },
  {
    name: `Word Counter & Character Counter`,
    description: `Word Counter & Character Counter Tool`,
    href: `/string-tools/word-counter-character-counter`,
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

export default function StringReversePage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Reverse Text & String Online Tool
        </h1>
        <p className="text-muted-foreground">
          Quickly reverse any string or text online. This free tool can reverse
          characters, reverse words, or reverse the entire string. Useful for
          coding challenges, creating puzzles, or testing data integrity.
        </p>
      </header>
      <div className="mt-8">
        <StringReverse />
      </div>
      <div className="mt-8">
        <StringReverseToolSeo />
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
