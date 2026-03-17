import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import TextCompareDiffChecker from "@/components/string-tools/text-compare-diff-checker";
import TextCompareDiffCheckerSeo from "@/components/seo-content/string-tools/text-compare-diff-checker";

export const metadata: Metadata = {
  title: `Text Compare Tool - Find Differences Online | Free Diff Checker`,
  description: `Free online tool to compare two texts and find differences. Highlights changes, supports side-by-side view, and ignores whitespace. Essential for writers and developers.`,
  alternates: {
    canonical: `https://1000freetools.com/string-tools/text-compare-diff-checker`,
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
    name: `String Reverse Tool`,
    description: `Reverse Text & String Online Tool`,
    href: `/string-tools/string-reverse`,
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

export default function TextCompareDiffCheckerPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Text Compare & Difference Checker
        </h1>
        <p className="text-muted-foreground">
          Compare two texts and instantly see the differences. This free diff
          tool highlights added, removed, and changed content. Perfect for
          comparing document versions, code changes, or checking for plagiarism.
        </p>
      </header>
      <div className="mt-8">
        <TextCompareDiffChecker />
      </div>
      <div className="mt-8">
        <TextCompareDiffCheckerSeo />
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
