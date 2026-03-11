import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import CharacterCounter from "@/components/typography-tools/character-counter";
import CharacterCounterSeo from "@/components/seo-content/typography-tools/character-counter";

export const metadata: Metadata = {
  title: `Character Counter | Count Words & Letters Online`,
  description: `Free online character and word counter tool. Get real-time counts for your text, with limits for Twitter, Instagram, and other platforms.`,
  alternates: {
    canonical: `https://1000freetools.com/typography-tools/character-counter`,
  },
};

const tools = [
  {
    name: `Font Pairing Tool`,
    description: `Font Pairing Tool for Designers`,
    href: `/typography-tools/font-pairing-tool`,
  },
  {
    name: `Letter Spacing Tool`,
    description: `Letter Spacing & Kerning Tool`,
    href: `/typography-tools/letter-spacing-tool`,
  },
  {
    name: `Line Height Generator`,
    description: `Line Height Calculator`,
    href: `/typography-tools/line-height-generator`,
  },
  {
    name: `Font Size Converter`,
    description: `Font Size Unit Converter`,
    href: `/typography-tools/font-size-converter`,
  },
  {
    name: `Text Shadow Generator`,
    description: `CSS Text Shadow Generator`,
    href: `/typography-tools/text-shadow-generator`,
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

export default function CharacterCounterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Character & Word Counter</h1>
        <p className="text-muted-foreground">
          Count characters, words, and paragraphs in your text instantly. Set
          custom limits for social media posts, essays, or any writing project.
        </p>
      </header>
      <div className="mt-8">
        <CharacterCounter />
      </div>
      <div className="mt-8">
        <CharacterCounterSeo />
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
