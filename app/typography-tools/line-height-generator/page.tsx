import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import { LineHeightGenerator } from "@/components/font-tools/line-height-generator";

export const metadata: Metadata = {
  title: `Line Height Generator | Calculate Text Leading`,
  description: `Calculate and visualize the best line height for your website text. Adjust leading for better readability and get the CSS instantly.`,
  alternates: {
    canonical: `https://1000freetools.com/typography-tools/line-height-generator`,
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

export default function LineHeightGeneratorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Line Height Calculator</h1>
        <p className="text-muted-foreground">
          Find the perfect line height for your text to improve readability.
          Adjust the spacing between lines and see a live preview with CSS code.
        </p>
      </header>
      {<LineHeightGenerator />}
      {/* TODO: add seo component for line-height-generator */}
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Other Free Tools
        </h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
