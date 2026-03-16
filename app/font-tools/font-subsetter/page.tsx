import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import FontSubsetter from "@/components/font-tools/font-subsetter";
import FontSubsetterSeo from "@/components/seo-content/font-tools/font-subsetter";

export const metadata: Metadata = {
  title: `Font Subsetter | Reduce Web Font File Size`,
  description: `Create font subsets to boost website speed. Remove unused characters from TTF, WOFF files. Free online tool for developers.`,
  alternates: {
    canonical: `https://1000freetools.com/font-tools/font-subsetter`,
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

export default function FontSubsetterPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Web Font Subsetter</h1>
        <p className="text-muted-foreground">
          Make your web fonts load faster by removing unused characters. Create
          custom font subsets for English, European languages, or specific
          symbols.
        </p>
      </header>
      <div className="mt-8">
        <FontSubsetter />
      </div>
      <div className="mt-8">
        <FontSubsetterSeo />
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
