import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import FontIdentifier from "@/components/font-tools/font-identifier";
import FontIdentifierSeo from "@/components/seo-content/font-tools/font-identifier";

export const metadata: Metadata = {
  title: `Font Identifier | Find Fonts from Images`,
  description: `Upload an image to identify the font. Free online font finder tool with a huge database. Get font names and download links instantly.`,
  alternates: {
    canonical: `https://1000freetools.com/font-tools/font-identifier`,
  },
};

const tools = [
  {
    name: `Font Generator`,
    description: `Free Font Generator`,
    href: `/font-tools/font-generator`,
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
    name: `Font Subsetter`,
    description: `Web Font Subsetter`,
    href: `/font-tools/font-subsetter`,
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

export default function FontIdentifierPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">What Font Is This?</h1>
        <p className="text-muted-foreground">
          Identify any font from an image or logo. Simply upload your picture
          and our tool will find the matching font name and where to get it.
        </p>
      </header>
      <div className="mt-8">
        <FontIdentifier />
      </div>
      <div className="mt-8">
        <FontIdentifierSeo />
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
