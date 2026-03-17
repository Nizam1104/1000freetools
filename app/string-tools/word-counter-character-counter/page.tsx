import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import WordCounterCharacterCounter from "@/components/string-tools/word-counter-character-counter";
import WordCounterCharacterCounterSeo from "@/components/seo-content/string-tools/word-counter-character-counter";

export const metadata: Metadata = {
  title: `Word Counter & Character Counter Online | Free Tool`,
  description: `Free online word counter and character counter. Get instant counts for words, characters (with/without spaces), sentences, paragraphs, and reading time. No limits.`,
  alternates: {
    canonical: `https://1000freetools.com/string-tools/word-counter-character-counter`,
  },
};

const tools = [
  {
    name: `Text Case Converter`,
    description: `Free Text Case Converter Tool`,
    href: `/string-tools/text-case-converter`,
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

export default function WordCounterCharacterCounterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Word Counter & Character Counter Tool
        </h1>
        <p className="text-muted-foreground">
          Count words, characters, sentences, and paragraphs instantly. This
          free tool provides detailed statistics for your text, including
          character count with and without spaces, and estimates reading time.
          Essential for writers, students, and SEO professionals.
        </p>
      </header>
      <div className="mt-8">
        <WordCounterCharacterCounter />
      </div>
      <div className="mt-8">
        <WordCounterCharacterCounterSeo />
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
