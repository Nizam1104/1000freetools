import type { Metadata } from "next";
import ToolLinkCards from "@/components/utils/ToolLinkCards";
import GradientTextGenerator from "@/components/font-tools/gradient-text-generator";
import GradientTextGeneratorSeo from "@/components/seo-content/typography-tools/gradient-text-generator";

export const metadata: Metadata = {
  title: `Gradient Text Generator | Create CSS Gradient Text`,
  description: `Create colorful gradient text effects online. Generate CSS code for gradient text that works on modern browsers. Free tool.`,
  alternates: {
    canonical: `https://1000freetools.com/typography-tools/gradient-text-generator`,
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

export default function GradientTextGeneratorPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-3">Gradient Text Maker</h1>
        <p className="text-muted-foreground">
          Make stunning gradient text for your website or graphics. Choose
          colors and direction, preview instantly, and copy the CSS code.
        </p>
      </header>
      {<GradientTextGenerator />}
      <div className="mt-8"><GradientTextGeneratorSeo /></div>
      <div className="mt-16 max-w-6xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Other Free Tools
        </h2>
        <ToolLinkCards tools={tools} />
      </div>
    </div>
  );
}
