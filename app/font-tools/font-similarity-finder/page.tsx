import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import FontSimilarityFinder from "@/components/font-tools/font-similarity-finder";
import FontSimilarityFinderSeo from "@/components/seo-content/font-tools/font-similarity-finder";

export const metadata: Metadata = {
  title: `Similar Font Finder | Font Alternatives`,
  description: `Find fonts similar to popular typefaces. Free alternatives to expensive fonts. Visual comparison tool with similarity scores.`,
  alternates: {
    canonical: `https://1000freetools.com/font-tools/font-similarity-finder`,
  },
};

const tools = [
  {
    name: `Font Generator`,
    description: `Free Font Generator`,
    href: `/font-tools/font-generator`,
  },
  {
    name: `Font Identifier`,
    description: `What Font Is This?`,
    href: `/font-tools/font-identifier`,
  },
  {
    name: `Font Converter`,
    description: `Font File Converter`,
    href: `/font-tools/font-converter`,
  },
  {
    name: `Font Pairing Tool`,
    description: `Font Pairing Generator`,
    href: `/font-tools/font-pairing`,
  },
  {
    name: `Font Size Calculator`,
    description: ``,
    href: `/font-tools/font-size-calculator`,
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

export default function FontSimilarityFinderPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Find Fonts Similar To...</h1>
        <p className="text-muted-foreground">
          Looking for a font alternative? Find typefaces that look similar to
          your favorite or expensive fonts.
        </p>
      </header>
      <div className="mt-8">
        <FontSimilarityFinder />
      </div>
      <div className="mt-8">
        <FontSimilarityFinderSeo />
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
