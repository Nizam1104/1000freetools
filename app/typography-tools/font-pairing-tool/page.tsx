import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { FontPairingTool } from "@/components/font-tools/font-pairing-tool.tsx";

export const metadata: Metadata = {
  title: `Font Pairing Tool | Find Perfect Font Combinations`,
  description: `Discover beautiful font pairings for your website. Our tool lets you preview headline and body font combinations and copy the CSS instantly.`,
  alternates: {
    canonical: `https://1000freetools.com/typography-tools/font-pairing-tool`,
  },
};

const tools = [
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

export default function FontPairingToolPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Font Pairing Tool for Designers
        </h1>
        <p className="text-muted-foreground">
          Choose the perfect font combinations for your website or design
          project. Browse curated pairs, preview them live, and get the CSS code
          to use them.
        </p>
      </header>
      {<FontPairingTool />}
      {/* TODO: add seo component for font-pairing-tool */}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Other Free Tools
        </h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
