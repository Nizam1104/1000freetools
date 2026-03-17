import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";

export const metadata: Metadata = {
  title: `Letter Spacing Tool | Adjust Text Tracking Online`,
  description: `Visualize and adjust letter spacing and kerning for your text. Get the perfect spacing for designs and generate CSS code.`,
  alternates: {
    canonical: `https://1000freetools.com/typography-tools/letter-spacing-tool`,
  },
};

const tools = [
  {
    name: `Font Pairing Tool`,
    description: `Font Pairing Tool for Designers`,
    href: `/typography-tools/font-pairing-tool`,
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

export default function LetterSpacingToolPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">
          Letter Spacing & Kerning Tool
        </h1>
        <p className="text-muted-foreground">
          Adjust the spacing between letters in your text with real-time
          preview. Fine-tune kerning for logos, headlines, or any design text.
        </p>
      </header>
      {/* TODO: add tool component for letter-spacing-tool */}
      {/* TODO: add seo component for letter-spacing-tool */}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Other Free Tools
        </h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
