import type { Metadata } from "next";
import FontPairingSeo from "@/components/seo-content/font-tools/font-pairing";

import ToolLinkCards from "@/components/utils/ToolLinkCards";
import FontPairingTool from "@/components/font-tools/font-pairing-tool";

export const metadata: Metadata = {
  title: `Font Pairing Tool | Best Font Combinations`,
  description: `Generate perfect font pairs for design projects. Free tool with live previews and CSS export. Great for web designers and brands.`,
  alternates: {
    canonical: `https://1000freetools.com/font-tools/font-pairing`,
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

export default function FontPairingPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Font Pairing Generator</h1>
        <p className="text-muted-foreground">Find beautiful font combinations for websites, posters, and branding. Test and preview pairings in real-time before using them.</p>
      </header>
      <div className="mt-8">
        <FontPairingTool />
      </div>
      <div className="mt-16">
        <FontPairingSeo />
      </div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Other Free Tools</h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
